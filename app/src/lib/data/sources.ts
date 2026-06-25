/**
 * Provenance for every dataset and anchor figure used in the story.
 * Surfaced in-app (see docs/build-brief.md §5, §8). Each entry records what the
 * number is, where it came from, its date, and how it was accessed.
 */

export interface Source {
	id: string;
	label: string;
	detail: string;
	publisher: string;
	date: string;
	/** How the data was obtained / assembled */
	access: string;
	url?: string;
	/** True when the series is compiled/estimated rather than directly measured */
	approximate?: boolean;
}

export const sources: Record<string, Source> = {
	kariba_storage: {
		id: 'kariba_storage',
		label: 'Kariba usable storage',
		detail:
			'~8.3% usable storage on 2 Sep 2024, versus ~26% a year earlier, a record low for the reservoir.',
		publisher: 'Zambezi River Authority',
		date: '2024-09-02',
		access: 'Compiled from ZRA weekly hydrology bulletins into a 2024 series.',
		url: 'https://www.zambezira.org/hydrology/lake-levels'
	},
	kariba_level: {
		id: 'kariba_level',
		label: 'Lake level',
		detail: 'Weekly lake level (m above datum), Kariba reservoir.',
		publisher: 'Zambezi River Authority',
		date: '2024',
		access: 'ZRA weekly bulletins; cross-checked against NASA G-REALM satellite altimetry.',
		url: 'https://www.zambezira.org/hydrology/lake-levels'
	},
	power_hours: {
		id: 'power_hours',
		label: 'Hours of mains power',
		detail:
			'Approximate daily hours of mains power, falling toward ~3 hours/day; load-shedding reached ~20 hours/day. Kariba North Bank shutdown announced 14 Sep 2024.',
		publisher: 'ZESCO announcements & news reporting',
		date: '2024',
		access:
			'No clean feed exists. Assembled as a dated chronology from ZESCO statements and news reports; approximate, not measured.',
		approximate: true
	},
	grid_hydro: {
		id: 'grid_hydro',
		label: 'Grid dependence on hydro',
		detail: "Over 80% of Zambia's electricity is hydropower, the bulk of it from Kariba.",
		publisher: 'ZESCO / IEA / news reporting',
		date: '2024',
		access: 'Widely reported figure; cited at point of use.'
	},
	rural_access: {
		id: 'rural_access',
		label: 'Rural electricity access',
		detail:
			'Around 90% of rural Zambians lacked electricity access before the crisis. They never had the grid power the country mourned losing.',
		publisher: 'World Bank / national statistics',
		date: '2023',
		access: 'Pre-crisis baseline; cited at point of use.'
	},
	rainfall: {
		id: 'rainfall',
		label: 'Rainfall anomaly',
		detail:
			'The 2023-24 rainy season delivered a severe deficit across southern and western Zambia during the planting window.',
		publisher: 'CHIRPS (Climate Hazards Center)',
		date: '2024',
		access: 'CHIRPS rainfall + anomaly, exported via Climate Engine / Earth Engine.',
		url: 'https://www.chc.ucsb.edu/data/chirps'
	},
	satellite: {
		id: 'satellite',
		label: 'Satellite imagery',
		detail: 'Lake Kariba shrinking across 2024; the brick-red historic high-water stain exposed.',
		publisher: 'Copernicus Sentinel-2 / NASA MODIS',
		date: '2024',
		access: 'Dated frames exported from Copernicus Browser / NASA Worldview; pre-processed offline.',
		url: 'https://browser.dataspace.copernicus.eu'
	},
	malnutrition: {
		id: 'malnutrition',
		label: 'Child malnutrition risk',
		detail:
			'More than 50,000 children under five at risk of severe wasting, the deadliest form of malnutrition, across drought-hit areas.',
		publisher: 'UNICEF',
		date: '2024',
		access: 'UNICEF Zambia drought response reporting.',
		url: 'https://www.unicef.org/zambia'
	},
	food_security: {
		id: 'food_security',
		label: 'Food security',
		detail:
			'Crop failure and livestock losses concentrated in Southern Province and other worst-hit areas; emergency food-insecurity classifications.',
		publisher: 'FEWS NET / WFP',
		date: '2024',
		access: 'FEWS NET / WFP food-security classifications and maps.',
		url: 'https://fews.net/southern-africa/zambia'
	},
	population: {
		id: 'population',
		label: 'Population distribution',
		detail: 'Where people live across Zambia, used to weigh who the worst-hit areas contain.',
		publisher: 'WorldPop',
		date: '2020',
		access: 'WorldPop gridded population, summarized to provinces.',
		url: 'https://www.worldpop.org'
	},
	provinces: {
		id: 'provinces',
		label: 'Province boundaries',
		detail: 'Zambia administrative level 1 (province) boundaries.',
		publisher: 'geoBoundaries (gbOpen)',
		date: '2023',
		access: 'geoBoundaries ZMB ADM1, simplified; baked to static GeoJSON at build time.',
		url: 'https://www.geoboundaries.org'
	}
};
