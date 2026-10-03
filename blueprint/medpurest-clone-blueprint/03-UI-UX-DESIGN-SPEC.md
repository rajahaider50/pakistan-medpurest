# MedPurest Clone Blueprint — UI/UX Design Specification

**File:** `03-UI-UX-DESIGN-SPEC.md`  
**Project:** MedPurest-style B2B Medical Product Catalogue & Lead Generation Platform  
**Status:** Implementation Specification  
**Audience:** Product designers, frontend engineers, backend engineers, QA engineers, and AI coding agents

---

## 1. Purpose

This document defines the complete UI/UX system for the MedPurest-style website rebuild.

The goal is to create a professional, trustworthy, responsive B2B medical manufacturing/product catalogue experience that is visually coherent, accessible, fast, SEO-friendly, and fully manageable through the admin CMS.

This specification covers:

- Public website UI
- Admin panel UI
- Design tokens
- Typography
- Color system
- Spacing
- Grid and containers
- Buttons and controls
- Forms
- Cards
- Product presentation
- Navigation
- Breadcrumbs
- Search
- Filters
- Tables
- Modals
- Drawers
- Notifications
- Empty/loading/error states
- Responsive behavior
- Mobile navigation
- Accessibility
- Internationalization
- RTL support
- Image/media behavior
- Content hierarchy
- Conversion UX
- Admin usability
- Performance-oriented UI rules
- Component naming and implementation standards
- UI acceptance criteria

This file must be implemented together with:

- `00-MASTER-PLAN.md`
- `01-PROJECT-ARCHITECTURE.md`
- `02-PAGE-BY-PAGE-SITEMAP.md`
- `04-PRODUCT-CATALOG-SPEC.md`
- `05-CONTENT-CMS-SPEC.md`
- `06-ADMIN-PANEL-SPEC.md`
- `09-MULTILINGUAL-SEO-SPEC.md`
- `10-SECURITY-PERFORMANCE-DEPLOYMENT.md`
- `12-TESTING-QA-ACCEPTANCE.md`

---

# 2. UX Product Definition

## 2.1 Product Type

The platform is a:

> B2B medical product catalogue + corporate website + content publishing system + lead generation platform.

It is not a consumer ecommerce storefront.

The primary user journeys are:

1. Discover company
2. Discover product category
3. Search for product
4. Open product detail
5. Review specifications/media/documents
6. Contact company
7. Submit inquiry
8. Start WhatsApp/contact conversation
9. Discover related products/content
10. Request quotation or additional information

---

## 2.2 UX Priorities

The UI must prioritize the following in order:

1. Trust
2. Product discoverability
3. Product information clarity
4. Lead generation
5. Content readability
6. Searchability
7. Mobile usability
8. Accessibility
9. Performance
10. Visual polish

Avoid designing the site like a generic online store.

There should be no unnecessary:

- Cart icon
- Checkout flow
- Customer account area
- Wishlist
- Consumer pricing widgets
- Product quantity selectors
- Fake reviews
- AI chatbot
- AI sales agent

---

# 3. Design Direction

## 3.1 Visual Personality

The visual language should communicate:

- Medical
- Professional
- Clean
- Reliable
- Modern
- Industrial
- International
- B2B
- Manufacturing expertise

The design should feel closer to a high-quality medical manufacturer/corporate catalogue than a consumer marketplace.

---

## 3.2 Visual Principles

### Principle 1 — Clean Medical Presentation

Use generous whitespace, clean surfaces, subtle borders, and restrained decoration.

### Principle 2 — Product First

Product imagery and product information must receive strong visual priority.

### Principle 3 — Trust Through Structure

Trust should come from:

- Certifications
- Company information
- Manufacturing capabilities
- Product specifications
- Documentation
- Quality statements
- Contact information
- Company history
- Transparent content

Do not rely on decorative trust badges without real supporting content.

### Principle 4 — Strong Hierarchy

Every page should make it obvious:

1. Where the user is
2. What the page is about
3. What action is available
4. What information is most important
5. Where the user can continue

### Principle 5 — Consistency

Use the same component patterns across:

- Product cards
- News cards
- Blog cards
- Certificate cards
- Buttons
- Forms
- Section headers
- Breadcrumbs
- Pagination

---

# 4. Design Tokens

All visual values should be centralized in the design system.

Do not scatter arbitrary values across components.

Recommended implementation:

```text
src/
└── styles/
    ├── globals.css
    ├── tokens.css
    └── themes.css
```

Tailwind theme tokens may reference CSS variables.

---

## 4.1 Color System

The exact final brand colors must be configurable from the design/theme layer rather than hardcoded throughout the application.

Recommended semantic tokens:

