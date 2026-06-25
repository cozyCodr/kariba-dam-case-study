<script lang="ts">
	// A SCHEMATIC top-down view of Lake Kariba retreating: a stand-in for the
	// pre-rendered Sentinel-2 frames the final build braids in (labeled as such).
	// The water polygon contracts toward the river channel as storage falls,
	// exposing pale former-lakebed inside the historic shoreline.
	import { storageDomain } from '$lib/data/timeline';

	let { storage = 26 }: { storage?: number } = $props();

	const { min, max } = storageDomain;
	// 1 = full pool (a year earlier), 0 = the 2024 low.
	let fill = $derived(Math.max(0, Math.min(1, (storage - min) / (max - min))));

	// The historic shoreline (outer) stays; the live water (inner) shrinks
	// toward the channel by scaling the polygon around the dam end.
	let shrink = $derived(0.34 + 0.66 * fill);
</script>

<svg viewBox="0 0 600 320" class="sat" role="img" aria-label="Schematic satellite view of Lake Kariba">
	<defs>
		<linearGradient id="sat-water" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="#2f6075" />
			<stop offset="1" stop-color="#173947" />
		</linearGradient>
	</defs>
	<rect x="0" y="0" width="600" height="320" fill="#0c1217" />

	<!-- historic shoreline: the full-pool extent, exposed as bone lakebed -->
	<path
		d="M40 150 C 120 90, 210 120, 280 150 C 360 184, 450 150, 540 196 C 565 210, 575 232, 548 244 C 470 270, 360 232, 280 214 C 200 196, 120 224, 60 200 C 36 190, 28 162, 40 150 Z"
		fill="var(--bone)"
		opacity="0.12"
		stroke="var(--waterline)"
		stroke-width="1"
		stroke-dasharray="4 5"
	/>

	<!-- live water, scaled toward the dam (right) as the lake retreats -->
	<g style:transform="translate(540px 197px) scale({shrink}) translate(-540px -197px)" style:transform-origin="0 0">
		<path
			d="M40 150 C 120 90, 210 120, 280 150 C 360 184, 450 150, 540 196 C 565 210, 575 232, 548 244 C 470 270, 360 232, 280 214 C 200 196, 120 224, 60 200 C 36 190, 28 162, 40 150 Z"
			fill="url(#sat-water)"
		/>
	</g>

	<text x="548" y="206" class="tag" text-anchor="end">KARIBA DAM</text>
	<text x="24" y="296" class="note">Schematic: stands in for pre-rendered Sentinel-2 frames</text>
</svg>

<style>
	.sat {
		width: 100%;
		height: 100%;
	}
	g {
		transition: transform 0.3s linear;
	}
	.tag {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		fill: var(--copper);
	}
	.note {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.1em;
		fill: var(--muted);
		text-transform: uppercase;
	}
	@media (prefers-reduced-motion: reduce) {
		g {
			transition: none;
		}
	}
</style>
