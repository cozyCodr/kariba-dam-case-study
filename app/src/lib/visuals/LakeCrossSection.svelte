<script lang="ts">
	// The draining lake cross-section (Chapters 2-3) - ported from the concept
	// scene. The water surface falls as usable storage drops, exposing pale
	// lakebed beneath the brick-red historic high-water stain.
	import { storageDomain } from '$lib/data/timeline';

	let { storage = 26 }: { storage?: number } = $props();

	const { min, max } = storageDomain;
	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

	// Surface y travels 52 (full) → 250 (drained) across the storage range.
	let waterY = $derived.by(() => {
		const t = (storage - min) / (max - min);
		return lerp(250, 52, Math.max(0, Math.min(1, t)));
	});
	let waterH = $derived(Math.max(0, 320 - waterY));
	let dustH = $derived(Math.max(0, waterY - 46));
</script>

<svg viewBox="0 0 400 320" preserveAspectRatio="none" class="lake" aria-label="Lake Kariba cross-section">
	<defs>
		<linearGradient id="lk-water" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#5B9DB4" />
			<stop offset="1" stop-color="#1E4555" />
		</linearGradient>
		<linearGradient id="lk-bed" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#3A332A" />
			<stop offset="1" stop-color="#0E1419" />
		</linearGradient>
	</defs>

	<rect x="0" y="0" width="400" height="320" fill="url(#lk-bed)" />
	<!-- exposed lakebed (dust) revealed as the water falls -->
	<rect x="0" y="46" width="400" height={dustH} fill="var(--bone)" opacity="0.10" />
	<!-- water body -->
	<rect x="0" y={waterY} width="400" height={waterH} fill="url(#lk-water)" />
	<!-- surface ripple -->
	<rect x="0" y={waterY} width="400" height="2" fill="#9FD0DE" opacity="0.55" />
	<!-- historic high-water stain -->
	<line x1="0" y1="46" x2="400" y2="46" stroke="var(--waterline)" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.8" />
	<text x="392" y="38" text-anchor="end" fill="#B5664E" font-family="DM Mono, monospace" font-size="10" letter-spacing="1">2010 HIGH-WATER MARK</text>
</svg>

<style>
	.lake {
		display: block;
		width: 100%;
		height: 100%;
	}
	rect,
	line {
		transition: all 0.25s linear;
	}
	@media (prefers-reduced-motion: reduce) {
		rect,
		line {
			transition: none;
		}
	}
</style>
