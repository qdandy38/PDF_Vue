<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue"
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';

const { file } = storeToRefs(useCommonStore());
const fileName = ref(file.value[0].name || "");
onMounted(()=>{
	console.log("file", file.value);
})
</script>
<template>
	<div class="preview">
		<Header :isPreview="true" :fileName="fileName" />
		Preview
	</div>
</template>
<style lang="css" scoped>
	
</style>