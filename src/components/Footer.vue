<template>
  <v-footer app absolute padless>
    <v-col class="text-center" cols="12" color="grey">
      {{ new Date().getFullYear() }} — <strong>{{ title }}</strong>
      <v-btn icon color="grey" href="https://github.com/joaxcar/bookbook">
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Title"
    }
  }
};
</script>

<style scoped>
text-center {
  color: grey;
  font-weight: bold;
}
</style>
