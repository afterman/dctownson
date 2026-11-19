# Line Pattern Builder — handoff brief

Paste this into a new chat to pick up work on the Figma plugin without needing the dctownson.com portfolio-site history.

## What it is

A Figma plugin (in the `afterman` team's generative-plugin library) that takes one selected shape and fans it out into a line pattern: each copy is rotated further, moved further, and grown larger than the last, pivoting around a shared, moving corner of the shape. It's the Figma-native sibling of the `bg-pattern` line-generator used on dctownson.com's homepage background, but generalized to work on *any* shape, not just the site's rounded squares.

- **Plugin id:** `4ebc939f-c11e-44e9-a9b7-896c0719f195`
- **Owner:** dctownson@gmail.com, team `afterman` (`team::789598176143524740`)
- **Try it:** https://www.figma.com/file/new?try-tool-resource-content-id=4ebc939f-c11e-44e9-a9b7-896c0719f195&try-tool-resource-type=gen_tool&type=design&mode=design
- A new session can find it again with `list_generative_plugins` / `get_generative_plugin` on that id — no need to re-paste source.

## How it works (the core trick)

Figma's `node.rotation` rotates around a node's *center*. The original SVG pattern on the site instead rotates each line around a shared *corner* that itself drifts a little further each step — that's what makes the lines fan out instead of just spin in place.

The plugin reproduces that by writing `relativeTransform` directly (a 2×3 affine matrix) instead of setting `.rotation`/`.x`/`.y`:
1. Read the selected shape's current anchor-corner position in parent space (`anchorInParentSpace`), using whichever corner the "Pivot corner" dropdown picks (top-left/top-right/bottom-left/bottom-right).
2. For each copy `i` (1..copies-1): grow the size by `(1 + sizeStep/100)^i`, move the pivot point by `i * (stepX, stepY)`, rotate by `i * rotationStep` degrees.
3. Build a fresh `relativeTransform` that places that anchor corner exactly on the moved pivot point, rotated by that angle (`buildTransform`).
4. Clone the original, resize, apply the transform, optionally override corner radius / stroke weight, and group everything at the end.

The original selected shape is left untouched (only the clones carry the geometry math), which keeps the operation safe to undo and avoids floating-point drift on the thing the user actually drew.

## Current parameters (UI, all adjustable)

| Control | Default |
|---|---|
| Copies | 14 |
| Rotation step (°) | 5 |
| Size step (%) | 6 |
| Position step X / Y (px) | 28 / 6 |
| Pivot corner | Top right |
| Override corner radius | off (24 when on) |
| Override stroke weight | off (1.5 when on) |

Last-used values persist via `figma.clientStorage` between runs.

## Known rough edges / open ideas

- **Untested live** — built and type-checked against the Plugin API's documented behavior (dynamic-page access, `relativeTransform` semantics), but never run inside an actual Figma file yet. First real test should be: draw a rounded rectangle, run it with defaults, and sanity-check the fan direction/spacing against the site's own bg-pattern look.
- **Rotation sign/direction** hasn't been visually confirmed to match the site's SVG convention (clockwise-positive) — may need a sign flip on `rotationStep` once seen live.
- **No "match site defaults" preset** — could add a one-click preset that loads the current live `BG_PATTERN` values (lines 20, cornerStep [57, 2.9], heading 56, headingStep -3, size 761, sizeStep 35, radius 30) scaled to a Figma-reasonable starting shape size.
- **Partial-failure handling** is defensive but unexercised — if a clone/resize throws mid-run, it reports how many copies were made and tells the user to undo; worth confirming that path actually fires cleanly.
- **Non-square shapes**: size growth is applied uniformly to width and height (preserves aspect ratio), not tested with something like a long thin rectangle or a line.
- Could add a "reverse/mirror" toggle, or let `rotationStep`/`sizeStep` reference eased curves instead of constant per-copy increments, for more organic spirals.

## Related: the site's own tuner

There's also a standalone, pinned artifact — the **bg-pattern Tuner** (https://claude.ai/artifact/24mArqB9LLzmMzwerX9v7Y) — for tuning the *web* version's `BG_PATTERN` config (the one in `components.js` on dctownson.com) with live sliders and a copy-ready output block. That's a separate, already-independent tool from this plugin; mentioned here only so a future session doesn't conflate the two or rebuild one when the other already exists.
