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
          :append-icon="isScanning ? 'mdi-camera-off' : 'mdi-camera'"
          clear-icon="mdi-close-circle"
          clearable
          prepend-inner-icon="mdi-book-open-page-variant"
          type="text"
          @keydown.enter="getBook"
          @click:append-outer="getBook"
          @click:append="toggleScan"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <div id="scanner-wrapper" v-show="this.isScanning">
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
              </v-card-text>
            </div>
            <v-spacer />
            <div>
              <v-card-actions>
                <!-- todo CHANGE BTN WHEN BOOK ALREADY IN LIBRARY  -->
                <v-btn
                  v-if="inLib(item)"
                  @click="() => addBook(item)"
                  outlined
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
    </v-row>
  </v-container>
</template>

<script>
import getsBook from "@/data/GoogleAPI";
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
      searchText: "9781405924412",
      library: [],
      show: false,
      isScanning: false,
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
            width: innerWidth,
            height: innerHeight,
            facingMode: "environment"
          }
        },
        decoder: {
          readers: ["ean_reader"],
          debug: {
            drawBoundingBox: true,
            drawScanline: true
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
        Quagga.onProcessed(self._onProcessed());
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
    _onProcessed(result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "#ffffff",
                lineWidth: 2
              });
            });
        }
        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "green",
            lineWidth: 2
          });
        }
        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    },
    stopScan() {
      this.isScanning = false;
      Quagga.stop();
    },
    getBook() {
      this.books = [];
      getsBook(this.searchText).then(ret => {
        window.console.log(ret);
        this.books = ret.items.map(item => ({
          ...item,
          inLib: false
        }));
        this.searchText = "";
      });
    },
    addBook(book) {
      if (!this.$store.state.data.books.some(item => item.id === book.id))
        fs.addBook(book);
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

<style scoped></style>
