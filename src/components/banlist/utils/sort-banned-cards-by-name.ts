import BannedCard from '../../../types/banned-card';

export default function sortBannedCardsByName(
  a: BannedCard,
  b: BannedCard,
): -1 | 1 {
  if (a.name < b.name) {
    return -1;
  }
  return 1;
}
