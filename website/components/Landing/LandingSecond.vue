<script setup lang="ts">
import gsap from "gsap"

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
			<h1 class="my-6 text-5xl font-bold font-inter">
				Keep 'em all in one place
			</h1>
			<p class="w-2/4 text-xl 2xl:w-2/3">
				If you have multiple characters, you can have them all in one account
				and you're free to change them as you wish!
			</p>
		</article>
    <div id="box-animation" ref="animationRoot">
      <div class="sonas-box">
        <IconMono class="w-[8rem] h-[8rem] text-white" />
      </div>
    </div>
	</section>
</template>

<style lang="scss">
.sonas-box {
	@apply flex justify-center items-center mx-auto w-[12rem] h-[12rem] rounded-xl bg-orange-400;
}
</style>
