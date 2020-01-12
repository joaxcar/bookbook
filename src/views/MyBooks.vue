<template>
  <v-container>
    <v-row dense align="center" justify="center">
      <v-col cols="12" md="8">
        <v-text-field
          label="Filter books"
          filled
          rounded
          v-model="searchText"
          append-outer-icon="mdi-send"
          prepend-inner-icon="mdi-book-open-page-variant"
          clear-icon="mdi-close-circle"
          clearable
          type="text"
          @input="debounceFilterBooks"
          @keydown.enter="filterBooks"
          @click:append-outer="filterBooks"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card v-for="item in books" :key="item.title" tile>
          <div class="d-flex flex-no-wrap">
            <div>
              <v-img width="60px" :src="item.imageLinks.thumbnail"></v-img>
            </div>
            <div>
              <v-card-text>
                <div>{{ item.title }}</div>
                <div>{{ item.publisher }}</div>
                <div>{{ item.authors[0] }}</div>
              </v-card-text>
            </div>
            <v-spacer />
            <div>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon @click="item.show = !item.show">
                  <v-icon>{{
                    item.show ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>
            </div>
          </div>

          <div v-if="item.show">{{ item.volumeInfo.description }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// const mybooks = db
//   .collection("users")
//   .doc(firebase.auth().currentUser.uid)
//   .collection("mybooks");
import Debounce from "@/utils/debounce";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["data"])
  },
  data: function() {
    return {
      message: "",
      books: [],
      searchText: ""
    };
  },
  created() {
    this.debounceFilterBooks = this.debounce(
      function() {
        window.console.log("hmm");
        this.filterBooks(this.searchText);
      }.bind(this),
      400
    );
    this.books = [...this.data.books];
  },
  methods: {
    debounce: Debounce,
    filterBooks() {
      this.books =
        this.searchText === ""
          ? [...this.data.books]
          : this.data.books.filter(book =>
              book.title.includes(this.searchText)
            );
    },
    getBooks() {
      window.console.log("getting books...");
      window.console.log("from uid: " + this.$firebase.auth().currentUser.uid);
      this.$db
        .collection("users")
        .doc(this.$firebase.auth().currentUser.uid)
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
