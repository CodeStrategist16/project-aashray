/* =========================================================
   AASHRAY — Clean Engine & Automated Mail Dispatch
   - No external backend or API keys required
   - Compatible with native mail clients & webmail (Gmail/Outlook/Yahoo)
   - Fallback copy-to-clipboard & Webmail link support
========================================================= */

// Official Receiving Email Address
const AASHRAY_OFFICIAL_EMAIL = "help.ataashray@gmail.com";

/* =========================================================
   INTRO VIDEO
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const introOverlay = document.getElementById("introOverlay");
  const introVideo = document.getElementById("introVideo");
  const skipIntroBtn = document.getElementById("skipIntroBtn");

  if (!introOverlay || !introVideo) {
    document.body.classList.remove("intro-open");
    return;
  }

  const INTRO_KEY = "aashray_intro_seen_v11";

  function hideIntro() {
    if (!introOverlay) return;

    sessionStorage.setItem(INTRO_KEY, "true");
    introOverlay.classList.add("hidden");
    document.body.classList.remove("intro-open");

    setTimeout(() => {
      if (introOverlay.parentNode) {
        introOverlay.remove();
      }
    }, 750);
  }

  if (sessionStorage.getItem(INTRO_KEY)) {
    introOverlay.remove();
    document.body.classList.remove("intro-open");
    return;
  }

  document.body.classList.add("intro-open");

  introVideo.addEventListener("ended", hideIntro);

  if (skipIntroBtn) {
    skipIntroBtn.addEventListener("click", hideIntro);
  }

  introVideo.play().catch(() => {
    introVideo.muted = true;
    introVideo.play().catch(() => {
      setTimeout(hideIntro, 1200);
    });
  });

  setTimeout(() => {
    if (!introOverlay.classList.contains("hidden")) {
      if (!Number.isFinite(introVideo.duration)) {
        hideIntro();
      }
    }
  }, 8000);
});

/* =========================================================
   ICONS
========================================================= */
const ICONS = {
  grain: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  oil: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2.7l5.6 5.7a8 8 0 1 1-11.2 0L12 2.7z"/></svg>`,
  fruit: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 3c1.5 2 1.5 4 0 6M12 3c-1.5 2-1.5 4 0 6"/></svg>`,
  tea: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>`,
  nutrition: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  snack: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01"/></svg>`,
  spice: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13"/></svg>`
};

