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
        dispatch("addListener", user.uid);
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
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
      // TODO: commit SETLOGGEDIN false and flush user data / book collection
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
    // Subscribe to realtime updates in user's mybooks firestore collection
    addListener({ commit }, uid) {
      const unsub = { func: null };
      unsub.func = db
        .collection("users")
        .doc(uid)
        .collection("mybooks")
        // onSnapShot takes a function to call back when specified collection is changed
        // change.doc.data() returns the updated object: document or field
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
      // save the returned unsubscribe function
      commit("SET_UNSUBSCRIBE", unsub);
    }
  },

  modules: {}
});
