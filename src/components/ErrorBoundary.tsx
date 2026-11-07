import { Component, type ErrorInfo, type ReactNode } from "react";
import { StatusPage } from "./StatusPage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasFailed: boolean;
}

/** Shows the 500 page when a component throws while rendering, instead of a blank screen. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasFailed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasFailed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Render failed:", error, info.componentStack);
  }

  render() {
    if (this.state.hasFailed) return <StatusPage code={500} />;
    return this.props.children;
  }
}
