import React, { ReactNode } from 'react';
import Banlist from '../../types/banlist';
import { useBanlist } from './hooks';
import { repeat } from './utils';
import styled from 'styled-components';
import { CardRow } from './components';
import { Td, Th } from './styled';

const TABLE_WIDTH = 640;

const Table = styled.table`
  border-color: #303030;
  border-style: solid;
  border-spacing: 0;
  border-width: 0 0 1px 0;
  box-sizing: border-box;
  margin-right: 1rem;
  width: ${TABLE_WIDTH}px;

  &:first-child {
    margin-left: 1rem;
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

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0 0 1rem 1rem;
`;

export default function BanlistComponent(): JSX.Element {
  const {
    banlists,
    bannedCards,
    bannedCardsCount,
    cardsPerTable,
    tableCount,
  } = useBanlist(TABLE_WIDTH);

  return (
    <Wrapper>
      {repeat(
        tableCount,
        (tableIndex: number): ReactNode => {
          const offset: number = tableIndex * cardsPerTable;
          const tableCardsCount: number = Math.min(
            cardsPerTable,
            bannedCardsCount - offset,
          );

          return (
            <Table key={tableIndex}>
              <thead>
                <tr>
                  <TheadTd></TheadTd>
                  {banlists.map(
                    (banlist: Banlist): JSX.Element => {
                      return (
                        <TheadTh key={banlist.short}>
                          <TheadThAbbr title={banlist.long}>
                            {banlist.short}
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
                  (cardIndex: number): ReactNode => (
                    <CardRow
                      banlists={banlists}
                      bannedCard={bannedCards[cardIndex]}
                      odd={cardIndex % 2 === 1}
                    />
                  ),
                  offset,
                )}
              </tbody>
            </Table>
          );
        },
      )}
    </Wrapper>
  );
}
