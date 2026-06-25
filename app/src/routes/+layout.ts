// The whole story is static: data is pre-processed offline and baked into the build.
// Prerender every route to static HTML — no runtime API calls (see docs/build-brief.md §4).
export const prerender = true;
export const ssr = true;
