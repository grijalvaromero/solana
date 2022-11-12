<template>
    <div v-if="post" class="container mt-5 mb-5">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <p>{{JSON.stringify(post)}}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
 
//  import { Post } from "../../models";
  
  export default {
    components: {  },
    props: {
      post: { required: true},
    },
    setup() {
      
    
      return {
      };
    },
  };
  </script>
  
  <style scoped>
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
  }
  .font a:link,
  a:visited,
  a:active {
    text-decoration: none;
    font-weight: bold;
  }
  
  hr {
    height: 1px;
    background-color: #1d6042;
    border: none;
  }
  
  .delete {
    cursor: pointer;
  }
  
  img {
    min-height: 300px;
    width: auto;
  
    margin-left: auto;
    margin-right: auto;
  }
  </style>