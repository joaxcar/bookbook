<template>
  <v-container>
    <v-row dense align="center" justify="center">
      <v-col cols="12" md="8">
        <v-text-field
          label="Filter books"
          filled
          rounded
          :disabled="!loggedIn"
          v-model="searchText"
          prepend-inner-icon="mdi-magnify"
          clear-icon="mdi-close-circle"
          :append-icon="
            fronts ? 'mdi-format-list-bulleted-square' : 'mdi-view-grid'
          "
          clearable
          type="text"
          @input="debounceFilterBooks"
          @keydown.enter="filterBooks"
          @click:append="fronts = !fronts"
          @click:clear="clearFilter"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="!loggedIn" justify="center">
      <v-card elevation="0">
        <v-card-title class="headline"> Store some books?</v-card-title>
        <v-card-text
          >Please login or register an account to start adding books to your
          shelf!</v-card-text
        >

        <v-card-actions>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
            to="/register"
            >Register</v-btn
          >
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
            to="/signin"
            >Sign in</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row v-else align="center" justify="start" v-for="tag in tags" :key="tag">
      <v-col cols="12">
        <div class="headline">
          {{ tag }}
          <span class="font-weight-thin">{{ countByTag(tag) }}</span>
        </div>
      </v-col>
      <template v-if="fronts">
        <v-card
          tile
          v-for="item in books.filter(b => b.tags.includes(tag))"
          :key="item.title"
          class="mx-2"
        >
          <router-link
            :to="{ name: 'Details', params: { id: item.id } }"
            tag="div"
          >
            <v-img
              height="110px"
              max-width="70px"
              :lazy-src="item.imageLinks.smallThumbnail"
              :src="item.imageLinks.thumbnail"
            ></v-img>
          </router-link>
        </v-card>
      </template>
      <template v-else>
        <v-card
          v-for="item in books.filter(b => b.tags.includes(tag))"
          :key="item.id"
          tile
          width="100%"
          class="mx-2"
        >
          <router-link
            :to="{ name: 'Details', params: { id: item.id } }"
            tag="div"
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
                readonly
                half-increments
                hover
                size="18"
              ></v-rating>
            </div>
          </router-link>
        </v-card>
      </template>
    </v-row>
    <!--     <v-speed-dial
      v-model="fab"
      fab
      bottom
      value="show"
      right
      absolute
      direction="top"
      transition="slide-x-transition"
    >
      <template v-slot:activator>
        <v-btn color="success" v-model="fab" fab large>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" to="/search">
        <v-icon>mdi-format-text</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" to="/search/camera">
        <v-icon>mdi-camera</v-icon>
      </v-btn>
    </v-speed-dial> -->
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
    ...mapState(["data"]),
    loggedIn: function() {
      return this.$store.state.user.loggedIn;
    }
  },
  data: function() {
    return {
      message: "",
      books: [],
      searchText: "",
      tags: ["Reading", "Want to read", "Read", "On loan", "All"],
      fronts: false,
      rating: "4",
      fab: false,
      show: null
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
    window.console.log(this.books);
  },
  actvated() {
    this.books = [...this.data.books];
  },
  methods: {
    debounce: Debounce,
    filterBooks() {
      if (this.searchText === null) {
        this.searchText = "";
      }
      this.books =
        this.searchText === ""
          ? [...this.data.books]
          : this.data.books.filter(book =>
              book.title.toLowerCase().includes(this.searchText.toLowerCase())
            );
    },
    countByTag(tag) {
      let count = this.filteredByTag(tag).length;
      return "(" + count + ")";
    },
    filteredByTag(tag) {
      return this.books.filter(b => b.tags.includes(tag));
    },
    clearFilter() {
      this.searchText = "";
      this.filterBooks();
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
