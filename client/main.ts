import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Styles
import "./style/index.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
