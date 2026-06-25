<script lang="ts">
	import Scrolly from '$lib/components/Scrolly.svelte';
	import HumanMoment from '$lib/components/HumanMoment.svelte';
	import Provenance from '$lib/components/Provenance.svelte';
	import SatelliteLake from '$lib/visuals/SatelliteLake.svelte';
	import Sparkline from '$lib/visuals/Sparkline.svelte';
	import { chapters, chapterToGlobal, clock } from '$lib/story.svelte';
	import { momentsForChapter } from '$lib/data/humans';

	const meta = chapters[1];
	const fisher = momentsForChapter(2)[0];
	const steps = [0, 1, 2, 3, 4];

	function move(s: { progress: number; active: number }) {
		clock.chapter = meta.n;
		clock.p = chapterToGlobal(meta, s.progress);
	}
</script>

<section id={meta.id}>
	<header class="chapter-intro">
		<p class="eyebrow">{meta.kicker}</p>
		<h2>{meta.title}</h2>
		<p class="dek">Lake Kariba is the largest reservoir on Earth by volume. In 2024 it kept a record few wanted: how low it could go.</p>
	</header>

	<Scrolly {steps} onmove={move}>
		{#snippet graphic()}
			<div class="viz-stage">
				<SatelliteLake storage={clock.sample.storage} />
				<div class="line">
					<Sparkline accessor={(d) => d.level} p={clock.p} label="Lake level (ZRA)" unit="m" />
				</div>
			</div>
		{/snippet}

		{#snippet step(_i, i)}
			<div class="prose">
				{#if i === 0}
					<p>Kariba is not a natural lake but a memory of the Zambezi, the river dammed in 1959, its valley filled, its old shoreline drowned.</p>
				{:else if i === 1}
					<p>Through 2024 the water pulled back from its banks, exposing pale lakebed and, at the old edge, a <b>brick-red stain</b> marking where the lake once stood.</p>
					<div class="prov"><Provenance id="satellite" /></div>
				{:else if i === 2}
					<p>By <b>2 September 2024</b>, usable storage had fallen to about <b>8.3%</b>, against roughly 26% a year earlier. A record low.</p>
					<div class="prov"><Provenance id="kariba_storage" /></div>
				{:else if i === 3}
					<HumanMoment moment={fisher} />
				{:else}
					<p>Less water means less weight to turn the turbines. What the lake was losing, the country's lights were about to lose too.</p>
				{/if}
			</div>
		{/snippet}
	</Scrolly>
</section>

<style>
	.line {
		width: min(92vw, 760px);
		margin-top: 0.4rem;
	}
	.prov {
		margin-top: 0.8rem;
	}
</style>
