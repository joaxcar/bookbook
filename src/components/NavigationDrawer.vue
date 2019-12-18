<template>
  <v-navigation-drawer v-model="drawer" app absolute temporary>
    <v-list>
      <v-list-item v-for="item in links" :key="item.title" :to="item.to" link>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Title"
    },
    links: {
      type: Array,
      default: () => []
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawer: false
    };
  },
  watch: {
    value: function() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
