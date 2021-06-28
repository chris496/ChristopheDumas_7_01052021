<template>
  <div>
    <!-- affichage de tous les commentaires -->
    <div
      v-for="(allcomment, index) in allcomments"
      :key="index"
      class="comments_post"
    >
      <div class="comment">
        <div class="comment_avatar">
          <img
            class="logo"
            v-if="allcomment.photo"
            :src="allcomment.photo"
            alt="photo"
          />
          <img
            class="logo"
            v-if="allcomment.photo == null"
            src="../../public/images/icon.png"
            alt="logo"
          />
        </div>
        <p class="commentaires_text">{{ allcomment.description }}</p>
        <button title="Supprimer" @click.prevent="deleteComment(allcomment)" v-if="userInfos.isadmin == 1"></button>
      </div>
      <span class="comment_infos"
        >{{ allcomment.firstname }} {{ allcomment.lastname }}</span
      >
      <span class="comment_infos">{{ formatDate(allcomment.added_date) }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "allComments",
  data: function() {
    return {};
  },

  computed: {
    ...mapState(["auth", "allcomments", "userInfos"]),
  },

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("default", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    },

    deleteComment: function(allcomment) {
      const test = this.allcomments.findIndex(el => el.id === allcomment.id)
      this.allcomments.splice(test, 1);
      this.$store.dispatch("deleteComment", allcomment);
    },
  },
};
</script>

<style scoped>
button{
  border: none;
  margin-left: 5px;
  width: 15px;
  height: 15px;
border-radius: 50%;
background-color: rgb(250, 87, 87);
cursor: pointer;
box-shadow: 0px 1px 0px 0px #313131;
}

button:hover {
  background-color: #ff0000;
}

button:active {
  position: relative;
  top: 1px;
}

.commentaires_text {
  text-align: left;
  width: 50%;
  border: 1px solid;
  border-radius: 10px;
  padding: 5px;
  margin: 10px 0;
  background-color: rgba(255, 255, 255, 0.63);
  word-wrap: break-word;
}

.icon {
  cursor: pointer;
  margin-left: 5px;
}

.icon:hover {
  color: red;
}

.comment {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: auto;
}

.comment_avatar img {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.comment_infos {
  font-size: 15px;
  margin-right: 5px;
}

@media (max-width: 768px) {
  .card {
    width: 90%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .card {
    width: 70%;
  }
}
</style>
