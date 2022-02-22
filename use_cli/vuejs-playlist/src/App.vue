<template>
	<div>
		<app-header></app-header>
		<p></p>
		<h1>{{ title }}</h1>
		<p>{{ greeting() }}</p>
		<ninjas></ninjas>
		<new-ninjas></new-ninjas>
		<!-- Props -->
		<h3>props</h3>
		<ninja-props v-bind:ninjaProps="ninjaProps"></ninja-props>
		<!--  -->
		<app-footer></app-footer>
	</div>
</template>

<script>
	import Ninjas from "./components/Ninjas.vue";
	import Header from "./components/Header.vue";
	import Footer from "./components/Footer.vue";
	import NewNinjas from "./components/NewNinjas.vue";
	import NinjaProps from "./components/NinjaProps.vue";

	export default {
		// Local nesting
		components: {
			Ninjas,
			"app-header": Header,
			"app-footer": Footer,
			"new-ninjas": NewNinjas,
			"ninja-props": NinjaProps,
		},
		data() {
			return {
				title: "Ninjas",
				ninjaProps: [
					{ name: "Ryu Props!", speciality: "Vue Components", show: false },
					{ name: "Crystal Props!", speciality: "HTML Wizardry", show: false },
					{ name: "Hitoshi Props!", speciality: "Click Events", show: false },
					{ name: "Tango Props!", speciality: "Conditionals", show: false },
					{ name: "Kami Props!", speciality: "Webpack", show: false },
					{ name: "Yoshi Props!", speciality: "Data Diggin", show: false },
				],
			};
		},
		methods: {
			greeting: function() {
				return "heyy cowboy!";
			},
		},
	};
</script>

<style>
	h1 {
		color: red;
	}
</style>
