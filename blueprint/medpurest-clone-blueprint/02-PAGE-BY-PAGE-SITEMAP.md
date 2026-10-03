# MedPurest Clone Blueprint --- Page-by-Page Sitemap

**Document:** `02-PAGE-BY-PAGE-SITEMAP.md`\
**Project:** MedPurest Clone / Rebuild Blueprint\
**Status:** FINAL PAGE & ROUTE SPECIFICATION\
**Depends On:** `00-MASTER-PLAN.md`, `01-PROJECT-ARCHITECTURE.md`\
**Version:** 1.0

------------------------------------------------------------------------

## 1. Purpose

This document defines the complete page, route, navigation, template,
section, state, and functional sitemap for the MedPurest-style B2B
medical website.

It covers:

-   Public pages
-   Product catalogue routes
-   Content routes
-   About/company routes
-   Search
-   Contact/inquiry
-   Legal pages
-   Admin pages
-   Authentication pages
-   Error states
-   Empty states
-   Loading states
-   Responsive behavior requirements
-   SEO requirements by route
-   Navigation relationships

This document is a functional sitemap, not a visual design
specification. Detailed styling belongs in:

``` text
03-UI-UX-DESIGN-SPEC.md
```

------------------------------------------------------------------------

# 2. Route Architecture Overview

## 2.1 Public Website

``` text
/
├── /about
│   ├── /about/history
│   ├── /about/certification
│   ├── /about/honor
│   └── /about/culture
│
├── /products
│   ├── /products/[category]
│   └── /products/[category]/[product]
│
├── /news
│   ├── /news/[category]
│   └── /news/[category]/[slug]
│
├── /blog
│   ├── /blog/[category]
│   └── /blog/[category]/[slug]
│
├── /video
│   └── /video/[slug]
│
├── /certificate
├── /contact-us
├── /search
├── /privacy-policy
├── /sitemap
└── error/not-found routes
```

------------------------------------------------------------------------

# 3. Primary Navigation

Default public navigation:

``` text
Home
About
Products
News
Blog
Video
Certificate
Contact Us
```

Utility navigation:

``` text
Search
Language
WhatsApp / Contact CTA
```

Navigation labels and destinations must be editable from the admin
panel.

------------------------------------------------------------------------

# 4. Global Website Shell

Every normal public page should use a common shell:

``` text
Announcement/Utility Bar (optional)
        ↓
Header
        ↓
Primary Navigation
        ↓
Page Content
        ↓
CTA Section where applicable
        ↓
Footer
```

## 4.1 Header

Typical elements:

-   Logo
-   Primary navigation
-   Search
-   Language selector
-   Contact/WhatsApp CTA
-   Mobile menu button

Header must remain usable on small screens.

------------------------------------------------------------------------

## 4.2 Footer

Recommended footer groups:

``` text
Company
Products
Resources
Contact
Social
Legal
```

Dynamic values:

-   Logo
-   Company name
-   Description
-   Address
-   Email
-   Phone
-   WhatsApp
-   Social links
-   Copyright
-   Privacy link

------------------------------------------------------------------------

# 5. Global Page States

All dynamic pages must define:

### Loading

Show an appropriate loading state without layout collapse.

### Empty

Examples:

``` text
No products found.
No news published yet.
No blog posts found.
No videos available.
```

### Error

Show a user-friendly error message and recovery action.

### Not Found

For invalid dynamic routes:

``` text
404
Content not found
Back to Home
```

### Offline / Network Failure

Forms and admin operations should fail gracefully if connectivity is
interrupted.

------------------------------------------------------------------------

# 6. Homepage --- `/`

## Purpose

Primary corporate landing page and conversion hub.

## Sections

### 6.1 Header

-   Logo
-   Navigation
-   Search
-   Language
-   Contact CTA

### 6.2 Hero

Admin-controlled:

-   Hero title
-   Subtitle
-   Background image/video where supported
-   Primary CTA
-   Secondary CTA
-   Link destination
-   Optional overlay

### 6.3 Search / Popular Searches

Optional:

``` text
Search Products
```

Popular search terms can be managed from CMS/settings.

### 6.4 Company Introduction

