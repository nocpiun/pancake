import { createApp } from "vue";
import ContextMenu from "@imengyu/vue3-context-menu";
import App from "./App.vue";
import router from "./router";

// Styles
import "./style/index.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";

const app = createApp(App);

app.use(router);
app.use(ContextMenu);

app.mount("#app");
