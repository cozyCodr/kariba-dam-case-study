<script lang="ts">
	// A small line that traces one variable across the 2024 timeline, with a
	// dot marking the current moment. Used for the ZRA lake-level line (Ch 2).
	import { timeline2024 } from '$lib/data/timeline';

	let {
		accessor,
		p = 0,
		label = '',
		unit = '',
		color = 'var(--water)'
	}: {
		accessor: (d: (typeof timeline2024)[number]) => number;
		p?: number;
		label?: string;
		unit?: string;
		color?: string;
	} = $props();

	const W = 400;
	const H = 70;
	const pad = 8;
	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

	// Geometry depends only on the accessor; recomputed if it changes.
	let geom = $derived.by(() => {
		const values = timeline2024.map(accessor);
		const minV = Math.min(...values);
		const maxV = Math.max(...values);
		const x = (i: number) => (i / (values.length - 1)) * W;
		const y = (v: number) => H - pad - ((v - minV) / (maxV - minV || 1)) * (H - 2 * pad);
		const path = values
			.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
			.join(' ');
		return { values, y, path };
	});

	let cur = $derived.by(() => {
		const { values, y } = geom;
		const clamped = Math.max(0, Math.min(1, p));
		const fx = clamped * (values.length - 1);
		const i = Math.min(values.length - 2, Math.floor(fx));
		const f = fx - i;
		const v = lerp(values[i], values[i + 1], f);
		return { cx: clamped * W, cy: y(v), v };
	});
</script>

<div class="spark">
	{#if label}
		<div class="cap mono">
			{label}
			<b style:color>{cur.v.toFixed(unit === 'm' ? 2 : 1)}{unit}</b>
		</div>
	{/if}
	<svg viewBox="0 0 {W} {H}" preserveAspectRatio="none" aria-hidden="true">
		<path d={geom.path} fill="none" stroke={color} stroke-width="1.6" opacity="0.5" />
		<path
			d={geom.path}
			fill="none"
			stroke={color}
			stroke-width="2.2"
			stroke-dasharray={W * 2}
			stroke-dashoffset={W * 2 * (1 - Math.max(0, Math.min(1, p)))}
		/>
		<circle cx={cur.cx} cy={cur.cy} r="3.2" fill="var(--copper-bright)" />
	</svg>
</div>

<style>
	.spark {
		width: 100%;
	}
	.cap {
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--muted);
		margin-bottom: 0.4rem;
		display: flex;
		justify-content: space-between;
	}
	.cap b {
		font-weight: 500;
	}
	svg {
		width: 100%;
		height: 70px;
		overflow: visible;
	}
</style>