-   Company title
-   Short description
-   Image
-   Statistics
-   Read More CTA

### 6.5 Company Statistics

Examples:

``` text
Years of Experience
Product Categories
Countries Served
Certifications
```

All values should be admin-editable.

### 6.6 Featured Products

-   Section title
-   Product cards
-   Product image
-   Product name
-   Category
-   CTA
-   View all

### 6.7 Product Categories

-   Category image
-   Category title
-   Short description
-   Product count where useful
-   Link

### 6.8 Why Choose Us

Configurable reason cards:

``` text
Quality
Experience
Manufacturing
Certifications
Global Service
Customization
```

Exact content is admin-managed.

### 6.9 Certifications / Trust

Optional:

-   Certificate logos
-   Certifications
-   Quality claims
-   View certificates CTA

### 6.10 Main CTA

Example intent:

``` text
Need a Medical Product?
Contact Our Team
```

### 6.11 Latest News

Display configurable number of published articles.

### 6.12 Latest Blog

Display latest or featured blog posts.

### 6.13 Video / Media

Optional featured video.

### 6.14 Contact CTA

Contact or inquiry action.

### 6.15 Footer

Global footer.

## SEO

Homepage requires:

-   Editable title
-   Meta description
-   Open Graph
-   Canonical
-   Organization structured data
-   WebSite structured data where applicable

------------------------------------------------------------------------

# 7. About --- `/about`

## Purpose

Corporate overview.

## Sections

-   Page hero/banner
-   Company introduction
-   Mission/vision
-   Core strengths
-   Company statistics
-   Featured media
-   CTA

## Links

``` text
History
Certification
Honor
Culture
Contact
```

------------------------------------------------------------------------

# 8. History --- `/about/history`

## Purpose

Display company history/timeline.

## Sections

-   Hero
-   Intro
-   Timeline
-   Milestones
-   Images
-   CTA

## Timeline Item

Each item may contain:

``` text
Year
Title
Description
Image
Sort order
```

Admin controls publication and ordering.

------------------------------------------------------------------------

# 9. Certification --- `/about/certification`

## Purpose

Display certifications and quality credentials.

## Sections

-   Hero
-   Certification introduction
-   Certificate grid
-   Certificate detail/lightbox
-   Download where applicable
-   CTA

## Certificate Card

``` text
Name
Issuing organization
Issue date
Expiry date
Thumbnail
```

------------------------------------------------------------------------

# 10. Honor --- `/about/honor`

## Purpose

Display awards, honors, achievements, or recognitions.

## Sections

-   Hero
-   Intro
-   Honor/award grid
-   Detail modal/page if enabled
-   CTA

## Honor Item

``` text
Title
Organization
Date
Description
Image
Document
```

------------------------------------------------------------------------

# 11. Culture --- `/about/culture`

## Purpose

Present company culture and values.

## Sections

-   Hero
-   Company values
-   Mission
-   Vision
-   Team/culture imagery
-   Quality philosophy
-   CTA

Content must be editable through CMS.

------------------------------------------------------------------------

# 12. Products Index --- `/products`

## Purpose

Main catalogue discovery page.

## Sections

### 12.1 Hero

-   Products title
-   Intro
-   Breadcrumb

### 12.2 Search

Product search field.

### 12.3 Category Navigation

Display all active categories.

### 12.4 Featured Products

Optional featured products.

### 12.5 Product Grid

Cards with:

-   Image
-   Name
-   Category
-   Short description
-   CTA

### 12.6 Filtering

Potential filters:

``` text
Category
Subcategory
Tag
Application
Material
```

Only filters supported by actual data should be shown.

### 12.7 Pagination

Server-side pagination required for large catalogues.

### 12.8 Empty State

``` text
No products found.
Try another search or category.
```

------------------------------------------------------------------------

# 13. Product Category --- `/products/[category]`

## Purpose

Show products within a category.

## Sections

-   Breadcrumb
-   Category hero
-   Category description
-   Optional category image
-   Subcategory navigation
-   Filters
-   Product grid
-   Pagination
-   Related categories
-   CTA

## SEO

Each category must have:

