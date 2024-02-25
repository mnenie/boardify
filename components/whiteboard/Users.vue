<script setup lang="ts">
import {
  LogOut,
  Presentation,
  MousePointerClick,
  ArrowDownAZ,
  HeartHandshake,
  HelpCircle,
} from "lucide-vue-next";
import { useCanvasStore } from "~/store/canvas.store";

const authStore = useAuthStore();
const canvasStore = useCanvasStore()
const logout = async () => {
  await authStore.logout();
};
import { redirect } from "@/helpers/helperRedirect";

const { data, isLoading } = useUsersQuery();
</script>

<template>
  <div v-if="canvasStore.canvasSkeleton"
    class="flex gap-2 items-center p-2 fixed bg-white rounded-md shadow-xl top-2 right-2 h-12"
  >
    <div class="flex gap-3 items-center mr-2">
      <HeartHandshake
        @click="redirect('https://t.me/youngjuicycashrussia')"
        class="cursor-pointer"
        :size="20"
        :stroke-width="1.8"
      />
      <HelpCircle
        @click="redirect('https://github.com/mnenie/Boardify')"
        class="cursor-pointer"
        :size="20"
        :stroke-width="1.8"
      />
    </div>
    <div class="h-5 w-px bg-gray-300 mr-2"></div>
    <div class="flex gap-3 items-center mr-2">
      <ArrowDownAZ class="cursor-pointer" :size="20" :stroke-width="1.8" />
      <MousePointerClick
        class="cursor-pointer"
        :size="22"
        :stroke-width="1.6"
      />
      <Presentation class="cursor-pointer" :size="20" :stroke-width="1.8" />
    </div>
    <div class="h-5 w-px bg-gray-300 mr-2"></div>
    <div class="mr-2 flex items-center gap-2">
      <UiSkeleton v-if="isLoading" class="w-7 h-7 rounded-full" />
      <div v-else
        class="flex items-center justify-center w-7 h-7 rounded-full"
        :class="{'bg-red-300': !authStore.user.photoUrl}"
      >
        <UiTooltipProvider>
          <UiTooltip :delay-duration="0" :key="authStore.user.id">
            <UiTooltipTrigger as-child>
              <span
                v-if="!authStore.user.photoUrl"
                class="text-white text-base font-normal"
                >{{ authStore.user.email?.slice(0, 2) }}</span
              >
              <NuxtImg
                v-else-if="authStore.user.photoUrl"
                class="rounded-full"
                :src="authStore.user.photoUrl"
              />
            </UiTooltipTrigger>
            <UiTooltipContent class="mt-12 dark:bg-white dark:text-gray-950">
              <span>{{ authStore.user.email }}</span>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </div>
    </div>
    <div class="h-5 w-px bg-gray-300 mr-2"></div>
    <LogOut
      class="cursor-pointer"
      @click="logout"
      :size="20"
      :stroke-width="1.8"
    />
  </div>
  <UiSkeleton class="h-12 fixed bg-gray-200 rounded-md shadow-xl top-2 right-2 w-[320px]" v-else />
</template>
