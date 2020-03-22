import useFetch from 'fetch-suspense';
import Banlist from '../../../types/banlist';

export default function useCommanderBanlist(): Banlist[] {
  const banlists: Banlist[] = useFetch(
    'https://api.mtgeni.us/commander-banlists.json',
  ) as Banlist[];
  return banlists;
}
