# When the Lake Ran Dry

A data-driven, human-centered scrollytelling story about Zambia's 2024 drought — how
Lake Kariba draining to record lows took the country's lights, and who paid for it.

In 2024 an El Niño drought drained Lake Kariba — the source of **over 80% of Zambia's
electricity** — to record lows, and the country fell into blackouts of up to ~20 hours a
day. But the deepest truth is about inequality: the ~90% of rural Zambians the grid never
reached still bore the worst of the drought — failed harvests, dead livestock, child
malnutrition — while national attention fixed on urban blackouts.

> **Status:** project scaffolding. The full build is a five-chapter scrollytelling
> experience on one synchronized 2024 timeline. See [`docs/build-brief.md`](docs/build-brief.md).

## The mechanic

One shared 2024 timeline drives every visual. As scroll position advances time: the lake
level falls, the satellite lake shrinks, a 24-hour ring empties toward ~3 lit hours,
counters tick, and the map pans from national to local. The synchronization *is* the
argument — water and light and livelihood declining together. The proof-of-concept for
this mechanic lives in [`concept/kariba-concept-scene.html`](concept/kariba-concept-scene.html)
(open it in a browser).

## Stack

- **Frontend:** SvelteKit
- **Maps:** Mapbox GL JS (satellite/raster layers, national→local pans)
- **Scroll:** Scrollama
- **Charts/animation:** D3 + Svelte transitions (custom-drawn)
- **Offline data prep:** Python (pandas, geopandas, rasterio, rioxarray)
- **Backend:** none at runtime — static JSON/GeoJSON/images only
- **Hosting:** Vercel

All data is pre-processed offline; the page only animates static assets. No live API calls
at runtime.

## Honesty notes

- Real, sourced people get on-screen attribution. Any immersive "day in the life" beat that
  no single article fully supports is a **clearly-labeled representative vignette**, grounded
  in documented conditions. No invented quotes on real named individuals; no composite passed
  off as a real person.
- The hours-of-mains-power series is **assembled from ZESCO announcements and news reports**,
  not measured — it is labeled approximate wherever it appears.
- Every dataset's source, date, and access method is recorded in the repo and surfaced in-app.

## Repository layout

```
concept/   working concept scene proving the core mechanic
docs/       build brief and design notes
```

(SvelteKit app, data-prep scripts, and processed assets land here as the build proceeds.)
