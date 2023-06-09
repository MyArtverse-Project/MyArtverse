<script setup lang="ts">
usePageMeta({
	title: "Login",
	description: "Sign in to MyFursona",
})

const username = ref("")
const password = ref("")
const onSubmit = async () => {
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
	<div class="flex flex-col items-center justify-center h-screen gap-y-5">
		<h2 class="mb-6 text-5xl font-bold text-center font-inter">
			Welcome back!
		</h2>
		<form class="grid w-8/12 gap-3" @submit.prevent="onSubmit">
			<FieldContainer
				v-model="username"
				input-name="Username"
				placeholder="Username"
				type="email"
				required
			/>
			<FieldContainer
				v-model="password"
				input-name="Password"
				placeholder="Password"
				type="password"
				required
			/>
			<div class="flex flex-col items-center w-full gap-4 text-center">
				<Button type="submit" link="#" class="w-full">Login</Button>
				<Button link="/register" class="w-full">Sign Up</Button>
			</div>
		</form>
	</div>
</template>
