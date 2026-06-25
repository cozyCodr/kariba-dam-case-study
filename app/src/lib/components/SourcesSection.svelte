<script lang="ts">
	import { sources } from '$lib/data/sources';
	const list = Object.values(sources);
</script>

<section id="sources" class="sources">
	<div class="inner">
		<p class="eyebrow">Sources &amp; method</p>
		<h2>How this was built</h2>

		<div class="note">
			<p>
				The data is the skeleton; the people are the heart. To keep faith with both, this piece
				holds two rules in plain sight:
			</p>
			<ul>
				<li>
					<b>Real, sourced people</b> carry on-screen attribution. Where an immersive “a day in the
					life” beat is needed, it is shown as a <b>clearly-labeled representative scene</b>, grounded
					in documented conditions — never a composite passed off as one real person, never an
					invented quote put in a real person's mouth.
				</li>
				<li>
					The <b>hours-of-power series is assembled</b> from ZESCO announcements and news reports, not
					measured — it is labeled approximate wherever it appears. Province severities are
					indicative of the well-reported pattern, not precise pixel values.
				</li>
			</ul>
			<p class="static">
				All data is pre-processed offline and baked into static assets; the page makes no live API
				calls at runtime.
			</p>
		</div>

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
	.note {
		font-family: var(--font-ui);
		color: var(--ink);
		line-height: 1.65;
		border-left: 2px solid var(--copper);
		padding-left: 1.1rem;
		margin-bottom: 2.4rem;
	}
	.note ul {
		margin: 0.8rem 0;
		padding-left: 1.1rem;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.note b {
		color: var(--bone);
		font-weight: 500;
	}
	.static {
		color: var(--muted);
		font-size: 0.92em;
		margin-top: 0.8rem;
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
