const steps = [
  {
    key: "submitted",
    title: "Submitted",
    subtitle: "Your tape has been uploaded.",
    meta: "Step 1 of 6",
    color: "#5C3FFF",
  },
  {
    key: "delivered",
    title: "Delivered to Casting",
    subtitle: "Casting has access to your audition.",
    meta: "Step 2 of 6",
    color: "#0E7FFF",
  },
  {
    key: "viewed",
    title: "Viewed",
    subtitle: "Watched 1 time today at 2:14 PM.",
    meta: "Signal: Initial interest.",
    color: "#3A2CBA",
  },
  {
    key: "viewedAgain",
    title: "Viewed Again",
    subtitle: "Watched 3 times by casting.",
    meta: "Signal: Strong interest.",
    color: "#5C3FFF",
  },
  {
    key: "shortlisted",
    title: "Shortlisted",
    subtitle: "You are officially in the mix.",
    meta: "Shortlist: 7 actors.",
    color: "#0E7FFF",
  },
  {
    key: "callbackPending",
    title: "Callback Pending",
    subtitle: "Casting is deciding on callbacks.",
    meta: "You are still under consideration.",
    color: "#FF9F43",
  },
];

let currentIndex = 0;
let playing = false;
let playTimeout = null;

const listEl = document.getElementById("status-list");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const playBtn = document.getElementById("play-btn");

function renderSteps() {
  listEl.innerHTML = "";
  steps.forEach((step, index) => {
    const card = document.createElement("div");
    card.className = "status-card" + (index === currentIndex ? " active" : "");
    const rail = document.createElement("div");
    rail.className = "status-rail";
    rail.style.background = step.color;

    const title = document.createElement("div");
    title.className = "status-title";
    title.textContent = step.title;

    const sub = document.createElement("div");
    sub.className = "status-sub";
    sub.textContent = step.subtitle;

    const meta = document.createElement("div");
    meta.className = "status-meta";
    meta.textContent = step.meta;

    card.appendChild(rail);
    card.appendChild(title);
    card.appendChild(sub);
    card.appendChild(meta);
    listEl.appendChild(card);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === steps.length - 1;
}

function goNext() {
  if (currentIndex < steps.length - 1) {
    currentIndex += 1;
    renderSteps();
    scrollActiveIntoView();
  }
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderSteps();
    scrollActiveIntoView();
  }
}

function scrollActiveIntoView() {
  const active = document.querySelector(".status-card.active");
  if (active) {
    active.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function playFlow() {
  if (playing) {
    playing = false;
    playBtn.textContent = "Play Flow";
    if (playTimeout) clearTimeout(playTimeout);
    return;
  }
  playing = true;
  playBtn.textContent = "Pause";

  function stepForward() {
    if (!playing) return;
    if (currentIndex < steps.length - 1) {
      currentIndex += 1;
      renderSteps();
      scrollActiveIntoView();
      playTimeout = setTimeout(stepForward, 900);
    } else {
      playing = false;
      playBtn.textContent = "Play Flow";
    }
  }

  currentIndex = 0;
  renderSteps();
  scrollActiveIntoView();
  playTimeout = setTimeout(stepForward, 700);
}

prevBtn.addEventListener("click", () => {
  playing = false;
  playBtn.textContent = "Play Flow";
  goPrev();
});

nextBtn.addEventListener("click", () => {
  playing = false;
  playBtn.textContent = "Play Flow";
  goNext();
});

playBtn.addEventListener("click", playFlow);

renderSteps();
scrollActiveIntoView();
