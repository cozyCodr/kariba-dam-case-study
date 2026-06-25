<script lang="ts">
	import Scrolly from '$lib/components/Scrolly.svelte';
	import HumanMoment from '$lib/components/HumanMoment.svelte';
	import Provenance from '$lib/components/Provenance.svelte';
	import RecoveryLine from '$lib/visuals/RecoveryLine.svelte';
	import { chapters, chapterToGlobal, clock } from '$lib/story.svelte';
	import { momentsForChapter } from '$lib/data/humans';

	const meta = chapters[4];
	const solar = momentsForChapter(5)[0];
	const steps = [0, 1, 2, 3];

	function move(s: { progress: number; active: number }) {
		clock.chapter = meta.n;
		clock.p = chapterToGlobal(meta, s.progress);
	}

	let localProgress = $state(0);
</script>

<section id={meta.id}>
	<header class="chapter-intro">
		<p class="eyebrow">{meta.kicker}</p>
		<h2>{meta.title}</h2>
		<p class="dek">The lake recovered. That is the good news, and the warning, in a single line.</p>
	</header>

	<Scrolly
		{steps}
		onmove={(s) => {
			localProgress = s.progress;
			move(s);
		}}
	>
		{#snippet graphic()}
			<div class="viz-stage">
				<RecoveryLine progress={localProgress} />
				<p class="viz-cap">Kariba usable storage, 2024-2026 · illustrative, anchored to ZRA reporting</p>
			</div>
		{/snippet}

		{#snippet step(_i, i)}
			<div class="prose">
				{#if i === 0}
					<p>The rains returned. Through 2025 and into 2026, Kariba slowly refilled toward the level it held before the drought.</p>
				{:else if i === 1}
					<p>But recovery is not the same as safety. A country that draws more than <b>80%</b> of its power from a single lake is always one dry year from the dark.</p>
					<div class="prov"><Provenance id="grid_hydro" /></div>
				{:else if i === 2}
					<HumanMoment moment={solar} />
				{:else}
					<p class="close">Water left, and light left, and the people already on the margins paid the most. The lake came back. The lesson should stay.</p>
				{/if}
			</div>
		{/snippet}
	</Scrolly>
</section>

<style>
	.prov {
		margin-top: 0.8rem;
	}
	.close {
		color: var(--bone);
		font-style: italic;
		font-size: 1.15em;
	}
</style>
