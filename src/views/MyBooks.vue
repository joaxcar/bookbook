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
          ref="textArea"
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
              <div class="body-2 font-weight-medium">{{ item.title }}</div>
              <span
                v-for="author in item.authors"
                :key="item.id + author"
                class="caption"
              >
                {{ author }}
              </span>
              <div class="caption font-weight-light">
                {{ item.publisher }}
              </div>
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
    <v-speed-dial
      v-model="fab"
      bottom
      right
      absolute
      fixed
      direction="top"
      transition="slide-x-transition"
    >
      <template v-slot:activator>
        <v-btn color="success" v-model="fab" fab large>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" to="/dashboard">
        <v-icon>mdi-format-text</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" to="/dashboard/camera">
        <v-icon>mdi-camera</v-icon>
      </v-btn>
    </v-speed-dial>
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
      rating: "4",
      fab: false
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
    this.$nextTick(() => this.$refs.textArea.focus());
  },
  activated() {
    this.$nextTick(() => this.$refs.textArea.focus());
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
