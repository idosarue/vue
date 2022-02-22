import Vue from "vue";
import App from "./App.vue";
import Ninjas from "./components/Ninjas.vue";

// Global component nesting
// Vue.component("ninjas", Ninjas);

new Vue({
	el: "#app",
	render: (h) => h(App),
});
