<template>
  <v-container>
    <template>
      <v-row align="center" justify="center">
        <v-col cols="12" md="8">
          <v-card :loading="loading" tile>
            <div v-if="!loading" class="d-flex flex-no-wrap">
              <div class="pa-4">
                <v-img width="60px" :src="book.imageLinks.thumbnail"> </v-img>
              </div>
              <div>
                <v-card-text>
                  <div class="body-2 font-weight-medium">{{ book.title }}</div>
                  <span
                    v-for="author in book.authors"
                    :key="book.id + author"
                    class="caption"
                  >
                    {{ author }}
                  </span>
                  <div class="caption font-weight-light">
                    {{ book.publisher }}
                  </div>
                </v-card-text>
              </div>
            </div>
            <v-row>
              <v-col>
                <v-expansion-panels flat class="elevation-0">
                  <v-expansion-panel>
                    <v-expansion-panel-header class="body-2 font-weight-medium">
                      Description
                    </v-expansion-panel-header>
                    <v-expansion-panel-content
                      v-html="book.description"
                      class="flex-column"
                    >
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>

            <v-divider />

            <v-row>
              <v-col align="center">
                <v-rating
                  v-model="book.rating"
                  background-color="orange lighten-3"
                  color="orange"
                  dense
                  half-increments
                  hover
                  size="18"
                ></v-rating>
              </v-col>
            </v-row>

            <v-divider />

            <v-row>
              <v-col align="center">
                <v-card-actions>
                  <v-btn v-if="true" outlined color="purple">
                    Add to library
                  </v-btn>
                  <v-spacer />
                  <v-btn v-if="true" outlined color="purple">
                    Edit
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  :disabled="inLib"
                  v-model="book.tags"
                  :items="tags"
                  label="Status"
                  filled
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-slider
                  :disabled="inLib"
                  v-model="read"
                  label="Progress:"
                  thumb-color="green"
                  thumb-label="always"
                ></v-slider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="book.review"
                  color="teal"
                  :disabled="inLib"
                >
                  <template v-slot:label>
                    <div><strong>Review</strong></div>
                  </template>
                </v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="book.review"
                  color="teal"
                  :disabled="inLib"
                >
                  <template v-slot:label>
                    <div><strong>Comment</strong></div>
                  </template>
                </v-textarea>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { getBookById } from "@/data/GoogleAPI";
export default {
  data() {
    return {
      book: {},
      read: 0,
      loading: true,
      tags: ["Reading", "In bookshelf", "On loan", "Missing"]
    };
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },
    inLib: function() {
      return !(this.fromLib(this.id).length > 0);
    }
  },
  activated() {
    this.loading = true;
    this.book = {};
    this.getBookInfo();
  },
  deactivated() {},
  methods: {
    fromLib(id) {
      return this.$store.state.data.books.filter(book => book.id === id);
    },
    getBookInfo: function() {
      this.loading = true;
      const id = this.$route.params.id;
      const inLib = this.fromLib(id);
      if (inLib.length > 0) {
        window.console.log(inLib);
        this.book = inLib[0];
      } else {
        getBookById(id)
          .then(ret => (this.book = ret))
          .then(() => (this.loading = false));
      }
    }
  }
};
</script>

<style scoped>
.v-expansion-panel:before {
  box-shadow: none !important;
}
</style>
