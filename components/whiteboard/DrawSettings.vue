<script setup lang="ts">
import { Save, MousePointer2, Square, Grid3X3, FileUp, Move, Hand } from 'lucide-vue-next';
import type { IDrawSettings } from '~/types/ui.interfase';
const emits = defineEmits<{
  (e: 'onDragg'): void,
  (e: 'onDraw'): void,
  (e: 'onGrid'): void,
  (e: 'deleteGrid'): void,
  (e: 'onSave'): void,
  (e: 'onUpload'): void,
}>()

//@ts-ignore
const { saveImage } = inject('saveImage')

const settingsGrids = ref<IDrawSettings[]>([
  { id: 0, active: false, icon: Square, event:() => emits('deleteGrid') },
  { id: 1, active: true, icon: Grid3X3, event:() => emits('onGrid') },
])

//experimental feature onDragg
const settingsMove = ref<IDrawSettings[]>([
  { id: 0, active: false, icon: Hand, event:() => emits('onDragg') },
  { id: 1, active: true, icon: MousePointer2, event:() => emits('onDraw') },
])
const settingsFiles = ref<IDrawSettings[]>([
  { id: 0, icon: Save, event: saveImage },
  { id: 1, icon: FileUp, event: () => emits('onUpload')},
])

const changeActiveGridsSettings = (id: number) => {
  const activeSetting = settingsGrids.value.find(i => i.id === id)
  if(activeSetting && activeSetting.event){
    activeSetting.event()
  }
  settingsGrids.value.map((btn, i) => {
    btn.active = i === id
  })
}
const changeActiveMoveSettings = (id: number) => {
  const activeSetting = settingsMove.value.find(i => i.id === id)
  if(activeSetting && activeSetting.event){
    activeSetting.event()
  }
  settingsMove.value.map((btn, i) => {
    btn.active = i === 1
  })
}
</script>


<template>
  <div
    class="flex gap-1 items-center flex-col p-2 w-12 fixed bg-white rounded-md shadow-lg top-1/2 left-2 -translate-y-1/2">
    <div v-for="i in settingsMove" class="p-1.5 rounded-md" :class="{ 'active': i.active }">
      <component :is="i.icon" class="cursor-pointer" @click="changeActiveMoveSettings(i.id)" />
    </div>
    <div v-for="i in settingsFiles" class="p-1.5 rounded-md">
      <component :is="i.icon" class="cursor-pointer" @click="i.event" />
    </div>
    <div v-for="i in settingsGrids" class="p-1.5 rounded-md" :class="{ 'active': i.active }">
      <component :is="i.icon" class="cursor-pointer" @click="changeActiveGridsSettings(i.id)" />
    </div>
  </div>
</template>

<style scoped>
.active {
  background: rgb(243 244 246);
}
</style>