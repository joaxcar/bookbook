<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row>
      <v-col align="center" class="display-4">BOOKBOOK</v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="display-2">Manage your bookshelf</v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="display-1">Example API-data: </v-col>
    </v-row>
    <v-row>
      <v-col align="center">{{ book.items[0].volumeInfo }}</v-col>
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
