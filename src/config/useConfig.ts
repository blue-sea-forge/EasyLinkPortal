import { useEffect, useState } from "react";
import { applyTheme } from "../theme/themes";
import { loadConfig } from "./loadConfig";
import type { PortalConfig } from "./portalConfig";

export type ConfigState =
  | { status: "loading" }
  | { status: "ready"; config: PortalConfig }
  | { status: "failed"; error: Error };

/** Loads config.json once and applies its theme. */
export function useConfig(): ConfigState {
  const [state, setState] = useState<ConfigState>({ status: "loading" });

  useEffect(() => {
    let isCancelled = false;

    loadConfig()
      .then((config) => {
        if (isCancelled) return;
        applyTheme(config.theme);
        setState({ status: "ready", config });
      })
      .catch((error: Error) => {
        if (isCancelled) return;
        console.error(error);
        setState({ status: "failed", error });
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return state;
}
