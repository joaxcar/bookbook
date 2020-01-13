<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          label="Search (pres enter with prefilled content for example)"
          filled
          rounded
          v-model="searchText"
          prepend-inner-icon="mdi-book-open-page-variant"
          clear-icon="mdi-close-circle"
          clearable
          type="text"
          @keydown.enter="getBook"
        ></v-text-field>
        <v-btn>&#128247;</v-btn>
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
          </div>
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
          <div v-if="show">{{ item.volumeInfo.description }}</div>
        </v-card>
      </v-col>
    </v-row>
    <v-btn @click="start">engage video search va</v-btn>
    <div id="scanner-wrapper">
      <div id="interactive" class="viewport" />
    </div>
  </v-container>
</template>

<script>
import getBook from "@/data/GoogleAPI";
import Debounce from "@/utils/debounce";
import Quagga from "quagga";
// import { is } from "@babel/types";

export default {
  data: function() {
    return {
      message: "",
      books: [],
      searchText: "9781405924412",
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
          patchSize: "small",
          debug: {
            showCanvas: true,
            showPatches: true,
            showFoundPatches: true
          }
        }
      }
    };
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     Quagga.init(this.quaggaState, function(err) {
  //       if (err) {
  //         window.console.log(err);
  //         return;
  //       }
  //       window.console.log("init complete");
  //       Quagga.start();
  //       Quagga.onDetected(result => {
  //         let isbn = result.codeResult.code;
  //         window.console.log(isbn);
  //       });
  //     });
  //   });
  // },
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
    start() {
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
      getBook(this.searchText).then(ret => {
        ret.items.map(book => (this.books = [book, ...this.books]));
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
    async getVideoStream() {
      // prompt user: is ok to use your cam dude?
      // to require rear cam, use:
      // video: {
      //   facingMode: {
      //     exact: "environment"
      //   }
      // }
      let videoStream = null;

      try {
        videoStream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: "user"
        });
      } catch (error) {
        window.console.log(error);
      }
      window.console.log(videoStream);
    }
  }
};
</script>

<style scoped></style>
