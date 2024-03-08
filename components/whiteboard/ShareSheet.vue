<script setup lang="ts">
const link = ref('link123')
</script>

<template>
  <UiSheet>
    <UiSheetTrigger as-child>
      <slot />
    </UiSheetTrigger>
    <UiSheetContent :side="'bottom'">
      <UiSheetHeader class="mb-6">
        <UiSheetTitle>Do you want to share a link?</UiSheetTitle>
        <UiSheetDescription>
          This action provide sharing link of your canvas to anothers
        </UiSheetDescription>
      </UiSheetHeader>
      <UiInput class="mb-4" v-model="link" readonly />
      <UiSheetClose as-child>
          <UiButton type="submit">
            Share
          </UiButton>
        </UiSheetClose>
    </UiSheetContent>
  </UiSheet>
</template>
