# Developer Guide

This is a guide to help you run the Katze Social fronted locally fast, run tests, and ship high‑quality pull requests.

---

## Quickstart

```bash
# 1) Install dependencies
npm install

# 2) Apply repo patches (required after install)
npx patch-package

# 3) Run the app (pick one)
npm run web        # Web (recommended for first-time contributors)
npm run android    # Android (emulator or device required)
npm run ios        # iOS (macOS + Xcode required)
```

---

# Prerequisites

- Node.js and npm
- Git
- For native:
  - Android: Android Studio + SDK, an emulator or device
  - iOS: macOS with Xcode installed
- For end‑to‑end tests: Playwright browsers
  - Install once: `npx playwright install --with-deps`

You do not need to install the Expo CLI globally; commands are run via npm scripts or `npx`.

---

## Scripts you’ll use

- `npm run web` – start the app in the browser
- `npm run android` – run on Android
- `npm run ios` – run on iOS
- `npm run typecheck` – TypeScript type checks
- `npm run lint` – ESLint

---

## Testing and quality

### Type checks (TypeScript)

```bash
npm run typecheck
```
### Linting (ESLint)

```bash
npm run lint
# Optional auto-fix
npx eslint . --fix
```

---

## Troubleshooting

- After ```npm install```, always run:
```bash
npx patch-package
```

- Expo cache hiccups (rare):
```bash
npx expo start -c
```

---

## Katlin Philosophy

Katlin Studios maintains a philosophy of avoiding unnecessary abstraction and excessive libraries, favouring tailor-made and customised systems for in-depth understanding and optimisation, as well as concise and effective documentation. Therefore, here we provide documentation on how to use our own integrated frameworks for this project:

- **[Custom Stores System](https://github.com/katlinstudios/katze-social-frontend/blob/main/docs/STORES.md)**