<template>
	<div>
		<form-helper>
			<div slot="form-header">
				<h3>Form ONe - Contact us</h3>
				<p>Fill in this form to contact us</p>
			</div>
			<div slot="form-fields">
				<input type="text" placeholder="name" required />
				<label>Your Message:</label>
				<textarea name="" id="" cols="30" rows="10"></textarea>
			</div>
			<div slot="form-controls">
				<button v-on:click="handleSubmit">Send</button>
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
