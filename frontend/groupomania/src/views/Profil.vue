<template>
  <div>
    <navigation/>
    <h1>Votre profil</h1>
    <userprofil/>
  </div>
</template>

<script>
  import navigation from '../components/navigation.vue';
  import userprofil from '../components/userProfil.vue';

export default {
  name: 'pageProfil',
  mounted(){
    console.log(this.$store.state.userInfos)
    console.log(this.$store.state)
    //?????????????????????????????????????
    this.$store.dispatch('getOneUser');
    if(this.$store.state.user.userId == '' || this.$store.state.user.token == ''){
      this.$router.push('/') 
    }
  },
  components: {
    navigation,
    userprofil
  },

}
</script>

<style>
body{
	margin: 0;
}


</style>