```text
--color-primary
--color-primary-hover
--color-primary-active
--color-secondary
--color-accent

--color-background
--color-surface
--color-surface-muted
--color-surface-elevated

--color-text
--color-text-muted
--color-text-subtle
--color-text-inverse

--color-border
--color-border-strong

--color-success
--color-warning
--color-error
--color-info
```

### Default visual direction

Use a medical/corporate palette with:

- Strong primary brand color
- Neutral white/light backgrounds
- Dark readable text
- Soft gray surfaces
- Restrained accent colors
- Clear semantic status colors

The brand color must be configurable.

---

## 4.2 Typography

Use a modern sans-serif font stack.

Recommended:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

For multilingual deployments, select a font stack that provides reliable glyph coverage.

Typography tokens:

```text
Display XL
Display L
Display M

Heading XL
Heading L
Heading M
Heading S

Body L
Body M
Body S

Label L
Label M
Label S

Caption
Overline
```

Recommended approximate scale:

| Token | Size | Weight | Line Height |
|---|---:|---:|---:|
| Display XL | 56px | 700 | 1.08 |
| Display L | 48px | 700 | 1.10 |
| Display M | 40px | 700 | 1.12 |
| Heading XL | 36px | 700 | 1.15 |
| Heading L | 32px | 700 | 1.20 |
| Heading M | 28px | 600 | 1.25 |
| Heading S | 24px | 600 | 1.30 |
| Body L | 18px | 400 | 1.65 |
| Body M | 16px | 400 | 1.60 |
| Body S | 14px | 400 | 1.55 |
| Label M | 14px | 600 | 1.40 |
| Label S | 12px | 600 | 1.35 |

Use fluid typography where appropriate.

---

# 5. Layout System

## 5.1 Container

Desktop content should use a centered max-width container.

Recommended:

```text
max-width: 1280px
```

Allow larger full-width sections when needed for:

- Hero imagery
- Full-width banners
- Navigation
- Footer
- Media galleries

Recommended horizontal padding:

```text
Mobile: 16px
Tablet: 24px
Desktop: 32px
Large desktop: 40px
```

---

## 5.2 Grid

Primary desktop grid:

```text
12 columns
```

Typical product listing:

```text
4 columns desktop
3 columns medium desktop
2 columns tablet
1 column mobile
```

News/blog listing:

```text
3 columns desktop
2 columns tablet
1 column mobile
```

---

## 5.3 Spacing Scale

Use a consistent spacing scale:

```text
4
8
12
16
20
24
32
40
48
56
64
80
96
120
```

Avoid arbitrary values unless required by a specific component.

---

# 6. Breakpoints

Recommended responsive breakpoints:

```text
xs: 360px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Primary design states:

### Mobile

```text
360–639px
```

### Tablet

```text
640–1023px
```

### Desktop

```text
1024–1279px
```

### Large Desktop

```text
1280px+
```

---

# 7. Global Public Website Shell

Every public page should use a consistent shell.

```text
Announcement/Utility Bar (optional)
        ↓
Main Header
        ↓
Primary Navigation
        ↓
Breadcrumb (where applicable)
        ↓
Page Content
        ↓
CTA section where applicable
        ↓
Footer
```

---

# 8. Header

## 8.1 Desktop Header

Desktop header should contain:

- Logo
- Primary navigation
- Product navigation
- Search trigger/input
- Language selector
- Contact/CTA
- Optional WhatsApp shortcut

Navigation should remain visually simple.

Recommended structure:

```text
[LOGO] [About] [Products] [News] [Blog] [Video] [Certificate] [Contact] [Search] [Language]
```

Exact menu items should be controlled through the Navigation CMS.

---

## 8.2 Sticky Header

The header may become sticky after scrolling.

Behavior:

- Initial state: larger/premium header
- Scrolled state: compact header
- Preserve logo visibility
- Preserve navigation access
- Avoid covering page content
- Add subtle shadow/border when sticky

Do not make the header excessively tall.

---

# 9. Mobile Header

Mobile header:

```text
[Menu] [Logo] [Search]
```

Optional:

```text
[WhatsApp]
```

Menu opens a full-height or large drawer.

Mobile navigation should support:

- Nested product categories
- Language selection
- Contact CTA
- Search
- About links
- News/blog links

Nested navigation should use accordion behavior.

---

# 10. Breadcrumbs

Breadcrumbs should appear on internal content pages.

Example:

```text
Home / Products / Protective Equipment / Surgical Gown
```

Requirements:

- Semantic navigation
- Accessible labels
- Current page marked appropriately
- Horizontal overflow handling on mobile
- No excessive truncation
- Structured-data compatibility where implemented

Do not show breadcrumbs on the homepage.

---

# 11. Hero Sections

Hero sections are used for:

- Homepage
- Major category pages
- About
- Products
- Contact
- Other key landing pages

A hero should contain:

```text
Eyebrow
Headline
Supporting text
Primary CTA
Secondary CTA (optional)
Visual/media
```

Example layout:

```text
┌─────────────────────────────────────┐
│ Text                  Hero Image    │
│                                     │
│ Eyebrow                             │
│ Main Heading                        │
│ Description                         │
│ [Primary CTA] [Secondary CTA]       │
└─────────────────────────────────────┘
```

---

## 11.1 Hero Rules

Hero text must remain readable over imagery.

Use:

- Image overlays only when needed
- Controlled image focal point
- Responsive cropping
- Separate mobile focal position
- `object-fit: cover` or `contain` according to media type

Do not place important text inside an image.

---

# 12. Section Headers

Reusable section header:

```text
Eyebrow
Heading
Description
Optional link/action
```

Example:

```text
FEATURED PRODUCTS

