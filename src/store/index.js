import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import router from "../router";
import db from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    data: {
      books: []
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    ADD_BOOK(state, book) {
      state.data.books.push(book);
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            router.push("/");
          },
          function(error) {
            this.console.log("Sign out error: ", error);
          }
        );
      // commit SETLOGGEDIN false
    },
    // change to array append to AVOID DUPLICATES
    addBook({ commit }, volumeInfo) {
      window.console.log("adding new book...");
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("mybooks")
        .add(volumeInfo)
        .catch(err => window.console.log("error: " + err))
        .then(() => {
          window.console.log("added " + volumeInfo.title);
        });
      commit("ADD_BOOK", volumeInfo);
    }
  },
  modules: {}
});
