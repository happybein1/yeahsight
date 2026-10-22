# YeahSight audio (podcast) pipeline

1. `scripts/<article>.<lang>.txt` — listening scripts, written for the ear (no tables, no links).
2. Run `python make_audio.py` on a computer with Kokoro installed → `out/<article>.<lang>.wav`.
3. The WAV files are then converted to MP3 and placed in `public/audio/`, and the article's
   front matter gets `audio: /audio/<article>.<lang>.mp3`, which shows the player.

`out/` is not committed (see .gitignore).

**Since v2.23 (audio moving to Cloudflare R2):** `make_audio.py` writes the levelled MP3 itself;
`upload_audio.py out/<article>.<lang>.mp3` uploads it to `https://audio.happybein.com/yeahsight/`
and prints the front matter (`audio`, `audioMinutes`, `audioBytes`, `audioSeconds`, `audioDate`)
to paste into the article. Those fields also make it an episode of the podcast feeds
(`/podcast/en.xml`, `/podcast/fr.xml`). The R2 key lives in `~/.config/happybein/r2.env`, never in this repo.
