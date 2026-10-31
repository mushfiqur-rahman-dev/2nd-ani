# Two Years, One Love ❤️
## Product Requirements Document (PRD)

**Version:** 2.0  
**Project Type:** Personal Anniversary Website  
**Platform:** Web  
**Deployment:** Vercel  
**Primary Device:** Smartphone  
**Experience:** Mobile-first, Scroll-based Romantic Storytelling

---

# 1. Product Vision

Create a beautiful, personalized, pink-themed digital love story celebrating two years of a relationship.

The website should feel like a romantic storybook that the recipient can explore by scrolling.

Every section should reveal a different part of the relationship, from the beginning to the present and finally to a personal message.

The website must be optimized primarily for smartphones.

### Core Concept

"Every Scroll Reveals Another Memory."

### Design Philosophy

- Pinkish romantic atmosphere.
- Minimal but emotionally rich.
- Smooth and meaningful animations.
- Personal storytelling.
- Beautiful typography.
- Optimized mobile experience.
- Reliable loading before the story begins.

The experience should feel premium without unnecessary visual complexity.

---

# 2. Primary Objectives

1. Celebrate the second anniversary.
2. Present a personalized relationship story.
3. Create an emotionally engaging scrolling experience.
4. Display authentic photos and memories.
5. Deliver a personal love letter.
6. Reveal a final surprise.
7. Provide a beautiful social sharing link preview.
8. Ensure the entire experience works reliably on mobile devices.

---

# 3. Target Audience

**Primary Recipient:** Girlfriend.

**Primary Device:** Android/iPhone smartphone.

**Access Method:** A shared website URL through Instagram, WhatsApp, or another messaging application.

### Important User Conditions

- May have a slow internet connection.
- May use an older smartphone.
- May open the website inside an in-app browser.
- May scroll quickly.
- May have reduced-motion preferences enabled.
- Should not need to install anything.

---

# 4. Visual Direction

### Theme

Romantic Pink Storybook.

### Visual Characteristics

- Soft blush pink backgrounds.
- Warm cream surfaces.
- Rose-colored accents.
- Elegant serif headings.
- Clean sans-serif body text.
- Beautiful photography.
- Soft transitions.
- Generous spacing.
- decorative elements.
- Excessive floating hearts.

### Avoid

- Neon pink.
- Excessive gradients.
- Unnecessary decorative elements.
- Overloaded animations.
- Heavy video backgrounds.
- Cluttered UI.
- Generic stock photos.

---

# 5. Website Architecture & Story Flow

The website is one continuous vertical story.

It should not feel like multiple unrelated website sections.

## Section 00 — Preloader

**Purpose:** Prepare the experience before allowing the recipient to enter.

Requirements:

- Display an elegant pink loading screen.
- Show project title or a short romantic message.
- Display real loading progress where possible.
- Preload the critical fonts.
- Load the hero image.
- Decode important images before revealing the story.
- Prepare the essential page layout.
- Avoid revealing incomplete visual sections.

### Loading States

1. Initializing.
2. Preparing photographs.
3. Preparing typography.
4. Preparing the story.
5. Ready.

### Completion Behavior

- Show a subtle transition into the Welcome Screen.
- Never show fake progress that claims every asset is loaded when it is not.
- Provide a graceful error state if a required asset fails.
- Provide a retry option.
- Never leave the user trapped on a loading screen.

### Loading Strategy

Use a critical-assets manifest.

Critical assets:
- Main fonts.
- Hero image.
- First story image.
- Essential CSS and JavaScript.

Preload these before the first reveal.

Other gallery images should be prepared in the background using controlled loading.

The site should wait for its required initial experience, not every optional asset in the entire project.

If optional images are still loading, display reserved image containers and elegant placeholders.

---

## Section 01 — Welcome Screen

**Purpose:** Create the first impression.

Content:

- Small anniversary label.
- Main heading: "Two Years, One Love."
- Personalized subtitle.
- Anniversary date.
- Hero photograph (optional).
- Start Story button.

Example:

"Two years of us, and still my favorite story."

Button:

"Begin Our Story"

### Interaction

- Button smoothly transitions into the first story chapter.
- Use a subtle entrance animation.
- No automatic scrolling.

---

## Section 02 — The Beginning

**Purpose:** Introduce the relationship.

