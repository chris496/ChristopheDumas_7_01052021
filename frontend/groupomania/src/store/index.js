import { createStore } from "vuex";
import axios from "axios";

const urlApi = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default createStore({
  state: {
    status: "",
    auth: {
      userId: "",
      token: "",
    },
    posts: [],
    userInfos: [],
    comments: [],
    allcomments: [],
    likes: []
  },

  getters : {
    isAdmin: state => state.userInfos.isadmin
  },

  mutations: {
    Status: (state, status) => {
      state.status = status;
    },

    loginUser: (state, auth) => {
      urlApi.defaults.headers.common["Authorization"] = "Bearer " + auth.token;
      state.auth = auth;
    },
    posts: (state, posts) => {
      state.posts = posts;
    },
    userInfos: (state, userInfos) => {
      state.userInfos = userInfos;
    },
    getComments: (state, comments) => {
      state.comments = comments;
    },
    getAllComments: (state, allcomments) => {
      state.allcomments = allcomments;
    },
    getLikes: (state, likes) => {
      state.likes = likes;
    },
    logout: (state) => {
      state.auth.userId = "";
      state.auth.token = "";
    },
  },
  actions: {
    // authentification user
    login: ({ commit }, userData) => {
      return urlApi
        .post("auth/login", userData)
        .then((response) => {
            commit("Status", "");
            commit("loginUser", response.data);
            console.log(response.data);
          })
        .catch((error) => {
            commit("Status", "echec");
            console.log(error);
          });
    },

    signup: ({ commit }, userData) => {
        return urlApi
          .post("auth/signup", userData)
          .then((response) => {
            console.log(response.json);
            commit("Status", "");
            //this.$router.push('/')
          })
          .catch((error) => {
            commit("Status", "echec");
            console.log(error);
          });
    },

    logout: function({ commit }) {
      commit("logout");
    },

    // gestion des posts
    createPost: ({ commit }, Data) => {
      commit;
      return urlApi
        .post("post/", Data)
        .then((response) => {
          console.log(response.data);
          
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getPosts: ({ commit }) => {
      urlApi
        .get("post")
        .then((response) => {
          console.log(response.data);
          commit("posts", response.data);
        })
        .catch((error) => console.log(error));
    },

    deletePost: ({ commit }, post) => {
      commit;
      return urlApi.delete(`post/${post.id}`)
      .then((response) => {
        console.log(response.data);
      });
    },

    //gestion des profils utilisateurs
    updateOneUser({ commit }, Data) {
      commit;
      const userId = this.state.auth.userId;
      return urlApi
        .put(`user/${userId}`, Data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },

    getOneUser({ commit }) {
      const userId = this.state.auth.userId;
      urlApi
        .get(`user/${userId}`)
        .then((response) => {
          commit("userInfos", response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteProfil ({ commit }) {
      const userId = this.state.auth.userId;
      commit;
      urlApi.delete(`user/${userId}`)
      .then((response) => {
        console.log(response.data);
      });
    },

    // gestion des commentaires
    createComment: ({ commit }, Data) => {
      commit;
      urlApi
        .post("comment/", Data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getcomment: ({ commit }, Data) => {
      urlApi.get(`comment/${Data.id}`).then((response) => {
        console.log(response.data);
        commit("getComments", response.data);
      });
    },

    getallcomment: ({ commit }) => {
      commit;
      urlApi.get(`comment`).then((response) => {
        console.log(response.data);
        commit("getAllComments", response.data);
      });
    },

    deleteComment: ({ commit }, comment) => {
      commit;
      urlApi.delete(`comment/${comment.id}`).then((response) => {
        console.log(response.data);
      });
    },

    // gestion des likes
    createlike: ({ commit }, Data) => {
      commit;
      urlApi.post("like/", Data).then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
    },

    getlike: ({ commit }) => {
      return urlApi.get(`like/`).then((response) => {
        console.log(response.data);
        commit("getLikes", response.data);
      });
    },
  },
  modules: {},
});
