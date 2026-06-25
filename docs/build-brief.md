# Build Brief — "When the Lake Ran Dry"
### An independent, human, data-driven scrollytelling story about Zambia's 2024 drought

> **Companion file:** `kariba-concept-scene.html` is a working concept scene for this build — open it; it demonstrates the core mechanic (one synchronized timeline driving the lake-drain + the 24-hour "day going dark" ring). This brief builds the full multi-chapter experience around that mechanic, with people at the center.
>
> This is a **standalone project with its own repository.** It is a piece of data journalism that stands on its own merits — its name, framing, README, and content reference nothing but the subject itself.

---

## 0. Your mission (read first)

Build **"When the Lake Ran Dry"**: a **scrollytelling** web story about Zambia's 2024 drought — how Lake Kariba draining took the country's lights, and who paid for it.

Three non-negotiables:
1. **Days, not weeks.** Five scenes done beautifully beats fifteen done roughly. Cut scope before you cut polish.
2. **It must move people, not just inform them.** The data is the skeleton; **the people are the heart.** See §2.
3. **All data is pre-processed offline; the page only animates static assets.** No live API calls at runtime.

---

## 1. The story in one line

In 2024, an El-Niño drought drained Lake Kariba — the source of **over 80% of Zambia's electricity** — to record lows, and the country fell into blackouts of up to ~20 hours a day. But the deepest truth is about **inequality**: the ~90% of rural Zambians the grid never reached still bore the worst of the drought — failed harvests, dead livestock, child malnutrition — while national attention fixed on urban blackouts. *Water left, light left, and the people already on the margins paid the most.*

Anchor figures (real; verify/finalize against primary sources, cite each):
- Kariba usable storage: **~8.3% on 2 Sep 2024 vs ~26% a year earlier** (Zambezi River Authority).
- Power cuts reaching **~20 hours/day**; Kariba North Bank shutdown announced **14 Sep 2024** (ZESCO/news).
- **Over 80%** of Zambia's grid is hydro; **~90%** of rural Zambians lacked electricity *before* the crisis.
- **50,000+** under-five children at risk of severe wasting (UNICEF).

---

## 2. The heart: people, not just data  ← the priority for this build

Most data stories stay at the altitude of charts. This one must **descend to eye level repeatedly.** Every chapter pairs a *system view* (the data, the map, the satellite) with a *human view* (a named, sourced person or a clearly-labeled representative life). The rhythm is the whole craft: **zoom out to the data, zoom in to a life, back out.**

Documented human texture to build from (all from public reporting — use with attribution):
- **The café that became an office.** In Lusaka, people hauled laptops — one woman her entire desktop tower — to **Mercato Café** because it had a diesel generator; tables strung with power strips. (AP / Euronews, Sep 2024.)
- **The welder who went dark.** A small-business welder describing five days without power, his diesel generator sputtering out mid-sentence because fuel was unaffordable. (Africanews / AP.)
- **The rural counterpoint.** Mothers cooking differently, children doing homework by candlelight; in worst-hit provinces, scorched maize and dying livestock; **50,000+** children at risk of the deadliest malnutrition. (Al Jazeera, UNICEF.)

How to use them, **honestly** — the credibility of the whole piece depends on this (see §9):
- Prefer **real, sourced** people and details, **with on-screen attribution** ("Reported by AP, Sept 2024").
- Where you need an immersive "a day in the life" beat that no single article fully supports, build a **clearly-labeled representative vignette** ("A representative day, drawn from reporting across Lusaka") — grounded in documented conditions.
- **Never fabricate a quote and attribute it to a real named person.** Never present a composite as a specific real individual.
- Let the people carry emotion; let the data carry credibility. Neither alone is enough.

**The inequality contrast is the spine of the human layer:** urban Lusaka (visible, covered — café, welder) vs. rural Southern Province and other worst-hit areas (invisible, uncovered — crops, livestock, children). It is the most moving version of the story and the most honest one.

---

## 3. Structure — five chapters, one timeline

Each chapter foregrounds one dataset and at least one human moment. All share a single **2024 timeline**; scrolling advances time, and the system + human views move together.

1. **The rains that didn't come.** CHIRPS rainfall-anomaly map of Zambia; the deficit spreading province by province. *Human:* a farmer watching the sky in planting season. Sets the clock to early 2024.
2. **The lake remembers.** Sentinel-2 satellite frames crossfading as Kariba shrinks; the brick-red historic high-water stain exposed. The ZRA level line falls. *Human:* a boat operator / fisher on a receding shore.
3. **The day goes dark.** *(This is the concept-scene mechanic — reuse it.)* Storage → generation → the 24-hour ring emptying to ~3 lit hours. *Human:* the Mercato Café and the welder — urban life rerouted around the generator.
4. **The unequal toll.** WorldPop + FEWS NET: who lives in the worst-hit areas, crop failure, the malnutrition figure. The map leaves the cities for the countryside. *Human:* the rural counterpoint — the people who never had the power that everyone's mourning, now losing their food.
5. **What a country runs on.** The systemic close: one climate-dependent source; the lake later recovering (it did, into 2025–26) but the lesson standing. *Human:* a forward-looking voice — solar, resilience — without false neatness.

