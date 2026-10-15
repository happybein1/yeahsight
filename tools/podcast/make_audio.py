"""
Turn YeahSight listening scripts into audio with Kokoro (runs locally, free).

Usage (from this folder, in a terminal where Kokoro is installed):
    python make_audio.py                     # all scripts in scripts/
    python make_audio.py vision-roadmap.en   # just one

Each scripts/<name>.<lang>.txt becomes out/<name>.<lang>.wav
- '# Title' and '## Heading' lines are read with a longer pause after them.
- Blank lines separate paragraphs (a short pause).
Language comes from the file name: .en -> English, .fr -> French.

Needs:  pip install kokoro soundfile numpy
(French also needs espeak-ng installed on the computer.)
"""
import sys, re, pathlib
import numpy as np
import soundfile as sf
from kokoro import KPipeline

VOICES = {'en': ('a', 'af_heart'),     # American English, warm female voice
          'fr': ('f', 'ff_siwis')}     # French
SPEED = 0.95                           # a touch slower than default, for listening
SR = 24000
PAUSE_PARA = 0.55                      # seconds between paragraphs
PAUSE_HEAD = 0.9                       # seconds after a heading

here = pathlib.Path(__file__).parent
src, out = here / 'scripts', here / 'out'
out.mkdir(exist_ok=True)
only = set(sys.argv[1:])
pipes = {}

for f in sorted(src.glob('*.txt')):
    name = f.stem                      # e.g. vision-roadmap.en
    if only and name not in only:
        continue
    lang = name.rsplit('.', 1)[-1]
    code, voice = VOICES[lang]
    pipe = pipes.setdefault(code, KPipeline(lang_code=code))
    blocks = [b.strip() for b in re.split(r'\n\s*\n', f.read_text(encoding='utf-8')) if b.strip()]
    audio = []
    for b in blocks:
        for line in b.splitlines():
            line = line.strip()
            if not line:
                continue
            heading = line.startswith('#')
            text = line.lstrip('#').strip()
            for _, _, chunk in pipe(text, voice=voice, speed=SPEED):
                audio.append(np.asarray(chunk, dtype=np.float32))
            audio.append(np.zeros(int(SR * (PAUSE_HEAD if heading else 0.25)), dtype=np.float32))
        audio.append(np.zeros(int(SR * PAUSE_PARA), dtype=np.float32))
    target = out / f'{name}.wav'
    sf.write(target, np.concatenate(audio), SR)
    print('wrote', target)
