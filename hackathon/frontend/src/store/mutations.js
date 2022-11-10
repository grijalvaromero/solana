
export const loadPosts = (state, posts) => {
    state.posts = [...posts]
}

export const addPost = (state, post) => {
    state.posts = [...post, ...state.posts]
}

export const setPost = (state, post) => {
    const index = state.posts.findIndex((obj => obj.publicKey.toBase58() == post.publicKey.toBase58()))
    if (index >= 0)
        state.posts[index] = post
}

export const deletePost = (state, post) => {
    const index = state.posts.findIndex((obj => obj.publicKey.toBase58() == post.publicKey.toBase58()))
    if (index >= 0)
        state.posts.splice(index, 1);
}
