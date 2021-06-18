<template>
  <div>
    <navigation />
    <h1 class="title">Modération des commentaires utilisateurs</h1>
    <allComments/>
  </div>
</template>

<script>
import navigation from "../components/navigation.vue";
import allComments from "../components/comments_listglobal.vue";

export default {
  data: function() {
    return {
      
    };
  },

  components: {
    navigation,
    allComments
  },
mounted() {
      this.$store.dispatch("getallcomment")

      if (
      this.$store.state.auth.userId == "" ||
      this.$store.state.auth.token == "" || this.$store.state.status == "echec"
    ) {
      this.$router.push("/");
    }
  },

  methods: {
    
  },
};
</script>

<style scoped>
body {
  margin: 0;
}

.title{
  margin: 20px 0 40px 0;
  font-weight: 700;
  color: red;
  font-size: 25px;

}
</style>