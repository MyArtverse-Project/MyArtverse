<script lang="tsx" setup>
const username = ref("")
const password = ref("")
</script>

<template>
	<form class="form-container">
		<div class="field f-username">
			<label for="username" class="form-label">Username/Email</label>
			<input
				name="username"
				type="username"
				class="form-textbox"
				v-model="username"
				placeholder="Username"
			/>
		</div>
		<div class="field f-password">
			<label for="password" class="form-label">Password</label>
			<input
				name="password"
				class="form-textbox"
				type="password"
				placeholder="Password"
				v-model="password"
			/>
		</div>
		<NuxtLink to="#" class="forgot-pswd">Forgot password?</NuxtLink>
		<NuxtLink to="#" class="submit-button">Submit</NuxtLink>
	</form>
</template>

<style lang="scss" scoped>
.form-container {
	@apply grid w-3/6 h-1/6 place-items-center m-auto gap-y-1;
	grid-template-areas:
		"username username username username username"
		"password password password password password"
		"forgot-pswd . . . submit";
}

.f {
	&-username {
		grid-area: username;
	}
	&-password {
		grid-area: password;
	}
}

.forgot-pswd {
	grid-area: forgot-pswd;
  @apply py-3 flex w-full px-4;
}

.submit-button {
	grid-area: submit;
  @apply w-full py-3 bg-blue-400 flex px-4;
}

.field {
	@apply w-full flex flex-col relative pt-4;
}

.form-label {
	@apply absolute -top-4 text-zinc-500 font-inter uppercase font-bold opacity-75;
}

.form-textbox {
	@apply px-4 py-3 text-white border-none outline-none rounded-md bg-zinc-800;
}
</style>
