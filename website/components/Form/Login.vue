<script setup lang="ts">
const username = ref("")
const password = ref("")
const  onSubmit = async () => {
	await useAsyncQuery(
		gql`
		mutation LoginUser($username: String!, $password: String!) {
			login($username: username, $password: password) {
				id
			}
		}
	`,
		{ login: username.value, password: password.value }
	)
		.then((data) => console.log(data))
		.catch((e) => console.log(e))
}
</script>

<template>
	<form class="grid w-4/12 gap-3" @submit.prevent="onSubmit">
		<FormFieldContainer
			v-model="username"
			input-name="Username"
			placeholder="Username"
			type="email"
			required
		/>
		<FormFieldContainer
			v-model="password"
			input-name="Password"
			placeholder="Password"
			type="password"
			required
		/>
		<div class="flex flex-col items-center w-full gap-4 text-center">
			<BaseButton type="submit" link="#" class="w-full">Login</BaseButton>
			<BaseButton type="button" link="/signup" class="w-full"
				>Sign Up</BaseButton
			>
		</div>
	</form>
</template>
