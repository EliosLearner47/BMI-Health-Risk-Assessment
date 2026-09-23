# BMI Health Risk Assessment System

> **B.Tech Information Technology — Mini Project**  
> An educational, privacy-first BMI calculator and transparent health-risk indicator.

---

## Project Description

The **BMI Health Risk Assessment System** is a fully client-side React web application that allows users to:

1. Calculate their Body Mass Index (BMI) using the standard WHO formula
2. View their BMI on a visual gauge categorised into four zones
3. Receive an **educational, rule-based health-risk indicator** based on BMI and self-reported lifestyle factors
4. View a **fully transparent breakdown** of how the indicator was calculated
5. Read general health education suggestions
6. View and manage their assessment history (stored locally in the browser)

> ⚠️ **This is an educational tool only.** It does not diagnose disease, replace medical advice, or predict future health outcomes.

---

## Features

- ✅ Standard BMI calculation (weight ÷ height²)
- ✅ Visual BMI gauge with colour-coded zones
- ✅ Transparent rule-based risk scoring (fully explained)
- ✅ Multi-section form with strong client-side validation
- ✅ Assessment history stored in `localStorage`
- ✅ Dark / light mode with `localStorage` persistence
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Accessible (semantic HTML, ARIA, keyboard navigation)
- ✅ Print-friendly results page
- ✅ Zero backend — all computation happens in the browser
- ✅ Ready for Vercel deployment

---

## Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Build tool |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Styling |
| React Router | 6 | Client-side routing |
| Lucide React | latest | Icons |
| localStorage | Browser API | History + theme persistence |

---

## How BMI is Calculated

The application uses the **standard Body Mass Index formula**:

```
BMI = Weight (kg) ÷ Height (m)²
```

Example:
- Weight = 70 kg, Height = 175 cm (1.75 m)
- BMI = 70 ÷ (1.75)² = 70 ÷ 3.0625 ≈ **22.9** → **Normal**

### BMI Categories (WHO Standard)

| BMI Range | Category |
|---|---|
| < 18.5 | Underweight |
| 18.5 – 24.9 | Normal |
| 25.0 – 29.9 | Overweight |
| ≥ 30.0 | Obesity |

---

## How the Educational Risk Indicator Works

> This scoring system is a **project-specific educational construct**. It is NOT clinically validated.

Each factor is assigned points:

| Factor | Value | Points |
|---|---|---|
| BMI | Normal | 0 |
| BMI | Underweight | 1 |
| BMI | Overweight | 1 |
| BMI | Obesity | 2 |
| Activity | Very/Moderately Active | 0 |
| Activity | Lightly Active | 1 |
| Activity | Sedentary | 2 |
| Smoking | Never | 0 |
| Smoking | Former | 1 |
| Smoking | Current | 2 |
| Each additional risk factor | — | +1 |

### Risk Level Classification

| Total Score | Risk Level |
|---|---|
| 0 – 2 | Lower Risk Indicator |
| 3 – 5 | Moderate Risk Indicator |
| 6+ | Higher Risk Indicator |

---

## Project Architecture

```
src/
├── types/
│   └── index.ts              # Shared TypeScript interfaces
├── context/
│   └── ThemeContext.tsx       # Dark/light theme with localStorage
├── utils/
│   ├── bmiCalculator.ts      # BMI formula & category logic
│   ├── riskCalculator.ts     # Rule-based educational scoring
│   ├── validation.ts         # Form validation helpers
│   └── storage.ts            # localStorage helpers (with error handling)
├── components/
│   ├── Navbar.tsx            # Responsive navigation
│   ├── Footer.tsx            # Footer with links and privacy note
│   ├── ThemeToggle.tsx       # Dark/light toggle button
│   ├── Disclaimer.tsx        # Reusable medical disclaimer
│   ├── BMIForm.tsx           # Multi-section assessment form
│   ├── BMIGauge.tsx          # Visual gauge bar
│   ├── RiskIndicator.tsx     # Color-coded risk card
│   ├── RiskBreakdown.tsx     # Transparent scoring table
│   ├── RecommendationCard.tsx# Educational suggestions
│   └── HistoryTable.tsx      # History list with expand/delete
├── pages/
│   ├── Home.tsx              # Landing page
│   ├── Assessment.tsx        # Form page
│   ├── Results.tsx           # Results dashboard
│   ├── History.tsx           # Assessment history
│   └── About.tsx             # How it works
├── App.tsx                   # Route definitions
├── main.tsx                  # React entry point
└── index.css                 # Tailwind layers + component classes
```

---

## Folder Structure

```
bmi-health-app/
├── public/
│   └── favicon.svg
├── src/                      # Application source (see above)
├── index.html                # HTML entry with SEO meta tags
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json               # SPA rewrite for Vercel
└── README.md
```

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher (LTS recommended)
- npm v9 or higher (bundled with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/bmi-health-app.git

# 2. Enter the project folder
cd bmi-health-app

# 3. Install dependencies
npm install
```

---

## Local Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Build (Production)

```bash
npm run build
```

The production bundle is output to `dist/`.

To preview the production build locally:

```bash
npm run preview
```

---

## Deployment to Vercel

### Option 1 — Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel
```

Follow the prompts:
- Framework: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

### Option 2 — Vercel Dashboard (recommended)

1. Push the project to GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **New Project** → **Import Git Repository**.
4. Select your `bmi-health-app` repository.
5. Vercel auto-detects Vite. Click **Deploy**.
6. Done! Vercel serves the `dist/` folder.

The `vercel.json` in the project root handles SPA routing:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

---

## GitHub Commands

```bash
# Initialise git in the project folder
git init

# Add all files
git add .

# First commit
git commit -m "feat: initial BMI Health Risk Assessment System"

# Create a new GitHub repository and add remote
git remote add origin https://github.com/YOUR_USERNAME/bmi-health-app.git

# Push to GitHub
git push -u origin main
```

---

## Privacy Notes

- **No backend server** is used.
- **No personal data** is transmitted anywhere.
- Assessment history is stored in `window.localStorage` on the user's own device.
- No cookies, analytics, telemetry, or third-party SDKs.
- Users can delete their history at any time from the History page.

---

## Medical Disclaimer

> This application is an **educational tool created for a B.Tech IT mini project**. It is intended solely to demonstrate how BMI is calculated and how a simple rule-based scoring system works.
>
> The health-risk indicator is **NOT a medically validated prediction model** and should NOT be used to diagnose any condition, replace professional medical advice, or guide medical treatment.
>
> Always consult a qualified and registered healthcare professional for health-related concerns.

---

## Future Enhancements

- [ ] Waist circumference input for improved obesity assessment
- [ ] BMI-for-age charts for paediatric assessment
- [ ] Export results as PDF
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Charts showing BMI trend over time from history
- [ ] Dark-mode print styles
- [ ] Progressive Web App (PWA) offline support
- [ ] Unit tests with Vitest

---

*Developed as a B.Tech Information Technology mini project. For educational purposes only.*
