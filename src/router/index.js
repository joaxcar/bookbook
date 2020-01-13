import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Welcome from "@/views/Welcome.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import BookDetails from "@/views/BookDetails.vue";
import MyBooks from "@/views/MyBooks.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/dashboard/:type",
    name: "DashType",
    component: Dashboard
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
    path: "/details",
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
