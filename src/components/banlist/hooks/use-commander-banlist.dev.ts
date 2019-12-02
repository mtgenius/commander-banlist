import mockCommanderBanlist from '../../../constants/mock-commander-banlist.json';
import Banlist from '../../../types/banlist';

export default function useCommanderBanlist(): Banlist[] {
  return mockCommanderBanlist;
}