/* =========================================================
   MONTHLY NEEDS DATA
========================================================= */
const DEFAULT_NEEDS = [
  {
    id: "need-atta",
    title: "Wheat Flour / Atta",
    category: "high",
    categoryLabel: "HIGH PRIORITY",
    priority: "urgent",
    priorityLabel: "🔴 HIGH",
    iconKey: "grain",
    home: "Sukhshanti Vrudhashram",
    desc: "~100–120 g/person/day for soft, easily digestible daily rotis.",
    unit: "kg",
    target: 75,
    fulfilled: 32
  },
  {
    id: "need-rice",
    title: "Rice",
    category: "high",
    categoryLabel: "HIGH PRIORITY",
    priority: "urgent",
    priorityLabel: "🔴 HIGH",
    iconKey: "grain",
    home: "Sukhshanti Vrudhashram",
    desc: "~80–100 g/person/day for khichdi and soft steamed rice.",
    unit: "kg",
    target: 60,
    fulfilled: 28
  },
  {
    id: "need-dal",
    title: "Dal (Toor, Moong, Masoor)",
    category: "high",
    categoryLabel: "HIGH PRIORITY",
    priority: "urgent",
    priorityLabel: "🔴 HIGH",
    iconKey: "nutrition",
    home: "Sukhshanti Vrudhashram",
    desc: "~40–50 g/person/day; prioritizing gentle yellow moong dal.",
    unit: "kg",
    target: 30,
    fulfilled: 14
  },
  {
    id: "need-oil",
    title: "Cooking Oil",
    category: "high",
    categoryLabel: "HIGH PRIORITY",
    priority: "urgent",
    priorityLabel: "🔴 HIGH",
    iconKey: "oil",
    home: "Sukhshanti Vrudhashram",
    desc: "Strictly ~25–30 ml/day per person for vital cardiac protection.",
    unit: "L",
    target: 18,
    fulfilled: 8
  },
  {
    id: "need-salt",
    title: "Salt",
    category: "high",
    categoryLabel: "HIGH PRIORITY",
    priority: "urgent",
    priorityLabel: "🔴 HIGH",
    iconKey: "spice",
    home: "Sukhshanti Vrudhashram",
    desc: "Low-sodium consideration for blood pressure management.",
    unit: "kg",
    target: 6,
    fulfilled: 3
  },
  {
    id: "need-sugar-jaggery",
    title: "Sugar / Jaggery",
    category: "high",
    categoryLabel: "HIGH PRIORITY",
    priority: "urgent",
    priorityLabel: "🔴 HIGH",
    iconKey: "nutrition",
    home: "Sukhshanti Vrudhashram",
    desc: "Kept minimal; prioritizing pure chemical-free jaggery.",
    unit: "kg",
    target: 10,
    fulfilled: 4
  },
  {
    id: "need-tea",
    title: "Tea / Green Tea",
    category: "high",
    categoryLabel: "HIGH PRIORITY",
    priority: "urgent",
    priorityLabel: "🔴 HIGH",
    iconKey: "tea",
    home: "Sukhshanti Vrudhashram",
    desc: "For morning and evening warm beverage service.",
    unit: "kg",
    target: 3,
    fulfilled: 1
  },
  {
    id: "need-fruits",
    title: "Fresh Fruits",
    category: "high",
    categoryLabel: "HIGH PRIORITY",
    priority: "urgent",
    priorityLabel: "🔴 HIGH",
    iconKey: "fruit",
    home: "Sukhshanti Vrudhashram",
    desc: "~1 soft fruit/day (bananas, papayas, soft apples, chiku).",
    unit: "kg",
    target: 65,
    fulfilled: 30
  },
  {
    id: "need-oats-daliya",
    title: "Oats / Daliya",
    category: "medium",
    categoryLabel: "MEDIUM PRIORITY",
    priority: "high",
    priorityLabel: "🟠 MEDIUM",
    iconKey: "grain",
    home: "Sukhshanti Vrudhashram",
    desc: "High-fiber gentle breakfast staples for smooth digestion.",
    unit: "kg",
    target: 12,
    fulfilled: 6
  },
  {
    id: "need-poha",
    title: "Poha",
    category: "medium",
    categoryLabel: "MEDIUM PRIORITY",
    priority: "high",
    priorityLabel: "🟠 MEDIUM",
    iconKey: "grain",
    home: "Sukhshanti Vrudhashram",
    desc: "Light and nutritious breakfast / tea-time snack option.",
    unit: "kg",
    target: 8,
    fulfilled: 4
  },
  {
    id: "need-suji",
    title: "Suji / Rava",
    category: "medium",
    categoryLabel: "MEDIUM PRIORITY",
    priority: "high",
    priorityLabel: "🟠 MEDIUM",
    iconKey: "grain",
    home: "Sukhshanti Vrudhashram",
    desc: "Soft upma, digestible idli, and light halwa preparation.",
    unit: "kg",
    target: 8,
    fulfilled: 3
  },
  {
    id: "need-biscuits",
    title: "Biscuits (Marie / Digestive)",
    category: "medium",
    categoryLabel: "MEDIUM PRIORITY",
    priority: "high",
    priorityLabel: "🟠 MEDIUM",
    iconKey: "snack",
    home: "Sukhshanti Vrudhashram",
    desc: "Low-sugar plain or Marie biscuits for routine tea breaks.",
    unit: "kg",
    target: 12,
    fulfilled: 6
  },
  {
    id: "need-dryfruits",
    title: "Dry Fruits (Almonds, Walnuts)",
    category: "medium",
    categoryLabel: "MEDIUM PRIORITY",
    priority: "high",
    priorityLabel: "🟠 MEDIUM",
    iconKey: "nutrition",
    home: "Sukhshanti Vrudhashram",
    desc: "Daily soaked nuts for brain health and essential micronutrients.",
    unit: "kg",
    target: 5,
    fulfilled: 2
  },
  {
    id: "need-milkpowder",
    title: "Milk Powder",
    category: "optional",
    categoryLabel: "OPTIONAL",
    priority: "medium",
    priorityLabel: "🟡 OPTIONAL",
    iconKey: "nutrition",
    home: "Sukhshanti Vrudhashram",
    desc: "Backup emergency supply when fresh dairy is delayed.",
    unit: "kg",
    target: 5,
    fulfilled: 2
  },
  {
    id: "need-besan",
    title: "Besan",
    category: "optional",
    categoryLabel: "OPTIONAL",
    priority: "medium",
    priorityLabel: "🟡 OPTIONAL",
    iconKey: "grain",
    home: "Sukhshanti Vrudhashram",
    desc: "For preparing soft cheela, nourishing kadhi, and mild snacks.",
    unit: "kg",
    target: 4,
    fulfilled: 1
  },
  {
    id: "need-spices",
    title: "Spices (Turmeric, Jeera, Dhaniya)",
    category: "optional",
    categoryLabel: "OPTIONAL",
    priority: "medium",
    priorityLabel: "🟡 OPTIONAL",
    iconKey: "spice",
    home: "Sukhshanti Vrudhashram",
    desc: "Digestion-friendly essential spices; keeping chili minimal.",
    unit: "kg",
    target: 4,
    fulfilled: 2
  }
];

