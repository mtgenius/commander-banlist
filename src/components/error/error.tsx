import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
  color: #f0c0c0;
  text-align: center;
`;

export default function ErrorComponent({
  children,
}: PropsWithChildren<{}>): JSX.Element {
  return <StyledError>{children}</StyledError>;
}
