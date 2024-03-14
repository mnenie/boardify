<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()
</script>

<template>
  <div v-if="width > 992" class="flex w-full relative main_container">
    <div class="content_form w-1/2 h-screen" />
    <AuthCard />
  </div>
  <ScreenNotAvailable v-else />
</template>

<style scoped>
.content_form {
  animation: gradient 15s ease infinite;
  background: linear-gradient(-45deg, #f0f0f0, #e9e9e9, #2e2e2e, #161616);
  background-size: 400% 400%;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media screen and (max-width: 1280px) {
  .content_form{
    display: none;
  }
  .main_container{
    justify-content: center;
  }
}
</style>
