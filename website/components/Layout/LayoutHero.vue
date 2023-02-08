<script setup lang="ts">
</script>

<template>
	<div class="bg-slate-800 h-screen">
		<ClientOnly>
			<Lottie
				animationLink="/lottie-ae/myfursona-hero.json"
				:height="500"
				:width="500"
        :loop="false"
        :delay="800"
			/>
		</ClientOnly>
	</div>
</template>
