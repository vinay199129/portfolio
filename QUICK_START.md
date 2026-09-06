# Local preview and content updates

Run the **Serve Portfolio Locally** VS Code task and open
`http://localhost:8000`. Or, from this directory:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Review `index.html` rendering, CSS and JavaScript behavior, and desktop, tablet,
and mobile layouts. Try all five sections, project and gallery filters, keyboard
navigation, and light/dark themes. Publish only after
approving the local presentation.

Edit professional content in `assets\data\profile.json`, then synchronize the
website metadata using `python scripts\sync_site.py`. The website reads the same
data. Resume downloads are deferred to a separate release; leave the local drafts
and original resumes unchanged.

See [README.md](README.md) for structure, synchronization rules, and publishing.
