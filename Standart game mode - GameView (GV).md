### Standart game mode - GameView (GV)

- Listen to/open Game socket

  - [ ] Requests to the server - may not use socket

        - [ ] GV can request current game id


        - [ ] GV can request current song (+ timer) of game id


        - [ ] GV can request current standings

  - [ ] GV recieves new standing events

  - [ ] GV recieves new songs

        - [ ] url
        - [ ] title
        - [ ] interpret
        - [ ] prev record

  - [ ] GV recieves new records

- Upon new song:

  - [ ] Play audio
  - [ ] Set progressbar
  - [ ] Set timer
        - [ ] Stop current song when timer is over
  - [ ] While timer is active process user input
        - [ ] Send progress to server
  - [ ] When timer is over show winner of song until server send new song
        - [ ] Server could send new song based on previous song duration + buffer. Otherwise client makes request => may be async to other clients due to different processing time on the servers end