/* =========================================================
   STATE & PERSISTENCE
========================================================= */
const STORAGE_KEY = "aashray_needs_seniorcare_v8";

let needsData;
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  needsData = saved ? JSON.parse(saved) : DEFAULT_NEEDS;
} catch (error) {
  needsData = DEFAULT_NEEDS;
}

let currentFilter = "all";
let searchQuery = "";
let selectedNeedId = null;

/* =========================================================
   DOM ELEMENTS
========================================================= */
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navbar = document.getElementById("navbar");

const exploreSukhshantiBtn = document.getElementById("exploreSukhshantiBtn");
const needsRevealWrapper = document.getElementById("needsRevealWrapper");
const closeNeedsViewBtn = document.getElementById("closeNeedsViewBtn");

const needsGrid = document.getElementById("needsGrid");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter");

const pledgeModal = document.getElementById("pledgeModal");
const closeModal = document.getElementById("closeModal");
const pledgeForm = document.getElementById("pledgeForm");
const selectedNeedElem = document.getElementById("selectedNeed");
const pledgeQuantityInput = document.getElementById("pledgeQuantity");
const pledgeUnitDisplay = document.getElementById("pledgeUnitDisplay");

const volunteerModal = document.getElementById("volunteerModal");
const volunteerBtn = document.getElementById("volunteerBtn");
const finalVolunteerBtn = document.getElementById("finalVolunteerBtn");
const closeVolunteer = document.getElementById("closeVolunteer");
const volunteerForm = document.getElementById("volunteerForm");

const registerHomeModal = document.getElementById("registerHomeModal");
const openRegisterHomeBtn = document.getElementById("openRegisterHomeBtn");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const careHomeRegistrationForm = document.getElementById("careHomeRegistrationForm");

/* =========================================================
   UTILITIES
========================================================= */
function saveNeeds() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(needsData));
  } catch (e) {
    console.warn("Could not save data.", e);
  }
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  let container = document.getElementById("toastContainer");

  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.style.cssText = "position:fixed;bottom:24px;right:24px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.style.cssText = "background:#1e293b;color:#ffffff;padding:12px 20px;border-radius:10px;box-shadow:0 10px 25px rgba(0,0,0,0.25);font-size:14px;display:flex;align-items:center;gap:8px;pointer-events:auto;transition:all 0.3s cubic-bezier(0.16,1,0.3,1);opacity:0;transform:translateY(12px);border-left:4px solid #10b981;";
  toast.innerHTML = `<strong style="color:#10b981;">✓</strong> <span>${escapeHTML(message)}</span>`;

  container.appendChild(toast);

  // Trigger smooth enter animation
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
}

