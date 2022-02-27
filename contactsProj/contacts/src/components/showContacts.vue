<template>
	<div class="contacts">
		<h1 v-show="loading">Loading...</h1>
		<div v-show="!loading" v-for="contact in contacts">
			<contact-card>
				<img slot="contact-image" v-bind:src="contact.image ? contact.image : placeHolderImage" alt="asd" />
				<p slot="full-name">{{ fullName(contact) }}</p>
				<p slot="phone-number">{{ contact.phoneNumber }}</p>
			</contact-card>
		</div>
	</div>
</template>

<script>
	import ContactCard from "./ContactCard.vue";

	export default {
		components: {
			"contact-card": ContactCard,
		},
		data() {
			return {
				contacts: [
					// 	{
					// 		id: 1,
					// 		firstName: "John",
					// 		lastName: "doe",
					// 		phoneNumber: "0525781695",
					// 		image: "src/assets/contact1.png",
					// 	},
					// 	{ id: 2, firstName: "Jane", lastName: "doe", phoneNumber: "0526781695", image: "src/assets/contact2.png" },
					// 	{ id: 3, firstName: "Mario", lastName: "doe", phoneNumber: "0524781695", image: "src/assets/contact3.png" },
					// 	{
					// 		id: 1,
					// 		firstName: "John",
					// 		lastName: "doe",
					// 		phoneNumber: "0525781695",
					// 		image: "src/assets/contact1.png",
					// 	},
					// 	{ id: 2, firstName: "Jane", lastName: "doe", phoneNumber: "0526781695", image: "src/assets/contact2.png" },
					// 	{ id: 3, firstName: "Mario", lastName: "doe", phoneNumber: "0524781695", image: "" },
				],
				loading: true,
				placeHolderImage: "src/assets/default.png",
			};
		},
		methods: {
			fullName: function(contact) {
				return `${contact.firstName} ${contact.lastName}`;
			},
		},
		// get the contacts
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	img {
		height: 200px;
		border-radius: 50%;
		object-fit: cover;
	}
	.contacts {
		margin: 20px auto;
		display: grid;
		grid-template-columns: repeat(3, 200px);
		gap: 30px;
	}
</style>
