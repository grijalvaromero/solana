<template>
  <div>
    <div id="nav">
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">GrijalvaRomero</a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item me-2">
                <router-link :to="`/transacciones/${getWallet()}`"> Mis Transacciones </router-link>
              </li>
              
            </ul>
          </div>

        
          <div class="d-flex">
            <WalletMultiButton />
          </div>

          <button
            class="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
 
</template>
<script>
 
  import { WalletMultiButton, initWallet } from "solana-wallets-vue";
  import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";

  import { useWorkspace } from "@/composables";

  export default{
    components: {
      WalletMultiButton
    },
    setup() {
      const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

      initWallet({ wallets, autoConnect: true });

      const { getWallet } = useWorkspace();
      
      return { getWallet };
    },
  }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
