import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Banlist from '../../types/banlist';
import BannedCard from '../../types/banned-card';
import { CardRow } from './components';
import { useBanlist } from './hooks';
import { Td, Th } from './styled';
import { repeat } from './utils';

const WIDTH = 640;

const Main = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0 0 1rem 0;
`;

const Table = styled.table`
  border-color: #303030;
  border-style: solid;
  border-spacing: 0;
  border-width: 0 0 1px 0;
  box-sizing: border-box;
  width: 100%;
`;

const TableWrapper = styled.div`
  box-sizing: border-box;
  padding-right: 1rem;
  width: ${WIDTH}px;

  &:first-child {
    padding-left: 1rem;
  }
`;

const TheadTd = styled(Td)`
  border-width: 0 1px 0 0;
`;

const TheadTh = styled(Th)`
  border-width: 1px 1px 0 0;
  padding: 0.25rem 0.5rem;
  text-align: center;
  white-space: nowrap;
`;

const TheadThAbbr = styled.abbr`
  border-width: 0;
  cursor: help;
  text-decoration: none;
`;

export default function BanlistComponent(): ReactElement {
  const {
    banlists,
    bannedCards,
    bannedCardsCount,
    cardsPerTable,
    tableCount,
  } = useBanlist(WIDTH);

  return (
    <Main>
      {repeat(
        tableCount,
        (tableIndex: number): ReactElement => {
          const offset: number = tableIndex * cardsPerTable;
          const tableCardsCount: number = Math.min(
            cardsPerTable,
            bannedCardsCount - offset,
          );

          return (
            <TableWrapper key={tableIndex}>
              <Table>
                <thead>
                  <tr>
                    <TheadTd></TheadTd>
                    {banlists.map(
                      (banlist: Banlist): ReactElement => {
                        return (
                          <TheadTh key={banlist.shortName}>
                            <TheadThAbbr title={banlist.longName}>
                              {banlist.shortName}
                            </TheadThAbbr>
                          </TheadTh>
                        );
                      },
                    )}
                  </tr>
                </thead>
                <tbody>
                  {repeat(
                    tableCardsCount,
                    (cardIndex: number): ReactElement => {
                      const bannedCard: BannedCard = bannedCards[cardIndex];
                      return (
                        <CardRow
                          banlists={banlists}
                          bannedCard={bannedCard}
                          key={bannedCard.name}
                          odd={cardIndex % 2 === 1}
                        />
                      );
                    },
                    offset,
                  )}
                </tbody>
              </Table>
            </TableWrapper>
          );
        },
      )}
    </Main>
  );
}
