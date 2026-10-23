# Preeti & Saurabh — Divine Sangam (Vrindavan)

Static shaadi-themed invitation: golden gate intro (opens with a dhol roll), Ganesh vandana, haldi / sangeet / baraat / phere event cards. No build step.

Run: `python -m http.server 3000` → http://localhost:3000

Folder layout:
- `assets/couple.jpg` — the couple photo (used in the Couple section)
- `assets/favicon.svg`, `assets/fonts/*.woff2` — as before
- `music/din-shagna-da.mp3` — confirm rights before public hosting, or swap in a dhol/bhajan track

Edit event text in `index.html`; calendar data is the `prog` array in `app.js` (UTC; IST = UTC+5:30).
