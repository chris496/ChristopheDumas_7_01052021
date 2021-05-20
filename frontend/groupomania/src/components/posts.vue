<template>
  <div class="all_cards">
    <div v-for="(post,idx) in posts" v-bind:key="idx" class="cards">
      <div class="card">
        <div class="topcard">
          <span>{{ post.firstname }}nom</span>
          <span>{{ post.added_date }}date</span>
        </div>
        <div class="bodycard">
          {{ post.description }}
          texte ou image
        </div>
        <div class="bottomcard">
          <span>{{ post.firstname }}like</span>
          <span>{{ post.firstname }}commentaires</span>
        </div>
      </div>
    </div> 
    <button @click.prevent="getPosts()">Validation</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'posts',
  data: function(){
    return{
    }
  },
computed:{
    ...mapState(['posts'])
  },  
methods: {
  getPosts: function(){
    this.$store.dispatch('getPosts')
  }
}
}
</script>

<style>
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