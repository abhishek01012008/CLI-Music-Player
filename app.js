const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const songDirectory = path.join(__dirname, "songs");
process.stdin.setRawMode(true);

let userChoice = 0;
let songs = [];
let currentPlayer = null;
let isPaused = false;

process.stdin.on("data", (data) => {
  if (data[0] === 0x1b && data[2] === 0x41) {
    userChoice -= 1;
    if (userChoice < 0) {
      userChoice = songs.length - 1;
    }
    listsong();
  }

  if (data[0] === 0x1b && data[2] === 0x42) {
    userChoice += 1;
    if (userChoice >= songs.length) {
      userChoice = 0;
    }
    listsong();
  }

});

function playSong(songPath) {
  if (currentPlayer) {
    currentPlayer.kill();
    currentPlayer = null;
  }

  currentPlayer = spawn("vlc", [
    "--intf",
    "dummy",
    "--play-and-exit",
    songPath
  ]);

  isPaused = false;

}

function stopSong() {
  if (currentPlayer) {
    currentPlayer.kill();
    currentPlayer = null;
  }
  process.exit(0);
}

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