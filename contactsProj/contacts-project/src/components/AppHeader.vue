<template>
	<div id="navbar">
		<img src="../assets/logo.png" />
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				loading: true,
				contacts: "",
			};
		},

		methods: {},
	};
</script>

<style>
	#navbar {
		background: green;
		height: 100px;
		width: 100%;
		position: absolute;
		top: 0;
		display: flex;
	}

	a {
		text-decoration: none;
	}
</style>
