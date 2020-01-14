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
    <v-row>
      <div id="scanner-wrapper" v-show="this.isScanning">
        <div id="interactive" class="viewport">
          <v-overlay absolute>
            <div class="overlay">
              <v-icon align="center" size="70">mdi-barcode-scan</v-icon>
            </div>
          </v-overlay>
        </div>
      </div>
    </v-row>
    <v-row align="center" justify="center">
      <v-col v-if="books.length === 0 && !isScanning" align="center">
        <v-icon size="170" class="blue-grey--text text--lighten-4 pa-7">
          mdi-magnify
        </v-icon>
      </v-col>
      <v-col v-else-if="!isScanning" cols="12" md="8">
        <v-card v-for="item in books" :key="item.id" tile>
          <div class="d-flex flex-no-wrap">
            <div>
              <router-link :to="{ name: 'Details', params: { id: item.id } }">
                <v-img width="60px" :src="item.imageLinks.thumbnail"> </v-img>
              </router-link>
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
        </v-card>
      </v-col>
      <v-btn v-if="books.length > 0" @click="loadMoreBooks"
        >Load more results</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import getBooks from "@/data/GoogleAPI";
import Debounce from "@/utils/debounce";
import { mapState } from "vuex";
import Quagga from "quagga";
import fs from "@/data/fs";

export default {
  computed: {
    ...mapState(["data"])
  },
  data: function() {
    return {
      message: "",
      books: [],
      numberOfBooks: 0,
      searchText: "",
      lastSearch: "",
      library: [],
      show: false,
      isScanning: false,
      readerSize: {
        width: innerWidth,
        height: innerHeight
      },
      quaggaState: {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#interactive"),
          constraints: {
            width: innerWidth,
            height: innerHeight,
            facingMode: "environment"
          }
        },
        decoder: {
          readers: ["ean_reader"],
          debug: {
            drawBoundingBox: true,
            drawScanLine: true
          }
        },
        locate: true,
        locator: {
          halfSample: true,
          patchSize: "large"
        }
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
  activated() {
    if (this.$route.params.type === "camera") {
      this.toggleScan();
    }
  },
  deactivated() {
    if (this.isScanning) {
      this.toggleScan();
    }
  },
  methods: {
    debounce: Debounce,
    toggleScan() {
      this.isScanning ? this.stopScan() : this.startScan();
    },
    startScan() {
      this.isScanning = true;
      let self = this;
      Quagga.init(this.quaggaState, function(err) {
        if (err) {
          window.console.log(err);
          return;
        }
        window.console.log("init complete");
        Quagga.start();
        Quagga.onDetected(
          function(result) {
            if (result) {
              window.console.log(result.codeResult.code);
              window.console.log(self);
              let isbn = result.codeResult.code;
              if (isbn.startsWith("978")) {
                self.searchText = "isbn:" + isbn;
                self.getBook();
                self.stopScan();
              }
            }
          }.bind(this)
        );
      });
    },
    stopScan() {
      this.isScanning = false;
      Quagga.stop();
    },
    searchForBooks() {
      if (this.isScanning) this.stopScan();
      this.books = [];
      if (!this.searchText) {
        return;
      }
      getBooks(this.searchText, 0).then(ret => {
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

<style scoped>
.v-overlay {
  position: relative;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-transform: uppercase;
  font-weight: bold;
}

.overlay {
  position: absolute;
  background-color: white;
  opacity: 0.8;
  margin-top: 2em;
  margin-left: -2em;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}
</style>
