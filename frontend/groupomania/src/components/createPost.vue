<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      enctype="multipart/form-data"
      v-if="mode == 'newPost'"
      class="formulaire"
    >
    <font-awesome-icon :icon="['fas', 'times']" class="icon" @click.prevent="closeNewPost()"/>

      <p>
        <label for="title">Titre : </label>
        <input id="title" v-model="title" type="text" name="title" />{{ title }}
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
      Ajouter un post
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
      images: null,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    newPost: function() {
      this.mode = "";
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("image", this.image);
      formData.append("userId", this.auth.userId);
      this.$store.dispatch("createPost", formData);
    },

    onSelect: function() {
      this.image = this.$refs.image.files[0];
      //console.log(this.image);
    },

    createNewPost: function() {
      this.mode = "newPost";
    },
    closeNewPost: function() {
      this.mode = "";
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
  background-color: rgba(224, 223, 223, 0.966);
  border-radius: 20px;
  width: 50%;
  padding: 40px;
}

.icon{
  color: red;
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}

.addpost {
  margin-top: 4px;
  box-shadow: 0px 3px 3px 0px #bdbdbd;
  background-color: #fcb5b5;
  border-radius: 3px;
  cursor: pointer;
  color: #4b4a4a;
  font-size: 15px;
  padding: 3px 70px;
  text-decoration: none;
}

.addpost:hover {
  background-color: #f8cece;
}

.addpost:active {
  position: relative;
  top: 1px;
}

textarea {
  width: 90%;
}

.sendpost {
  box-shadow: 0px 3px 3px 0px #bdbdbd;
  background-color: #696969;
  border-radius: 10px;
  cursor: pointer;
  color: #ffffff;
  font-size: 15px;
  padding: 3px 70px;
  text-decoration: none;
}

.sendpost:hover {
  background-color: #a5a5a5;
}

.sendpost:active {
  position: relative;
  top: 1px;
}
</style>
