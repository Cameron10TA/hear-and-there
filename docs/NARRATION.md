# Narration production

All 56 campus stories use team-supplied ElevenLabs recordings (mono 44.1 kHz MP3,
added November 3, 2026). Each stop's transcript in `src/landmarks.js` matches what
its recording says. The earlier recordings used Kokoro v1.0's American English
`af_heart` (Heart) voice at speed **0.97**; the settings below apply if a story is
regenerated with Kokoro. Arrival chimes are separate synthesized sounds.

## Replacing a story with a supplied recording

Save it as `assets/audio/<stop id>.mp3` (mono, 44.1 kHz) and point the stop's
`audio` field at it. Rewrite the transcript to match the recording word for word,
and check that the recording does not tell visitors to go inside. Then follow the
duration-label and simulation-hold steps below.

Recordings are generated locally, before building the website. Visitors only
download the selected WAV; they need no model, Python packages, voice account,
API key, or connection to a speech provider. No visitor data is used in generation.

## Settings for future recordings

Use [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx) (this batch used
0.6.1), ONNX Runtime, NumPy, and SoundFile in a separate development environment.
Download `kokoro-v1.0.onnx` and `voices-v1.0.bin` from the project's
[model-files-v1.1 release](https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.1).
The model files used for this batch have SHA-256 digests:

- Model: `beb0d1848dee9a49da392cc3df26958d46cfa35d321edf434f52949153f0df3a`
- Voices: `bca610b8308e8d99f32e6fe4197e7ec01679264efed0cac9140fe9c29f1fbf7d`

For each story, pass its full transcript unchanged to
`Kokoro.create(text, voice='af_heart', speed=0.97, lang='en-us')` with the
package's default sentence/clause pauses and trimming. Keep the native 24,000 Hz
sample rate. Verify finite, non-silent samples; multiply by
`min(1.0, 0.92 / max(abs(samples)))` to attenuate peaks only when necessary.
Write mono WAV with SoundFile's `PCM_16` subtype to the stop's existing audio path.
Listen for pacing, place-name pronunciation, and complete sentences.

Update the stop's duration label to the nearest five seconds. Check that its
simulation listening hold exceeds the decoded duration by at least three seconds;
if extending a hold, shift all subsequent frames equally so transition paths and
speeds remain intact. Update the displayed simulation length and testing guides
if it changes. Run `npm test` and `npm run build`, and check browser playback.

The [Kokoro model](https://huggingface.co/hexgrad/Kokoro-82M) is Apache-2.0 licensed;
the inference package is MIT licensed. Model files, development environments,
generation manifests, and review artifacts stay outside the website artifact.
