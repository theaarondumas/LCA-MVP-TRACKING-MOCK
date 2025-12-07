const steps = [
  {
    key: "submitted",
    title: "Submitted",
    subtitle: "Your tape has been uploaded.",
    meta: "Step 1 of 6",
    color: "#5C3FFF",
    feed: "Casting receives Aaron's self-tape for the lead in 'Hospital Drama'.",
  },
  {
    key: "delivered",
    title: "Delivered to Casting",
    subtitle: "Casting has access to your audition.",
    meta: "Step 2 of 6",
    color: "#0E7FFF",
    feed: "Coordinator marks Aaron's audition as delivered to the casting director's queue.",
  },
  {
    key: "viewed",
    title: "Viewed",
    subtitle: "Watched 1 time today at 2:14 PM.",
    meta: "Signal: Initial interest.",
    color: "#3A2CBA",
    feed: "Casting director opens Aaron's self-tape and watches it all the way through.",
  },
  {
    key: "viewedAgain",
    title: "Viewed Again",
    subtitle: "Watched 3 times by casting.",
    meta: "Signal: Strong interest.",
    color: "#5C3FFF",
    feed: "Director and producer replay key moments in Aaron's performance several times.",
  },
  {
    key: "shortlisted",
    title: "Shortlisted",
    subtitle: "You are officially in the mix.",
    meta: "Shortlist: 7 actors.",
    color: "#0E7FFF",
    feed: "Aaron is added to the shortlist alongside six other top contenders.",
  },
  {
    key: "callbackPending",
    title: "Callback Pending",
    subtitle: "Casting is deciding on callbacks.",
    meta: "You are still under consideration.",
    color: "#FF9F43",
    feed: "Team is scheduling callback sessions. Aaron is flagged as a strong callback candidate.",
  },
];

let currentIndex = -1;
let demoTimer = null;

const actorListEl = document.getElementById("actor-status-list");
const castingButtonsEl = document.getElementById("casting-buttons");
const feedEl = document.getElementById("casting-feed");
const restartBtn = document.getElementById("demo-restart");
const stepLabelEl = document.getElementById("demo-step-label");

function renderActorSteps() {
  actorListEl.innerHTML = "";
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

    actorListEl.appendChild(card);
  });
}

function renderCastingButtons() {
  castingButtonsEl.innerHTML = "";
  steps.forEach((step, index) => {
    const btn = document.createElement("button");
    btn.className = "status-pill";
    btn.textContent = step.title;
    btn.dataset.index = index;
    btn.style.borderColor = step.color;
    btn.addEventListener("click", () => {
      stopDemo();
      setStep(index, true);
    });
    castingButtonsEl.appendChild(btn);
  });
}

function highlightCastingPills() {
  const pills = castingButtonsEl.querySelectorAll(".status-pill");
  pills.forEach((pill) => {
    const idx = parseInt(pill.dataset.index || "0", 10);
    if (idx === currentIndex) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });
}

function scrollActive() {
  const active = actorListEl.querySelector(".status-card.active");
  if (active) {
    active.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function setStep(index, fromCastingClick = false) {
  currentIndex = index;
  renderActorSteps();
  highlightCastingPills();
  scrollActive();

  const step = steps[currentIndex];
  feedEl.textContent = step.feed;

  stepLabelEl.textContent = `${step.title} · ${fromCastingClick ? "Updated manually by casting" : "Demo playback"}`;
}

function startDemo() {
  stopDemo();
  currentIndex = -1;
  feedEl.textContent = "Casting is about to start reviewing Aaron's self-tape…";
  stepLabelEl.textContent = "Demo playing: follow the status journey from Submitted to Callback Pending.";

  let i = 0;
  const interval = 1700;

  demoTimer = setInterval(() => {
    if (i >= steps.length) {
      clearInterval(demoTimer);
      demoTimer = null;
      stepLabelEl.textContent = "Demo complete. Tap Restart Demo to replay or click statuses on the casting side.";
      return;
    }
    setStep(i, false);
    i += 1;
  }, interval);
}

function stopDemo() {
  if (demoTimer) {
    clearInterval(demoTimer);
    demoTimer = null;
  }
}

restartBtn.addEventListener("click", () => {
  startDemo();
});

renderActorSteps();
renderCastingButtons();
feedEl.textContent = "Tap Restart Demo to watch the full audition journey, or click a status on the casting side.";
stepLabelEl.textContent = "Ready when you are.";
startDemo();
