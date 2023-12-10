# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## Installation

Run `yarn` or `npm i`

Then run `npm run dev` or `yarn dev`

Redirect to `http://localhost:5173` (m)

It is also deployed on https://moviefix.vercel.app for testing purposes

## Implementation

I have used React as a Libaray with Redux to maintain state between the components especially for genres.
Used Fluent UI just for theming purpose (dark mode as per figma), and used in-built or custom UI components for displaying data.
Apart from that I used the axios library to call the api as mentioned in the assigment!

Scrolling down will fetch the next year, scrolling up will fetch the previous year movies, when it is scrolled to bottom/top, max, min year movies 
are stored in the state so we can avoid repetition since those movies are already loaded in the UI.

Changing genres will re-call apis according to genres (may be becuase data from the server side may change).

Didn't used React-native because I never used it. 


## About Me
I am currently working as a Nodejs Developer in my current Organization.
I have worked both in Frontend and Backend tech, but my exprience in backend is little more than the frontend one.
