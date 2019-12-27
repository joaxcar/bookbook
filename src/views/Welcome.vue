<template>
  <v-container fluid class="pa-0 ma-0">
    <section>
      <v-row justify="center" align="center" class="bg white--text">
        <v-col cols="12">
          <v-container>
            <v-row>
              <v-col justify="center" align="center">
                <h1 class=" display-3 font-weight-bold">
                  Bookbook
                </h1>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                justify="center"
                align="center"
                class=" display-1 font-weight-bold"
              >
                Make sense of your bookshelf
              </v-col>
            </v-row>
            <v-row>
              <v-col justify="center" align="center">
                <v-btn dark outlined class="font-weight-bold" to="/register">
                  Create account
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </section>

    <section>
      <v-row>
        <v-col align="center" justify="center" cols="12" light>
          <v-row>
            <v-col class="pt-7">
              <h2 class="font-weight-bold">
                Find and store all your books
              </h2>
              Search for ISBN or by barcode scanner
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card
                v-for="item in infobox"
                :key="item.title"
                class="elevation-0 transparent"
                max-width=""
              >
                <v-card-text class="text-xs-center">
                  <v-icon x-large class="blue--text text--lighten-2">
                    {{ item.icon }}
                  </v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  {{ item.titel }}
                </v-card-title>
                <v-card-text>
                  {{ item.text }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>

    <section>
      <v-container grid-list-xl fluid class="dark">
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Group info</div>
              </v-card-title>
              <v-card-text>
                We are a group of students doing this for the first time. Dont
                expect greatnes!
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Books</div>
              </v-card-title>
              <v-card-text>
                Do you like books? We do! And want to help you store them.
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <v-row>
      <v-col align="center" class="display-1">Example API-data: </v-col>
    </v-row>
    <v-row>
      <v-col v-if="book.items" align="center">{{
        book.items[0].volumeInfo
      }}</v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import getBook from "@/data/GoogleAPI";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      infobox: [
        {
          title: "Search for books",
          icon: "mdi-book",
          text: `This text explains how a search is made. How it is awsome, and how to move forward!`
        },
        {
          title: "Store your thoughts",
          icon: "mdi-book-open-page-variant",
          text: `This text explains how the data is stored. How it is awsome, and how to move forward!`
        },
        {
          title: "Organize",
          icon: "mdi-book-open",
          text: `This text explains how to organize books. How it is awsome, and how to move forward!`
        }
      ],
      book: {}
    };
  },
  created() {
    this.get(9789178090730).then(ret => {
      this.book = ret;
    });
  },
  methods: {
    get: getBook
  }
};
</script>

<style scoped>
.dark {
  background: rgb(214, 220, 227);
}
.bg {
  width: 100%;
  height: 400px;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/books.jpg") no-repeat center center;
  background-size: cover;
  transform: scale(1.1);
}
</style>
