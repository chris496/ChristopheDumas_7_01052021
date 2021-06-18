import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// gestion font awesome
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faAddressCard,
  faUsers,
  faSignOutAlt,
  faTrashAlt,
  faTimes,
  faThumbsUp,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

import { 
  faCommentDots, 
} from "@fortawesome/free-regular-svg-icons";

library.add(
  faAddressCard,
  faUsers,
  faSignOutAlt,
  faCommentDots,
  faThumbsUp,
  faTrashAlt,
  faTimes,
  faEdit
);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app");
