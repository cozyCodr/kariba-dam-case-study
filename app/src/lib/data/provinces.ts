/**
 * Per-province attributes used by the maps. These severities are INDICATIVE,
 * not precise IPC/CHIRPS pixel values — they encode the well-reported pattern
 * that the 2024 drought hit southern and western Zambia hardest (Southern
 * Province singled out for maize and livestock losses). Labeled as indicative
 * wherever shown; precise rasters are a v2 data-prep task.
 */

export interface ProvinceInfo {
	name: string;
	/** Rainfall deficit severity, 0 (near normal) → 1 (severe) */
	rainDeficit: number;
	/** Drought/food-security toll severity, 0 → 1 */
	toll: number;
	/** Order the deficit became visible through the season (lower = earlier) */
	onset: number;
}

export const provinceInfo: Record<string, ProvinceInfo> = {
	Southern: { name: 'Southern', rainDeficit: 1.0, toll: 1.0, onset: 0 },
	Western: { name: 'Western', rainDeficit: 0.92, toll: 0.85, onset: 1 },
	'North-Western': { name: 'North-Western', rainDeficit: 0.45, toll: 0.4, onset: 6 },
	Central: { name: 'Central', rainDeficit: 0.72, toll: 0.62, onset: 3 },
	Lusaka: { name: 'Lusaka', rainDeficit: 0.7, toll: 0.5, onset: 2 },
	Eastern: { name: 'Eastern', rainDeficit: 0.68, toll: 0.6, onset: 4 },
	Copperbelt: { name: 'Copperbelt', rainDeficit: 0.5, toll: 0.4, onset: 5 },
	Muchinga: { name: 'Muchinga', rainDeficit: 0.4, toll: 0.35, onset: 7 },
	Northern: { name: 'Northern', rainDeficit: 0.32, toll: 0.28, onset: 8 },
	Luapula: { name: 'Luapula', rainDeficit: 0.3, toll: 0.25, onset: 9 }
};

export const PROVINCE_COUNT = Object.keys(provinceInfo).length;