/* =========================================================
   EMAIL DISPATCH & MULTI-CLIENT FALLBACK SYSTEM
   Solves browser gesture blocking & missing local mail apps
========================================================= */
function showEmailFallbackModal(subject, body) {
  // Check if fallback modal exists or create it
  let modal = document.getElementById("aashrayMailHelperModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "aashrayMailHelperModal";
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(5px);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      animation: aashrayFadeIn 0.25s ease-out;
    `;

    const card = document.createElement("div");
    card.id = "aashrayMailCard";
    card.style.cssText = `
      background: #ffffff;
      color: #1e293b;
      max-width: 480px;
      width: 100%;
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35);
      padding: 24px;
      font-family: inherit;
      position: relative;
    `;

    modal.appendChild(card);
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${AASHRAY_OFFICIAL_EMAIL}&su=${encodedSubject}&body=${encodedBody}`;
  const outlookWebLink = `https://outlook.live.com/mail/0/deeplink/compose?to=${AASHRAY_OFFICIAL_EMAIL}&subject=${encodedSubject}&body=${encodedBody}`;

  const card = document.getElementById("aashrayMailCard");
  card.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
      <div>
        <h3 style="margin:0; font-size:1.25rem; font-weight:700; color:#0f172a;">Dispatching Your Details</h3>
        <p style="margin:4px 0 0 0; font-size:0.875rem; color:#64748b;">
          A direct link was sent to your mail app. If it didn't open automatically, choose an option below:
        </p>
      </div>
      <button id="closeAashrayMailModal" type="button" style="background:none; border:none; font-size:22px; cursor:pointer; color:#94a3b8; line-height:1;">&times;</button>
    </div>

    <div style="display:flex; flex-direction:column; gap:10px; margin-top:16px;">
      <a href="${gmailWebLink}" target="_blank" rel="noopener noreferrer" style="display:flex; align-items:center; justify-content:center; gap:8px; background:#ea4335; color:#ffffff; text-decoration:none; padding:12px 16px; border-radius:10px; font-weight:600; font-size:0.925rem; box-shadow:0 2px 4px rgba(234,67,53,0.25);">
        Open in Gmail (Web)
      </a>

      <a href="${outlookWebLink}" target="_blank" rel="noopener noreferrer" style="display:flex; align-items:center; justify-content:center; gap:8px; background:#0078d4; color:#ffffff; text-decoration:none; padding:12px 16px; border-radius:10px; font-weight:600; font-size:0.925rem; box-shadow:0 2px 4px rgba(0,120,212,0.25);">
        Open in Outlook (Web)
      </a>

      <button id="copyEmailDetailsBtn" type="button" style="display:flex; align-items:center; justify-content:center; gap:8px; background:#f1f5f9; color:#334155; border:1px solid #cbd5e1; padding:12px 16px; border-radius:10px; font-weight:600; font-size:0.925rem; cursor:pointer;">
        📋 Copy Details & Address to Clipboard
      </button>
    </div>

    <div style="margin-top:16px; text-align:center;">
      <span style="font-size:0.75rem; color:#94a3b8;">
        Official Inbox: <strong>${AASHRAY_OFFICIAL_EMAIL}</strong>
      </span>
    </div>
  `;

  modal.style.display = "flex";

  document.getElementById("closeAashrayMailModal")?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const copyBtn = document.getElementById("copyEmailDetailsBtn");
  copyBtn?.addEventListener("click", () => {
    const fullClipboardText = `To: ${AASHRAY_OFFICIAL_EMAIL}\nSubject: ${subject}\n\n${body}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullClipboardText).then(() => {
        showToast("Email text copied to clipboard!");
        copyBtn.textContent = "✓ Copied to Clipboard!";
        copyBtn.style.background = "#e2e8f0";
      }).catch(() => {
        fallbackCopyText(fullClipboardText);
      });
    } else {
      fallbackCopyText(fullClipboardText);
    }
  });
}

