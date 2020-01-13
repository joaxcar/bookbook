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
          append-icon="mdi-camera"
          clear-icon="mdi-close-circle"
          clearable
          prepend-inner-icon="mdi-book-open-page-variant"
          type="text"
          @keydown.enter="getBook"
          @click:append-outer="getBook"
          @click:append="startScan"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <div id="scanner-wrapper">
        <div id="interactive" class="viewport" />
      </div>
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
                v-if="() => inLibrary(item)"
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
import Quagga from "quagga";

export default {
  data: function() {
    return {
      message: "",
      books: [],
      searchText: "9781405924412",
      library: [],
      show: false,
      readerSize: {
        width: 640,
        height: 480
      },
      quaggaState: {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#interactive"),
          constraints: {
            width: 640,
            height: 480,
            facingMode: ""
          }
        },
        decoder: {
          readers: ["ean_reader"],
          debug: {
            drawBoundingBox: true
          }
        },
        locate: true,
        locator: {
          halfSample: true,
          patchSize: "small"
        }
      }
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
    startScan() {
      Quagga.init(this.quaggaState, function(err) {
        if (err) {
          window.console.log(err);
          return;
        }
        window.console.log("init complete");
        Quagga.start();
        Quagga.onDetected(result => {
          let isbn = result.codeResult.code;
          window.console.log(isbn);
        });
      });
    },
    getBook() {
      this.books = [];
      getsBook(this.searchText).then(ret => {
        window.console.log(ret);
        this.books = ret.items.map(item => ({ ...item, show: false }));
        this.searchText = "";
      });
    },
    getVideoStreamQuagga() {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-area"),
          constraints: {
            width: 480,
            height: 320,
            facingMode: "user"
          }
        },
        decoder: {
          readers: ["ean_reader", "code_128_reader"]
        },
        debug: {
          showCanvas: true
        }
      });
    },
    addBook(book) {
      if (!this.$store.state.data.books.some(item => item.id === book.id))
        this.$store.dispatch("addBook", book);
    }
  },
  // ! can't get v-if to show/hide element dynamically !
  computed: {
    inLibrary(item) {
      return this.library.filter(book => book.id === item.id).length > 0;
    }
  }
};
</script>

<style scoped></style>
