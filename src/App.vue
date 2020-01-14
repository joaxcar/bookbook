<template>
  <v-app>
    <navigation-drawer :value="drawer" :links="items" :title="title" />
    <navigation-bar @drawer="toggleDrawer" :links="items" :title="title" />
    <v-content fluid>
      <!-- if user is logged in, keep dashboard alive -->
      <keep-alive v-if="user.loggedIn">
        <router-view></router-view>
      </keep-alive>
      <!-- otherwise don't keep anything alive -->
      <router-view v-else></router-view>
    </v-content>
    <dpfooter :title="title" />
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import NavigationDrawer from "@/components/NavigationDrawer";
import Footer from "@/components/Footer";
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  components: {
    "navigation-bar": NavigationBar,
    "navigation-drawer": NavigationDrawer,
    dpfooter: Footer
  },
  data() {
    return {
      title: "Bookbook",
      drawer: false,
      items: [
        { title: "Dashboard", to: "/dashboard" },
        { title: "My books", to: "/mybooks" },
        { title: "About", to: "/about" }
      ],
      loggedIn: false
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    setDraw(e) {
      alert(e);
      alert("ddd");
    }
  }
};
</script>