Medical products designed for professional healthcare environments.

[View All Products]
```

Section headings should be short.

---

# 13. Buttons

## 13.1 Button Variants

Required:

```text
Primary
Secondary
Outline
Ghost
Link
Danger
```

---

## 13.2 Button Sizes

```text
Small
Medium
Large
```

Recommended minimum touch target:

```text
44 × 44px
```

Buttons must have:

- Hover state
- Focus state
- Active state
- Disabled state
- Loading state where applicable

---

## 13.3 CTA Hierarchy

A page should normally have one dominant primary CTA.

Examples:

- View Products
- Send Inquiry
- Contact Us
- Request Information
- WhatsApp Us

Avoid multiple competing primary CTAs.

---

# 14. Product Card

The product card is one of the most important reusable components.

Required structure:

```text
Product Image
Category/Tag
Product Name
Short description/specification
View Details
```

Optional:

```text
Product code
Material
Available sizes
Featured badge
```

Example:

```text
┌──────────────────────────┐
│                          │
│      PRODUCT IMAGE       │
│                          │
├──────────────────────────┤
│ Protective Equipment     │
│ Surgical Gown            │
│ Professional disposable  │
│ medical protection...    │
│                          │
│ View Details →           │
└──────────────────────────┘
```

---

## 14.1 Product Card Rules

- Consistent image ratio
- Equal visual height within grids
- Product title must be readable
- Avoid excessive text
- Entire card may be clickable
- Keyboard accessible
- Image must have meaningful alt text
- Hover animation must remain subtle

---

# 15. Product Detail UI

Product detail is a conversion-critical page.

Recommended layout:

```text
Breadcrumb
        ↓
Product title
Product gallery      Product information
                     Category
                     Short description
                     Key specs
                     Inquiry CTA
                     WhatsApp/contact CTA
        ↓
Detailed description
        ↓
Specifications
        ↓
Documents/certificates
        ↓
Applications
        ↓
Related products
        ↓
Inquiry CTA
```

---

## 15.1 Product Gallery

Support:

- Main image
- Thumbnail list
- Zoom/lightbox
- Keyboard navigation
- Mobile swipe
- Captions where useful

Do not preload unnecessarily huge images.

---

# 16. Product Specifications

Specifications should be structured rather than embedded only inside prose.

Example:

| Specification | Value |
|---|---|
| Material | Non-woven fabric |
| Type | Disposable |
| Size | S–XXL |
| Packaging | 10 pcs/bag |
| Application | Clinical use |

Mobile behavior:

- Convert table to stacked definition list when necessary.
- Avoid horizontal scrolling unless the table genuinely requires it.

---

# 17. Product Inquiry CTA

The primary product conversion action should be visually prominent.

Example:

```text
Interested in this product?

[Send Inquiry]
[WhatsApp]
```

The inquiry form should prefill the product context.

Example hidden/context values:

```text
Product ID
Product name
Product URL
Language
Referrer
```

The user should not need to manually type the product name.

---

# 18. Product Listing Page

Structure:

```text
Breadcrumb
Page heading
Description
Search/filter controls
Product grid
Pagination
SEO/content section
CTA
```

---

## 18.1 Product Filters

Possible filters:

- Category
- Subcategory
- Product type
- Material
- Application
- Tags

Only show filters that are configured and useful.

Do not overwhelm mobile users with a permanent sidebar.

---

## 18.2 Desktop Filters

Desktop may use:

```text
Left sidebar
```

or:

```text
Top horizontal filter bar
```

Recommended for many categories:

```text
Filter Sidebar | Product Grid
```

---

## 18.3 Mobile Filters

Use:

```text
[Filter]
[Sort]
```

Opening a bottom sheet or drawer.

The drawer must support:

- Apply
- Clear all
- Selected filter count
- Close

---

# 19. Search UX

Global search should be available from header.

Search behavior:

```text
User types
↓
Debounced suggestions
↓
Products/content suggestions
↓
Search results page
```

Search result categories may include:

- Products
- News
- Blog
- Pages

---

## 19.1 Search Empty State

Example:

```text
No results found for “example”.

