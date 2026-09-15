# Wig's Wonky Forge

Portfolio site for Wig's Wonky Forge, a garage forge in Cwmbran, South Wales.
Plain HTML, CSS and JavaScript with no build step, hosted on GitHub Pages:
https://danforgedframeworks.github.io/wigswonkyforge/

Rebuilt from the Claude Design handoff `design_handoff_wonky_forge` (15 Sep 2026),
following `index.dc.html` with the hero headline restored to "Wig's Wonky Forge".

## Layout
| Path | What it is |
|---|---|
| `index.html` | The page: every section's copy and fixed photos |
| `js/data.js` | Photo curation: catalogue pieces, gnomes, bespoke, new homes, memorial viewer. Edit this to add or reorder work |
| `js/site.js` | Behaviour: renders the grids, hover photo cycling, clips, memorial viewer, contact form, reveals. `CONTACT_EMAIL` is at the top |
| `css/site.css` | Styles and brand tokens |
| `assets/img/` | Generated WebP photos, two sizes each (`-800`, `-1600`). Do not hand-edit; regenerate |
| `assets/video/` | Hero loop and the two catalogue clips |
| `tools/optimise_images.py` | Turns source photos into the WebP pairs |
| `tools/check_refs.py` | Confirms every photo the page names exists |

## Adding photos
1. Put the new originals in a folder (JPG or PNG, any size).
2. `python tools/optimise_images.py --src "<that folder>" --out assets/img`
3. Add the file names (no extension) to `js/data.js`.
4. `python tools/check_refs.py`

## Contact form
Sends through FormSubmit (formsubmit.co), which needs no account. The first message
sent from the live site triggers a confirmation email to `CONTACT_EMAIL`; nothing is
delivered until that link is clicked. If the service fails, the form falls back to
opening the visitor's email app.
