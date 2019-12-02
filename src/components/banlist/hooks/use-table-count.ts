import React from 'react';

const getTableCount = (tableWidth: number): number => {
  const bodyWidth: number = document.body.getBoundingClientRect().width;
  return Math.floor(bodyWidth / tableWidth);
};

export default function useTableCount(width: number): number {
  const [tableCount, setTableCount] = React.useState<number>(
    getTableCount(width),
  );

  const handleWindowResize = React.useCallback((): void => {
    const newTableCount: number = getTableCount(width);
    if (tableCount !== newTableCount) {
      setTableCount(newTableCount);
    }
  }, [tableCount, width]);

  React.useEffect((): VoidFunction => {
    window.addEventListener('resize', handleWindowResize);
    return (): void => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return tableCount;
}
