import { useEffect } from "react";
import { getStatusInfo } from "../status/httpStatus";

interface StatusPageProps {
  code: number;
}

export function StatusPage({ code }: StatusPageProps) {
  const { title, message } = getStatusInfo(code);

  useEffect(() => {
    document.title = `${code} ${title}`;
  }, [code, title]);

  return (
    <main className="status-page">
      <p className="status-code">{code}</p>
      <h1 className="status-title">{title}</h1>
      <p className="status-message">{message}</p>
      <a className="status-home" href="/">
        Back to the portal
      </a>
    </main>
  );
}
