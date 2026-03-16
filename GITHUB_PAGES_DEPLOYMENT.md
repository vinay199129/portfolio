# 🚀 Deploy Your Portfolio to GitHub Pages

This guide will help you deploy your portfolio to GitHub Pages for FREE hosting!

## 📋 Prerequisites

- GitHub account (create one at https://github.com if you don't have one)
- Git installed on your computer ([Download Git](https://git-scm.com/downloads))

---

## 🎯 Method 1: Using GitHub Desktop (Easiest - Recommended for Beginners)

### Step 1: Install GitHub Desktop
1. Download from: https://desktop.github.com/
2. Install and sign in with your GitHub account

### Step 2: Create a New Repository
1. Open GitHub Desktop
2. Click **File** → **New Repository**
3. Fill in:
   - **Name**: `portfolio` (or any name you prefer)
   - **Description**: "My Professional Portfolio"
   - **Local Path**: Choose where to save (e.g., Desktop)
   - ✅ Check "Initialize this repository with a README"
4. Click **Create Repository**

### Step 3: Add Your Portfolio Files
1. Open the newly created repository folder
2. Copy ALL files from your portfolio folder:
   ```
   Copy from: C:\Users\vbhadauria\OneDrive - Microsoft\Desktop\My Resume\portfolio\
   Copy to: [Your new repository folder]
   ```
3. Make sure to copy:
   - index.html
   - assets/ folder (with css, js, images)
   - README.md
   - All other files

### Step 4: Commit and Push
1. Go back to GitHub Desktop
2. You'll see all your files listed on the left
3. In the bottom left:
   - **Summary**: "Initial portfolio commit"
   - **Description**: "Add portfolio files"
4. Click **Commit to main**
5. Click **Publish repository** button at the top
6. Uncheck "Keep this code private" if you want it public
7. Click **Publish repository**

### Step 5: Enable GitHub Pages
1. Go to your repository on GitHub.com
2. Click **Settings** tab
3. Scroll to **Pages** in the left sidebar
4. Under **Source**:
   - Branch: Select **main**
   - Folder: Select **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes

### Step 6: Visit Your Live Site! 🎉
Your portfolio will be live at:
```
https://[your-username].github.io/portfolio/
```

---

## 🎯 Method 2: Using Git Command Line (For Developers)

### Step 1: Initialize Git Repository

Open PowerShell in your portfolio folder:

```powershell
cd "C:\Users\vbhadauria\OneDrive - Microsoft\Desktop\My Resume\portfolio"
git init
git add .
git commit -m "Initial portfolio commit"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `portfolio`
3. Description: "My Professional Portfolio"
4. Choose **Public** (for free GitHub Pages)
5. **Don't** initialize with README (we already have files)
6. Click **Create repository**

### Step 3: Push to GitHub

Copy the commands from GitHub (they'll look like this):

```powershell
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 4: Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: **main** branch, **/ (root)** folder
3. Click **Save**

### Step 5: Access Your Site

Visit: `https://YOUR-USERNAME.github.io/portfolio/`

---

## 🎨 Custom Domain (Optional)

Want to use your own domain like `vinaysingh.com`?

### Step 1: Buy a Domain
- Namecheap, GoDaddy, or Google Domains

### Step 2: Configure DNS
Add these records in your domain provider:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     YOUR-USERNAME.github.io
```

### Step 3: Configure GitHub Pages
1. Go to Settings → Pages
2. Custom domain: Enter your domain (e.g., `vinaysingh.com`)
3. Click **Save**
4. Wait for DNS check to complete

---

## 🔄 Updating Your Portfolio

### Using GitHub Desktop:
1. Make changes to your local files
2. Open GitHub Desktop
3. Write commit message
4. Click **Commit to main**
5. Click **Push origin**
6. Changes will be live in 1-2 minutes!

### Using Git Command Line:
```powershell
cd "C:\Users\vbhadauria\OneDrive - Microsoft\Desktop\My Resume\portfolio"
# Make your changes to files
git add .
git commit -m "Update portfolio content"
git push
```

---

## ✅ Checklist Before Going Live

- [ ] Replace `my-avatar.png` with your actual photo
- [ ] Replace project images (project-1.jpg through project-9.jpg)
- [ ] Update email address in index.html
- [ ] Update phone number in index.html
- [ ] Add your LinkedIn URL
- [ ] Add your GitHub URL
- [ ] Add your Twitter URL (if applicable)
- [ ] Test all navigation tabs
- [ ] Test portfolio filters
- [ ] Test on mobile (use browser dev tools)
- [ ] Check all images load correctly
- [ ] Verify contact form layout

---

## 🆘 Troubleshooting

### Site not loading?
- Wait 2-3 minutes after enabling Pages
- Check branch is set to `main` in Pages settings
- Clear your browser cache

### Images not showing?
- Check file paths are correct (case-sensitive!)
- Make sure images are in `assets/images/` folder
- Verify image files were pushed to GitHub

### 404 Error?
- Make sure your file is named exactly `index.html` (lowercase)
- Check it's in the root folder, not in a subfolder

### CSS not loading?
- Check `assets/css/style.css` exists
- Verify the path in index.html is correct

---

## 📊 Track Your Visitors (Optional)

Add Google Analytics to see who visits your portfolio:

1. Create account at https://analytics.google.com
2. Get your tracking code
3. Add to index.html before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

---

## 🎯 Next Steps After Deployment

1. **Share Your Portfolio:**
   - Add to LinkedIn profile
   - Add to email signature
   - Share on Twitter/X
   - Include in resume

2. **SEO Optimization:**
   - Add meta description in index.html
   - Create a sitemap.xml
   - Submit to Google Search Console

3. **Keep It Updated:**
   - Add new projects regularly
   - Update skills as you learn
   - Keep experience current

---

## 🌟 Pro Tips

- **Use a short repository name** for a cleaner URL
- **Enable HTTPS** in GitHub Pages settings (automatically enabled)
- **Create a custom 404 page** by adding `404.html`
- **Optimize images** to reduce load time (use TinyPNG.com)
- **Test on multiple browsers** (Chrome, Firefox, Safari, Edge)

---

## 📝 Quick Reference

| Action | URL |
|--------|-----|
| Your Repository | `https://github.com/YOUR-USERNAME/portfolio` |
| Live Portfolio | `https://YOUR-USERNAME.github.io/portfolio/` |
| GitHub Pages Settings | `https://github.com/YOUR-USERNAME/portfolio/settings/pages` |
| Edit Files Online | Click any file on GitHub → Click pencil icon |

---

**Ready to deploy? Choose Method 1 (GitHub Desktop) for the easiest experience!** 🚀

Need help? GitHub Pages documentation: https://pages.github.com/
