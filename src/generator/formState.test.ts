import { validateConfig } from "../config/portalConfig";
import { TEST_CONFIG } from "../test/mockConfig";
import { createFormState, moveItem, toConfigInput } from "./formState";

describe("form state", () => {
  it("turns a config into a form and back without changes", () => {
    const result = validateConfig(toConfigInput(createFormState(TEST_CONFIG)));
    expect(result).toEqual({ ok: true, config: TEST_CONFIG });
  });
});

describe("moveItem", () => {
  it("moves an item down", () => {
    expect(moveItem(["a", "b", "c"], 0, 1)).toEqual(["b", "a", "c"]);
  });

  it("moves an item up", () => {
    expect(moveItem(["a", "b", "c"], 2, -1)).toEqual(["a", "c", "b"]);
  });

  it("keeps the list when the move goes past an end", () => {
    expect(moveItem(["a", "b"], 0, -1)).toEqual(["a", "b"]);
    expect(moveItem(["a", "b"], 1, 1)).toEqual(["a", "b"]);
  });
});
