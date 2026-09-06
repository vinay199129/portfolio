'use strict';

const pageNames = ['about', 'projects', 'resume', 'resources', 'gallery'];
const pageLoads = new Map();
let profilePromise;
let profile;
let navigationId = 0;
let dialogTrigger;
const modal = document.getElementById('projectModal');
const status = document.getElementById('page-status');
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const tags = items => `<div class="tags">${items.map(item => `<span class="tag">${escapeHtml(item)}</span>`).join('')}</div>`;
const list = items => `<ul class="plain-list">${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
const externalLink = (url, label) => `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} <span aria-hidden="true">&#8599;</span></a>`;

async function fetchContent(url, json = false) {
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return json ? response.json() : response.text();
}

function getProfile() {
  if (!profilePromise) {
    profilePromise = fetchContent('./assets/data/profile.json', true).then(data => {
      for (const key of ['projects', 'skills', 'experience', 'certifications', 'education', 'leadership', 'awards', 'highlights', 'selectedProjectIds', 'showcaseProjectIds', 'expertise']) {
        if (!Array.isArray(data[key])) throw new Error(`Profile is missing the ${key} collection.`);
      }
      profile = data;
      return data;
    }).catch(error => {
      profilePromise = null;
      throw error;
    });
  }
  return profilePromise;
}

function projectCard(project, index) {
  return `<section class="project-card" data-project-category="${escapeHtml(project.category)}">
    <div class="card-topline"><span class="card-number">${String(index + 1).padStart(2, '0')}</span><span>${escapeHtml(project.industry)} / ${escapeHtml(project.category)}</span></div>
    ${project.stage === 'Architecture showcase' ? '<p class="eyebrow">Architecture showcase</p>' : ''}
    <h3>${escapeHtml(project.title)}</h3>
    <p class="project-evidence"><strong>${project.stage === 'Architecture showcase' ? 'Capability' : 'Outcome'}:</strong> ${escapeHtml(project.outcomes[0])}</p>
    ${tags(project.technologies.slice(0, 3))}
    <button class="button button-small" type="button" data-project-id="${escapeHtml(project.id)}" aria-haspopup="dialog" aria-label="Read project brief: ${escapeHtml(project.title)}">Read project brief <span aria-hidden="true">&#8599;</span></button>
  </section>`;
}

function renderShowcase(data) {
  const projects = data.showcaseProjectIds.map(id => data.projects.find(project => project.id === id));
  if (projects.some(project => !project)) throw new Error('An architecture showcase is missing from the profile.');
  if (!projects.length) return '';
  return `<section class="section"><div class="section-heading"><h2>Agentic architecture showcase</h2></div>
    <div class="project-grid showcase-grid">${projects.map(projectCard).join('')}</div></section>`;
}

