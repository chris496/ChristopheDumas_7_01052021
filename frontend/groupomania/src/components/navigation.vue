<template>
  <div>
    <div class="header">
      <div class="logo">
        <img src="../../public/images/icon-left-font.png" />
      </div>
      <nav class="navigation">
        <font-awesome-icon
          :icon="['fas', 'users']"
          class="icon"
          title="Accueil"
          @click="posts"
        />
        <font-awesome-icon
          :icon="['fas', 'address-card']"
          class="icon"
          title="Mon profil"
          @click="profil"
        />
        <font-awesome-icon
          :icon="['fas', 'sign-out-alt']"
          class="icon"
          title="Déconnexion"
          @click="logout"
        />
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data: function() {
    return {};
  },
  methods: {
    posts: function() {
      this.$router.push("/posts");
    },
    profil: function() {
      this.$router.push("/profil");
    },
    logout: function() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
img {
  width: 150px;
  margin-left: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  height: 5rem;
  align-items: center;
  background: linear-gradient(to bottom, #f56666, #ff0000);
  box-shadow: 0px 2px 5px rgba(36, 39, 207, 0.22);
}

.navigation {
  display: flex;
  padding: 20px;
}

.icon {
  margin-right: 30px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}

.icon:hover {
  margin-right: 30px;
  padding: 3px;
  color: rgb(255, 0, 0);
  background-color: white;
  cursor: pointer;
  transition: 0.2s;
  border-radius: 10%;
}
</style>
