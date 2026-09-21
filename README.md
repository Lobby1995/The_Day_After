# Days After

A zombie-apocalypse survival decision game that runs in the browser, in **English and Hebrew** (with full right-to-left support).
Pick a country, a past and an age, then decide how to live through the end of the world. Every choice is a coin flip with visible odds, and every choice changes both you and the world.

**Play it:** https://lobby1995.github.io/The_Day_After/

## Features

- 7 countries that start at different points of the collapse, each with events that never appear anywhere else
- 8 backgrounds (doctor, soldier, mechanic...), age and skin variants, pixel-art portraits drawn in code
- 3 roads: 5, 15 or 20 years (about 20, 36 or 48 decisions)
- Survival points and a supplies shop: every run earns points (up to 1000 can be banked), spent on food, water, medicine, ammunition or a rifle before the next run
- A world view: press World in the header and the game is drawn as a small isometric place (29 of them: rooms for every profession, a ward, a chapel, a harbor, a rooftop, a cellar, a checkpoint and more, chosen by what the question is about). You walk (arrow keys, WASD, or a tap) to the glowing ring, and the question opens there. Zombies see and hear: hold Shift to run, C to sneak, keep quiet and out of sight. How many there are depends on how far the outbreak has gone. A bite costs 3 to 5 health and 5 infection. Every place after the story's first scenes is bigger, with a longer way to the question. Same game underneath: same questions, same rolls
- Companions with hidden gifts that arrive by the number of choices, and a share card at the end of every run
- Armed encounters: rounds and a rifle are worth something, with options that cost ammunition and are much easier
- Dilemmas: choices with a price and no dice, remembered later, sometimes with news the player did not have when they chose
- A prologue on day one: three scenes that change with your profession, your age and your country
- A living world: outbreak, order and your own humanity shift with your choices
- Companions with roles, loyalty, personal stories, and bonds
- Early choices come back later as echoes
- A plot: story chapters at fixed points of the road. Every country has its own six-chapter arc with its own characters, every profession has its own four-chapter arc, every profession-in-a-country has its own chapter, and earlier choices change later chapters
- 50 achievements and 50 trophies, saved between runs

## Run it locally

You need [Node.js](https://nodejs.org) 18 or newer. There are no dependencies to install.

```bash
npm run dev     # http://localhost:8080, rebuilds on every refresh
npm test        # content checks + full click-through of the UI, in both languages
npm run build   # writes dist/index.html, one self-contained file
npm run sim     # balance simulation: survival rates, share of risk-free questions
```

`dist/index.html` works on its own: open it by double-click, or host it anywhere.
(The only outside request is the Google Fonts stylesheet. Without it the game falls back to system fonts.)

## Project layout

```
src/
  index.html                  page shell with two markers where the build injects styles and script
  styles/                     CSS, split by screen (order is listed in scripts/manifest.js)
  js/
    engine/                   the rules. No DOM in here.
      core.js                   constants, countries, backgrounds, defEv() helper
      risk.js                   turns certain options into gambles
      meta.js                   achievements and trophies
      game.js                   newGame, pickEvent, odds, choose, advanceDay
    content/events/           every event in the game, English and Hebrew side by side
      base.js                   openers, arcs, everyday encounters
      time-spanning.js          year review, winter, planting, settlements
      forks-and-encounters.js   base vs nomad, raiders, zombie encounters
      loot-and-group.js         loot dilemmas, companion events
      country.js                events that belong to one country only
      companions.js             one personal story per companion
      echoes.js                 early choices returning later
    content/story/            the plot: chapters per country and per character
    i18n/                     Hebrew text and all interface strings
    ui/                       sprites, screens, trophy room
scripts/
  manifest.js                 the load order of every file (edit this when adding a file)
  build.js                    builds dist/index.html
  serve.js                    dev server
tests/                        content checks, UI click-through, balance simulation
docs/                         architecture and how to add content
.github/workflows/pages.yml   tests, then deploys to GitHub Pages
```

## Deploy to GitHub Pages

1. Push this repo to GitHub (branch `main`).
2. In the repo: **Settings > Pages > Build and deployment > Source: GitHub Actions**.
3. Push again (or run the workflow from the **Actions** tab). Tests run first; if they pass, the site is published.

## Adding content

See [docs/ADDING-CONTENT.md](docs/ADDING-CONTENT.md). Short version: add one `defEv({...})` block with English and Hebrew side by side, run `npm test`.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Credits

Inspired by the format of [legionnaire.xyz](https://legionnaire.xyz). All code, text and art in this repo are original.

## License

Copyright (c) 2026 iskv. All rights reserved. See [LICENSE](LICENSE).
