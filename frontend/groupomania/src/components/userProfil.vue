<template>
  <div>
	<div class="position-card">

		<form @submit.prevent="onSubmit" enctype="multipart/form-data" class="profil">
			<div class="picture">
			<img src="../../public/icon.png"/>
		<label v-if="mode == 'modification'">Ajouter / Modifier photo de profil</label>
				<input v-if="mode == 'modification'" type="file" ref="image" @change="onSelect"/>
			</div>

			<div class="coords">

			<div class="coord">Prénom : {{ userInfos.firstname }}</div>
			<p>
				<label for="firstname"></label>
				<input v-if="mode == 'modification'" type="text" v-model="userInfos.firstname">
			</p>

			<div class="coord">Nom : {{ userInfos.lastname }}</div>
			<p>
			<label for="lastname"></label>
			<input v-if="mode == 'modification'" type="text" v-model="userInfos.lastname">
		</p>

		<div class="coord">Email : {{ userInfos.email }}</div>
		<p>
			<label for="email"></label>
			<input v-if="mode == 'modification'" type="email" v-model="userInfos.email">
		</p>

			<button v-if="mode == 'display'" @click.prevent="switchDisplay()">Modifier coordonnées</button>
		<button v-if="mode == 'modification'" @click.prevent="updateOneUser()">Valider</button>
			</div>
		</form> 

	</div> 
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'userProfil',
  data: function(){
    return{
		mode:'display'
    }
  },

computed:{
  ...mapState({
	userInfos : 'userInfos'
  })
  },  
  
methods: {
  switchDisplay: function (){
	this.mode = 'modification';
	},
  updateOneUser: function(){
	console.log(this.store.userInfos)
	//this.$store.dispatch('updateOneUser')
  },
  onSelect: function(){
    this.image = this.$refs.image.files[0];
    console.log(this.image)
  },
}
}
</script>

<style scoped>
.body{
	display: flex;
	justify-content: center;
}

.position-card{
	display: flex;
	justify-content: center;
}

.profil{
	background-color: rgba(233, 220, 220, 0.418);
	border-radius: 20px;
	border: 10px ridge rgba(196, 171, 171, 0.822);
	box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.22);
	width: 40%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 50px;
}

.coords{
	display: flex;
	flex-direction: column;
}

.coord{
	padding: 20px 0 0 0;
	margin-bottom: 10px;
	border-bottom: solid 1px;
}

.picture{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 200px;
}

.picture img{
   border: solid 2px rgb(255, 225, 225);
   border-radius: 100px;
   width: 150px;
   height: 150px;
   object-fit: cover;
   margin-bottom: 20px;
}

.picture button{
	margin-top: 30px;
	box-shadow: 3px 4px 0px 0px #899599;
	background:linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
	background-color:#ededed;
	border-radius:10px;
	border:1px solid #d6bcd6;
	cursor:pointer;
	color:#3a8a9e;
	padding:7px 15px;
	text-decoration:none;
	transition: all 0.5s;
}

.picture button:hover{
	background:linear-gradient(#dbd5d5 5%, #ece3e277 100%);
	color:#dda7a7;
}

.picture button:active{
	position: relative;
	top: 1px;
}

.coords button{
	display: block;
	margin-top: 40px;
	box-shadow: 3px 4px 0px 0px #899599;
	background:linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
	background-color:#ededed;
	border-radius:10px;
	border:1px solid #d6bcd6;
	cursor:pointer;
	color:#3a8a9e;
	padding:7px 15px;
	text-decoration:none;
	transition: all 0.5s;
}

.coords button:hover{
	background:linear-gradient(#dbd5d5 5%, #ece3e277 100%);
	color:#dda7a7;
}

.coords button:active{
	position: relative;
	top: 1px;
}
</style>