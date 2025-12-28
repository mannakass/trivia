# Trivia: Garden of Knowledge

A trivia game with a botanical theme, built as a school assignment focusing on API integration.

## About

This project is a web-based trivia game featuring vintage botanical illustrations. Player answers 10 multiple-choice questions and earns points based on their answers.

## Link to the game

[Click here](https://trivia-seven-theta.vercel.app/)

## API

This project uses the [Open Trivia Database (OpenTDB)](https://opentdb.com/) - a free, user-contributed trivia question database.

**Endpoint used:**

```
https://opentdb.com/api.php?amount=50&type=multiple
```

**Parameters:**

- `amount=50` - fetches 50 questions per request
- `type=multiple` - multiple choice questions only
- `difficulty=easy/medium/hard` - optional difficulty filter

## Tech Stack

- HTML5
- CSS (animations, transitions, flexbox)
- Vanilla JavaScript (async/await, fetch API, DOM manipulation)

## Design

The visual design is inspired by vintage botanical engravings and illustrations, using:

- Cormorant Garamond serif font
- Black and white illustration style

## Author

Hanna Kass

## Other

This project was created for educational purposes.
