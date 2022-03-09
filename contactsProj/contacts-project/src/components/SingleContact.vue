<template>
	<div>
		<FormHelper v-bind:formData="contact" v-bind:currentContactPhoneNumber="existingPhoneNumber" v-bind:contactId="contactId"></FormHelper>
	</div>
</template>

<script>
	import ContactCard from "./ContactCard.vue";
	import FormHelper from "./FormHelper.vue";
	export default {
		components: {
			"contact-card": ContactCard,
			FormHelper,
		},
		data() {
			return {
				existingPhoneNumber: "",
				contactId: this.$route.params.id,
				contact: {
					firstName: "",
					lastName: "",
					phoneNumber: "",
				},
				// errors: {
				// 	firstName: "",
				// 	lastName: "",
				// 	phoneNumber: "",
				// },
				// existingPhoneNumbers: [],
				// contacts: [],
				// placeHolderImage: "static/images/default.png",
			};
		},
		methods: {},

		computed: {},
		created() {
			this.$http.get("http://localhost:3000/contact/" + this.contactId).then((response) => {
				this.contact = response.data;
				this.existingPhoneNumber = response.data.phoneNumber;
				// this.contact.contactId = this.contactId;
				console.log(this.contact, "created");
				// this.contact.fullName = this.contact.firstName + " " + this.contact.lastName;
			});
		},
	};
</script>

<style></style>
