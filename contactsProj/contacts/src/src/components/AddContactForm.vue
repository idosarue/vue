<template>
	<div>
		<form>
			<input v-model="formData.firstName" :class="this.errors.firstName ? 'error' : ''" type="text" placeholder="First Name" />
			<p v-if="errors.firstName">{{ errors.firstName }}</p>
			<input v-model="formData.lastName" :class="this.errors.lastName ? 'error' : ''" type="text" placeholder="Last Name" />
			<p v-if="errors.lastName">{{ errors.lastName }}</p>
			<input v-model="formData.phoneNumber" :class="this.errors.phoneNumber ? 'error' : ''" type="text" placeholder="Phone Number" />
			<p v-if="errors.phoneNumber">{{ errors.phoneNumber }}</p>
			<button v-on:click.prevent="checkForm">Save Contact</button>
		</form>
	</div>
</template>

<script>
	export default {
		props: ["contacts"],
		data() {
			return {
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
				newContacts: [],
			};
		},
		methods: {
			getData() {
				this.$http.get("http://localhost:3000/contacts").then((response) => {
					console.log(response.data, "data");
					this.newContacts = response.data;
				}),
					(response) => {
						console.log("An error occured!!!");
						return "error";
					};

				this.$emit("addContacts", this.newContacts);
			},
			checkForm(e) {
				this.getPhoneNumbers();
				this.getData();
				console.log(this.contacts.length, "contatcs");
				console.log(this.newContacts.length, "new contatcs");

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
						.then((data) => {})
						.catch((e) => {
							console.log(e);
						});
				}
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
		},

		created() {
			this.$http.get("http://localhost:3000/contacts").then((response) => {
				// console.log(response.data, "created");
				// this.existingPhoneNumbers = response.data.map((contact) => contact.phoneNumber);
				// console.log(this.existingPhoneNumbers, "created");
				this.getPhoneNumbers();
				console.log("created");
			}),
				(response) => {
					console.log("An error occured!!!");
				};
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

	.error {
		border: 1px solid red;
	}
</style>
