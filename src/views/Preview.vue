<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue"
import PreviewMain from "../components/PreviewMain.vue"
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';

const { fileName } = storeToRefs(useCommonStore());
const tmpFileName = ref(fileName.value || "");
const nowStep = ref(2);
const stepList = ref([
	{
		step:1,
		title:"上傳檔案"
	},
	{
		step:2,
		title:"加入簽名檔"
	},
	{
		step:3,
		title:"確認檔案"
	},
	{
		step:4,
		title:"下載檔案"
	},
]);
function editFileName(){
	console.log("editFileName");
}
onMounted(()=>{
	// console.log("file", file.value);
})
</script>
<template>
	<div class="preview">
		<Header :isPreview="true" :fileName="tmpFileName" @headerFun="editFileName" />
		<div class="preview_bar">
			<div v-for="(item,i) in stepList" :key="i" class="preview_bar_step">
				<span :class="['preview_bar_step_nth',{'nowStep': item.step === nowStep},{'noComplete': item.step > nowStep}]">
					<Icon v-if="item.step<nowStep" name="check" />
					<template v-else>{{ item.step }}</template>
				</span>
				<span class="preview_bar_step_title">{{ item.title }}</span>
				<div v-if="item.step!==stepList.length" class="preview_bar_step_line"></div>
			</div>
		</div>
		<PreviewMain />
		<!-- <div class="preview_main">
			Preview
		</div> -->
		<Footer />
	</div>
</template>
<style lang="css" scoped>
.preview{
	&_bar{
		@apply
		flex
		justify-center
		items-center
		py-4
		bg-white;
		&_step{
			@apply
			flex
			justify-between
			items-center;
			&_nth{
				@apply
				w-[40px]
				h-[40px]
				font-bold
				text-base
				border-[2px]
				border-solid
				bg-primary
				text-white
				border-primary
				
				rounded-[50%]
				flex
				justify-center
				items-center;
				&.noComplete{
					@apply
					bg-transparent
					border-gray-300
					text-gray-400
				}
				&.nowStep{
					@apply
					relative;
					&::after{
						@apply
						content-[""]
						absolute
						w-[48px]
						h-[48px]
						border-[2px]
						border-solid
						border-primary
						rounded-[50%]
						opacity-30
					}
				}
			}
			&_title{
				@apply
				text-gray-400
				font-bold
				px-2;
			}
			&_line{
				@apply
				w-[60px]
				h-[2px]
				bg-gray-200
				mr-4;
			}
		}
	}
}
</style>