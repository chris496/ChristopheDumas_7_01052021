import { createStore} from 'vuex';
import axios from 'axios';
//let user = JSON.parse(localStorage.getItem('user'))
//const userAuth = JSON.parse(localStorage.getItem('user'));
const urlApi = axios.create({
  baseURL: 'http://localhost:3000/api/',
  //headers: {
    //Authorization: 'Bearer ' + user.token
  //}
})


export default createStore({
  state: {
    status:'',
    user: {
      userId: '',
      token: ''
    },
    posts: '',
    userInfos: ''
  },
  mutations: {
   testStatus: (state, status) => {
     state.status = status
   },
   loginUser: (state, user) => {
    urlApi.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
     state.user = user
   },
   posts: (state, posts) => {
     state.posts = posts
   },
   userInfos: (state, userInfos) => {
     state.userInfos = userInfos
   },
   putOneUser: (state,userInfos) => {
    state.userInfos = userInfos
   }
  },
  actions: {
    login: ({commit}, userData) => {
      return new Promise((resolve, reject) => {
        urlApi.post('auth/login', userData)
        .then(response => {
          resolve(response)
          commit('testStatus', '')
          commit('loginUser', response.data)
          
          console.log(response.data)
      })
        .catch(error => {
          reject(error)
          commit('testStatus', 'echec')
        })
      })
    },

    signup: ({commit}, userData) => {
      commit;
      return new Promise((resolve, reject) => {
        urlApi.post('auth/signup', userData)
        .then(response => {
          resolve(response)
          console.log(response.json)
      })
        .catch(error => {
          reject(error)
          
        })
      })
    },

    getPosts: ({commit}) => {
      urlApi.get('post')
      .then(response => {
        console.log(response.data)
        commit('posts', response.data)
      })
      .catch(error => console.log(error))
    },

    createPost: ({commit}, Data) => {
      
      
        urlApi.post('post/post', Data)
        .then(response => {
          
          commit('posts', response.data)
          
          console.log(response.data)
      })
        .catch(error => {
          console.log(error)
        })
      
    },

    updateOneUser({commit, state}) {
      const userId = this.state.user.userId
      urlApi.put(`user/${userId}`, state.userInfos[0])
      .then(response => {
        console.log(response.data)
        commit('userInfos', response.data)
      })
      .catch(error => console.log(error))
    },

    getOneUser({commit}) {
        const userId = this.state.user.userId
        urlApi.get(`user/${userId}`)
        .then(response => {
          //console.log(response.json)
          commit('userInfos', response.data)
      })
        .catch(error => {console.log(error)
         
          
        
      })
      
      
    }
  },
  modules: {
  }
})

