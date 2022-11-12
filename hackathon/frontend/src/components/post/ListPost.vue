
<template>
  
  <div>
    <button class="btn btn-success" @click="recargar()">
      REFRESH
    </button>
    <div v-for="post in results" :key="post.key" >
      <p>{{ JSON.stringify(post) }}</p>
    </div>
    <div>{{ JSON.stringify(posts) }}</div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: {  },
  data(){
    return {
        results:[]
    }

  },
 async mounted(){
    
  },
  methods:{
      async recargar(){
        
      
      }
    },
 async setup() {
      const store = useStore();
        let post2 =  computed(() => store.getters["getAll"])
        //console.log(post2);
        //let post = [{a:"a",key:"1"}]
       
   
    return {
        posts:post2
    };
  },
};
</script>
