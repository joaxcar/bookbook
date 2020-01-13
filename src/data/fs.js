import firebase from "firebase";
import db from "@/main";

// firestore update methods
const fs = {
  addBook: volumeInfo => {
    db.collection("users")
      // suggestion: maybe get uid from store instead of auth()
      // also could use email as unique identifer instead
      .doc(firebase.auth().currentUser.uid)
      .collection("mybooks")
      // takes first identifier in array maybe look for isbn13 first
      .doc(volumeInfo.id)
      .set(volumeInfo)
      .catch(err => window.console.log("error: " + err))
      .then(() => {
        window.console.log("added " + volumeInfo.title);
      });
  },
  addUser: () => {
    const user = firebase.auth().currentUser;
    window.console.log("addUser to Firestore: " + user.uid);
    db.collection("users")
      .doc(user.uid)
      .set({ displayName: user.displayName, email: user.email })
      .then(() => window.console.log("user added: " + user))
      .catch(err => window.console.error("firestore adduser error: " + err));
  },
  subscribe: uid => {
    const unsub = db
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
    return unsub;
  }
};

export default fs;
