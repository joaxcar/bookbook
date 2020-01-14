<template>
  <v-navigation-drawer v-model="drawer" app fixed temporary clipped>
    <v-list>
      <template v-if="user.loggedIn">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ user.data.displayName }}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content id="click" @click.prevent="signOut">
            Sign out
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in links" :key="item.title" :to="item.to" link>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item to="/login">
          Login
        </v-list-item>
        <v-list-item to="/register">
          Register
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store";
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
  computed: {
    ...mapGetters({
      user: "user"
    })
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
  },
  methods: {
    signOut() {
      store.dispatch("signOut");
    }
  }
};
</script>

<style scoped>
#click:hover {
  cursor: pointer;
}
</style>
