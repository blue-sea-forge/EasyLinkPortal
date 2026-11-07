import { THEMES, applyTheme, isThemeId } from "./themes";

describe("isThemeId", () => {
  it.each(THEMES.map((theme) => theme.id))("accepts %s", (id) => {
    expect(isThemeId(id)).toBe(true);
  });

  it.each(["neon", "", undefined, 3])("rejects %s", (value) => {
    expect(isThemeId(value)).toBe(false);
  });
});

describe("applyTheme", () => {
  it("sets the data-theme attribute on the page", () => {
    applyTheme("forest");
    expect(document.documentElement.dataset.theme).toBe("forest");
  });
});
