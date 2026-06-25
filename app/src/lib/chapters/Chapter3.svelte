<script lang="ts">
	import Scrolly from '$lib/components/Scrolly.svelte';
	import HumanMoment from '$lib/components/HumanMoment.svelte';
	import Provenance from '$lib/components/Provenance.svelte';
	import LakeCrossSection from '$lib/visuals/LakeCrossSection.svelte';
	import PowerRing from '$lib/visuals/PowerRing.svelte';
	import { chapters, chapterToGlobal, clock } from '$lib/story.svelte';
	import { momentsForChapter } from '$lib/data/humans';

	const meta = chapters[2];
	const [cafe, welder] = momentsForChapter(3);
	const steps = [0, 1, 2, 3, 4, 5];

	function move(s: { progress: number; active: number }) {
		clock.chapter = meta.n;
		clock.p = chapterToGlobal(meta, s.progress);
	}
</script>

<section id={meta.id}>
	<header class="chapter-intro">
		<p class="eyebrow">{meta.kicker}</p>
		<h2>{meta.title}</h2>
		<p class="dek">This is the mechanic at the heart of the story: the lake and the lights, draining on one clock.</p>
	</header>

	<Scrolly {steps} onmove={move}>
		{#snippet graphic()}
			<div class="stage">
				<div class="panel lake">
					<span class="tag mono">Lake Kariba · cross-section</span>
					<LakeCrossSection storage={clock.sample.storage} />
				</div>
				<div class="panel ring">
					<PowerRing hours={clock.sample.powerHours} size={250} />
				</div>
			</div>
		{/snippet}

		{#snippet step(_i, i)}
			<div class="prose">
				{#if i === 0}
					<p>More than <b>80%</b> of Zambia's electricity comes from moving water — most of it through Kariba's turbines.</p>
					<div class="prov"><Provenance id="grid_hydro" /></div>
				{:else if i === 1}
					<p>As the lake fell, ZESCO began rationing power. On <b>14 September 2024</b> it announced the Kariba North Bank station would shut down entirely.</p>
					<div class="prov"><Provenance id="power_hours" /></div>
				{:else if i === 2}
					<p>Load-shedding stretched toward <b>20 hours a day</b>. For many households, the grid came to mean roughly <b>three lit hours</b> — a day mostly spent in the dark.</p>
				{:else if i === 3}
					<HumanMoment moment={cafe} />
				{:else if i === 4}
					<HumanMoment moment={welder} />
				{:else}
					<p>The city rerouted itself around the generator's hum. But the city, at least, had a grid to lose.</p>
				{/if}
			</div>
		{/snippet}
	</Scrolly>
</section>

<style>
	.stage {
		width: min(94vw, 820px);
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		gap: 1.1rem;
		align-items: stretch;
	}
	.panel {
		position: relative;
		border: 1px solid var(--hair);
		border-radius: 3px;
		background: linear-gradient(180deg, var(--night-2), var(--night));
		overflow: hidden;
		min-height: 300px;
	}
	.lake :global(svg) {
		position: absolute;
		inset: 0;
		height: 100%;
	}
	.ring {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.4rem;
	}
	.tag {
		position: absolute;
		left: 14px;
		top: 12px;
		z-index: 3;
		font-size: 10px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.prov {
		margin-top: 0.8rem;
	}
	@media (max-width: 720px) {
		.stage {
			grid-template-columns: 1fr;
			gap: 0.8rem;
		}
		.panel.lake {
			min-height: 200px;
		}
	}
</style>
