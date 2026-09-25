# Quiz

A simple web-based quiz built with **SvelteKit and TypeScript**.

The project focuses on creating a clean, minimal quiz interface while practicing
Svelte 5 state management, TypeScript, JSON data handling, timers, conditional
rendering, and interactive UI design.

## Features

- Multiple-choice quiz questions
- Questions loaded from a JSON file
- Questions shuffled when the quiz starts
- HTML, CSS, JavaScript, and TypeScript categories
- One question displayed at a time
- Answer selection and validation
- Correct and incorrect answer feedback
- Score tracking
- Negative marking for incorrect answers
- Score cannot fall below `0`
- Per-question countdown timer
- Animated circular stopwatch
- Automatic progression when the timer expires
- Progress indicator showing the current question
- Final score screen
- Loading and error states
- Responsive card-based interface
- Monochrome UI with elevated cards and buttons

## Tech Stack

- **SvelteKit**
- **Svelte 5**
- **TypeScript**
- **CSS**
- **JSON**

## Project Structure

```text
Quiz/
├── static/
│   └── questions.json
│
├── src/
│   └── routes/
│       └── quiz/
│           └── +page.svelte
│
├── package.json
├── svelte.config.js
├── vite.config.ts
└── README.md