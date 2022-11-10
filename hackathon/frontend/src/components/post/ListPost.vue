
<template>
  <CardPost v-for="post in posts" :key="post.key" :post="post" />
</template>

<script>
import CardPost from "@/components/post/CardPost.vue";

import { computed } from "vue";
import { useStore } from "vuex";

export default {
  components: { CardPost },

  setup() {
    const store = useStore();

    return {
      posts: computed(() => store.getters["juno/getPosts"]),
    };
  },
};
</script>
