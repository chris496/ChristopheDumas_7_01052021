<template>
  <div>
    <navigation />
    <h1>Votre profil</h1>
    <userprofil />
  </div>
</template>

<script>
import navigation from "../components/navigation.vue";
import userprofil from "../components/userProfil.vue";

export default {
  name: "Profil",
  mounted() {
    this.$store.dispatch("getOneUser");
    
    //déconnexion automatique si user ou token vide
    if (
      this.$store.state.auth.userId == "" ||
      this.$store.state.auth.token == ""
    ) {
      return this.$router.push("/");
    }
  },
  components: {
    navigation,
    userprofil,
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>
