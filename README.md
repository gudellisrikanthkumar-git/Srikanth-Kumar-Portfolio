# Gudelli Srikanth Kumar | QA Automation Engineer

**Building scalable test automation and engineering confidence in every release.**

🌐 **Live portfolio:** [gudellisrikanthkumar-git.github.io/Srikanth-Kumar-Portfolio](https://gudellisrikanthkumar-git.github.io/Srikanth-Kumar-Portfolio/)

## 🎯 About Me

QA Automation Engineer with **6+ years** of experience across claims, insurance, and healthcare platforms, specializing in:

- **Test Automation:** Playwright-BDD (TypeScript), Playwright, Selenium WebDriver (Java), TestNG, Cucumber
- **Data-Driven Test Design:** question-matrix feature files, Scenario Outlines, Excel test data
- **AI-Assisted Testing:** AI agents for test case generation, script generation, and self-healing tests (MCP Playwright)
- **Framework Engineering:** Page Object Model, shared step libraries, parallel execution, DB reset and test-data tooling
- **Quality Process:** Agile/Scrum, STLC, CI/CD pipelines, BRD/FRD/RTM traceability

## 📊 Key Achievements

- ✅ **926 automated scenarios** from just 9 data-driven feature files
- ✅ **94–100% suite pass rates**, with a **96% first-attempt** pass rate on Initial Processing
- ✅ **150+ hours** of manual regression saved per cycle
- ✅ **3-worker parallel runs** stabilized with a cross-worker lock and automated claim reset
- ✅ **30% fewer** regression bugs and **40% faster** test execution via Playwright parallel runs

## 🚀 Professional Experience

### QA Automation Engineer, Epiq
**January 2026 – Present**
- Started and led the TCC claims automation effort for QCAP and PCC with a Playwright-BDD framework in TypeScript
- Grew coverage to 926 scenarios using data-driven question-matrix feature files
- Stabilized 3-worker parallel runs with a cross-worker lock, automatic claim unassignment, and DB reset scripts
- Adopted AI agents for test case generation, script generation, and self-healing tests with MCP Playwright
- Ran knowledge-sharing sessions and framework demos for the QA team

### QA Test Engineer, Synergy Global Solutions
**December 2024 – November 2025**
- Built and maintained Selenium WebDriver + Java automation with Cucumber BDD scenarios
- Owned BRD/FRD reviews and Requirements Traceability Matrix creation
- Applied risk-based testing and supported UAT

### QA Test Engineer, Insurite Private Limited
**June 2020 – October 2024**
- Reduced regression bugs by **30%** through comprehensive test automation
- Cut test execution time by **40%** via Playwright parallel runs
- Designed data-driven and hybrid frameworks (POM, Page Factory) with Selenium and TestNG

## 💼 Featured Projects

### 1. TCC: QCAP & PCC Claims Processing Automation (Epiq)
Question-driven claim workflows across Initial Processing, Legal Rep, Deficiency Queue, and Send to PM.
- **Stack:** Playwright-BDD, TypeScript, MCP Playwright, AI agents, SQL, Excel-driven data
- **Impact:** 926 scenarios, 94–100% pass rates, 72 of 74 defect codes validated against business rules, HTML and Excel evidence reports

### 2. CSB: CIGNA Supplemental Benefits
Medicare enrollment for Cancer, Heart, Critical Illness, and Dental products.
- **Stack:** Selenium, Java, TestNG, data-driven testing

### 3. FGI: Agent Virtual Office Portal
Insurance quoting and policy issuance portal with multi-level privileges.
- **Stack:** Selenium, Java, Cucumber, SQL, Maven

### 4. RECLS: Provider Pricing & Rebate Management
Pricing and rebate agreements across pharmaceutical, medtech, GPO, and health-system customers.
- **Stack:** Playwright, data-driven automation, parallel runs, RTS2.0
- **Impact:** 40% faster execution, 30% fewer regression bugs

## 🛠️ Tech Stack

| Area | Tools |
|---|---|
| Automation | Playwright-BDD, Playwright, Selenium WebDriver, TestNG, Cucumber, POM / Page Factory |
| Languages & data | TypeScript, Core Java, SQL (Oracle / DB scripts) |
| Build & versioning | npm, Maven, Git / GitHub |
| AI & process | AI test agents, MCP Playwright, CI/CD pipelines, Agile / Scrum, JIRA, Confluence |

## 📞 Connect

- **Email:** [Gudellisrikanthkumar@gmail.com](mailto:Gudellisrikanthkumar@gmail.com)
- **LinkedIn:** [linkedin.com/in/srikanth-kumar-gudelli-6a8a25338](https://www.linkedin.com/in/srikanth-kumar-gudelli-6a8a25338)
- **GitHub:** [github.com/gudellisrikanthkumar-git](https://github.com/gudellisrikanthkumar-git)
- **Resume:** available on the portfolio (password protected; request access by email)

---

## 🖥️ About This Website

A static portfolio with no build step, hosted on GitHub Pages from the `main` branch.

### Features
- Recruiter-focused layout: hero, impact stats, projects, skills, experience, education, contact
- Dark / light theme toggle (follows system preference, remembers the visitor's choice)
- Smooth wheel scrolling ([Lenis](https://github.com/darkroomengineering/lenis), self-hosted)
- Scroll-reveal animations, animated counters, hero typing effect, scroll progress bar, active nav link
- Animated test-run terminal, photo tilt, and cursor ring (desktop only)
- Password-protected resume download (see below)
- Respects `prefers-reduced-motion`; responsive down to small phones; Person schema (JSON-LD) for SEO

### Project structure
```
index.html                 Page markup and SEO metadata
assets/css/styles.css      All styles, including dark theme and effects
assets/js/script.js        Effects, theme toggle, smooth scroll, resume unlock
assets/js/vendor/          Third-party scripts (Lenis, MIT)
assets/images/             Profile photo
assets/resume/resume.enc   Encrypted resume (the plain PDF is never committed)
scripts/encrypt_resume.mjs Encrypts the resume PDF for the site
scripts/*.py, java-tools/  Local resume text extraction utilities
```

### Run locally
```powershell
python -m http.server 8000
# open http://localhost:8000
```

### Deploying changes
Push to `main`; GitHub Pages redeploys automatically. When you change `styles.css` or `script.js`, bump the `?v=` number on their tags in `index.html` so browsers load the new version.

## 🔒 Password-Protected Resume

The resume is published only as an encrypted file (`assets/resume/resume.enc`, AES-256-GCM with a PBKDF2-SHA256 key, 600,000 iterations). It is decrypted in the visitor's browser after they enter the password, so the readable PDF is never public.

The plain PDF and personal resume data are git-ignored and stay on your machine only (see `.gitignore`):
`assets/resume/*.pdf`, `data/`, `docs/RESUME_EXTRACTION.md`, and the scripts containing contact details.

To update the resume or change the password, place the new PDF at `assets/resume/Gudelli_Srikanth_Kumar_Resume.pdf`, then run:

```powershell
$env:RESUME_PASSWORD = "<password>"; node scripts/encrypt_resume.mjs; Remove-Item Env:RESUME_PASSWORD
```

Commit and push the regenerated `assets/resume/resume.enc`. Never commit the password.

---

*Automating the routine, investigating the unexpected, and finding bugs before users do.* 🐞