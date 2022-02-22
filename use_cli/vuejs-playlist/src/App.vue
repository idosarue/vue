<template>
  <div>
  <p></p>
    <h1>{{ title }}</h1>
    <p>{{ greeting() }}</p>
    <ninjas></ninjas>
  </div>
</template>

<script>

import Ninjas from './Ninjas.vue'

export default {
  // Local nesting
    components : {
      Ninjas
    },
    data() {
        return {
            title: "Ninjas",
        };
    },
    methods: {
        greeting: function () {
            return "heyy cowboy!";
        }
    },
};
</script>


<style></style>
