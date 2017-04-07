# Project Mousika

## Project Description

Mousika is a music trivia quiz. Heavily inspired by https://www.thesongclash.com/de/quiz and similar games.

It's standard game mode is to guess the artist and title of 10 songs played consecutively (30 second  preview - obtained from the free napster api). Due to its nature it should be used with a keyboard (desktop PC/notebook). The players hear the same song at the same time and collect points based on how fast they solve the artist and title. A player can join the game at any point and is in sync with the song currently played.

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
  - Synchonized playback of a 30s preview from the napster api 
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

#### May Have

- Second game mode



## Possible differences to thesongclash_com

* have a mobile version available (change also on onWindowResize)
  * multiple choice (artist & title)
    * out of ten 
  * difficulty
    * difficult songs (allow one "miss click")
    * easy (no "miss click" allowed; just the first 3 persons score)

* play against all or just against some friends (up to 5)
  * give some more parameters to adjust
    * genre (every player can choose one)
    * amount of songs played
    * way how to play
      * just first correct answer counts
      * get point for remaining time (the more remaining time, the more points)
  * create Link for this "stage"

* registration optional
  * not necessary for "just" playing
  * necessary for highscore
    * offer to an unregistered person to register if he/she got a new highscore

* offer three possible genres as requests (charts, classic, soundtrack) on page load ("ESC" to default "substage")
  * if another player pressed that button as well, than this "substage" starts as normal
    * if this player leaves, play against yourself; without effecting the overall highscore
  * default is the 

* reset the highscore once a week (so that everyone gets a chance)

  ​

## Page layout - Not revised

### Footer (user information)

* unregistered
  * how many songs played
  * how many songs correct
* registered
  * name (clickable to view users main page)
  * how many songs played
  * how many songs correct
  * highest personal current score

### Header (page navigation)

* highscore
* sign in
* choose game-play (against all/friends)
* choose "substages" ("sub battle stages" as an alternative expression)

### Main Content

* on first page Load go directly to default "substrage"
  * on repage load offer an overlay where to choose the "substage" (as then the user knows what to expect); an "ESC" brings the user directly to the "main stage"
* timer (nice and beautiful; not like on thesongclash_com; that's too much)
* input box (one for artist; another for title)
  * RETURN-key inputs the result
    * background changes color if wrong/right
* panels to set the artist and title in a nice way 
* place to set the cover, year (other information?)
* if the user gets a new highscore --> fadein-notification at the left side
* show previous results in a nicer way than thesongclash_com



## Other Names

- music con(qu,t)est
- DJ-battle
- song slaughter (as the particular songs have been croped and you are fighting for the highterst score)
- music encounter/fray