<script lang="ts">
	// The 24-hour "day going dark" ring (Chapter 3) — ported from the concept
	// scene. Each segment is an hour; lit (copper) segments fill from the top
	// like a clock catching daylight. As power hours fall, the day empties.
	let { hours = 24, size = 300 }: { hours?: number; size?: number } = $props();

	const N = 24;
	const cx = 50;
	const cy = 50;
	const r = 40;
	const gap = 3.2;

	function arcPath(k: number): string {
		const a0 = (k / N) * 360 + gap / 2;
		const a1 = ((k + 1) / N) * 360 - gap / 2;
		const pt = (deg: number) => {
			const rad = (deg * Math.PI) / 180;
			return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
		};
		const [x0, y0] = pt(a0);
		const [x1, y1] = pt(a1);
		return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`;
	}

	const segs = Array.from({ length: N }, (_, k) => ({ k, d: arcPath(k) }));

	let lit = $derived(Math.max(0, Math.min(N, hours)));
</script>

<div class="ringbox" style:--size="{size}px">
	<svg viewBox="0 0 100 100" role="img" aria-label="Hours of mains power per day">
		<g>
			{#each segs as seg (seg.k)}
				{@const on = seg.k < lit}
				{@const partial = seg.k < lit && seg.k + 1 > lit}
				<path
					d={seg.d}
					fill="none"
					stroke-width="6"
					stroke-linecap="round"
					stroke={on ? (partial ? '#9A6433' : 'var(--copper)') : '#222A32'}
					opacity={partial ? lit - seg.k : 1}
					class:glow={on}
				/>
			{/each}
		</g>
	</svg>
	<div class="center">
		<div class="hours">{Math.round(lit)}</div>
		<div class="label mono">hours of power / day</div>
	</div>
</div>

<style>
	.ringbox {
		position: relative;
		width: var(--size);
		max-width: 78vw;
		aspect-ratio: 1;
	}
	svg {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
	}
	.glow {
		filter: drop-shadow(0 0 3px rgba(240, 168, 92, 0.5));
	}
	.center {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.hours {
		font-family: var(--font-ui);
		font-weight: 500;
		font-size: calc(var(--size) * 0.23);
		line-height: 0.9;
		color: var(--copper-bright);
	}
	.label {
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--muted);
		margin-top: 0.6rem;
	}
</style>
