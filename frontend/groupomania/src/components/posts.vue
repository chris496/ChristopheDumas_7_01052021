<template>

  <div class="all_cards">
    <div v-for="(post,idx) in posts" v-bind:key="idx" class="cards">
      <div class="card">
        <div class="topcard">
          <span>{{ post.firstname }}</span>
          <span>{{ post.added_date }}date</span>
        </div>
        <div class="bodycard">
          {{ post.description }}
        </div>
        <div class="bottomcard">
          <span>{{ post.firstname }}like</span>
          <span>{{ post.firstname }}commentaires</span>
        </div>
      </div>
      <div class="comment">
        <input/>
        <button>Supprimer</button>
      </div>
      <div class="comment">
        <span>Laisser un commentaire</span>
        <input/>
        <button>Envoyer</button>
      </div>
    </div> 
    <h1>Posts récents</h1>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data" v-if="mode == 'newPost'" class="test">
      <p>
        <label for="title">title</label>
        <input id="title" v-model="title" type="text" name="title">{{ title }}
      </p>
      <p>
        <label for="description">description</label>
        <textarea id="description" v-model="description" type="text" name="description"></textarea>
      </p>
      <p>
        <label>Ajouter une image</label>
        <input type="file" ref="picture" @change="onSelect"/>
      </p>
      <button @click.prevent="test()">Ajouter un post</button>
    </form>
    <button @click.prevent="createNewPost()">Ajouter un post</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'viewposts',
  data: function(){
    return{
      mode:'',
      title:'',
      description:'',
      picture:null
    }
  },
computed:{
    ...mapState(['posts', 'user'])
  },  
methods: {
  test: function(){
    const formData = new FormData();
    formData.append('title',this.title);
    formData.append('description',this.description);
    formData.append('picture',this.picture, this.picture.filename);
    formData.append('userId',this.user.userId);
    this.$store.dispatch('createPost', formData)
    
  },
  onSelect: function(){
    this.picture = this.$refs.picture.files[0];
    console.log(this.picture)
  },
  getPosts: function(){
    this.$store.dispatch('getPosts')
  },
  createNewPost: function(){
    this.mode = 'newPost'
  }
}
}
</script>

<style scoped>
.test{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(247, 221, 221, 0.966);
  width: 50%;
  border: 2px solid;
}

.all_cards{
  display: flex;
  flex-direction: column-reverse;
}

 .cards{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
  margin-bottom: 30px;
}

.card{
	width: 40%;
	background-color: rgba(233, 220, 220, 0.418);
	border: 1px solid rgb(231, 198, 198);
	border-radius: 0.5rem 0.5rem 0.5rem 0;
	box-shadow: 0px 5px 15px rgba(36, 39, 207, 0.22);
}

.topcard{
	padding: 10px;
	display: flex;
	justify-content: space-between;
	border-radius: 0.5rem 0.5rem 0 0;
	background-color: rgba(150, 126, 131, 0.774);
}

.bodycard{
	display: flex;
	justify-content: center;
  padding: 20px;
}

.bottomcard{
	padding: 5px;
	display: flex;
	justify-content: space-between;
	border-radius: 0 0 0.5rem 0;
	background-color: rgba(196, 171, 171, 0.822);
}
</style>