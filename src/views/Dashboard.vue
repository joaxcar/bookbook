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
        <v-card v-for="item in books" :key="item.title" tile>
          <div class="d-flex flex-no-wrap">
            <div>
              <v-img
                width="60px"
                :src="item.volumeInfo.imageLinks.thumbnail"
              ></v-img>
            </div>
            <div>
              <v-card-text>
                <div>{{ item.volumeInfo.title }}</div>
                <div>{{ item.volumeInfo.publisher }}</div>
                <div>{{ item.volumeInfo.authors[0] }}</div>
              </v-card-text>
            </div>
            <v-spacer />
            <div>
              <v-card-actions>
                <v-btn
                  color="purple"
                  text
                  @click="() => addBook(item.volumeInfo)"
                >
                  Add
                </v-btn>

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
import getBook from "@/data/GoogleAPI";
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
    get: getBook,
    debounce: Debounce,
    getBook() {
      getBook(this.searchText).then(ret => {
        this.books = ret.items.map(item => ({ ...item, show: false }));
        this.searchText = "";
      });
    },
    addBook(b) {
      window.console.log(b);
      this.$store.commit("ADD_BOOK", b);
    }
  }
};
</script>

<style scoped></style>
