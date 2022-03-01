<template>
	<div>
		<form @submit="checkForm">
			<input v-model="firstName" :class="this.errors.firstName ? 'error' : ''" type="text" placeholder="First Name" />
			<div>{{ errors }}</div>
			<p v-if="errors.firstName">{{ errors.firstName }}</p>
			<input v-model="lastName" :class="this.errors.lastName ? 'error' : ''" type="text" placeholder="Last Name" />
			<p v-if="errors.lastName">{{ errors.lastName }}</p>
			<input v-model="phoneNumber" :class="this.errors.phoneNumber ? 'error' : ''" type="text" placeholder="Phone Number" />
			<p v-if="errors.phoneNumber">{{ errors.phoneNumber }}</p>
			<button>Save Contact</button>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				firstName: "",
				lastName: "",
				phoneNumber: "",
				errors: {
					firstName: "",
					lastName: "",
					phoneNumber: "",
				},
			};
		},
		methods: {
			checkForm(e) {
				const requiredMessage = "This field is required";
				this.errors = {};

				const existingPhoneNumbers = this.contacts.map((contact) => contact.phoneNumber);
				console.log(existingPhoneNumbers);

				// if (!this.firstName && !this.lastName && !this.phoneNumber) {
				// 	this.errors.firstName = requiredMessage;
				// 	this.errors.lastName = requiredMessage;
				// 	this.errors.phoneNumber = requiredMessage;
				// }
				if (!this.firstName) {
					this.errors.firstName = requiredMessage;
				}
				if (!this.lastName) {
					this.errors.lastName = requiredMessage;
				}
				if (!this.phoneNumber) {
					this.errors.phoneNumber = requiredMessage;
				} else if (!this.validatePhoneNumber(this.phoneNumber)) {
					this.errors.phoneNumber = "invalid phone number";
				} else if (existingPhoneNumbers.includes(this.phoneNumber)) {
					this.errors.phoneNumber = "Phone number already exists";
				}

				if (this.firstName && this.lastName && this.phoneNumber && this.validatePhoneNumber(this.phoneNumber) && !existingPhoneNumbers.includes(this.phoneNumber)) {
					this.$http
						.post("http://localhost:3000/contacts", {
							firstName: this.firstName,
							lastName: this.lastName,
							phoneNumber: this.phoneNumber,
						})
						.then((data) => {
							// console.log(data, "data");
						});
					return true;
				}

				e.preventDefault();
			},
			// postForm() {
			// 	if (this.checkForm(e)) {
			// 		e.target.submit();
			// 		this.$http
			// 			.post("http://localhost:3000/contacts", {
			// 				firstName: this.firstName,
			// 				lastName: this.lastName,
			// 				phoneNumber: this.phoneNumber,
			// 			})
			// 			.then((data) => {
			// 				// console.log(data, "data");
			// 			});
			// 	}
			// },

			validatePhoneNumber(phoneNumber) {
				if (phoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
					return true;
				}

				return false;
			},
		},
		created() {
			this.$http.get("http://localhost:3000/contacts").then((response) => {
				console.log(response.data, "created");
				return (this.contacts = response.data);
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
