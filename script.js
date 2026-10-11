'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
if ('IntersectionObserver' in window) {
  const navigationLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navigationLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -45% 0px', threshold: [0, 0.1, 0.3] });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('#copy-status');
let feedbackTimer;
copyButton.addEventListener('click', async () => {
  clearTimeout(feedbackTimer);
  try {
    await navigator.clipboard.writeText('mahinabrar226@gmail.com');
    copyStatus.textContent = 'Email address copied.';
  } catch {
    copyStatus.textContent = 'Please select and copy the email address above.';
  }
  feedbackTimer = setTimeout(() => { copyStatus.textContent = ''; }, 6000);
});
