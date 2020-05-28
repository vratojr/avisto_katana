
<!-- PROJECT LOGO -->
<!-- TODO : create a logo for the game -->
<!-- <br />
<p align="center">
  <a href="https://github.com/vratojr/avisto_katana">
    <img src="" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Avisto Katana</h3>

  <p align="center">
    Web version of the classical card Game : Katana
  </p>
</p> -->

# Avisto Katana


<!-- ABOUT THE PROJECT -->
## About The Project

Certain events (a global pandemic for example) may prevent you from gathering with your friends to play epic katana games.

Following this sad observation, an idea has bloomed in the mind of a genius! : "And why not make it possible to play cards from a distance ?"

This is how this project was born.


### Built With
* [NodeJs](https://nodejs.org/en/)
* [VueJs](https://vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [Babel](https://babeljs.io/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

The project reuires NodeJs and npm/yarn

### Installation

1. Clone the repo
```sh
git clone https://github.com/vratojr/avisto_katana.git
```
2. Navigate to the folder
```sh
cd avisto_katana
```
2. Install NPM packages
```sh
npm install
```

### Launch

#### Server

```sh
npm run debug
```

#### Client

```sh
npm run serve:ui
```

To add 5 new players to the game, call:

```
http://localhost:4000/api/test/players/add5
```

Then login with a new player and start the game! :)


