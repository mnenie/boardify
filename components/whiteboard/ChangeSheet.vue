<script setup lang="ts">

</script>

<template>
  <UiSheet>
    <UiSheetTrigger as-child>
      <slot />
    </UiSheetTrigger>
    <UiSheetContent :side="'bottom'">
      <UiSheetHeader>
        <UiSheetTitle>Are you sure absolutely sure?</UiSheetTitle>
        <UiSheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </UiSheetDescription>
      </UiSheetHeader>
    </UiSheetContent>
  </UiSheet>
</template>
