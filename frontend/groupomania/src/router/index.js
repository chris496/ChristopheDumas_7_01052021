import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/posts",
    name: "Posts",
    component: () =>
      import("../views/Posts.vue"),
  },
  {
    path: "/profil/",
    name: "Profil",
    component: () =>
      import("../views/Profil.vue"),
  },
  
  {
    path: "/moderation",
    name: "Moderation",
    component: () =>
      import("../views/Moderation.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
