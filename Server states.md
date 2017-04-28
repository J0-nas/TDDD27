### Server states:

- Use Agent(s) with atoms as name (instead of process ids)
  - Current Game ~ List of 10 tuples (artist, title, …, records)
    - Next Game
  - Current Song number (0..9)
  - Timestamp of last song started
- Server (game) logic loops between change/update states and sleep for game/song duration
  - New process to change the next song while main logic sleeps => no delay for the next game due to slow API requests