-   SEO title
-   Meta description
-   Canonical
-   Structured data where applicable
-   Social image

------------------------------------------------------------------------

# 14. Product Detail --- `/products/[category]/[product]`

## Purpose

Primary product conversion page.

## Sections

### 14.1 Breadcrumb

``` text
Home
→ Products
→ Category
→ Product
```

### 14.2 Product Header

-   Product name
-   Product code/SKU
-   Category
-   Short description

### 14.3 Product Gallery

-   Main image
-   Thumbnail gallery
-   Zoom/lightbox where supported
-   Alt text

### 14.4 Product Description

Rich content.

### 14.5 Features

Bullet/list format.

### 14.6 Applications

Where the product is used.

### 14.7 Specifications

Structured specification table.

### 14.8 Material

Optional structured field.

### 14.9 Packaging

Optional structured field.

### 14.10 Customization

Optional:

``` text
OEM
Private Label
Packaging
Specification
```

### 14.11 Documents

Examples:

``` text
Brochure
Specification PDF
Certificate
Technical document
```

### 14.12 Inquiry CTA

Prominent:

``` text
Request Information
Send Inquiry
Contact Us
WhatsApp
```

### 14.13 Related Products

Show related items.

### 14.14 Related Content

Optional relevant blogs/news.

### 14.15 SEO

Product structured data only where the actual data supports it. Do not
invent prices, availability, reviews, or ratings.

------------------------------------------------------------------------

# 15. News Index --- `/news`

## Purpose

News discovery.

## Sections

-   Hero
-   Category navigation
-   Featured news
-   Latest news
-   Search/filter where enabled
-   Pagination
-   CTA

------------------------------------------------------------------------

# 16. News Category --- `/news/[category]`

Examples:

``` text
/news/company-news
/news/industry-dynamics
```

## Sections

-   Breadcrumb
-   Category title
-   Category description
-   Article grid
-   Pagination
-   Related categories

------------------------------------------------------------------------

# 17. News Detail --- `/news/[category]/[slug]`

## Sections

-   Breadcrumb
-   Category
-   Title
-   Publish date
-   Featured image
-   Article content
-   Share controls
-   Related news
-   CTA

Optional:

``` text
Author
Updated date
Reading time
```

## SEO

-   Article metadata
-   Canonical
-   Open Graph
-   Article structured data where appropriate

------------------------------------------------------------------------

# 18. Blog Index --- `/blog`

## Purpose

Educational/content discovery.

## Sections

-   Hero
-   Featured post
-   Category navigation
-   Latest posts
-   Tags
-   Pagination
-   CTA

------------------------------------------------------------------------

# 19. Blog Category --- `/blog/[category]`

Examples:

``` text
/blog/problem-guide
/blog/product-introduction
```

## Sections

-   Breadcrumb
-   Category description
-   Post grid
-   Pagination
-   Related categories

------------------------------------------------------------------------

# 20. Blog Detail --- `/blog/[category]/[slug]`

## Sections

-   Breadcrumb
-   Category
-   Title
-   Publish date
-   Featured image
-   Article body
-   Tags
-   Related posts
-   Product references where applicable
-   CTA

## SEO

Support:

-   Article metadata
-   Canonical
-   Social metadata
-   Structured data
-   Internal linking

------------------------------------------------------------------------

# 21. Video Index --- `/video`

## Purpose

Video/media discovery.

## Sections

-   Hero
-   Featured video
-   Video grid
-   Categories if enabled
-   Pagination/load more
-   CTA

------------------------------------------------------------------------

# 22. Video Detail --- `/video/[slug]`

## Sections

-   Breadcrumb
-   Video player/embed
-   Title
-   Description
-   Publish information
-   Related videos
-   Related products/content
-   CTA

Video sources may include:

``` text
External video URL
Embedded provider
Supported local asset
```

The implementation must validate allowed providers and URLs.

------------------------------------------------------------------------

# 23. Certificate Index --- `/certificate`

## Purpose

Central certificate and compliance showcase.

## Sections

-   Hero
-   Intro
-   Certificate grid
-   Search/filter if required
-   Certificate preview
-   Download where enabled
-   CTA

