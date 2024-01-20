<script lang="ts" setup>
const {getAccount} = useAuthStore()

onMounted(async() => {
  await getAccount()
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
