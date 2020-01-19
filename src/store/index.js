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
    },
    book: state => id => {
      return state.data.books.filter(book => book.id == id);
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
      if (!state.data.books.some(item => item.id === book.id))
        state.data.books.push(book);
    },
    UPDATE_BOOKS(state, books) {
      state.data.books = books;
    },
    UPDATE_BOOK(state, book) {
      state.data.books = state.data.books.filter(b => b.id !== book.id);
      state.data.books.push(book);
    },
    REMOVE_BOOK(state, id) {
      state.data.books = state.data.books.filter(book => book.id !== id);
    },
    SET_UNSUBSCRIBE(state, unsub) {
      state.unsubscribe.func = unsub.func;
    },
    // unsubscribes from firestore realtime updates
    UNSUBSCRIBE(state) {
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
        dispatch("addListener", user);
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
        commit("UPDATE_BOOKS", []);
      }
    },
    signOut({ commit }) {
      // unsubscribe from firestore observer on signout
      commit("UNSUBSCRIBE", firebase.auth().currentUser.uid);

      firebase
        .auth()
        .signOut()
        .then(() => {
          router.push("/welcome");
        });
    },
    // TODO: set security rules not to set if same doc exists
    addBook({ commit }, volumeInfo) {
      // decouple to separate func:
      commit("ADD_BOOK", volumeInfo);
    },
    // Subscribe to realtime updates in user's mybooks firestore collection
    addListener({ commit }, user) {
      const unsub = { func: null };
      unsub.func = fs.subscribe(user);
      // save the returned unsubscribe function
      commit("SET_UNSUBSCRIBE", unsub);
    },
    removeBook({ commit }, id) {
      commit("REMOVE_BOOK", id);
    },
    updateBook({ commit }, book) {
      commit("UPDATE_BOOK", book);
    }
  },

  modules: {}
});
