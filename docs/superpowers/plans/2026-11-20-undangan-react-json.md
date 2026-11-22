# React Wedding Invitation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first Indonesian wedding invitation in React with an animated cover, RSVP and wishes forms saved to local JSON files, gift details, and music controls.

**Architecture:** Vite serves the React app in development and builds it to `dist`. An Express server exposes two write-only POST endpoints, validates submissions, stores them in separate JSON files outside the static directory, and serves `dist` in production.

**Tech Stack:** React, Vite, Express, Node.js, CSS, and JSON files. Vite requires Node.js 20.19+ or 22.12+; Express 5 supports Node.js 18+. Sources: [React/Vite setup](https://react.dev/learn/build-a-react-app-from-scratch), [Vite guide](https://vite.dev/guide/), [Express middleware](https://expressjs.com/en/guide/using-middleware/), [Express static files](https://expressjs.com/en/starter/static-files/).

**Spec:** `docs/superpowers/specs/2026-11-20-undangan-digital-design.md`

## Global Constraints

- One responsive React SPA, with priority on phones.
- The cover opens the invitation on an explicit click with a short transition and reduced-motion support.
- RSVP and wishes are stored in `data/rsvps.json` and `data/wishes.json`; do not store personal data in source code or in a publicly served folder.
- The API exposes only `POST /api/rsvps` and `POST /api/wishes`; no public endpoint may read saved data.
- Validate every field on the server before writing: name ≤100 chars, address ≤200 chars, wish ≤1,000 chars, WhatsApp 7–15 digits after removing formatting, and guest count 1–50 when attendance is `yes`.
- `guestCount` is `null` when attendance is `no`.
- File writes must be serialized and atomic; malformed existing data must fail closed without overwriting it.
- Gift information and audio are honest placeholders until supplied by the user.
- The production Node host must have a persistent writable disk; ephemeral/serverless storage can lose submissions.
- Do not add or run tests unless the user asks.

## Review Focus

- Two close submissions to the same JSON file must both remain saved; Task 1 owns serialized writes and atomic replacement.
- Invalid, oversized, or malformed submissions must return an error and leave existing JSON unchanged; Task 1 owns body limits and server validation.
- A guest who selects `no` must not save a guest count; Task 3 owns conditional fields and request shape.
- Saved JSON must never be reachable through static routes or public read endpoints; Task 1 owns static serving and route boundaries.
- Missing audio or blocked playback must not prevent opening the invitation; Task 4 owns playback fallback.

---

### Task 1: Scaffold React and the local JSON API

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `.gitignore`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `server/index.js`
- Create: `server/store.js`
- Create: `server/validation.js`
- Create: `README.md`

**Interfaces:**
- `POST /api/rsvps` accepts `{ name, whatsapp, attendance, guestCount }`; returns `{ ok: true }` with 201 or `{ error }` with a client/server error status.
- `POST /api/wishes` accepts `{ name, address, message }`; returns the same response contract.
- `server/store.js` exports `appendRecord(kind, record)` where `kind` is exactly `"rsvps"` or `"wishes"`; it maps to a fixed filename and never accepts a filesystem path from the request.
- Vite proxies `/api` to the Express development server. In production, Express serves only `dist/` as static content.

- [ ] Add the Vite React entry point, package scripts, dependencies, and development proxy. `npm run dev` starts Vite and Express; `npm run build` produces `dist`; `npm start` serves the production build and API.
- [ ] Add Express routes with a JSON body limit, server-side validation, bounded error responses, and no GET route for records. Keep the `data/` directory outside `dist/`.
- [ ] Add serialized atomic JSON writes that initialize missing files as empty arrays, preserve existing records, and reject malformed stored JSON without replacing it.
- [ ] Ignore runtime JSON data in Git and document local data paths, production persistent-disk requirement, and commands in `README.md`.

### Task 2: Build the invitation cover and letter flow

**Files:**
- Create: `src/App.jsx`
- Create: `src/components/InvitationCover.jsx`
- Create: `src/components/InvitationContent.jsx`
- Create: `src/styles.css`

**Interfaces:**
- `App` owns whether the cover is open and renders `InvitationCover` before the invitation is revealed.
- `InvitationCover` calls `onOpen()` after the guest activates “Buka Undangan”.
- `InvitationContent` renders the letter, couple details, schedule, location, and section anchors.

- [ ] Build the cover with the title “Undangan Pernikahan” and a clear “Buka Undangan” button.
- [ ] Add a short cover exit and invitation reveal transition; keep invitation opening independent from audio playback.
- [ ] Add the romantic editorial invitation content from the existing direction, using clearly labeled sample names, dates, venue, and image.
- [ ] Add responsive layout, keyboard-visible focus, adequate tap targets, and reduced-motion behavior.

### Task 3: Connect RSVP and wishes forms

**Files:**
- Create: `src/components/RSVPForm.jsx`
- Create: `src/components/WishForm.jsx`
- Create: `src/lib/api.js`
- Modify: `src/App.jsx`

**Interfaces:**
- `submitRSVP(payload)` POSTs the exact RSVP contract from Task 1 to `/api/rsvps`.
- `submitWish(payload)` POSTs the exact wishes contract from Task 1 to `/api/wishes`.
- `RSVPForm` renders a guest-count input only for `attendance === "yes"` and sends `guestCount: null` for `"no"`.
- `WishForm` requires name, address, and message.

- [ ] Add labeled Indonesian form inputs with matching client-side limits and phone formatting support.
- [ ] Add clear submitting, success, and error states; disable repeat submission while one request is pending.
- [ ] Send form submissions to the API and display success only after a successful server response.
- [ ] Explain near the forms that RSVP and wishes are saved in project files and are not displayed publicly.

### Task 4: Add gift and music sections

**Files:**
- Create: `src/components/GiftSection.jsx`
- Create: `src/components/MusicPlayer.jsx`
- Create: `src/content/invitation.js`
- Create: `public/audio/.gitkeep`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- `invitation.js` holds replaceable sample event and gift details plus `audioSrc: "/audio/wedding-song.mp3"`.
- `MusicPlayer` receives `audioSrc` and `shouldPlay`; `App` passes the invitation-open state as `shouldPlay`. The player provides a labeled play/pause control and reports playback failure without blocking the invitation.
- `GiftSection` shows bank/QR placeholders until real details are provided; copy action is unavailable while no account value exists.

- [ ] Add the gift section with visibly marked bank, account-holder, account-number, and QR placeholders; only offer copy when a real value is configured.
- [ ] Add a play/pause music control linked to the user-supplied audio path. If the file is absent or playback is blocked, show a clear message and keep the invitation usable.
- [ ] Add the replaceable event/gift/audio data in one small content module and explain the missing audio and gift inputs in the README.

## Implementation note

No automated tests are included in this plan because the current developer instruction says not to add or run tests unless the user asks. The final read-only audit should inspect the review-focus cases by code; browser behavior remains unverified unless the user asks for runtime verification and browser tooling is available.
