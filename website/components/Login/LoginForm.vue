<script lang="tsx" setup>
const username = ref("")
const password = ref("")
</script>

<template>
  <div>

  </div>
	<form class="form-container">
		<div class="field">
			<label for="username" class="form-label">Username</label>
			<input
				name="username"
				type="username"
				class="form-textbox"
				v-model="username"
				placeholder="Username"
			/>
		</div>
		<div
			class="field"
		>
			<label for="password" class="form-label">Password</label>
			<input
				name="password"
				class="form-textbox"
				type="password"
				placeholder="Password"
				v-model="password"
			/>
		</div>
	</form>
</template>

<style lang="scss" scoped>
.form-container {
  @apply flex flex-col justify-center w-3/6 h-screen m-auto gap-y-3;
}

.field {
  @apply flex flex-col relative py-4;
}

.form-label {
  @apply absolute -top-4 text-white font-inter uppercase font-bold;
}

.form-textbox {
	@apply px-3 py-2 text-black border-none outline-none rounded-md bg-zinc-800;
}

</style>
