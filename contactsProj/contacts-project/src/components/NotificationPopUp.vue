<template>
	<div v-show="show" class="popUp" v-bind:class="show ? 'fadeOut' : ''">
		<p>{{ message }}</p>
	</div>
</template>

<script>
	import { bus } from "../main";
	export default {
		components: {},
		data() {
			return {
				show: false,
				message: "",
			};
		},

		methods: {
			addContacts(newContacts) {
				this.contacts = newContacts;
				alert("changed");
			},
		},

		created() {
			bus.$on("showPopUp", (message) => {
				this.message = message;
				this.show = true;
				setTimeout(() => {
					this.show = false;
				}, 2000);
			});
		},
	};
</script>

<style>
	.popUp {
		position: absolute;
		left: 200px;
		box-shadow: 2px 5px 13px #222;
		border-radius: 0.3em;
		width: 100px;
	}

	.fadeOut {
		animation: 2s fade-out forwards;
	}

	@keyframes fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
