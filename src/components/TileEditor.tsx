import { ICONS, ICON_NAMES, isIconName } from "../config/icons";
import type { TileDraft } from "../generator/formState";

interface TileEditorProps {
  tile: TileDraft;
  position: number;
  total: number;
  onChange: (changes: Partial<TileDraft>) => void;
  onMove: (offset: number) => void;
  onRemove: () => void;
}

export function TileEditor({ tile, position, total, onChange, onMove, onRemove }: TileEditorProps) {
  const Icon = ICONS[tile.icon];

  return (
    <fieldset className="tile-editor">
      <legend>Tile {position}</legend>

      <label className="field">
        <span>Label</span>
        <input value={tile.label} onChange={(event) => onChange({ label: event.target.value })} />
      </label>

      <label className="field">
        <span>Description (optional)</span>
        <input value={tile.description} onChange={(event) => onChange({ description: event.target.value })} />
      </label>

      <label className="field">
        <span>Link</span>
        <input
          type="url"
          placeholder="https://"
          value={tile.url}
          onChange={(event) => onChange({ url: event.target.value })}
        />
      </label>

      <label className="field">
        <span>Icon</span>
        <span className="icon-picker">
          <Icon size={20} aria-hidden="true" />
          <select
            value={tile.icon}
            onChange={(event) => isIconName(event.target.value) && onChange({ icon: event.target.value })}
          >
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </span>
      </label>

      <div className="tile-editor-actions">
        <button type="button" className="button button-secondary" disabled={position === 1} onClick={() => onMove(-1)}>
          Move up
        </button>
        <button type="button" className="button button-secondary" disabled={position === total} onClick={() => onMove(1)}>
          Move down
        </button>
        <button type="button" className="button button-secondary" onClick={onRemove}>
          Remove
        </button>
      </div>
    </fieldset>
  );
}
