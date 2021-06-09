<template>
  <div>
    
  <form @submit.prevent="submitForm">
    
    <h2>Inscription</h2>

    
    <p>
      <label for="lastName"></label>
      <input id="lastName" type="text" v-model="lastname" placeholder="Nom">
    </p>

    <p>
      <label for="firstName"></label>
      <input id="firstName" type="text" v-model="firstname" placeholder="Prénom">
    </p>
    
    <p>
      <label for="email"></label>
      <input id="email" type="text" v-model="email" placeholder="Email">
    </p>
    <p>
      <label for="password"></label>
      <input id="password" type="text" v-model="password" placeholder="Mot de passe">
    </p>

     
      <button class="button" type="submit">Valider</button>
    

    <p v-if="errors.length">
      <b>Les informations rentrées ne sont pas valides :</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
   

  </form>


  </div>
</template>

<script>
export default {
  name: 'signup',
  data: function(){
    return{
      errors: [],
      firstname: '',
      lastname:'',
      email:'',
      password:''
    }
  },
  
  

  methods: {
	submitForm: function() {
    
      this.errors = [];
      var regex = /(^[A-z- ]+$)/
      if (!this.lastname || !regex.test(this.lastname) || this.lastname.length > 50)
      {
        this.errors.push("Votre nom ne peut être vide et doit respecter un format classique");
      }
      if (!this.firstname || !regex.test(this.firstname) || this.firstname.length > 50)
      {
        this.errors.push("Votre prénom ne peut être vide et doit respecter un format classique");
      }
      var regexmail = /(^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$)/;
      if (!this.email || !regexmail.test(this.email))
      {
        this.errors.push("Votre email ne peut être vide et doit être une adresse mail valide");
      }
      if (!this.password || !regex.test(this.password) || this.password.length > 50)
      {
        this.errors.push("Votre password doit être renforcé (minimum de 8 caractères dont 1 majuscule, sans espaces)");
      }
      if (!this.errors.length)
      {
        this.$store.dispatch('signup', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password})
      }
  },
  }
}
</script>

<style scoped>
form{
	width: 30%;
	padding: 30px;
	background: #ffffff;
	margin: 50px auto 10px;
	box-shadow: 0px 0px 15px rgba(36, 39, 207, 0.22);
  /*border-radius: 1rem;*/

}  

.switchButton{
  color: red;
  cursor: pointer;
  text-decoration: underline;
}

h2{
	background: #fc2424d8;
	color: #ffffff;
	font-size: 18px;
	font-weight: 100;
	padding: 20px;
	margin: -30px -30px 30px -30px;
    /*border-radius: 1rem 1rem 0 0 ;*/
}

input
{
	box-sizing: border-box;
	display: block;
	width: 100%;
	padding: 7px;
	border: none;
	border-bottom: 1px solid rgb(0, 0, 0);
	margin-bottom: 10px;
	font-size: 16px;
	height: 45px;
}

input:focus{
  border: 2px solid rgb(236, 116, 116) ;
}

button{
	background: linear-gradient(to bottom, #ff0000, #f56666);
	display: block;
  margin: 40px auto 10px;
	cursor: pointer;
	color: #FFFFFF;
	font-size: 14px;
	padding: 8px 60px;
}

button:hover {
  background: linear-gradient(to bottom, #f56666, #ff0000);
}

@media (max-width: 768px) {
            form {
  width: 80%;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
            form {
  width: 50%;
    }
    }
</style>