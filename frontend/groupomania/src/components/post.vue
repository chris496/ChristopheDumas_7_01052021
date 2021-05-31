<template>
  
    <!-- affichage des posts -->
    <div class="card">
      <div class="topcard">
        <div><img class="logo" :src="photo" /></div>
        <div class="infos">
          <div class="name">{{ firstname }} {{ lastname }}</div>
          <div class="title">{{ title }}</div>
        </div>
        <div class="date">{{ added_date }}</div>
      </div>

      <div class="bodycard">
        <span class="bodycard_description">{{ description }}</span>
        <img :src="picture" />
      </div>

      <div class="bottomcard">
        <font-awesome-icon
          :icon="['far', 'comment-dots']"
          class="icon"
          title="Afficher/créer commentaires"
          @click.prevent="displayComments()"
        />
        <font-awesome-icon 
          v-if="auth.userId == user"
          :icon="['fas', 'trash-alt']"
          class="icon"
          title="Supprimer le post"
          @click.prevent="deletePost()"
        />
        <font-awesome-icon
          :icon="['far', 'thumbs-up']"
          class="icon"
          title="Liker le post"
          @click.prevent="like()"
        />
      </div>

      <!-- affichage des commentaires -->
      <div v-if="mode == 'comments'" class="comment">
        <span class="title-comment">Laisser un commentaire</span><br />
        <textarea v-model="commentaire" />
        <button @click.prevent="newComment()">Publier</button>

        <div
          class="comments-post"
          v-for="(comment, index) in comments"
          :key="index"
        >
          <div class="dim"><img :src="comment.photo" /></div>
          <div class="commentaires">
            <p class="commentaires_text">{{ comment.description }}</p>
          </div>
          <span>{{ comment.user }}</span>
          <span>{{ comment.added_date }}</span>
          <font-awesome-icon
            :icon="['fas', 'trash-alt']"
            class="icon"
            title="Supprimer"
            @click.prevent="deleteComment(comment)"
            v-if="auth.userId == user"
          />
        </div>
      </div>
    </div>
  
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "viewposts",
  data: function() {
    return {
      mode: "",
      commentaire: "",
    };
  },

  computed: {
    ...mapState(["auth", "comments", "userInfos"]),
  },

  props: [
    "firstname",
    "lastname",
    "title",
    "added_date",
    "picture",
    "description",
    "id",
    "user",
    "photo",
  ],

  methods: {
    deleteComment: function(comment) {
      this.comments.splice(this.comments.indexOf(comment), 1);
      //this.comments.splice(comment, 1);
      console.log(comment);
      //this.$store.dispatch("deleteComment", comment);
    },
    displayComments: function() {
      console.log(this.id);
      this.mode = "comments";
      this.$store.dispatch("getcomment", {
        id: this.id,
      });
    },
    deletePost: function() {
      console.log(this.id);
      //this.posts.splice(this.posts.indexOf(this.id), 1);
      this.$store.dispatch("deletePost", {
        id: this.id,
      });
    },
    newComment: function() {
      this.$store.dispatch("createComment", {
        description: this.commentaire,
        user: this.auth.userId,
        post: this.id,
      });
      this.commentaire = "";
    },

    like: function() {},
  },
};
</script>

<style scoped>
.dim img {
  width: 40px;
}

.card {
  width: 40%;
  background-color: rgba(233, 220, 220, 0.418);
  border: 1px solid rgb(231, 198, 198);
  border-radius: 0.5rem 0.5rem 0.5rem 0;
  box-shadow: 0px 5px 15px rgba(36, 39, 207, 0.22);
  margin-top: 30px;
}

.topcard {
  padding: 15px 15px 0 15px;
  display: flex;
  justify-content: flex-start;
  border-radius: 0.5rem 0.5rem 0 0;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: darkorange;
  object-fit: cover;
  margin-right: 15px;
  box-shadow: 1px 1px 6px rgb(53, 50, 50);
}

.name {
  font-weight: 600;
  font-size: 12px;
}

.date {
  margin-left: auto;
}

.bodycard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.bodycard_description{
  width: 100%;
}

.bodycard img {
  width: 100%;
}

.bottomcard {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 0 0 0.5rem 0;
  background-color: rgba(196, 171, 171, 0.822);
}

.icon {
  padding: 6px;
  color: black;
}

.icon:hover {
  color: rgb(255, 0, 0);
  cursor: pointer;
}

.comment {
  background-color: rgba(233, 220, 220, 0.418);
}

.title-comment {
  font-size: 12px;
}

textarea {
  width: 90%;
  border-radius: 10px;
  resize: none;
  border: solid 1px rgb(194, 174, 174);
}

.comments-post {
  margin-top: 15px;
}

.comment button {
  box-shadow: 0px 10px 14px -7px #276873;

  background-color: #408c99;
  border-radius: 8px;
  cursor: pointer;
  color: #ffffff;
  font-size: 10px;
  padding: 5px 11px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #3d768a;
}

.comment button:hover {
  background-color: #524a4a;
}
.comment button:active {
  position: relative;
  top: 1px;
}

.commentaires {
  width: 90%;
  border: 1px solid;
  border-radius: 25px;
  margin: auto;
  background-color: rgba(250, 191, 191, 0.63);
}

.commentaires_text {
  text-align: left;
}
</style>
