import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import router from "../router";
import fs from "@/data/fs";
//import db from "@/main";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    data: {
      books: []
    },
    // call func to unsubscribe from realtime firestore updates
    unsubscribe: { func: null }
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
    },
    UPDATE_BOOKS(state, books) {
      state.data.books = books;
    },
    SET_UNSUBSCRIBE(state, unsub) {
      state.unsubscribe.func = unsub.func;
    },
    // unsubscribes from firestore realtime updates
    UNSUBSCRIBE(state, uid) {
      window.console.log("mutation unsubscribing: " + uid);
      state.unsubscribe.func();
    }
  },
  actions: {
    // currently a page reload triggers firestore observer callbacks to fire
    // this is because user is fetched on reload. dunno if wanted behaviour or not
    // the observers will probably redundant anyway
    fetchUser({ commit, dispatch }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        window.console.log("user signed in:\n" + user.displayName);
        dispatch("addListener", user.uid);
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        window.console.log("user signed out");
        commit("SET_USER", null);
        commit("UPDATE_BOOKS", null);
      }
    },
    signOut({ commit }) {
      // unsubscribe from firestore observer on signout
      window.console.log("unsubscribing signOut() action");
      commit("UNSUBSCRIBE", firebase.auth().currentUser.uid);

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
    },
    // TODO: set security rules not to set if same doc exists
    addBook({ commit }, volumeInfo) {
      window.console.log("adding new book...");
      // decouple to separate func:
      fs.addBook(volumeInfo);
      commit("ADD_BOOK", volumeInfo);
    },
    // Subscribe to realtime updates in user's mybooks firestore collection
    addListener({ commit }, uid) {
      const unsub = { func: null };
      unsub.func = fs.subscribe(uid);
      // save the returned unsubscribe function
      commit("SET_UNSUBSCRIBE", unsub);
    }
  },

  modules: {}
});
