import { validateConfig, type PortalConfig } from "./portalConfig";

export const CONFIG_URL = `${import.meta.env.BASE_URL}config.json`;

/**
 * Fetches and validates config.json. Throws an error that says what is wrong
 * and where, so a bad edit on the server is easy to find in the browser console.
 */
export async function loadConfig(): Promise<PortalConfig> {
  // no-cache: the browser asks the server if the file changed, so an edited
  // config shows up on the next visit instead of after the cache expires.
  const response = await fetch(CONFIG_URL, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Could not load ${CONFIG_URL}: the server answered ${response.status}.`);
  }

  let content: unknown;
  try {
    content = await response.json();
  } catch (error) {
    throw new Error(`${CONFIG_URL} is not valid JSON: ${(error as Error).message}`);
  }

  const result = validateConfig(content);
  if (!result.ok) {
    throw new Error(`${CONFIG_URL} is not valid:\n- ${result.errors.join("\n- ")}`);
  }
  return result.config;
}
