<template>
	<div>
		<div v-show="showModal" class="modal">
			<span v-on:click="closeModal" class="close-modal">&times;</span>
			<slot name="form"></slot>
		</div>
		<div v-show="showModal" v-on:click="closeModal" class="overlay"></div>
		<button class="add-button" v-on:click="openModal">+</button>
	</div>
</template>

<script>
	import { bus } from "../main";

	export default {
		components: {},
		data() {
			return {
				showModal: false,
				contacts: "",
			};
		},

		methods: {
			openModal() {
				this.showModal = true;
				bus.$emit("clearForm");
			},

			closeModal() {
				this.showModal = false;
				bus.$emit("clearForm");
			},
		},

		created() {
			bus.$on("addedContact", (data) => {
				this.showModal = false;
			});

			bus.$on("openModal", (data) => {
				this.showModal = true;
			});
		},
	};
</script>

<style>
	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 50%;
		height: 60%;
		background-color: white;
		padding: 5em;
		border-radius: 5px;
		box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
		z-index: 10;
	}

	.add-button {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		font-size: 50px;
		background: linear-gradient(#e66465, #9198e5);
		transition: opacity 0.2s;
		border: 1px solid;
		margin-top: 10px;
	}

	.add-button:hover {
		opacity: 0.8;
	}

	.close-modal {
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
		font-size: 30px;
	}

	.modal div {
		height: 100%;
	}

	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(3px);
		z-index: 5;
	}
</style>
