import Banlist from '../../../types/banlist';
import BannedCard from '../../../types/banned-card';
import { reduceBanlistToBannedCards, sortBannedCardsByName } from '../utils';
import { useCommanderBanlist, useTableCount } from '.';

interface UseBanlist {
  banlists: Banlist[];
  bannedCards: BannedCard[];
  bannedCardsCount: number;
  cardsPerTable: number;
  tableCount: number;
}

export default function useBanlist(tableWidth: number): UseBanlist {
  const banlists: Banlist[] = useCommanderBanlist();

  const tableCount: number = useTableCount(tableWidth);

  const bannedCards: BannedCard[] = banlists
    .reduce(reduceBanlistToBannedCards, [])
    .sort(sortBannedCardsByName);

  return {
    banlists,
    bannedCards,
    bannedCardsCount: bannedCards.length,
    cardsPerTable: Math.ceil(bannedCards.length / tableCount),
    tableCount,
  };
}
