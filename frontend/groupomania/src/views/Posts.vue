<template>
  <div class="posts">

    <navigation />

    <button
      class="moderation"
      @click="moderation"
      v-if="userInfos.isadmin == 1"
    >
      Moderation des commentaires
    </button>

    <createpost />
    
    <span class="nocomment" v-if="this.posts.length == 0">aucun post...</span>
    <!--boucle sur tableau posts-->
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
    console.log(this.$store.state.status);
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getallcomment");
    this.$store.dispatch("getlike");
    this.$store.dispatch("getOneUser");
    //déconnexion automatique si user ou token vide ou timeout
    if (
      this.$store.state.auth.userId == "" ||
      this.$store.state.auth.token == "" ||
      this.$store.state.status == "echec"
    ) {
      this.$router.push("/");
    }
  },

  components: {
    post,
    navigation,
    createpost,
  },

  computed: {
    ...mapState(["posts", "auth", "allcomments", "likes", "userInfos"]),
  },

  methods: {
    moderation () {
      this.$router.push("/moderation");
    },
  },
};
</script>

<style>
body {
  margin: 0;
}

.nocomment {
  display: block;
  margin-top: 10px;
}

.all_cards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.moderation {
  margin-top: 4px;
  box-shadow: 0px 3px 3px 0px #bdbdbd;
  background-color: #ff0000;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 15px;
  padding: 3px 14px;
  text-decoration: none;
}

.moderation:hover {
  background-color: #f58e8e;
}
</style>
