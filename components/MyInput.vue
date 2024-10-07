<template>
  <div>
    <label :for="id" v-text="props.label" />
    <input :id="id" v-model="model" :type="props.as" :required />
    <small v-if="props.errors" v-text="props.errors" />
  </div>
</template>

<script lang="ts" setup>
import { useId } from "vue";
const id = useId();
const model = defineModel<string>();
const props = withDefaults(
  defineProps<{
    as?: string;
    label: string;
    errors?: string;
    required?: boolean;
  }>(),
  {
    as: "text",
    errors: "",
    required: true,
  },
);
</script>