Content:
- Chapter number.
- Chapter title.
- Personal story.
- Starting date.
- First meaningful photo (optional).

Example title:

"Where It All Began"

Display the story in a cinematic editorial layout.

---

## Section 03 — Our Journey

**Purpose:** Show how the relationship developed.

Create a chronological vertical story.

Each chapter may include:
- Date.
- Short heading.
- Personal description.
- Photo.
- Optional small decorative detail.

Suggested chapter types:

1. The First Conversation.
2. The First Smile.
3. The Beginning of Us.
4. Our Little Memories.
5. The Moments I Treasure.
6. Two Years Together.

These are placeholders. Actual chapters must use authentic memories supplied by the creator.

### Scroll Behavior

- Each chapter enters with a subtle animation.
- Images can reveal with gentle opacity and movement.
- Text should remain readable during animation.
- No mandatory scroll snapping.
- No forced scroll-jacking.

---

## Section 04 — Our Memories

**Purpose:** Create a visual memory experience.

Features:
- Responsive photo grid.
- Editorial image layouts.
- Optional photo captions.
- Lightbox.
- Next/previous navigation.
- Smooth transitions.

Initial target: 6–12 photographs.

Images must be optimized before deployment.

---

## Section 05 — Things I Love About You

**Purpose:** Personal and cute interaction.

Display 10 personalized reasons.

Possible examples:
- Your smile.
- The way you care.
- Your little habits.
- Your laugh.
- The way you make ordinary days special.

The content must be written personally.

Design:
- Minimal numbered list or editorial layout.
- Soft pink highlights.
- Small interaction on each item if appropriate.

---

## Section 06 — A Letter For You

**Purpose:** The emotional center of the website.

Content:
- Personal heading.
- Long-form love letter.
- Personal memories.
- Anniversary message.
- Signature.

Design:
- Reading-focused.
- Narrow content width.
- Comfortable typography.
- Soft pink/cream surface.
- No distracting animations.

---

## Section 07 — Final Surprise

**Purpose:** End the story emotionally.

Initial content:

"Before you leave, there's one more thing..."

Button:

"Open Your Surprise"

After interaction:
- Reveal a personal message.
- Display a meaningful promise.
- Show the anniversary celebration.
- Optional final photograph.

Example ending:

"Two years down, forever to go. Happy Anniversary, My Love."

This is only sample copy and must be customizable.

---

## Section 08 — Footer

Content:
- "Made with love, just for you."
- Anniversary date.
- Creator's signature.
- Small decorative heart.

---

# 6. Scroll Storytelling System

This is a core feature, not an optional animation layer.

### Requirements

- Use vertical scrolling as the primary navigation.
- Each chapter should have a clear visual identity.
- Maintain a continuous story flow.
- Animate chapter content as it enters the viewport.
- Avoid excessive animation on every small element.
- Ensure fast scrolling does not permanently skip content.

### Animation Trigger Reliability

Use Intersection Observer with:
- Appropriate root margin.
- Sensible visibility threshold.
- One-time reveal where appropriate.
- A visible fallback state.

Important:

Content must not remain invisible if an observer fails or an element is loaded after scrolling.

The story must remain readable even when animations are unavailable.

---

# 7. Full Loading & Asset Preparation System

### Primary Requirement

The recipient should not see a partially initialized welcome experience.

### Implementation

Create an asset manifest containing:
- Critical image URLs.
- Font files.
- Essential visual assets.

Before revealing the website:

1. Load the application shell.
2. Load critical fonts.
3. Fetch the hero image.
4. Decode the hero image.
5. Fetch and decode the first story image.
6. Prepare the first visible story content.
7. Verify that the required elements are ready.
8. Reveal the website.

### Remaining Assets

- Load gallery photographs progressively.
- Prioritize images near the current viewport.
- Keep aspect ratios reserved.
- Show placeholders until the real image is decoded.
- Avoid blocking the entire website because an optional asset is unavailable.

### Error Handling

- Failed image: show a graceful fallback.
- Failed optional font: use system fallback.
- Failed music: disable music control gracefully.
- Network interruption: do not freeze the page.
- Critical loading failure: show retry.

### Performance Objective

Initial experience should become usable as quickly as possible.

Target metrics:
- LCP: 2.5 seconds or less under good mobile conditions.
- CLS: below 0.1.
- INP: below 200ms where practical.

