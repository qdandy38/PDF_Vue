<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue"
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';

const { fileName } = storeToRefs(useCommonStore());
const tmpFileName = ref(fileName.value || "");
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
		Preview
		<Icon name="keyboard_arrow_right" />
	</div>
</template>
<style lang="css" scoped>
	
</style>