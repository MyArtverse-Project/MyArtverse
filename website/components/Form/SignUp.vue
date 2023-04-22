<script setup lang="ts">
const username = ref("")
const password = ref("")
const email = ref("")
const confirmPassword = ref("")
const birthday = ref("")

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const onSubmit = async () => {
	if (password.value !== confirmPassword.value) {
		alert("Passwords do not match.")
	}

	const { data } = await useAsyncQuery(REGISTER_USER, {
		username,
		password,
		email,
	})
}
</script>

<template>
	<form class="form-container">
		<div class="field-wrapper">
			<label
				for="username"
				:class="['form-label', username.length > 0 ? 'block' : 'invisible']"
				>Username</label
			>
			<input
				name="username"
				type="username"
				class="form-textbox"
				v-model="username"
				placeholder="Username"
			/>
		</div>
		<div :class="[email.length > 0 ? 'field-filled' : 'field']">
			<label
				for="email"
				:class="['form-label', email.length > 0 ? 'block' : 'opacity-5']"
				>Email</label
			>
			<input
				name="email"
				type="email"
				class="form-textbox"
				v-model="email"
				placeholder="Email"
			/>
		</div>
		<div :class="[password.length > 0 ? 'field-filled' : 'field']">
			<label
				for="password"
				:class="['form-label', password.length > 0 ? 'visible' : 'invisible']"
				class="form-label"
				>Password</label
			>
			<input
				name="password"
				class="form-textbox"
				type="password"
				placeholder="Password"
				v-model="password"
			/>
		</div>
		<div :class="[confirmPassword.length > 0 ? 'field-filled' : 'field']">
			<label
				for="confirmPassword"
				:class="[
					'form-label',
					confirmPassword.length > 0 ? 'block' : 'invisible',
				]"
				class="form-label"
				>Confirm Password</label
			>
			<input
				name="confirmPassword"
				class="form-textbox"
				type="password"
				placeholder="Confirm Password"
				v-model="confirmPassword"
			/>
		</div>
		<div :class="[confirmPassword.length > 0 ? 'field-filled' : 'field']">
			<label
				for="confirmPassword"
				:class="['form-label', birthday.length > 0 ? 'block' : 'invisible']"
				class="form-label"
				>Birthday</label
			>
			<input
				name="birthday"
				class="form-textbox"
				type="date"
				placeholder="Birthday"
				v-model="birthday"
			/>
		</div>
		<div class="grid items-center w-full gap-5 text-center">
			<BaseButton link="#" class="!block w-full">Create Account</BaseButton>
			<BaseButton to="/signup" class="!block w-full">Login</BaseButton>
		</div>
	</form>
</template>

<style lang="scss" scoped>
.form-container {
	@apply grid w-1/2 place-items-center m-auto gap-y-1;
}

.field {
	@apply w-full flex flex-col relative pt-6;
}

.form-label {
	@apply absolute -top-4 text-base-500 font-inter uppercase font-bold my-2;
}

.form-textbox {
	@apply px-4 py-3 text-white border-none outline-none rounded-md bg-base-800;
}
</style>
