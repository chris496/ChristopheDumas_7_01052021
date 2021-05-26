import { createStore} from 'vuex';
import axios from 'axios';

const urlApi = axios.create({
  baseURL: 'http://localhost:3000/api/',
})

export default createStore({
state: {
  status:'',
    auth: {
      userId: '',
      token: ''
    },
    posts: '',
    userInfos: '',
    comment: ''
  },

  mutations: {
   testStatus: (state, status) => {
     state.status = status
   },

   loginUser: (state, auth) => {
    urlApi.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token;
     state.auth = auth
   },
   posts: (state, posts) => {
     state.posts = posts
   },
   userInfos: (state, userInfos) => {
     state.userInfos = userInfos
   },
   getComments: (state, comments) => {
    state.comments = comments
   }
  },
  actions: {

  // authentification user
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

// gestion des posts
    getPosts: ({commit}) => {
      urlApi.get('post')
      .then(response => {
        console.log(response.data)
        commit('posts', response.data)
      })
      .catch(error => console.log(error))
    },

    createPost: ({commit}, Data) => {
        urlApi.post('post/', Data)
        .then(response => {
          commit('posts', response.data)
          console.log(response.data)
      })
        .catch(error => {
          console.log(error)
        })
    },

deletePost: ({commit}, post) => {
  commit;
  urlApi.delete(`post/${post.id}`)
  .then(response => {
    console.log(response.data)
  })
},

//gestion des profils utilisateurs
    updateOneUser({commit, state}) {
      const userId = this.state.auth.userId
      urlApi.put(`user/${userId}`, state.userInfos[0])
      .then(response => {
        console.log(response.data)
        commit('userInfos', response.data)
      })
      .catch(error => console.log(error))
    },

    getOneUser({commit}) {
        const userId = this.state.auth.userId
        urlApi.get(`user/${userId}`)
        .then(response => {
          //console.log(response.json)
          commit('userInfos', response.data)
      })
        .catch(error => {console.log(error)  
      })  
    },

// gestion des commentaires
createComment: ({commit}, test) => {
  commit;
  console.log(test)
  /*return new Promise((resolve, reject) => {
  urlApi.post('comment/', test)
  .then(response => {
    resolve(response)
    console.log(response.data)
  })
  .catch(error => {
    reject(error)
    
  })
})*/
}



  },
  modules: {
  }
})