------------------------------------------------------------------------

# 24. Contact Us --- `/contact-us`

## Purpose

Primary contact and lead conversion page.

## Sections

### Contact Information

-   Company name
-   Address
-   Phone
-   Email
-   WhatsApp
-   Business hours

### Map

Optional configurable map embed.

### Contact Form

Recommended fields:

``` text
Name *
Email *
Phone
WhatsApp
Company
Country
Subject
Message *
Product
Attachment
```

Required fields may be changed through configuration.

### Form States

``` text
Idle
Submitting
Success
Validation Error
Server Error
Rate Limited
```

### Success Message

After successful submission:

``` text
Thank you.
Your inquiry has been received.
Our team will contact you.
```

No public account should be created.

------------------------------------------------------------------------

# 25. Search --- `/search`

## Purpose

Global public content search.

## Search Scope

Potentially:

``` text
Products
Categories
News
Blog
Video
Certificate
```

## Layout

``` text
Search Input
    ↓
Result Count
    ↓
Filters
    ↓
Grouped Results
    ↓
Pagination
```

## Query States

### No Query

Show:

``` text
Search products, articles, or other content.
```

### Results

Show relevant results.

### No Results

``` text
No results found.
Try different keywords.
```

### Invalid/Too Short Query

Show validation message.

------------------------------------------------------------------------

# 26. Privacy Policy --- `/privacy-policy`

## Purpose

Legal privacy information.

Content is CMS-managed.

Sections may include:

-   Information collected
-   Form data
-   Cookies
-   Analytics
-   Storage
-   Data retention
-   User rights
-   Contact information
-   Updates

The actual legal text must be supplied/approved by the site owner or
qualified legal counsel.

------------------------------------------------------------------------

# 27. Sitemap Page --- `/sitemap`

## Purpose

Human-readable navigation sitemap.

Should list major public sections.

The XML sitemap is a separate technical SEO resource and must not be
confused with this page.

------------------------------------------------------------------------

# 28. Technical SEO Routes

These may not be visual pages but must exist where applicable:

``` text
/robots.txt
/sitemap.xml
```

Potential localized sitemap architecture:

``` text
/sitemap.xml
/sitemap-products.xml
/sitemap-news.xml
/sitemap-blog.xml
```

Exact implementation depends on final framework configuration.

------------------------------------------------------------------------

# 29. Error Pages

## 404

``` text
Not Found
The requested page could not be found.
Back to Home
Browse Products
```

## 500

``` text
Something went wrong.
Please try again later.
```

Do not expose stack traces.

------------------------------------------------------------------------

# 30. Admin Sitemap

``` text
/admin
├── /login
├── /dashboard
│
├── /products
│   ├── /new
│   └── /[id]/edit
│
├── /categories
│   ├── /new
│   └── /[id]/edit
│
├── /news
│   ├── /new
│   └── /[id]/edit
│
├── /blog
│   ├── /new
│   └── /[id]/edit
│
├── /videos
│   ├── /new
│   └── /[id]/edit
│
├── /certificates
│   ├── /new
│   └── /[id]/edit
│
├── /honors
├── /history
├── /culture
│
├── /pages
│   └── /[id]/edit
│
├── /inquiries
│   └── /[id]
│
├── /media
├── /navigation
├── /languages
├── /seo
├── /settings
├── /users
├── /roles
└── /activity-logs
```

------------------------------------------------------------------------

# 31. Admin Login --- `/admin/login`

## Purpose

Secure administrator authentication.

## UI

-   Logo
-   Admin title
-   Email/username
-   Password
-   Remember option where supported
-   Login button
-   Error state

Optional:

``` text
Forgot Password
2FA
```

if enabled.

## Security

-   Rate limiting
-   Secure cookies/session
-   Server-side authentication
-   No credential leakage
-   Generic authentication errors where appropriate

------------------------------------------------------------------------

# 32. Admin Dashboard --- `/admin/dashboard`

## Purpose

Operational overview.

## Widgets

Potential:

``` text
Total Products
Published Products
Draft Products
New Inquiries
Open Inquiries
Published News
Published Blogs
Media Count
```

## Recent Activity

