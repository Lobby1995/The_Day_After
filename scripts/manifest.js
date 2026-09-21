/*
 * Load order for the game. The game is ONE plain <script> (no modules, no bundler), so order matters:
 * later files use names defined by earlier ones. Add a new file here, in the right place.
 */
const hebrew=[
  'js/i18n/he-core.js',       // locations, backgrounds, people, names, and the first events in Hebrew
  'js/i18n/he-events.js',     // Hebrew text for the original events
  'js/i18n/he-world.js',      // Hebrew for the yearly world/order summaries
  'js/i18n/he-extras.js',     // Hebrew for later additions (recruits, loot, group events)
];
module.exports={
  /* 1. the rules of the game: data, events, risk, achievements, game loop. No DOM in here. */
  engine:[
    'js/engine/core.js',                          // constants, countries, backgrounds, stats, defEv() helper
    'js/content/events/base.js',                  // openers, story arcs, everyday encounters
    'js/content/events/time-spanning.js',         // year review, winter, planting, settlements
    'js/content/events/forks-and-encounters.js',  // base vs nomad, raiders, sieges, zombie encounters
    'js/content/events/loot-and-group.js',        // loot dilemmas and companion events
    'js/content/events/country.js',               // events that belong to one country only
    'js/content/events/companions.js',            // one personal story per companion
    'js/content/events/echoes.js',                // early choices coming back later
    'js/content/prologue.js',                    // day one: three scenes before the first night
    'js/content/story/engine.js',                 // story chapters: registry and scheduler
    'js/content/story/brazil.js',                 // country arc: Brazil, "Rooftops"
    'js/content/story/israel.js',                 // country arc: Israel, "The Shelter"
    'js/content/story/doctor.js',                 // character arc: the doctor, plus doctor-in-country chapters
    'js/engine/risk.js',                          // turns "certain" options into gambles
    'js/engine/meta.js',                          // achievements and trophies (saved between runs)
    'js/engine/game.js',                          // newGame, pickEvent, chance, choose, advanceDay
  ],
  hebrew,
  /* 2. what the player sees */
  presentation:[
    'js/ui/sprites.js',           // pixel-art survivors painted on canvas
    ...hebrew,
    'js/i18n/ui-strings.js',      // every interface string, English + Hebrew, and language helpers
    'js/ui/trophies.js',          // trophy room and pop-ups
    'js/ui/screens.js',           // title, creation, play, ending, wiring (must be last: it starts the app)
  ],
  styles:[
    'styles/01-base.css','styles/02-header-and-buttons.css','styles/03-title.css','styles/04-creation.css',
    'styles/05-play.css','styles/06-side-panels.css','styles/07-ending-and-dialog.css','styles/08-trophies-and-toasts.css','styles/09-creation-wizard.css',
  ],
};
