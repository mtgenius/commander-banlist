import Banlist from '../../../types/banlist';
import BannedCard from '../../../types/banned-card';

export default function reduceBanlistToBannedCards(
  bannedCards: BannedCard[],
  banlist: Banlist,
  banlistIndex: number,
): BannedCard[] {
  for (const card of banlist.cards) {
    const bannedCardIndex: number = bannedCards.findIndex(
      ({ name }: BannedCard): boolean => name === card,
    );
    if (bannedCardIndex === -1) {
      bannedCards.push({
        formatIndices: [banlistIndex],
        name: card,
      });
    } else {
      bannedCards[bannedCardIndex].formatIndices.push(banlistIndex);
    }
  }
  return bannedCards;
}
