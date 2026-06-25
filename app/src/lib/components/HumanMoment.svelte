<script lang="ts">
	import type { HumanMoment } from '$lib/data/humans';

	let { moment }: { moment: HumanMoment } = $props();
</script>

<figure class="human" class:reported={moment.kind === 'reported'}>
	<figcaption class="meta">
		<span class="place">{moment.place}</span>
		<span class="kind">{moment.kind === 'reported' ? 'Reported' : 'Representative'}</span>
	</figcaption>
	<p class="title">{moment.title}</p>
	<p class="body">{moment.body}</p>
	<p class="attribution">{moment.attribution}</p>
</figure>

<style>
	.human {
		border-left: 2px solid var(--muted);
		padding-left: 1rem;
	}
	.human.reported {
		border-left-color: var(--copper);
	}
	.meta {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		margin-bottom: 0.5rem;
	}
	.place {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--bone);
	}
	.kind {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--muted);
		border: 1px solid var(--hair);
		border-radius: 99px;
		padding: 1px 7px;
	}
	.reported .kind {
		color: var(--copper);
		border-color: color-mix(in srgb, var(--copper) 45%, transparent);
	}
	.title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.15em;
		color: var(--ink);
		margin-bottom: 0.4rem;
	}
	.body {
		font-family: var(--font-ui);
		color: var(--ink);
		line-height: 1.6;
	}
	.attribution {
		margin-top: 0.6rem;
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.04em;
		color: var(--muted);
	}
</style>
