import Vue from "vue";
import App from "./App.vue";

// Event bus
export const bus = new Vue();

new Vue({
	el: "#app",
	render: (h) => h(App),
});
