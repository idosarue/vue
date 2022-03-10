<template>
  <form @submit.prevent="checkForm">
    <input
      v-model="formData.firstName"
      :class="errors.firstName ? 'error' : ''"
      type="text"
      placeholder="First Name"
    />
    <div class="error-container">
      <p v-if="errors.firstName">{{ errors.firstName }}</p>
    </div>
    <input
      v-model="formData.lastName"
      :class="errors.lastName ? 'error' : ''"
      type="text"
      placeholder="Last Name"
    />
    <div class="error-container">
      <p v-if="errors.lastName">{{ errors.lastName }}</p>
    </div>
    <input
      v-model="formData.phoneNumber"
      :class="errors.phoneNumber ? 'error' : ''"
      type="text"
      placeholder="Phone Number"
    />
    <div class="error-container">
      <p v-if="errors.phoneNumber">{{ errors.phoneNumber }}</p>
    </div>
    <button type="submit">Save Contact</button>
  </form>
</template>

<script>
import { bus } from "../main";
import { API_URL } from "../config/constants";

export default {
  data() {
    return {
      contactId: "",
      currentContactPhoneNumber: "",
      formData: {
        firstName: "",
        lastName: "",
        phoneNumber: ""
      },
      contacts: [],
      errors: []
    };
  },
  computed: {
    phoneNumberIsValid() {
      return /^[+]?[(]?[0-9]{3}[)]?[- .]?[0-9]{3}[- .]?[0-9]{4,6}$/im.test(
        this.formData.phoneNumber
      );
    },
    existingPhoneNumbers() {
      const phoneNumbers = this.contacts.map(contact => {
        return contact.phoneNumber;
      });

      if (this.currentContactPhoneNumber) {
        return phoneNumbers.filter(phoneNumber => {
          return phoneNumber != this.currentContactPhoneNumber;
        });
      }

      return phoneNumbers;
    }
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get(`${API_URL}/contacts`);
        this.contacts = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    getErrors() {
      const requiredMessage = "This field is required",
        invalidNumber = "invalid phone number",
        duplicatePhoneNumber = "Phone number exists";
      const { firstName, lastName, phoneNumber } = this.formData;

      this.errors = {
        firstName: !firstName ? requiredMessage : "",
        lastName: !lastName ? requiredMessage : "",
        phoneNumber: !phoneNumber
          ? requiredMessage
          : !this.phoneNumberIsValid
          ? invalidNumber
          : this.existingPhoneNumbers.includes(phoneNumber)
          ? duplicatePhoneNumber
          : ""
      };
    },
    putContact() {
      this.$http
        .put(`${API_URL}/editContact/` + this.contactId, this.formData)
        .then(() => {
          bus.$emit("addedContact", this.contacts);
          bus.$emit("showPopUp", "Edited successfuly!");
        })
        .catch(e => {
          console.log(e);
        });
    },
    postContact() {
      this.$http
        .post(`${API_URL}/contacts`, this.formData)
        .then(() => {
          bus.$emit("addedContact", this.contacts);
          bus.$emit("showPopUp", "Added Contact!");
        })
        .catch(e => {
          console.log(e);
        });
    },
    async checkForm() {
      await this.getData();
      this.getErrors();

      // exit function if there are any errors
      const { firstName, lastName, phoneNumber } = this.errors;
      if (firstName || lastName || phoneNumber) return;

      if (this.currentContactPhoneNumber) {
        this.putContact();
      } else {
        this.postContact();
      }
    }
  },
  created() {
    bus.$on("clearForm", () => {
      this.formData = {};
      this.errors = {};
      this.contactId = "";
      this.currentContactPhoneNumber = "";
    });

    bus.$on("openModal", data => {
      this.formData = data;
      this.contactId = data._id;
      this.currentContactPhoneNumber = data.phoneNumber;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
