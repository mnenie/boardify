<template>
  <div class="flex flex-col items-center w-full">
    <div class="flex items-center justify-center w-full space-x-4 mb-6">
      <div class="h-px bg-gray-200 w-full"></div>
      <span class="uppercase text-xs whitespace-nowrap text-gray-400">or continue with</span>
      <div class="h-px bg-gray-200 w-full"></div>
    </div>
    <UiButton :variant="'outline'" class="w-full gap-2 flex items-center">
      <NuxtImg width="16" height="16" src="/icons/github-mark.svg" />
      GitHub
    </UiButton>
  </div>
</template>