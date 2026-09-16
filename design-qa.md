# Design QA — New Talents responsive demo

## Evidence

- Source visual truth: `references/approved-summary.png`, supported by `approved-statistics.png`, `approved-matches.png`, and `approved-videos.png`.
- Browser-rendered desktop implementation: `qa-desktop.jpg`.
- Browser-rendered mobile implementation: `qa-mobile.jpg`.
- Normalized mobile comparison: `qa-comparison-mobile.jpg`.
- State: public player passport, Resumen selected, dark emerald theme.

## Viewports and normalization

- Source summary: 852 × 1841 px.
- Mobile browser capture: 390 × 844 CSS px at device density 1.
- The source was normalized to 390 × 844 only for the combined composition comparison; content density was judged separately because the source is a full-page board while the implementation capture is one viewport.
- Combined comparison: 780 × 844 px, source on the left and implementation on the right.
- Desktop browser viewport: 1348 × 958 CSS px. The full-page evidence was normalized to 1200 px width and saved as 1200 × 1150 px.

## Full-view comparison

- The implementation preserves the approved hierarchy: player identity, four passport sections, capability profile, scout-oriented statistics, match evidence, and video evidence.
- The responsive implementation intentionally reorganizes the mobile source into a two-column desktop composition while preserving its content priority.
- The New Talents logo has its own header region and never overlaps the player portrait.
- Player identity is rendered outside the tab content and remains present in Resumen, Estadísticas, Partidos, and Videos.

## Focused comparison

- Header and identity: verified separately at desktop and 390 px mobile width; portrait crop, brand separation, identity hierarchy, and rating contrast are readable.
- Navigation: verified in the browser on all four tabs. Mobile navigation sits below the player profile and does not cover content.
- Glass surfaces: borders, blur, emerald tint, inner highlight, and restrained lime glow match the approved login language.
- Radar and metrics: labels remain legible, values preserve the approved order, and the lime series is visually dominant over the comparison series.

## Findings and comparison history

### Iteration 1

- P1: the original demo rendered inside a simulated phone instead of as a responsive page.
  - Fix: rebuilt with the web prototype runtime and full-width responsive layouts.
- P1: player identity disappeared outside Resumen.
  - Fix: moved `PlayerIdentity` above the tab-controlled content.
- P1: logo competed with the player photo.
  - Fix: placed branding in an independent global header.
- P2: the first desktop portrait crop removed part of the head.
  - Fix: corrected portrait position and scale.
- P2: the first responsive mobile navigation floated over statistics.
  - Fix: returned it to the approved position below the player profile and made it sticky only while scrolling.

### Final pass

- Fonts and typography: Inter is bundled locally; weights, hierarchy, tracking, and line wrapping are consistent and readable.
- Spacing and layout rhythm: desktop uses a 1440 px maximum frame and balanced two-column summary; mobile uses a compact single column without horizontal overflow.
- Colors and visual tokens: deep green-black, translucent emerald glass, off-white text, muted gray-green support text, and lime actions are consistent.
- Image quality and asset fidelity: local raster assets are sharp, correctly cropped, and maintain the approved nocturnal scouting direction.
- Copy and content: football-specific labels, FEM evidence, match information, and video descriptions match the approved product scope.
- Accessibility: semantic buttons, visible active states, labels, reduced-motion handling, and high-contrast actions are present.

## Primary interactions tested

- Navigation through Resumen, Estadísticas, Partidos, and Videos on desktop and mobile.
- Player identity visibility after every tab change.
- Period selector.
- Match filtering and match-detail modal.
- Video-category filtering and video modal.
- Console checked: no application errors.

## Follow-up polish

- P3: replace the demonstration player portrait if the final brand photoshoot supplies an exact approved asset.

final result: passed
