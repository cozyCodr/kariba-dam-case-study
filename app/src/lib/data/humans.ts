/**
 * The human layer: the heart of the story (docs/build-brief.md §2, §9).
 *
 * INTEGRITY RULES, enforced by the shape of this data:
 *  - `kind: 'reported'`  → drawn from named reporting; carries an on-screen
 *     attribution. We describe documented scenes; we do NOT invent quotes and
 *     attribute them to real named individuals.
 *  - `kind: 'representative'` → a clearly-labeled composite "a day in the life"
 *     beat, grounded in documented conditions, never passed off as one real
 *     person.
 *
 * The urban↔rural inequality contrast is the spine of this layer.
 */

export type HumanKind = 'reported' | 'representative';

export interface HumanMoment {
	id: string;
	chapter: number;
	kind: HumanKind;
	/** Lusaka (urban) vs Southern Province / rural */
	place: string;
	/** Short title for the moment */
	title: string;
	/** The scene, in human sentences: documented, not invented */
	body: string;
	/** On-screen attribution line */
	attribution: string;
}

export const humanMoments: HumanMoment[] = [
	{
		id: 'farmer-planting',
		chapter: 1,
		kind: 'representative',
		place: 'Southern Province',
		title: 'Watching a sky that stayed clear',
		body: 'In planting season a farmer reads the sky for rain that the season never delivered. Across southern and western Zambia, the clouds that should have filled the fields, and eventually the lake, did not come.',
		attribution: 'A representative day, drawn from drought reporting across southern Zambia, 2024.'
	},
	{
		id: 'fisher-shore',
		chapter: 2,
		kind: 'representative',
		place: 'Lake Kariba',
		title: 'The shore that kept moving',
		body: 'A boat that used to launch from the bank now starts from a longer walk across cracked, pale lakebed: ground that had been underwater for years, marked at its old edge by a brick-red stain where the water once stood.',
		attribution: 'A representative scene, grounded in reporting on Kariba’s receding shoreline, 2024.'
	},
	{
		id: 'mercato-cafe',
		chapter: 3,
		kind: 'reported',
		place: 'Lusaka',
		title: 'The café that became an office',
		body: 'In Lusaka, people hauled laptops, one woman her entire desktop tower, to Mercato Café because it had a diesel generator. Tables were strung with power strips; a coffee shop turned into the neighbourhood’s power supply.',
		attribution: 'Reported by AP / Euronews, Sept 2024.'
	},
	{
		id: 'welder-dark',
		chapter: 3,
		kind: 'reported',
		place: 'Lusaka',
		title: 'The welder who went dark',
		body: 'A small-business welder described five days without power, his diesel generator sputtering out mid-sentence. The fuel to keep it running had become unaffordable. Without current, the work simply stops.',
		attribution: 'Reported by Africanews / AP, 2024.'
	},
	{
		id: 'rural-counterpoint',
		chapter: 4,
		kind: 'reported',
		place: 'Southern Province',
		title: 'The people the grid forgot',
		body: 'In the worst-hit provinces, mothers cooked differently and children did homework by candlelight, but the deeper loss was food: scorched maize, dying livestock. UNICEF warned that more than 50,000 children under five were at risk of severe wasting. They never had the mains power the cities mourned; now they were losing their harvest too.',
		attribution: 'Reported by Al Jazeera; malnutrition figure: UNICEF, 2024.'
	},
	{
		id: 'solar-forward',
		chapter: 5,
		kind: 'representative',
		place: 'Zambia',
		title: 'A different thing to run on',
		body: 'The rains returned and the lake began to refill into 2025-26. But a country that draws more than 80% of its power from one reservoir learned what a single dry year can cost, and why solar and a wider mix are no longer optional.',
		attribution: 'Forward-looking context; lake recovery per Zambezi River Authority, 2025-26.'
	}
];

export function momentsForChapter(chapter: number): HumanMoment[] {
	return humanMoments.filter((m) => m.chapter === chapter);
}