Show:

-   Recent inquiries
-   Recent content updates
-   Recent admin activity

## Quick Actions

``` text
Add Product
Add News
Add Blog
Upload Media
View Inquiries
```

Dashboard content must respect user permissions.

------------------------------------------------------------------------

# 33. Admin Products --- `/admin/products`

## Purpose

Manage products.

## Features

-   Search
-   Filter
-   Category filter
-   Status filter
-   Featured filter
-   Pagination
-   Sort
-   Create
-   Edit
-   Duplicate where allowed
-   Publish/unpublish
-   Archive
-   Delete with confirmation

## Table

Potential columns:

``` text
Image
Product
Category
Status
Featured
Updated
Actions
```

------------------------------------------------------------------------

# 34. Admin Product Editor

Route:

``` text
/admin/products/new
/admin/products/[id]/edit
```

Sections:

``` text
Basic Information
Category
Description
Images
Specifications
Applications
Material
Packaging
Customization
Documents
Tags
Related Products
Translations
SEO
Publication
```

Draft/autosave behavior may be added if supported.

------------------------------------------------------------------------

# 35. Admin Categories

## Features

-   List categories
-   Tree/hierarchy
-   Add
-   Edit
-   Reorder
-   Enable/disable
-   Delete with dependency check
-   SEO
-   Translation

------------------------------------------------------------------------

# 36. Admin News

Features:

-   List
-   Search
-   Filter category
-   Draft/published
-   Featured
-   Create/edit
-   Schedule if supported
-   Delete/archive
-   SEO
-   Translation

------------------------------------------------------------------------

# 37. Admin Blog

Features:

-   List
-   Categories
-   Tags
-   Create/edit
-   Draft/published
-   Featured
-   Related products
-   SEO
-   Translation

------------------------------------------------------------------------

# 38. Admin Video

Features:

-   Add video
-   Edit
-   Thumbnail
-   Source URL
-   Category
-   Description
-   Publication
-   SEO
-   Translation

------------------------------------------------------------------------

# 39. Admin Certificates

Features:

-   Add certificate
-   Upload image/PDF
-   Metadata
-   Issue/expiry dates
-   Publish/unpublish
-   Reorder
-   Translation

------------------------------------------------------------------------

# 40. Admin Honors

Features:

-   Add/edit/delete
-   Image/document
-   Date
-   Organization
-   Description
-   Ordering
-   Publication

------------------------------------------------------------------------

# 41. Admin History

Features:

-   Add milestone
-   Year
-   Title
-   Description
-   Image
-   Ordering
-   Translation
-   Publish state

------------------------------------------------------------------------

# 42. Admin Culture

Features:

-   Manage culture sections
-   Values
-   Mission
-   Vision
-   Images
-   Ordering
-   Translation

------------------------------------------------------------------------

# 43. Admin Pages

Used for manageable static/corporate pages.

Features:

-   Page title
-   Slug
-   Content
-   Hero
-   Featured image
-   Status
-   SEO
-   Translation

------------------------------------------------------------------------

# 44. Admin Inquiries

## List

Columns:

``` text
Name
Company
Country
Product
Status
Assigned To
Created
Updated
```

## Filters

``` text
Status
Date
Product
Assigned User
Country
Source
```

## Detail

Show:

``` text
Contact information
Message
Product reference
Attachments
Timeline
Internal notes
Status
Assignment
```

## Actions

``` text
Change status
Assign user
Add note
Open source page
Download attachment
Mark spam
Close
```

------------------------------------------------------------------------

# 45. Admin Media Library

## Features

-   Upload
-   Drag/drop where supported
-   Search
-   Filter type
-   Folder management
-   Preview
-   Rename
-   Metadata
-   Alt text
-   Copy reference
-   Delete with usage warning

## Media states

``` text
Uploading
Processing
Ready
Failed
```

------------------------------------------------------------------------

# 46. Admin Navigation

Manage:

``` text
Header menu
Footer menus
Utility links
CTA links
```

Features:

-   Add
-   Edit
-   Reorder
-   Nest
-   Hide/show
-   Link to internal page
-   Link to external URL
-   Translation

