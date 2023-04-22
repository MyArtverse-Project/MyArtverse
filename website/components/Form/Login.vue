<script setup lang="ts">
const username = ref("")
const password = ref("")
</script>

<template>
	<form class="grid w-1/2 gap-3">
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
			<BaseButton link="#" class="w-full">Login</BaseButton>
			<BaseButton link="/signup" class="w-full">Sign Up</BaseButton>
		</div>
	</form>
</template>