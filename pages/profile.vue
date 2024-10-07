<template>
  <div>Profile Page</div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Profile",
});
</script>
