<template>
  <div class="login">
    <img class="logo" alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>Bienvenue sur votre réseau social groupomania</h1>
    <signup v-if="mode == 'subscribe'" />
    <signin v-if="mode == 'login'" />

    <span v-if="mode == 'subscribe'" class="switchButton" @click="switchlogin()"
      >se connecter</span
    >
    <span v-if="mode == 'login'" class="switchButton" @click="switchSubscribe()"
      >s'inscrire</span
    >
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import signin from "../components/signin.vue";
import signup from "../components/signup.vue";

export default {
  name: "subscribe",
  data: function() {
    return {
      mode: "login",
    };
  },

  components: {
    //HelloWorld,
    signin,
    signup,
  },

  methods: {
    switchSubscribe: function() {
      this.mode = "subscribe";
    },
    switchlogin: function() {
      this.mode = "login";
    },
  },
};
</script>

<style>

.logo {
  width: 150px;
}

.switchButton{
  cursor: pointer;
}

.switchButton:hover{
  cursor: pointer;
  text-decoration: underline;
}

@media (max-width: 768px) {
            h1 {
  margin: 0;
  font-size: 18px;
    }
}
</style>
