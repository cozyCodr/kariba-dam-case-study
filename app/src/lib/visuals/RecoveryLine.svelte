<script lang="ts">
	// Chapter 5: the longer arc. Kariba's usable storage from the 2024 collapse
	// through the 2025–26 recovery — the lake refilled, but the lesson stands.
	// Values illustrative, anchored to ZRA reporting that levels recovered.
	let { progress = 0 }: { progress?: number } = $props();

	const series = [
		{ t: 'Jan 24', v: 20 },
		{ t: 'Apr 24', v: 15 },
		{ t: 'Jul 24', v: 10.4 },
		{ t: 'Sep 24', v: 8.3 },
		{ t: 'Dec 24', v: 4.8 },
		{ t: 'Mar 25', v: 7 },
		{ t: 'Jun 25', v: 14 },
		{ t: 'Sep 25', v: 12 },
		{ t: 'Dec 25', v: 9 },
		{ t: 'Mar 26', v: 13 },
		{ t: 'Jun 26', v: 20 }
	];

	const W = 560;
	const H = 300;
	const padX = 36;
	const padY = 30;
	const maxV = 24;

	const x = (i: number) => padX + (i / (series.length - 1)) * (W - 2 * padX);
	const y = (v: number) => H - padY - (v / maxV) * (H - 2 * padY);

	const linePath = series.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(d.v).toFixed(1)}`).join(' ');
	const troughIndex = 4; // Dec 24

	// progress reveals the line left→right (2024 first, then the recovery)
	let reveal = $derived(Math.max(0, Math.min(1, progress)));
	const totalLen = 1600;
</script>

<svg viewBox="0 0 {W} {H}" class="rec" role="img" aria-label="Kariba storage recovery 2024–2026">
	<line x1={padX} y1={y(0)} x2={W - padX} y2={y(0)} stroke="var(--hair)" />
	<line x1={padX} y1={y(26)} x2={W - padX} y2={y(26)} stroke="var(--hair)" stroke-dasharray="3 4" />
	<text x={padX} y={y(26) - 5} class="ax">~26% — a year before the drought</text>

	<path
		d={linePath}
		fill="none"
		stroke="var(--water-bright)"
		stroke-width="2.4"
		stroke-dasharray={totalLen}
		stroke-dashoffset={totalLen * (1 - reveal)}
	/>

	{#if reveal > 0.35}
		<g class="trough">
			<circle cx={x(troughIndex)} cy={y(series[troughIndex].v)} r="4" fill="var(--copper-bright)" />
			<text x={x(troughIndex)} y={y(series[troughIndex].v) + 22} text-anchor="middle" class="note">
				4.8% · record low, Dec 2024
			</text>
		</g>
	{/if}

	<text x={padX} y={H - 8} class="ax">2024</text>
	<text x={W - padX} y={H - 8} text-anchor="end" class="ax">2026</text>
</svg>

<style>
	.rec {
		width: 100%;
		height: 100%;
		max-height: 70svh;
	}
	path {
		transition: stroke-dashoffset 0.2s linear;
	}
	.trough {
		transition: opacity 0.4s var(--ease);
	}
	.ax,
	.note {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.08em;
		fill: var(--muted);
	}
	.note {
		fill: var(--copper-bright);
	}
	@media (prefers-reduced-motion: reduce) {
		path {
			transition: none;
		}
	}
</style>
