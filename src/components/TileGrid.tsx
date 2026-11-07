import type { TileConfig } from "../config/portalConfig";
import { Tile } from "./Tile";

interface TileGridProps {
  tiles: TileConfig[];
}

export function TileGrid({ tiles }: TileGridProps) {
  return (
    <ul className="tile-grid">
      {tiles.map((tile, index) => (
        // The list comes from a file and is never reordered while displayed, so the index is a stable key.
        <li key={index}>
          <Tile {...tile} />
        </li>
      ))}
    </ul>
  );
}
