<template>
	<div>
		<form-helper>
			<div slot="form-header">
				<h3>Form Two - Login</h3>
			</div>
			<div slot="form-fields">
				<input type="text" placeholder="username" required />
				<input type="password" name="" id="" placeholder="password" required="required" />
			</div>
			<div slot="form-controls">
				<button v-on:click="handleSubmit">Login</button>
			</div>
		</form-helper>
	</div>
</template>

<script>
	import FormHelper from "../components/FormHelper.vue";

	export default {
		components: {
			"form-helper": FormHelper,
		},
		data() {
			return {};
		},
	};
</script>
