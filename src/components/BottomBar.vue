<template>
  <v-bottom-navigation grow height="34" fixed app color="primary">
    <v-btn to="/search" value="hej">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn to="/search/camera" value="hedj">
      <v-icon>mdi-barcode-scan</v-icon>
    </v-btn>

    <v-btn to="/mybooks" value="hessj">
      <v-icon>mdi-bookshelf </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "Title"
    }
  },
  data: function() {
    return {
      activeBtn: null
    };
  },
  methods: {}
};
</script>
