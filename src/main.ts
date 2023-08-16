import { createApp } from "vue";
import App from "./client/App.vue";
import router from "./client/router";

import "./client/style/index.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
