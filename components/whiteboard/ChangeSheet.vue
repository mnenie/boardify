<script setup lang="ts">
const emit = defineEmits(['update:project'])
const props = defineProps<{
  project: string
}>()
</script>

<template>
  <UiSheet>
    <UiSheetTrigger as-child>
      <slot />
    </UiSheetTrigger>
    <UiSheetContent :side="'bottom'">
      <UiSheetHeader class="mb-6">
        <UiSheetTitle>Are you sure absolutely sure?</UiSheetTitle>
        <UiSheetDescription>
          This action provide rename your project-name
        </UiSheetDescription>
      </UiSheetHeader>
      <UiInput class="mb-4" :model-value="project" @input="emit('update:project', ($event.target as HTMLInputElement).value)" />
      <UiSheetClose as-child>
          <UiButton type="submit">
            Rename
          </UiButton>
        </UiSheetClose>
    </UiSheetContent>
  </UiSheet>
</template>
