<script setup lang="ts">
const emit = defineEmits(['update:project'])
const props = defineProps<{
  project: string
}>()
const canvasStore = useCanvasStore()
const updateProject = async (e: Event) => {
  await canvasStore.renameBoard(props.project)
  emit('update:project', (e.target as HTMLInputElement).value)
}
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
      <UiInput class="mb-4" :model-value="project" @input="updateProject" />
      <UiSheetClose as-child>
          <UiButton type="submit">
            Rename
          </UiButton>
        </UiSheetClose>
    </UiSheetContent>
  </UiSheet>
</template>
