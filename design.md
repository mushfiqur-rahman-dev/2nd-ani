# Two Years, One Love ❤️
## UI/UX Design System & Visual Specification

**Version:** 2.0  
**Design Style:** Pink Romantic Storybook  
**Primary Target:** Mobile-first  
**Experience Type:** Vertical Scroll Storytelling

---

# 1. Design Philosophy

## "A Love Story Worth Scrolling Through."

The website should feel like a beautiful romantic storybook.

The experience should be:
- Soft.
- Pinkish.
- Emotional.
- Elegant.
- Personal.
- Smooth.
- Visually immersive.

Minimalism does not mean removing emotion or visual richness.

It means every visual element should have a purpose.

Use beautiful typography, photography, spacing, colors, and subtle animations to create the romantic atmosphere.

---

# 2. Color System

## Primary Palette

| Token | Hex | Usage |
|---|---|---|
| Pink Background | #FFF5F7 | Main background |
| Blush Pink | #F8DDE7 | Alternate section background |
| Soft Rose | #E9AFC3 | Decorative accent |
| Rose | #D78BA7 | Buttons and highlights |
| Deep Rose | #C46D91 | Primary accent |
| Berry | #8F4B68 | Strong emphasis |
| Warm Cream | #FFFDFB | Content surfaces |
| Dark Text | #49343D | Main text |
| Muted Text | #927C85 | Secondary text |
| Border | #E8D6DE | Dividers and borders |

## Color Rules

- Use pink as the primary visual identity.
- Alternate between pink and cream backgrounds.
- Keep main text dark and readable.
- Use deep rose sparingly.
- Avoid large saturated color blocks.
- No neon colors.
- Avoid unnecessary gradients.

## Optional Background Treatment

Use extremely subtle gradients only where needed.

Example:
- Soft pink to warm cream.
- Low contrast.
- No obvious color banding.

---

# 3. Typography

## Font Pairing

### Primary Heading
Playfair Display.

Usage:
- Hero title.
- Chapter titles.
- Major section headings.
- Final message.

### Body Typography
Inter.

Usage:
- Paragraphs.
- Captions.
- Navigation.
- Buttons.
- Small labels.

### Optional Accent
Caveat.

Usage:
- Signature.
- A very short handwritten phrase.
- Small personal notes.

Never use handwritten fonts for long paragraphs.

## Typography Scale

| Element | Mobile | Desktop |
|---|---:|---:|
| Hero heading | 42px | 72px |
| Chapter heading | 34px | 48px |
| Section heading | 30px | 42px |
| Subheading | 22px | 28px |
| Body | 16px | 17px |
| Caption | 13px | 14px |
| Eyebrow | 10px | 12px |

### Typography Rules

- Body line-height: 1.7.
- Heading line-height: 1.15.
- Avoid excessively long text lines.
- Use comfortable letter spacing.
- Avoid excessive bold text.
- Keep text hierarchy consistent.

Use local font files where practical to improve loading reliability.

---

# 4. Mobile-First Layout

Mobile is the primary target.

Design the complete experience for a smartphone before implementing desktop layouts.

## Target Viewports

| Device | Width |
|---|---:|
| Small Android | 360px |
| Standard Mobile | 375px |
| Modern Mobile | 390px |
| Large Mobile | 430px |
| Tablet | 768px |
| Desktop | 1024px+ |

## Mobile Layout Rules

- Main horizontal padding: 20px.
- Small mobile padding: 16px.
- Section vertical spacing: 80–110px.
- Main reading width: 100%.
- Paragraph line-height: 1.7.
- Buttons: minimum 44px touch target.
- Avoid fixed elements covering content.
- No horizontal overflow.

Use responsive CSS rather than fixed dimensions wherever possible.

Support safe-area insets on devices with notches.

## Desktop Layout

- Maximum content width: 1120px.
- Main content centered.
- Horizontal padding: 40px.
- Wider editorial photo compositions.
- More generous whitespace.

Do not simply stretch the mobile layout across desktop.

---

# 5. Global Experience

The website should behave like one continuous story.

