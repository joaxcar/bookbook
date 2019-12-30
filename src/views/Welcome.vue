<template>
  <v-container fluid pt-0>
    <section>
      <v-row justify="center" align="center" class="bg white--text">
        <v-col cols="12" align="center">
          <h1 class="display-3 font-weight-bold d-none d-md-block ">
            Bookbook
          </h1>
          <h1 class="display-2 font-weight-bold d-xs-block d-md-none">
            Bookbook
          </h1>
          <div class=" display-1 font-weight-bold ma-4">
            Make sense of your bookshelf
          </div>
          <div class="mt-10">
            <v-btn dark outlined class="font-weight-bold" to="/register">
              Get started
            </v-btn>
          </div>
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
      <v-row>
        <v-col>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Group info</div>
            </v-card-title>
            <v-card-text>
              We are a group of students doing this for the first time. Dont
              expect greatnes!
            </v-card-text>
          </v-card>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Project code</div>
            </v-card-title>
            <v-card-text>
              Project source code can be found at
              <a href="https://github.com/joaxcar/bookbook">GitHub</a>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <v-row>
      <v-col align="center" class="display-1">Example API-data: </v-col>
    </v-row>
    <v-row>
      <v-col v-if="book.items" align="center" cols="12" class="testAPI">{{
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
  height: 400px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/books.jpg") no-repeat center center;
  background-size: cover;
}
.testAPI {
  overflow-wrap: break-word;
}
</style>
