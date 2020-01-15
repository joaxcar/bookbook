import Vue from "vue";
import VueRouter from "vue-router";
import Search from "@/views/Search.vue";
import Welcome from "@/views/Welcome.vue";
import Register from "@/views/Register.vue";
import SignIn from "@/views/SignIn.vue";
import BookDetails from "@/views/BookDetails.vue";
import MyBooks from "@/views/MyBooks.vue";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "base",
    component: Welcome,
    beforeEnter(to, from, next) {
      if (!store.state.user.loggedIn) {
        next("/mybooks");
      } else {
        next("/welcome");
      }
    }
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/search/:type",
    name: "SearchType",
    component: Search
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/details/:id",
    name: "Details",
    component: BookDetails
  },
  {
    path: "/mybooks",
    name: "MyBooks",
    component: MyBooks
  }
];

const router = new VueRouter({
  routes
});

export default router;
