import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";

Vue.use(VueResource);

// Filters
Vue.filter("toUpperCase", (value) => {
	return value.toUpperCase();
});

Vue.filter("snippet", (value) => {
	return value.slice(0, 100) + "...";
});

// Custom directives
Vue.directive("rainbow", {
	bind(el, bind, vnode) {
		el.style.color =
			"#" +
			Math.random()
				.toString(16)
				.slice(2, 8);
	},
});
new Vue({
	el: "#app",
	render: (h) => h(App),
});
