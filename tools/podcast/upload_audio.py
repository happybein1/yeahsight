"""
Upload finished episodes to Cloudflare R2 (bucket happybein-audio, served at
https://audio.happybein.com/yeahsight/...) and print the front matter to paste into the article.

Usage (from this folder):
    python upload_audio.py out/making-the-transition.fr.mp3 [more.mp3 ...]
    python upload_audio.py --list            # what's in the bucket
    python upload_audio.py --get NAME.mp3    # download one, e.g. to check a recording made elsewhere

The key lives in ~/.config/happybein/r2.env (never in this repo, which is public):
    R2_ACCESS_KEY_ID=...
    R2_SECRET_ACCESS_KEY=...
    R2_ENDPOINT=https://<account>.r2.cloudflarestorage.com

Needs:  pip install boto3  (and ffmpeg, or the imageio-ffmpeg package, for the duration)
"""
import sys, re, pathlib, shutil, subprocess, datetime

BUCKET = 'happybein-audio'
PREFIX = 'yeahsight/'
PUBLIC = 'https://audio.happybein.com/'
ENV = pathlib.Path.home() / '.config' / 'happybein' / 'r2.env'


def client():
    import boto3
    env = dict(l.split('=', 1) for l in ENV.read_text().splitlines() if '=' in l and not l.startswith('#'))
    env = {k.strip(): v.strip() for k, v in env.items()}
    return boto3.client('s3', endpoint_url=env['R2_ENDPOINT'], region_name='auto',
                        aws_access_key_id=env['R2_ACCESS_KEY_ID'],
                        aws_secret_access_key=env['R2_SECRET_ACCESS_KEY'])


def seconds(path):
    ff = shutil.which('ffmpeg')
    if not ff:
        import imageio_ffmpeg
        ff = imageio_ffmpeg.get_ffmpeg_exe()
    err = subprocess.run([ff, '-i', str(path)], capture_output=True, text=True).stderr
    h, m, s = re.search(r'Duration: (\d+):(\d+):([\d.]+)', err).groups()
    return round(int(h) * 3600 + int(m) * 60 + float(s))


def main(args):
    s3 = client()
    if args[:1] == ['--list']:
        for o in s3.list_objects_v2(Bucket=BUCKET).get('Contents', []):
            print(f"{o['Size']:>12}  {o['LastModified']:%Y-%m-%d %H:%M}  {PUBLIC}{o['Key']}")
        return
    if args[:1] == ['--get']:
        for name in args[1:]:
            s3.download_file(BUCKET, PREFIX + name, name)
            print('downloaded', name)
        return
    for f in map(pathlib.Path, args):
        key = PREFIX + f.name
        # Short cache: a re-recording keeps the same address and should reach listeners within the hour.
        s3.upload_file(str(f), BUCKET, key, ExtraArgs={'ContentType': 'audio/mpeg', 'CacheControl': 'public, max-age=3600'})
        now = datetime.datetime.now().astimezone().replace(microsecond=0, second=0)
        print(f'uploaded {PUBLIC}{key}\n  front matter:')
        print(f'    audio: {PUBLIC}{key}')
        print(f'    audioMinutes: {round(seconds(f) / 60)}')
        print(f'    audioBytes: {f.stat().st_size}')
        print(f'    audioSeconds: {seconds(f)}')
        print(f'    audioDate: {now.isoformat()}')


if __name__ == '__main__':
    main(sys.argv[1:] or ['--list'])
