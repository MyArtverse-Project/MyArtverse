<script setup lang="ts">
const username = ref("")
const password = ref("")
const email = ref("")
const confirmPassword = ref("")
const birthday = ref("")

const emailRegex =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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
	<form class="grid w-8/12 grid-cols-2 gap-3 lg:w-3/4 xl:w-4/6">
		<FormFieldContainer
			class="col-span-0"
			v-model="username"
			placeholder="Username"
			input-name="Username"
		/>
		<FormFieldContainer
			class="col-span-1"
			v-model="email"
			placeholder="Email"
			input-name="Email"
		/>
		<FormFieldContainer
			v-model="password"
			class="col-span-2"
			type="password"
			placeholder="Password"
			input-name="Password"
		/>
		<FormFieldContainer
			v-model="confirmPassword"
			class="col-span-2"
			type="password"
			placeholder="Confirm Password"
			input-name="Confirm Password"
		/>
		<FormFieldContainer
			v-model="birthday"
			class="col-span-2"
			type="date"
			input-name="Date of Birth"
		/>
		<div class="grid items-center w-full col-span-2 gap-5 text-center">
			<BaseButton link="#" class="!block w-full">Create Account</BaseButton>
			<BaseButton to="/signup" class="!block w-full">Login</BaseButton>
		</div>
	</form>
</template>
