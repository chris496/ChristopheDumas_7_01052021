<template>
  <div>
    <h1>Bienvenue sur votre réseau social groupomania</h1>
  <form>
    
    <h2 v-if="mode == 'login'">Connexion</h2>
    <h2 v-else>Inscription</h2>
    <p>
      <label v-if="mode == 'subscribe'" for="firstName"></label>
      <input v-if="mode == 'subscribe'" id="firstName" type="text" v-model="firstname" placeholder="Nom">
    </p>
    <p>
      <label v-if="mode == 'subscribe'" for="lastName"></label>
      <input v-if="mode == 'subscribe'" id="lastName" type="text" v-model="lastname" placeholder="Prénom">
    </p>
    <p>
      <label for="email"></label>
      <input id="email" type="text" v-model="email" placeholder="Email">
    </p>
    <p>
      <label for="password"></label>
      <input id="password" type="text" v-model="password" placeholder="Mot de passe">
    </p>

    <span v-if="status == 'echec'">Email et/ou mot de passe invalide</span>

    <button v-if="mode == 'login'" @click.prevent="loginUser()">Connexion</button>
    <button v-else @click.prevent="signupUser()">Validation</button>

  </form>

  <span v-if="mode == 'subscribe'" class="switchButton" @click="switchlogin()">se connecter</span>
  <span v-if="mode == 'login'" class="switchButton" @click="switchSubscribe()">s'inscrire</span>

  </div>
</template>

<script>
export default {
  name: 'formulaire',
  data: function(){
    return{
      mode:'login',
      firstname: '',
      lastname:'',
      email:'',
      password:''
    }
  },
  
  computed:{
    status(){
      return this.$store.state.status
    }
  },

  methods: {
	switchSubscribe: function (){
	this.mode = 'subscribe';
	},
  switchlogin: function (){
	this.mode = 'login';
	},

  loginUser: function(){
    this.$store.dispatch('login', {
      email: this.email,
      password: this.password
    }).then(() => {this.$router.push('/about')})
    .catch(error => console.log(error))
  },

  signupUser: function(){
    this.$store.dispatch('signup', {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    }).then(() => this.loginUser())
    .catch(error => console.log(error))
  }
  }
}
</script>

<style scoped>
form{
	width: 500px;
	padding: 30px;
	background: #ff8383;
	margin: 50px auto 10px;
	box-shadow: 0px 0px 15px rgba(36, 39, 207, 0.22);
  border-radius: 1rem;

}  

.switchButton{
  color: red;
  cursor: pointer;
  text-decoration: underline;
}

h2{
	background: #dd4343a2;
	color: #ffffff;
	font-size: 18px;
	font-weight: 100;
	padding: 20px;
	margin: -30px -30px 30px -30px;
    border-radius: 1rem 1rem 0 0 ;
}

input
{
	box-sizing: border-box;
	display: block;
	width: 100%;
	padding: 7px;
	border: none;
	border-bottom: 1px solid #ddd;
	margin-bottom: 10px;
	font-size: 16px;
	height: 45px;
}

input:focus{
  border: 2px solid rgb(236, 116, 116) ;
}

button{
	background-color: #ff0000;
	display: block;
  margin: 40px auto 10px;
	cursor: pointer;
	color: #FFFFFF;
	font-size: 14px;
	padding: 8px 60px;
}
</style>