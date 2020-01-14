<template>
  <v-container>
    <template id="scroll-area-2">
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
                      class="flex-column mx-3"
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
                  :readonly="!edit"
                  size="18"
                  @input="updateData"
                ></v-rating>
              </v-col>
            </v-row>

            <v-divider />

            <v-row>
              <v-col align="center">
                <v-card-actions>
                  <!-- todo CHANGE BTN WHEN BOOK ALREADY IN LIBRARY  -->
                  <v-btn
                    v-if="inLib"
                    @click="() => addBook(book)"
                    outlined
                    small
                    color="primary"
                  >
                    Add to library
                  </v-btn>
                  <v-menu v-else offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn small color="green" v-on="on" text>
                        In My Books ✔
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-btn small text @click="removeBook"
                          >Remove from library</v-btn
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-spacer />
                  <v-btn
                    small
                    v-if="!inLib && !edit"
                    color="primary"
                    @click="() => (edit = !edit)"
                  >
                    Edit
                  </v-btn>
                  <v-btn
                    small
                    v-if="!inLib && edit"
                    color="green"
                    class="white--text"
                    @click="() => (edit = !edit)"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
            <v-divider />
            <v-row class="pt-10">
              <v-col>
                <v-slider
                  :disabled="inLib"
                  v-model="read"
                  :readonly="!edit"
                  label="Progress:"
                  thumb-color="green"
                  thumb-label="always"
                  @mouseup="updateData"
                  class="ml-2"
                ></v-slider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  :disabled="inLib"
                  v-model="book.tags"
                  :items="tags"
                  label="Tag"
                  filled
                  @change="updateData"
                  class="ml-2"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="book.comment"
                  color="teal"
                  filled
                  :disabled="inLib"
                  class="mx-2"
                  @change="updateData"
                >
                  <template v-slot:label>
                    <div>Comment</div>
                  </template>
                </v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="book.review"
                  color="teal"
                  filled
                  :disabled="inLib"
                  class="ma-2"
                  @change="updateData"
                >
                  <template v-slot:label>
                    <div>Review</div>
                  </template>
                </v-textarea>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <v-btn
      fixed
      bottom
      left
      v-if="!edit"
      fab
      color="primary"
      @click="$router.go(-1)"
    >
      <v-icon>mdi-undo</v-icon>
    </v-btn>
    <v-spacer />
    <v-btn fixed bottom right v-if="!edit" fab color="primary" to="/mybooks">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn
      fixed
      bottom
      right
      v-if="edit"
      fab
      color="green"
      class="white--text"
      @click="() => (edit = !edit)"
    >
      <v-icon>mdi-content-save</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { getBookById } from "@/data/GoogleAPI";
import fs from "@/data/fs";
export default {
  data() {
    return {
      book: {},
      read: 0,
      loading: true,
      edit: false,
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
    addBook(book) {
      if (!this.$store.state.data.books.some(item => item.id === book.id))
        fs.addBook(book);
      //this.$store.dispatch("addBook", book);
    },
    getBookInfo: function() {
      this.loading = true;
      const id = this.$route.params.id;
      const inLib = this.fromLib(id);
      if (inLib.length > 0) {
        window.console.log(inLib);
        this.book = inLib[0];
        this.loading = false;
      } else {
        getBookById(id)
          .then(ret => (this.book = ret))
          .then(() => (this.loading = false));
      }
    },
    removeBook() {
      fs.removeBook(this.book.id);
    },
    updateData() {
      fs.modifyBook(this.book.id, this.book);
    }
  }
};
</script>

<style scoped>
.v-expansion-panel:before {
  box-shadow: none !important;
}
</style>
