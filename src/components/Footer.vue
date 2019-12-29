<template>
  <v-footer app absolute padless>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>{{ title }}</strong>
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
