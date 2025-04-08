import type { NextComponentType, NextPageContext } from 'next';

export const Title: NextComponentType<NextPageContext, Record<string, never>> = () => {

  return (
    <h1>Таск менеджер</h1>
  );
};
