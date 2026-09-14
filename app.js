const pageNames = {
  home: "Home",
  events: "Events",
  journal: "Journal",
  chats: "Chats",
  profile: "Profile",
  map: "Map",
};

/* =========================================
   TEST ACCOUNTS
   ========================================= */

const testAccounts = {
  Johnathan: {
    password: "Husky4Ever",
  },

  Student: {
    password: "Student123",
  },

  IchigoKurisaki: {
    password: "Ichigo123",
  },
};

/* =========================================
   USER PROFILES
   ========================================= */

const userProfiles = {
  Johnathan: {
    name: "Johnathan",
    photo: "IMG/John-UserPhoto.jpg",
  },

  Student: {
    name: "Student",
    photo: "IMG/Student-UserPhoto.jpg",
  },

  IchigoKurisaki: {
    name: "Ichigo Kurisaki",
    photo: "IMG/Ichigo-UserPhoto.jpg",
  },
};

/* =========================================
   CURRENT USER
   ========================================= */

const currentPage = document.body.dataset.page;

const pageName = pageNames[currentPage] || "Welcome";

const loggedInUsername = localStorage.getItem("huskyUnitedUsername") || "Husky";

const loggedInUser = userProfiles[loggedInUsername] || null;

const profilePhotoPath = loggedInUser?.photo || "IMG/John-UserPhoto.jpg";
/* =========================================
   PAGE TITLE
   ========================================= */

const title = document.querySelector("[data-page-title]");

if (title) {
  title.textContent = pageName;
}

/* =========================================
   CURRENT DATE
   ========================================= */

const currentDateElement = document.querySelector("[data-current-date]");

if (currentDateElement) {
  const today = new Date();

  const dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  currentDateElement.textContent = today.toLocaleDateString(
    "en-US",
    dateOptions,
  );
}
document.title = `${pageName} | Husky United`;

/* =========================================
   BRAND
   ========================================= */

document.querySelectorAll(".brand strong").forEach((brand) => {
  brand.textContent = "Husky United";
});

document.querySelectorAll(".brand-mark").forEach((mark) => {
  mark.textContent = "HU";
});

/* =========================================
   MENU
   ========================================= */

const menuButton = document.querySelector(".menu-button");

if (menuButton) {
  menuButton.textContent = "";
}

document.querySelectorAll(".nav-icon").forEach((icon) => {
  icon.remove();
});

/* =========================================
   PROFILE LIST AVATARS
   ========================================= */

if (currentPage === "profile") {
  document.querySelectorAll(".list .avatar").forEach((avatar) => {
    avatar.textContent = "";
  });
}

/* =========================================
   CHAT BUTTON
   ========================================= */

const chatSendButton = document.querySelector(".chat-input button");

if (chatSendButton) {
  chatSendButton.textContent = "Send";
}

/* =========================================
   REMOVE + FROM BUTTON TEXT
   ========================================= */

document.querySelectorAll("button").forEach((button) => {
  button.textContent = button.textContent.replace(/^\+\s*/, "");
});

/* =========================================
   FIX SPECIAL CHARACTERS
   ========================================= */

const mojibakeFixes = {
  "â€œ": '"',
  "â€": '"',
  "â€™": "'",
  "â€”": "-",
  "Â·": "·",
};

const pageTextWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
);

const pageTextNodes = [];

while (pageTextWalker.nextNode()) {
  pageTextNodes.push(pageTextWalker.currentNode);
}

pageTextNodes.forEach((node) => {
  Object.entries(mojibakeFixes).forEach(([broken, replacement]) => {
    node.nodeValue = node.nodeValue.replaceAll(broken, replacement);
  });

  node.nodeValue = node.nodeValue.replaceAll("“", '"').replaceAll("”", '"');
});

/* =========================================
   TOP BAR PROFILE
   ========================================= */

const topbar = document.querySelector(".topbar");

if (topbar) {
  const profileLink = document.createElement("a");

  profileLink.className = "user-profile";
  profileLink.href = "profile.html";
  profileLink.setAttribute("aria-label", "Open profile");

  profileLink.innerHTML = `
    <img 
      src="${profilePhotoPath}" 
      alt="${loggedInUsername} profile photo"
    >
  `;

  topbar.append(profileLink);
}

/* =========================================
   PROFILE AVATAR
   ========================================= */

const profileAvatar = document.querySelector(".profile-avatar");

if (profileAvatar) {
  profileAvatar.textContent = "";

  profileAvatar.innerHTML = `
    <img 
      src="${profilePhotoPath}" 
      alt="${loggedInUsername} profile photo"
    >
  `;
}

/* =========================================
   FOOTER
   ========================================= */

const siteFooter = document.createElement("footer");

siteFooter.className = "site-footer";

siteFooter.textContent =
  "Matthew Carrillo · 2026-2027 · Senior Project · University of Connecticut";

document.body.append(siteFooter);

/* =========================================
   HOME GREETING
   ========================================= */

if (currentPage === "home") {
  const greeting = document.querySelector("[data-user-greeting]");

  if (greeting) {
    greeting.textContent = `Good morning, ${
      loggedInUsername === "Husky" ? "there" : loggedInUsername
    }`;
  }
}

/* =========================================
   PROFILE NAME
   ========================================= */

if (currentPage === "profile") {
  const profileName = document.querySelector(".profile-head h2");

  if (profileName) {
    profileName.textContent = loggedInUsername;
  }
}

/* =========================================
   ACTIVE NAVIGATION
   ========================================= */

document.querySelectorAll("[data-page-link]").forEach((link) => {
  if (link.dataset.pageLink === currentPage) {
    link.classList.add("active");
  }
});

/* =========================================
   MENU TOGGLE
   ========================================= */

document.querySelector("[data-menu-toggle]")?.addEventListener("click", () => {
  if (window.innerWidth <= 800) {
    document.body.classList.toggle("nav-open");
  } else {
    document.body.classList.toggle("nav-collapsed");
  }
});

/* =========================================
   WINDOW RESIZE
   ========================================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    document.body.classList.remove("nav-open");
  } else {
    document.body.classList.remove("nav-collapsed");
  }
});

/* =========================================
   CLOSE MOBILE NAVIGATION
   ========================================= */

document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

/* =========================================
   PAGE LINKS
   ========================================= */

document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      link.href === window.location.href ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();

    window.location.assign(link.getAttribute("href"));
  });
});

/* =========================================
   LOG OUT
   ========================================= */

const sidebarFoot = document.querySelector(".sidebar-foot");

if (sidebarFoot) {
  const logout = document.createElement("button");

  logout.className = "logout-button";
  logout.type = "button";
  logout.textContent = "Log out";

  logout.addEventListener("click", () => {
    localStorage.removeItem("huskyUnitedUsername");
    localStorage.removeItem("huskyUnitedLoggedIn");

    window.location.href = "login.html";
  });

  sidebarFoot.append(logout);
}

/* =========================================
   MOBILE CLOSE BUTTON
   ========================================= */

const sidebar = document.querySelector(".sidebar");

if (sidebar) {
  const mobileClose = document.createElement("button");

  mobileClose.className = "mobile-close";
  mobileClose.type = "button";

  mobileClose.setAttribute("aria-label", "Close navigation");

  mobileClose.textContent = "X";

  mobileClose.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });

  sidebar.prepend(mobileClose);
}
