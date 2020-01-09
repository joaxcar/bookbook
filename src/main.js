import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCJ5whedb1wm0kH66d202MLw_1wYYYa2uE",
  authDomain: "bookbook-dh2642.firebaseapp.com",
  databaseURL: "https://bookbook-dh2642.firebaseio.com",
  projectId: "bookbook-dh2642",
  storageBucket: "bookbook-dh2642.appspot.com",
  messagingSenderId: "1066546781536",
  appId: "1:1066546781536:web:d0e0ed3651a1d0e3e2d205",
  measurementId: "G-REN3JR2G7C"
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
