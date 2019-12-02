import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 2rem;
  line-height: 2em;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export default function Header(): JSX.Element {
  return <H1>Magic: the Gathering &ndash; Commander Banlist</H1>;
}
