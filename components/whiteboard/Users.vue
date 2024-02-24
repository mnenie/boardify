<script setup lang="ts">
import { LogOut } from 'lucide-vue-next';

const authStore = useAuthStore()
const logout = async () => {
  await authStore.logout()
}

const {data} = useUsersQuery()
</script>

<template>
  <div class="flex gap-2 items-center p-3 fixed bg-white rounded-md shadow-xl top-2 right-2 h-14">
    <div v-for="user in data" :key="user.uid" class="flex items-center justify-center w-8 h-8 rounded-full" :class="{'bg-red-300': !user.photoURL!}">
      <span v-if="!user.photoURL" class="text-white text-lg font-normal">{{ user.email?.slice(0, 2) }}</span>
      <NuxtImg v-else-if="user.photoURL" class="rounded-full" :src="user.photoURL" />
    </div>
    <div class="h-5 w-px bg-gray-400 mr-2"></div>
    <LogOut class="cursor-pointer" @click="logout" :size="19" :stroke-width="1.8" />
  </div>
</template>
