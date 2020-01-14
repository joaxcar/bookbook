<template>
  <v-footer app absolute padless>
    <v-col class="text-center" cols="12">
      <div class="text">
        {{ new Date().getFullYear() }} — <strong>{{ title }}</strong>
        <v-btn
          icon
          color="blue lighten-2"
          href="https://github.com/joaxcar/bookbook"
        >
          <v-icon>mdi-github-circle</v-icon>
        </v-btn>
      </div>
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
.text {
  color: #4fc3f7;
}
</style>
