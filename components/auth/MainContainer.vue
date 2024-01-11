<script setup lang="ts">

</script>

<template>
  <div class="flex w-full content_form">
    <AuthCard />
  </div>
</template>

<style scoped>
.content_form {
  animation: gradient 15s ease infinite;
  background: linear-gradient(-45deg, #f0f0f0, #e9e9e9, #2e2e2e, #161616);
  background-size: 400% 400%;
  width: 100%;
  height: 100vh;
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
}</style>
