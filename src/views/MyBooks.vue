<template>
  <div class="mybooks-container">
    <h1>My books View</h1>
    <button @click.prevent="getBooks">get books</button>
  </div>
</template>

<script>
// imports could be moved to App.vue if needed elsewhere?
import db from "@/main";
import firebase from "firebase";

// const mybooks = db
//   .collection("users")
//   .doc(firebase.auth().currentUser.uid)
//   .collection("mybooks");

export default {
  mounted() {},
  methods: {
    getBooks() {
      window.console.log("getting books...");
      window.console.log("from uid: " + firebase.auth().currentUser.uid);
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("mybooks")
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(doc => {
            window.console.log("Current data: ", doc.data());
          });
        });
    }
  }
};
</script>

<style scoped>
button {
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
