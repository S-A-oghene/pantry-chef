# Pantry Chef 🍳

A responsive web application that helps you discover Nigerian recipes based on ingredients you have at home, with nutritional analysis and Nigerian-specific cooking features.

**🌐 Live Site:** https://S-A-oghene.github.io/pantry-chef/ ✨

---

## 📋 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [API Configuration](#api-configuration)
- [npm Scripts](#npm-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Features
- **Ingredient-Based Search** - Find recipes by typing ingredients you have (e.g., "rice", "chicken", "pepper")
- **Auto-Suggest** - Real-time ingredient suggestions as you type
- **Recipe Details** - Complete recipe with ingredients, method, nutritional info, and cooking tips
- **Nigerian Specials** - Quick access to popular Nigerian dishes

### User Experience
- **Responsive Design** - Perfect on mobile (320px), tablet (768px), and desktop (1024px+)
- **Dark Mode** - Toggle between light and dark themes (persists in localStorage)
- **Favorites** - Save recipes for later (stored locally in browser)
- **Share & Print** - Share recipes via WhatsApp, Twitter, or copy link; print-friendly format

### Nigerian-Specific Features
- **Measurement Conversions** - Convert cups to traditional Nigerian measures
- **Pantry Tips** - Storage and cooking tips tailored for Nigerian ingredients
- **Trending Recipes** - See what's trending in Nigeria

### Technical Features
- **API Integration** - Real recipes from TheMealDB, nutritional data from Edamam
- **Lazy Loading** - Images load as you scroll for better performance
- **Dark Mode** - Entire interface adapts to dark mode preference
- **LocalStorage Persistence** - Favorites and settings saved locally

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher (v20+ recommended)
- **npm** v10 or higher
- **Git** for version control
- ~200MB disk space

### Installation Steps

**1. Clone the Repository**
```bash
git clone https://github.com/S-A-oghene/pantry-chef.git
cd pantry-chef
```

**2. Install Dependencies**
```bash
npm install
```

**3. Set Up API Configuration**
```bash
cp src/js/config.template.mjs src/js/config.mjs
```

**4. Add Your API Keys**
- Open `src/js/config.mjs`
- Add Edamam API credentials (TheMealDB is free/no key needed)

**5. Start Development Server**
```bash
npm start
```

Opens at `http://localhost:5173`

---

## 🏗️ Building for Production

```bash
npm run build
```

Creates optimized `dist/` directory ready for deployment.

---

## 🚀 Deployment

The app is automatically deployed to GitHub Pages on every push to `main`:
- **Live URL:** https://S-A-oghene.github.io/pantry-chef/
- **CI/CD:** GitHub Actions handles build, test, and deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

---

## 📁 Project Structure

```
pantry-chef/
├── .github/workflows/deploy.yml  # GitHub Actions CI/CD
├── src/
│   ├── index.html                # Home page
│   ├── recipe/                   # Recipe pages
│   ├── favorites/                # Favorites page
│   ├── tips/                     # Tips page
│   ├── css/style.css             # All styling
│   ├── js/                       # 17 JavaScript modules
│   └── public/images/            # Static assets
├── dist/                         # Production build
├── vite.config.js               # Build configuration
├── eslint.config.js             # Code quality
├── jest.config.js               # Testing
├── package.json                 # Dependencies
└── README.md                     # This file
```

---

## 💻 Technologies

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Build:** Vite 5.4.21
- **Quality:** ESLint 9.39.2, Prettier 3.8.1
- **Testing:** Jest 29.7.0
- **APIs:** TheMealDB, Edamam
- **Deployment:** GitHub Pages + GitHub Actions

---

## 🔐 API Configuration

### Setup Guide
1. Create `src/js/config.mjs` from template
2. Add Edamam API credentials (get free key from [Edamam Developer Portal](https://developer.edamam.com/))
3. TheMealDB is free (no key needed)

**⚠️ Never commit real API keys to Git**

---

## 📝 npm Scripts

| Script | Purpose |
|--------|---------|
| `npm start` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Code quality check |
| `npm run test` | Run tests |

---

## ✅ Quality Metrics

- **ESLint:** 0 errors, 0 warnings
- **Tests:** 1/1 passing
- **Build:** ✅ Successful
- **Deployment:** ✅ Live on GitHub Pages

---

## 📚 Documentation

- [SETUP.md](SETUP.md) - Detailed setup instructions
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [FEATURES.md](FEATURES.md) - Complete feature list
- [TESTING.md](TESTING.md) - Testing procedures
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Project overview

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

ISC License - see LICENSE for details.

---

## 🙏 Acknowledgments

- **TheMealDB** - Recipe API
- **Edamam** - Nutritional data
- Nigerian cooking community

---

**Built with ❤️ by S-A-oghene**
