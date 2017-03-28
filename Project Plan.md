### Project Plan

#### Features

##### must have

- basic user management
  - user = email\*, username\*, firstname, password\*, city\*, country\* 
- Token for user session
- startpage (selection of upcomin movies & TV-shows)
  - search-bar 
  - above/beside each other depending on screensize
- Preview M&T contains poster, title, release date
- Detailed M&T page includes content of preview + (short) plot, actors, director
- subtab for all movies & TV-shows respectively
- subtab for user (passwordchange, like/unlike a movie, comments)
- db of upcoming and recent movies & TV-shows (M&T)
  - updated once per day by seperate program using "themoviedb"-API
- db for remembered M&T

##### want to have

* search-bar with life-update (every new character results in an updated suggestion)
* Auto log out via websocket
* explore users -> user preview you get before becoming a friend
  * search
  * suggest
* user to user messaging
* geolocating cinemas; displaying on a map; show more infos of the movies shown by the cinemas
* extend information about T&M by using other APIs (Youtube, Wikipedia, ...)



#### Technology

- **React** as a choice for the frontend code - by popular choice
- **Elixir (+ Phoenix)** as backend language - as a challenge
- **DB** not yet decided
- **PureCSS/Bootstrap** for responsive design



#### Order of operation

1. Static HTML => different views

   1. React logic to navigate views

2. HTTP Requests to server

   2. Server responses (dummy JSON + real user management)

3. App to build + update M&T db

4. Server logic

   ​

#### Milestones

- User signUp/signIn
- User can select movies to appear on his site



#### Milestones (Time)

* Create Project, register members. **April 10**.
* Functional and technological specification. **April 10**.
* Project seminar. **May 3,4,5, 8 (book on webreg)**.
* Individual oral examination. **May 29 - June 2 (book on webreg)**.
* Screen cast of your project. **June 5**.
* Final source code upload. **June 5**