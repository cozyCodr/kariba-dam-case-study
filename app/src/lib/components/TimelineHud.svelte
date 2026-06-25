<script lang="ts">
	import { clock } from '$lib/story.svelte';
	import { storageDomain } from '$lib/data/timeline';

	// Width of the storage sparkbar, normalized against the year's range.
	let storagePct = $derived(
		((clock.sample.storage - storageDomain.min) / (storageDomain.max - storageDomain.min)) * 100
	);
</script>

<aside class="hud" class:visible={clock.started} aria-hidden="true">
	<div class="date mono">{clock.sample.label}</div>
	<div class="bar">
		<div class="fill" style:width="{storagePct}%"></div>
	</div>
	<div class="readouts">
		<span><b>{clock.sample.storage.toFixed(1)}%</b> usable storage</span>
		<span><b>{Math.round(clock.sample.powerHours)}h</b> power / day</span>
	</div>
</aside>

<style>
	.hud {
		position: fixed;
		left: 50%;
		bottom: 1rem;
		transform: translate(-50%, 140%);
		z-index: 40;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.6rem 1.1rem;
		background: color-mix(in srgb, var(--night-2) 90%, transparent);
		backdrop-filter: blur(8px);
		border: 1px solid var(--hair);
		border-radius: 99px;
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--muted);
		opacity: 0;
		transition:
			transform 0.5s var(--ease),
			opacity 0.5s var(--ease);
		max-width: calc(100vw - 2rem);
	}
	.hud.visible {
		transform: translate(-50%, 0);
		opacity: 1;
	}
	.date {
		color: var(--ink);
		font-size: 12px;
		letter-spacing: 0.06em;
		white-space: nowrap;
	}
	.bar {
		width: 90px;
		height: 3px;
		background: var(--water-deep);
		border-radius: 2px;
		overflow: hidden;
	}
	.fill {
		height: 100%;
		background: linear-gradient(90deg, var(--water-deep), var(--water-bright));
		transition: width 0.2s linear;
	}
	.readouts {
		display: flex;
		gap: 0.9rem;
		white-space: nowrap;
	}
	.readouts b {
		color: var(--copper-bright);
		font-weight: 500;
	}
	@media (max-width: 720px) {
		.readouts span:last-child {
			display: none;
		}
		.bar {
			width: 54px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hud {
			transition: opacity 0.3s linear;
		}
		.fill {
			transition: none;
		}
	}
</style>
