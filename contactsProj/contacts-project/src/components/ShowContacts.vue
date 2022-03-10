<template>
  <div class="container">
    <FormModal />
    <div class="contacts">
      <h1 v-if="loading">Loading...</h1>
      <template v-if="!loading">
        <ContactCard 
          v-bind:contact="contact"
          v-for="(contact, contact_index) in contacts"
          :key="contact_index"
        />
      </template>
    </div>
  </div>
</template>

<script>
import ContactCard from "./ContactCard.vue";
import FormModal from "./FormModal.vue";
import { bus } from "../main";
import {API_URL} from '../config/constants';

export default {
  components: {
    ContactCard,
    FormModal
  },
  data() {
    return {
      contacts: [],
      existingPhoneNumber: "",
      displayEditForm: false,
      existingPhoneNumbers: [],
      loading: true
    };
  },
  methods: {
    getData() {
      this.$http.get(`${API_URL}/contacts`).then(response => {
        this.loading = false;
        this.contacts = response.data;
      })
      .catch(error => {
        console.log("An error occured!!!", error);
      })
    },
  },
  // get the contacts
  created() {
    // using setTimeout just to simulate delay
    setTimeout(() => {
      this.getData();
    }, 2000);
    bus.$on("addedContact", () => {
      this.getData();
    });
    bus.$on('contactDeleted', () => {
      this.getData();
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contacts {
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(3, 200px);
  gap: 30px;
}
</style>