------------------------------------------------------------------------

# 47. Admin Languages

Features:

-   List languages
-   Enable/disable
-   Set default
-   Direction
-   Ordering
-   Translation status
-   Locale code

Example:

``` text
English — en — LTR
Arabic — ar — RTL
Spanish — es — LTR
Portuguese — pt — LTR
Chinese — zh — LTR
```

Actual enabled languages are controlled by the site owner.

------------------------------------------------------------------------

# 48. Admin SEO

Global SEO management:

``` text
Default title
Default description
Default social image
Robots
Sitemap settings
Redirects
Structured data defaults
```

Per-entity SEO:

``` text
Product
Category
News
Blog
Video
Page
```

------------------------------------------------------------------------

# 49. Admin Settings

Recommended groups:

``` text
General
Branding
Contact
Social
Homepage
Email
Localization
SEO
Security
Media
System
```

------------------------------------------------------------------------

# 50. Admin Users --- `/admin/users`

Features:

-   List users
-   Add user
-   Edit user
-   Disable user
-   Reset access
-   Assign roles
-   View activity

Only authorized administrators may access this area.

------------------------------------------------------------------------

# 51. Admin Roles --- `/admin/roles`

Features:

-   List roles
-   Create custom role where supported
-   Assign permissions
-   Review permission matrix

System-critical permissions should not be accidentally removed from the
final Super Admin.

------------------------------------------------------------------------

# 52. Activity Logs --- `/admin/activity-logs`

Display:

``` text
Actor
Action
Entity
Entity ID
Timestamp
IP/device metadata where legally appropriate
Summary
```

Filters:

``` text
User
Action
Entity
Date
```

------------------------------------------------------------------------

# 53. Responsive Page Rules

Every public page must support:

``` text
320px+
Mobile
Tablet
Desktop
Large Desktop
```

No page may require horizontal scrolling under normal use.

Admin pages must also support smaller laptop/tablet widths where
practical.

------------------------------------------------------------------------

# 54. Breadcrumb Strategy

Use breadcrumbs on:

-   Product category
-   Product detail
-   News category
-   News detail
-   Blog category
-   Blog detail
-   Video detail
-   About subsections
-   Certificate where appropriate

Example:

``` text
Home
→ Products
→ Protective Equipment
→ Surgical Gown
```

Breadcrumbs should be generated from actual hierarchy, not hard-coded
strings.

------------------------------------------------------------------------

# 55. URL and Slug Rules

Slugs must be:

-   Lowercase
-   URL-safe
-   Stable
-   Unique within their relevant entity scope
-   Editable with redirect support

Avoid:

``` text
spaces
unnecessary special characters
unstable IDs in public URLs
```

If a published slug changes:

``` text
Old URL
   ↓
301 redirect
   ↓
New URL
```

where appropriate.

------------------------------------------------------------------------

# 56. Pagination Rules

Use pagination for:

-   Product listings
-   News listings
-   Blog listings
-   Video listings
-   Admin tables
-   Inquiry lists
-   Media library

Do not render thousands of records on one page.

------------------------------------------------------------------------

# 57. Filtering Rules

Filters should be:

-   URL-addressable where useful
-   Server-side for large datasets
-   Resettable
-   Mobile-friendly
-   Accessible

Do not create dozens of filters that have no meaningful data.

------------------------------------------------------------------------

# 58. Public Conversion Paths

The major conversion paths are:

### Product

``` text
Homepage
 ↓
Products
 ↓
Category
 ↓
Product
 ↓
Inquiry
```

### Content

``` text
Search
 ↓
Blog/News
 ↓
Product reference
 ↓
Product
 ↓
Inquiry
```

### Direct

``` text
Contact Us
 ↓
Inquiry
```

------------------------------------------------------------------------

# 59. Internal Linking Requirements

Products should link to:

-   Categories
-   Related products
-   Relevant content

News/blog should link to:

-   Related content
-   Relevant products
-   Categories

Company pages should link to:

-   Products
-   Contact
-   Certifications
-   Relevant trust content

This improves navigation and SEO.

------------------------------------------------------------------------

