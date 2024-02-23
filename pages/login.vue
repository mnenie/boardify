<script setup lang="ts">
useSeoMeta({
  title: 'Login | Boardify'
})

definePageMeta({
  middleware: 'sign-in'
})
</script>

<template>
  <div>
    <AuthMainContainer />
  </div>
</template>
