<script setup lang="ts">
const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY < 10 ? false : true
}

onBeforeMount(() => window.addEventListener("scroll", handleScroll))
onMounted(() => window.addEventListener("scroll", handleScroll))
onUnmounted(() => window.removeEventListener("scroll", handleScroll))
</script>

<template>
  <header :class="['navbar-sticky', isScrolled ? 'scrolled' : '']">
    <nav class="flex items-center justify-between px-8 py-4">
      <div class="left-side">
        <NuxtLink to="/" class="logo">
          <div role="img" aria-label="MyFursona" class="flex items-center gap-x-2.5">
            <IconMono class="w-[3.25rem] h-[3.25rem] text-white" />
            <span>MyFursona</span>
          </div>
        </NuxtLink>
      </div>
      <ul class="right-side">
        <li>
          <NuxtLink to="/upload">Upload</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">About</NuxtLink>
        </li>
        <li class="font-inter">
          <NuxtLink to="/login" class="px-5 py-2.5 rounded-3xl hover:bg-purple-700 border-zinc-200 border font-bold">
            Sign In
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
.navbar-sticky {
  @apply fixed top-0 left-0 right-0 z-[9999] border-0 border-b border-transparent;
  transition-property: backdrop-filter, background, border;
  transition-duration: 300ms;

  &.scrolled {
    @apply backdrop-blur-md border-zinc-500;
    background-color: rgba(24, 5, 72, 0.775);
  }
}

.left-side {
  @apply flex items-center;
}

.right-side {
  @apply flex items-center gap-x-10;
}

.logo {
  @apply text-3xl font-bold text-white select-none font-inter;
}
</style>
