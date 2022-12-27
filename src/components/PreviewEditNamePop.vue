<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';
const emit = defineEmits(["close"]);

const { fileName } = storeToRefs(useCommonStore());
const tmpFileName = ref(fileName.value || "");
function confirm() {
	console.log(tmpFileName.value);
	useCommonStore().updFileName(tmpFileName.value);
	emit("close");
}
</script>
<template>
	<div class="popup" @click.self="emit('close')">
		<div class="popup_main">
			<Icon class="popup_main_close" name="close" @click="emit('close')" />
			<p class="popup_main_header">重新命名檔案</p>
			<div class="popup_main_body">
				<input type="text" maxlength="50" placeholder="請輸入檔案名稱" class="inputText" v-model.trim="tmpFileName">
			</div>
			<div class="popup_main_footer">
				<button class="btn btn-primary confirm" @click="confirm">儲存</button>
			</div>
		</div>
	</div>
</template>
<style lang="css" scoped>
.popup{
	&_main{
		@apply
		w-[300px];
		&_body{
			.inputText{
				@apply
				w-full
				mt-2.5
				text-lg
				border
				border-solid
				border-gray-200
				px-4
				text-gray-400;
				&::placeholder{
					@apply
					text-gray-400;
				}
			}
		}
	}
}
</style>