Try:
• Checking spelling
• Using fewer words
• Searching by product name
• Browsing product categories
```

Provide useful recovery actions.

---

# 20. News and Blog Cards

Card structure:

```text
Cover image
Category
Date
Title
Excerpt
Read More
```

Avoid displaying too much metadata.

News and blog cards should share a common content-card foundation while allowing different visual variants.

---

# 21. Video UI

Video cards should show:

- Thumbnail
- Play icon
- Title
- Category/date where relevant

Video detail page:

```text
Breadcrumb
Title
Video player
Description
Related videos
CTA
```

Use lazy loading for embedded video players.

Avoid automatically playing video with sound.

---

# 22. Certificate UI

Certificate cards should communicate authenticity without making unsupported claims.

Card:

```text
Certificate image
Certificate name
Issuer/type
Year or validity information where available
View Certificate
```

Image viewer:

- Zoom
- Download if permitted
- Keyboard navigation
- Accessible description

---

# 23. About Pages

About pages should prioritize storytelling and trust.

Recommended visual patterns:

- Timeline for History
- Image + text split sections
- Statistics
- Certification blocks
- Manufacturing/quality sections
- Culture cards
- CTA

Avoid overusing animated counters.

If counters are used, they must represent actual CMS-managed values.

---

# 24. Contact Page

Contact page should combine:

```text
Contact information
Map/location
Contact form
WhatsApp/contact actions
Business hours where applicable
```

The form should be simple.

Recommended fields:

```text
Name *
Email *
Tel / WhatsApp
Company
Country
Subject
Message *
```

Only required fields should be marked required.

---

# 25. Forms

## 25.1 Form Design

Every form field should have:

- Visible label
- Input
- Optional help text
- Validation state
- Error message
- Accessible association

Never use placeholder text as the only label.

---

## 25.2 Validation

Validate:

1. Client-side for immediate feedback
2. Server-side for security and correctness

Error examples:

```text
Please enter your name.
Please enter a valid email address.
Please enter your message.
```

Avoid technical validation messages.

---

## 25.3 Form Submission

States:

```text
Idle
Submitting
Success
Validation Error
Server Error
```

Success should clearly tell the user what happened.

Example:

```text
Thank you. Your inquiry has been received.
Our team will contact you as soon as possible.
```

Do not expose internal database/server errors.

---

# 26. WhatsApp UX

WhatsApp is a lead-generation channel.

The number must be configurable through Site Settings.

Use a clear CTA:

```text
Chat on WhatsApp
```

Avoid intrusive popups.

A floating WhatsApp button may be used, but:

- Must not cover important UI
- Must respect mobile safe areas
- Must be dismissible if implemented as a prompt
- Must not obscure cookie/accessibility controls
- Must have accessible label

---

# 27. Footer

Footer structure:

```text
Brand/company summary

Products
Company
Resources
Contact

Email
Phone
WhatsApp
Address

Social links

Language selector

Privacy Policy
Sitemap
Copyright
```

All business identity values must come from CMS/site settings.

Do not hardcode contact information.

---

# 28. Admin Panel Design

The admin panel should use a separate application shell while sharing the underlying design token system.

Structure:

```text
Sidebar
Topbar
Breadcrumb
Page Header
Content
Optional right-side actions
```

---

# 29. Admin Sidebar

Recommended:

```text
Dashboard

Catalog
  Products
  Categories

Content
  News
  Blog
  Videos
  Pages

Trust & Company
  Certificates
  Honors
  History
  Culture

Leads
  Inquiries

Media
  Media Library

Navigation
  Menus

Localization
  Languages

SEO
  SEO Settings
  Redirects
  Sitemap

System
  Settings
  Users
  Roles
  Activity Logs
