<template>
  <v-footer app absolute padless>
    <v-col class="text-center" cols="12">
      <div class="blue--text text--lighten-2">
        {{ new Date().getFullYear() }} — <strong>{{ title }}</strong>
        <v-btn
          icon
          class="blue--text text--lighten-2"
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
