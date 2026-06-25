<script lang="ts">
	import { sources } from '$lib/data/sources';
	const list = Object.values(sources);
</script>

<section id="sources" class="sources">
	<div class="inner">
		<p class="eyebrow">Provenance</p>
		<h2>Sources</h2>

		<ul class="srclist">
			{#each list as s (s.id)}
				<li>
					<div class="srchead">
						<span class="srclabel">{s.label}</span>
						{#if s.approximate}<span class="approx">approximate</span>{/if}
					</div>
					<p class="srcdetail">{s.detail}</p>
					<p class="srcmeta mono">
						{s.publisher} · {s.date} · {s.access}
						{#if s.url}<a href={s.url} target="_blank" rel="noopener noreferrer">↗</a>{/if}
					</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.sources {
		border-top: 1px solid var(--hair);
		background: var(--night-2);
		padding: 5rem 1.6rem 6rem;
	}
	.inner {
		max-width: 820px;
		margin: 0 auto;
	}
	h2 {
		font-weight: 300;
		font-size: clamp(1.8rem, 4vw, 2.6rem);
		margin: 0.4rem 0 1.6rem;
	}
	.srclist {
		list-style: none;
		display: grid;
		gap: 1.2rem;
	}
	.srclist > li {
		border-top: 1px solid var(--hair);
		padding-top: 1rem;
	}
	.srchead {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.srclabel {
		font-family: var(--font-ui);
		font-weight: 500;
		color: var(--ink);
	}
	.approx {
		font-family: var(--font-mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--copper);
		border: 1px solid color-mix(in srgb, var(--copper) 40%, transparent);
		border-radius: 99px;
		padding: 1px 7px;
	}
	.srcdetail {
		font-family: var(--font-ui);
		color: var(--muted);
		margin: 0.3rem 0;
		line-height: 1.5;
	}
	.srcmeta {
		font-size: 10.5px;
		color: var(--muted);
		letter-spacing: 0.04em;
	}
	.srcmeta a {
		color: var(--copper);
	}
</style>
