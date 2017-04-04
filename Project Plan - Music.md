## Name suggestions

* music con(qu,t)est
* DJ-battle
* song slaughter (as the particular songs have been croped and you are fighting for the highterst score)
* music encounter/fray

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

## Possible page layout

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