function fallbackCopyText(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    showToast("Email text copied to clipboard!");
  } catch (err) {
    showToast("Please copy details manually.");
  }
  document.body.removeChild(textarea);
}

/* =========================================================
   OPEN EMAIL DISPATCHER
   - Executes IMMEDIATELY within the user click gesture
   - Bypasses popup & protocol blockers via a hidden <a> tag
   - Shows auxiliary webmail/clipboard helper modal
========================================================= */
function openPrefilledEmail(subject, body) {
  const mailtoLink =
    `mailto:${AASHRAY_OFFICIAL_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  // Create an invisible anchor to preserve user gesture without navigation loss
  const mailAnchor = document.createElement("a");
  mailAnchor.href = mailtoLink;
  mailAnchor.style.display = "none";
  document.body.appendChild(mailAnchor);
  mailAnchor.click();

  setTimeout(() => {
    mailAnchor.remove();
  }, 100);

  // Show webmail & copy helpers so users without desktop mail apps never get stuck
  showEmailFallbackModal(subject, body);
}

/* =========================================================
   EXPAND / COLLAPSE NEEDS
========================================================= */
if (exploreSukhshantiBtn && needsRevealWrapper) {
  exploreSukhshantiBtn.addEventListener("click", () => {
    const isHidden = needsRevealWrapper.classList.contains("hidden");

    if (isHidden) {
      needsRevealWrapper.classList.remove("hidden");
      renderNeeds();

      setTimeout(() => {
        needsRevealWrapper.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);

      exploreSukhshantiBtn.innerHTML = "Hide Monthly Needs <span>↑</span>";
    } else {
      needsRevealWrapper.classList.add("hidden");
      exploreSukhshantiBtn.innerHTML = "Explore Needs of Sukhshanti Vrudhashram <span>↓</span>";
    }
  });
}

if (closeNeedsViewBtn && needsRevealWrapper) {
  closeNeedsViewBtn.addEventListener("click", () => {
    needsRevealWrapper.classList.add("hidden");
    if (exploreSukhshantiBtn) {
      exploreSukhshantiBtn.innerHTML = "Explore Needs of Sukhshanti Vrudhashram <span>↓</span>";
    }
  });
}

/* =========================================================
   RENDER NEEDS
========================================================= */
function renderNeeds() {
  if (!needsGrid) return;

  needsGrid.innerHTML = "";
  const query = searchQuery.toLowerCase().trim();

  const filtered = needsData.filter(item => {
    const matchesFilter =
      currentFilter === "all" || item.category === currentFilter;

    const searchable = [
      item.title,
      item.home,
      item.desc,
      item.categoryLabel
    ].join(" ").toLowerCase();

    const matchesSearch = !query || searchable.includes(query);
    return matchesFilter && matchesSearch;
  });

  if (!filtered.length) {
    noResults?.classList.remove("hidden");
  } else {
    noResults?.classList.add("hidden");
  }

  filtered.forEach(item => {
    const unit = item.unit || "kg";
    const remaining = Math.max(0, item.target - item.fulfilled);
    const percent = Math.min(100, Math.round((item.fulfilled / item.target) * 100));
    const completed = remaining === 0;

    const card = document.createElement("article");
    card.className = "need-card reveal active";
    card.innerHTML = `
      <div class="need-top">
        <span class="category">${escapeHTML(item.categoryLabel)}</span>
        <span class="priority ${escapeHTML(item.priority)}">${escapeHTML(item.priorityLabel)}</span>
      </div>

      <div class="need-icon">
        ${ICONS[item.iconKey] || ICONS.nutrition}
      </div>

      <h3>${escapeHTML(item.title)}</h3>
      <div class="need-home">${escapeHTML(item.home)}</div>
      <p class="need-desc">${escapeHTML(item.desc)}</p>

      <div class="progress-info">
        <span><strong>${item.fulfilled} ${unit}</strong> of ${item.target} ${unit}</span>
        <span>${completed ? "Goal reached" : `${remaining}${unit} needed`}</span>
      </div>

      <div class="progress">
        <span style="width:${percent}%"></span>
      </div>

      <button
        type="button"
        class="pledge-btn"
        data-id="${escapeHTML(item.id)}"
        ${completed ? "disabled" : ""}
      >
        ${completed ? "Goal Fulfilled ✓" : "Pledge an Item →"}
      </button>
    `;

    needsGrid.appendChild(card);
  });

  needsGrid.querySelectorAll(".pledge-btn:not(:disabled)").forEach(button => {
    button.addEventListener("click", () => {
      openPledgeModal(button.dataset.id);
    });
  });

  updateImpactStats();
}

/* =========================================================
   SEARCH & FILTERS
========================================================= */
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter || "all";
    renderNeeds();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", e => {
    searchQuery = e.target.value;
    renderNeeds();
  });
}

/* =========================================================
   MODAL CONTROLS
========================================================= */
function closeAllModals() {
  pledgeModal?.classList.remove("active");
  volunteerModal?.classList.remove("active");
  registerHomeModal?.classList.remove("active");

  document.body.classList.remove("modal-open");

  pledgeForm?.reset();
  volunteerForm?.reset();
  careHomeRegistrationForm?.reset();

  selectedNeedId = null;
  updateRegistrationStep(1);
}

closeModal?.addEventListener("click", closeAllModals);
closeVolunteer?.addEventListener("click", closeAllModals);
closeRegisterModal?.addEventListener("click", closeAllModals);

window.addEventListener("click", e => {
  if (
    e.target === pledgeModal ||
    e.target === volunteerModal ||
    e.target === registerHomeModal
  ) {
    closeAllModals();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeAllModals();
  }
});

/* =========================================================
   PLEDGE MODAL
========================================================= */
function openPledgeModal(id) {
  const item = needsData.find(need => need.id === id);
  if (!item) return;

  selectedNeedId = id;
  const unit = item.unit || "kg";
  const remaining = Math.max(1, item.target - item.fulfilled);

  if (selectedNeedElem) {
    selectedNeedElem.innerHTML = `Pledging for <strong>${escapeHTML(item.title)}</strong> at <strong>${escapeHTML(item.home)}</strong>.`;
  }

  if (pledgeQuantityInput) {
    pledgeQuantityInput.max = remaining;
    pledgeQuantityInput.value = Math.min(5, remaining);
  }

  if (pledgeUnitDisplay) {
    pledgeUnitDisplay.textContent = `(${unit})`;
  }

  pledgeModal?.classList.add("active");
  document.body.classList.add("modal-open");

  setTimeout(() => {
    document.getElementById("donorName")?.focus();
  }, 100);
}

/* =========================================================
   PLEDGE FORM SUBMIT
========================================================= */
pledgeForm?.addEventListener("submit", event => {
  event.preventDefault();

  if (!selectedNeedId) return;

  const item = needsData.find(need => need.id === selectedNeedId);
  if (!item) return;

  const name = document.getElementById("donorName")?.value.trim();
  const phone = document.getElementById("donorPhone")?.value.trim();
  const city = document.getElementById("donorCity")?.value.trim() || "Not Specified";
  const notes = document.getElementById("donorNotes")?.value.trim() || "None";
  const quantity = parseFloat(pledgeQuantityInput?.value);
  const unit = item.unit || "kg";

  if (!name || !phone || !Number.isFinite(quantity) || quantity <= 0) {
    showToast("Please enter a valid pledge amount.");
    return;
  }

  // Update tracker state
  item.fulfilled = Math.min(item.target, item.fulfilled + quantity);
  saveNeeds();
  renderNeeds();

  const emailSubject = `[Aashray Pledge] ${quantity} ${unit} of ${item.title} - ${name}`;

  const emailBody = `Dear Project Aashray Team,

I would like to confirm my contribution pledge for senior citizen care.

--------------------------------------------------
DONATION & PLEDGE DETAILS
--------------------------------------------------

Donor Name: ${name}
Contact / WhatsApp: ${phone}
City / Location: ${city}

Item Pledged: ${item.title}
Quantity: ${quantity} ${unit}
Intended Care Home: ${item.home}
Delivery / Drop-off Note: ${notes}

Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}

