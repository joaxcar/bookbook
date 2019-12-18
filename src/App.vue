<template>
  <v-app>
    <navigation-drawer :value="drawer" :links="items" :title="title" />
    <navigation-bar @drawer="toggleDrawer" :links="items" :title="title" />
    <v-content fluid>
      <v-container fluid class="ma-0 pa-0" fill-height>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
    </v-content>
    <dpfooter :title="title" />
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import NavigationDrawer from "@/components/NavigationDrawer";
import Footer from "@/components/Footer";

export default {
  name: "App",
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
        { title: "Home", to: "/" },
        { title: "My books", to: "/search" },
        { title: "About", to: "/overview" }
      ]
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
