<template>
	<footer>
		<div
			class="mt-[2rem] flex justify-between px-10 py-6 mx-auto max-w-screen-2xl"
		>
			<span id="copyright" class="text-sm">
				Copyright &copy; 2022-{{ new Date().getFullYear() }} MyFursona
			</span>
			<div class="flex items-center gap-x-5">
				<NuxtLink to="/contact">Contact</NuxtLink>
				<NuxtLink
					to="https://github.com/MyFursona-Project/MyFursona"
					rel="noopener noreferrer"
					target="_blank"
				>
					<i class="fab fa-github fa-fw fa-lg"></i>
				</NuxtLink>
			</div>
		</div>
	</footer>
</template>