These are performance goals, not guaranteed values.

---

# 8. Animation System

### Required Animation Categories

- Page entrance.
- Hero title reveal.
- Section reveal.
- Image reveal.
- Timeline entrance.
- Gallery hover/tap.
- Lightbox open/close.
- Button interaction.
- Final surprise reveal.

### Motion Principles

- Smooth.
- Natural.
- Purposeful.
- Lightweight.
- Consistent.

### Restrictions

- No animation should block reading.
- No content should depend on animation to become visible.
- No heavy continuous animation loops.
- No unnecessary parallax.
- No forced scrolling.
- Respect prefers-reduced-motion.

---

# 9. Social Sharing & Link Preview

The website must have a professional social sharing preview.

### Open Graph Metadata

Required:
- og:title
- og:description
- og:image
- og:url
- og:type

### Twitter/X Metadata

Required:
- twitter:card
- twitter:title
- twitter:description
- twitter:image

### Preview Image

Create a dedicated 1200 × 630px image.

Suggested design:
- Soft pink background.
- Elegant serif title.
- "Two Years, One Love."
- Anniversary date.
- Small heart illustration.
- Minimal decoration.

### Important Technical Requirements

- Metadata must be available in the initial HTML.
- Use absolute HTTPS URLs.
- Preview image must be publicly accessible.
- Do not use an image that requires JavaScript to render.
- Do not include private photographs in the preview unless intentionally approved.

### Instagram Compatibility

Social preview behavior depends on the specific Instagram sharing surface.

The metadata should be correct for supported link previews, but Instagram may not display a rich card in every DM, profile, or Story context.

The actual deployed URL must be tested where previews are supported.

---

# 10. Audio Requirements

- Background music is optional.
- Never autoplay.
- Start after explicit user interaction.
- Provide play/pause control.
- Show playback state.
- Do not block the story while music loads.
- Support graceful failure.

---

# 11. Technical Stack

### Core

- React.
- TypeScript.
- Vite.
- Tailwind CSS.

### Animation

- CSS transitions and keyframes.
- Intersection Observer.
- Framer Motion only if its features are genuinely needed.

Prefer lightweight native implementations.

### Hosting

- Vercel.
- GitHub repository integration.

### Backend

Not required for MVP.

### Data

Store editable content in a centralized TypeScript configuration file.

---

# 12. Mobile-First Requirements

Mobile is the primary design target.

### Requirements

- Start design at 360px viewport width.
- Test at 360px, 375px, 390px and 430px.
- No horizontal overflow.
- Readable typography.
- Touch-friendly controls.
- Comfortable vertical spacing.
- Responsive photo gallery.
- Optimized images.
- Smooth native scrolling.
- Support in-app browsers.

Desktop should be an enhanced version of the mobile experience, not the primary design.

---

# 13. Privacy & Security

- No login.
- No personal data collection.
- No unnecessary analytics.
- No public admin panel.
- No exposed secrets.
- No unnecessary external tracking.

Assume anyone with the URL may access the public content.

---

# 14. Deployment Requirements

Deploy through Vercel.

Requirements:
- GitHub integration.
- Production deployment.
- HTTPS.
- Correct Vite build configuration.
- Working asset paths.
- Valid Open Graph metadata.
- Working mobile layout.
- Custom domain optional.

---

# 15. Acceptance Criteria

The website is ready when:

- [ ] The complete story flow works.
- [ ] Mobile layout is polished.
- [ ] Initial critical assets load before the story is revealed.
- [ ] Loading progress is truthful.
- [ ] No indefinite loading state.
- [ ] Optional assets cannot break the story.
- [ ] Scroll animations work reliably.
- [ ] Content remains visible without animation.
- [ ] All images are optimized.
- [ ] Gallery and lightbox work.
- [ ] Letter is readable.
- [ ] Final surprise works.
- [ ] Music requires user interaction.
- [ ] Open Graph metadata is present.
- [ ] Social preview image is accessible.
- [ ] Vercel production deployment succeeds.
- [ ] Website works in mobile browsers.

---

# 16. Final Product Statement

This is not just an anniversary webpage.

It is a small digital journey through two years of love.

Every scroll should reveal a memory.

Every section should communicate something meaningful.

The website should feel beautiful, personal, smooth, and complete.

**"Our story, one scroll at a time. ❤️"**
