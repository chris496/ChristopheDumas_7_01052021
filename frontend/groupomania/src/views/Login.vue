<template>
  <div class="login">
    <img class="logo" alt="Vue logo" src="../assets/logo.png" />
    <h1>Bienvenue sur votre réseau social groupomania</h1>
    <!-- bascule entre inscription et connexion-->
    <signup v-if="mode == 'signup'" @switchlogin="switchlogin"/>
    <signin v-if="mode == 'signin'" />

    <span v-if="mode == 'signup'" class="switchButton" @click="switchlogin()"
      >se connecter</span
    >
    <span v-if="mode == 'signin'" class="switchButton" @click="switchSubscribe()"
      >s'inscrire</span
    >
  </div>
</template>

<script>
import signin from "../components/signin.vue";
import signup from "../components/signup.vue";

export default {
  name: "subscribe",
  data: function() {
    return {
      mode: "signin",
    };
  },

  components: {
    signin,
    signup,
  },

  methods: {
    switchSubscribe () {
      this.mode = "signup";
    },
    switchlogin () {
      this.mode = "signin";
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
