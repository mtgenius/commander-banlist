import React from 'react';
import useForceUpdate from 'use-force-update';

const getTableCount = (tableWidth: number): number => {
  const bodyWidth: number = document.body.getBoundingClientRect().width;
  return Math.max(1, Math.floor(bodyWidth / tableWidth));
};

export default function useTableCount(width: number): number {
  const tableCount: number = getTableCount(width);

  const forceUpdate = useForceUpdate();

  const handleWindowResize = React.useCallback((): void => {
    const newTableCount: number = getTableCount(width);
    if (tableCount !== newTableCount) {
      forceUpdate();
    }
  }, [forceUpdate, tableCount, width]);

  React.useEffect((): VoidFunction => {
    window.addEventListener('resize', handleWindowResize);
    return (): void => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return tableCount;
}
