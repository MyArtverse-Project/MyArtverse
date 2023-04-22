<script setup lang="ts">
usePageMeta({
	title: "Login",
	description: "Sign in to MyFursona",
})
</script>

<template>
	<div class="flex flex-col items-center justify-center h-screen gap-y-5">
		<h2 class="mb-6 text-5xl font-bold text-center font-inter">
			Welcome back!
		</h2>
		<FormLogin />
	</div>
</template>
