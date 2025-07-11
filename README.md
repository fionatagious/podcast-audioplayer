# Cortico Take Home Assignment

## Development

To develop in this project, you will need to have npm installed on your system. This project is bootstrapped with npm v22.16.0. To run the application for development, run `npm install` then `npm run dev` in your terminal.

## Timeline

Below is how I roughly spent my time:
15 minutes - Reviewed the instructions and familiarized myself with what needed to be built.
40 minutes - I built the MVP, minus the ability to filter the transcript by speaker.
30 minutes - Created reusable components to assemble the custom audio player, styling it as I went.
40 minutes - Implemented the feature that enables users to filter the conversation snippets by speaker. Created the hooks, `useSpeakerNames` and `useSpeakerSnippets`.
20 minutes - Updated README, cleaned up code comments and `console.log`s, etc.

## Approach

Please help us understand how you approached this take-home assignment. What was your first step, and what tooling did you use. What knowledge did you have that was helpful. What new concepts were you introduced to? Did you use AI?

- My first step was to build the MVP by making a fetch call to get the JSON data and displaying the high-level conversation data, such as the location, date/time, and coordinates. I made an audio player using the <audio></audio> HTML element, passing a `controls` prop to implement basic functionality.
- I had some prior knowledge working with audio data because I have built some simple web apps in the past using audio data, e.g. a drum kit and piano that can be played using the keyboard.
- This was my first time trying Cursor AI. I used Cursor to clarify concepts, get feedback about improved naming, and for debugging when I got stuck.

## Challenges

Please share a few challenges you ran into while working through this take home.

- I had some challenges with deciding on layout. For example, I deliberated about where to position elements on the page, relative to one another. In particular, I deliberated about where to place the speaker stats on the page, since it did not seem as significant as the audio player or the transcript.
- Shortly afterward, I decided to make a custom audio player so that I could add styles to the player and custom interactions.

## Optimizations/Changes

Given more time, what would you do to make this take home the best quality work you could provide? We know a time boxed assignment doesn't lend itself to thorough coding, and are curious about what more you would think about in regards to this assignment.

- make the volume slider vertical rather than horizontal, and the slider appears on hover of a volume icon
- add the ability for a user to fast forward/rewind by moving the progress bar
- highlight key words from the conversation using sentiment analysis
- add a map to plot the coordinates, so that a user can visually see where the conversation took place
