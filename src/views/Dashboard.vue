<template>
  <v-container>
    <v-row dense align="center" justify="center">
      <v-col cols="12" md="8">
        <v-text-field
          label="Search (pres enter with prefilled content for example)"
          filled
          rounded
          v-model="searchText"
          append-outer-icon="mdi-send"
          prepend-inner-icon="mdi-book-open-page-variant"
          clear-icon="mdi-close-circle"
          clearable
          type="text"
          @keydown.enter="getBook"
          @click:append-outer="getBook"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card v-for="item in books" :key="item.id" tile>
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
          </div>
          <div>
            <v-card-actions>
              <!-- todo CHANGE BTN WHEN BOOK ALREADY IN LIBRARY  -->
              <v-btn
                v-if="true"
                @click="() => addBook(item)"
                text
                color="purple"
              >
                Add to library
              </v-btn>
              <v-btn v-else text color="green">In My Books ✔</v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="item.show = !item.show">
                <v-icon>{{
                  item.show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
          </div>

          <div v-if="item.show">{{ item.description }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import getsBook from "@/data/GoogleAPI";
import Debounce from "@/utils/debounce";

export default {
  data: function() {
    return {
      message: "",
      books: [],
      searchText: "9781405924412"
    };
  },
  created() {
    this.debounceGetBooks = this.debounce(
      function() {
        this.getBook(this.searchText);
      }.bind(this),
      2000
    );
  },
  methods: {
    get: getsBook,
    debounce: Debounce,
    getBook() {
      this.books = [];
      getsBook(this.searchText).then(ret => {
        window.console.log(ret);
        this.books = ret.items.map(item => ({ ...item, show: false }));
        this.searchText = "";
      });
    },
    addBook(volumeInfo) {
      this.$store.dispatch("addBook", volumeInfo);
    },
    inLibrary(volumeInfo) {
      this.show =
        this.$store.state.data.books.filter(
          book => book.title === volumeInfo.title
        ).length > 0;
    }
  }
};
</script>

<style scoped></style>
