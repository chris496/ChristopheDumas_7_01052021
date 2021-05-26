<template>
  <div class="all_cards">
    <!-- affichage des posts -->
    <div v-for="(post,idx) in posts" v-bind:key="idx" class="cards">
      <div class="card">
        <div class="topcard">
          <div><img class="logo" :src="post.picture"/></div>
        <div class="infos">
          <div class="name">{{ post.firstname }} {{ post.lastname }}</div>
          <div class="title">{{ post.title }}titre</div>
        </div>
          <div class="date">{{ post.added_date }}</div>
        </div>

        <div class="bodycard">
          <span>{{ post.description }}</span>
          <img :src="post.picture"/>
        </div>

        <div class="bottomcard">
          <font-awesome-icon :icon="['far', 'comment-dots']" class="icon" title="Afficher/créer commentaires" @click.prevent="displayComments()"/>
          <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon" title="Supprimer le post" v-if="post.user == auth.userId" @click.prevent="deletePost(post)"/>
          <font-awesome-icon :icon="['far', 'thumbs-up']" class="icon" title="Liker le post"/>
        </div>

    <!-- affichage des commentaires -->
      <div v-if="mode == 'comments'" class="comment">
        <span class="title-comment">Laisser un commentaire</span><br>
        <textarea v-model="description"/>
        <span>{{description}}</span>
        <button @click.prevent="newComment(comment)">Publier</button>

        <div class="comments-post">
          commentaires
        </div>
        <div>
          commentaires
        </div>
        <div>
          commentaires
        </div>
      </div>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'viewposts',
  data: function(){
    return{
      mode: '',
     description: ''
    }
  },

computed:{
    ...mapState(['posts', 'auth'])
  },  

methods: {
  displayComments: function(){
    this.mode = 'comments'
  },
  deletePost: function(post){
    console.log(post)
    this.$store.dispatch('deletePost', post)
  },
  newComment: function(){
    const description =this.description
    console.log(description)
    this.$store.dispatch('createComment', {
      description : this.description,
      user: this.auth.userId,
      post: this.posts.id
    })
  }
}
}
</script>

<style scoped>

.all_cards{
  display: flex;
  flex-direction: column-reverse;
}

.cards{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
  margin-top: 30px;
}

.card{
	width: 40%;
	background-color: rgba(233, 220, 220, 0.418);
	border: 1px solid rgb(231, 198, 198);
	border-radius: 0.5rem 0.5rem 0.5rem 0;
	box-shadow: 0px 5px 15px rgba(36, 39, 207, 0.22);
}

.topcard{
	padding: 15px 15px 0 15px;
	display: flex;
	justify-content:flex-start;
	border-radius: 0.5rem 0.5rem 0 0;
}

.logo{
  width:40px;
  height: 40px;
   border-radius:50%;
   box-shadow: darkorange;
   object-fit:cover;
   margin-right: 15px;
   box-shadow: 1px 1px 6px rgb(53, 50, 50);
}

.name{
  font-weight: 600;
  font-size: 12px;
}

.date{
	margin-left: auto;
}

.bodycard{
	display: flex;
	justify-content: center;
  padding: 20px;
}

.bodycard img{
  width: 100%;
}

.bottomcard{
	padding: 10px;
	display: flex;
	justify-content: space-between;
	border-radius: 0 0 0.5rem 0;
	background-color: rgba(196, 171, 171, 0.822);
}

.icon{
  padding: 6px;
  color: black;
}

.icon:hover{
  color: rgb(255, 0, 0);
  cursor: pointer;
}

.comment{
  background-color: rgba(233, 220, 220, 0.418);
}

.title-comment{
  font-size: 12px;
}

textarea{
  width: 90%;
  border-radius: 10px;
  resize: none;
  border: solid 1px rgb(194, 174, 174);
}

.comments-post{
  margin-top: 15px;
}

.comment button{
  box-shadow: 0px 10px 14px -7px #276873;
	
  background-color:#408c99;
	border-radius:8px;
	cursor:pointer;
	color:#ffffff;
	font-size:10px;
	padding:5px 11px;
	text-decoration:none;
	text-shadow:0px 1px 0px #3d768a;
}

.comment button:hover {
  background-color:#524a4a;
}
.comment button:active {
	position:relative;
	top:1px;
}
</style>