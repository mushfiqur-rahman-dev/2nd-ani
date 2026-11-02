# Two Years, One Love

Eta ekta romantic anniversary story website. Scroll korle story, photos, memory gallery, spin wheel, love quiz, PIN screen, ebong admin editor dekhabe.

## 1. Project chalano

Node.js install thaka lagbe.

```bash
npm install
npm run dev
```

Terminal-e je local URL dekhabe, sheta browser-e open korun. Usually:

```text
http://localhost:5173
```

Production build check korte:

```bash
npm run build
npm run preview
```

## 2. Website-er content change korar easiest way

Website open kore PIN screen-er top-right-er `⚙️` button click korun. Ekhane admin editor paben:

- **Photos & Images** — hero photo, photostrip, journey photos, gallery photos, surprise photo
- **Texts & Love Story** — title, date, story, captions, section text
- **Love Test (Quiz)** — quiz question, answer, correct answer, result text
- **Spin Wheel** — wheel-er prompt/dares
- **PIN & Settings** — PIN, JSON backup/import, default reset

Change korar por:

1. `Save Changes` click korun.
2. Dev server chalu thakle change `src/customContent.json` file-e save hobe.
3. `git diff` diye file change hoyeche kina check korun.
4. `src/customContent.json` commit kore abar production build/deploy korun.

> Important: `src/customContent.json` build-er shomoy app-er bundled project content hoy. Tai JSON commit korlei already-deployed site change hobe na—abar `npm run build` kore notun `dist/` deploy korte hobe. Static production-e Admin Editor-er Save browser LocalStorage-e thake, shudhu oi browser/device-e; onno device-e nite hole JSON file commit/deploy korun.

## 3. Image change korar niyom

### Option A — Admin editor (recommended)

1. `npm run dev` diye site chalu korun.
2. `⚙️` admin button click korun.
3. `Photos & Images` tab open korun.
4. Je photo change korte chan, tar `Upload New Photo` button click korun.
5. New image select korun.
6. `Save Changes` click korun.

Uploader image compress kore, tai normal JPG/PNG/WebP use korlei hobe. Upload-er por preview check korun.

### Option B — Code-er default image URL change

Admin save kora content clear/reset hole je default image ashe, shegulo `src/content.ts` file-e ache. `defaultStoryContent` er vitore image-er URL replace korun:

```ts
hero: image(
  'https://your-image-url.com/hero.jpg',
  'Hero photo-r description',
),
```

Local image use korte chaile image `public/images/` folder-e rakhun:

```text
public/images/hero.jpg
```

Tarpor source path hobe:

```ts
hero: image('/images/hero.jpg', 'Our hero photo'),
```

Recommended image fields:

- Portrait photo: `1200 × 1500` er kachakachi
- Gallery photo: `1200 × 900` ba `1200 × 1500`
- File type: JPG, PNG, WebP
- File size: possible hole `1–2 MB` er niche

Decorative design assets alada folder-e ache:

```text
public/decorations/
```

Ekhane `bg_texture.jpg`, `cherries.png`, `lily_flower.png`, `roses_bouquet.png`, `satin_bow.png` ebong SVG decoration ache. Egulo change korte hole same filename rekhe file replace korun, ba `src/components/Decorations.tsx`-e path update korun.

## 4. Text change korar duita upay

### Admin diye

Normal text change-er jonno admin editor use korun. Eta safest, karon full data structure na bujheo edit kora jay.

### Code diye

Default fallback content-er source holo:

```text
src/content.ts
```

Project-er bundled content-er source holo:

```text
src/customContent.json
```

App content-er precedence:

1. Browser-er valid LocalStorage override
2. Build-er shomoy bundle kora `src/customContent.json`
3. `src/content.ts`-er `defaultStoryContent` fallback

`src/customContent.json` manually edit korle valid JSON maintain korun. JSON-e comment (`//`) deya jabe na. Bhul JSON hole production build fail korbe—file-ta thik kore abar build korte hobe. Browser LocalStorage-er JSON malformed hole app bundled project content-e fallback korbe. JSON change korar por notun production build korte hobe.

