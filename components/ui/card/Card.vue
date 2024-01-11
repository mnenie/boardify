<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
