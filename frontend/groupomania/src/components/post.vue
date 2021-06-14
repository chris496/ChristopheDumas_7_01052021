<template>
  
    <!-- affichage des posts -->
    <div class="card">
      <div class="topcard">
        <img class="logo" v-if="photo" :src="photo"/>
        <img class="logo" v-if="photo == null" src="../../public/images/icon.png"/>
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
        <div class="bottoms">
        <font-awesome-icon
          :icon="['far', 'comment-dots']"
          class="icon"
          title="Afficher/créer commentaires"
          @click.prevent="displayComments()"
        />
        <span class="cpt">{{ compteurComments }}</span>
        </div>

        <font-awesome-icon 
          v-if="auth.userId == user || userInfos.isadmin == 1"
          :icon="['fas', 'trash-alt']"
          class="icon"
          title="Supprimer le post"
          @click.prevent="deletePost()"
        />
        
        
        <div class="bottoms">
          <font-awesome-icon
          :icon="['fas', 'thumbs-up']"
          class="icon icon_unlike"
          title="Liker le post"
          @click.prevent="like()"
          v-if="arrayLike.length < 1"
        />

        <font-awesome-icon
          :icon="['fa', 'thumbs-up']"
          class="icon icon_like"
          title="Liker le post"
          @click.prevent="like()"
          v-if="arrayLike.length > 0"
        />
        <span class="cpt">{{ compteurLikes }}</span>
        </div>
      </div>

      <!-- affichage des commentaires -->
      <div v-if="mode == 'comments'" class="comments">
        <span class="title-comment">Laisser un commentaire</span>
        <textarea v-model="commentaire" placeholder="Votre commentaire..."/>
        <button @click.prevent="newComment()">Publier</button>
        <div
          class="comments_post"
          v-for="(comment, index) in comments.filter((comment) => {
            return comment.post == id
          })"
          :key="index"
        >
        <div class="comment">
          <div class="comment_avatar"><img :src="comment.photo" /></div>
          <p class="comment_text">{{ comment.description }}</p>
          <font-awesome-icon
            :icon="['fas', 'trash-alt']"
            class="icon fa-sm"
            title="Supprimer"
            @click.prevent="deleteComment(comment)"
            v-if="auth.userId == comment.user || userInfos.isadmin == 1"
          />
        </div>  
          <span class="comment_infos">{{ comment.firstname }} {{ comment.lastname }}</span>
          <span class="comment_infos">{{ comment.added_date }}</span>
        </div>
      </div>

      <!-- affichage des likes -->
    </div>
  
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "viewposts",
  data: function() {
    return {
      mode: "",
      commentaire: ""
    };
  },

  computed: {
    ...mapState(["auth", "comments", "allcomments","likes", "userInfos"]),

    arrayLike: function(){
      const like = this.likes.filter(el => el.user == this.userInfos.id && el.post == this.id)
      return like
    },

    compteurLikes: function(){
      const like = this.likes.filter(el => el.post == this.id)
      return like.length
    },

    compteurComments: function(){
      const comment = this.allcomments.filter(el => el.post == this.id)
      return comment.length
    }
  
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
      console.log(comment)
      //console.log(this.comments.findIndex(el => el.id === comment.id))
      //const test = this.comments.findIndex(el => el.id === comment.id)
      //this.comments.splice(test, 1);
      //this.$store.dispatch("deleteComment", comment);
    },
    displayComments: function() {
      //console.log(this.id);
      this.mode = "comments";
      this.$store.dispatch("getcomment", {
        id: this.id,
      });
    },
    //displayLikes: function(){
      //console.log(this.likes)
      //this.$store.dispatch("getlike")
    //},
    deletePost: function() {
      //console.log(this.id);
      //this.posts.splice(this.posts.indexOf(this.id), 1);
      this.$store.dispatch("deletePost", {
        id: this.id,
      }).then(() => {
        this.$store.dispatch("getPosts")
      });
    },
    newComment: function() {
      this.$store.dispatch("createComment", {
        description: this.commentaire,
        user: this.auth.userId,
        post: this.id,
      }).then(() => {
        this.$store.dispatch("getallcomment")
        this.$store.dispatch("getcomment", {
        id: this.id,
      });
      })
      this.commentaire = "";
    },

    like: function() {
      if(this.likes.filter(el => el.user == this.userInfos.id && el.post == this.id) == 0){
       this.$store.dispatch("createlike", {
        like: 0,
        user: this.auth.userId,
        post: this.id,
      }).then(() => {
        this.$store.dispatch("getlike")
      })
      }
      else if(this.likes.filter(el => el.user == this.userInfos.id && el.post == this.id)){
        //console.log("test")
        this.$store.dispatch("createlike", {
        like: 1,
        user: this.auth.userId,
        post: this.id,
      }).then(() => {
        this.$store.dispatch("getlike")
      })
      }
      
    },
  },
};
</script>

<style scoped>


.card {
  width: 40%;
  background-color: rgba(255, 255, 255, 0.418);
  /*border: 1px solid rgb(231, 198, 198);*/
 /* border-radius: 0.5rem 0.5rem 0.5rem 0;*/
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
  margin-bottom: 5px;
  word-wrap: break-word;
}

.bodycard img {
  width: 100%;
}

.bottomcard {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  /*border-radius: 0 0 0.5rem 0;*/
  /*background-color: rgba(255, 213, 203, 0);*/
}

.icon {
  padding: 6px;
  color: black;
}

.icon:hover {
  color: rgb(255, 0, 0);
  cursor: pointer;
}

.bottoms{
  display: flex;
}

.icon_like{
  color: blue;
}

.icon_like:hover{
  color: blue;
}

.cpt{
  display: block;
  font-weight: 700;
  padding: 6px;
}

.comments {
  background-color: rgba(233, 220, 220, 0.418);
  padding: 10px 0px;
}

.title-comment {
  font-size: 12px;
  margin-bottom: 5px;
}

textarea {
  width: 90%;
  border-radius: 10px;
  resize: none;
  border: solid 1px rgb(194, 174, 174);
}
.comment{
  display: flex;
  width: 90%;
  margin: auto;
}

.comments_post {
  margin-top: 15px;
}

.comment_avatar img {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.comment_infos{
  font-size: 10px;
  margin-right: 5px;
}
.comments button {
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

.comments button:hover {
  background-color: #524a4a;
}
.comments button:active {
  position: relative;
  top: 1px;
}

/*.commentaires {
  width: 90%;
  border: 1px solid;
  border-radius: 10px;
  padding: 1px;
  margin: auto;
  background-color: rgba(250, 191, 191, 0.63);
}*/

.comment_text {
  text-align: left;
   width: 90%;
  border: 1px solid;
  border-radius: 10px;
  padding: 5px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.63);
  word-wrap: break-word;
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
