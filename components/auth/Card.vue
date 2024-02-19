<script setup lang="ts">
const route = useRoute()
const isLogin = ref<boolean>(false)

if(route.path === LOGIN_ROUTE){
  isLogin.value = true
}
</script>

<template>
  <div class="h-screen w-1/2 flex justify-center items-center">
    <UiCard class="flex-col w-2/3 items-center">
      <UiCardHeader class="flex items-center">
        <UiCardTitle class="mb-px">{{ isLogin ? 'Welcome back' : 'Get started' }}</UiCardTitle>
        <UiCardDescription>{{ isLogin ? 'Enter your info below to sign in your account' : 'Enter your info below to create your account' }}</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="flex items-center">
        <AuthFormLogin v-if="isLogin" />
        <AuthFormRegistration v-if="!isLogin" />
      </UiCardContent>
    </UiCard>
  </div>
</template>