<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { useMySessionStore } from "./stores/session";

const sessionStore = useMySessionStore();

const { execute } = useAsyncData("session-init", () => sessionStore.init(), {
  immediate: false,
});

onMounted(() => execute());
</script>
