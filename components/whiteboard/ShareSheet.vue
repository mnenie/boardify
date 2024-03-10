<script setup lang="ts">
import {v4 as uuid} from 'uuid'
import { toast } from 'vue-sonner';

const link = uuid();
const onShare = () => {
  toast.error('On Experimental Mode Not For Production');
}
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
          <UiButton @click="onShare" type="submit">
            Share
          </UiButton>
        </UiSheetClose>
    </UiSheetContent>
  </UiSheet>
</template>
