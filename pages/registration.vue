<script setup lang="ts">
useSeoMeta({
  title: 'Registration | Boardify'
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
