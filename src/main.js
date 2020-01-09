import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBpoJxak5SOuHsD5ouC8XaW4vtkSkRhSgQ",
  authDomain: "bookfiretest.firebaseapp.com",
  databaseURL: "https://bookfiretest.firebaseio.com",
  projectId: "bookfiretest",
  storageBucket: "bookfiretest.appspot.com",
  messagingSenderId: "1009083636860",
  appId: "1:1009083636860:web:b1e1ed2ecb1b42c377fdf9",
  measurementId: "G-RZ7XKLFTRL"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
// not sure if still mandatory:
//db.settings({ timestampsInSnapshots: true });
export default db;

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  db,
  render: h => h(App)
}).$mount("#app");
