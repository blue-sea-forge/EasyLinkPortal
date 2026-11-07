import { getStatusInfo, isErrorStatus, readServedStatus } from "./httpStatus";

function documentWithStatus(content: string | null): Document {
  const doc = document.implementation.createHTMLDocument();
  if (content !== null) {
    const meta = doc.createElement("meta");
    meta.name = "http-status";
    meta.content = content;
    doc.head.appendChild(meta);
  }
  return doc;
}

describe("isErrorStatus", () => {
  it.each([400, 404, 500, 599])("accepts %i", (code) => {
    expect(isErrorStatus(code)).toBe(true);
  });

  it.each([200, 301, 399, 600, 404.5, NaN])("rejects %s", (code) => {
    expect(isErrorStatus(code)).toBe(false);
  });
});

describe("getStatusInfo", () => {
  it("returns the dedicated text of a known code", () => {
    expect(getStatusInfo(404).title).toBe("Page Not Found");
  });

  it("falls back to a client error text for unknown 4xx codes", () => {
    expect(getStatusInfo(418).title).toBe("Client Error");
  });

  it("falls back to a server error text for unknown 5xx codes", () => {
    expect(getStatusInfo(599).title).toBe("Server Error");
  });
});

describe("readServedStatus", () => {
  it("reads the status from the meta tag", () => {
    expect(readServedStatus(documentWithStatus("503"), "")).toBe(503);
  });

  it("returns 200 when the meta tag is missing", () => {
    expect(readServedStatus(documentWithStatus(null), "")).toBe(200);
  });

  it("returns 200 when the meta tag is not a number", () => {
    expect(readServedStatus(documentWithStatus("oops"), "")).toBe(200);
  });

  it("lets the status query parameter override the meta tag in development", () => {
    expect(readServedStatus(documentWithStatus("200"), "?status=502")).toBe(502);
  });
});
