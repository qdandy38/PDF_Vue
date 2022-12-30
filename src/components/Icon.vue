<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: String,
})
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['click', 'touchstart', 'touchend'])

function click(e) {
  emit("click",e)
}
function touchstart(e) {
  emit("touchstart",e)
}
function touchend(e) {
  emit("touchend",e)
}
</script>

<template>
    <i :name="name" class="v-icon customIcon" @click="click" @touchstart="touchstart" @touchend="touchend"></i>
</template>

<style lang="css">
@font-face{
    font-family:'v-icon';
    src:
        url('/iconfont/iconfont.ttf') format('truetype'),
        url('/iconfont/iconfont.woff') format('woff'),
        url('/iconfont/iconfont.woff2') format('woff2');
    font-weight:normal;
    font-style:normal;
}

.customIcon{
    font-family:'v-icon';
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
