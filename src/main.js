import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { auth } from "./firebase/config";

let app;

// Waiting for firebase auth to initialize, it is a must must for auth guard to function properly
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount("#app");
  }
});
