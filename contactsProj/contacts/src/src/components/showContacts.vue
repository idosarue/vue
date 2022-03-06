<template>
	<div class="container">
		<form @submit="checkForm">
			<input v-model="formData.firstName" :class="this.errors.firstName ? 'error' : ''" type="text" placeholder="First Name" />
			<p v-if="errors.firstName">{{ errors.firstName }}</p>
			<input v-model="formData.lastName" :class="this.errors.lastName ? 'error' : ''" type="text" placeholder="Last Name" />
			<p v-if="errors.lastName">{{ errors.lastName }}</p>
			<input v-model="formData.phoneNumber" :class="this.errors.phoneNumber ? 'error' : ''" type="text" placeholder="Phone Number" />
			<p v-if="errors.phoneNumber">{{ errors.phoneNumber }}</p>
			<button>Save Contact</button>
		</form>
		<div class="contacts">
			<h1 v-show="loading">Loading...</h1>
			<div v-show="!loading" v-for="contact in contacts">
				<contact-card v-bind:contacts="contacts">
					<img slot="contact-image" v-bind:src="contact.image ? contact.image : placeHolderImage" alt="asd" />
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
	import AddContactForm from "./AddContactForm.vue";

	export default {
		props: ["loading"],
		components: {
			"contact-card": ContactCard,
			AddContactForm,
		},
		data() {
			return {
				contacts: [],
				placeHolderImage: "src/assets/default.png",
				formData: {
					firstName: "",
					lastName: "",
					phoneNumber: "",
				},
				errors: {
					firstName: "",
					lastName: "",
					phoneNumber: "",
				},
				existingPhoneNumbers: [],
			};
		},
		methods: {
			fullName: function(contact) {
				return `${contact.firstName} ${contact.lastName}`;
			},
			getData() {
				this.$http.get("http://localhost:3000/contacts").then((response) => {
					this.contacts = response.data;
				}),
					(response) => {
						console.log("An error occured!!!");
						return "error";
					};
			},
			deleteContact(contact) {
				console.log("clicked");
				// this.contacts.splice(this.contacts.indexOf(contact), 1);
				this.$http.delete("http://localhost:3000/contacts/" + contact._id).then((response) => {
					this.getData();
				});
			},

			checkForm(e) {
				this.getPhoneNumbers();

				this.errors = {
					firstName: "",
					lastName: "",
					phoneNumber: "",
				};

				const requiredMessage = "This field is required";
				const { firstName, lastName, phoneNumber } = this.formData;

				if (!firstName) {
					this.errors.firstName = requiredMessage;
				}
				if (!lastName) {
					this.errors.lastName = requiredMessage;
				}
				if (!phoneNumber) {
					this.errors.phoneNumber = requiredMessage;
				} else if (!this.validatePhoneNumber(phoneNumber)) {
					this.errors.phoneNumber = "invalid phone number";
				} else if (this.existingPhoneNumbers.includes(phoneNumber)) {
					this.errors.phoneNumber = "Phone number exists";
				}

				// console.log(Object.values(this.errors), "after get");

				if (firstName && lastName && this.validatePhoneNumber(phoneNumber) && !this.existingPhoneNumbers.includes(phoneNumber)) {
					this.$http
						.post("http://localhost:3000/contacts", this.formData)
						.then((data) => {
							this.getData();
							this.formData = {};
						})
						.catch((e) => {
							console.log(e);
						});
				}

				e.preventDefault();
			},

			validatePhoneNumber(phoneNumber) {
				if (phoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
					return true;
				}
				return false;
			},
			getPhoneNumbers() {
				this.existingPhoneNumbers = this.contacts.map((contact) => contact.phoneNumber);
			},

			editContact(contact) {
				this.$http.put("http://localhost:3000/editContact/" + contact._id).then((response) => {
					console.log(response);
				});
			},
		},
		// get the contacts
		created() {
			this.$http.get("http://localhost:3000/contacts").then((response) => {
				setTimeout(() => {
					this.loading = false;
					this.contacts = response.data;
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
