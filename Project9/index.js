// Variables

var numberOfDrumButtons = document.querySelectorAll(".drum").length;
let recordingStartTime;
let songNotes;
let savedSongNotes;

displayAllKeysInDiv();

for (var i = 0; i < numberOfDrumButtons; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}

document.addEventListener("keypress", function (event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});

function makeSound(key) {
  if (isRecording()) {
    recordNote(key);
  }
  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "k":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    case "l":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    default:
      console.log(key);
  }
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}

const recordBtn = document.querySelector(".recordbtn");
const playBtn = document.querySelector(".playBtn");
const saveBtn = document.querySelector(".saveBtn");

recordBtn.addEventListener("click", toggleRecording);
playBtn.addEventListener("click", playSong);
saveBtn.addEventListener("click", saveSong);

function toggleRecording() {
  recordBtn.classList.toggle("active");

  if (isRecording()) {
    startRecording();
    recordBtn.innerHTML = "Stop Recording";
  } else {
    stopRecording();
    recordBtn.innerHTML = "Record";
  }
}

function isRecording() {
  return recordBtn != null && recordBtn.classList.contains("active");
}

function startRecording() {
  recordingStartTime = Date.now();
  songNotes = [];
  playBtn.classList.remove("show");
  saveBtn.classList.remove("show");
}

function stopRecording() {
  playBtn.classList.add("show");
  saveBtn.classList.add("show");
}

function playSong() {
  if (songNotes.length === 0) return;
  songNotes.forEach((note) => {
    setTimeout(() => {
      makeSound(note.key);
    }, note.startTime);
  });
}

function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordingStartTime,
  });
}

function saveSong() {
  if (songNotes) {
    const serializedSongNotes = JSON.stringify(songNotes);
    let saveAs = "🎵 " + prompt("Save as : ");
    localStorage.setItem(saveAs, serializedSongNotes);
  }

  saveBtn.classList.remove("show");
  location.reload();
}

function retrieveSongNotes(nameOfSong) {
  const serializedSongNotes = localStorage.getItem(nameOfSong);
  if (serializedSongNotes) {
    savedSongNotes = JSON.parse(serializedSongNotes);
  }
}
function playSavedSong() {
  if (savedSongNotes.length === 0) return;
  savedSongNotes.forEach((note) => {
    setTimeout(() => {
      makeSound(note.key);
    }, note.startTime);
  });
}

function getAllLocalStorageKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i));
  }
  return keys;
}

function deleteSong(key) {
  localStorage.removeItem(key);
}

function displayAllKeysInDiv() {
  const keys = getAllLocalStorageKeys();
  const mySongsDiv = document.querySelector(".mySongs");
  const myNo = document.querySelector("#no");

  keys.forEach(function (key, index) {
    const songName = localStorage.getItem(key);
    if (songName) {
      myNo.classList.add("no");
      const songContainer = document.createElement("div");
      songContainer.classList.add("song-container");

      const btnContainer = document.createElement("div");
      songContainer.classList.add("btn-container");

      const songElement = document.createElement("p");
      songElement.textContent = `${key}`;

      // Create a play button element
      const playButton = document.createElement("button");
      playButton.textContent = "Play";

      playButton.addEventListener("click", function () {
        // Play the respective song when the play button is clicked

        retrieveSongNotes(key);
        playSavedSong();
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", function () {
        // Handle delete functionality here
        deleteSong(key);
        // Refresh the list of songs after deleting
        location.reload();
      });

      mySongsDiv.appendChild(songContainer);
      songContainer.appendChild(songElement);
      songContainer.appendChild(btnContainer);
      btnContainer.appendChild(playButton);
      btnContainer.appendChild(deleteButton);
    }
  });
}
