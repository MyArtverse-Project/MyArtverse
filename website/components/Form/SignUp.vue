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
		return
	}
	alert("E")
	await useAsyncQuery(
		gql`
			mutation RegisterUser(
				$username: String!
				$email: String!
				$password: String!
				$age: Int!
			) {
				register(
					username: $username
					email: $email
					password: $password
					age: $age
				) {
					id
				}
			}
		`,
		{
			username: username.value,
			password: password.value,
			email: email.value,
			age: 18,
		}
	)
		.then((data) => alert(data.data))
		.catch((d) => alert(`An Error Occur XwX: ${d}`))
	return
}
</script>

<template>
	<form
		class="grid w-8/12 grid-flow-row grid-cols-2 gap-3 lg:w-3/6 xl:w-1/2 place-self-center"
		@submit.prevent="onSubmit"
	>
		<FormFieldContainer
			class="col-span-2 md:col-span-1"
			v-model="username"
			placeholder="Username"
			input-name="Username"
		/>
		<FormFieldContainer
			class="col-span-2 md:col-span-1"
			v-model="email"
			placeholder="Email"
			input-name="Email"
		/>
		<FormFieldContainer
			v-model="password"
			class="col-span-2 md:col-span-1"
			type="password"
			placeholder="Password"
			input-name="Password"
		/>
		<FormFieldContainer
			v-model="confirmPassword"
			class="col-span-2 md:col-span-1"
			type="password"
			placeholder="Confirm Password"
			input-name="Confirm Password"
		/>
		<FormFieldContainer class="col-span-2" type="checkbox" />
		<FormFieldContainer
			v-model="birthday"
			class="col-span-2"
			type="date"
			input-name="Date of Birth"
		/>
		<div class="grid items-center w-full col-span-2 gap-5 text-center">
			<div>Some captcha stuff here</div>
			<BaseButton type="submit" class="w-full mx-auto md:w-8/12"
				>Create account</BaseButton
			>
			<p class="text-[var(--global--subtext)] w-8/12 italic mx-auto">
				By creating an account, you adhere to the Privacy Policy and the Terms
				of Service.
			</p>
		</div>
	</form>
</template>
