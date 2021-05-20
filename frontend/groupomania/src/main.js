import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAddressCard, faUsers, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faAddressCard, faUsers, faSignOutAlt);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(store).use(router).mount('#app')