--------------------------------------------------
Kindly connect with me to coordinate delivery / pickup logistics.

Warm regards,
${name}`;

  closeAllModals();
  showToast("Opening email dispatcher...");

  // Open immediately to preserve user gesture
  openPrefilledEmail(emailSubject, emailBody);
});

/* =========================================================
   VOLUNTEER MODAL
========================================================= */
function openVolunteerModal() {
  volunteerModal?.classList.add("active");
  document.body.classList.add("modal-open");

  setTimeout(() => {
    document.getElementById("volName")?.focus();
  }, 100);
}

volunteerBtn?.addEventListener("click", openVolunteerModal);
finalVolunteerBtn?.addEventListener("click", openVolunteerModal);

/* =========================================================
   VOLUNTEER FORM SUBMIT
========================================================= */
volunteerForm?.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("volName")?.value.trim();
  const email = document.getElementById("volEmail")?.value.trim();
  const phone = document.getElementById("volPhone")?.value.trim();
  const city = document.getElementById("volCity")?.value.trim() || "Not Specified";
  const interest = document.getElementById("volInterest")?.value || "Not Specified";
  const availability = document.getElementById("volAvailability")?.value || "Not Specified";
  const message = document.getElementById("volMessage")?.value.trim() || "None";

  if (!name || !email || !phone || !interest || !message) {
    showToast("Please complete all required fields.");
    return;
  }

  const emailSubject = `[Volunteer Application] ${name} - ${interest}`;

  const emailBody = `Dear Project Aashray Team,

