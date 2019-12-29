<template>
  <v-app-bar dark fixed color="primary" app>
    <v-toolbar-title>
      <a href="/#/" class="white--text">
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
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