# 60. Page Template Matrix

  Page Type          Public   Admin          SEO   CMS   Inquiry CTA
  ---------------- -------- ------- ------------ ----- -------------
  Homepage              Yes     Yes          Yes   Yes           Yes
  About                 Yes     Yes          Yes   Yes           Yes
  History               Yes     Yes          Yes   Yes           Yes
  Certification         Yes     Yes          Yes   Yes      Optional
  Honor                 Yes     Yes          Yes   Yes      Optional
  Culture               Yes     Yes          Yes   Yes           Yes
  Products              Yes     Yes          Yes   Yes           Yes
  Category              Yes     Yes          Yes   Yes           Yes
  Product Detail        Yes     Yes          Yes   Yes           Yes
  News                  Yes     Yes          Yes   Yes           Yes
  News Detail           Yes     Yes          Yes   Yes           Yes
  Blog                  Yes     Yes          Yes   Yes           Yes
  Blog Detail           Yes     Yes          Yes   Yes           Yes
  Video                 Yes     Yes          Yes   Yes           Yes
  Certificate           Yes     Yes          Yes   Yes      Optional
  Contact               Yes     Yes          Yes   Yes           Yes
  Search                Yes      No   Controlled    No      Optional
  Privacy               Yes     Yes          Yes   Yes            No
  Sitemap               Yes      No          Yes    No            No

------------------------------------------------------------------------

# 61. Route Ownership Matrix

``` text
Website Team
    ├── Homepage
    ├── About
    ├── Products
    ├── News
    ├── Blog
    ├── Video
    ├── Certificate
    └── Contact

Content Team
    ├── News
    ├── Blog
    ├── Pages
    └── About content

Sales Team
    └── Inquiries

Media Team
    └── Media Library

SEO Team
    ├── Metadata
    ├── Redirects
    ├── Sitemap
    └── Search visibility

System Admin
    ├── Users
    ├── Roles
    ├── Settings
    └── Activity Logs
```

Actual permissions are defined in the admin specification.

------------------------------------------------------------------------

# 62. Final Sitemap

``` text
PUBLIC
│
├── /
│
├── /about
│   ├── /about/history
│   ├── /about/certification
│   ├── /about/honor
│   └── /about/culture
│
├── /products
│   ├── /products/[category]
│   └── /products/[category]/[product]
│
├── /news
│   ├── /news/[category]
│   └── /news/[category]/[slug]
│
├── /blog
│   ├── /blog/[category]
│   └── /blog/[category]/[slug]
│
├── /video
│   └── /video/[slug]
│
├── /certificate
├── /contact-us
├── /search
├── /privacy-policy
├── /sitemap
│
├── /robots.txt
└── /sitemap.xml


ADMIN
│
├── /admin/login
├── /admin/dashboard
│
├── /admin/products
├── /admin/categories
├── /admin/news
├── /admin/blog
├── /admin/videos
├── /admin/certificates
├── /admin/honors
├── /admin/history
├── /admin/culture
├── /admin/pages
├── /admin/inquiries
├── /admin/media
├── /admin/navigation
├── /admin/languages
├── /admin/seo
├── /admin/settings
├── /admin/users
├── /admin/roles
└── /admin/activity-logs
```

------------------------------------------------------------------------

# 63. Page Completion Standard

Every page in this sitemap must eventually have:

``` text
[ ] Route
[ ] Page purpose
[ ] Content source
[ ] Required sections
[ ] Loading state
[ ] Empty state where applicable
[ ] Error state
[ ] Mobile layout
[ ] Desktop layout
[ ] SEO metadata
[ ] Accessibility review
[ ] Analytics/event consideration
[ ] Related navigation
[ ] Permission rules if admin
[ ] Tests
```

------------------------------------------------------------------------

# 64. Final Directive

This sitemap is the route-level source of truth for the project.

Later documents may add implementation detail, but they must not
silently remove required routes or introduce conflicting route
structures.

The public site remains account-free.

The admin system remains authenticated and permission-controlled.

No AI agent/chatbot is part of the sitemap.

No mandatory paid service is represented as a required page dependency.

The locked 13-document project structure remains unchanged.

**End of Page-by-Page Sitemap Specification**
