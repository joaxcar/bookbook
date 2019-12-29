<template>
  <v-app>
    <navigation-drawer :value="drawer" :links="items" :title="title" />
    <navigation-bar @drawer="toggleDrawer" :links="items" :title="title" />
    <v-content fluid>
      <keep-alive>
        <router-view>
          <v-container fluid fill-height> </v-container>
        </router-view>
      </keep-alive>
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
        { title: "My books", to: "/home" },
        { title: "About", to: "/about" }
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
