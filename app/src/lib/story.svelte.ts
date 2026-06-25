/**
 * The shared story clock. One global progress value `p` in [0, 1] maps across
 * the 2024 timeline; whichever chapter is on stage drives it, and the timeline
 * HUD reads it. The synchronization is the argument (docs/build-brief.md §4).
 */
import { sampleTimeline, type TimelineSample } from './data/timeline';

class StoryClock {
	/** Global progress across 2024, [0, 1] */
	p = $state(0);
	/** Which chapter is currently on stage (1–5), 0 = intro */
	chapter = $state(0);

	get sample(): TimelineSample {
		return sampleTimeline(this.p);
	}

	/** True once the reader has scrolled into the chapters */
	get started(): boolean {
		return this.chapter > 0;
	}
}

export const clock = new StoryClock();

/**
 * Each chapter owns a sub-range of the year. A chapter's local scroll progress
 * (0→1) maps into its global range, so the date advances monotonically across
 * the whole story while each chapter keeps its own narrative pace.
 */
export interface ChapterMeta {
	n: number;
	id: string;
	title: string;
	kicker: string;
	/** Global progress range [start, end] this chapter covers */
	range: [number, number];
}

export const chapters: ChapterMeta[] = [
	{ n: 1, id: 'rains', title: 'The rains that didn’t come', kicker: 'Chapter One', range: [0.0, 0.16] },
	{ n: 2, id: 'lake', title: 'The lake remembers', kicker: 'Chapter Two', range: [0.16, 0.62] },
	{ n: 3, id: 'dark', title: 'The day goes dark', kicker: 'Chapter Three', range: [0.62, 0.82] },
	{ n: 4, id: 'toll', title: 'The unequal toll', kicker: 'Chapter Four', range: [0.82, 1.0] },
	{ n: 5, id: 'runs-on', title: 'What a country runs on', kicker: 'Chapter Five', range: [1.0, 1.0] }
];

/** Map a chapter's local progress (0–1) into the global year progress. */
export function chapterToGlobal(meta: ChapterMeta, local: number): number {
	const [a, b] = meta.range;
	return a + (b - a) * Math.max(0, Math.min(1, local));
}
