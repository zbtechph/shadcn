// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appwriteEndpoint: "",
      appwriteProjectId: "",
    },
  },

  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "@vee-validate/nuxt", "@nuxt/eslint"],
  veeValidate: {
    autoImports: false,
    // componentNames: {
    //   Form: 'VeeForm',
    //   Field: 'VeeField',
    //   FieldArray: 'VeeFieldArray',
    //   ErrorMessage: 'VeeErrorMessage',
    // },
  },
  ssr: false,
});
