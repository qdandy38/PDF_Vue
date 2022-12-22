<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue"
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';

const { fileName } = storeToRefs(useCommonStore());
onMounted(()=>{
	// console.log("file", file.value);
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