<template>
  <div class="about">
    <navigation/>
    <h1>Posts récents</h1>
    <posts/>  
  </div>
</template>

<script>
  import posts from '../components/posts.vue';
  import navigation from '../components/navigation.vue';

export default {
  name: 'About',
  mounted(){
    console.log(this.$store.state.posts)
    this.$store.dispatch('getPosts');
    if(this.$store.state.user.userId == '' || this.$store.state.user.token == ''){
      this.$router.push('/')  
    }
  },
  components: {
    //HelloWorld,
    posts,
    navigation
  },

}
</script>

<style>
body{
	margin: 0;
}


</style>
