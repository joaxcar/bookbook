<template>
  <v-app-bar dark fixed color="primary" app elevate-on-scroll>
    <!-- <v-toolbar-side-icon>
      <v-img
        class="mr-3"
        src="@/assets/icons8-book-shelf-100-3.png"
        height="50%"
        width="50%"
      >
      </v-img>
    </v-toolbar-side-icon> -->
    <img src="@/assets/icons8-book-shelf-100-3.png" style="height: inherit;" />
    <v-toolbar-title>
      <a href="/#/" class="white--text font-weight-black">
        {{ title }}
      </a>
    </v-toolbar-title>
    <v-spacer />
    <v-app-bar-nav-icon class="d-sm-none" @click.stop="toggleDrawer" />
    <v-toolbar-items>
      <template v-if="user.loggedIn">
        <v-btn
          v-for="item in links"
          text
          class="d-none d-sm-flex"
          :key="item.title"
          :to="item.to"
        >
          {{ item.title }}
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn class="d-none d-sm-flex" v-on="on" text icon rounded>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn text class="d-none d-sm-flex">{{
                user.data.displayName
              }}</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn text class="d-none d-sm-flex" @click.prevent="signOut">
                Sign out
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn text class="d-none d-sm-flex" to="/login">
          Login
        </v-btn>
        <v-btn text class="d-none d-sm-flex" to="/register">
          Register
        </v-btn>
      </template>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store";

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
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  data() {
    return {};
  },
  methods: {
    toggleDrawer() {
      this.$emit("drawer");
    },
    signOut() {
      store.dispatch("signOut");
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
