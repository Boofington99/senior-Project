const pageNames = {
  home: 'Home',
  events: 'Events',
  journal: 'Journal',
  chats: 'Chats',
  profile: 'Profile',
  map: 'Map'
};

const currentPage = document.body.dataset.page;
const pageName = pageNames[currentPage] || 'Welcome';
const profilePhotoPath = 'IMG/John-UserPhoto.jpg';
const loggedInUsername = localStorage.getItem('huskyUnitedUsername') || 'Husky';
const title = document.querySelector('[data-page-title]');
if (title) title.textContent = pageName;
document.title = `${pageName} | Husky United`;

document.querySelectorAll('.brand strong').forEach((brand) => {
  brand.textContent = 'Husky United';
});
document.querySelectorAll('.brand-mark').forEach((mark) => {
  mark.textContent = 'HU';
});

const menuButton = document.querySelector('.menu-button');
if (menuButton) menuButton.textContent = '';

document.querySelectorAll('.nav-icon').forEach((icon) => icon.remove());

if (currentPage === 'profile') {
  document.querySelectorAll('.list .avatar').forEach((avatar) => {
    avatar.textContent = '';
  });
}

const chatSendButton = document.querySelector('.chat-input button');
if (chatSendButton) chatSendButton.textContent = 'Send';

document.querySelectorAll('button').forEach((button) => {
  button.textContent = button.textContent.replace(/^\+\s*/, '');
});

const mojibakeFixes = {
  'â€œ': '"',
  'â€': '"',
  'â€™': "'",
  'â€”': '-',
  'Â·': '·'
};
const pageTextWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const pageTextNodes = [];
while (pageTextWalker.nextNode()) pageTextNodes.push(pageTextWalker.currentNode);
pageTextNodes.forEach((node) => {
  Object.entries(mojibakeFixes).forEach(([broken, replacement]) => {
    node.nodeValue = node.nodeValue.replaceAll(broken, replacement);
  });
  node.nodeValue = node.nodeValue.replaceAll('“', '"').replaceAll('”', '"');
});

const topbar = document.querySelector('.topbar');
if (topbar) {
  const profileLink = document.createElement('a');
  profileLink.className = 'user-profile';
  profileLink.href = 'profile.html';
  profileLink.setAttribute('aria-label', 'Open profile');
  profileLink.innerHTML = `<img src="${profilePhotoPath}" alt="Profile photo">`;
  topbar.append(profileLink);
}

const profileAvatar = document.querySelector('.profile-avatar');
if (profileAvatar) {
  profileAvatar.textContent = '';
  profileAvatar.innerHTML = `<img src="${profilePhotoPath}" alt="Profile photo">`;
}

const siteFooter = document.createElement('footer');
siteFooter.className = 'site-footer';
siteFooter.textContent = 'Matthew Carrillo · 2026-2027 · Senior Project · University of Connecticut';
document.body.append(siteFooter);

if (currentPage === 'home') {
  const greeting = document.querySelector('[data-user-greeting]');
  if (greeting) greeting.textContent = `Good morning, ${loggedInUsername === 'Husky' ? 'there' : loggedInUsername}`;
}

if (currentPage === 'profile') {
  const profileName = document.querySelector('.profile-head h2');
  if (profileName) profileName.textContent = loggedInUsername;
}

document.querySelectorAll('[data-page-link]').forEach((link) => {
  if (link.dataset.pageLink === currentPage) link.classList.add('active');
});

document.querySelector('[data-menu-toggle]')?.addEventListener('click', () => {
  if (window.innerWidth <= 800) {
    document.body.classList.toggle('nav-open');
  } else {
    document.body.classList.toggle('nav-collapsed');
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 800) document.body.classList.remove('nav-open');
});

document.querySelectorAll('.sidebar a').forEach((link) => {
  link.addEventListener('click', () => document.body.classList.remove('nav-open'));
});

document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (link.href === window.location.href || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    window.location.assign(link.getAttribute('href'));
  });
});

const sidebarFoot = document.querySelector('.sidebar-foot');
if (sidebarFoot) {
  const logout = document.createElement('button');
  logout.className = 'logout-button';
  logout.type = 'button';
  logout.textContent = 'Log out';
  logout.addEventListener('click', () => {
    localStorage.removeItem('huskyUnitedUsername');
    window.location.href = 'login.html';
  });
  sidebarFoot.append(logout);
}

const sidebar = document.querySelector('.sidebar');
if (sidebar) {
  const mobileClose = document.createElement('button');
  mobileClose.className = 'mobile-close';
  mobileClose.type = 'button';
  mobileClose.setAttribute('aria-label', 'Close navigation');
  mobileClose.textContent = 'X';
  mobileClose.addEventListener('click', () => document.body.classList.remove('nav-open'));
  sidebar.prepend(mobileClose);
}
