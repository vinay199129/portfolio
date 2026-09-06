'use strict';

(() => {
  const allowed = ['light', 'dark'];
  const requested = new URLSearchParams(location.search).get('scoutTheme');
  let saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (error) {
    console.warn('Theme preference storage is unavailable.', error);
  }
  const preferred = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = allowed.includes(requested)
    ? requested : allowed.includes(saved) ? saved : preferred;
})();
