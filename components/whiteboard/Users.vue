<script setup lang="ts">
import {
  LogOut,
  MonitorPlay,
  MousePointerClick,
  ArrowDownAZ,
  HeartHandshake,
  HelpCircle,
  MonitorX
} from 'lucide-vue-next';
import { useCanvasStore } from '~/store/canvas.store';
import { usePresentation } from '~/store/presentation.store';

const emit = defineEmits<{
  (e: 'onDraggable'): void;
  (e: 'onDraw'): void;
}>();

const authStore = useAuthStore();
const canvasStore = useCanvasStore();
const logout = async () => {
  await authStore.logout();
};
import { redirect } from '@/helpers/helperRedirect';

const { data, isLoading } = useUsersQuery();

const presentationStore = usePresentation();

const changeTool = () => {
  presentationStore.changePresentationMode();
  if (presentationStore.presentation) {
    emit('onDraggable');
  } else {
    emit('onDraw');
  }
};
</script>

<template>
  <div
    v-if="canvasStore.canvasSkeleton"
    class="absolute right-2 top-2 flex h-12 items-center gap-2 rounded-md bg-white p-2 shadow-xl"
  >
    <div class="mr-2 flex items-center gap-3">
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
    <div class="mr-2 h-5 w-px bg-gray-300"></div>
    <div class="mr-2 flex items-center gap-3">
      <ArrowDownAZ class="cursor-pointer" :size="20" :stroke-width="1.8" />
      <MousePointerClick class="cursor-pointer" :size="22" :stroke-width="1.6" />
      <MonitorPlay
        v-if="!presentationStore.presentation"
        @click="changeTool"
        class="cursor-pointer"
        :size="20"
        :stroke-width="1.8"
      />
      <MonitorX v-else @click="changeTool" class="cursor-pointer" :size="20" :stroke-width="1.8" />
    </div>
    <div class="mr-2 h-5 w-px bg-gray-300"></div>
    <div class="mr-2 flex items-center gap-2">
      <UiSkeleton v-if="isLoading" class="h-7 w-7 rounded-full" />
      <div
        v-else
        class="flex h-7 w-7 items-center justify-center rounded-full"
        :class="{ 'bg-red-300': !authStore.user.photoUrl }"
      >
        <UiTooltipProvider>
          <UiTooltip :delay-duration="0" :key="authStore.user.id">
            <UiTooltipTrigger as-child>
              <span v-if="!authStore.user.photoUrl" class="text-base font-normal text-white">{{
                authStore.user.email?.slice(0, 2)
              }}</span>
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
    <div class="mr-2 h-5 w-px bg-gray-300"></div>
    <LogOut class="cursor-pointer" @click="logout" :size="20" :stroke-width="1.8" />
  </div>
  <UiSkeleton class="fixed right-2 top-2 h-12 w-[320px] rounded-md bg-gray-200 shadow-xl" v-else />
</template>
