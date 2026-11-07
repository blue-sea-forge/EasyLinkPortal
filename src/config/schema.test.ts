import config from "../../public/config.json";
import schema from "../../public/config.schema.json";
import { THEMES } from "../theme/themes";
import { ICON_NAMES } from "./icons";
import { validateConfig } from "./portalConfig";

describe("config.schema.json", () => {
  it("lists the same icons as the code", () => {
    expect(schema.properties.tiles.items.properties.icon.enum).toEqual(ICON_NAMES);
  });

  it("lists the same themes as the code", () => {
    expect(schema.properties.theme.enum).toEqual(THEMES.map((theme) => theme.id));
  });
});

describe("public/config.json", () => {
  it("links to the schema", () => {
    expect(config.$schema).toBe("./config.schema.json");
  });

  it("is accepted by the validation", () => {
    expect(validateConfig(config).ok).toBe(true);
  });
});