## Visual Rhythm

Alternate between:
- Full-screen or near-full-screen storytelling moments.
- Editorial text layouts.
- Photo-focused chapters.
- Short emotional messages.
- Letter-style reading sections.

Do not use the same layout for every chapter.

However, maintain a consistent color palette and typography.

## Navigation

Keep navigation unobtrusive.

Mobile:
- Small brand mark.
- Optional compact chapter progress indicator.
- Avoid a large fixed navbar.
- No complicated hamburger menu unless genuinely needed.

A small progress indicator may show the reader's approximate position in the story.

It must not obstruct the content.

---

# 6. Preloader Design

The loading experience is a major part of the project.

## Appearance

Full viewport background:
#FFF5F7

Centered content:
- Small elegant heart symbol.
- Project title.
- Short loading message.
- Thin progress indicator.

Example:

"Preparing a little world for you..."

Below:
"Two Years, One Love."

## Progress Indicator

Use a thin horizontal progress bar.

- Background: #E8D6DE.
- Fill: #C46D91.
- Rounded ends.
- Smooth width transition.

Display actual completed critical asset progress.

If exact progress cannot be calculated, use clear loading states rather than fabricated percentages.

## Loading States

1. Preparing the experience.
2. Loading photographs.
3. Preparing typography.
4. Almost ready.
5. Ready.

## Reveal Transition

Once required assets are ready:

- Preloader fades out.
- Hero becomes visible.
- Use a subtle opacity transition.
- Duration: approximately 400–600ms.

## Critical Loading Rules

- Load the first viewport's assets before revealing the hero.
- Load the main font.
- Fetch and decode the hero image.
- Fetch and decode the first story image.
- Reserve dimensions for every image.
- Do not wait for all optional gallery images.
- Load non-critical images progressively.
- Do not leave invisible content if an asset fails.

The preloader must not create a second long waiting experience.

## Failure State

If a critical image fails:
- Continue with a graceful fallback.
- Keep the story accessible.
- Show a retry option only when appropriate.

If optional assets fail, the website should continue normally.

---

# 7. Scroll Storytelling

This is the central visual experience.

## Story Navigation

The user moves through the entire website by natural vertical scrolling.

Avoid forced scrolling and scroll-jacking.

No mandatory scroll snapping.

## Chapter Design

Every chapter should have:
- A small chapter number.
- A short heading.
- Personal content.
- A relevant image when available.
- A unique composition.

## Animation Behavior

When a chapter enters the viewport:
- Text fades in.
- Image gently reveals.
- Supporting details appear with a small delay.

Use Intersection Observer.

Recommended initial settings:
- Threshold: approximately 0.12–0.2.
- Root margin: approximately 0px 0px -10% 0px.
- Trigger once for most story elements.

Adjust based on actual mobile testing.

## Fast Scrolling Reliability

Critical requirement:

Scrolling quickly must not cause content to remain hidden.

Implementation rules:

- Elements must be visible by default.
- Animation enhancement may add transitions, but must not be required for visibility.
- Observer callbacks should never be the only way to reveal essential content.
- Handle dynamically loaded elements.
- Avoid animations that depend on long sequential delays.
- Use short transitions.
- Provide a CSS fallback.
- Respect reduced-motion preferences.

If animation fails, the story must remain fully readable.

---

# 8. Animation Design System

## Animation Style

Soft, cinematic, elegant.

No excessive movement.

### A. Fade Up

Used for:
- Headings.
- Paragraphs.
- Chapter labels.

Suggested:
- Opacity: 0 → 1.
- Translate Y: 16px → 0.
- Duration: 500ms.

### B. Image Reveal

Used for:
- Story photographs.
- Gallery images.

Suggested:
- Opacity: 0 → 1.
- Scale: 1.025 → 1.
- Duration: 650ms.

Avoid heavy clipping or complex masks on low-end phones.

### C. Soft Fade

Used for:
- Background changes.
- Final surprise.
- Lightbox transitions.

Suggested duration: 350–500ms.

### D. Button Interaction

