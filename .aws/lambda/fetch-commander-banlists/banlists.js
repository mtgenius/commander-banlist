const brawlParser = require('./parsers/brawl');
const duelParser = require('./parsers/duel');
const mtgoParser = require('./parsers/mtgo');
const wotcParser = require('./parsers/wotc');

module.exports = [
  /*
  // The MTG Commander banlist is synonymous with the Wizards of the Coast
  //   banlist, except it is missing dexterity cards.
  {
    longName: 'MTG Commander',
    shortName: 'Multiplayer',
    source: 'http://mtgcommander.net/rules.php',
    parse: parseCommander,
  },
  */
  {
    longName: 'Wizards of the Coast',
    shortName: 'Multiplayer',
    source: 'https://magic.wizards.com/en/content/commander-format',
    parser: wotcParser,
  },
  {
    longName: 'Brawl',
    shortName: 'Brawl',
    source: 'https://magic.wizards.com/en/game-info/gameplay/formats/brawl',
    parser: brawlParser,
  },
  {
    longName: 'Magic the Gathering Online (30 Life)',
    shortName: 'MTGO 1v1',
    source:
      'https://magic.wizards.com/en/game-info/gameplay/rules-and-formats/banned-restricted/magic-online-commander',
    parser: mtgoParser,
  },
  {
    longName: 'Duel Commander (20 Life)',
    shortName: 'Duel 1v1',
    source: 'http://www.duelcommander.com/banlist/',
    parser: duelParser,
  },
];
