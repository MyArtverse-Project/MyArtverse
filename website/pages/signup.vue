<script setup lang="ts">
usePageMeta({
	title: "Sign Up",
})
</script>

<template>
	<div class="grid h-screen place-items-center">
		<FormSignUp />
	</div>
</template>

<style lang="scss">
.login-wrapper {
	@apply grid place-items-center h-screen;
}
</style>
