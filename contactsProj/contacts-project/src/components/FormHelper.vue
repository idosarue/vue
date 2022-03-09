<template>
	<form @submit="checkForm" enctype="multipart/form-data">
		<input v-model="formData.firstName" :class="this.errors.firstName ? 'error' : ''" type="text" placeholder="First Name" />
		<div class="error-container">
			<p v-if="errors.firstName">{{ errors.firstName }}</p>
		</div>
		<input v-model="formData.lastName" :class="this.errors.lastName ? 'error' : ''" type="text" placeholder="Last Name" />
		<div class="error-container">
			<p v-if="errors.lastName">{{ errors.lastName }}</p>
		</div>
		<input v-model="formData.phoneNumber" :class="this.errors.phoneNumber ? 'error' : ''" type="text" placeholder="Phone Number" />
		<div class="error-container">
			<p v-if="errors.phoneNumber">{{ errors.phoneNumber }}</p>
		</div>
		<input @change="onFileSelected" type="file" ref="file" />
		<div class="error-container">
			<p v-if="errors.file">{{ errors.file }}</p>
		</div>
		<button type="submit">Save Contact</button>
	</form>
</template>

<script>
	import { bus } from "../main";
	const acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
	export default {
		data() {
			return {
				contactId: "",
				currentContactPhoneNumber: "",
				formData: {
					firstName: "",
					lastName: "",
					phoneNumber: "",
					selectedFile: null,
				},
				errors: {
					firstName: "",
					lastName: "",
					phoneNumber: "",
					file: "",
				},
				existingPhoneNumbers: [],
				contacts: [],
			};
		},
		methods: {
			async getData() {
				const response = await this.$http.get("http://localhost:3000/contacts");
				try {
					this.contacts = response.data;
				} catch (error) {
					console.error(error);
				}
			},
			getPhoneNumbers() {
				this.existingPhoneNumbers = this.contacts.map((contact) => contact.phoneNumber);
				if (this.currentContactPhoneNumber) {
					this.existingPhoneNumbers = this.existingPhoneNumbers.filter((phoneNumber) => phoneNumber != this.currentContactPhoneNumber);
				}
			},
			async checkForm(e) {
				e.preventDefault();
				await this.getData();
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

				if (!this.vaildateFileType()) {
					this.errors.file = "Please choose images";
				}

				if (firstName && lastName && this.validatePhoneNumber(phoneNumber) && !this.existingPhoneNumbers.includes(phoneNumber) && this.vaildateFileType()) {
					console.log(this.formData.selectedFile, "DATA");
					const formData = new FormData();

					formData.append("file", this.formData.selectedFile);
					formData.append("firstName", this.formData.firstName);
					formData.append("lastName", this.formData.lastName);
					formData.append("phoneNumber", this.formData.phoneNumber);

					if (this.currentContactPhoneNumber) {
						this.$http
							.put("http://localhost:3000/editContact/" + this.contactId, formData)
							.then((data) => {
								bus.$emit("addedContact", this.contacts);
								bus.$emit("showPopUp", "Edited successfuly!");
							})
							.catch((e) => {
								console.log(e);
							});
					} else {
						this.$http
							.post("http://localhost:3000/contacts", formData)
							.then((data) => {
								bus.$emit("addedContact", this.contacts);
								bus.$emit("showPopUp", "Added Contact!");
							})
							.catch((e) => {
								console.log(e);
							});
					}
				}
			},

			validatePhoneNumber(phoneNumber) {
				// if (phoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
				// 	return true;
				// }
				// return false;
				// if (phoneNumber.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)) {
				// 	return true;
				// }
				// return false;
				if (phoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[- ]?[0-9]{3}?[- ]?[0-9]{4,6}$/i)) {
					return true;
				}
				return false;
			},

			onFileSelected() {
				this.formData.selectedFile = this.$refs.file.files[0];
			},

			vaildateFileType() {
				if (this.formData.selectedFile) {
					if (!acceptedFileTypes.includes(this.formData.selectedFile.type)) {
						return false;
					}
				}
				return true;
			},
		},

		computed: {},

		created() {
			bus.$on("clearForm", (data) => {
				this.formData = {};
				this.errors = {};
				this.contactId = "";
				this.currentContactPhoneNumber = "";
				this.$refs.file.value = "";
			});

			bus.$on("openModal", (data) => {
				this.formData = data;
				this.contactId = data._id;
				this.currentContactPhoneNumber = data.phoneNumber;
				console.log(this.$refs.file.files);
			});
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

	.error-container {
		max-height: 50px;
		text-align: left;
		color: red;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	p {
		margin: 0;
		overflow: hidden;
		transform: translateY(-100%);
		animation: 0.3s fade-in forwards;
	}

	.error {
		border: 2px solid red;
		max-height: 50px;
	}

	form {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-evenly;
	}

	input,
	button {
		padding: 5px;
		border: 2px solid;
		border-radius: 3px;
	}

	button {
		background: dodgerblue;
		cursor: pointer;
	}

	@keyframes fade-in {
		to {
			transform: translateY(0);
		}
	}
</style>
