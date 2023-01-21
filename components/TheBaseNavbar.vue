<template>
  <header>
    <div class="flex items-center justify-between py-6 px-9">
      <div class="flex items-center gap-x-6">
        <NuxtLink to="/" class="flex items-center gap-x-2.5 logo-wordmark">
          <span class="sr-only">MyFursona</span>
          <IconMono class="w-[3.25rem] h-[3.25rem] text-purple-500"/>
          <span>MyFursona</span>
        </NuxtLink>
        <NavbarSearchBox />
      </div>
      <NavbarUserLoggedIn />
    </div>
  </header>
</template>

<style lang="scss">
.logo-wordmark {
  @apply text-3xl font-bold font-inter select-none
	bg-gradient-to-br from-orange-500 via-purple-500 to-pink-400 bg-clip-text text-transparent;
}
</style>