function renderAbout(article, data) {
  const selected = data.selectedProjectIds.map(id => data.projects.find(project => project.id === id));
  if (selected.some(project => !project)) throw new Error('A selected project is missing from the profile.');
  const [role, focus] = data.headline.split('|').map(part => part.trim());
  const currentRole = data.experience[0];
  article.querySelector('#about-content').innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">${escapeHtml(data.name)}</p>
        <h1>${escapeHtml(role)}</h1>
        ${focus ? `<p class="hero-focus">${escapeHtml(focus)}</p>` : ''}
        <p class="lead">${escapeHtml(data.summary)}</p>
        <div class="actions">
          <a class="button button-primary" href="#projects">View projects <span aria-hidden="true">&#8599;</span></a>
          <a class="button" href="#resume">View experience</a>
          <a class="text-link" href="mailto:${escapeHtml(data.contact.email)}">Get in touch</a>
        </div>
      </div>
      <aside class="hero-profile" aria-label="Profile and contact">
        <img src="./assets/images/profile-pic.jpg" width="80" height="100" alt="${escapeHtml(data.name)}" fetchpriority="high">
        <p class="profile-label">Current role</p>
        <h2>${escapeHtml(currentRole.title)}</h2>
        <p>${escapeHtml(currentRole.company)}<br>${escapeHtml(data.contact.location)}</p>
        <div class="profile-links">${externalLink(data.contact.linkedin, 'LinkedIn')}${externalLink(data.contact.github, 'GitHub')}</div>
      </aside>
    </section>
    <div class="metrics" aria-label="Selected project outcomes">
      ${data.highlights.map(item => `<button class="metric" type="button" data-project-id="${escapeHtml(item.projectId)}" aria-haspopup="dialog"><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)} <span aria-hidden="true">&#8599;</span></span><small>${escapeHtml(item.detail)}</small></button>`).join('')}
    </div>
    <section>
      <div class="section-heading"><h2>Selected delivery work</h2><a class="text-link" href="#projects">All ${data.projects.length} projects &rarr;</a></div>
      <div class="project-grid">${selected.map(projectCard).join('')}</div>
    </section>
    ${renderShowcase(data)}
    <section class="section">
      <div class="section-heading"><h2>Architecture &amp; technical leadership</h2><a class="text-link" href="#resume">Full experience &rarr;</a></div>
      <div class="expertise-grid">${data.expertise.map(item => `<div class="expertise-card"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div>`).join('')}</div>
    </section>
    <section class="section">
      <div class="section-heading"><h2>Leadership &amp; enablement</h2><a class="text-link" href="#gallery">Speaking &amp; events &rarr;</a></div>
      ${list(data.leadership.slice(0, 3))}
    </section>
    <section class="section contact-band">
      <div><h2>Have an architecture problem to solve?</h2><p>Start a conversation about enterprise AI, cloud platforms, or technical enablement.</p></div>
      <div class="actions"><a class="button button-primary" href="mailto:${escapeHtml(data.contact.email)}">Let's connect &rarr;</a></div>
    </section>`;
}

function renderResume(article, data) {
  article.querySelector('#resume-content').innerHTML = `<div class="resume-layout">
    <div>
      <section class="section"><h2>Experience</h2>
        ${data.experience.map(item => `<div class="timeline-item"><p class="period">${escapeHtml(item.period)}</p><h3>${escapeHtml(item.title)}</h3><p class="company">${escapeHtml(item.company)}</p><p>${escapeHtml(item.summary)}</p>${list(item.bullets)}</div>`).join('')}
      </section>
      <section class="section"><h2>Selected delivery outcomes</h2>
        ${data.selectedProjectIds.map(id => data.projects.find(project => project.id === id)).map(project => `<div class="timeline-item"><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.role)}</p>${list(project.outcomes)}<button class="button button-small" data-project-id="${escapeHtml(project.id)}" type="button" aria-haspopup="dialog">Read project brief</button></div>`).join('')}
      </section>
      ${renderShowcase(data)}
      <section class="section"><h2>Leadership &amp; enablement</h2>${list(data.leadership)}</section>
      <section class="section"><h2>Education</h2>
        ${data.education.map(item => `<div class="timeline-item"><p class="period">${escapeHtml(item.period)}</p><h3>${escapeHtml(item.degree)}</h3><p class="company">${escapeHtml(item.institution)}</p><p>${escapeHtml(item.detail)}</p></div>`).join('')}
      </section>
      <section class="section"><h2>Awards &amp; recognition</h2>
        ${data.awards.map(item => `<h3>${escapeHtml(item.organization)}</h3>${list(item.items)}`).join('')}
      </section>
    </div>
    <aside class="resume-aside" aria-label="Skills and certifications">
      <h2>Technical skills</h2>
      ${data.skills.map(group => `<h3>${escapeHtml(group.category)}</h3>${tags(group.items)}`).join('')}
      <section class="section"><h2>Certifications</h2>
        <ul class="credential-list">${data.certifications.map(item => `<li>${externalLink(item.url, item.name)}<small>${escapeHtml(item.code)}</small></li>`).join('')}</ul>
      </section>
      <section class="section"><h2>Contact</h2><p><a href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a></p><p><a href="tel:${escapeHtml(data.contact.phone.replace(/[^\d+]/g, ''))}">${escapeHtml(data.contact.phone)}</a></p><p>${escapeHtml(data.contact.location)}</p></section>
    </aside>
  </div>`;
}

function renderProjects(article, data) {
  article.querySelector('#project-grid').innerHTML = data.projects.map(projectCard).join('');
  article.querySelector('#project-count').textContent = `${data.projects.length} projects`;
}

async function loadPage(pageName) {
  if (pageLoads.has(pageName)) return pageLoads.get(pageName);
  const article = document.querySelector(`[data-page="${pageName}"]`);
  const loading = Promise.all([
    fetchContent(`./pages/${pageName}.html`),
    getProfile()
  ]).then(([html, data]) => {
    article.innerHTML = html;
    if (pageName === 'about') renderAbout(article, data);
    if (pageName === 'resume') renderResume(article, data);
    if (pageName === 'projects') renderProjects(article, data);
    return article;
  }).catch(error => {
    pageLoads.delete(pageName);
    article.replaceChildren();
    throw error;
  });
  pageLoads.set(pageName, loading);
  return loading;
}

async function navigate(focusHeading = true) {
  const hash = location.hash.slice(1);
  if (hash === 'main-content' && document.querySelector('[data-page]:not([hidden])')) return;
  const pageName = pageNames.includes(hash) ? hash : 'about';
  const requestId = ++navigationId;
  if (modal.open) modal.close();
  document.querySelectorAll('[data-page]').forEach(article => { article.hidden = true; });
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    if (link.dataset.navLink === pageName) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  status.hidden = false;
  status.className = 'loading-state';
  status.setAttribute('role', 'status');
  status.textContent = 'Loading portfolio...';
  document.getElementById('main-content').setAttribute('aria-busy', 'true');
  try {
    const article = await loadPage(pageName);
    // A slow fetch must not replace a newer navigation.
    if (requestId !== navigationId) return;
    status.hidden = true;
    article.hidden = false;
    document.title = `${pageName[0].toUpperCase() + pageName.slice(1)} | ${profile.name} - AI & Cloud Architecture`;
    if (focusHeading) {
      const heading = article.querySelector('h1');
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  } catch (error) {
    console.error('Unable to load portfolio content.', error);
    if (requestId !== navigationId) return;
    status.className = 'error-state';
    status.setAttribute('role', 'alert');
    status.innerHTML = '<h1>Content could not be loaded.</h1><p>Please try again.</p><button class="button" type="button" data-retry>Retry</button>';
  } finally {
    if (requestId === navigationId) document.getElementById('main-content').removeAttribute('aria-busy');
  }
}

function openProject(projectId, trigger) {
  const project = profile.projects.find(item => item.id === projectId);
  if (!project) throw new Error(`Unknown project: ${projectId}`);
  dialogTrigger = trigger;
  const showcase = project.stage === 'Architecture showcase';
  document.getElementById('projectModalContent').innerHTML = `
    <div class="dialog-meta">${tags([project.industry, project.category, project.stage])}</div>
    <h2 id="projectModalTitle">${escapeHtml(project.title)}</h2>
    <p>${escapeHtml(project.summary)}</p>
    <h3>${showcase ? 'Capability focus' : 'My contribution'}</h3><p>${escapeHtml(project.role)}</p>
    <h3>Technical approach</h3>${list(project.approach)}
    <h3>${showcase ? 'Capabilities illustrated' : 'Delivery outcomes'}</h3>${list(project.outcomes)}
    <h3>Technology</h3>${tags(project.technologies)}`;
  modal.showModal();
  modal.scrollTop = 0;
  modal.querySelector('[data-close-dialog]').focus();
}

document.addEventListener('click', event => {
  const projectButton = event.target.closest('[data-project-id]');
  if (projectButton) openProject(projectButton.dataset.projectId, projectButton);
  if (event.target.closest('[data-close-dialog]')) modal.close();
  if (event.target.closest('[data-retry]')) navigate();

  const projectFilter = event.target.closest('[data-project-filter]');
  if (projectFilter) {
    const category = projectFilter.dataset.projectFilter;
    document.querySelectorAll('[data-project-filter]').forEach(button => {
      button.setAttribute('aria-pressed', String(button === projectFilter));
    });
    let count = 0;
    document.querySelectorAll('#project-grid [data-project-category]').forEach(card => {
      card.hidden = category !== 'All' && card.dataset.projectCategory !== category;
      if (!card.hidden) count++;
    });
    document.getElementById('project-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
  }
  const galleryFilter = event.target.closest('[data-gallery-filter]');
  if (galleryFilter) {
    document.querySelectorAll('[data-gallery-filter]').forEach(button => {
      button.setAttribute('aria-pressed', String(button === galleryFilter));
    });
    let count = 0;
    document.querySelectorAll('[data-gallery-category]').forEach(card => {
      card.hidden = galleryFilter.dataset.galleryFilter !== 'all' && card.dataset.galleryCategory !== galleryFilter.dataset.galleryFilter;
      if (!card.hidden) count++;
    });
    document.getElementById('gallery-count').textContent = `${count} photos`;
  }
  const navLink = event.target.closest('[data-nav-link]');
  if (navLink && location.hash === navLink.hash) {
    event.preventDefault();
    navigate();
  }
});

modal.addEventListener('click', event => {
  const bounds = modal.getBoundingClientRect();
  if (event.target === modal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) modal.close();
});
modal.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    event.preventDefault();
    modal.close();
  }
});
modal.addEventListener('close', () => {
  if (dialogTrigger && !dialogTrigger.closest('[hidden]')) dialogTrigger.focus({ preventScroll: true });
});
window.addEventListener('hashchange', () => navigate());

const themeToggle = document.getElementById('themeToggle');
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.textContent = dark ? 'Light mode' : 'Dark mode';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.warn('Could not save the theme preference.', error);
  }
  updateThemeLabel();
});
updateThemeLabel();
navigate(false);
