<template>
  <div class="about">
    <navigation/>
    <createpost/>
    <posts/>  
  </div>
</template>

<script>
  import posts from '../components/posts.vue';
  import createpost from '../components/createPost.vue';
  import navigation from '../components/navigation.vue';

export default {
  name: 'About',
  mounted(){
    this.$store.dispatch('getPosts');

    console.log(this.$store.state.posts)
    
    if(this.$store.state.auth.userId == '' || this.$store.state.auth.token == ''){
      this.$router.push('/')  
    }
  },
  components: {
    //HelloWorld,
    posts,
    navigation,
    createpost
  },

}
</script>

<style>
body{
	margin: 0;
}


</style>
