# Simple GitHub Pages Deployment - Manual Steps

## Quick Deploy - Copy & Paste These Commands

Open PowerShell and follow these steps:

### Step 1: Navigate to Portfolio Folder
```powershell
cd "C:\Users\vbhadauria\OneDrive - Microsoft\Desktop\My Resume\portfolio"
```

### Step 2: Check if Git is Installed
```powershell
git --version
```
If you see an error, install Git from: https://git-scm.com/downloads

### Step 3: Initialize Git (if needed)
```powershell
git init
```

### Step 4: Configure Git
Replace with your actual name and email:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 5: Add All Files
```powershell
git add .
```

### Step 6: Create First Commit
```powershell
git commit -m "Initial portfolio commit"
```

### Step 7: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `portfolio`
3. Description: `My Professional Portfolio`
4. Choose: **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README
6. Click "Create repository"

### Step 8: Link to GitHub
Replace `YOUR-USERNAME` with your actual GitHub username:
```powershell
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 9: Enable GitHub Pages
1. Go to: https://github.com/YOUR-USERNAME/portfolio/settings/pages
2. Under "Source":
   - Branch: Select `main`
   - Folder: Select `/ (root)`
3. Click "Save"
4. Wait 1-2 minutes

### Step 10: Visit Your Live Site!
```
https://YOUR-USERNAME.github.io/portfolio/
```

---

## Future Updates

When you make changes to your portfolio:

```powershell
cd "C:\Users\vbhadauria\OneDrive - Microsoft\Desktop\My Resume\portfolio"
git add .
git commit -m "Update portfolio"
git push
```

Changes will be live in 1-2 minutes!

---

## Troubleshooting

**"fatal: remote origin already exists"**
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
```

**"failed to push some refs"**
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

**404 Error on GitHub Pages**
- Make sure file is named `index.html` (lowercase)
- Check that it's in the root folder, not in a subfolder
- Wait a few minutes - deployments can take time

**Images not showing**
- Check file paths in index.html
- Make sure images are in `assets/images/` folder
- File names are case-sensitive!

---

## Quick Checklist

Before going live:
- [ ] Replace `my-avatar.png` with your photo
- [ ] Replace project images (project-1.jpg through project-9.jpg)
- [ ] Update email in index.html
- [ ] Update phone in index.html
- [ ] Add LinkedIn URL
- [ ] Add GitHub URL
- [ ] Test all navigation tabs
- [ ] Test on mobile (browser dev tools)

---

## Alternative: Use GitHub Desktop (GUI Method)

If you prefer a visual interface:

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in
3. Click "File" → "New Repository"
4. Name: `portfolio`
5. Local Path: Choose where to create it
6. Click "Create Repository"
7. Copy all your portfolio files to this new folder
8. In GitHub Desktop, write commit message: "Initial portfolio"
9. Click "Commit to main"
10. Click "Publish repository"
11. Uncheck "Keep this code private"
12. Click "Publish repository"
13. Go to GitHub.com → Your repo → Settings → Pages
14. Enable GitHub Pages (main branch, root folder)

Done! No command line needed!

---

Need help? See the full guide: GITHUB_PAGES_DEPLOYMENT.md