I am writing to formally apply as a volunteer to support senior citizens and care homes.

--------------------------------------------------
VOLUNTEER APPLICATION DETAILS
--------------------------------------------------

Full Name: ${name}
Email Address: ${email}
Phone / WhatsApp: ${phone}
City / Location: ${city}

Area of Interest: ${interest}
Availability: ${availability}
Statement / Skills:
${message}

Application Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}

--------------------------------------------------
I look forward to discussing orientation and upcoming drives.

Warm regards,
${name}`;

  closeAllModals();
  showToast("Opening email dispatcher...");

  // Open immediately to preserve user gesture
  openPrefilledEmail(emailSubject, emailBody);
});

/* =========================================================
   MULTI-STEP CARE HOME REGISTRATION
========================================================= */
let currentRegistrationStep = 1;

function updateRegistrationStep(stepNumber) {
  currentRegistrationStep = stepNumber;

  document.querySelectorAll(".form-step-panel").forEach(panel => {
    panel.classList.remove("active");
  });

  document.querySelector(`.form-step-panel[data-step="${stepNumber}"]`)?.classList.add("active");

  document.querySelectorAll(".step-node").forEach(node => {
    const nodeStep = parseInt(node.getAttribute("data-step-indicator"), 10);
    node.classList.toggle("active", nodeStep <= stepNumber);
  });

  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");

  if (line1) {
    line1.classList.toggle("active", stepNumber >= 2);
  }

  if (line2) {
    line2.classList.toggle("active", stepNumber >= 3);
  }
}

openRegisterHomeBtn?.addEventListener("click", () => {
  updateRegistrationStep(1);
  registerHomeModal?.classList.add("active");
  document.body.classList.add("modal-open");
});

document.querySelectorAll(".btn-step-next").forEach(btn => {
  btn.addEventListener("click", () => {
    const nextStep = parseInt(btn.getAttribute("data-next"), 10);
    const currentPanel = document.querySelector(`.form-step-panel[data-step="${currentRegistrationStep}"]`);

    if (currentPanel) {
      const inputs = currentPanel.querySelectorAll("input[required], select[required], textarea[required]");

      for (const input of inputs) {
        if (!input.value.trim()) {
          input.focus();
          showToast("Please fill in all required fields.");
          return;
        }
      }
    }

    updateRegistrationStep(nextStep);
  });
});

document.querySelectorAll(".btn-step-prev").forEach(btn => {
  btn.addEventListener("click", () => {
    const prevStep = parseInt(btn.getAttribute("data-prev"), 10);
    updateRegistrationStep(prevStep);
  });
});

/* =========================================================
   CARE HOME REGISTRATION SUBMIT
========================================================= */
careHomeRegistrationForm?.addEventListener("submit", event => {
  event.preventDefault();

  const homeName = document.getElementById("homeName")?.value.trim();
  const officerName = document.getElementById("officerName")?.value.trim();
  const phone = document.getElementById("officerPhone")?.value.trim();
  const consent = document.getElementById("auditConsent")?.checked;

  if (!homeName || !officerName || !phone) {
    showToast("Please complete all required fields.");
    return;
  }

  if (!consent) {
    showToast("Please agree to the verification consent.");
    return;
  }

  const formData = new FormData(careHomeRegistrationForm);
  let additionalDetails = "";

  for (const [key, value] of formData.entries()) {
    if (key === "auditConsent") continue;

    const cleanKey = key
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, letter => letter.toUpperCase());

    const cleanValue = String(value).trim();
    if (cleanValue) {
      additionalDetails += `${cleanKey}: ${cleanValue}\n`;
    }
  }

  const emailSubject = `[Care Home Onboarding] ${homeName}`;

  const emailBody = `Dear Project Aashray Audit Board,