```

Only display modules the logged-in admin has permission to access.

---

# 30. Admin Topbar

Topbar should include:

- Sidebar toggle
- Current page context
- Search (optional)
- Notifications
- Language
- Admin profile menu

Profile menu:

```text
Profile
Security
Sign out
```

Do not place excessive actions in the topbar.

---

# 31. Admin Dashboard

Dashboard should focus on actionable business/content information.

Suggested cards:

```text
New Inquiries
Open Inquiries
Products
Published Articles
Media Assets
Languages
```

Optional:

- Recent inquiries
- Recently updated products
- Recent activity
- Content needing translation
- Draft content

Avoid vanity metrics unless useful.

---

# 32. Admin Tables

Tables should support:

- Search
- Filters
- Sort
- Pagination
- Bulk selection
- Bulk actions where safe
- Row actions
- Responsive behavior

Typical row actions:

```text
View
Edit
Duplicate
Archive
Delete
```

Destructive actions require confirmation.

---

# 33. Admin Forms

Admin forms should support:

- Clear section grouping
- Sticky save actions where appropriate
- Draft/save/publish workflow
- Validation
- Unsaved-change warning
- Media selection
- Translation fields
- SEO fields
- Preview

Long forms should be divided into logical sections.

---

# 34. Product Admin Editor

Recommended tabs/sections:

```text
Basic Information
Translations
Categories
Specifications
Media
Documents
SEO
Related Products
Publishing
```

Basic information:

```text
Name
Slug
Short description
Long description
Product code
Status
Featured
```

---

# 35. Content Editor

Content editing should support:

- Title
- Slug
- Excerpt
- Rich content
- Cover image
- Author
- Category
- Tags
- SEO metadata
- Translation
- Publication state
- Publish date

The editor must sanitize HTML before rendering public content.

---

# 36. Media Library UX

Media library should behave like a professional asset manager.

Features:

- Grid view
- List view
- Search
- Filter by type
- Folder/filter organization
- Upload
- Drag/drop
- Preview
- Metadata editing
- Alt text
- Caption
- File replacement
- Usage references

Important metadata:

```text
Filename
MIME type
Width
Height
File size
Alt text
Caption
Uploaded by
Created at
```

---

# 37. Loading States

Every asynchronous interface must have a deliberate loading state.

Use:

- Skeletons for page content
- Button spinner for submissions
- Progress indicators for uploads
- Placeholder media

Avoid full-page spinners unless absolutely necessary.

---

# 38. Empty States

Empty states must explain the situation and provide recovery.

Example:

```text
No products found.

Try changing your filters or search terms.

[Clear Filters]
```

Admin empty state:

```text
No products have been created yet.

