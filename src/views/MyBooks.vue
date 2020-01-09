<template>
  <div class="mybooks-container">
    <h1>My books View</h1>
    <button @click.prevent="getDocs">test getDocs()</button>
  </div>
</template>

<script>
import db from "@/main";

export default {
  mounted() {},
  methods: {
    getDocs() {
      window.console.log("test logging");
      db.collection("mybooks")
        .get()
        .then(snapshot => {
          window.console.log(snapshot.docs);
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
