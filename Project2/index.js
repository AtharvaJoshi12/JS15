const synth = window.speechSynthesis;

const inputTxt = document.querySelector("input");
const voiceSelect = document.querySelector("select");

let voices;

function loadVoices() {
  voices = synth.getVoices();
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    option.value = i;
    voiceSelect.appendChild(option);
  }
}

// in Google Chrome the voices are not ready on page load
if ("onvoiceschanged" in synth) {
  synth.onvoiceschanged = loadVoices;
} else {
  loadVoices();
}

document.querySelector("button").addEventListener("click", () => {
  console.log("Start playing");
  event.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(
    document.querySelector("textarea").value
  );
  utterThis.voice = voices[voiceSelect.value];
  synth.speak(utterThis);
  //   document.querySelector("textarea").value.blur();
});

let stop = document.querySelector("#stop");
stop.addEventListener("click", (event) => {
  console.log("Pause");
  synth.pause();
});

let resume = document.querySelector("#resume");
resume.addEventListener("click", (event) => {
  console.log("Resume");
  synth.resume();
});
