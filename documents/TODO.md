## TODO

### Frontend

- [x] Header
      - [x] Brand
      - [x] Login (maybe in the footer
- [ ] Footer
      - [ ] Profile (default - random - ID, save in localStorage)
- [ ] Menue
      - [ ] Scores Table => change state
      - [ ] Switch between different tabs
- [ ] Game
      - [x] Input box
      - [x] Solve box
      - [x] Remaining time counter
      - [x] Custom Audio player
            - [x] Hide/disable pause, jumping, downloading
      - [x] Previous Song Info
      - [x] Fix animation
      - [x] Add animation for user input
      - [ ] Break overlay
            - [ ] After song
            - [ ] After game
      - [x] replace nav-footer with tab-footer
      - [x] Volume mute => set bar to 0
            - [x] When muted click on bar unmutes
- [x] SignUp/SignIn
      - [x] Try overlay + Form


- [x] Solve logic - when and how many typos are allowed?
- [x] Send request for future features...
      - Enable (game, chat) socket

### Backend

- [x] Define logic to determine (10) songs for a game
- [x] Krotos - Napster API
      - [x] finish up API to get the preview URL (+information) for the 10 songs
      - [ ] extend the api ~ not needed in the beginning
- [x] Hermes - Database helper
      - [x] Define an intermediate API to manage the mariaDB
      - [x] User table management
      - [x] Records/Title table
      - [x] Deploy DB helper to Phoenix
- [x] Phoenix signUp/signIn
      - [x] Define route(s)
      - [x] Account management functions
            - [x] Unique username/email


### Next

- [x] Decise on HTTP library (XMLHTTP…, fetch(), etc.)
- [x] Manage current game state on server (+ next game)
      - [x] Manage current song state on server
      - [x] Manage previous song state on server
- [x] Client requests all songs/game
- [ ] ~~Client request current + remaining songs~~
- [x] *Client request next game*
- [x] Websocket established
      - [ ] Client react on new record