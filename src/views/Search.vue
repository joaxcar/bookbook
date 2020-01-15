<template>
  <v-container>
    <v-row dense align="center" justify="center">
      <v-col cols="12" md="8">
        <v-text-field
          label="Search for isbn/title/author/publisher"
          filled
          rounded
          v-model="searchText"
          append-outer-icon="mdi-send"
          :append-icon="isScanning ? 'mdi-camera-off' : 'mdi-camera'"
          clear-icon="mdi-close-circle"
          clearable
          prepend-inner-icon="mdi-book-open-page-variant"
          type="text"
          @keydown.enter="searchForBooks"
          @click:append-outer="searchForBooks"
          @click:append="toggleScan"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-show="isScanning">
      <barcode-scanner :is-scanning="isScanning" @search="searchCamera" />
    </v-row>
    <v-row align="center" justify="center">
      <v-col v-if="books.length === 0 && !isScanning" align="center">
        <v-icon size="170" class="blue-grey--text text--lighten-4 pa-7">
          mdi-magnify
        </v-icon>
      </v-col>
      <v-col v-else-if="!isScanning" cols="12" md="8">
        <v-card-text class="font-weight-thin"
          >Results for: "{{ lastSearch }}" ({{
            this.searchHits
          }}
          hits)</v-card-text
        >
        <v-card v-for="item in books" :key="item.id" tile>
          <router-link
            :to="{ name: 'Details', params: { id: item.id } }"
            tag="div"
          >
            <div class="d-flex flex-no-wrap">
              <div>
                <v-img width="60px" :src="item.imageLinks.thumbnail"> </v-img>
              </div>
              <!-- <v-card-text>{{ this.searchText }}</v-card-text> -->
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
              <div justify="center">
                <v-card-actions>
                  <!-- todo CHANGE BTN WHEN BOOK ALREADY IN LIBRARY  -->
                  <v-btn
                    v-if="inLib(item)"
                    @click="() => addBook(item)"
                    outlined
                    small
                    color="purple"
                  >
                    Add to library
                  </v-btn>
                  <v-btn v-else text color="green">In My Books ✔</v-btn>
                </v-card-actions>
              </div>
            </div>
          </router-link>
        </v-card>
      </v-col>
      <v-btn v-if="books.length > 0" @click="loadMoreBooks"
        >Load more results</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import BarcodeScanner from "@/components/BarcodeScanner";
import getBooks from "@/data/GoogleAPI";
import Debounce from "@/utils/debounce";
import { mapState } from "vuex";
import fs from "@/data/fs";

export default {
  components: {
    "barcode-scanner": BarcodeScanner
  },
  computed: {
    ...mapState(["data"])
  },
  data: function() {
    return {
      message: "",
      books: [],
      numberOfBooks: 0,
      searchText: "",
      searchHits: 0,
      lastSearch: "",
      library: [],
      show: false,
      isScanning: false,
      readerSize: {
        width: innerWidth,
        height: innerHeight
      }
    };
  },
  created() {
    this.debounceGetBooks = this.debounce(
      function() {
        this.searchForBooks(this.searchText);
      }.bind(this),
      2000
    );
  },
  deactivated() {
    if (this.isScanning) {
      this.toggleScan();
    }
  },
  methods: {
    debounce: Debounce,
    toggleScan() {
      this.isScanning = !this.isScanning;
    },
    searchForBooks() {
      if (this.isScanning) this.stopScan();
      this.books = [];
      if (!this.searchText) {
        return;
      }
      getBooks(this.searchText, 0).then(ret => {
        window.console.log(ret);
        this.searchHits = ret.totalItems;
        this.books = ret.items.map(item => ({
          ...item,
          inLib: false
        }));
        this.lastSearch = this.searchText;
      });
    },
    loadMoreBooks() {
      getBooks(this.lastSearch, this.books.length).then(ret => {
        this.books = [
          ...this.books,
          ...ret.items.map(item => ({
            ...item,
            inLib: false
          }))
        ];
      });
    },
    searchCamera(isbn) {
      this.searchText = "isbn:" + isbn;
      getBooks(this.searchText, 0).then(ret => {
        this.$router.push("/details/" + ret.items[0].id);
      });
      this.searchText = "";
    },
    addBook(book) {
      if (!this.data.books.some(item => item.id === book.id)) fs.addBook(book);
      //this.$store.dispatch("addBook", book);
    },
    inLib(item) {
      return !(
        this.data.books.filter(book => book.title === item.title).length > 0
      );
    }
  }
};
</script>
