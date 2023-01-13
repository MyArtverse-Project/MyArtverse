<script setup>
</script>

<template>
	<div class="flex gap-x-3 items-center">
		<NavbarButton class="aspect-square rounded-full">
			<span class="sr-only">Options</span>
			<i class="fas fa-ellipsis-vertical fa-fw fa-lg"></i>
		</NavbarButton>
		<NavbarButton class="aspect-square rounded-full">
			<span class="sr-only">Notifications</span>
			<i class="far fa-bell fa-fw fa-lg"></i>
		</NavbarButton>
		<button aria-label="Profile"
			class="aspect-square rounded-full border w-14 h-14 overflow-hidden grid place-items-center">
			<span class="sr-only">Profile</span>
			<img src="https://res.cloudinary.com/skepfusky-dookie/image/upload/q_75/projects/ozzychill/ozzyuwu.png"
				alt="Profile">
		</button>
	</div>
</template>