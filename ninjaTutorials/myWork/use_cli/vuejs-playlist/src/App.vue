<template>
	<div>
		<!-- *** FIrst Example ***** -->
		<!-- <form-helper>
			<h2 slot="title">{{ title }}</h2>
			<p slot="text">I am the p for the slot</p>
		</form-helper> -->

		<!-- ****** -->

		<!-- ***** Second example ***** -->
		<form-helper>
			<div slot="form-header">
				<h3>This is the title of the form</h3>
				<p>Information avout the form</p>
			</div>
			<div slot="form-fields">
				<input type="text" placeholder="name" required />
				<input type="password" placeholder="password" required />
			</div>

			<div slot="form-controls">
				<button v-on:click="handeSubmit">Submit</button>
			</div>
		</form-helper>
		<!-- ****** -->
	</div>
</template>

<script>
	import FormHelper from "./components/FormHelper.vue";

	export default {
		// Local nesting
		components: {
			"form-helper": FormHelper,
		},
		data() {
			return {
				title: "I am a dynamic slot title",
			};
		},
		methods: {},
	};
</script>

<style></style>
