import { ReactNode } from 'react';

type RepeatFunction = (index: number) => ReactNode;

export default function repeat(
  size: number,
  f: RepeatFunction,
  offset: number = 0,
): ReactNode[] {
  return new Array(size)
    .fill(null)
    .map((_value: null, index: number): ReactNode => f(index + offset));
}
