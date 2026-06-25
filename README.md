# When the Lake Ran Dry

A data-driven, human-centered scrollytelling story about Zambia's 2024 drought: how
Lake Kariba draining to record lows took the country's lights, and who paid for it.

In 2024 an El Niño drought drained Lake Kariba, the source of **over 80% of Zambia's
electricity**, to record lows, and the country fell into blackouts of up to ~20 hours a
day. But the deepest truth is about inequality: the ~90% of rural Zambians the grid never
reached still bore the worst of the drought: failed harvests, dead livestock, child
malnutrition, while national attention fixed on urban blackouts.

> **Status:** five chapters built and scrolling on one synchronized 2024 timeline.
> See [`docs/build-brief.md`](docs/build-brief.md) for the full brief.

## The five chapters

One continuous 2024 clock runs the whole story; scrolling advances time and every
visual reads from it.

1. **The rains that didn't come**: a Zambia rainfall-deficit map filling province by
   province (wet north → dry south).
2. **The lake remembers**: a schematic satellite view of Kariba retreating and the ZRA
   level line falling.
3. **The day goes dark**: the signature mechanic: the draining lake cross-section beside
   the 24-hour ring emptying toward ~3 lit hours.
4. **The unequal toll**: the map flies from the nation to Southern Province; the
   50,000-children malnutrition figure counts up.
5. **What a country runs on**: the lake recovers into 2025-26, but the lesson stands.

A fixed timeline HUD shows the current date, usable storage, and hours of power, so the
synchronization is always legible.

## The mechanic

One shared 2024 timeline drives every visual. As scroll position advances time: the lake
level falls, the satellite lake shrinks, a 24-hour ring empties toward ~3 lit hours,
counters tick, and the map pans from national to local. The synchronization *is* the
argument: water and light and livelihood declining together. The proof-of-concept for
this mechanic lives in [`concept/kariba-concept-scene.html`](concept/kariba-concept-scene.html)
(open it in a browser).

## Stack

- **Frontend:** SvelteKit
- **Maps:** Mapbox GL JS (satellite/raster layers, national→local pans)
- **Scroll:** Scrollama
- **Charts/animation:** D3 + Svelte transitions (custom-drawn)
- **Offline data prep:** Python (pandas, geopandas, rasterio, rioxarray)
- **Backend:** none at runtime; static JSON/GeoJSON/images only
- **Hosting:** Vercel

All data is pre-processed offline; the page only animates static assets. No live API calls
at runtime.

## Honesty notes

- Real, sourced people get on-screen attribution. Any immersive "day in the life" beat that
  no single article fully supports is a **clearly-labeled representative vignette**, grounded
  in documented conditions. No invented quotes on real named individuals; no composite passed
  off as a real person.
- The hours-of-mains-power series is **assembled from ZESCO announcements and news reports**,
  not measured, and it is labeled approximate wherever it appears.
- Every dataset's source, date, and access method is recorded in the repo and surfaced in-app.

## Run it

```bash
cd app
npm install
npm run dev        # http://localhost:5173
npm run build      # static build via adapter-vercel
```

On Vercel, set the project's **Root Directory to `app`**.

## Repository layout

```
app/                     SvelteKit app
  src/lib/story.svelte.ts  the shared 2024 clock (the spine)
  src/lib/data/            timeline, sources, human stories, provinces, GeoJSON
  src/lib/components/      Scrolly engine, timeline HUD, human-moment & provenance cards
  src/lib/visuals/         lake cross-section, power ring, maps, sparklines, counter
  src/lib/chapters/        the five chapters
concept/                 working concept scene proving the core mechanic
docs/                    build brief
```

The Zambia province boundaries are baked in from geoBoundaries (gbOpen, ADM1) at build
time. Lake levels, power hours, and province severities are the concept-scene's
illustrative anchors, clearly labelled; replacing them with the full offline-prep output
(ZRA bulletins, ZESCO/news chronology, CHIRPS, FEWS NET, Sentinel-2 frames) is the next
data pass.
