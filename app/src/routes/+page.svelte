<script lang="ts">
	import Chapter1 from '$lib/chapters/Chapter1.svelte';
	import Chapter2 from '$lib/chapters/Chapter2.svelte';
	import Chapter3 from '$lib/chapters/Chapter3.svelte';
	import Chapter4 from '$lib/chapters/Chapter4.svelte';
	import Chapter5 from '$lib/chapters/Chapter5.svelte';
	import TimelineHud from '$lib/components/TimelineHud.svelte';
	import SourcesSection from '$lib/components/SourcesSection.svelte';
</script>

<svelte:head>
	<title>When the Lake Ran Dry — Zambia's 2024 drought</title>
</svelte:head>

<TimelineHud />

<main>
	<section class="hero">
		<p class="eyebrow">Zambia · 2024</p>
		<h1>The year the lake — <em>and the lights</em> — ran dry.</h1>
		<p class="standfirst">
			An El&nbsp;Niño drought drained Lake Kariba — the source of over 80% of Zambia's electricity —
			to record lows, and the country fell dark. But the people the grid never reached paid the
			most. Scroll through 2024 and watch the water, the light, and the harvest fall together.
		</p>
		<p class="scrollcue" aria-hidden="true">Scroll to begin ↓</p>
	</section>

	<Chapter1 />
	<Chapter2 />
	<Chapter3 />
	<Chapter4 />
	<Chapter5 />

	<SourcesSection />

	<footer>
		<p>
			<b>When the Lake Ran Dry.</b> An independent piece of data journalism about Zambia's 2024 drought.
		</p>
		<p class="muted">
			Built with SvelteKit, D3 and Scrollama. All data pre-processed offline; no live API calls at
			runtime. <a href="#sources">Sources &amp; method ↑</a>
		</p>
	</footer>
</main>

<style>
	main {
		width: 100%;
		overflow-x: clip;
	}

	.hero {
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1.1rem;
		max-width: 940px;
		margin: 0 auto;
		padding: 2rem 1.6rem;
	}
	h1 {
		font-weight: 300;
		font-size: clamp(2.2rem, 6.5vw, 4.4rem);
		line-height: 1.02;
		letter-spacing: -0.01em;
	}
	h1 em {
		font-style: italic;
		color: var(--bone);
	}
	.standfirst {
		font-family: var(--font-ui);
		font-weight: 400;
		color: var(--muted);
		font-size: clamp(1rem, 1.4vw, 1.15rem);
		max-width: 54ch;
		line-height: 1.6;
	}
	.scrollcue {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--copper);
		margin-top: 1.5rem;
		animation: bob 2.4s ease-in-out infinite;
	}
	@keyframes bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(5px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.scrollcue {
			animation: none;
		}
	}

	footer {
		max-width: 820px;
		margin: 0 auto;
		padding: 3rem 1.6rem 5rem;
		font-family: var(--font-ui);
		font-size: 0.92rem;
		color: var(--ink);
		line-height: 1.6;
	}
	footer .muted {
		color: var(--muted);
		margin-top: 0.4rem;
	}
	footer b {
		color: var(--bone);
		font-weight: 500;
	}
</style>
