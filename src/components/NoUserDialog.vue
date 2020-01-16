<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" outlined small v-on="on">Add to library</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        <v-btn absolute right color="primary" icon @click="dialog = false">
          <v-icon>mdi-close</v-icon> </v-btn
        >Store some books?</v-card-title
      >
      <v-card-text
        >Please login or register an account to start adding books to your
        shelf!</v-card-text
      >

      <v-card-actions>
        <v-btn
          color="green darken-1"
          text
          @click="dialog = false"
          to="/register"
          >Register</v-btn
        >
        <v-spacer />
        <v-btn color="green darken-1" text @click="dialog = false" to="/signin"
          >Sign in</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      dialog: false
    };
  },
  props: {},
  methods: {}
};
</script>
