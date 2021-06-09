<template>
  <div>
    <navigation />
    Modération des commentaires utilisateurs
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
      this.$store.state.auth.token == ""
    ) {
      this.$router.push("/");
    }
  },

  methods: {
    
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>