<template>
  <div class="home">
    <NewPost />
    <h1>MIS TRANSACCIONES</h1>
    <Suspense> <ListPost /></Suspense>
   
  </div>
</template>

<script>
// @ is an alias to /src
import NewPost from '@/components/post/NewPost.vue';
import ListPost from '@/components/post/ListPost.vue';
export default {
  name: 'HomeView',
  components: {
    NewPost,
    ListPost
  }
}
</script>
