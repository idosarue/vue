<template>
  <div id="app">
    <AppHeader />
    <PopUp />
    <ShowContacts />
  </div>
</template>

<script>
import ShowContacts from "./components/ShowContacts.vue";
import AppHeader from "./components/AppHeader.vue";
import PopUp from "./components/NotificationPopUp.vue";

export default {
  components: {
    ShowContacts,
    AppHeader,
    PopUp
  },
  data() {
    return {
      loading: true,
      contacts: ""
    };
  },

  methods: {
    addContacts(newContacts) {
      this.contacts = newContacts;
      alert("changed");
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

button {
  cursor: pointer;
}

a {
  text-decoration: none;
}
</style>
