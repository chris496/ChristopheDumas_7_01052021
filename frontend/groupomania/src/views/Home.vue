<template>
  <div class="home">
    <img class="logo" alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <formulaire/>
    
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import formulaire from '../components/formulaire.vue'

export default {
  name: 'Home',
  components: {
    //HelloWorld,
    formulaire
  }
}
</script>

<style>
  .logo{
    width: 150px;
  }

</style>
