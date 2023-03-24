<script setup>
import { ref, onMounted, inject } from 'vue';
import { fabric } from 'fabric';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';
import * as pdfjsLib from "pdfjs-dist";
import useCanvas from "../use/useCanvas.js";
import ConfirmPdfPop from "../components/ConfirmPdfPop.vue"
import router from "../router";
const { sequence } = storeToRefs(useCommonStore());
const emit = defineEmits(["addSign","updStep"]);
const props = defineProps({
	nowPage: Number,
	totalPages: Number,
	goPage: Function,
});
const canvasDom = inject("canvasDom");
const isConfirmPop = ref(false);
const isAsideOpen = ref(false);
// function save(){
// 	console.log("sequence", sequence.value);
// 	let tempArr = [];
// 	sequence.value.forEach((item,i)=>{
// 		const canvasEleURL = item.toDataURL();
// 		tempArr.push(canvasEleURL);
// 	})
// 	useCommonStore().updDownloadSequence(tempArr);
// }
function updStep(type){
	emit("updStep", type);
	isConfirmPop.value = !isConfirmPop.value;
}
function goNextPage(){
	updStep('+');
	// save();
}
function toIndex(){
	router.push("/");
}
function toggleAside(){
	isAsideOpen.value = !isAsideOpen.value; 
}
onMounted(()=>{
	console.log('test');
	// initCanvas();
})
</script>
<template>
	<div class="previewMain">
		<aside class="previewMain_aside"></aside>
		<div class="previewMain_pdfArea no-scrollbar">
			<template v-for="order in totalPages" :key="order">
				<div :class="{'hidden': nowPage!==order }">
					<canvas ref="canvasDom" :id="'canvasPDF_'+order"></canvas>
				</div>
			</template>
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
		<div :class="['previewMain_addSignArea',{'open': isAsideOpen}]">
			<div class="previewMain_addSignArea_mobileBtn" @click="toggleAside">
				<Icon :name="isAsideOpen?'arrow_left':'arrow_right'" />
			</div>
			<button class="btn previewMain_addSignArea_btn mt-4" @click="emit('addSign')">
				<Icon name="add" />
				<span>加入簽名</span>
			</button>
			<button class="btn previewMain_addSignArea_btn disable">
				<Icon name="edit" />
				<span>加入文字</span>
			</button>
			<button class="btn previewMain_addSignArea_btn disable">
				<Icon name="calendar_today" />
				<span>加入日期</span>
			</button>
			<button class="btn btn-primary previewMain_addSignArea_btn mt-6" @click="updStep('+')">
				<span>下一步</span>
			</button>
			<button class="btn btn-secondary previewMain_addSignArea_btn" @click="toIndex">
				<span>上一步</span>
			</button>
			<ConfirmPdfPop v-if="isConfirmPop" @prevStep="updStep" />
		</div>
	</div>
</template>
<style lang="css" scoped>
.previewMain{
	@apply
	relative
	border-t
	border-solid
	border-gray-300
	h-[calc(100vh-192px)]
	overflow-hidden
	flex;
	&_aside{
		@apply
		w-[72px]
		h-full
		bg-white
		hidden
		lg:block;
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
		absolute
		w-[95%]
		pl-[60px]
		h-full
		bg-white
		shadow-box
		duration-500
		transform
		translate-x-0
		sm:translate-x-[95%]
		lg:relative
		lg:w-[400px]
		lg:translate-x-0
		lg:p-4;
		&.open{
			@apply
			sm:translate-x-[5%];
		}
		&_mobileBtn{
			@apply
			absolute
			flex
			justify-center
			items-center
			left-0
			h-full
			shadow-box
			cursor-pointer
			lg:hidden;
			i{
				@apply
				text-5xl
			}
		}
		&_btn{
			@apply
			h-10
			min-w-[40px]
			py-4
			px-6
			mb-2
			mx-auto
			w-[85%]
			lg:w-full;
			&.disable{
				@apply
				bg-gray-100
				text-gray-300
				cursor-default
			}
			i{
				@apply
				text-2xl
				mr-2.5;
			}
		}
	}
}
</style>