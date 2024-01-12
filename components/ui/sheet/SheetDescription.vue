<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<DialogDescriptionProps & { class?: string }>()
</script>

<template>
  <DialogDescription
    :class="cn('text-sm text-gray-500 dark:text-gray-400', props.class)"
    v-bind="props"
  >
    <slot />
  </DialogDescription>
</template>
