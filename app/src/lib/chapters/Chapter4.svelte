<script lang="ts">
	import Scrolly from '$lib/components/Scrolly.svelte';
	import HumanMoment from '$lib/components/HumanMoment.svelte';
	import Provenance from '$lib/components/Provenance.svelte';
	import ZambiaMap from '$lib/visuals/ZambiaMap.svelte';
	import Counter from '$lib/visuals/Counter.svelte';
	import { chapters, chapterToGlobal, clock } from '$lib/story.svelte';
	import { momentsForChapter } from '$lib/data/humans';

	const meta = chapters[3];
	const rural = momentsForChapter(4)[0];
	const steps = [0, 1, 2, 3, 4];

	const smoothstep = (e0: number, e1: number, x: number) => {
		const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
		return t * t * (3 - 2 * t);
	};

	function move(s: { progress: number; active: number }) {
		clock.chapter = meta.n;
		clock.p = chapterToGlobal(meta, s.progress);
	}
</script>

<section id={meta.id}>
	<header class="chapter-intro">
		<p class="eyebrow">{meta.kicker}</p>
		<h2>{meta.title}</h2>
		<p class="dek">The blackouts made the news. The deeper loss happened where the grid had never reached at all.</p>
	</header>

	<Scrolly {steps} onmove={move}>
		{#snippet graphic({ progress })}
			<div class="viz-stage">
				<ZambiaMap mode="toll" focus={smoothstep(0.32, 0.7, progress)} />
				<p class="viz-cap">Drought toll by province · indicative, FEWS NET / WFP pattern</p>
			</div>
		{/snippet}

		{#snippet step(_i, i, active)}
			<div class="prose">
				{#if i === 0}
					<p>While the cities counted blackout hours, another Zambia went largely uncounted.</p>
					<div class="prov"><Provenance id="rural_access" /></div>
				{:else if i === 1}
					<p>Around <b>90%</b> of rural Zambians never had grid power to lose in the first place. Their crisis was not the lights — it was the <b>harvest</b>.</p>
				{:else if i === 2}
					<p><b>Southern Province</b> was singled out in the reporting: scorched maize, dying livestock, families selling what animals survived.</p>
					<div class="prov"><Provenance id="food_security" /></div>
				{:else if i === 3}
					<p class="bignum"><Counter value={50000} active={active} suffix="+" /></p>
					<p>children under five at risk of severe wasting — the deadliest form of malnutrition.</p>
					<div class="prov"><Provenance id="malnutrition" /></div>
				{:else}
					<HumanMoment moment={rural} />
					<p class="close">The drought took light from the cities and food from the countryside. The people already on the margins paid the most.</p>
				{/if}
			</div>
		{/snippet}
	</Scrolly>
</section>

<style>
	.bignum {
		font-family: var(--font-ui);
		font-size: clamp(2.6rem, 7vw, 4rem);
		font-weight: 500;
		line-height: 1;
		margin-bottom: 0.3rem;
	}
	.prov {
		margin-top: 0.8rem;
	}
	.close {
		margin-top: 1rem;
		color: var(--bone);
		font-style: italic;
	}
</style>
