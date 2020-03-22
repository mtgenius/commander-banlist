import React, { ReactElement } from 'react';
import {
  Banlist,
  ErrorBoundary,
  ErrorComponent,
  Footer,
  Header,
  Loading,
} from '..';

export default function App(): ReactElement {
  return (
    <>
      <Header />
      <ErrorBoundary fallback={ErrorComponent}>
        <React.Suspense fallback={<Loading />}>
          <Banlist />
        </React.Suspense>
      </ErrorBoundary>
      <Footer />
    </>
  );
}
