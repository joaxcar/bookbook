<template>
  <div class="mybooks-container">
    <h1>My books View</h1>
    <button @click.prevent="addBook">add new book</button>
    <button @click.prevent="getBooks">get books</button>
  </div>
</template>

<script>
// imports could be moved to App.vue if needed elsewhere?
import db from "@/main";
import firebase from "firebase";

export default {
  mounted() {},
  methods: {
    addBook() {
      window.console.log("adding new book...");
      const newbook = {
        title: "maos lilla roda",
        author: "maou zeTung"
      };
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("mybooks")
        .add(newbook)
        .then(() => {
          window.console.log("added new book");
        });
    },
    getBooks() {
      window.console.log("getting books...");
      window.console.log("from uid: " + firebase.auth().currentUser.uid);
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("mybooks")
        .get()
        .then(QuerySnapShot => {
          window.console.log(QuerySnapShot.docs);
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
