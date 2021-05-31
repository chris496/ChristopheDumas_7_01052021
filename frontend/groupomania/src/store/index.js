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
    userInfos: "",
    comments: [],
  },

  mutations: {
    testStatus: (state, status) => {
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
    logout: (state) => {
      state.auth.userId = "";
      state.auth.token = "";
    },
  },
  actions: {
    // authentification user
    login: ({ commit }, userData) => {
      return new Promise((resolve, reject) => {
        urlApi
          .post("auth/login", userData)
          .then((response) => {
            resolve(response);
            commit("testStatus", "");
            commit("loginUser", response.data);

            console.log(response.data);
          })
          .catch((error) => {
            reject(error);
            commit("testStatus", "echec");
          });
      });
    },

    signup: ({ commit }, userData) => {
      commit;
      return new Promise((resolve, reject) => {
        urlApi
          .post("auth/signup", userData)
          .then((response) => {
            resolve(response);
            console.log(response.json);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout: function({ commit }) {
      console.log("test_yo");
      commit("logout");
    },
    // gestion des posts
    getPosts: ({ commit }) => {
      urlApi
        .get("post")
        .then((response) => {
          console.log(response.data);
          commit("posts", response.data);
        })
        .catch((error) => console.log(error));
    },

    createPost: ({ commit }, Data) => {
      commit;
      urlApi
        .post("post/", Data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deletePost: ({ commit }, post) => {
      commit;
      urlApi.delete(`post/${post.id}`).then((response) => {
        console.log(response.data);
      });
    },

    //gestion des profils utilisateurs
    updateOneUser({ commit }, test) {
      commit;
      const userId = this.state.auth.userId;
      urlApi
        .put(`user/${userId}`, test)
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
          //console.log(response.json)
          commit("userInfos", response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // gestion des commentaires
    createComment: ({ commit }, test) => {
      commit;
      console.log(test);
      urlApi
        .post("comment/", test)
        .then((response) => {
          //commit('posts', response.data)
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getcomment: ({ commit }, teste) => {
      commit;
      urlApi.get(`comment/${teste.id}`).then((response) => {
        console.log(response.data);
        commit("getComments", response.data);
      });
    },

    deleteComment: ({ commit }, comment) => {
      commit;
      urlApi.delete(`comment/${comment.id}`).then((response) => {
        console.log(response.data);
        //commit('getComments', response.data)
      });
    },

    // gestion des likes
    createlike: ({ commit }) => {
      commit;
    },
  },
  modules: {},
});
