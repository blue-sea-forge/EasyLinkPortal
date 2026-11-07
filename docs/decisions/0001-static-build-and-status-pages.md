# 0001: Static build and status pages

## Context

The site is hosted on OVH shared hosting with Apache, so there is no Node server. The deploy action uploads a folder, and `.htaccess` maps error codes to static files. The `.htaccess` also sets a strict Content-Security-Policy (no inline scripts or styles).

The app has to show a status page for 400 and 500 range codes. The browser cannot read the HTTP status of the page it is displaying, so the app needs another way to know it.

## Decisions

1. Static build with Vite, uploaded from `dist/`. The `.htaccess` lives in `public/ovh-deployments/` and the workflow moves it to the root of `dist/`. (This used to disable `publicDir`. See 0003 for why it is on now.)

2. One status page per code, generated at build time. The build copies `index.html` to `400.html`, `404.html` and `500.html` and changes the `http-status` meta tag. The app reads the tag at startup. `.htaccess` points `ErrorDocument` at these files.

3. A render error boundary shows the 500 page when a component throws.

4. Plain CSS with a stylesheet file and `lucide-react` icons rendered as inline SVG elements. No inline `style` attributes, because the CSP only allows `style-src 'self'`.

## Alternatives rejected

- react-router with an `/error/:code` route: Apache would still need static files for each code, and the app has only one real page.
- Server side includes or PHP to inject the status: ties the app to a specific hosting feature.
- A single `404.html` for every error code: simple, but a 500 would be shown as "not found".
- Loading site icons from the linked websites: blocked by the CSP (`img-src 'self' data:`) and leaks visits to third parties.

## Trade-offs

- Statuses other than 400, 403, 404 and 500 are not mapped by Apache and show Apache's default page. Add a code to `ERROR_PAGE_STATUSES` in `vite.config.ts` and an `ErrorDocument` line to `.htaccess` to cover another one.
- The status shown depends on the file Apache serves, not on the real response. A wrong `.htaccess` mapping would show the wrong page.
