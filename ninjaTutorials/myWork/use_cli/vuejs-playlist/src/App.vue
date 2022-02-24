<template>
	<div>
		<keep-alive>
			<component v-bind:is="component"></component>
		</keep-alive>
		<button v-on:click="component = 'form-one'">Show Form One</button>
		<button v-on:click="component = 'form-two'">Show Form Two</button>
		<!-- With function -->
		<button v-on:click="switchForms" style="background-color: red;">Switch forms</button>
		<!-- **** -->
	</div>
</template>

<script>
	import FormOne from "./components/FormOne.vue";
	import FormTwo from "./components/FormTwo.vue";

	export default {
		// Local nesting
		components: {
			"form-one": FormOne,
			"form-two": FormTwo,
		},
		data() {
			return {
				component: "form-one",
			};
		},
		methods: {
			switchForms() {
				this.component = this.component === "form-one" ? "form-two" : "form-one";
			},
		},
	};
</script>

<style></style>
