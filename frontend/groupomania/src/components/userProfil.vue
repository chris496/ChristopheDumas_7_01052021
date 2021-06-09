<template>
  <div>
    <div class="position-card">
      <form
        @submit.prevent="onSubmit"
        enctype="multipart/form-data"
        class="profil"
      >
        <div class="picture">
          <img :src="userInfos.photo"/>
          <label v-if="mode == 'modification'"
            >Ajouter / Modifier votre photo de profil</label
          >
          <input
            v-if="mode == 'modification'"
            type="file"
            ref="image"
            @change="onSelect"
          />
        </div>

        <div class="coords">
          <div class="coord">Prénom : {{ userInfos.firstname }}</div>
          <p>
            <label for="firstname"></label>
            <input
              v-if="mode == 'modification'"
              type="text"
              v-model="userInfos.firstname"
            />
          </p>

          <div class="coord">Nom : {{ userInfos.lastname }}</div>
          <p>
            <label for="lastname"></label>
            <input
              v-if="mode == 'modification'"
              type="text"
              v-model="userInfos.lastname"
            />
          </p>

          <div class="coord">Email : {{ userInfos.email }}</div>
          <p>
            <label for="email"></label>
            <input v-if="mode == 'modification'" type="email" v-model="userInfos.email" />
          </p>

          <button v-if="mode == 'display'" @click.prevent="switchDisplay()">
            Modifier vos coordonnées
          </button>
          <div class="modif_profil" v-if="mode == 'modification'">
            <button
              @click.prevent="cancelUpdateOneUser()"
            >
              Annuler
            </button>
            <button
              @click.prevent="updateOneUser()"
            >
              Valider
            </button>
          </div>
        </div>
      </form>
    </div>
    <button class="deleteProfil" @click.prevent="deleteOneUser()">Supprimer votre compte</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "userProfil",
  data: function() {
    return {
      mode: "display",
      firstname: "",
      lastname: "",
      email: "",
      photo: null,
    };
  },

  computed: {
    ...mapState({
      userInfos: "userInfos",
    }),
  },

  methods: {
    deleteOneUser: function() {
      this.$store.dispatch("deleteProfil");
      this.$router.push("/");
    },
    switchDisplay: function() {
      this.mode = "modification";
    },
    cancelUpdateOneUser: function() {
      this.mode = "display";
    },
    updateOneUser: function() {
      const formData = new FormData();
      formData.append("firstname", this.firstname);
      formData.append("lastname", this.lastname);
      formData.append("image", this.image);
      formData.append("email", this.email);
      this.$store.dispatch("updateOneUser", formData).then(() => {
        this.$store.dispatch("getOneUser");
      })
    },
    onSelect: function() {
      this.image = this.$refs.image.files[0];
      console.log(this.image);
    },
  },
};
</script>

<style scoped>
.body {
  height: 100%;
}

.position-card {
  display: flex;
  justify-content: center;
}

.profil {
  background-color: rgba(255, 255, 255, 0.418);
  /*border-radius: 20px;*/
  /*border: 10px ridge rgba(196, 171, 171, 0.822);*/
  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.22);
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 50px;
  margin-bottom: 20px;
}

.coords {
  display: flex;
  flex-direction: column;
}

.coord {
  padding: 20px 0 0 0;
  margin-bottom: 10px;
  border-bottom: solid 1px;
}

.picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}

.picture img {
  border: solid 2px rgb(255, 225, 225);
  border-radius: 100px;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 20px;
}

.picture button {
  margin-top: 30px;
  box-shadow: 3px 4px 0px 0px #899599;
  background: linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
  background-color: #ededed;
  border-radius: 10px;
  border: 1px solid #d6bcd6;
  cursor: pointer;
  color: #3a8a9e;
  padding: 7px 15px;
  text-decoration: none;
  transition: all 0.5s;
}

.picture button:hover {
  background: linear-gradient(#dbd5d5 5%, #ece3e277 100%);
  color: #dda7a7;
}

.picture button:active {
  position: relative;
  top: 1px;
}

.coords button {
  display: block;
  margin: 20px 5px 0px 5px;
  box-shadow: 1px 2px 3px #899599;
  background: linear-gradient(to bottom, #ffffff 5%, #bab1ba 100%);
  background-color: #ededed;
  border-radius: 2px;
  border: 1px solid #d6bcd6;
  cursor: pointer;
  padding: 5px 10px;
  text-decoration: none;
  transition: all 0.5s;
}

.coords button:hover {
  background: linear-gradient(#dbd5d5 5%, #ece3e277 100%);
}

.coords button:active {
  position: relative;
  top: 1px;
}

.deleteProfil{
  cursor: pointer;
  background-color: rgb(252, 66, 66);
  color: rgb(255, 255, 255);
  padding: 5px;
  border: none;
}

.deleteProfil:active{
  position: relative;
  top: 1px;
}

.modif_profil{
  display: flex;
  justify-content: center;
}

@media (max-width: 1024px) {
            .profil {
  width: 70%;
}
}
</style>
