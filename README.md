# Cortico Take Home Assignment

## Development

To develop in this project, you will need to have npm installed on your system. This project is bootstrapped with npm v22.16.0.

### Available scripts

- `npm install` to install dependencies
- `npm run dev` to run the app
- `npm run cy:open` to run end-to-end tests
- `npm run build` to create a production-ready build

## Timeline

Please share with us a bit about how you've spent your time. Remember, the assignment should take somewhere between 2-4 hours. It is advised to not submit more than 4 hours of work, we would like to be respectful of your time.

How I roughly spent my time:

- 10 minutes - Reviewed the instructions and familiarized myself with what needed to be built.
- 40 minutes - I built the MVP, minus the ability to filter the transcript by speaker.
- 40 minutes - Created reusable components to build the custom audio player, styling it as I went.
- 40 minutes - Implemented the feature that enables users to filter the conversation snippets by speaker. Created the hooks: `useSpeakerNames` ,`useSpeakerNames`, and `useSpeakerSnippets`. I used `useMemo` to cache the results of each of these functions, in order to optimize performance and prevent unnecessary re-renders of components.
- 30 minutes - Write and fix tests.
- 20 minutes - Updated README, cleaned up code comments and `console.log`s, etc.

## Approach

Please help us understand how you approached this take-home assignment. What was your first step, and what tooling did you use. What knowledge did you have that was helpful. What new concepts were you introduced to? Did you use AI?

- My first step was to build the MVP by making a fetch call to get the JSON data and displaying the high-level conversation data—the location, date/time, and coordinates. I then made an audio player using the `<audio>` HTML element, passing a `controls` prop to implement basic functionality. Later, I decided to make a custom audio player so that I could have more flexibility for styling and user interaction.
- I had some prior experience working with audio data, so presumably this knowledge was helpful in completing this exercise. (In the past, I built a few simple web apps that used audio data; I made UI "instruments", a drum kit and a piano, that could be played using keystrokes.) I also had prior experience making reusable components for usage across the app (using TypeScript and raw HTML elements), so I opted to make my own components (rather than using a component UI library, like Material UI or Radix UI).
- New concepts:
  - I did not know that the `HTMLMediaElement` has a [currentTime property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime). It was a fun discovery, and it was helpful when I used it to make the timer on my audio player.
  - This was my first time trying Cursor AI. I used Cursor to clarify concepts, get feedback about improved naming, and for debugging when I got stuck. I enjoyed using Cursor AI because it allowed me to ask questions, as I would ask ChatGPT, but without the hurdle of explaining the context of my assignment. However, I also noticed that Cursor AI frequently proposes a solution that is wrong, incomplete, overly complex/out-of-scope, not performant, or that isn't React-idiomatic. I found it the most helpful for writing tests.
- In terms of tooling, I used the following tech stack:
  | | |
  | ------------------------------------ | -------------------------------------- |
  | [React](https://react.dev/) | UI components, state management, hooks |
  | [Tailwind](https://tailwindcss.com/) | styling components |
  | [Cypress](https://docs.cypress.io) | end-to-end testing |

## Challenges

Please share a few challenges you ran into while working through this take home.

- I had some challenges when deciding on layout, colors, typography, and other design/user experience aspects. For example, I deliberated about where to position elements on the page, relative to one another. In particular, I took a long time to decide where to place the speaker stats on the page, as I did not want it to take attention away from the more important page components (the audio player and the transcript).

## Optimizations/Changes

Given more time, what would you do to make this take home the best quality work you could provide? We know a time boxed assignment doesn't lend itself to thorough coding, and are curious about what more you would think about in regards to this assignment.

- Use sentiment analysis to better understand the emotional tone of the text.
- Add a way to search the transcript for specific words, and when found, highlight the words within their respective contexts.
- The JSON data contains 2 snippets with a speaker_name, "On recording." I would identify which speaker this is, and try to investigate the issue underlying this JSON error.
- Make the timestamps in the Transcript section clickable, and when the user clicks on it, the audio player flies to that place in the track.
- Add Cypress component tests (to test individual React components in isolation).
- Bugfix the volume slider on mobile on production, which I observed when navigating to [this site](https://fiona-takehome.vercel.app) and QA'ing on my iPhone. (It works in development and it also works on production on desktop.)
