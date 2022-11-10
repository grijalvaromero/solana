<template>
  <div class="home">
    <NewPost />
  </div>
</template>

<script>
// @ is an alias to /src
import NewPost from '@/components/post/NewPost.vue';
export default {
  name: 'HomeView',
  components: {
    NewPost
  }
}
</script>
