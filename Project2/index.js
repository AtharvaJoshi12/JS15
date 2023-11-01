const synth = window.speechSynthesis;

const inputTxt = document.querySelector("input");
const voiceSelect = document.querySelector("select");

let voices;
let speed = 1;

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
  document.querySelector(".secondRow").style.zIndex = "1";
  const utterThis = new SpeechSynthesisUtterance(
    document.querySelector("textarea").value
  );

  utterThis.rate = speed;

  utterThis.voice = voices[voiceSelect.value];
  synth.speak(utterThis);
  //   document.querySelector("textarea").value.blur();
});

let pauseResumeBtn = document.querySelector("#pauseResumeBtn");
let pause = true;
pauseResumeBtn.addEventListener("click", (event) => {
  if (pause) {
    pauseResumeBtn.innerHTML = "Resume";
    synth.pause();
    pause = false;
  } else {
    console.log("Pause");
    pauseResumeBtn.innerHTML = "Pause";
    synth.resume();
    pause = true;
  }
});

let endBtn = document.querySelector("#end");

endBtn.addEventListener("click", () => {
  console.log("end clicked");
  synth.cancel();
});

const speedSelect = document.getElementById("speed-select");
speedSelect.addEventListener("change", () => {
  speed = speedSelect.value;

  if (synth.speaking) {
    synth.cancel();
  }
  const utterThis = new SpeechSynthesisUtterance(
    document.querySelector("textarea").value
  );
  utterThis.addEventListener("error", () => {
    console.error("SpeechSynthesisUtterance error");
  });
  utterThis.rate = speed;
  synth.speak(utterThis);
});
