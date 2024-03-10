<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { AlertDialogCancel, type AlertDialogCancelProps } from 'radix-vue';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const props = defineProps<AlertDialogCancelProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AlertDialogCancel
    v-bind="delegatedProps"
    :class="cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0 dark:bg-white dark:border-gray-200 dark:hover:bg-gray-950/90', props.class)"
  >
    <slot />
  </AlertDialogCancel>
</template>
