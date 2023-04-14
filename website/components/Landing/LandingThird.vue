<script setup lang="ts">
const gridItems = [
	{
		heading: "A separate and unique profile for each of your own characters",
		description:
			"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
	{
		heading: "Manage and share your ref sheets easily",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in sapien dictum, maximus mi et, convallis dui. In vitae cursus elit.",
	},
	{
		heading: "Organize your commissions and photos",
		description:
			"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		heading: "Change profile type",
		description:
			"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
]

const cardContainer = ref<HTMLDivElement>()
const cards = ref<HTMLDivElement[]>()

onMounted(() => {
	const container = cardContainer.value!

	container.onmouseenter = () => {
		container.classList.add("hover")
	}

	container.onmouseleave = () => {
		container.classList.remove("hover")
	}

	container.onmousemove = ({ clientX, clientY }: MouseEvent) => {
		for (const item of cards.value!) {
			const rekt = item.getBoundingClientRect()
			const posX = clientX - rekt.left
			const posY = clientY - rekt.top

			item.style.setProperty("--pos-x", `${posX}px`)
			item.style.setProperty("--pos-y", `${posY}px`)
		}
	}
})
</script>

<template>
	<section class="px-12">
		<h1 class="my-6 mt-[6.5rem] text-5xl font-bold text-center font-inter">
			You're in control
		</h1>
		<div ref="cardContainer" class="card-container">
			<div
				ref="cards"
				class="card-item"
				v-for="(item, index) in gridItems"
				:key="index"
			>
				<div id="card-contents">
					<div class="border h-[14rem] rounded-md border-dashed"></div>
					<article>
						<h2 class="my-3 text-3xl font-bold font-inter">
							{{ item.heading }}
						</h2>
						<p>{{ item.description }}</p>
					</article>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.card {
	&-container {
		@apply my-16 grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto max-w-[1440px];

		&.hover > .card-item::before {
			opacity: 1;
		}

		> .card-item::before {
			opacity: 0;
		}
	}

	&-item {
		@apply rounded-md relative;
		background: rgba(51, 3, 106, 0.5);
		height: 30rem;

		&::before {
			content: "";
			@apply w-full h-full absolute inset-0 z-[0];
			border-radius: inherit;
			transition: opacity 300ms ease;
			background: radial-gradient(
				600px circle at var(--pos-x) var(--pos-y),
				rgb(211, 100, 254),
				#0000 75%
			);
		}
	}
}

#card-contents {
	@apply bg-base-900 p-5 absolute inset-0.5 bottom-10 z-[1] m-[0.01rem];
	height: 99.125%;
	border-radius: inherit;
}
</style>
