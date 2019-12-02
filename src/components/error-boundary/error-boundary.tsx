import React, { ComponentType, PropsWithChildren, ReactNode } from 'react';

type FallbackComponent = ComponentType<PropsWithChildren<{}>>;

interface Props extends PropsWithChildren<{}> {
  fallback: FallbackComponent | ReactNode;
}

interface State {
  error: Error | null;
}

const isFallbackComponent = (
  fallback: FallbackComponent | ReactNode,
): fallback is FallbackComponent => typeof fallback === 'function';

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  public render(): ReactNode {
    if (this.state.error !== null) {
      if (isFallbackComponent(this.props.fallback)) {
        const Fallback: FallbackComponent = this.props.fallback;
        return <Fallback>{this.state.error.message}</Fallback>;
      }
      return this.props.fallback;
    }

    return this.props.children;
  }
}