## 5. Quiz/test change kora

Admin editor-er **Love Test (Quiz)** tab-e question, answer ebong result text change korun.

Code-e default quiz questions `src/content.ts`-er `loveTest` array-te ache:

```ts
loveTest: [
  {
    prompt: 'Question ekhane',
    answers: ['Answer 1', 'Answer 2', 'Answer 3'],
    correct: 0,
  },
],
```

`correct` zero-based index:

- `0` = first answer
- `1` = second answer
- `2` = third answer

Answer change korar por `correct` index-o check korun. Na hole wrong answer correct hisebe mark hobe.

## 6. Spin wheel prompt change kora

Admin editor-er **Spin Wheel** tab-e prompt edit korun.

Default prompt `src/content.ts`-er `spinPrompts` array-te ache:

```ts
spinPrompts: [
  'Tomar notun prompt',
  'Arekta cute prompt',
],
```

## 7. PIN change kora

Admin editor-er **PIN & Settings** tab-e PIN change korun.

Code-e default PIN `src/content.ts`-er ei field:

```ts
pin: '01112024',
```

PIN gate date format follow kore: `DDMMYYYY`.

Example:

```text
11 January 2024 → 11012024
```

PIN security-r jonno strong authentication noy; eta personal/private story screen-er simple gate matro.

## 8. Backup ebong restore

Admin editor → **PIN & Settings**:

- **Export JSON Backup** diye current content file download korun.
- **Import JSON Backup** diye ager backup restore korun.
- Import-er por `Save Changes` click korun.

Backup file-er naam normally:

```text
anniversary_story_backup.json
```

Backup restore korar age existing backup copy kore rakhun.

## 9. Reset korle ki hoy

`Reset Everything to Defaults` click korle browser-er saved LocalStorage override remove hoye bundled project content (`src/customContent.json`) load hobe. `src/customContent.json`-e custom content na thakle `src/content.ts`-er default content fallback hisebe load hobe.

Eta `src/customContent.json` automatically delete kore na. Project content reset korte hole file-ta manually update/delete kore notun build/deploy korun.

## 10. Test/check korar niyom

Ei project-e kono automated test framework setup kora nei. Change-er por minimum manual smoke test korun:

1. `npm run build` successful kina check korun.
2. PIN diye unlock hoy kina check korun.
3. Hero, journey, gallery image load hocche kina scroll kore dek hun.
4. Spin wheel spin kore prompt ashe kina check korun.
5. Quiz-er prottek answer select kore result check korun.
6. Admin-e ekta text/photo change kore Save, page refresh, abar check korun.
7. Mobile viewport-e layout check korun.

Image broken hole app fallback placeholder dekhabe. Browser DevTools-er Console/Network tab-e original image URL error check korun.

## 11. Important files

| File/folder | Kaj |
|---|---|
| `src/content.ts` | Default story, text, quiz, prompt, PIN |
| `src/customContent.json` | Admin save kora project content |
| `src/components/AdminDashboard.tsx` | Admin editor UI |
| `src/context/StoryContext.tsx` | Content load, LocalStorage, save flow |
| `src/components/Decorations.tsx` | Decorative image path/component |
| `public/decorations/` | Decorative static assets |
| `src/App.tsx` | Main page sections |
| `src/styles.css` | Main visual styling |
| `src/interactive.css` | Wheel/quiz interaction styling |
| `src/admin.css` | Admin panel styling |
| `vite.config.ts` | Dev-only `/api/save-content` endpoint |

## 12. Git-e save kora

Change verify korar por:

```bash
git status
git add src/content.ts src/customContent.json public/ README.md
git commit -m "Update anniversary story content"
```

Jodi sudhu browser LocalStorage-e save koren, Git-e change thakbe na ebong shudhu oi browser/device-e thakbe. Project-er sob device-e same content pete hole dev server chalu rekhe Save Changes korun, `src/customContent.json` commit korun, tarpor notun production build/deploy korun.

## Commands summary

| Command | Kaj |
|---|---|
| `npm install` | Dependency install |
| `npm run dev` | Development server chalu |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Production build locally preview |
