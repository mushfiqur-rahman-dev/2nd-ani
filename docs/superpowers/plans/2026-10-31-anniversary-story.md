# Two Years, One Love Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first romantic anniversary story website that reveals a personalized relationship narrative through scrolling, memories, a love letter, and an optional final surprise.

**Architecture:** A small React + TypeScript + Vite single-page app with all editable story content in `src/content.ts`. UI sections remain in one page composition, while interaction behavior is limited to native browser APIs: `IntersectionObserver` for reveal animations, image preloading for the critical first viewport, and a native lightbox/dialog-like overlay for the gallery. CSS custom properties implement the design tokens and responsive layout without an animation or component library.

**Tech Stack:** React, TypeScript, Vite, plain CSS, Google Fonts (Playfair Display, Inter, Caveat), native `IntersectionObserver`, Vite build.

**Spec:** `design.md`, `prd.md`

## Global Constraints

- Mobile-first web experience, optimized for Android/iPhone viewport widths 360–430px.
- Use the pink romantic palette: `#FFF5F7`, `#F8DDE7`, `#E9AFC3`, `#D78BA7`, `#C46D91`, `#8F4B68`, `#FFFDFB`, `#49343D`, `#927C85`, `#E8D6DE`.
- Use Playfair Display for headings and Inter for body text; Caveat is limited to signature/short handwritten accents.
- Story navigation is natural vertical scrolling with no scroll-jacking or mandatory snap points.
- Reveal effects must use Intersection Observer and content must remain visible when motion is reduced or animation is unavailable.
- The preloader waits only for critical fonts/hero/first-story assets; optional image failures must not break the story.
- Gallery images preserve aspect ratio and include accessible lightbox close, previous, next, and Escape behavior.
- Music is not implemented unless a user explicitly starts it; no autoplay.
- Include initial-document Open Graph and Twitter metadata with replaceable image/url values.
- No backend, authentication, analytics, unnecessary dependencies, or ten-reason section; decorative corner accents and a small number of subtle floating hearts are allowed.
- Every image has reserved dimensions, meaningful alt text, and a graceful fallback path.
- Verify the production build and inspect the running mobile layout before handoff.

## Review Focus

- A critical hero or first-story image fails: the preloader must still reveal an accessible story with fallback visuals — covered in Task 3.
- User scrolls quickly or has reduced motion enabled: all story content must remain visible and usable — covered in Task 4.
- User opens, navigates, or closes a gallery image with mouse, keyboard, or touch: focusable controls and Escape/previous/next must work — covered in Task 5.
- Viewport is 360px wide: text, images, controls, and decorative hearts must not create horizontal overflow — covered in Task 4.
- Surprise is opened repeatedly or with keyboard: the reveal must be deterministic and not lose the message — covered in Task 6.

