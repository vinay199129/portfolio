# Vinay Pratap Singh - Portfolio

A static, single-page portfolio for enterprise AI and cloud architecture. It uses
plain HTML, CSS, and JavaScript: no runtime CSS compiler, web-font download, or
front-end package installation is required.

## Content synchronization

`assets\data\profile.json` is the shared source for the professional headline,
summary, contact details, project outcomes, skills, career history, credentials,
education, and awards. The About, Projects, and Resume views render this data.
`showcaseProjectIds` selects capability illustrations, explicitly labeled
as architecture showcases on the website, not as client
delivery achievements. Keep these summaries abstract and free of customer
identities, internal URLs, operational parameters, and proprietary details.

Update the JSON first, then refresh search metadata and the JavaScript-free
fallback from this directory:

```powershell
python scripts\sync_site.py
```

Synchronization uses only the Python standard library. Keep the metadata,
fallback, and content source together in any deployment. Missing or unconfirmed
skills must not be published as claimed experience.

Downloadable resumes are deferred to a separate release. The Resume section
currently presents experience and credentials on the website only. Local resume
drafts and generation tooling are not part of this release; do not overwrite
existing source resumes or publish draft downloads.

## Local preview

From the parent workspace, run the **Serve Portfolio Locally** VS Code task.
Alternatively, from this directory:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000`. A local HTTP server is required because content is
loaded with `fetch()`; opening `index.html` through `file://` is unsupported.

Before publishing, review the home page, all five navigation sections,
project dialogs, filters, keyboard navigation, light/dark themes, and
desktop/tablet/mobile layouts. Push only after approving the local presentation.

## Structure

| Path | Purpose |
|---|---|
| `index.html` | Accessible page shell, navigation, metadata, and project dialog |
| `pages\*.html` | Root-relative partials: About, Projects, Resume, Resources, Gallery |
| `assets\data\profile.json` | Shared professional content |
| `assets\js\script.js` | Content rendering, hash routing, filters, and dialogs |
| `assets\js\theme.js` | Initial theme selection before rendering |
| `assets\css\style.css` | Responsive styles, theme tokens, reduced-motion and print support |
| `assets\images\gallery\thumbs` | Small grid images; originals load only when opened |
| `scripts\sync_site.py` | Shared-data metadata and JavaScript-free fallback |

Partials are injected into `index.html`, so asset URLs in them must start with
`./assets/`, **not** `../assets/`. Navigation uses fragments such as `#projects`;
page partials are not standalone destinations.

The ink-and-brass palette uses ivory surfaces in light mode and layered ink
surfaces with warm highlights in dark mode. The theme follows the system preference, supports an explicit
`?scoutTheme=light` or `?scoutTheme=dark` override, and remembers manual selection
when browser storage is available. Project dialogs support keyboard navigation,
Escape, and focus restoration.

## Publishing and content care

Publish this directory to GitHub Pages. There is no front-end build step.
Client names are anonymized, but anonymization alone is not a guarantee of NDA
compliance; review project details and metrics for permission before publication.
Do not infer credentials, job titles, outcomes, or tool expertise from a target
job description. Add them only when supported by actual experience.

The original portfolio was based on
[vCard by codewithsadee](https://github.com/codewithsadee/vcard-personal-portfolio).
The current presentation uses locally served, semantic markup and shared data.
