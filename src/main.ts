import { createApp } from "vue";
import App from "./client/App.vue";
import router from "./client/router";

const app = createApp(App);

app.use(router);

app.mount("#app");
