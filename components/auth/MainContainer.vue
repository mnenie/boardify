<template>
  <div class="flex w-full relative">
    <div class="content_form w-1/2 h-screen" />
    <AuthCard />
  </div>
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
}</style>
