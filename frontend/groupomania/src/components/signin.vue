<template>
  <div>
    <form>
      <h2>Connexion</h2>
      <p>
        <label for="email"></label>
        <input id="email" type="text" v-model="email" placeholder="Email" />
      </p>
      <p>
        <label for="password"></label>
        <input
          id="password"
          type="text"
          v-model="password"
          placeholder="Mot de passe"
        />
      </p>
      <span v-if="status == 'echec'">Email et/ou mot de passe invalide</span>
      <button @click.prevent="loginUser()">Connexion</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "signin",
  data: function() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    status() {
      return this.$store.state.status;
    },
  },

  methods: {
    loginUser () {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/posts");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
form {
  width: 30%;
  padding: 30px;
  background: #ffffff;
  margin: 50px auto 10px;
  box-shadow: 0px 0px 15px rgba(36, 39, 207, 0.22);
  /*border-radius: 1rem;*/
}

.switchButton {
  color: red;
  cursor: pointer;
  text-decoration: underline;
}

h2 {
  background: #fc2424d8;
  color: #ffffff;
  font-size: 18px;
  font-weight: 100;
  padding: 20px;
  margin: -30px -30px 30px -30px;
  /*border-radius: 1rem 1rem 0 0;*/
}

input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 7px;
  border: none;
  border-bottom: 1px solid rgb(0, 0, 0);
  background: none;
  margin-bottom: 10px;
  font-size: 16px;
  height: 45px;
}

input:focus {
  border: none;
}

button {
  background: linear-gradient(to bottom, #ff0000, #f56666);
  display: block;
  margin: 40px auto 10px;
  cursor: pointer;
  color: #ffffff;
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
