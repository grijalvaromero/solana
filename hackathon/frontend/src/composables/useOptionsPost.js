import { useStore } from "vuex";

export const useOptionsPost = (post) => {
    const store = useStore();

    const onLikePost = async (tip) => {
        await store.dispatch("juno/likePost", {
            post: post,
            tip: tip,
        });
    };

    const onDeletePost = async () => {
        await store.dispatch("juno/deletePost", post);
    };

    return { onLikePost, onDeletePost }
}
