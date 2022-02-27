import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";

// Http requests
Vue.use(VueResource);

new Vue({
	el: "#app",
	render: (h) => h(App),
});
