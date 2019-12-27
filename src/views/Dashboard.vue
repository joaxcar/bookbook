<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          label="Search"
          filled
          rounded
          v-model="searchText"
          prepend-inner-icon="mdi-book-open-page-variant"
          clear-icon="mdi-close-circle"
          clearable
          type="text"
          @keydown.enter="getBook"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in books" :key="item.title" cols="12">
        <v-card>
          <div class="d-flex flex-no-wrap">
            <div>
              <v-img
                width="100px"
                :src="item.volumeInfo.imageLinks.thumbnail"
              ></v-img>
            </div>
            <div>
              <v-card-title>
                {{ item.volumeInfo.title }}
              </v-card-title>
              <v-card-text>
                <div>{{ item.volumeInfo.publisher }}</div>
                <div>{{ item.volumeInfo.authors[0] }}</div>
              </v-card-text>
            </div>
            <v-spacer />
            <div>
              <v-card-actions>
                <v-btn color="purple" text>
                  Add to library
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="show = !show">
                  <v-icon>{{
                    show ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
          <div v-if="show">{{ item.volumeInfo.description }}</div>
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
      searchText: "",
      show: false
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
        ret.items.map(book => (this.books = [book, ...this.books]));
      });
    }
  }
};
</script>

<style scoped></style>
