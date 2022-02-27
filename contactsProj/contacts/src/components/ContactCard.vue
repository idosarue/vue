<template>
	<div class="contact-card">
		<div class="contact-image">
			<slot name="contact-image"></slot>
		</div>
		<div slot="contact-info" class="contact-info">
			<slot name="full-name"></slot>
			<slot name="phone-number"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.contact-card {
		box-shadow: 2px 5px 13px #222;
		padding-top: 10px;
		border-radius: 0.3em;
		transition: 0.5s;
	}

	.contact-card:hover {
		transform: scale(1.1);
		transform: translateY(-19px);
		transition: 0.5s;
		box-shadow: 2px 7px 20px #555;
	}
</style>