- Slight background color transition.
- Subtle pressed state.
- No bounce.
- No excessive scaling.

### E. Story Chapter Reveal

- Small text entrance.
- Image reveal.
- Supporting content follows naturally.
- Stagger only a few elements.
- Avoid large sequential delays.

## Motion Tokens

| Motion | Duration |
|---|---:|
| Button | 180ms |
| Image | 650ms |
| Text reveal | 500ms |
| Section reveal | 550ms |
| Lightbox | 350ms |
| Final surprise | 500ms |

Use consistent easing curves.

## Reduced Motion

When prefers-reduced-motion is enabled:
- Disable decorative movement.
- Remove large transforms.
- Make content immediately visible.
- Preserve all functionality.
- Keep necessary state transitions understandable.

---

# 9. Hero Section

## Layout

A visually rich but uncluttered opening screen.

Order:
1. Small anniversary label.
2. Main heading.
3. Personal subtitle.
4. Anniversary date.
5. Optional hero photograph.
6. Begin Our Story button.
7. Small scroll indicator.

## Example Copy

Label:
"OUR SECOND ANNIVERSARY"

Heading:
"Two Years, One Love."

Subtitle:
"Every little moment brought us here."

Button:
"Begin Our Story"

## Styling

- Pink/cream background.
- Large elegant serif typography.
- Rose accent.
- Generous whitespace.
- Optional personal photo.

Avoid unnecessary decorations.

---

# 10. Story Chapter Layouts

Use multiple editorial layouts to maintain visual interest.

## Layout A — Text First

- Small chapter label.
- Large heading.
- Short paragraph.
- Photograph below.

## Layout B — Image First

- Wide or portrait photograph.
- Small caption.
- Heading.
- Supporting paragraph.

## Layout C — Memory Highlight

- Centered emotional quote.
- Short description.
- Minimal decorative detail.

## Layout D — Timeline

- Thin vertical line.
- Date.
- Event title.
- Personal memory.

Use a combination of these layouts.

Do not make every chapter look identical.

---

# 11. Memory Gallery

## Mobile

- Two-column grid for suitable images.
- Single-column layout for selected wide photographs.
- Consistent spacing.
- Rounded corners around 8px.
- Preserve image ratios.

## Desktop

- Two or three columns.
- Editorial asymmetry where appropriate.
- Generous gaps.

## Lightbox

On tap:
- Show image in a focused overlay.
- Prevent background scrolling.
- Show close button.
- Support keyboard Escape.
- Provide previous/next navigation.
- Use accessible button labels.

No unnecessary image filters.

Preserve authentic photo colors.

---

# 12. Things I Love About You

Present ten personalized reasons.

Suggested style:
- Minimal numbered list.
- Alternating subtle pink highlights.
- Comfortable vertical spacing.

Avoid ten identical large cards.

Use actual personal observations.

---

# 13. Love Letter Design

This is the emotional centerpiece.

## Layout

- Small label.
- Elegant heading.
- Personal letter.
- Signature.

## Styling

- Background: #FFFDFB or a very light blush.
- Reading width: approximately 600–680px on desktop.
- Mobile padding: 20px.
- Body size: 16px.
- Line-height: 1.8.
- Generous paragraph spacing.

The letter should feel like reading a real personal note.

No distracting background animation.

---

# 14. Final Surprise

## Initial Appearance

Small label:
"ONE LAST THING"

Heading:
"There's something I want you to know."

Button:
"Open Your Surprise"

## Revealed Appearance

- Final personal message.
- Meaningful promise.
- Anniversary wish.
- Optional photograph.
- Small rose-colored heart.

## Transition

A gentle fade-up.

Duration: approximately 500ms.

The final message should be the last emotional moment of the experience.

---

# 15. Background Music

Music is optional.

## Controls

A small play/pause button.

Use a subtle design that matches the theme.

## Rules

- No autoplay.
- User must explicitly start playback.
- Show current state.
- Handle missing audio.
- Do not block website loading.
- Do not force music playback when the user prefers silence.

Use a locally hosted optimized audio file when permitted.

