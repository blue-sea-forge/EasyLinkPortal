# 0002: Themes

## Context

The portal needs several color themes. The Content-Security-Policy in `.htaccess` blocks inline scripts and styles.

## Decision

Each theme is a CSS block keyed on a `data-theme` attribute on `<html>` that sets the same color variables. The owner picks the theme with the `theme` field of `config.json`, and the app sets the attribute once the config is loaded (`useConfig`). Visitors cannot change it, so nothing is stored in the browser.

The logo is an image, so it cannot read the theme variables. It uses a neutral gray and gets a border from the theme.

History: the first version had a selector in the header and saved the visitor's choice in `localStorage`. It was removed when the theme moved into the config file (see 0003).

## Alternatives rejected

- A CSS-in-JS or React context solution: more code for a handful of variables.
- A separate stylesheet per theme: extra requests and a flash while it loads.

## Trade-offs

- The page uses the classic light colors for the short time before the config arrives. A different theme can flash in after it.
