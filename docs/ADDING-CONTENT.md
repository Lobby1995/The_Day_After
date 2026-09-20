# Adding content

All events are written with `defEv()`. English and Hebrew sit side by side as `[en, he]` pairs, so a missing translation is easy to see.

## A new event

Add it to the file that fits (see the README layout). Example, a country event:

```js
defEv({
  id: 'c_uk_6',                                   // unique. c_ = country event
  cond: inC('uk', 5, () => G.w.order >= 40),       // only in the UK, after turn 5, while order still holds
  w: 16,                                          // how likely it is to be picked, relative to others
  t: ['The Tea Van', 'משאית התה'],                 // title
  x: ['A tea van sits in a lay-by...', 'משאית תה חונה בשוליים...'],   // the situation
  ch: [
    { l: ['Join the queue', 'להצטרף לתור'],       // choice label
      s: ['A small kindness.', 'חסד קטן.'],        // one-line hint
      check: { stat: 'charisma', dc: 8 },         // the coin flip: which stat, how hard
      win:  ['It goes well...', 'זה הולך טוב...',  { morale: 10, food: 1 }],   // [en, he, effects]
      lose: ['It goes badly...', 'זה הולך רע...',  { morale: -5 }] },
    { l: [...], s: [...], check: {...}, win: [...], lose: [...] }
  ]
});
```

Two choices, both with a `check`, `win` and `lose`. `npm test` fails if anything is missing or untranslated.

### Effects you can use

`hp`, `inf` (infection), `morale`, `humanity`, `food`, `water`, `meds`, `ammo`, `outbreak`, `order` (numbers, positive or negative),
`stat: {stealth: 1}`, `mark: 'haunted'`, `flag: 'name'` / `unflag`, `join: {name, trait, role}`, `lose: 'Name'` (a companion leaves),
`loy: {Name: 1}` (loyalty), `loyAll: -1`.

Other choice options: `cost: {meds: 1}` (unaffordable options are swapped out), `tag: ['doctor']` (only that background sees it), and in `check`: `danger: true` (harder as the outbreak grows), `bg: {mechanic: 2}` (bonus for a background).

### Time and scale

Use `T(n)` for "day n on the 5-year road, scaled to the road being played". `G.w.day` is the current turn.

## A companion story

In `content/events/companions.js`, add one `story({...})` block. It appears a few turns after that companion joins. Supporting them creates a `bond_<Name>` flag, which makes their perks stronger.

## An echo (an early choice returns)

Set a flag in the early event (`flag: 'myFlag'`), then in `echoes.js` add a `defEv` with `cond: () => since('myFlag', 5)` (returns after 5 scaled turns).

## Turning a certain option into a gamble

In `engine/risk.js`, add a row to `TW`: `[eventId, choiceIndex, winProbability, loseEN, loseHE, loseEffects]`.

## An achievement or trophy

In `engine/meta.js`: `A(id, [en, he], [descEn, descHe], () => testUsingG)` for achievements, `Tr(id, tier, [en, he], [descEn, descHe], run => test)` for trophies. Tiers: bronze, silver, gold, platinum. Keep the counts in `tests/content.test.js` in step.

## Checklist before committing

```bash
npm test      # content + UI
npm run sim   # if you changed numbers: survival should stay roughly 55-75%
```
