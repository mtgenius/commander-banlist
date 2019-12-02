import React, { MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';
import Banlist from '../../../types/banlist';
import BannedCard from '../../../types/banned-card';
import { Td, Th } from '../styled';

interface Props {
  banlists: Banlist[];
  bannedCard: BannedCard;
  odd: boolean;
}

const Anchor = styled.a`
  color: #f0f0f0;
  text-decoration: none;
`;

const CardRowTd = styled(Td)`
  border-width: 1px 1px 0 0;
  cursor: help;
  width: 1rem;
`;

const CardRowTh = styled(Th)`
  border-width: 1px 1px 0 1px;
  font-weight: normal;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  text-align: left;
`;

const TrOdd = styled.tr`
  & > td,
  & > th {
    background-color: rgba(255, 255, 255, 0.005);
  }
`;

const Banned = styled(CardRowTd)`
  color: #f04040;
`;

const Unbanned = styled(CardRowTd)`
  color: #204020;
`;

const CARD_HEIGHT = 680;
const CARD_WIDTH = 480;

export default function CardRow({
  banlists,
  bannedCard,
  odd,
}: Props): JSX.Element {
  const [isImageShown, setIsImageShown] = React.useState<boolean>(false);

  const handleClick = React.useCallback(
    (e: MouseEvent<HTMLAnchorElement>): void => {
      e.preventDefault();
      setIsImageShown((isImageShown: boolean): boolean => !isImageShown);
    },
    [],
  );

  const cardUrl = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
    bannedCard.name,
  )}&format=image&version=border_crop`;

  const Tr = odd ? TrOdd : 'tr';

  return (
    <Tr key={bannedCard.name}>
      <CardRowTh>
        <Anchor href={cardUrl} onClick={handleClick}>
          {bannedCard.name}
        </Anchor>
        {isImageShown && (
          <img
            alt={bannedCard.name}
            height={CARD_HEIGHT / 1.5}
            src={cardUrl}
            width={CARD_WIDTH / 1.5}
          />
        )}
      </CardRowTh>
      {banlists.map(
        (banlist: Banlist): ReactNode => {
          const isBanned: boolean =
            banlist.cards.findIndex(
              (card: string): boolean => card === bannedCard.name,
            ) !== -1;
          const Td = isBanned ? Banned : Unbanned;

          return (
            <Td
              key={banlist.short}
              title={
                isBanned
                  ? `Banned by ${banlist.long}`
                  : `Allowed by ${banlist.long}`
              }
            >
              {isBanned ? '\u2718' : '\u2713'}
            </Td>
          );
        },
      )}
    </Tr>
  );
}