[Create Product]
```

---

# 39. Error States

Public error pages:

```text
404
500
Network/temporary error
```

They should provide:

- Clear explanation
- Home link
- Search
- Relevant navigation

Admin errors should provide actionable recovery without exposing sensitive implementation details.

---

# 40. Toasts and Notifications

Use toast notifications for short-lived feedback:

```text
Product saved.
Inquiry status updated.
Media uploaded.
Changes published.
```

Do not use toasts for critical information that must remain visible.

Toasts should:

- Be dismissible
- Have accessible announcements
- Avoid covering primary controls
- Remain visible long enough to read

---

# 41. Modals

Use modals for:

- Confirm destructive action
- Image preview
- Small focused forms
- Important confirmation

Do not use modals for entire complex workflows when a page/drawer is more usable.

Modal requirements:

- Focus trap
- Escape support
- Correct focus return
- Accessible title
- Accessible description where needed

---

# 42. Drawers

Use drawers for:

- Mobile filters
- Mobile navigation
- Secondary admin controls
- Compact contextual forms

Drawer requirements:

- Keyboard accessible
- Focus management
- Scroll containment
- Clear close control

---

# 43. Pagination

Public pagination:

```text
Previous
1
2
3
...
Next
```

Admin pagination should also show item count where practical.

Mobile may collapse to:

```text
< Previous   Page 3 of 12   Next >
```

Preserve filter/search state while changing pages.

---

# 44. Accessibility

Target:

> WCAG 2.2 AA where practical.

Required principles:

- Keyboard navigation
- Visible focus indicators
- Semantic HTML
- Correct heading hierarchy
- Accessible form labels
- Accessible buttons
- Alt text
- Sufficient contrast
- Reduced-motion support
- No keyboard traps
- Screen-reader meaningful names
- Accessible status announcements
- Proper table semantics
- Accessible dialogs
- Accessible navigation landmarks

---

## 44.1 Focus

Focus must always be visible.

Never remove focus outlines without replacing them with an equally visible design.

---

## 44.2 Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Animations should be disabled or reduced.

---

# 45. Animation

Animation should communicate state or hierarchy, not exist only for decoration.

Allowed:

- Subtle card hover
- Fade/slide section entrance
- Drawer transition
- Modal transition
- Button state transition
- Image gallery transition

Avoid:

- Excessive parallax
- Long loading animations
- Constant movement
- Distracting background effects

Recommended transition duration:

```text
120–250ms
```

---

# 46. Responsive Image Rules

Every content image should define:

- Width
- Height/aspect ratio
- Object fit
- Loading strategy
- Alt text

Use responsive image delivery.

Preferred:

```text
WebP/AVIF where supported
```

Fallback:

```text
JPEG/PNG
```

Do not ship oversized originals to mobile clients when avoidable.

---

# 47. Image Aspect Ratio System

Recommended standardized ratios:

```text
Product card: 4:3
News/blog card: 16:9
Hero: 16:7 or responsive
Certificate preview: document-friendly ratio
Gallery: source-dependent
Avatar: 1:1
```

Do not crop critical medical product details.

Admin should allow a focal point where image cropping is required.

---

# 48. Internationalization UI

The interface must support multiple languages without breaking layout.

Requirements:

- Language selector
- Translated navigation
- Translated page content
- Translated metadata
- Language-aware URLs
- RTL capability
- Flexible text widths

Do not assume English text length.

---

# 49. RTL Support

RTL should be implemented using logical CSS properties.

Prefer:

```css
margin-inline-start
margin-inline-end
padding-inline-start
padding-inline-end
inset-inline-start
inset-inline-end
```

Avoid unnecessary hardcoded:

```css
left
right
```

Directional icons must be evaluated in RTL.

For example:

- Breadcrumb arrows may reverse
- Back arrows may reverse
- Directional navigation may reverse

Icons such as search, close, settings, and download generally remain unchanged.

---

# 50. Content Density

Public website:

> Medium / spacious

Admin:

> Medium / information-dense

Do not use the same spacing density for both.

Admin users need to process more information per screen.

---

# 51. Mobile UX Rules

On mobile:

- One-column content by default
- Large touch targets
- Sticky action areas where useful
- Avoid horizontal page overflow
- Filters open in drawer
- Navigation becomes drawer
- Tables become cards or controlled horizontal scroll
- Hero text remains readable
- Images preserve important subject matter
- Forms use full-width controls
- Buttons may become full width for major CTAs

---

# 52. Mobile Product Detail

Recommended order:

```text
Breadcrumb
Image gallery
Product title
Category
Short description
Key specifications
Primary inquiry CTA
WhatsApp CTA
Detailed content
Specifications
Documents
Related products
Final CTA
```

The main inquiry action should not be buried below a long description.

---

# 53. Mobile Admin

Admin should be responsive, but desktop remains the primary editing environment.

Mobile admin should support:

- Dashboard
- Inquiry review
- Basic content review
- Status updates
- Simple edits

Complex rich-content editing may remain optimized for tablet/desktop.

---

# 54. SEO-Friendly UI

UI must support semantic SEO.

Use:

```text
One H1 per primary page
Logical H2/H3 hierarchy
Semantic links
Descriptive anchor text
Image alt text
Canonical URLs
Breadcrumbs
Structured data where applicable
```

Do not create headings solely for visual styling.

---

# 55. Conversion UX

The site should provide natural conversion points.

Primary conversion locations:

1. Header
2. Product detail
3. Product listing bottom
4. Homepage hero
5. Homepage featured products
6. About page
7. Contact page
8. Article/video pages
9. Footer

CTA language should remain factual and professional.

Examples:

```text
Send Inquiry
Request Product Information
Contact Us
Chat on WhatsApp
View Product
Explore Products
```

---

# 56. Trust UX

Trust content should be integrated into relevant user journeys.

Examples:

Product page:

```text
Product
↓
Specifications
↓
Certifications/documents
↓
Company capability
↓
Inquiry
```

About page:

```text
Company
↓
History
↓
Certificates
↓
Capabilities
↓
Contact
```

Do not invent certifications, manufacturing claims, statistics, or awards.

---

# 57. Search and Navigation UX

Navigation should allow a user to reach any major content type within a small number of steps.

Recommended maximum:

```text
Home → Category → Product
```

or:

```text
Home → Search → Product
```

Avoid deep nested menus.

---

# 58. Accessibility Labels

Examples:

```html
<button aria-label="Open navigation menu">
```

```html
<button aria-label="Close image preview">
```

```html
<img alt="Disposable surgical gown">
```

Do not use generic labels such as:

```text
Click here
Image
Button
```

when a meaningful label is available.

---

# 59. Component Architecture

Recommended component organization:

```text
src/components/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Modal.tsx
│   ├── Drawer.tsx
│   ├── Tabs.tsx
│   ├── Badge.tsx
│   ├── Toast.tsx
│   └── Skeleton.tsx
│
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Breadcrumbs.tsx
│   └── Container.tsx
│
├── product/
│   ├── ProductCard.tsx
│   ├── ProductGallery.tsx
│   ├── ProductSpecs.tsx
│   ├── ProductFilters.tsx
│   └── ProductInquiry.tsx
│
├── content/
│   ├── ArticleCard.tsx
│   ├── VideoCard.tsx
│   └── CertificateCard.tsx
│
├── forms/
│   ├── InquiryForm.tsx
│   └── ContactForm.tsx
│
└── admin/
    ├── AdminSidebar.tsx
    ├── AdminHeader.tsx
    ├── DataTable.tsx
    └── AdminForm.tsx
