# Vinay Singh - Personal Portfolio

A modern, responsive personal portfolio website showcasing your professional experience, skills, and projects.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional dark theme with smooth animations
- **Interactive Navigation**: Easy-to-use navigation between different sections
- **Portfolio Showcase**: Display your major projects with filtering capabilities
- **Contact Form**: Built-in contact form for easy communication
- **Skills Visualization**: Visual representation of technical skills with progress bars

## 📁 Structure

```
portfolio/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css      # Styling
│   ├── js/
│   │   └── script.js      # Interactive functionality
│   └── images/            # Images and icons
│       ├── my-avatar.png  # Your profile picture (REPLACE THIS!)
│       ├── project-*.jpg  # Project screenshots (REPLACE THESE!)
│       └── *.svg          # Icon files
└── README.md              # This file
```

## 🎨 Sections

1. **About**: Professional summary and core competencies
2. **Resume**: Education, experience timeline, and technical skills
3. **Portfolio**: Showcase of 9 major projects (NDA-compliant, no client names)
4. **Contact**: Contact form and location map

## ⚠️ NDA Compliance

This portfolio has been designed with NDA compliance in mind:
- ✅ No specific customer/client names mentioned
- ✅ Generic project descriptions (e.g., "Enterprise HR AI Assistant" instead of client names)
- ✅ Focus on technical accomplishments and architectures
- ✅ Employer names generalized in experience section

Projects showcase:
- Enterprise HR AI Assistant
- AI-Driven Invoice Processing
- Data Governance Platform
- AI Procurement Platform
- Operations AI Assistant
- Connected Vehicle Platform
- Enterprise Email Data Platform
- AI Claims Processing
- AI-Enabled Hiring Platform

## ✏️ Customization Guide

### 1. Replace Placeholder Images

**Profile Picture**:
- Replace `assets/images/my-avatar.png` with your professional photo
- Recommended size: 150x150px

**Project Screenshots**:
- Replace the placeholder project images (`project-1.jpg` through `project-9.jpg`)
- Recommended size: 400x300px or similar aspect ratio
- Use generic screenshots that don't reveal client-specific information

**Award/Company Logos**:
- Replace `microsoft-logo.png`, `award-icon.png`, `excellence-icon.png` with actual logos
- Or keep generic if preferred for NDA compliance

### 2. Update Contact Information

In `index.html`, update:
- Email address (line ~79): `vinay.singh@example.com` → your actual email
- Phone number (line ~91): `+91 (000) 000-0000` → your actual phone
- Social media links (lines ~130-150): Update LinkedIn, GitHub, Twitter URLs

### 3. Customize Content

**About Section**:
- Currently uses your professional summary from resume
- Edit if you want different text for web vs document

**Services Section**:
- Highlights: Azure Architecture, GenAI & AI Solutions, Platform Engineering, Technical Leadership
- Modify in HTML if you want to emphasize different areas

**Portfolio Projects**:
- Currently includes 9 NDA-compliant project descriptions
- Categories: Enterprise AI, Cloud Platform, Data & Governance
- Add/remove/modify projects as needed while maintaining NDA compliance

### 4. Map Location

Update the Google Maps embed (line ~1145):
- Current: Delhi, India (generic)
- Replace with your actual location or remove if preferred

### 5. Favicon

Create and add a favicon:
- Place `logo.ico` in `assets/images/`
- Or update line 13 in index.html to point to your favicon

## 🚚 Deployment

### Quick Start: Use the Deployment Script! 

**Easiest Way**: Run the provided PowerShell script:
```powershell
cd "C:\Users\vbhadauria\OneDrive - Microsoft\Desktop\My Resume\portfolio"
.\deploy-to-github.ps1
```
This interactive script will guide you through the entire deployment process!

### Full Deployment Guide

See [GITHUB_PAGES_DEPLOYMENT.md](GITHUB_PAGES_DEPLOYMENT.md) for complete step-by-step instructions.

### Option 1: GitHub Pages (Recommended - Free)

1. Create a new GitHub repository
2. Push your portfolio folder to the repository
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at: `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Easy - Free)

1. Sign up at netlify.com
2. Drag and drop your portfolio folder
3. Site goes live immediately with a custom URL

### Option 3: Vercel (Modern - Free)

1. Sign up at vercel.com
2. Import your project
3. Deploy with one click

### Option 4: Traditional Hosting

Upload files to any web hosting service (GoDaddy, Bluehost, etc.)

## 🎯 Next Steps

1. ✅ Portfolio structure created
2. ⬜ Replace placeholder images with real ones
3. ⬜ Update contact information
4. ⬜ Customize content as needed
5. ⬜ Test locally by opening `index.html` in a browser
6. ⬜ Deploy to your preferred hosting platform
7. ⬜ Share your portfolio URL!

## 🔧 Local Testing

Simply open `index.html` in any modern web browser:
- Double-click the file, or
- Right-click → Open with → Your browser

No server required for basic testing!

## 📝 Credits

- Template: Based on [vCard by codewithsadee](https://github.com/codewithsadee/vcard-personal-portfolio)
- Icons: Ionicons
- Fonts: Google Fonts (Poppins)

## 📄 License

Feel free to use this portfolio for your personal use. Remember to customize it to reflect your own professional brand!

---

**Built with ❤️ for Vinay Singh**
