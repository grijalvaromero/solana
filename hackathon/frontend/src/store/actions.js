import { useWorkspace } from '@/composables'
import { Post } from '@/models'
import { web3 } from '@project-serum/anchor'
import { memcmphHashtag, memcmpAuthor, memcmphDay } from "@/helpers/filterMemcm";

const walletCollector = 'DUTssi76Gv6s7ymz1xH9HiemqCWSSRFMXiU8twNZYnc3';
const tipNewPost = 0.001 * web3.LAMPORTS_PER_SOL

export const loadPost = async ({ commit }, { wallet, hashtag, vecDay }) => {

    let filters = []
    if (wallet)
        filters = [memcmpAuthor(wallet)];
    if (hashtag)
        filters = [memcmphHashtag(hashtag)];
    if (vecDay)
        filters = [memcmphDay(vecDay)];

    const { program, connection } = useWorkspace()

    const postClient = program.value.account.post
    const postAccountName = postClient._idlAccount.name

    const postDiscriminatorFilter = {
        memcmp: postClient.coder.accounts.memcmp(postAccountName)
    }

    const allPosts = await connection.getProgramAccounts(program.value.programId, {
        filters: [postDiscriminatorFilter, ...filters],
        dataSlice: { offset: 41, length: 6 },
    })

    const allPostsWithTimestamps = allPosts.map(({ account, pubkey }) => ({
        pubkey,
        date: Date.UTC(...account.data),
    }))

    const slicePublicKeys = []
    allPostsWithTimestamps
        .sort((a, b) => {
            if (Math.abs(a.date) < Math.abs(b.date)) {
                return -1;
            }
            return 1;
        })
        .map(({ pubkey }) => {
            slicePublicKeys.push(pubkey)
            return pubkey
        })

    const postsPublicKeys = await postClient.fetchMultiple(slicePublicKeys)

    const posts = postsPublicKeys.reduce((all, post, index) => {
        const publicKey = slicePublicKeys[index]
        all.push(new Post(publicKey, post))
        return all
    }, [])

    commit('loadPosts', posts)
}

export const sendPost = async ({ commit }, post) => {

    const { valor, content } = post

    let img = '';
    

    let date = new Date();
    let year = date.getUTCFullYear() - 2000;
    let month = date.getUTCMonth();
    let day = date.getUTCDate();
    let hour = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();

    let time_zone = date.getTimezoneOffset() / -60;

    const { wallet, program } = useWorkspace()
    console.log(post);
    const postWeb3 = web3.Keypair.generate()
    
    await program.value.rpc.sendPost(valor, content, img, `${tipNewPost}`, 
            time_zone, year, month, day, hour, minutes, seconds, {
        accounts: {
            post: postWeb3.publicKey,
            author: wallet.value.publicKey,
            systemProgram: web3.SystemProgram.programId,
            walletCollector: walletCollector,
        },
        signers: [postWeb3]
    })
    const postAccount = await program.value.account.post.fetch(postWeb3.publicKey)
    const newPost = new Post(postWeb3.publicKey, postAccount)

    commit('addPost', [newPost])
}

export const likePost = async ({ commit }, { post, tip }) => {
    const { wallet, program } = useWorkspace()

    const tipLikePost = tip * web3.LAMPORTS_PER_SOL
    if (tip < 0.0001 && tip > 0.1) {
        throw 'invalid tip'
    }
    await program.value.rpc.likePost(`${tipLikePost}`, {
        accounts: {
            post: post.publicKey,

            author: wallet.value.publicKey, // from
            to: post.author.toBase58(), // to

            systemProgram: web3.SystemProgram.programId,
        },
    })
    post.like = `${parseInt(post.like) + 1}`;
    post.likes.push(wallet.value.publicKey);
    commit('setPost', post)
}


export const deletePost = async ({ commit }, post) => {
    const { wallet, program } = useWorkspace()
    await program.value.rpc.deletePost({
        accounts: {
            author: wallet.value.publicKey,
            post: post.publicKey,
        },
    })
    commit('deletePost', post)
}

export const editPost = async ({ commit }, post) => {
    const { wallet, program } = useWorkspace()

    const { hashtag = '#', content } = post

    await program.value.rpc.editPost(hashtag, content, {
        accounts: {
            author: wallet.value.publicKey,
            post: post.publicKey,
        },
    })
    commit('setPost', new Post(post.publicKey, post))
}
