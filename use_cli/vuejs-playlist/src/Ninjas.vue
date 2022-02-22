<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="ninja in ninjas">{{ ninja }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Ninjas",
      ninjas: ["Yoshi", "Mario", "Luigi"]
    };
  }
};
</script>

<style></style>
