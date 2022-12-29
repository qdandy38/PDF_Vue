<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue"
import { ref, onMounted } from "vue";
import { useCommonStore } from "../store";
import router from "../router";
const fileDom = ref(null);
function uploadEvent(){
	fileDom.value.dispatchEvent(new MouseEvent("click"))
}
function upload(e){
	const file = e.target.files || e.dataTransfer.files;
	if(!file[0]){return;}
	const fileReader = new FileReader();
	fileReader.readAsDataURL(file[0]);
	fileReader.onload = pdfFile => {
		useCommonStore().updFileName(file[0].name)
		useCommonStore().updFileData(pdfFile.target.result)
		router.push("/preview")
	}
	// useCommonStore().updFile(file);
}
function drop(e){
	upload(e);
}

onMounted(()=>{
	useCommonStore().resetAll();
})
</script>
<template>
	<div class="pdfUpload">
		<Header />
		<div class="pdfUpload_main">
			<div class="pdfUpload_main_uploadArea"
				@click="uploadEvent"
				@drop.prevent="drop"
				@dragover.prevent
			>
				<label for="file">
					<input type="file" name="file" class="hidden" ref="fileDom" @change="upload">
					<div class="pdfUpload_main_uploadArea_container">
						<img src="/images/add_file.png" />
						<span>將檔案拖曳至這裡</span>
						<button class="btn btn-primary uploadBtn">選擇檔案</button>
						<p>檔案大小10MB以內，檔案格式為PDF</p>
					</div>
				</label>
			</div>
			<div class="pdfUpload_main_intro">
				<h2 class="pdfUpload_main_intro_title">輕鬆幾步驟，完成您的簽署</h2>
				<ul class="pdfUpload_main_intro_list">
					<li>
						<span class="pdfUpload_main_intro_list_nth">1</span>
						<h4 class="pdfUpload_main_intro_list_title">上傳檔案</h4>
						<p class="pdfUpload_main_intro_list_content">選擇PDF檔或是IMG檔</p>
						<img src="/images/intro1.png" />
					</li>
					<li>
						<span class="pdfUpload_main_intro_list_nth">2</span>
						<h4 class="pdfUpload_main_intro_list_title">加入簽名檔</h4>
						<p class="pdfUpload_main_intro_list_content">手寫、輸入或是上傳簽名檔</p>
						<img src="/images/intro2.png" />
					</li>
					<li>
						<span class="pdfUpload_main_intro_list_nth">3</span>
						<h4 class="pdfUpload_main_intro_list_title">下載與傳送</h4>
						<p class="pdfUpload_main_intro_list_content">完成簽署可立即傳送檔案給對方</p>
						<img src="/images/intro3.png" />
					</li>
				</ul>
			</div>
		</div>
		<Footer />
	</div>
</template>
<style lang="css" scoped>
.pdfUpload{
	&_main{
		@apply
		pt-5
		w-[90%]
		min-h-[calc(100vh-120px)]
		mx-auto;
		&_uploadArea{
			@apply
			my-5
			w-full
			h-[40vh]
			border-[2px]
			border-dashed
			border-primary
			bg-secondary
			flex
			justify-center
			items-center;
			&_container{
				@apply
				flex
				flex-col
				items-center;
				span{
					@apply
					text-sm;
				}
				p{
					@apply
					text-sm
					font-bold
					text-primary
					pt-2
				}
				.uploadBtn{
					@apply
					mt-4
					min-w-[200px] 
					py-4
					px-7;
				}
			}
		}
		&_intro{
			@apply
			py-5
			w-full;
			&_title{
				@apply
				text-gray-400
				text-2xl
				font-bold
				text-center;
			}
			&_list{
				@apply
				py-5
				flex
				justify-evenly;
				li{
					@apply
					flex
					flex-col
					items-center;
				}
				&_nth{
					@apply
					w-[40px]
					h-[40px]
					font-bold
					text-primary
					text-base
					border-[2px]
					border-solid
					border-primary
					rounded-[50%]
					flex
					justify-center
					items-center;
				}
				&_title{
					@apply
					py-2.5
					font-bold
					text-base
					text-gray-500;
				}
				&_content{
					@apply
					text-sm
					text-gray-500;
				}
			}
		}
	}
}
</style>