"""
Turn YeahSight listening scripts into audio with Kokoro (runs locally, free).

Usage (from this folder, in a terminal where Kokoro is installed):
    python make_audio.py                     # all scripts in scripts/
    python make_audio.py vision-roadmap.en   # just one

Each scripts/<name>.<lang>.txt becomes out/<name>.<lang>.wav, plus a loudness-levelled
out/<name>.<lang>.mp3 ready for public/audio/ (needs ffmpeg, or the imageio-ffmpeg package).
- '# Title' and '## Heading' lines are read with a longer pause after them.
- Blank lines separate paragraphs (a short pause).
Language comes from the file name: .en -> English, .fr -> French.

Needs:  pip install kokoro soundfile numpy
(French also needs espeak-ng installed on the computer.)
"""
import sys, re, pathlib, shutil, subprocess
import numpy as np
import soundfile as sf
from kokoro import KPipeline

# A voice is one Kokoro voice, or a blend {voice: weight}. Owner (2026-10-21) chose the
# blends: a little of 'Bella' mixed in gives YeahSight a voice of its own. English switched to
# Puck (male) on 2026-10-22, the voice the owner chose for the HappyBein intro video.
VOICES = {'en': ('a', 'am_puck'),                              # American English
          'fr': ('f', {'ff_siwis': 0.75, 'af_bella': 0.25})}  # French (siwis is Kokoro's only French voice)
SPEED = 0.95                           # a touch slower than default, for listening
SR = 24000
PAUSE_PARA = 0.55                      # seconds between paragraphs
PAUSE_HEAD = 0.9                       # seconds after a heading
# Names the voice gets wrong, spelled the way they should sound. Applied to the
# text only before reading, so the scripts keep the real spelling.
# Heard in a test: "YeahSight" came out as "Yes, Sight", "HappyBein" as "Happy Bane".
# Owner (2026-10-21): HappyBein is said "Happy Be In".
# French: "Yeah Sight" gets English sounds the French voice lacks; "Yé Saillte" gives /je sajt/.
# French "Hapi Bi Ine" is the same spelling the HappyBein intro video uses.
PRONOUNCE = {'en': {'yeahsight': 'Yeah Sight', 'happybein': 'Happy Be In'},
             'fr': {'yeahsight': 'Yé Saillte', 'happybein': 'Hapi Bi Ine'}}
# Every episode is levelled to the same loudness (podcast standard, -16 LUFS), so
# episodes and languages don't play at different volumes.
LOUDNORM = 'loudnorm=I=-16:TP=-1.5:LRA=11'


def find_ffmpeg():
    if shutil.which('ffmpeg'):
        return 'ffmpeg'
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        return None


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
    pipe = pipes.setdefault(code, KPipeline(lang_code=code, repo_id='hexgrad/Kokoro-82M'))
    if isinstance(voice, dict):
        voice = sum(w * pipe.load_voice(v) for v, w in voice.items())
    blocks = [b.strip() for b in re.split(r'\n\s*\n', f.read_text(encoding='utf-8')) if b.strip()]
    audio = []
    for b in blocks:
        for line in b.splitlines():
            line = line.strip()
            if not line:
                continue
            heading = line.startswith('#')
            text = line.lstrip('#').strip()
            for word, said in PRONOUNCE[lang].items():
                text = re.sub(word, said, text, flags=re.I)
            for _, _, chunk in pipe(text, voice=voice, speed=SPEED):
                audio.append(np.asarray(chunk, dtype=np.float32))
            audio.append(np.zeros(int(SR * (PAUSE_HEAD if heading else 0.25)), dtype=np.float32))
        audio.append(np.zeros(int(SR * PAUSE_PARA), dtype=np.float32))
    target = out / f'{name}.wav'
    sf.write(target, np.concatenate(audio), SR)
    print('wrote', target)
    ffmpeg = find_ffmpeg()
    if ffmpeg:
        mp3 = target.with_suffix('.mp3')
        subprocess.run([ffmpeg, '-loglevel', 'error', '-y', '-i', str(target), '-af', LOUDNORM,
                        '-ar', str(SR), '-ac', '1', '-b:a', '48k', str(mp3)], check=True)
        print('wrote', mp3)
    else:
        print('no ffmpeg found: MP3 not made')
