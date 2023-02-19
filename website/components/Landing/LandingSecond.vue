<script setup lang="ts">
import gsap from "gsap"
import { secondSectImages } from "./Images"

const ctx = ref()
const animationRoot = ref<HTMLElement>()

onMounted(() => {
	ctx.value = gsap.context((self) => {}, animationRoot.value)
})

onUnmounted(() => ctx.value.revert())
</script>

<template>
	<section class="h-[90vh] grid place-items-center">
		<article class="px-8 relative z-[2] text-center flex flex-col items-center">
			<h2 class="my-6 text-5xl font-bold font-inter">
				Keep 'em all in one place
			</h2>
			<p class="w-2/4 text-xl 2xl:w-2/3">
				If you have multiple characters, you can have them all in one account
				and you're free to change them as you wish!
			</p>
		</article>
		<div aria-hidden id="box-animation" ref="animationRoot">
			<div class="mf-box">
				<IconMono class="w-[8rem] h-[8rem] text-white" />
			</div>
			<NuxtImg
				class="character-item"
				sizes="md:150px lg:250px"
				alt=""
				v-for="item in secondSectImages"
				:src="`/images/hero/${item.file}`"
				:style="{
					bottom: item?.bottom ?? undefined,
					left: item?.left ?? undefined,
					top: item?.top ?? undefined,
					right: item?.right ?? undefined,
				}"
			/>
		</div>
	</section>
</template>

<style lang="scss" scoped>
#box-animation {
	@apply relative w-full h-full flex items-center;
}

.character-item {
	@apply absolute rounded-xl w-[150px] lg:w-[255px];
}

.mf-box {
	@apply flex justify-center items-center mx-auto w-[12rem] h-[12rem] rounded-xl bg-base-600;
}
</style>