---

# 16. Social Sharing / Open Graph Design

Create a dedicated social preview image.

## Dimensions

1200 × 630 pixels.

## Composition

Background:
- Soft blush pink.
- Very subtle texture or gradient.

Main content:
- "Two Years, One Love."
- Anniversary date.
- Small romantic accent.
- Optional minimal typography ornament.

Style:
- Elegant.
- Premium.
- Readable.
- Not cluttered.

## Metadata

The initial HTML must contain:

- og:title
- og:description
- og:image
- og:url
- og:type
- twitter:card
- twitter:title
- twitter:description
- twitter:image

Use absolute HTTPS URLs.

The preview image must be publicly accessible without login.

Ensure the deployed URL and image path are correct.

Important: Instagram may not generate rich link cards in all sharing contexts. The metadata should still be implemented correctly for compatible platforms.

---

# 17. Responsive & Touch Design

## Mobile Interaction

- Native scrolling.
- No hover-dependent functionality.
- Large enough touch controls.
- No tiny close buttons.
- Comfortable text spacing.
- No horizontal scrolling.
- Avoid unnecessary fixed-position elements.

## Image Behavior

- Set width and height or aspect ratio.
- Use responsive image sizing.
- Use modern image formats.
- Avoid layout shifts.
- Lazy-load non-critical images.
- Decode images before their animated reveal.

---

# 18. Performance Design

Performance must be part of the visual implementation.

## Image Optimization

- WebP or AVIF.
- Responsive sizes.
- Proper compression.
- Lazy loading for non-critical images.
- Priority loading for the hero.
- Reserved aspect ratios.

## Font Optimization

- Prefer locally hosted font files.
- Use WOFF2.
- Load only required weights.
- Use font-display: swap.
- Provide fallback fonts.

## Animation Optimization

- Prefer transform and opacity.
- Avoid animating layout-heavy properties.
- Avoid unnecessary React re-renders during scrolling.
- Use Intersection Observer.
- Avoid excessive observers and event listeners.
- Clean up listeners correctly.

## Quality Targets

- LCP: <= 2.5 seconds under good network conditions.
- CLS: < 0.1.
- INP: < 200ms where practical.
- Keep initial JavaScript lightweight.

---

# 19. Accessibility

- Semantic HTML.
- Keyboard accessibility.
- Visible focus indicators.
- Meaningful image alt text.
- Adequate color contrast.
- Reduced-motion support.
- Accessible lightbox.
- Proper button labels.
- No hidden essential content.

---

# 20. Final Visual QA Checklist

### Design
- [ ] Pinkish romantic identity.
- [ ] Consistent color palette.
- [ ] Elegant typography.
- [ ] Balanced whitespace.
- [ ] Beautiful image compositions.

### Mobile
- [ ] 360px layout works.
- [ ] 375px layout works.
- [ ] 390px layout works.
- [ ] 430px layout works.
- [ ] No horizontal overflow.
- [ ] All buttons are touch-friendly.

### Loading
- [ ] Critical assets are prepared.
- [ ] Progress is truthful.
- [ ] No infinite preloader.
- [ ] Failed optional assets do not block the experience.
- [ ] No layout shifts.

### Animation
- [ ] Scroll reveals work.
- [ ] Fast scrolling does not hide content.
- [ ] No animation-dependent visibility.
- [ ] Reduced-motion works.
- [ ] Animations are smooth.

### Sharing
- [ ] Open Graph tags exist.
- [ ] Preview image is 1200 × 630.
- [ ] Metadata URLs are absolute.
- [ ] Production URL is tested.

### Deployment
- [ ] Vercel build succeeds.
- [ ] HTTPS works.
- [ ] All images load.
- [ ] Mobile browser testing complete.

---

# Final Design Statement

"Not just a website. A little journey through our love."

The visual experience should be soft, pink, personal, and memorable.

The recipient should feel that the website was created specifically for her.

Every scroll should reveal a little more of the story.

Every animation should feel intentional.

Every photograph should mean something.

**Two years. One story. My favorite person. ❤️**