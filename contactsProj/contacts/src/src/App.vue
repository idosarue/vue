<template>
	<div id="app">
		<img src="./assets/logo.png" />
		<router-view></router-view>
		<!-- <div class="container">
			<show-contacts v-bind:loading="loading" v-on:addContacts="addContacts($event)"></show-contacts>
		</div> -->
	</div>
</template>

<script>
	import ShowContacts from "./components/showContacts.vue";
	import SingleContact from "./components/SingleContact.vue";
	const routes = [{ path: "/contact/:id", component: SingleContact }];
	export default {
		components: {
			"show-contacts": ShowContacts,
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

		created() {
			this.$http.get("http://localhost:3000/contacts").then((response) => {
				setTimeout(() => {
					this.loading = false;
					return (this.contacts = response.data);
				}, 2000);
			}),
				(response) => {
					console.log("An error occured!!!");
				};
		},
	};
</script>

<style>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
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

	a {
		color: #42b983;
	}

	.container {
		display: flex;
		justify-content: center;
	}
</style>
