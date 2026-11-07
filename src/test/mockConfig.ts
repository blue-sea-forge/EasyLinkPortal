import type { PortalConfig } from "../config/portalConfig";

export const TEST_CONFIG: PortalConfig = {
  brand: { name: "Test Portal", logo: "/logo.svg" },
  theme: "forest",
  tiles: [
    { label: "First site", description: "The first one", url: "https://first.test", icon: "globe" },
    { label: "Second site", url: "https://second.test", icon: "mail" },
  ],
};

/** Makes fetch answer with the given JSON body and HTTP status, like the server would for config.json. */
export function stubConfigResponse(body: unknown, status = 200) {
  const fetchStub = vi.fn(async () => ({ ok: status < 400, status, json: async () => body }));
  vi.stubGlobal("fetch", fetchStub);
  return fetchStub;
}
