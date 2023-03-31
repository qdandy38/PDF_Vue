<script setup>
import { ref } from 'vue'
const imgDom = ref(null)
const containerDom = ref(null)

const copyImage = async () => {
  const url = imgDom.value.src
  const res = await fetch(url)
  const imageData = await res.blob()
  const clipboardItem = new ClipboardItem({
    'image/png': imageData
  })

  try {
    await navigator.clipboard.write([clipboardItem])
    console.log('copied');
    readCopiedImg()
  } catch (error) {
    console.error('fail', error);
  }
}

const readCopiedImg = async () => {
  const clipboardContents = await navigator.clipboard.read()
  for(const item of clipboardContents) {
    if(!item.types.includes("image/png")) {
      throw new Error("Clipboard contains non-image data.")
    }
    const blob = await item.getType("image/png")
    const copiedImg = new Image()
    copiedImg.src = URL.createObjectURL(blob)
    containerDom.value.appendChild(copiedImg)
  }
}
</script>
<template>
  <div class="test">
    <img src="/images/intro1.png" ref="imgDom" />
    <button @click="copyImage" class="coptBtn">Copy</button>
    <div class="container" ref="containerDom"></div>
  </div>
</template>
<style lang="css" scoped>
.test{
  @apply
  flex
  justify-evenly
  items-center
  h-screen;
  .coptBtn{
    @apply
    mb-2
    bg-primary
    text-white
    rounded-md
    p-2.5;
  }
  .container{
    @apply
    flex
    justify-center
    items-center
    border
    border-primary
    rounded-lg
    w-[300px]
    h-[300px]
    overflow-hidden
  }
}
</style>