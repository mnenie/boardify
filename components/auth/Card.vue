<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="h-screen flex justify-center items-center dark:bg-gray-950 md:w-2/3 xl:w-1/2 w-full">
    <UiCard class="flex-col w-full sm:w-3/4 items-center">
      <UiCardHeader class="flex items-center">
        <UiCardTitle class="mb-px">{{
          route.path === LOGIN_ROUTE ? 'Welcome back' : 'Get started'
        }}</UiCardTitle>
        <UiCardDescription class="text-center">{{
          route.path === LOGIN_ROUTE
            ? 'Enter your info below to sign in your account'
            : 'Enter your info below to create your account'
        }}</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="flex items-center">
        <AuthFormLogin v-if="route.path === LOGIN_ROUTE" />
        <AuthFormRegistration v-if="route.path === REGISTRATION_ROUTE" />
      </UiCardContent>
    </UiCard>
  </div>
</template>
