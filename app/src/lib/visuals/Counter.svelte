<script lang="ts">
	// Counts up to a target when it becomes active. Honours reduced motion by
	// showing the final value immediately.
	let {
		value,
		active = true,
		prefix = '',
		suffix = '',
		duration = 1400
	}: {
		value: number;
		active?: boolean;
		prefix?: string;
		suffix?: string;
		duration?: number;
	} = $props();

	let shown = $state(0);
	let done = $state(false);

	const reduce =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	$effect(() => {
		if (!active || done) return;
		if (reduce) {
			shown = value;
			done = true;
			return;
		}
		let raf = 0;
		let start = 0;
		const tick = (t: number) => {
			if (!start) start = t;
			const k = Math.min(1, (t - start) / duration);
			const eased = 1 - Math.pow(1 - k, 3);
			shown = value * eased;
			if (k < 1) raf = requestAnimationFrame(tick);
			else done = true;
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	let display = $derived(Math.round(shown).toLocaleString('en-US'));
</script>

<span class="counter">{prefix}{display}{suffix}</span>

<style>
	.counter {
		font-family: var(--font-ui);
		font-weight: 500;
		font-variant-numeric: tabular-nums;
		color: var(--copper-bright);
	}
</style>