```

Names may evolve during implementation, but component responsibility should remain clear.

---

# 60. Component Rules

Components should be:

- Reusable
- Composable
- Accessible
- Testable
- Data-driven
- Responsive
- Theme-aware

Avoid creating a unique component for every page when an existing pattern can be reused.

---

# 61. CMS-Driven UI

The public UI must not hardcode business identity information.

Admin-configurable examples:

```text
Logo
Favicon
Company name
Email
Phone
WhatsApp
Address
Social links
Footer text
Hero images
CTA text
Navigation
Homepage sections
Products
Categories
Certificates
News
Blog
Videos
```

Theme-level values may be code-controlled, while business content is CMS-controlled.

---

# 62. UI Security Considerations

Never trust content merely because it comes from the CMS.

Public rendering must protect against:

- XSS
- Unsafe HTML
- Malicious links
- Unsafe media
- Invalid embedded content

Rich text should be sanitized.

Admin UI must enforce permissions server-side, not only by hiding buttons.

---

# 63. Performance-Oriented UI Rules

Avoid:

- Huge JavaScript bundles
- Unnecessary client components
- Auto-loading every image
- Auto-loading every video
- Large third-party UI libraries when native components suffice
- Blocking scripts
- Excessive animation

Prefer:

- Server-rendered content
- Static/ISR where appropriate
- Lazy-loaded below-the-fold media
- Optimized images
- Small client islands
- CSS-first interactions where possible

---

# 64. Client vs Server UI

Default:

> Server-rendered.

Use client components only when interaction requires them.

Client components are appropriate for:

- Search interaction
- Filters
- Gallery
- Modal
- Drawer
- Form interactions
- Admin tables
- Rich editors
- Drag/drop
- Interactive navigation

Do not convert entire pages into client components without a reason.

---

# 65. Page-Level UX Templates

## Template A — Listing

```text
Header
Breadcrumb
Hero/Title
Intro
Filters
Grid/List
Pagination
SEO Content
CTA
Footer
```

## Template B — Detail

```text
Header
Breadcrumb
Main Content
Related Content
CTA
Footer
```

## Template C — Corporate

```text
Header
Hero
Content Sections
Trust/Proof
CTA
Footer
```

## Template D — Form/Contact

```text
Header
Hero/Title
Contact Information
Form
Map
CTA
Footer
```

---

# 66. Design for Content Variability

CMS content can be longer or shorter than design mockups.

Components must tolerate:

- Long product names
- Long translated titles
- Missing optional images
- Missing descriptions
- Large certificate names
- Long company names
- Different date formats
- RTL text
- Long category names

Never assume fixed English copy length.

---

# 67. Fallback Media

If an image is missing:

```text
Use neutral placeholder
```

Do not show:

- Broken image icon
- Empty white box without context
- Random stock photo

For products, the admin should be warned when publishing without required media if the content rules require an image.

---

# 68. Draft/Published Visual State

Admin content should clearly show status:

```text
Draft
Published
Scheduled
Archived
```

Use semantic badges.

Public users should never see draft content unless explicitly authorized.

---

# 69. Unsaved Changes

Admin editors should warn users before leaving a page with unsaved changes.

Example:

```text
You have unsaved changes.

Leave without saving?
[Stay] [Leave]
```

Do not interrupt navigation when no changes exist.

---

# 70. Destructive Action UX

For delete/archive operations:

```text
Delete Product?

This action cannot be undone.

