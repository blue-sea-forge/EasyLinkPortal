/** Saves data as a pretty-printed JSON file through the browser's download. Nothing is sent to a server. */
export function downloadJson(fileName: string, data: unknown): void {
  const blob = new Blob([`${JSON.stringify(data, null, 2)}\n`], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  // Revoked on the next tick so the download has started before the URL goes away.
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
