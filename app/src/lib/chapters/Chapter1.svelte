<script lang="ts">
	import Scrolly from '$lib/components/Scrolly.svelte';
	import HumanMoment from '$lib/components/HumanMoment.svelte';
	import Provenance from '$lib/components/Provenance.svelte';
	import ZambiaMap from '$lib/visuals/ZambiaMap.svelte';
	import { chapters, chapterToGlobal, clock } from '$lib/story.svelte';
	import { momentsForChapter } from '$lib/data/humans';

	const meta = chapters[0];
	const farmer = momentsForChapter(1)[0];
	const steps = [0, 1, 2, 3];

	function move(s: { progress: number; active: number }) {
		clock.chapter = meta.n;
		clock.p = chapterToGlobal(meta, s.progress);
	}
</script>

<section id={meta.id}>
	<header class="chapter-intro">
		<p class="eyebrow">{meta.kicker}</p>
		<h2>{meta.title}</h2>
		<p class="dek">Every drought in this story begins the same way, with a sky that stays clear when it should not.</p>
	</header>

	<Scrolly {steps} onmove={move}>
		{#snippet graphic({ progress })}
			<div class="viz-stage">
				<ZambiaMap mode="rain" {progress} />
				<p class="viz-cap">Rainfall deficit, 2023-24 season · indicative, CHIRPS pattern</p>
			</div>
		{/snippet}

		{#snippet step(_i, i)}
			<div class="prose">
				{#if i === 0}
					<p>In a normal year, the rains sweep in around November and feed Zambia's fields and, downstream, the rivers that fill Lake Kariba.</p>
				{:else if i === 1}
					<p>The 2023-24 season came late, then barely came at all. An El&nbsp;Niño drought settled the deepest deficit over the <b>south and west</b>.</p>
					<div class="prov"><Provenance id="rainfall" /></div>
				{:else if i === 2}
					<HumanMoment moment={farmer} />
				{:else}
					<p>Rain that never falls on the fields never reaches the rivers either, or the great lake they feed. The shortfall was already moving toward Kariba.</p>
				{/if}
			</div>
		{/snippet}
	</Scrolly>
</section>

<style>
	.prov {
		margin-top: 0.8rem;
	}
</style>
