<template>
    <div>
        <div class="header">
    <div class="logo">
      <img src="../../public/images/icon-left-font.png"/>
    </div>
    <nav class="navigation">
        <!--<i class="fas fa-users" title="Accueil"></i>-->
        <font-awesome-icon :icon="['fas', 'users']" class="icon" title="Accueil" @click="posts"/>
        <font-awesome-icon :icon="['fas', 'address-card']" class="icon" title="Profil" @click="profil"/>
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon" title="Déconnexion" @click="logout"/>
    </nav>
  </div>
    </div>
</template>

<script>

export default {
 name: 'navigation',
 data: function(){
     return{
         
         
     }
 }, 
 computed:{
   
  },
 methods: {
     posts: function(){
         this.$router.push('/about')
     },
     profil: function(){
         this.$router.push('/profil')
     },
     logout: function(){
         this.$router.push('/')
     }
 }  
}
</script>

<style scoped>
img{
	width: 150px;
	margin-left: 20px;
}

.header{
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	height: 5rem;
	align-items: center;
	background-color: rgba(238, 185, 185, 0.411);
}

.navigation{
	display: flex;
	padding: 20px;
}

.icon{
	margin-right: 30px;
	color: rgb(255, 0, 0);
	cursor: pointer;
}
</style>

