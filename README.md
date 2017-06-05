# TDDD27 - Mousika

The client side files are in the folder **dev_server**, the server is implemented in **mousika**. The napster api bridge can be found at https://github.com/J0-nas/Krotos, the database wrapper at https://github.com/DoubleTheP/Hermes 

The Screencast can be found at https://www.youtube.com/watch?v=7jUNPcqUxUo

## Introduction

Mousika is a music trivia quiz similar to https://www.thesongclash.com/de/quiz and other games.

It's standard game mode is to guess the artist and title of 10 songs played consecutively (30 second  preview - obtained from the free napster API). Due to its nature it should be used with a keyboard (desktop PC/notebook). The players hear the same song at the same time and collect points based on how fast they solve the artist and title. A player can join the game at any point and is in sync with the song currently played.

Besides the 10 round game, each song has a record - minimum time a player needed to solve it - such that players can try to break the existing record.

The website includes an optional player profile, a live chat and optional (may have) features.

------



### Installation

To develop/run the react website, install the following packages/tools:

#### FrontEnd

###### Install React

​	https://www.robinwieruch.de/minimal-react-webpack-babel-setup/

- ```
  npm install --save-dev webpack webpack-dev-server
  ```

- ```
  npm install --save-dev react-hot-loader
  ```

- ```
  npm install --save-dev babel-core babel-loader babel-preset-es2015
  ```


- ```
  npm install --save-dev babel-preset-stage-2
  ```

- ```
  npm install --save-dev babel-preset-react
  ```

- ```
  npm install --save react react-dom
  ```

- ```
  npm install --save react-bootstrap
  ```

###### Load CSS

​	https://www.npmjs.com/package/style-loader
​	https://www.npmjs.com/package/css-loader

###### React Bootstrap

​	https://react-bootstrap.github.io/introduction.html

#### Docker

​	http://jeremybellows.com/blog/How-to-Create-a-Minimal-Phoenix-Elixir-Server-Docker-Image

###### Install on Linux Mint:

​	https://gist.github.com/sirkkalap/e87cd580a47b180a7d32	

#### BackEnd

###### Install Elixir

​	http://elixir-lang.org/install.html#unix-and-unix-like
​	http://unix.stackexchange.com/questions/164895/install-elixir-lang-on-linux-mint#198428

###### Elexir Help Sites

​	http://elixirschool.com

###### Install Phoenix

​	http://www.phoenixframework.org/docs/installation
​	MariaDB -> look at phoenix-framework
​	Ecto-MariaDB-Error-Fix -> https://superuser.com/questions/957708/mysql-mariadb-error-1698-28000-access-denied-for-user-rootlocalhost#1077144
​	Phoenix-Server-Error-Fix -> https://github.com/phoenixframework/phoenix_live_reload#backends