<script setup>
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
			<img src="/images/logo.jpg" class="header_logo" />
			<h2 class="header_title">快速省時的電子簽署工具</h2>
		</template>
		<div v-else class="header_preview">
			<p>{{ fileName }}</p>
		</div>
	</header>
</template>
<style lang="css" scoped>
.header{
	@apply
	h-[80px]
	px-[5%]
	flex
	justify-between
	items-center
	border-b
	border-solid
	border-gray-300;
	&::after{
		@apply
		content-[""]
		w-[96px];
	}
	&_logo{
		@apply
		w-[96px];
	}
	&_title{
		@apply
		text-2xl
		font-bold
		text-gray-400;
	}
	&_preview{
		@apply
		text-sm
		font-bold
		text-gray-400;
	}
}
</style>
