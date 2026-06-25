/**
 * The shared 2024 timeline — the spine of the whole story.
 *
 * Every visual (lake cross-section, satellite frames, the 24-hour ring, the
 * level line, the map pan) reads its state from one normalized progress value
 * `p` in [0, 1] mapped across 2024. Scroll position sets `p`; the scene state
 * is derived. The synchronization IS the argument (see docs/build-brief.md §4).
 *
 * NOTE: these are the concept-scene's approximate, illustrative anchors. They
 * will be replaced by values from the offline Python prep (ZRA weekly lake
 * levels; ZESCO/news load-shedding chronology). The hours-of-power series is
 * assembled from announcements, not measured — label it approximate in-app.
 */

export interface TimelinePoint {
	/** Month label, e.g. "Jan 2024" */
	label: string;
	/** ISO date for the first of the month */
	date: string;
	/** Kariba usable storage, percent */
	storage: number;
	/** Approximate hours of mains power per day (assembled, not measured) */
	powerHours: number;
	/** Lake level, metres above datum */
	level: number;
}

export const timeline2024: TimelinePoint[] = [
	{ label: 'Jan 2024', date: '2024-01-01', storage: 20.0, powerHours: 24, level: 478.8 },
	{ label: 'Feb 2024', date: '2024-02-01', storage: 18.4, powerHours: 23, level: 478.3 },
	{ label: 'Mar 2024', date: '2024-03-01', storage: 16.6, powerHours: 20, level: 477.9 },
	{ label: 'Apr 2024', date: '2024-04-01', storage: 15.0, powerHours: 17, level: 477.6 },
	{ label: 'May 2024', date: '2024-05-01', storage: 13.4, powerHours: 14, level: 477.3 },
	{ label: 'Jun 2024', date: '2024-06-01', storage: 11.8, powerHours: 12, level: 477.1 },
	{ label: 'Jul 2024', date: '2024-07-01', storage: 10.4, powerHours: 10, level: 476.95 },
	{ label: 'Aug 2024', date: '2024-08-01', storage: 8.9, powerHours: 8, level: 476.78 },
	{ label: 'Sep 2024', date: '2024-09-01', storage: 8.3, powerHours: 5, level: 476.7 },
	{ label: 'Oct 2024', date: '2024-10-01', storage: 6.6, powerHours: 3, level: 476.45 },
	{ label: 'Nov 2024', date: '2024-11-01', storage: 5.4, powerHours: 3, level: 476.25 },
	{ label: 'Dec 2024', date: '2024-12-01', storage: 4.8, powerHours: 3, level: 476.1 }
];

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export interface TimelineSample {
	storage: number;
	powerHours: number;
	level: number;
	label: string;
}

/**
 * Sample the timeline at normalized progress `p` in [0, 1], linearly
 * interpolating between monthly anchors.
 */
export function sampleTimeline(p: number): TimelineSample {
	const clamped = Math.max(0, Math.min(1, p));
	const x = clamped * (timeline2024.length - 1);
	const i = Math.min(timeline2024.length - 2, Math.floor(x));
	const f = x - i;
	const a = timeline2024[i];
	const b = timeline2024[i + 1];
	return {
		storage: lerp(a.storage, b.storage, f),
		powerHours: lerp(a.powerHours, b.powerHours, f),
		level: lerp(a.level, b.level, f),
		label: f < 0.5 ? a.label : b.label
	};
}

export const storageDomain = {
	min: Math.min(...timeline2024.map((d) => d.storage)),
	max: Math.max(...timeline2024.map((d) => d.storage))
};
