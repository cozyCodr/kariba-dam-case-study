<script lang="ts">
	import { sources, type Source } from '$lib/data/sources';

	let { id }: { id: keyof typeof sources } = $props();
	let s: Source = $derived(sources[id]);
</script>

<p class="prov">
	<span class="src">{s.publisher}</span>
	{#if s.approximate}<span class="approx" title="Assembled, not measured">approximate</span>{/if}
	<span class="dot">·</span>
	<span class="date">{s.date}</span>
	{#if s.url}
		<a class="link" href={s.url} target="_blank" rel="noopener noreferrer">source ↗</a>
	{/if}
</p>

<style>
	.prov {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.06em;
		color: var(--muted);
	}
	.src {
		text-transform: uppercase;
		letter-spacing: 0.16em;
	}
	.approx {
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--copper);
		border: 1px solid color-mix(in srgb, var(--copper) 40%, transparent);
		border-radius: 99px;
		padding: 0 6px;
	}
	.dot {
		opacity: 0.5;
	}
	.link {
		color: var(--muted);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.link:hover {
		color: var(--copper);
	}
</style>
