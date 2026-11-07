export interface StatusInfo {
  code: number;
  title: string;
  message: string;
}

const KNOWN_STATUSES: Record<number, Omit<StatusInfo, "code">> = {
  400: { title: "Bad Request", message: "The server could not understand the request." },
  401: { title: "Unauthorized", message: "You need to sign in to see this page." },
  403: { title: "Forbidden", message: "You do not have access to this page." },
  404: { title: "Page Not Found", message: "This page does not exist or has moved." },
  405: { title: "Method Not Allowed", message: "This page does not accept that kind of request." },
  408: { title: "Request Timeout", message: "The request took too long. Try again." },
  429: { title: "Too Many Requests", message: "You sent too many requests. Wait a moment and try again." },
  500: { title: "Internal Server Error", message: "Something went wrong on our side. Try again later." },
  502: { title: "Bad Gateway", message: "The server received an invalid answer from another server." },
  503: { title: "Service Unavailable", message: "The service is down or overloaded. Try again later." },
  504: { title: "Gateway Timeout", message: "Another server took too long to answer." },
};

const CLIENT_ERROR_FALLBACK = { title: "Client Error", message: "The request could not be completed." };
const SERVER_ERROR_FALLBACK = { title: "Server Error", message: "The server could not complete the request." };

const FIRST_CLIENT_ERROR = 400;
const FIRST_SERVER_ERROR = 500;
const LAST_SERVER_ERROR = 599;

/** True for codes in the 400 to 599 range, the ones that get a status page. */
export function isErrorStatus(code: number): boolean {
  return Number.isInteger(code) && code >= FIRST_CLIENT_ERROR && code <= LAST_SERVER_ERROR;
}

/** Title and message for an error code. Codes without a dedicated text get a generic one for their range. */
export function getStatusInfo(code: number): StatusInfo {
  const known = KNOWN_STATUSES[code];
  if (known) return { code, ...known };

  const fallback = code >= FIRST_SERVER_ERROR ? SERVER_ERROR_FALLBACK : CLIENT_ERROR_FALLBACK;
  return { code, ...fallback };
}

/**
 * Finds out which status the page was served with. The server cannot tell the
 * browser directly, so the error pages written by the build carry it in a
 * meta tag. In development, "?status=503" lets you preview a status page.
 * Returns 200 when the page is not an error page.
 */
export function readServedStatus(doc: Document = document, search: string = window.location.search): number {
  const requested = import.meta.env.DEV ? new URLSearchParams(search).get("status") : null;
  const raw = requested ?? doc.querySelector('meta[name="http-status"]')?.getAttribute("content");
  const code = Number(raw);
  return Number.isInteger(code) ? code : 200;
}
