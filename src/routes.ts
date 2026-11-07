export const GENERATOR_PATH = "/generate-config";

/** True for "/generate-config" and "/generate-config/". The build writes the page as a folder, so Apache serves the second form. */
export function isGeneratorPath(pathname: string): boolean {
  const withoutTrailingSlashes = pathname.replace(/\/+$/, "");
  return withoutTrailingSlashes === GENERATOR_PATH;
}
