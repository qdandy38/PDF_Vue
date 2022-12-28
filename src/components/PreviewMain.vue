<script setup>
import { ref, onMounted } from 'vue';
import { fabric } from 'fabric';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';
import * as pdfjsLib from "pdfjs-dist";
const emit = defineEmits(["addSign"]);
const { fileName, fileData, base64Prefix } = storeToRefs(useCommonStore());
const canvasDom = ref(null);
const nowPage = ref(1); 
const totalPages = ref(1);

async function printPDF(orderPage){
	pdfjsLib.GlobalWorkerOptions.workerSrc = await import('pdfjs-dist/build/pdf.worker.entry')
	// 將 base64 中的前綴刪去，並進行解碼
	const data = atob(fileData.value.substring(base64Prefix.value.length));

	// 利用解碼的檔案，載入 PDF 檔及第一頁
	const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
	const pdfPage = await pdfDoc.getPage(nowPage.value);
	totalPages.value = pdfDoc.numPages;
	console.log("pdfDoc", pdfDoc, pdfPage, pdfDoc.numPages);

	// 設定尺寸及產生 canvas
	const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");

	// 設定 PDF 所要顯示的寬高及渲染
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const renderContext = {
    canvasContext: context,
    viewport,
  };
	const renderTask = pdfPage.render(renderContext);
	// 回傳做好的 PDF canvas
  return renderTask.promise.then(() => canvas);
}

async function pdfToImage(pdfData){
	// 設定 PDF 轉為圖片時的比例
  const scale = 1 / window.devicePixelRatio;

	// 回傳圖片
  return new fabric.Image(pdfData, {
    id: "renderPDF",
    scaleX: scale,
    scaleY: scale,
  });
}

async function initCanvas(){
	const canvas = new fabric.Canvas(canvasDom.value);
	canvas.requestRenderAll();
	const pdfData = await printPDF();
	console.log("pdfData", pdfData);
	const pdfImage = await pdfToImage(pdfData);

	// 透過比例設定 canvas 尺寸
  canvas.setWidth(pdfImage.width / window.devicePixelRatio);
  canvas.setHeight(pdfImage.height / window.devicePixelRatio);

	// 將 PDF 畫面設定為背景
  canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
}

function goPage(targetPage){
	if(targetPage<1 || targetPage > totalPages.value) return;
	nowPage.value = targetPage;
	initCanvas();
}

onMounted(()=>{
	initCanvas();
})
</script>
<template>
	<div class="previewMain">
		<aside class="previewMain_aside"></aside>
		<div class="previewMain_pdfArea no-scrollbar">
			<canvas id="canvas" ref="canvasDom"></canvas>
			<div class="previewMain_pdfArea_pageController">
				<div class="previewMain_pdfArea_pageController_btnGroup">
					<div class="previewMain_pdfArea_pageController_btnGroup_btn" @click="goPage(nowPage-1)">
						<Icon name="arrow_left" />
					</div>
					<div class="previewMain_pdfArea_pageController_btnGroup_btn" @click="goPage(nowPage+1)">
						<Icon name="arrow_right" />
					</div>
				</div>
				<div class="previewMain_pdfArea_pageController_pageInfo">
					{{nowPage + "/" + totalPages + "頁"}}
				</div>
			</div>
		</div>
		<div class="previewMain_addSignArea">
			<button class="btn previewMain_addSignArea_btn mt-4" @click="emit('addSign')">
				<Icon name="add" />
				<span>加入簽名</span>
			</button>
			<button class="btn previewMain_addSignArea_btn">
				<Icon name="edit" />
				<span>加入文字</span>
			</button>
			<button class="btn previewMain_addSignArea_btn">
				<Icon name="calendar_today" />
				<span>加入日期</span>
			</button>
			<button class="btn btn-primary previewMain_addSignArea_btn mt-6">
				<span>下一步</span>
			</button>
			<button class="btn btn-secondary previewMain_addSignArea_btn">
				<span>上一步</span>
			</button>
		</div>
	</div>
</template>
<style lang="css" scoped>
.previewMain{
	@apply
	border-t
	border-solid
	border-gray-300
	h-[calc(100vh-192px)]
	overflow-hidden
	flex;
	&_aside{
		@apply
		block
		w-[72px]
		h-full
		bg-white;
	}
	&_pdfArea{
		@apply
		flex-1
		overflow-y-scroll
		overflow-x-hidden
		bg-gray-200
		w-auto
		relative;
		:deep(.canvas-container){
			@apply
			mx-auto !important;
		}
		&_pageController{
			@apply
			flex
			items-center
			fixed
			bottom-14
			left-20;
			&_btnGroup{
				@apply
				flex
				items-center
				mr-2.5;
				&_btn{
					@apply
					w-[48px]
					h-[48px]
					mx-0.5
					text-3xl
					flex
					justify-center
					items-center
					rounded-[4px]
					border
					border-solid
					border-gray-300
					bg-white
					cursor-pointer;
					&:hover{
						@apply
						bg-gray-100;
					}
				}
			}
			&_pageInfo{
				@apply
				py-2.5
				px-[30px]
				border
				border-solid
				border-gray-300
				bg-white
				rounded-[4px]
				text-base
				tracking-wider;
			}
		}
	}
	&_addSignArea{
		@apply
		w-[400px]
		h-full
		bg-white
		shadow-box
		p-4
		duration-500
		transform
		translate-x-0;
		&_btn{
			@apply
			h-10
			min-w-[40px]
			w-full
			py-4
			px-6
			mb-2;
			i{
				@apply
				text-2xl
				mr-2.5;
			}
		}
	}
}
</style>