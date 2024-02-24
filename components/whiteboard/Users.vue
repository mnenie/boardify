<script setup lang="ts">
import {
  LogOut,
  Presentation,
  MousePointerClick,
  ArrowDownAZ,
  HeartHandshake,
  HelpCircle 
} from "lucide-vue-next";

const authStore = useAuthStore();
const logout = async () => {
  await authStore.logout();
};

const { data } = useUsersQuery();
</script>

<template>
  <div
    class="flex gap-2 items-center p-2 fixed bg-white rounded-md shadow-xl top-2 right-2 h-12"
  >
    <div class="flex gap-3 items-center mr-2">
      <HeartHandshake class="cursor-pointer" :size="20" :stroke-width="1.8" />
      <HelpCircle class="cursor-pointer" :size="20" :stroke-width="1.8" />
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
      <div
        v-for="user in data"
        :key="user.uid"
        class="flex items-center justify-center w-7 h-7 rounded-full"
        :class="{'bg-red-300': !user.photoURL!}"
      >
        <span v-if="!user.photoURL" class="text-white text-base font-normal">{{
          user.email?.slice(0, 2)
        }}</span>
        <NuxtImg
          v-else-if="user.photoURL"
          class="rounded-full"
          :src="user.photoURL"
        />
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
