# Whips & Shine

Premium mobile car detailing — marketing website.

Static site, no build step or dependencies. To preview locally:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Structure

- `index.html` — page content/sections
- `css/style.css` — theme, layout, animations
- `js/main.js` — nav behavior, scroll reveals, the dirty→clean car wash scroll animation, and the quote form
- `assets/favicon.svg` — browser tab icon

## Before launch

- Replace the placeholder email, phone number, and service area in the Contact section (`index.html`, look for `hello@whipsandshine.com`, `+1 (555) 000-0000`, and "Your City & Surrounding Areas").
- Swap in real logo/photos if you have them — the current car graphic and icons are all hand-built SVG/CSS.
- Update footer social links (currently placeholder `#` hrefs).
