<template>
    <div class="container mt-3 mb-5" v-motion-pop>
      <div class="row d-flex align-items-center justify-content-center">
        <div class="col-md-6">
          <div class="card">
           
            <div class="d-flex justify-content-between p-1 px-3">
              <textarea
                v-model="content"
                spellcheck="true"
                type="text"
                class="textarea"
                placeholder="Valor a guardar"
                ref="textAreaReizable"
              />
            </div>
          </div>
  
          <div class="p-2">
          
            
              <div v-if="connected" class="d-flex justify-content-between align-items-cente">
                <input
                  v-model="valor"
                  type="text"
                  placeholder="Otro Valor"
                  class="form-control "
                />
  
                <button class="btn btn-success" @click="insertar()">
                  Post
                </button>
              </div>
              <WalletMultiButton v-else />
           
          </div>
         
  
          <hr />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { WalletMultiButton, useWallet } from "solana-wallets-vue";
  
  import { useStore } from "vuex"
  export default {
    components: { WalletMultiButton },
      setup() {
        const { connected } = useWallet();
        const store = useStore();

        let insertar2 =async function() {
          let data={
            valor:this.valor,
            content:this.content
          };
          console.log(data);
          await store.dispatch("sendPost", data);
          
        }
      
        return {
          insertar2,
          connected,
          store
        
        };
    },
    methods:{
      async insertar(){
          let data={
            valor:this.valor,
            content:this.content
          };
          console.log(data);
          await this.store.dispatch("sendPost", data);
      }
    },
    data(){
      return {
        content:'',
        valor:''
      }
    }
  };
  </script>
  
  <style scoped>
  .hashtag {
    margin-right: 5px;
  }
  
  .textarea {
    border: none;
    overflow: auto;
    background-color: #ffffff;
    color: black;
    outline: none;
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    min-height: 60px;
  }
  </style>