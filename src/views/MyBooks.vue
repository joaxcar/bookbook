<template>
  <v-container>
    <v-row dense align="center" justify="center">
      <v-col cols="12" md="8">
        <v-text-field
          label="Filter books"
          filled
          rounded
          v-model="searchText"
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
    <v-btn @click="fronts = !fronts">
      List/Fronts
    </v-btn>
    <v-row align="center" justify="start" v-for="tag in tags" :key="tag">
      <v-col cols="12">
        <h1>{{ tag }}</h1>
      </v-col>
      <template v-if="fronts">
        <v-card tile v-for="item in books" :key="item.title" class="ma-1">
          <v-img
            height="110px"
            max-width="70px"
            :lazy-src="item.imageLinks.smallThumbnail"
            :src="item.imageLinks.thumbnail"
          ></v-img>
        </v-card>
      </template>
      <template v-else>
        <v-card
          v-for="item in books"
          :key="item.id"
          tile
          width="100%"
          class="d-flex flex-no-wrap"
        >
          <div>
            <v-img width="60px" :src="item.imageLinks.thumbnail"></v-img>
          </div>
          <div>
            <v-card-text>
              <div>{{ item.title }}</div>
              <div>{{ item.authors[0] }}</div>
              <div>{{ item.publisher }}</div>
            </v-card-text>
          </div>
          <v-spacer />
          <div>
            <v-rating
              v-model="item.rating"
              background-color="orange lighten-3"
              color="orange"
              dense
              half-increments
              hover
              size="18"
            ></v-rating>
          </div>
        </v-card>
      </template>
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
      searchText: "",
      tags: ["In shelf", "On loan", "Reading"],
      fronts: false,
      rating: "4"
    };
  },
  created() {
    this.debounceFilterBooks = this.debounce(
      function() {
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
              book.title.toLowerCase().includes(this.searchText.toLowerCase())
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
  },
  watch: {
    data: {
      deep: true,
      // We have to move our method to a handler field
      handler() {
        this.filterBooks();
      }
    }
  }
};
</script>
