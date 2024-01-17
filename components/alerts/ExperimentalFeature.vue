<script lang="ts" setup>
import { Terminal } from 'lucide-vue-next';

const props = defineProps<{
  isExperimental: boolean
}>()
</script>

<template>
  <div class="flex justify-center mt-7">
    <UiAlert class="flex max-w-max items-center h-14" v-if="isExperimental">
      <Terminal class="h-4 w-4" />
      <UIAlertTitle>Experimental Mode! Its not available rn</UIAlertTitle>
    </UiAlert>
  </div>
</template>