[Cancel] [Delete]
```

For high-impact operations, require stronger confirmation where appropriate.

Prefer archive/unpublish over permanent deletion when content may have references.

---

# 71. Status Badges

Recommended semantic badge variants:

```text
Success
Warning
Error
Info
Neutral
```

Example:

```text
Published
Draft
Archived
New
Contacted
Qualified
Converted
Spam
```

Do not communicate meaning through color alone.

---

# 72. Admin Inquiry UX

Inquiry list should prioritize sales workflow.

Columns:

```text
Name
Company
Email
Product
Status
Created
Assigned To
Actions
```

Inquiry detail:

```text
Contact information
Product context
Message
Source URL
Language
Status
Assignment
Notes
Activity history
```

The admin should be able to update status without navigating through multiple screens.

---

# 73. Accessibility for Data Tables

Tables must have:

- Proper headers
- Keyboard interaction
- Accessible row actions
- Clear selection state
- Responsive behavior
- Sort indicators where sorting exists

Bulk selection must be announced clearly.

---

# 74. Design QA Checklist

Before considering a UI component complete:

### Visual

- [ ] Correct typography
- [ ] Correct spacing
- [ ] Correct hierarchy
- [ ] Correct alignment
- [ ] Correct responsive behavior
- [ ] Correct states

### Interaction

- [ ] Hover
- [ ] Focus
- [ ] Active
- [ ] Disabled
- [ ] Loading
- [ ] Error
- [ ] Success

### Accessibility

- [ ] Keyboard usable
- [ ] Focus visible
- [ ] Labels present
- [ ] Alt text handled
- [ ] Contrast acceptable
- [ ] Screen-reader semantics
- [ ] Reduced motion respected

### Responsive

- [ ] 360px
- [ ] 390px
- [ ] 768px
- [ ] 1024px
- [ ] 1280px
- [ ] 1536px

---

# 75. UI Acceptance Criteria

The UI implementation is acceptable when:

1. Public pages share a coherent design system.
2. Product pages prioritize product information and inquiry actions.
3. No public login/signup/account flow exists.
4. No AI chat/agent feature exists.
5. Business identity content is CMS-configurable.
6. Admin UI is permission-aware.
7. All major interactions have loading/error/success states.
8. Mobile navigation works without horizontal overflow.
9. Product grids are responsive.
10. Forms are accessible and server-validated.
11. Images are optimized and responsive.
12. RTL layout can be enabled for supported languages.
13. Long translated content does not break layouts.
14. Accessibility is treated as a core requirement.
15. The interface does not require paid UI or SaaS services.
16. The design supports future product/catalog growth without redesigning core components.
17. The site remains visually professional even when optional CMS content is missing.
18. Admin users can manage content without editing source code.

---

# 76. Implementation Rules for AI Coding Agents

An AI coding agent implementing this project must follow these rules:

1. Read `00-MASTER-PLAN.md` before implementation.
2. Read `01-PROJECT-ARCHITECTURE.md` before creating application structure.
3. Read `02-PAGE-BY-PAGE-SITEMAP.md` before creating routes.
4. Treat this file as the UI/UX source of truth.
5. Do not invent public customer authentication.
6. Do not add an AI assistant/chatbot.
7. Do not hardcode business contact information.
8. Do not hardcode product/catalog content.
9. Reuse shared components.
10. Use design tokens instead of arbitrary styling values.
11. Keep server rendering as the default.
12. Add client-side code only where interaction requires it.
13. Make every interactive component keyboard accessible.
14. Add responsive behavior at component level.
15. Test long content and multilingual layouts.
16. Do not hide permission enforcement only in the UI; enforce it server-side.
17. Do not introduce paid third-party services as mandatory dependencies.
18. Preserve the B2B catalogue + lead-generation product model.
19. Keep UI state predictable and testable.
20. Do not replace real content with fabricated certifications, statistics, awards, or business claims.

---

# 77. Final Design System Summary

The final interface should feel like a:

> Modern international medical manufacturing website with a strong product catalogue, professional corporate presentation, clear technical information, and straightforward B2B inquiry flows.

It should not feel like:

- A generic ecommerce store
- A social network
- A consumer marketplace
- An AI chatbot product
- A SaaS dashboard on the public side

The public site should be:

```text
Clean
Trustworthy
Product-focused
Content-rich
Fast
Responsive
Accessible
SEO-friendly
Conversion-oriented
```

The admin should be:

```text
Structured
Dense but readable
Permission-aware
CMS-driven
Efficient
Responsive
Auditable
```

---

# 78. Relationship to Other Blueprint Files

This file defines **how the product should look and behave**.

It does not replace:

- `01-PROJECT-ARCHITECTURE.md` — technical architecture
- `02-PAGE-BY-PAGE-SITEMAP.md` — routes and page inventory
- `04-PRODUCT-CATALOG-SPEC.md` — product data model and catalog behavior
- `05-CONTENT-CMS-SPEC.md` — content management
- `06-ADMIN-PANEL-SPEC.md` — detailed admin functionality
- `07-DATABASE-SCHEMA.md` — database design
- `08-API-BACKEND-SPEC.md` — API/backend contracts
- `09-MULTILINGUAL-SEO-SPEC.md` — localization and SEO
- `10-SECURITY-PERFORMANCE-DEPLOYMENT.md` — non-functional requirements
- `11-IMPLEMENTATION-TASKS.md` — build sequence
- `12-TESTING-QA-ACCEPTANCE.md` — verification

All files must remain consistent with this UI/UX specification.

---

# 79. Final Directive

Implement the UI as a reusable, responsive, accessible, CMS-driven design system.

Prioritize clarity over decoration, product information over visual noise, real trust signals over fabricated claims, and reliable conversion paths over aggressive sales patterns.

The system must be able to evolve as the product catalogue, languages, content, media library, and administrative requirements grow.
