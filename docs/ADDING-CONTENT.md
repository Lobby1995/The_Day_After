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

## A story chapter

Story chapters are the plot. They live in `src/js/content/story/`, one file per country or character arc. A chapter is a two-choice event written with `chapter({...})` instead of `defEv({...})`:

```js
chapter({ id: 'br_3', arc: 'loc:brazil', label: ['Rooftops', 'הגגות'], n: 3, of: 6, at: .36,
  t: ['The Tunnels', 'המנהרות'],
  x: [() => `Text that can read earlier choices: ${flag('br_net') ? 'one thing' : 'another'}.`,
      () => `...the same in Hebrew...`],
  ch: [ /* two choices, each with check, win and lose, exactly like defEv */ ] });
```

- `arc` decides who sees it: `loc:<country>`, `bg:<background>`, or `pair:<background>:<country>` (a background in one specific country).
- `n` is the chapter number inside the arc. Chapters play in order, one after the other.
- `at` is how far through the road the chapter becomes due, from 0 to 1. Due chapters play before any random event, so the plot always advances.
- Set a flag in one chapter (`flag: 'br_tunnels'`) and read it in a later one with `flag('br_tunnels')`. That is how earlier choices change the plot.
- Every outcome automatically carries a little food and water: a story turn replaces a scavenging turn, and without this the plot would starve the player.
- `tests/story.test.js` checks that every arc plays in order on every road and that all text works with and without flags.

Currently written: a six-chapter arc for every country (United States, Brazil, Britain, Japan, Canada, Israel, Australia), a four-chapter arc for every profession (student, teacher, soldier, doctor, politician, journalist, firefighter, mechanic), and one doctor-in-Brazil and one doctor-in-Israel chapter. Set `rich: true` on an arc's shared settings (as Brazil and the United States do) to give its chapters a little water as well as food; the harshest countries need it. In a character arc, `ageAt(lines, l)` and `signAt(l)` (see `story/engine.js`) add a line that depends on the player's age and country.

## The prologue (day one)

Day one is three scenes with no night between them, in `src/js/content/prologue.js`:

1. `pro_<background>` : the moment, one scene per profession. Its text is built from the scene, an age line (three bands: up to 29, 30 to 44, 45 and over), how far the collapse has gone in that country, and a sound or sight that belongs to the country.
2. `pro_age_<band>` : what the player's age puts on their shoulders.
3. `open_<country>` : the country's own night (in `events/base.js`), now with a one-line bridge in front of it that depends on the profession.

To add a profession scene, write another `beat({...})` with a scene, three age lines, and two gambles. Set flags in the choices; later chapters can read them. `tests/prologue.test.js` checks that every profession, country and age band gets a different opening.

## A dilemma (a choice with a price, and no dice)

Some questions are not a gamble. Both options are certain, and the cost is in the words. Use `dil({...})` in `src/js/content/dilemmas.js`:

```js
dil({id:'dil_cache', cond:()=>G.w.day>=T(3), w:45,
  t:['The Boot of the Car','תא המטען'],
  x:['A rifle, or a crate of water...','רובה, או ארגז מים...'],
  ch:[
   {l:['Take the rifle','לקחת את הרובה'], s:['Six rounds, and everyone will see it.','...'],
    out:['You leave the water where it is.','...',{ammo:3, flag:'dil_armed'}]},
   {l:['Take the water','לקחת את המים'], s:[...], out:[...,{water:5, flag:'dil_hydrated'}]}
  ]});
```

- Every dilemma choice must set a **flag**, or it would leave no trace. `tests/dilemmas.test.js` checks this.
- **A flag can change later odds.** Add it to `FLAG_MODS` in `engine/game.js`: `dil_armed:{strength:1,charisma:-1}` means that from then on, strength rolls are one step easier and charisma rolls one step harder. The player sees "a choice you made earlier" among what tips a roll.
- **A flag can bring news later.** Write a follow-up event with `cond:()=>since('dil_armed',6)` (it arrives six scaled turns after the choice). A follow-up can say something the player did not know when they chose, like the one where the person you saved reveals that the other was their sibling (`echo_dil_two`).

## An armed encounter

In `src/js/content/events/armed.js`. One option spends ammunition (`cost:{ammo:2}`) and is much easier (`check:{..., armed:true}` adds +2 and shows as "your gear"); the other never costs any. Give the event `w:armedW` so it appears far more often when the player is carrying ammunition.

## Survival points and the shop

Points are earned when a run ends (`runPoints` in `engine/meta.js`: road covered, surviving, humanity, companions, bonds, story chapters) and whenever an achievement or trophy unlocks. The bank holds at most `BANK_CAP` (1000). The supplies page of the creation wizard spends them on the packs in `SHOP`: food 500 (3 rations), water 500 (3 bottles), medicine 500 (2 doses), ammunition 300 (4 rounds), each with a limit per run. To change a price or a pack size, edit its row in `SHOP`.

## A profession-in-a-country chapter

In `story/pairs.js`, add a scene to `PAIR_SCENE` under the key `'<profession>/<country>'`. The two choices come from `PAIR_CH` for that profession. The doctor in Brazil and Israel are written by hand in `doctor.js`.

## Companions' gifts

What each kind of companion brings is the `PERKS` table in `engine/game.js`: `every` is how many choices between gifts, `res` and `n` are what arrives, and `p` (optional) is the chance. A medic waits until the player is hurt; a bond makes every gift come one choice sooner (never faster than every second choice). Gifts are hidden: the squad panel shows a question mark until a companion's first gift arrives, and the recruit picker never names the role. Descriptions shown after discovery live in `UI.*.roles` in `i18n/ui-strings.js`.

## Sharing

`ui/share.js` draws a card on a canvas (`drawShareCard`) and builds a line of text (`shareText`). The end screen's Share button opens a dialog with the card, the text, and buttons for the phone's share sheet, copy, and save image.

