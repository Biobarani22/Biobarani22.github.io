# baranikumar.dev — personal site

Personal website for **Barani Kumar Rajendran, Ph.D.** — translational oncology,
clinical genomics, multi-omics integration, biomarker discovery.

Live at **https://biobarani22.github.io**

## What's here

| File | Purpose |
|---|---|
| `index.html` | The entire site — one page, six sections |
| `styles.css` | All styling, light + dark theme via CSS custom properties |
| `script.js` | Theme toggle, scroll reveal, active-section nav, mobile menu |
| `sitemap.xml`, `robots.txt` | Basic SEO |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

No build step, no dependencies, no framework. Edit the HTML, commit, push — it's live in about a minute.

## Editing the content

Everything is plain HTML with commented section markers, e.g.:

```
<!-- ───────────────────────── EXPERIENCE ───────────────────────── -->
```

Common edits:

- **Add a job** — copy an existing `<li class="job reveal">` block in the timeline and change the text.
- **Add a publication** — copy an existing `<li class="pub reveal">` block.
- **Add a skill** — add an `<li>` inside the relevant `<ul class="chips">`.
- **Change the hero numbers** — the `<dl class="stats">` block near the top.
- **Change the accent color** — `--accent` in `styles.css` (and `--accent-2`, `--accent-bg` to match). Dark mode has its own values under `html[data-theme="dark"]`.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploying changes

```bash
git add -A && git commit -m "Update content" && git push
```

GitHub Pages rebuilds automatically.

## Adding a custom domain later

1. Buy a domain.
2. Create a file named `CNAME` in this repo containing just the domain, e.g. `baranirajendran.com`
3. At your registrar, add four `A` records for the apex domain pointing to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   — and a `CNAME` record for `www` pointing to `biobarani22.github.io`.
4. In the repo's Settings → Pages, enter the domain and tick "Enforce HTTPS".
