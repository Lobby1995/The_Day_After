# Architecture

## The one big idea

The game is a **single plain script** with three layers, built into **one HTML file**.

```
   content            engine                 presentation
 (what happens)   (the rules, no DOM)      (what you see)
 events, text  ->  odds, state, turns  ->  screens, sprites, i18n
```

- **Content** is data: events written with `defEv()`, each with English and Hebrew side by side.
- **Engine** is logic: it knows nothing about HTML. That is why tests and the balance simulation can run it directly under Node.
- **Presentation** reads the engine's state `G` and draws it. It never changes the rules.

There are no modules and no bundler on purpose. The game is one file with zero dependencies, it opens from disk, and it can be pasted anywhere. The cost is that **load order matters**, so it is written down in one place: `scripts/manifest.js`. The build refuses to run if a file in `src/js` is not listed there.

## Build

`scripts/build.js` reads the manifest, joins the JS files in order, joins the CSS, and puts both into `src/index.html`. Output: `dist/index.html`. `npm run dev` does the same on every browser refresh.

## State

Everything about a run lives in one object, `G` (saved to `localStorage` after each turn):

| field | meaning |
|---|---|
| `G.p` | the player: stats, health, infection, morale, humanity, supplies, `group` (companions), `marks` |
| `G.w` | the world: `day`, `outbreak`, `order` (and `prev`, used for the trend arrows) |
| `G.flags` | things that happened (`barricaded`, `keptGate`, `bond_Tiago`, `lost_Mara`...) |
| `G.fday` | the day each flag was set, so echo events can wait before returning |
| `G.st` | run counters for achievements (flips won, loot taken...) |
| `G.cur` | the current question: which event, its two options, and the result once chosen |
| `G.over` | set when the run ends: `survived`, `death` or `turned` |

Browser storage keys: `daysafter.save.v2` (the run, with `G.v` as a format version), `daysafter.meta.v1` (achievements and trophies), `daysafter.lang`.

## A turn

1. `pickEvent()` first plays any **story chapter** that is due (see `content/story/engine.js`), otherwise chooses an event from the pool: conditions (`cond`), weights (`w`), repeat limits (`max`, `once`), and a lifeline if supplies hit zero.
2. `startTurn()` builds it (`pre` for random setup, `build` for events made at play time) and picks exactly **two** options to show.
3. The player picks one. `chance()` computes the odds from the stat, background, companions, gear, marks, world state (outbreak makes danger harder, order helps charm), and `choose()` rolls.
4. `applyFx()` applies the outcome (numbers, flags, companions, stats) and returns the chips shown to the player.
5. `advanceDay()` runs the overnight simulation: hunger, healing, companion perks, and the world drifting.

## Rules the content must follow

- Every question has exactly two options.
- Almost every option is a gamble (`check` + `win` + `lose`). A certain option (`out`) is a deliberate exception: about 12% of questions.
- Hebrew is written **gender-neutral**: past-tense narration and infinitive labels. Avoid second-person "אתה/את". `npm test` enforces this for "אתה".
- Colors come only from the palette in `src/styles/01-base.css`.

## Tests

- `tests/content.test.js` - every event has Hebrew, well-formed outcomes, and both options can be played.
- `tests/ui-smoke.js` - drives the real UI through a fake browser: full playthroughs on all three roads in both languages, restart flows, language switching.
- `tests/ui-trophies.js` - trophy room, tabs, end-screen rewards.
- `tests/balance-sim.js` - bots play thousands of runs to report survival rates and the share of risk-free questions. Run it after changing numbers.

## The world view

Four files in `src/js/ui/`: `world-scenes.js` (the places, and which place a question happens in), `world.js` (isometric drawing and walking; pure, it knows nothing about the game's questions), `world-ui.js` (the button, the keys and taps, the loop, and hiding the question until the survivor arrives), and `share.js` is unrelated. The world view never changes the game's state: choices and rolls are the same as in the text view. `tests/tools/soft-canvas.js` is a small software canvas used to draw places to PNG without a browser.

