import useFetch from 'fetch-suspense';
import Banlist from '../../../types/banlist';

const API = 'https://api.mtgeni.us';

export default function useBanlistApi(): Banlist[] {
  const banlists: Banlist[] = useFetch(`${API}/commander-banlist`) as Banlist[];

  return banlists;
}
