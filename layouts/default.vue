<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

onMounted(() => {
  mode.value = 'light'
})
</script>
<template>
  <div>
    <slot />
    <UiToaster />
  </div>
</template>
