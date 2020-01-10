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
      books: [],
      // FIX HERE
      unsubscribeFunction: null
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    // FIX HERE
    // HOW ELSE CALL A METHOD IN STATE PROPERTY?
    unsubscribe(state) {
      window.console.log("unsubscribing getter");
      return state.unsubscribeFunction;
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
    SET_UNSUBSCRIBE(state, unsubFunc) {
      state.data.unsubscribeFunction = unsubFunc;
    },
    // FIX HERE
    UNSUBSCRIBE() {
      window.console.log("unsubscribing mutation");
      this.getters.unsubscribe;
    }
  },
  actions: {
    fetchUser({ commit, dispatch }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        dispatch("addListener", user.uid);
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },
    signOut() {
      // FIX HERE
      window.console.log("unsubscribing signOut() action");
      this.data.unsubscribeFunction();
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
      // TODO: commit SETLOGGEDIN false
    },
    // TODO: set security rules not to set if same doc exists
    addBook({ commit }, volumeInfo) {
      window.console.log("adding new book...");
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("mybooks")
        .doc(volumeInfo.industryIdentifiers[0].identifier)
        .set(volumeInfo)
        .catch(err => window.console.log("error: " + err))
        .then(() => {
          window.console.log("added " + volumeInfo.title);
        });
      commit("ADD_BOOK", volumeInfo);
    },
    // implemented as action since query is async but nothing to commit
    // eslint-disable-next-line no-unused-vars
    addListener({ commit }, uid) {
      // FIX HERE
      const unsubFunc = db
        .collection("users")
        .doc(uid)
        .collection("mybooks")
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              window.console.log("added: ", change.doc.data());
            }
            if (change.type === "modified") {
              window.console.log("Modified: ", change.doc.data());
            }
            if (change.type === "removed") {
              window.console.log("Removed: ", change.doc.data());
            }
          });
        });
      // FIX HERE
      this.state.data.unsubscribeFunction = unsubFunc;
    }
  },

  modules: {}
});