### Task 1: Scaffold the minimal Vite React app

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/content.ts`
- Create: `src/styles.css`
- Create: `public/images/.gitkeep`

**Interfaces:**
- Produces a runnable `npm run dev` app and a production `npm run build` script.
- `src/content.ts` exports typed editable content consumed by later UI tasks.

- [ ] **Step 1: Write the app shell and editable content model**

Define `StoryImage`, `JourneyChapter`, `MemoryImage`, and `StoryContent` types in `src/content.ts`; export one `storyContent` object containing placeholder-but-personalizable title, date, chapters, memories, letter paragraphs, surprise message, and fallback image URLs. Omit the removed ten-reasons section.

- [ ] **Step 2: Add the smallest dependency and script set**

Create `package.json` with React, React DOM, TypeScript, Vite, and their required type packages only; add `dev`, `build`, and `preview` scripts.

- [ ] **Step 3: Create the entry point and base document metadata**

Set up `src/main.tsx`, render `App`, and put replaceable title, description, theme color, `og:*`, and Twitter card tags in `index.html`. Use a public HTTPS placeholder image URL for metadata until the owner supplies a final social image.

- [ ] **Step 4: Add design tokens and responsive base styles**

Create `src/styles.css` with the exact palette variables, font imports, reset, semantic typography, responsive container, focus-visible styles, reduced-motion rules, and an overflow-safe body baseline.

- [ ] **Step 5: Verify the scaffold**

Run `npm install` and `npm run build`; expected result is a successful Vite production build with no TypeScript errors.

### Task 2: Build the critical preloader and story shell

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Modify: `src/content.ts`

**Interfaces:**
- Consumes `storyContent` from Task 1.
- Produces `App` state that transitions from loading to story only after critical assets resolve or fail gracefully.

- [ ] **Step 1: Implement critical asset readiness**

In `App`, preload the hero and first-story image with `Image.decode()` when available and wait for `document.fonts.ready`; treat failures as non-fatal and expose a short loading status string. Reveal the page once required work settles, with a 400–600ms opacity transition.

- [ ] **Step 2: Implement the page shell and floating heart decoration**

Render a semantic `main` containing a preloader, fixed-but-noninteractive decorative hearts, and placeholders for the story sections. Keep the hearts sparse, low-opacity, slow, and hidden from assistive technology.

- [ ] **Step 3: Add fallback image handling**

Use a shared image error handler that replaces failed image sources with a neutral inline fallback or marks the image as unavailable without hiding surrounding text.

- [ ] **Step 4: Verify loading failure behavior**

Run the app and temporarily point the critical image URLs at an invalid path; expected result is the hero/story still becomes visible and the page remains navigable.

### Task 3: Implement the story sections and progressive reveal behavior

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Create: `src/hooks/useReveal.ts`

**Interfaces:**
- `useReveal<T extends Element>(): [React.RefCallback<T>, boolean]` observes one element once with threshold around `0.16` and root margin `0px 0px -10% 0px`; it returns visible state and immediately returns visible when reduced motion is preferred.
- `App` renders Hero, Beginning, Journey, Love Letter, Surprise, and Footer sections in a continuous vertical narrative.

- [ ] **Step 1: Implement the reveal hook**

Use `IntersectionObserver` when available, disconnect after the first intersection, and ensure the initial CSS state cannot leave content inaccessible if the observer fails.

- [ ] **Step 2: Build Hero and Beginning sections**

Render the anniversary label, title, subtitle, scroll cue, and first story chapter with semantic headings, reserved image dimensions, meaningful alt text, and a subtle frame-corner ornament.

- [ ] **Step 3: Build the Journey timeline**

Map `storyContent.journey` to numbered chapters with varied but responsive compositions, dates, text, and images; do not use forced snapping or scroll-jacking.

- [ ] **Step 4: Build the Love Letter section**

Render a reading-focused cream surface with a small label, heading, paragraphs, and handwritten signature; keep the letter free from distracting background animation.

- [ ] **Step 5: Build the footer**

Render the closing line and anniversary date with a small rose accent and accessible semantic structure.

- [ ] **Step 6: Verify scroll and accessibility basics**

Run the app at 360px and 430px widths, tab through headings/links/buttons, and enable reduced motion; expected result is no horizontal overflow, visible content, visible focus, and no required animation for comprehension.

### Task 4: Implement the responsive memory gallery and lightbox

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Create: `src/components/MemoryGallery.tsx`

**Interfaces:**
- `MemoryGallery({ memories }: { memories: MemoryImage[] })` renders the gallery and owns selected index state.
- It supports `open(index)`, `close()`, `previous()`, and `next()` behavior, with buttons labeled for screen readers and Escape closing the overlay.

- [ ] **Step 1: Render the responsive gallery grid**

Use two columns on mobile where appropriate, full-width class for wide memories, two or three columns on larger screens, preserved aspect ratios, rounded 8px corners, and purposeful corner accents.

- [ ] **Step 2: Add lightbox controls and keyboard behavior**

Open an image from a native button, render an overlay with current image/caption, close/previous/next controls, Escape handling, and background scroll locking while open; restore scrolling on close/unmount.

- [ ] **Step 3: Add robust image fallback and reduced motion**

Make optional gallery image failures show a neutral fallback while retaining captions; disable transition dependence under reduced motion.

- [ ] **Step 4: Verify gallery interaction**

Run the app and test opening each image, previous/next wraparound, Escape, close button, keyboard focus, and a failed image URL; expected result is no trapped or lost overlay state.

### Task 5: Implement the final surprise interaction

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Surprise state is local boolean state; the `Open Your Surprise` button is keyboard-operable and idempotently reveals the configured message.

- [ ] **Step 1: Render the closed surprise state**

Use the exact structure from the design: `ONE LAST THING`, heading, and `Open Your Surprise` button, with a restrained rose border/ornament.

- [ ] **Step 2: Render the revealed state**

On click or keyboard activation, reveal the final message, promise, anniversary wish, optional final photo, and small rose heart with a gentle fade-up; preserve the content if activated again.

- [ ] **Step 3: Verify surprise behavior**

Test mouse, keyboard, repeated activation, reduced motion, and failed optional final image; expected result is one stable revealed message and no broken layout.

### Task 6: Final production verification and handoff

**Files:**
- Modify: `src/content.ts` only if needed for copy/asset corrections.
- Modify: `index.html` only if needed for metadata corrections.

- [ ] **Step 1: Run production build**

Run `npm run build`; expected result is a successful build with no errors.

- [ ] **Step 2: Run the app locally**

Run `npm run dev -- --host 0.0.0.0`, inspect the page at 360px, 390px, 430px, and desktop widths, and confirm no horizontal overflow, broken images, unreadable text, or clipped controls.

- [ ] **Step 3: Check the browser console and interaction paths**

Confirm no uncaught errors while loading, scrolling, opening the lightbox, navigating images, closing it, and revealing the surprise.

- [ ] **Step 4: Report remaining personalization inputs**

List only the real values still needed from the owner: final names/date, authentic image files, final letter copy, final surprise copy, and final OG image URL.
