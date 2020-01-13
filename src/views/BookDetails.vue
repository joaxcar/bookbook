<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card tile>
          <div class="d-flex flex-no-wrap">
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
              <v-btn v-else text color="green">In My Books ✔</v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="book.show = !book.show">
                <v-icon>{{
                  book.show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
          </div>

          <div v-if="book.show">{{ book.description }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import getBookById from "@/data/GoogleAPI";
export default {
  data() {
    return {
      book: {}
    };
  },
  activated() {
    this.getBookInfo();
  },
  methods: {
    getBookInfo: function() {
      const id = this.$route.params.id;
      getBookById(id).then(ret => (this.book = ret.items[0]));
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
