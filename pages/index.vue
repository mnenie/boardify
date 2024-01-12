<script setup lang="ts">

const color = ref<string>("#000")
const line = ref<number>(5)
const radius = ref<number>(2)

const changeEraser = () => {
  color.value = 'rgb(249 250 251)'
  line.value = 14
  radius.value = 7
}

const changePen = () => {
  color.value = '#000'
  line.value = 5
  radius.value = 2
}

const changeHighlighter = () => {
  color.value = '#000'
  line.value = 15
  radius.value = 7
}

const changePenTool = () => {
  color.value = '#000'
  line.value = 3
  radius.value = 1
}

provide('changeColor',{changeEraser, changePen, changeHighlighter, changePenTool})

</script>

<template>
  <div class="bg-gray-50 h-screen w-screen relative flex justify-center items-center">
    <WhiteboardCanvas :color="color" :line="line" :radius="radius"/>
    <WhiteboardName />
    <WhiteboardDrawSettings />
    <WhiteboardUsers />
    <WhiteboardScale />
    <WhiteboardMode />
    <WhiteboardDrawItems />
  </div>
</template>

