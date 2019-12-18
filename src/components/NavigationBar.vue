<template>
  <v-app-bar dark fixed color="primary" app>
    <v-toolbar-title>
      {{ title }}
    </v-toolbar-title>
    <v-spacer />
    <v-app-bar-nav-icon class="d-sm-none" @click.stop="toggleDrawer" />
    <v-toolbar-items>
      <v-btn
        v-for="item in links"
        text
        class="d-none d-sm-flex"
        :key="item.title"
        :to="item.to"
      >
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
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
  data() {
    return {};
  },
  methods: {
    toggleDrawer() {
      this.$emit("drawer");
    }
  }
};
</script>
