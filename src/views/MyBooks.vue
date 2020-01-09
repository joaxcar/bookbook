<template>
  <h1>My books View</h1>
</template>

<script>

import firebase from 'firebase';
const db = firebase.firestore();

export default {
  mounted() {
    db.collections.('mybooks').get().then((snapshot) => {
      console.log(snapshot.docs);
    });
  }

};
</script>

<style scoped></style>
