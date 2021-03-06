const stripMarkup = card =>
  card
    .match(/>([^<]+?)(?:<\/span>)?(?:<\/a>)?<\/li>$/)[1]
    .replace(/&amp;/, '&');

module.exports = function wotcParser(html) {
  // Get card list.
  const list = html.match(/<ul class="list\-links">[\s\S]+?<\/ul><p>/i);
  if (list === null) {
    throw new Error('Could not find card list for WotC!');
  }

  // Get cards from list.
  const cards = list[0].match(
    /<li>(?:<a href=".+?" class="autocard-link" data-image-url=".+?">)?(?:<span style=".+?">)?[^<]+?(?:<\/span>)?(?:<\/a>)?<\/li>/gi,
  );
  if (cards === null) {
    throw new Error('Could not find cards for WotC!');
  }

  // Strip HTML.
  return cards.map(stripMarkup);
};
