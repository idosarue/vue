import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Routes from "./routes";
// Http requests
Vue.use(VueResource);
// Router
Vue.use(VueRouter);

const router = new VueRouter({
	routes: Routes,
});

new Vue({
	el: "#app",
	render: (h) => h(App),
});
