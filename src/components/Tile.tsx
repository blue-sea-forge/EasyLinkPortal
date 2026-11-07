import { ICONS } from "../config/icons";
import type { TileConfig } from "../config/portalConfig";

export function Tile({ label, description, url, icon }: TileConfig) {
  const Icon = ICONS[icon];

  return (
    <a className="tile" href={url} rel="noopener noreferrer">
      <Icon className="tile-icon" size={32} aria-hidden="true" />
      <span className="tile-label">{label}</span>
      {description && <span className="tile-description">{description}</span>}
    </a>
  );
}
