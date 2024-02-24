<script setup lang="ts">
import {
  LogOut,
  Presentation,
  MousePointerClick,
  ArrowDownAZ,
  HeartHandshake,
  HelpCircle,
} from "lucide-vue-next";

const authStore = useAuthStore();
const logout = async () => {
  await authStore.logout();
};
import { redirect } from "@/helpers/helperRedirect";

const { data, isLoading } = useUsersQuery();
</script>

<template>
  <div
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
        v-for="user in data"
        :key="user.uid"
        class="flex items-center justify-center w-7 h-7 rounded-full"
        :class="{'bg-red-300': !user.photoURL!}"
      >
        <UiTooltipProvider>
          <UiTooltip :delay-duration="0" :key="user.uid">
            <UiTooltipTrigger as-child>
              <span
                v-if="!user.photoURL"
                class="text-white text-base font-normal"
                >{{ user.email?.slice(0, 2) }}</span
              >
              <NuxtImg
                v-else-if="user.photoURL"
                class="rounded-full"
                :src="user.photoURL"
              />
            </UiTooltipTrigger>
            <UiTooltipContent class="mt-12 dark:bg-white dark:text-gray-950">
              <span>{{ user.email }}</span>
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
</template>
