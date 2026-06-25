<script lang="ts">
	// Zambia province map. Two modes share one projection:
	//   rain → Chapter 1 rainfall-deficit choropleth, revealing province by
	//          province as the season's progress advances (south/west first).
	//   toll → Chapter 4 drought toll, with a national→Southern Province flight.
	import { geoIdentity, geoPath } from 'd3';
	import provincesGeo from '$lib/data/zambia-provinces.json';
	import { provinceInfo, PROVINCE_COUNT } from '$lib/data/provinces';

	let {
		mode = 'rain',
		progress = 0,
		focus = 0
	}: { mode?: 'rain' | 'toll'; progress?: number; focus?: number } = $props();

	const W = 560;
	const H = 460;

	// Build the projection + path generator once (runs at SSR + client).
	// geoIdentity uses PLANAR geometry, so it ignores ring-winding direction —
	// geoBoundaries polygons are clockwise, which spherical geoMercator would
	// read as inverted (collapsing the fit and filling the viewBox solid).
	// reflectY flips latitude so north points up in SVG space.
	const fc = provincesGeo as unknown as GeoJSON.FeatureCollection;
	const projection = geoIdentity()
		.reflectY(true)
		.fitExtent(
			[
				[24, 24],
				[W - 24, H - 24]
			],
			fc
		);
	const path = geoPath(projection);

	const features = fc.features.map((f) => {
		const name = (f.properties as { name: string }).name;
		return {
			name,
			d: path(f) ?? '',
			centroid: path.centroid(f),
			info: provinceInfo[name]
		};
	});

	// --- colour helpers -----------------------------------------------------
	const hex = (h: string) => [
		parseInt(h.slice(1, 3), 16),
		parseInt(h.slice(3, 5), 16),
		parseInt(h.slice(5, 7), 16)
	];
	const mix = (a: string, b: string, t: number) => {
		const [ar, ag, ab] = hex(a);
		const [br, bg, bb] = hex(b);
		const r = Math.round(ar + (br - ar) * t);
		const g = Math.round(ag + (bg - ag) * t);
		const bl = Math.round(ab + (bb - ab) * t);
		return `rgb(${r},${g},${bl})`;
	};
	const smoothstep = (e0: number, e1: number, x: number) => {
		const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
		return t * t * (3 - 2 * t);
	};

	function fill(name: string): string {
		const info = provinceInfo[name];
		if (!info) return '#222a32';
		if (mode === 'rain') {
			// reveal as the season's onset passes this province
			const reveal = smoothstep(
				(info.onset - 0.5) / PROVINCE_COUNT,
				(info.onset + 1.5) / PROVINCE_COUNT,
				progress
			);
			const sev = info.rainDeficit * reveal;
			// wet deep-water → dry bone, deepening to brick at the worst
			const base = mix('#2b4d5c', '#cbbea3', sev);
			return sev > 0.8 ? mix(base, '#8a3f2c', (sev - 0.8) / 0.2) : base;
		} else {
			const sev = info.toll;
			return sev > 0.75 ? mix('#3a2a26', '#8a3f2c', (sev - 0.75) / 0.25) : mix('#222a32', '#3a2a26', sev / 0.75);
		}
	}

	// --- national → Southern Province flight (toll mode) --------------------
	const southern = features.find((f) => f.name === 'Southern');
	let transform = $derived.by(() => {
		if (mode !== 'toll' || !southern || focus <= 0) return '';
		const [cx, cy] = southern.centroid;
		const scale = 1 + 1.4 * Math.max(0, Math.min(1, focus));
		const tx = W / 2 - cx * scale;
		const ty = H / 2 - cy * scale;
		return `translate(${tx} ${ty}) scale(${scale})`;
	});

	let labelFor = $derived(
		mode === 'toll' ? ['Southern', 'Lusaka'] : ['Southern', 'Western', 'Lusaka']
	);
</script>

<svg viewBox="0 0 {W} {H}" class="map" role="img" aria-label="Map of Zambia by province">
	<g style:transform style:transform-origin="0 0">
		{#each features as f (f.name)}
			<path d={f.d} fill={fill(f.name)} stroke="var(--night)" stroke-width="0.8" class:dim={mode === 'toll' && focus > 0.4 && f.name !== 'Southern'} />
		{/each}
		{#each features.filter((f) => labelFor.includes(f.name)) as f (f.name)}
			<text x={f.centroid[0]} y={f.centroid[1]} class="lbl" text-anchor="middle">{f.name}</text>
		{/each}
	</g>
</svg>

<style>
	.map {
		width: 100%;
		height: 100%;
		max-height: 78svh;
	}
	g {
		transition: transform 0.5s var(--ease);
	}
	path {
		transition:
			fill 0.4s linear,
			opacity 0.5s var(--ease);
	}
	path.dim {
		opacity: 0.28;
	}
	.lbl {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		fill: var(--ink);
		paint-order: stroke;
		stroke: var(--night);
		stroke-width: 3px;
		pointer-events: none;
	}
	@media (prefers-reduced-motion: reduce) {
		g,
		path {
			transition: none;
		}
	}
</style>
