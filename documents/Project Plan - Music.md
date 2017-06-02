# Project Mousika

## Project Description

Mousika is a music trivia quiz similar to https://www.thesongclash.com/de/quiz and other games.

It's standard game mode is to guess the artist and title of 10 songs played consecutively (30 second  preview - obtained from the free napster API). Due to its nature it should be used with a keyboard (desktop PC/notebook). The players hear the same song at the same time and collect points based on how fast they solve the artist and title. A player can join the game at any point and is in sync with the song currently played.

Besides the 10 round game, each song has a record - minimum time a player needed to solve it - such that players can try to break the existing record.

The website includes an optional player profile, a live chat and optional (may have) features.



## Technologic Description

- We use **React** (and Phoenix.js) for the html code generation and client side logic used in our single page application (SPA)
  - In addition to React we use **React-Boostrap** to keep our code easy-readable and at the same time make our website responsive
  - The react code transpiled to javascript using a **webpack** setup
- The server is implemented using the **Phoenix** framework - written in **Elixir**
  - Elixir has been chose due to its different - functional - programming paradigm and its excelent server capabilities (Error handling, concurrency performance/scalability)
  - Since we are SPA the server returns a static html file (+js files) and changes the client side state using JSON responses 
  - We want to try to deploy our server to the new **openshift 3 ida server**
- As a database we use the open source alternative to MySQL - **MariaDB**
  - We chose **MariaDB** because we already used SQLite in the previous course and want to focus more on new server and client technologies



## Features

#### Must Have

- Game
  - Synchonized playback of a 30s preview from the Napster API 
    - 10 rounds per game
  - Ability to guess the artist and title within the 30s
    - Gain points relative to the performance (artist, title, time)
    - Records are stored persistently if the user is logged in
  - Typo correcting - words longer than 3 characters can contain some typos
    - May or may not give full points
  - Scores to be updated client and server side
  - Live chat with the other players
  - Remember Songs
- Profile
  - Name, Email, etc.
  - Experience
  - Records
  - List of favorite songs
- Community
  - Overall records

