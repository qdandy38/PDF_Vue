<script setup>
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';
import router from "../router";
const { sequence } = storeToRefs(useCommonStore());
const emit = defineEmits(["prevStep"])

function savePDF(){
  console.log("sequence", sequence.value);
	let tempArr = [];
	sequence.value.forEach((item,i)=>{
		const canvasEleURL = item.toDataURL();
		tempArr.push(canvasEleURL);
	})
	useCommonStore().updDownloadSequence(tempArr);

  router.push("/finish");
}
</script>
<template>
  <div class="confirmPdfPop">
    <div class="confirmPdfPop_blur"></div>
    <div class="confirmPdfPop_main">
      <h2 class="confirmPdfPop_main_title">請確認您的檔案</h2>
      <p class="confirmPdfPop_main_subtitle">確認後將無法修改</p>
      <button class="btn btn-primary" @click="savePDF">確認</button>
      <button class="btn btn-secondary" @click="emit('prevStep','-')">返回</button>
    </div>
  </div>
</template>
<style lang="css" scoped>
.confirmPdfPop{
  @apply
  flex
  justify-center
  items-center
  absolute
  inset-0
  w-full
  h-full;
  &_blur{
    @apply
    absolute
    bg-[rgba(11,125,119,0.1)]
    w-full
    h-full
    backdrop-blur;
  }
  &_main{
    @apply
    relative
    z-[10]
    bg-white
    w-[80%]
    p-8
    rounded-md
    text-center;
    &_title{
      @apply
      pb-2
      text-primary
      text-xl
      font-bold;
    }
    &_subtitle{
      @apply
      text-base
      pb-4
      text-gray-500;
    }
    .btn{
      @apply
      w-full
      py-2
      mb-2;
    }
  }
}
</style>