<script lang="ts" generics="T">
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		/** Per-step data; one prose step rendered per item */
		steps: T[];
		/** The sticky visual; receives chapter-local progress (0–1) and active index */
		graphic: Snippet<[{ progress: number; active: number }]>;
		/** A prose step; receives its data, index, and whether it is active */
		step: Snippet<[T, number, boolean]>;
		/** Reports chapter-local progress (0–1) and active step on every change */
		onmove?: (state: { progress: number; active: number }) => void;
	}

	let { steps, graphic, step, onmove }: Props = $props();

	let active = $state(0);
	let progress = $state(0);
	let stepEls: HTMLElement[] = $state([]);
	let container = $state<HTMLElement>();

	function emit() {
		onmove?.({ progress, active });
	}

	function viewportH(): number {
		// window.innerHeight can be 0 in some embedded/headless renderers;
		// clientHeight is a reliable fallback.
		return window.innerHeight || document.documentElement.clientHeight || 800;
	}

	// Continuous progress, driven directly from scroll position. This is the
	// spine of the synchronized timeline — smoother and more robust than
	// IntersectionObserver progress, which depends on viewport-height math.
	function measure() {
		if (!container) return;
		const rect = container.getBoundingClientRect();
		const vh = viewportH();
		const travel = rect.height - vh;
		const p = travel > 0 ? Math.max(0, Math.min(1, -rect.top / travel)) : rect.top <= 0 ? 1 : 0;

		// Active step: the one whose centre sits nearest the viewport's mid-line.
		const mid = vh * 0.5;
		let best = active;
		let bestDist = Infinity;
		for (let i = 0; i < stepEls.length; i++) {
			const el = stepEls[i];
			if (!el) continue;
			const r = el.getBoundingClientRect();
			const d = Math.abs(r.top + r.height / 2 - mid);
			if (d < bestDist) {
				bestDist = d;
				best = i;
			}
		}

		progress = p;
		active = best;

		// Only the chapter currently pinned in the viewport drives the shared
		// clock. Without this gate, every Scrolly instance writes the global
		// clock on each scroll (last-in-DOM wins), so a later chapter would
		// hijack the timeline when scrolling back up.
		const engaged = rect.top <= 0 && rect.bottom >= vh - 1;
		if (engaged) emit();
	}

	onMount(() => {
		// Direct measure on each scroll: cheap (a handful of getBoundingClientRect
		// reads) and robust — it doesn't depend on requestAnimationFrame firing,
		// which some embedded renderers gate behind paint.
		const onScroll = () => measure();

		measure();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });

		// Scrollama is kept for discrete step-enter events in real browsers; it
		// enhances active-step precision but the direct measure() above is the
		// source of truth, so a no-op env (innerHeight 0) degrades gracefully.
		let scroller: { destroy: () => void } | null = null;
		let disposed = false;
		(async () => {
			try {
				const scrollama = (await import('scrollama')).default;
				if (disposed) return;
				const s = scrollama();
				s.setup({ step: stepEls.filter(Boolean), offset: 0.6 }).onStepEnter(
					(r: { index: number }) => {
						active = r.index;
						emit();
					}
				);
				scroller = s as unknown as { destroy: () => void };
			} catch {
				/* direct measure() remains authoritative */
			}
		})();

		return () => {
			disposed = true;
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			scroller?.destroy();
		};
	});
</script>

<div class="scrolly" bind:this={container}>
	<div class="sticky">
		{@render graphic({ progress, active })}
	</div>
	<div class="steps">
		{#each steps as s, i (i)}
			<div class="step" class:active={i === active} bind:this={stepEls[i]}>
				<div class="card">
					{@render step(s, i, i === active)}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	/* Grid stacking: graphic and steps share one cell, so the graphic stays
	   pinned (sticky) while the prose steps scroll over it. */
	.scrolly {
		display: grid;
		grid-template-columns: 1fr;
	}
	.sticky,
	.steps {
		grid-area: 1 / 1;
	}

	.sticky {
		position: sticky;
		top: 0;
		height: 100svh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.steps {
		position: relative;
		z-index: 2;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding: 0 max(6vw, 1.4rem);
	}

	.step {
		min-height: 92svh;
		display: flex;
		align-items: center;
		width: min(38ch, 100%);
	}
	.step:first-child {
		min-height: 70svh;
	}
	.step:last-child {
		min-height: 80svh;
	}

	.card {
		pointer-events: auto;
		background: color-mix(in srgb, var(--night) 93%, transparent);
		backdrop-filter: blur(10px);
		border: 1px solid var(--hair);
		border-radius: 4px;
		padding: 1.3rem 1.4rem;
		box-shadow: 0 18px 50px -20px rgba(0, 0, 0, 0.85);
		font-family: var(--font-ui);
		font-size: clamp(1rem, 1.5vw, 1.18rem);
		line-height: 1.62;
		color: var(--ink);
		opacity: 0.35;
		transform: translateY(8px);
		transition:
			opacity 0.5s var(--ease),
			transform 0.5s var(--ease);
	}
	.step.active .card {
		opacity: 1;
		transform: none;
	}

	@media (max-width: 720px) {
		/* Seat the graphic toward the top and the prose toward the bottom so the
		   opaque card overlaps as little of the visual as possible. */
		.sticky {
			align-items: flex-start;
			padding-top: 3vh;
		}
		.steps {
			align-items: center;
			padding: 0 1rem;
		}
		.step {
			width: 100%;
			align-items: flex-end;
			padding-bottom: 6vh;
		}
		.step:first-child {
			align-items: flex-end;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			transition: none;
			opacity: 0.9;
			transform: none;
		}
	}
</style>
