## Development

To develop in this project, you will need to have npm installed on your system. This project is bootstrapped with npm v22.16.0.

### Available scripts

- `npm install` to install dependencies
- `npm run dev` to run the app
- `npm run cy:open` to run end-to-end tests
- `npm run build` to create a production-ready build

## Possible optimizations/changes

- Use sentiment analysis to better understand the emotional tone of the text.
- Add a way to search the transcript for specific words, and when found, highlight the words within their respective contexts.
- The JSON data contains 2 snippets with a speaker_name, "On recording." I would identify which speaker this is, and try to investigate the issue underlying this JSON error.
- Make the timestamps in the Transcript section clickable, and when the user clicks on it, the audio player flies to that place in the track.
- Add Cypress component tests (to test individual React components in isolation).
- Bugfix the volume slider on mobile on production, which I observed when navigating to [this site](https://fiona-takehome.vercel.app) and QA'ing on my iPhone. (It works in development and it also works on production on desktop.)