We would like to submit our elder care institution for onboarding.

--------------------------------------------------
CARE HOME REGISTRATION DETAILS
--------------------------------------------------

${additionalDetails}
Submission Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}

--------------------------------------------------
We request you to initiate document verification.

Sincerely,
${officerName}`;

  closeAllModals();
  showToast("Opening email dispatcher...");

  // Open immediately to preserve user gesture
  openPrefilledEmail(emailSubject, emailBody);
});

/* =========================================================
   MOBILE MENU & NAVBAR
========================================================= */
if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const open = navMenu.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

window.addEventListener(
  "scroll",
  () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    }
  },
  { passive: true }
);

/* =========================================================
   IMPACT STATS & COUNTERS
========================================================= */
function updateImpactStats() {
  let totalTarget = 0;
  let totalFulfilled = 0;

  needsData.forEach(item => {
    totalTarget += Number(item.target) || 0;
    totalFulfilled += Number(item.fulfilled) || 0;
  });

  const percentage =
    totalTarget > 0
      ? Math.min(100, Math.round((totalFulfilled / totalTarget) * 100))
      : 0;

  const heroPercentage = document.getElementById("heroPercentage");
  if (heroPercentage) {
    heroPercentage.textContent = `${percentage}%`;
  }
}

function animateCounter(counter) {
  const target = Number(counter.dataset.count);
  if (!Number.isFinite(target)) return;

  const suffix = counter.dataset.suffix || "";
  const duration = 1500;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);

    counter.textContent = value.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(update);
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        if (entry.target.classList.contains("impact-strip")) {
          entry.target.querySelectorAll(".stat-counter").forEach(animateCounter);
        }
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* =========================================================
   GOOGLE TRANSLATE SETUP
========================================================= */
function triggerTranslation(targetLang) {
  if (!targetLang) return;

  document.cookie = `googtrans=/en/${targetLang}; path=/;`;
  const domain = window.location.hostname;

  if (domain && domain !== "localhost") {
    document.cookie = `googtrans=/en/${targetLang}; path=/; domain=.${domain};`;
  }

  const combo = document.querySelector(".goog-te-combo");
  if (combo) {
    combo.value = targetLang;
    combo.dispatchEvent(new Event("change"));
  } else {
    window.location.reload();
  }
}

const languageSelect = document.getElementById("languageSelect");
if (languageSelect) {
  const savedLang = localStorage.getItem("aashray_language") || "en";
  languageSelect.value = savedLang;

  languageSelect.addEventListener("change", e => {
    const selected = e.target.value;
    localStorage.setItem("aashray_language", selected);

    if (selected === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      const domain = window.location.hostname;

      if (domain && domain !== "localhost") {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
      }

      window.location.reload();
    } else {
      triggerTranslation(selected);
    }
  });
}

/* =========================================================
   INITIALIZATION
========================================================= */
updateImpactStats();
