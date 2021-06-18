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
import { mapState } from "vuex";

export default {
  name: "Profil",
  mounted() {
    console.log(this.$store.state.status)
    //this.$store.dispatch("getOneUser");
    
    //déconnexion automatique si user ou token vide
    if (
      this.$store.state.auth.userId == "" ||
      this.$store.state.auth.token == "" || this.$store.state.status == "echec"
    ) {
      this.$router.push("/");
    }
  },
  components: {
    navigation,
    userprofil,
  },

  computed: {
    ...mapState(["auth"]),
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>
