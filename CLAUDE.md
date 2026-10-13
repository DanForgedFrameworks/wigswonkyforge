# wigswonkyforge — Wig's Wonky Forge portfolio site

## Wiring
- **Repo / branch:** github.com/DanForgedFrameworks/wigswonkyforge · `main`. **PUBLIC.**
- **Live:** https://danforgedframeworks.github.io/wigswonkyforge/ — GitHub Pages serves `main` exactly
  as it stands: no build step, no workflow, nothing filtered out. **Every file pushed is public on the
  live site, this one included.**
- **Nothing private goes in this repo.** Shop records, Facebook data and the Etsy key belong in the
  private `WWF\wwf-shop\` repo.
- **Source:** rebuilt from the Claude Design handoff `design_handoff_wonky_forge` (15 Sep 2026). The
  handoff zip in `WWF\Github Portfolio\` is frozen: never edit it.
- **Brand:** the canonical brand is the private `Brand\` repo (`wwf\brand.json`); `css\site.css` holds
  a deploy copy. Change Brand first, then copy it here.
- The old wonkyforge.co.uk domain was dropped: never link to it.
- **Skills here:** none. Layout and the photo steps: `README.md`.

## Rules
- **Photos:** `js\data.js` holds all photo curation. `assets\img\` is generated WebP pairs (`-800`,
  `-1600`): never hand-edit them; regenerate with `tools\optimise_images.py`. After any photo change,
  run `python tools/check_refs.py`.
- **Push = live.** After a push, confirm the Pages build for that commit finished
  (`gh api repos/DanForgedFrameworks/wigswonkyforge/pages/builds/latest`), then that the live URL
  returns 200 with the change (add `?cb=<random>`).
- **Contact form:** FormSubmit; the address is `CONTACT_EMAIL` at the top of `js\site.js`. Changing it
  sends a new activation email, and nothing is delivered until that link is clicked. Ask first.
- **Words on the site** go out as Daniel's business: draft them with /my-tone (the forge stream).
- **Commit path-scoped:** `git commit -m "…" -- <paths>`.
