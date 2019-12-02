import React from 'react';
import {
  Banlist,
  ErrorBoundary,
  ErrorComponent,
  Footer,
  Header,
  Loading,
} from '..';

export default function App(): JSX.Element {
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
