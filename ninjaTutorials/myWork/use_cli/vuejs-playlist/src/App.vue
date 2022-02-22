<template>
	<div></div>
</template>

<script>
	import Ninjas from "./components/Ninjas.vue";
	import Header from "./components/Header.vue";
	import Footer from "./components/Footer.vue";

	export default {
		// Local nesting
		components: {
			Ninjas,
			"app-header": Header,
			"app-footer": Footer,
		},
		data() {
			return {
				title: "Ninjas",
				ninjas: [
					{ name: "Ryu", speciality: "Vue Components", show: false },
					{ name: "Crystal", speciality: "HTML Wizardry", show: false },
					{ name: "Hitoshi", speciality: "Click Events", show: false },
					{ name: "Tango", speciality: "Conditionals", show: false },
					{ name: "Kami", speciality: "Webpack", show: false },
					{ name: "Yoshi", speciality: "Data Diggin", show: false },
				],
				title: "Vue Ninjas",
			};
		},
		methods: {
			updateTitle(updatedTitle) {
				this.title = updatedTitle;
			},
		},
	};
</script>

<style>
	h1 {
		color: red;
	}
</style>
