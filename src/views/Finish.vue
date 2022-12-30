<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue"
import { ref, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';
import { jsPDF } from "jspdf";
import router from "../router";

const pdf = new jsPDF(); 
const { fileName, downloadSequence, sequence } = storeToRefs(useCommonStore());

function downloadPDF(){
  console.log("finish", downloadSequence.value);
  downloadSequence.value.forEach((doc,i)=>{
    const width = pdf.internal.pageSize.width;
    const height = pdf.internal.pageSize.height;
    pdf.addImage(doc, "png", 0, 0, width, height);
    if (i !== downloadSequence.value.length - 1) {
      pdf.addPage();
    }
  })
  pdf.save(fileName.value ?? "download.pdf");
}
function goIndex(){
  router.push("/");
}


onMounted(()=>{
})
</script>
<template>
  <div class="finish">
		<Header />
    <div class="finish_main">
      <img src="/images/finish.png" />
      <div class="finish_main_context">
        <h3>恭喜您！檔案已就緒</h3>
        <p>現在您可以下載檔案或或重新上傳檔案。</p>
        <button class="btn btn-primary" @click="downloadPDF">下載檔案</button>
        <button class="btn btn-none" @click="goIndex">重新上傳</button>
      </div>
    </div>
		<Footer />
  </div>
</template>
<style lang="css" scoped>
.finish{
  &_main{
    @apply
		pt-5
		min-h-[calc(100vh-120px)]
    bg-[rgba(206,229,228,0.2)]
    flex
    justify-center
    items-center
    flex-col
    lg:flex-row;
    img{
      @apply
      max-w-[300px];
    }
    h3{
      @apply
      text-2xl
      font-bold
      text-primary
      mb-2;
    }
    p{
      @apply
      pb-10
      text-gray-400;
    }
    .btn{
      @apply
      w-full
      py-2
    }
  }
}
</style>