Region focus (decided; stated so the agent isn't blocked): use **Lusaka** for the urban human texture and **Southern Province** (singled out in reporting for maize/livestock losses) as the rural anchor for Chapter 4. National view for Chapters 1–2.

---

## 4. The core mechanic (already proven in `kariba-concept-scene.html`)

**One shared 2024 timeline drives every visual.** As scroll position advances time: the lake-level line falls, the satellite lake shrinks, the 24-hour ring empties, counters tick, the map pans from national to local. The **synchronization is the argument** — water and light and livelihood declining together.

```
[Python, run once offline]
  assemble each dataset → resample onto ONE weekly 2024 timeline
  pre-render satellite frames (national + Kariba) as static images/tiles
        ↓ exports
[static JSON timeline + GeoJSON + image frames + human-story content (MD/JSON)]
        ↓ consumed by
[SvelteKit + Mapbox + Scrollama]  ← scroll position → scene state; pure animation over static assets
```

No runtime API calls. No live satellite fetches. Everything baked at build time.

---

## 5. Data sources & how to assemble each
- **Kariba lake levels (spine):** Zambezi River Authority weekly updates (`zambezira.org/hydrology/lake-levels`, plus their X/Facebook posts). Published as weekly text, **not** a clean CSV — compile into a weekly 2024 series. NASA **G-REALM** satellite-altimetry lake levels are an alternative/cross-check (a real downloadable dataset).
- **Satellite imagery (the lake shrinking):** Copernicus **Sentinel-2** (Copernicus Browser / Sentinel Hub) and/or NASA **MODIS** (Worldview). Export a handful of dated frames; pre-process to consistent extent/levels.
- **Rainfall / drought:** **CHIRPS** rainfall + anomaly (via Climate Engine or Earth Engine export). Produce simple province-level anomaly rasters/choropleth.
- **Hours of mains power (handle carefully):** **no clean feed exists.** Compile a **dated chronology from ZESCO announcements and news reports**; present as approximate, sourced. Label it as such on screen. Do not imply precision it doesn't have.
- **Human toll:** **FEWS NET** / **WFP** food-security classifications and maps; **UNICEF** for the malnutrition figure; **WorldPop** for population distribution.
- **Human stories:** reputable journalism (AP, Reuters, Al Jazeera, Euronews, Africanews, local Zambian outlets). Attribute on screen.

For every dataset: store the **source + date + access method** in the repo, and surface provenance in the UI.

---

## 6. Stack & architecture
- **Frontend: SvelteKit** — a strong fit for scrollytelling: fine-grained reactivity and built-in transitions make timeline-driven animation clean and fast, with minimal runtime weight.
- **Maps: Mapbox GL JS** — for the satellite/raster layers and the national→local pans.
- **Scroll: Scrollama** (Intersection-Observer based) — the standard scrollytelling driver.
- **Charts/animation: D3** + Svelte transitions for the level line, ring, counters. Custom-drawn, not default chart components.
- **Backend: none at runtime.** Static JSON/GeoJSON/images served with the app.
- **Offline prep: Python** (pandas, geopandas, rasterio, rioxarray; Earth Engine optional for CHIRPS/Sentinel export).
- **Hosting: Vercel.**

---

## 7. Design principles
- **Cinematic and somber, never sensational.** This is real hardship. Restraint reads as respect.
- **Palette grounded in the subject** (see the concept scene): nightfall ground, receding Zambezi blue, copper for electricity/light, bone/dust for the exposed lakebed, brick-red for the historic waterline. Avoid generic AI defaults (cream+terracotta; black+acid-green).
- **One signature element per chapter.** The draining lake; the emptying 24-hour ring; the national→rural map flight. Spend boldness once per scene; keep the rest quiet.
- **Type with personality, used with discipline.** One characterful display face, one clean face for data/UI.
- **Motion serves meaning.** Things move *because time is passing*, not for decoration. Ease, don't snap. **Respect `prefers-reduced-motion`** (render meaningful static states).
- **Numbers as human sentences:** "Power for three hours a day," not a bare stat grid.
- **Full-bleed satellite moments** — let the imagery breathe; it's the most arresting asset.

---

## 8. Definition of done
- [ ] Five chapters scroll cleanly; scroll position drives synchronized scene state on one 2024 timeline.
- [ ] At least one genuine, **attributed** human moment per chapter; the urban↔rural inequality contrast is unmistakable.
- [ ] The Chapter 3 ring + lake-drain mechanic works (reuse/adapt the concept scene).
- [ ] Every dataset's provenance (source, date) is visible in-app; the load-shedding series is labeled approximate.
- [ ] Works on mobile width; `prefers-reduced-motion` respected; keyboard/scroll accessible.
- [ ] Clean public repo + short README: what it is, why it was built, the data sources, the offline-prep approach, and the honesty note on representative vignettes.
- [ ] A 60–90s screen recording **and** a live Vercel link for sharing.

---

## 9. Risks & guardrails
- **Integrity of the human layer (highest priority).** Real sourced people get attribution; representative beats get clearly labeled; **no invented quotes on real named individuals**, no composite passed off as a real person. The piece's credibility — and the maker's — rests on this. Being visibly scrupulous about it is a strength, not a limitation.
- **Data honesty.** The hours-of-power series is assembled, not measured — label it. Don't dress approximations as precision.
- **Scope creep / scrollytelling balloon.** Five chapters, fixed. New ideas → v2 notes, not tasks. Test every addition: *does it make the story land harder or ship sooner?*
- **Live data temptation.** Everything is pre-processed offline (§4). If tempted to fetch satellite/levels at runtime, stop.
- **Tone.** Somber, dignified, specific. Not disaster-porn, not falsely upbeat. The recovery (2025–26) can be acknowledged without erasing the lesson.
- **SvelteKit/Scrollama ramp** (if unfamiliar): budget a little time; lean on docs.

---

*The bet for this piece: make a non-technical person* feel *a data story about a real country — water, light, and the people the system forgot — told with rigor and built with taste.*
