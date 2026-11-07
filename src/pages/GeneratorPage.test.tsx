import { fireEvent, render, screen } from "@testing-library/react";
import { GeneratorPage } from "./GeneratorPage";
import { TEST_CONFIG, stubConfigResponse } from "../test/mockConfig";

const downloadJson = vi.fn();
vi.mock("../generator/downloadJson", () => ({ downloadJson: (...args: unknown[]) => downloadJson(...args) }));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  downloadJson.mockClear();
});

async function renderGenerator() {
  stubConfigResponse(TEST_CONFIG);
  render(<GeneratorPage />);
  await screen.findByRole("heading", { name: "Config generator" });
}

describe("GeneratorPage", () => {
  it("starts from the current config", async () => {
    await renderGenerator();

    expect(screen.getByDisplayValue("First site")).toBeInTheDocument();
    expect(screen.getByDisplayValue("https://second.test")).toBeInTheDocument();
  });

  it("previews the chosen theme and puts it in the downloaded config", async () => {
    await renderGenerator();
    fireEvent.change(screen.getByLabelText("Theme"), { target: { value: "military" } });
    fireEvent.click(screen.getByRole("button", { name: "Download config.json" }));

    expect(document.documentElement.dataset.theme).toBe("military");
    expect(downloadJson).toHaveBeenCalledWith("config.json", { ...TEST_CONFIG, theme: "military" });
  });

  it("downloads the config when the form is valid", async () => {
    await renderGenerator();
    fireEvent.click(screen.getByRole("button", { name: "Download config.json" }));

    expect(downloadJson).toHaveBeenCalledWith("config.json", TEST_CONFIG);
  });

  it("blocks the download and explains why when a link is not a web address", async () => {
    await renderGenerator();
    fireEvent.change(screen.getByDisplayValue("https://first.test"), { target: { value: "not a link" } });

    expect(screen.getByRole("button", { name: "Download config.json" })).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent("Tile 1: link must be a full web address");
  });

  it("adds a blank tile that must be filled in before downloading", async () => {
    await renderGenerator();
    fireEvent.click(screen.getByRole("button", { name: "Add a tile" }));

    expect(screen.getByText("Tile 3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download config.json" })).toBeDisabled();
  });

  it("removes a tile", async () => {
    await renderGenerator();
    fireEvent.click(screen.getAllByRole("button", { name: "Remove" })[0]);

    expect(screen.queryByDisplayValue("First site")).not.toBeInTheDocument();
  });

  it("starts empty and says so when the current config cannot be loaded", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    stubConfigResponse({}, 404);
    render(<GeneratorPage />);

    expect(await screen.findByText(/could not be loaded/)).toBeInTheDocument();
    expect(screen.queryByText("Tile 1")).not.toBeInTheDocument();
  });
});
