import { ErrorBoundary } from "./components/ErrorBoundary";
import { StatusPage } from "./components/StatusPage";
import { GeneratorPage } from "./pages/GeneratorPage";
import { PortalPage } from "./pages/PortalPage";
import { isGeneratorPath } from "./routes";
import { isErrorStatus, readServedStatus } from "./status/httpStatus";

export function App() {
  const servedStatus = readServedStatus();

  if (isErrorStatus(servedStatus)) return <StatusPage code={servedStatus} />;

  return <ErrorBoundary>{isGeneratorPath(window.location.pathname) ? <GeneratorPage /> : <PortalPage />}</ErrorBoundary>;
}
