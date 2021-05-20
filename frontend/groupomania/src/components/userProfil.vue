<template>
  <div>
    <div v-for="(userInfo,idx) in userInfos" v-bind:key="idx">
    {{ userInfo.email }}
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'userProfil',
  data: function(){
    return{
    }
  },
computed:{
  ...mapState(['userInfos'])
  
  },  
methods: {
  
}
}
</script>

<style>

</style>