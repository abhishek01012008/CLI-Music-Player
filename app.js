const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const songDirectory = path.join(__dirname, "songs");
process.stdin.setRawMode(true);

let userChoice = 0;
let songs = [];
let currentPlayer = null;
let isPaused = false;


function listsong() {
  songs = fs.readdirSync(songDirectory);
  console.clear();
  songs.forEach((song, ind) => {
    if (ind === userChoice) {
      console.log(`> ${ind} : ${song}`);
    } else {
      console.log(`${ind} : ${song}`);
    }
  });

}

listsong();