<script setup lang="ts">
const route = useRoute()
const isLogin = ref<boolean>(false)

if(route.path === LOGIN_ROUTE){
  isLogin.value = true
}
</script>

<template>
  <div class="h-screen w-full flex justify-center items-center">
    <UiCard class="flex-col max-w-screen-sm w-full">
      <UiCardHeader>
        <UiCardTitle>{{ isLogin ? 'Welcome back' : 'Get started' }}</UiCardTitle>
        <UiCardDescription>{{ isLogin ? 'Sign in to your account' : 'Create a new account' }}</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <AuthFormLogin v-if="isLogin" />
        <AuthFormRegistration v-if="!isLogin" />
      </UiCardContent>
    </UiCard>
  </div>
</template>