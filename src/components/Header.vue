<script setup>
import router from "../router";
const emit = defineEmits(["headerFun"]);
const props = defineProps({
	isPreview:{
		type: Boolean,
		default: false
	},
	fileName: String
});
</script>
<template>
	<header class="header">
		<template v-if="!isPreview">
			<img src="/images/logo.jpg" class="header_logo" @click="router.push('/')" />
			<h2 class="header_title">快速省時的電子簽署工具</h2>
		</template>
		<div v-else class="header_preview">
			<p>{{ fileName }}</p>
			<Icon name="edit" @click="emit('headerFun')" />
		</div>
	</header>
</template>
<style lang="css" scoped>
.header{
	@apply
	bg-white
	h-[80px]
	px-[5%]
	flex
	justify-center
	items-center
	border-b
	border-solid
	border-gray-300
	lg:justify-between;
	&::after{
		@apply
		content-[""]
		w-[96px]
		hidden
		lg:block;
	}
	&_logo{
		@apply
		w-[96px]
		cursor-pointer;
	}
	&_title{
		@apply
		text-2xl
		font-bold
		text-gray-400
		hidden
		lg:block;
	}
	&_preview{
		@apply
		flex
		items-center
		font-bold
		text-gray-400;
		p{
			@apply
			pl-2;
		}
		i{
			@apply
			cursor-pointer
			px-2
			text-xl;
		}
	}
}
</style>
