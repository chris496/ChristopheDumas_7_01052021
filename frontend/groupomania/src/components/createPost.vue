<template>
  <div>
    <!-- formulaire création nouveau post -->
    <form
      @submit.prevent="onSubmit"
      enctype="multipart/form-data"
      v-if="mode == 'newPost'"
      class="formulaire"
    >
      <font-awesome-icon
        :icon="['fas', 'times']"
        class="icon"
        @click.prevent="closeNewPost()"
      />

      <p>
        <label for="title">Titre du post : </label>
        <input id="title" v-model="title" type="text" name="title" />
      </p>

      <p>
        <label for="description"></label>
        <textarea
          id="description"
          v-model="description"
          type="text"
          name="description"
          placeholder="Entrer la description de votre post..."
        ></textarea>
      </p>

      <p>
        <label>Ajouter une image : </label>
        <input type="file" ref="image" @change="onSelect" />
      </p>

      <button class="sendpost" @click.prevent="newPost()">
        Publier votre post
      </button>
    </form>

    <button class="addpost" @click.prevent="createNewPost()">
      Créer un post
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "createpost",
  data: function() {
    return {
      mode: "",
      title: "",
      description: "",
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    createNewPost () {
      this.mode = "newPost";
    },

    newPost () {
      this.mode = "";
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("image", this.image);
      formData.append("userId", this.auth.userId);
      this.$store.dispatch("createPost", formData).then(() => {
        this.$store.dispatch("getPosts");
        this.title = "";
        this.description = "";
        this.image = "";
      });
    },

    onSelect () {
      this.image = this.$refs.image.files[0];
    },

    closeNewPost () {
      this.mode = "";
      this.title = "";
      this.description = "";
    },
  },
};
</script>

<style scoped>
.formulaire {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.966);
  border: 2px solid rgba(255, 172, 172, 0.61);
  width: 50%;
  padding: 60px 0px 40px 0px;
}

.icon {
  color: red;
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}

/* bouton "créer un post" */
.addpost {
  margin-top: 4px;
  box-shadow: 0px 3px 3px 0px #bdbdbd;
  background-color: #fff9f9;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  color: #4b4a4a;
  font-size: 15px;
  padding: 3px 70px;
  text-decoration: none;
}

.addpost:hover {
  background-color: #f0efef;
}

.addpost:active {
  position: relative;
  top: 1px;
}

textarea {
  width: 90%;
}

/* bouton "publier votre post" */
.sendpost {
  box-shadow: 0px 3px 3px #bdbdbd;
  background-color: #fff9f9;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  padding: 3px 70px;
  text-decoration: none;
  margin-top: 30px;
}

.sendpost:hover {
  background-color: #a5a5a5;
}

.sendpost:active {
  position: relative;
  top: 1px;
}

@media (max-width: 768px) {
  .formulaire {
    position: absolute;
    top: 30%;
    width: 80%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .formulaire {
    position: absolute;
    top: 40%;
    width: 80%;
  }
}
</style>
