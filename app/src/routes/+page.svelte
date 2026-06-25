<script lang="ts">
	// Chapter scaffolding lands here as the build proceeds (see docs/build-brief.md §3):
	//   1. The rains that didn't come   2. The lake remembers   3. The day goes dark
	//   4. The unequal toll             5. What a country runs on
</script>

<svelte:head>
	<title>When the Lake Ran Dry — Zambia's 2024 drought</title>
</svelte:head>

<main>
	<section class="hero">
		<p class="eyebrow">Zambia · 2024</p>
		<h1>The year the lake — <em>and the lights</em> — ran dry.</h1>
		<p class="standfirst">
			An El Niño drought drained Lake Kariba — the source of over 80% of Zambia's electricity — to
			record lows, and the country fell dark. But the people the grid never reached paid the most.
		</p>
		<p class="scrollcue" aria-hidden="true">Scroll to begin ↓</p>
	</section>

	<section class="placeholder">
		<p class="eyebrow">Build in progress</p>
		<p>
			Five chapters on one synchronized 2024 timeline. The core mechanic is proven in
			<span class="mono">concept/kariba-concept-scene.html</span>.
		</p>
	</section>
</main>

<style>
	main {
		width: 100%;
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
		max-width: 52ch;
		line-height: 1.6;
	}

	.scrollcue {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--copper);
		margin-top: 1.5rem;
	}

	.placeholder {
		min-height: 60svh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.8rem;
		max-width: 940px;
		margin: 0 auto;
		padding: 2rem 1.6rem;
		border-top: 1px solid var(--hair);
	}
	.placeholder p:not(.eyebrow) {
		font-family: var(--font-ui);
		color: var(--muted);
		max-width: 48ch;
	}
	.mono {
		color: var(--bone);
		font-size: 0.9em;
	}
</style>
