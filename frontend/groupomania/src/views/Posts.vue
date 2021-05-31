<template>
  <div class="posts">
    <navigation />

    <createpost />
    <div class="all_cards">
    <post 
      v-for="(item, index) in posts"
      :firstname="item.firstname"
      :lastname="item.lastname"
      :title="item.title"
      :added_date="item.added_date"
      :picture="item.picture"
      :description="item.description"
      :id="item.id"
      :user="item.user"
      :photo="item.photo"
      :key="index"
    />
    </div>
  </div>
</template>

<script>
import post from "../components/post.vue";
import createpost from "../components/createPost.vue";
import navigation from "../components/navigation.vue";
import { mapState } from "vuex";

export default {
  name: "Posts",
  mounted() {
    this.$store.dispatch("getPosts");

    if (
      this.$store.state.auth.userId == "" ||
      this.$store.state.auth.token == ""
    ) {
      this.$router.push("/");
    }
  },
  components: {
    //HelloWorld,
    post,
    navigation,
    createpost,
  },
  computed: {
    ...mapState(["posts", "auth"]),
  },
};
</script>

<style>
body {
  margin: 0;
}

.all_cards {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
}

</style>
