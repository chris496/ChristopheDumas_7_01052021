<template>
<div>
  <div v-for="(allcomment, index) in allcomments" :key="index">
     <p class="commentaires_text">{{ allcomment.description }}</p>
          
          <span>{{ allcomment.user }}</span>
          <span>{{ allcomment.added_date }}</span>
          <font-awesome-icon
            :icon="['fas', 'trash-alt']"
            class="icon"
            title="Supprimer"
            @click.prevent="deleteComment(allcomment)"
            v-if="userInfos.isadmin == 1"
          />
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "allComments",
  data: function() {
    return {
      
    };
  },

  computed: {
    ...mapState(["auth", "allcomments", "userInfos"]),
  },

methods: {
deleteComment: function(comment) {
      console.log(comment)
      //console.log(this.comments.findIndex(el => el.id === comment.id))
      //const test = this.comments.findIndex(el => el.id === comment.id)
      //this.comments.splice(test, 1);
      //this.$store.dispatch("deleteComment", comment);
    },
},
};
</script>

<style scoped>
.commentaires_text {
  text-align: left;
   width: 50%;
  border: 1px solid;
  border-radius: 10px;
  padding: 5px;
  margin: 10px auto;
  background-color: rgba(255, 255, 255, 0.63);
  word-wrap: break-word;
}
</style>
