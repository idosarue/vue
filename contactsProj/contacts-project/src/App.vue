<template>
	<div id="app">
		<AppHeader></AppHeader>
		<PopUp></PopUp>
		<div class="container">
			<ShowContacts></ShowContacts>
		</div>
	</div>
</template>

<script>
	import ShowContacts from "./components/ShowContacts.vue";
	import SingleContact from "./components/SingleContact.vue";
	import AppHeader from "./components/AppHeader.vue";
	import PopUp from "./components/NotificationPopUp.vue";

	export default {
		components: {
			ShowContacts,
			SingleContact,
			AppHeader,
			PopUp,
		},
		data() {
			return {
				loading: true,
				contacts: "",
			};
		},

		methods: {
			addContacts(newContacts) {
				this.contacts = newContacts;
				alert("changed");
			},
		},

		// created() {
		// 	this.$http.get("http://localhost:3000/contacts").then((response) => {
		// 		setTimeout(() => {
		// 			this.loading = false;
		// 			console.log(response.data);
		// 			return (this.contacts = response.data);
		// 		}, 2000);
		// 	}),
		// 		(response) => {
		// 			console.log("An error occured!!!");
		// 		};
		// },
	};
</script>

<style>
	* {
		box-sizing: border-box;
	}
	body {
		margin: 0;
		font-family: "Avenir", Helvetica, Arial, sans-serif;
	}
	#app {
		text-align: center;
		color: #2c3e50;
		margin-top: 100px;
	}

	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	.container {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	button {
		cursor: pointer;
	}

	img {
		width: 100px;
	}
</style>
