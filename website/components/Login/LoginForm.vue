<script lang="tsx" setup>
const username = ref("")
const password = ref("")
</script>

<template>
	<form class="form-container">
		<div class="field">
			<label
				for="username"
				:class="['form-label', username.length > 0 ? 'block' : 'invisible']"
				>Username/Email</label
			>
			<input
				name="username"
				type="username"
				class="form-textbox"
				v-model="username"
				placeholder="Username/Email"
			/>
		</div>
		<div class="field">
			<label for="password" class="form-label">Password</label>
			<input
				name="password"
				class="form-textbox"
				type="password"
				placeholder="Password"
				v-model="password"
			/>
			<NuxtLink to="#">Forgot password?</NuxtLink>
		</div>
		<div class="flex flex-col items-center w-full text-center buttons">
			<NuxtLink to="#" class="submit-button">Submit</NuxtLink>
		</div>
	</form>
</template>

<style lang="scss" scoped>
.form-container {
	@apply grid w-1/2 place-items-center m-auto gap-y-1;
}

.submit-button {
	@apply w-full py-3 hover:bg-blue-600 flex px-4 text-center rounded-3xl border border-base-200 justify-center font-inter font-semibold;
}

.field {
	@apply w-full flex flex-col relative py-6;
}

.form-label {
	@apply absolute -top-4 text-base-500 font-inter uppercase font-bold opacity-75;
}

.form-textbox {
	@apply px-4 py-3 text-white border-none outline-none rounded-md bg-base-800;
}
</style>
