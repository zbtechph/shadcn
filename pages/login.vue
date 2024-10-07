<script lang="ts" setup>
import { useForm } from "vee-validate";
import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
const { values, errors, defineField, setFieldError } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      email: zod.string().trim().email(),
      password: zod.string().trim().min(8),
    }),
  ),
});
const [email] = defineField("email");
const [password] = defineField("password");
const sessionStore = useMySessionStore();

async function attemptLogin() {
  try {
    await sessionStore.createByEmailPassword(
      values.email ?? "",
      values.password ?? "",
    );
  } catch (err) {
    if (err instanceof Error) setFieldError("email", err.message);
  }
  //const { data } = useAsyncData('session-create', () => sessionStore.createByEmailPassword(form.email, form.password))
}

const { subscribe } = useGuestWatcher();
subscribe();

definePageMeta({
  middleware: ["guest"],
});

useHead({
  title: "Login",
});
</script>
<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent="attemptLogin">
      <MyInput
        v-model="email"
        as="email"
        label="Email"
        :errors="errors.email"
      />
      <MyInput
        v-model="password"
        as="password"
        label="Password"
        :errors="errors.password"
      />
      <div>
        <button type="submit">Sign In</button>
      </div>
    </form>
  </div>
</template>
