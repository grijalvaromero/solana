import { computed } from 'vue'

import { useAnchorWallet } from 'solana-wallets-vue'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { Provider, Program } from '@project-serum/anchor';

import idl from '@/idl/idl.json'

const programID = new PublicKey(idl.metadata.address)
const preflightCommitment = 'confirmed'
const commitment = 'confirmed'

export const useWorkspace = () => {

    const wallet = useAnchorWallet()
    const connection = new Connection(clusterApiUrl('devnet'), commitment)
    
    const provider = computed(() => new Provider(connection, wallet.value, { preflightCommitment, commitment }));
    const program = computed(() => new Program(idl, programID, provider.value));

    const getWallet = () => {
        if (!wallet || !wallet.value)
            return "";
        return wallet.value.publicKey.toBase58();
    };

    const isMyWallet = (walletCompare) => {
        return getWallet() === walletCompare
    }

    return { wallet, connection, provider, program, isMyWallet, getWallet }
}