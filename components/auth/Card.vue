<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="h-screen w-1/2 flex justify-center items-center dark:bg-gray-950">
    <UiCard class="flex-col w-2/3 items-center">
      <UiCardHeader class="flex items-center">
        <UiCardTitle class="mb-px">{{
          route.path === LOGIN_ROUTE ? 'Welcome back' : 'Get started'
        }}</UiCardTitle>
        <UiCardDescription>{{
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
