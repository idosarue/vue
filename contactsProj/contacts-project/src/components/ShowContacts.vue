<template>
	<div class="container">
		<FormModal>
			<div slot="form">
				<AddContactForm></AddContactForm>
			</div>
		</FormModal>
		<div class="contacts">
			<h1 v-show="loading">Loading...</h1>
			<div v-show="!loading" v-for="contact in contacts">
				<contact-card v-bind:contacts="contacts">
					<img slot="contact-image" v-bind:src="`http://localhost:3000/${contact.image ? contact.image : placeHolderImage}`" alt="not" />
					<p slot="full-name">{{ fullName(contact) }}</p>
					<p slot="phone-number">{{ contact.phoneNumber }}</p>
					<button slot="deleteButton" v-on:click="deleteContact(contact)">Delete</button>
					<button slot="editButton" v-on:click="editContact(contact)">Edit</button>
				</contact-card>
			</div>
		</div>
	</div>
</template>

<script>
	import ContactCard from "./ContactCard.vue";
	import AddContactForm from "./FormHelper.vue";
	import FormModal from "./FormModal.vue";
	import { bus } from "../main";

	export default {
		components: {
			"contact-card": ContactCard,
			AddContactForm,
			FormModal,
		},
		data() {
			return {
				contacts: [],
				placeHolderImage: "default.png",
				existingPhoneNumber: "",
				contactId: "",
				displayEditForm: false,
				formData: {
					firstName: "",
					lastName: "",
					phoneNumber: "",
				},
				existingPhoneNumbers: [],
				loading: true,
			};
		},
		methods: {
			fullName: function(contact) {
				return `${contact.firstName} ${contact.lastName}`;
			},
			getData() {
				this.$http.get("http://localhost:3000/contacts").then((response) => {
					this.loading = false;
					this.contacts = response.data;
				}),
					(response) => {
						console.log("An error occured!!!");
					};
			},
			deleteContact(contact) {
				console.log("clicked");
				this.$http.delete("http://localhost:3000/contacts/" + contact._id).then((response) => {
					this.getData();
				});
			},

			editContact(contact) {
				this.$http.get("http://localhost:3000/contact/" + contact._id).then((response) => {
					this.contactId = response.data._id;
					console.log(response.data);
					bus.$emit("openModal", response.data);
				});
			},
		},

		// get the contacts
		created() {
			setTimeout(() => {
				this.getData();
			}, 2000);
			bus.$on("addedContact", (data) => {
				this.getData();
				this.formData = {};
			});
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

	.error {
		border: 1px solid red;
	}
</style>
