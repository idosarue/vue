<template>
  <div class="contact-card">
    <img
      v-bind:src="contact.image ? contact.image : placeHolderImage"
      alt="not"
    />
    <p>{{ fullName }}</p>
    <p>{{ contact.phoneNumber }}</p>
    <button v-on:click="deleteContact">Delete</button>
    <button v-on:click="editContact">Edit</button>
  </div>
</template>

<script>
import {bus} from '../main';
import {API_URL} from '../config/constants';

export default {
  data() {
    return {
      placeHolderImage: "http://localhost:3000/uploads/contact1.png",
	};
  },
  props: {
    contact: Object
  },
  computed: {
    fullName() {
      return `${this.contact.firstName} ${this.contact.lastName}`;
    }
  },
  methods: {
    async editContact() {
      const response = await this.$http.get(`${API_URL}/contact/${this.contact._id}`)
	  bus.$emit("openModal", response.data);
    },
    async deleteContact() {
      console.log("clicked");
      await this.$http.delete(`${API_URL}/contacts/${this.contact._id}`);
	  bus.$emit('contactDeleted')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
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

.options {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
</style>
