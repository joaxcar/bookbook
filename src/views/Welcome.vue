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
            <v-btn
              dark
              rounded
              x-large
              class="font-weight-bold"
              :to="startRoute"
              color="primary"
            >
              {{ start }}
            </v-btn>
          </div>
          <v-btn small text to="/register" color="white" class="pr-0 text-none">
            register
          </v-btn>
          /
          <v-btn small text to="/signin" color="white" class="pl-0 text-none">
            sign in
          </v-btn>
        </v-col>
      </v-row>
    </section>

    <section>
      <v-row>
        <v-col align="center" justify="center" cols="12" light>
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
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {},
  computed: {
    ...mapGetters({
      user: "user"
    }),
    start: function() {
      return this.user.loggedIn ? "To my books" : "Get Started";
    },
    startRoute: function() {
      return this.user.loggedIn ? "MyBooks" : "Search";
    }
  },
  data() {
    return {
      infobox: [
        {
          title: "Search for books",
          icon: "mdi-barcode-scan",
          text: `Click the camera in the search bar and you're a tap away from adding your first book. It's that easy!`
        },
        {
          title: "Organize",
          icon: "mdi-bookshelf",
          text: `Create different shelves! With an ON LOAN shelf, you'll never forget who borrowed that first edition poetry collection that you love.`
        },
        {
          title: "Review",
          icon: "mdi-star-half",
          text: `What did you think about the book you just finished? Rate it and review it for future reference.`
        }
      ],
      book: {}
    };
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
