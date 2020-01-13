<template>
  <v-container>
    <template>
      <v-row align="center" justify="center">
        <v-col cols="12" md="8">
          <v-card :loading="loading" tile>
            <div v-if="!loading" class="d-flex flex-no-wrap">
              <div>
                <v-img width="60px" :src="book.imageLinks.thumbnail"> </v-img>
              </div>
              <div>
                <v-card-text>
                  <div>
                    {{ book.title }}
                  </div>
                  <div>{{ book.publisher }}</div>
                  <div>{{ book.authors[0] }}</div>
                </v-card-text>
              </div>
              <v-spacer />
            </div>
            <div>
              <v-card-actions>
                <v-btn v-if="true" text color="purple">
                  Add to library
                </v-btn>
              </v-card-actions>
            </div>
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
      loading: true
    };
  },
  activated() {
    this.loading = true;
    this.book = {};
    this.getBookInfo();
  },
  deactivated() {},
  methods: {
    getBookInfo: function() {
      this.loading = true;
      const id = this.$route.params.id;
      getBookById(id)
        .then(ret => (this.book = ret))
        .then(() => (this.loading = false));
    }
  },
  computed: {
    // book() {
    //   return this.$store.getters.book(this.$route.params.id);
    // }
  }
};
</script>

<style scoped></style>
