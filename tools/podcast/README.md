# YeahSight audio (podcast) pipeline

1. `scripts/<article>.<lang>.txt` — listening scripts, written for the ear (no tables, no links).
2. Run `python make_audio.py` on a computer with Kokoro installed → `out/<article>.<lang>.wav`.
3. The WAV files are then converted to MP3 and placed in `public/audio/`, and the article's
   front matter gets `audio: /audio/<article>.<lang>.mp3`, which shows the player.

`out/` is not committed (see .gitignore).
