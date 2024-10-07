<template>
  <div>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/profile">Profile</NuxtLink>
      <template v-if="!sessionStore.isAuthenticated">
        <NuxtLink to="/signup">Registration</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
      </template>
      <template v-else>
        <button type="button" @click="logout">Logout</button>
      </template>
    </nav>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const sessionStore = useMySessionStore();

function logout() {
  sessionStore.destroyCurrent().then(() => {
    navigateTo("/login");
  });
}

useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: "%s - AppName",
});
</script>
