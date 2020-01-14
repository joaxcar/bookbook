import firebase from "firebase";
import db from "@/main";
import store from "@/store";

// firestore update methods
const fs = {
  addBook: volumeInfo => {
    db.collection("users")
      // suggestion: maybe get uid from store instead of auth()
      // also could use email as unique identifer instead
      .doc(firebase.auth().currentUser.email)
      .collection("mybooks")
      .doc(volumeInfo.id)
      .set(volumeInfo)
      .catch(err => window.console.log("error: " + err))
      .then(() => {
        //window.console.log("added DEL 2 " + volumeInfo.title);
      });
  },
  removeBook(id) {
    db.collection("users")
      // suggestion: maybe get uid from store instead of auth()
      // also could use email as unique identifer instead
      .doc(firebase.auth().currentUser.email)
      .collection("mybooks")
      .doc(id)
      .delete()
      .catch(err => window.console.log("error: " + err));
  },
  modifyBook(id, data) {
    window.console.log(data);
    db.collection("users")
      // suggestion: maybe get uid from store instead of auth()
      // also could use email as unique identifer instead
      .doc(firebase.auth().currentUser.email)
      .collection("mybooks")
      .doc(id)
      .update(data)
      .catch(err => window.console.log("error: " + err));
  },
  addUser: () => {
    const user = firebase.auth().currentUser;
    db.collection("users")
      .doc(user.email)
      .set({ displayName: user.displayName, email: user.email })
      .catch(err => window.console.error("firestore adduser error: " + err));
  },
  subscribe: user => {
    const unsub = db
      .collection("users")
      .doc(user.email)
      .collection("mybooks")
      // onSnapShot takes a function to call back when specified collection is changed
      // change.doc.data() returns the updated object: document or field
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            store.dispatch("addBook", change.doc.data());
          }
          if (change.type === "modified") {
            window.console.log("Modified: ", change.doc.data());
            store.dispatch("updateBook", change.doc.data());
          }
          if (change.type === "removed") {
            store.dispatch("removeBook", change.doc.data().id);
          }
        });
      });
    return unsub;
  }
};

export default fs;
