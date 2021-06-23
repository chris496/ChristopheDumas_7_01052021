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
    likes: [],
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
    login: async ({ commit }, userData) => {
      try {
        const response = await urlApi
          .post("auth/login", userData);
        commit("Status", "");
        commit("loginUser", response.data);
        console.log(response.data);
      } catch (error) {
        commit("Status", "echec");
        console.log(error);
      }
    },

    signup: async ({ commit }, userData) => {
      try {
        const response = await urlApi
          .post("auth/signup", userData);
        console.log(response.json);
        commit("Status", "");
      } catch (error) {
        commit("Status", "echec");
        console.log(error);
      }
    },

    logout: ({ commit }) => {
      commit("logout");
    },

    // gestion des posts
    createPost: async ({ commit }, Data) => {
      commit;
      try {
        const response = await urlApi
          .post("post/", Data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async updateOnePost({ commit }, Data) {
      commit;
      try {
        const response = await urlApi
          .put(`post/${Data.id}`, Data);
        console.log(response.data);
      } catch (error) {
        return console.log(error);
      }
    },

    getPosts: async ({ commit }) => {
      try {
        const response = await urlApi
          .get("post");
        commit("posts", response.data);
      } catch (error) {
        console.log(error);
        commit("Status", "echec");
      }
    },

    deletePost: async ({ commit }, post) => {
      commit;
      try {
        const response = await urlApi.delete(`post/${post.id}`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    //gestion des profils utilisateurs
    async updateOneUser({ commit }, Data) {
      commit;
      const userId = this.state.auth.userId;
      try {
        const response = await urlApi
          .put(`user/${userId}`, Data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        commit("Status", "echec");
      }
    },

    async getOneUser({ commit }) {
      const userId = this.state.auth.userId;
      try {
        const response = await urlApi
          .get(`user/${userId}`);
        commit("userInfos", response.data[0]);
      } catch (error) {
        console.log(error);
        commit("Status", "echec");
      }
    },

    async deleteProfil({ commit }) {
      const userId = this.state.auth.userId;
      commit;
      try {
        const response = await urlApi.delete(`user/${userId}`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    // gestion des commentaires
    createComment: async ({ commit }, Data) => {
      commit;
      try {
        const response = await urlApi
          .post("comment/", Data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    getcomment: async ({ commit }, Data) => {
      const response = await urlApi.get(`comment/${Data.id}`);
      console.log(response.data);
      commit("getComments", response.data);
    },

    getallcomment: async ({ commit }) => {
      const response = await urlApi.get(`comment`);
      console.log(response.data);
      commit("getAllComments", response.data);
    },

    deleteComment: async ({ commit }, comment) => {
      commit;
      const response = await urlApi.delete(`comment/${comment.id}`);
      console.log(response.data);
    },

    // gestion des likes
    createlike: async ({ commit }, Data) => {
      commit;
      try {
        const response = await urlApi
          .post("like/", Data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    getlike: async ({ commit }) => {
      const response = await urlApi.get(`like/`);
      commit("getLikes", response.data);
    },
  },
  modules: {},
});
