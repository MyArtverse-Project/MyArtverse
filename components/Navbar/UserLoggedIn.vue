<script setup></script>

<template>
  <div class="flex items-center gap-x-3">
    <NavbarButton class="aspect-square">
      <span class="sr-only">Options</span>
      <i class="fas fa-ellipsis-vertical fa-fw fa-xl"></i>
    </NavbarButton>
    <NavbarButton class="aspect-square">
      <span class="sr-only">Notifications</span>
      <i class="far fa-bell fa-fw fa-xl"></i>
    </NavbarButton>
    <button
      aria-label="Profile"
      class="grid w-12 h-12 overflow-hidden border rounded-full aspect-square place-items-center"
    >
      <span class="sr-only">Profile</span>
      <img
        src="https://res.cloudinary.com/skepfusky-dookie/image/upload/q_75/projects/misc/ozzy-fp-banner.png"
        alt="Profile"
      />
    </button>
  </div>
</template>
