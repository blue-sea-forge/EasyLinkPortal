# 0003: JSON config and generator page

## Context

The brand, logo, theme and links must be editable without touching the code. The site is static on Apache, and the Content-Security-Policy blocks inline scripts and images from other sites.

## Decisions

1. The content lives in `public/config.json` and is fetched by the browser at startup (`src/config/loadConfig.ts`). `publicDir` is enabled so the file and the logo are copied as they are. Editing the file on the server changes the site with no rebuild. The request uses `cache: "no-cache"` so edits are seen on the next visit.

2. The file is validated before use (`src/config/portalConfig.ts`). Links must be http or https, because a `javascript:` link in a tampered file would otherwise run on click. Errors list every problem with the tile number. An invalid or missing file shows the 500 page, with details in the console.

3. Tile icons are names from a fixed list (`src/config/icons.ts`). JSON cannot hold components, and bundling the full lucide set would add hundreds of kB. A new icon needs a code change.

4. The generator is a page of the same app at `/generate-config/`. The build writes `generate-config/index.html` as a copy of the shell, because Apache only serves files that exist and MultiViews is off. `/generate-config` without the slash is redirected by Apache. The generator reuses the validation, so a downloaded file is always one the portal accepts. The file is built in the browser and downloaded, with no server-side write.

5. `public/config.schema.json` describes the file for editors, linked with `$schema`. The code validation stays the source of truth at runtime, and a test (`src/config/schema.test.ts`) fails if the schema's icon and theme lists drift from the code. The schema is stricter than the code: it rejects unknown keys to catch typos, while the portal ignores them.

6. `public/ovh-deployments/.htaccess` is moved to the root of `dist/` by the workflow, and the folder is removed, so the site does not carry a stray copy.

## Alternatives rejected

- Importing the JSON at build time: needs a rebuild and a deploy for every link change.
- A server-side save from the generator: needs a backend and authentication on shared hosting.
- Tile icons as image files or URLs: external images are blocked by the CSP, and local ones need extra files for every tile.
- Protecting the generator with a password: it only produces a download, so there is nothing to protect.

## Trade-offs

- The portal waits for one extra request before showing tiles.
- Anyone can open the generator, but cannot publish anything without access to the repository.
- The page title and favicon come from the config after it loads. The static `index.html` values are only shown briefly.
