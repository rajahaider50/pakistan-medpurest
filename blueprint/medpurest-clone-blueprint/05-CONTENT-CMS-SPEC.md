# MedPurest Clone Blueprint — Content CMS Specification

**File:** `05-CONTENT-CMS-SPEC.md`  
**Project:** MedPurest-style B2B Medical Product Catalogue & Lead Generation Platform  
**Status:** Implementation Specification  
**Audience:** Product owners, content managers, frontend engineers, backend engineers, SEO managers, translators, QA engineers, and AI coding agents

---

# 1. Purpose

This document defines the Content Management System (CMS) for the platform.

The CMS must allow authorized administrators to manage the public website without changing source code.

It controls:

- Corporate pages
- Homepage content
- About content
- History
- Certification
- Honors
- Culture
- News
- Blog
- Videos
- Certificates
- Navigation
- Media
- SEO metadata
- Languages/translations
- Reusable content blocks
- Publishing states
- Content relationships
- Redirects
- Site-wide business information

The CMS must support the B2B medical catalogue model established in the project architecture.

---

# 2. CMS Product Definition

The CMS is an internal administration system for managing public-facing content.

It is not a generic page builder and should not become an uncontrolled drag-and-drop website builder.

The CMS should provide:

```text
Structured Content
+
Reusable Components
+
Controlled Publishing
+
Multilingual Content
+
SEO Controls
+
Media Management
+
Auditability
```

---

# 3. CMS Principles

## 3.1 Structured Over Arbitrary

Use structured fields for predictable content.

Example:

```text
News:
Title
Category
Date
Author
Cover Image
Excerpt
Content
SEO
```

Do not store an entire news record as an arbitrary HTML blob.

---

## 3.2 Reusable Content

Repeated information should be reusable.

Examples:

- Site contact information
- Company identity
- Certificates
- Products
- Categories
- Navigation
- Footer links

Avoid duplicate copies of the same business information.

---

## 3.3 Draft Before Publish

Content changes should normally follow:

```text
Draft
↓
Review
↓
Published
```

Optional:

```text
Scheduled
Archived
```

---

## 3.4 Translation-Aware

Content must support multiple languages without duplicating the entire content entity.

Conceptually:

```text
Content Entity
    ↓
English Translation
Spanish Translation
Arabic Translation
Portuguese Translation
Chinese Translation
```

Actual enabled languages must be configurable.

---

## 3.5 CMS Is the Source of Truth

Business-managed public content must come from the CMS/database.

Examples:

- Company name
- Logo
- Email
- Phone
- WhatsApp
- Address
- Social links
- Homepage content
- Product content
- News
- Blog
- Certificates

---

# 4. CMS Content Domains

The CMS should organize content into logical domains.

```text
Catalog
├── Products
└── Categories

Corporate
├── About
├── History
├── Culture
├── Honors
└── Certificates

Publishing
├── News
├── Blog
└── Videos

Website
├── Pages
├── Homepage
├── Navigation
└── Footer

Leads
└── Inquiries

Media
└── Media Library

Localization
└── Languages

SEO
├── Metadata
├── Redirects
└── Sitemap controls

System
├── Settings
├── Users
├── Roles
└── Activity Logs
```

---

# 5. Content Types

Required content types:

```text
Page
News
Blog Post
Video
Certificate
Honor
History Item
Culture Section
Category
Product
```

Supporting entities:

```text
Media
Tag
Menu
Site Setting
SEO Metadata
Redirect
Language
Inquiry
```

---

# 6. Generic Content Lifecycle

Every publishable content type should have a predictable lifecycle.

```text
Draft
   ↓
Review
   ↓
Published
   ↓
Archived
```

Optional:

```text
Scheduled
```

---

# 7. Draft State

Draft content:

- Visible to authorized admins
- Not publicly listed
- Not indexable
- Not included in public sitemap
- Can be previewed by authorized admins

---

# 8. Review State

Review is optional but recommended for organizations with multiple editors.

A reviewer may verify:

- Accuracy
- Language
- Images
- SEO
- Formatting
- Compliance
- Publication timing

---

# 9. Published State

Published content:

- Appears publicly
- Can be indexed if indexable
- Can be linked internally
- May appear in sitemap
- May appear in search

---

# 10. Scheduled State

Optional scheduled publishing:

```text
publish_at
```

At or after the configured time, the content can transition to published.

The scheduler must be reliable and idempotent.

If scheduled jobs are unavailable, publication must not silently produce inconsistent state.

---

# 11. Archived State

Archived content:

- Removed from normal public listings
- Retained in admin
- Preserves historical relationships
- May redirect to another page
- May return appropriate 404 behavior

Do not automatically delete associated historical audit records.

---

# 12. Content Entity vs Translation

Separate content identity from language-specific text.

Example:

```text
news
└── news_translations
```

The main entity stores:

```text
id
status
author_id
published_at
created_at
updated_at
```

The translation stores:

```text
news_id
language_id
title
slug
excerpt
content
seo_title
seo_description
```

This model should be reused across content types where practical.

---

# 13. Translation Rules

A translation record should have:

```text
content_id
language_id
status
```

Optional translation state:

```text
Draft
Translated
Reviewed
Published
```

Do not assume every language is complete.

---

# 14. Translation Fallback

Fallback behavior must be explicit.

Recommended:

```text
Requested language
↓
If published translation exists → use it
↓
Else fallback language
↓
Else show content-not-available state
```

The fallback language should be configured at the site/language level.

Do not silently mix multiple languages inside the same page unless explicitly intended.

---

# 15. Content Versioning

The CMS should support safe editing.

At minimum, retain:

```text
created_at
updated_at
updated_by
```

For important content, future versioning may store:

```text
content_versions
```

with:

```text
entity
entity_id
version
data_snapshot
created_by
created_at
```

Initial implementation may rely on audit logs if full version history is not required.

---

# 16. Homepage CMS

The homepage should be CMS-driven.

Recommended sections:

```text
Hero
Company Introduction
Statistics
Featured Products
Product Categories
Reasons to Choose Us
Certificates/Trust
Latest News
Latest Blog/Video (optional)
CTA
```

---

# 17. Homepage Hero

Fields:

```text
Eyebrow
Title
Description
Primary CTA
Secondary CTA
Desktop Image
Mobile Image
Background/foreground mode
Overlay
Focal Position
```

All text must be translatable.

CTA should contain:

```text
Label
URL/route
Open behavior
```

Prefer internal route selection where possible.

---

# 18. Homepage Statistics

Statistics may contain:

```text
Label
Value
Prefix
Suffix
Icon
Sort Order
```

Examples:

```text
Years of Experience
Countries Served
Product Categories
Production Capacity
```

Only use factual CMS-managed values.

Do not fabricate statistics.

---

# 19. Homepage Featured Products

Admin can select products manually.

Fields:

```text
Product
Sort Order
Optional Display Override
```

Recommended default:

```text
6 products
```

The UI may allow configurable limits.

---

# 20. Homepage Product Categories

Category cards may include:

```text
Category
Title override
Description override
Image
Sort Order
```

Prefer category data from the catalog rather than duplicating it.

---

# 21. Homepage Reasons/Benefits

Reusable content block:

```text
Icon
Title
Description
Sort Order
```

Examples may include actual company capabilities such as:

```text
Quality Management
Manufacturing Capability
Global Supply
Professional Support
```

The CMS must not create unsupported claims automatically.

---

# 22. Homepage News Section

Admin should be able to configure:

```text
Number of items
Selected categories
Manual selection or latest content
```

Default:

```text
Latest published news
```

---

# 23. Homepage CTA

CTA section fields:

```text
Eyebrow
Title
Description
Primary CTA
Secondary CTA
Background image
```

CTA content must be translatable.

---

# 24. Corporate Pages

Corporate pages include:

```text
About
History
Certification
Honor
Culture
Contact
Privacy Policy
```

Each page should have an appropriate structured model.

---

# 25. Generic Page Entity

Generic pages may contain:

```text
id
template
status
slug
sort_order
published_at
created_at
updated_at
```

Translation:

```text
title
subtitle
content
seo_title
seo_description
```

---

# 26. Page Templates

Supported templates may include:

```text
Standard
Corporate
Landing
Contact
Legal
Listing
```

Do not create unlimited page templates unless business requirements justify them.

---

# 27. Standard Page

A standard page can support:

```text
Hero
Rich Content
Images
Callout
CTA
Related Content
```

---

# 28. About Page

About content may include:

```text
Hero
Company Introduction
Company Statistics
Capabilities
Quality
Global Presence
Certificates
CTA
```

Use reusable sections where practical.

---

# 29. History CMS

History should be modeled as timeline items.

Fields:

```text
Year/Date
Title
Description
Image
Sort Order
```

Example:

```text
2012
Company founded

2016
New manufacturing facility

2020
International expansion
```

Only use verified company history.

---

# 30. Certification CMS

Certification content may include:

```text
Certificate
Issuer
Certificate Number
Issue Date
Expiry Date
Description
Document/Image
Sort Order
```

Only expose fields that are actually verified.

---

# 31. Honor CMS

Honor/award entries:

```text
Title
Organization
Date
Description
Image
Document
Sort Order
```

Do not fabricate awards.

---

# 32. Culture CMS

Culture may include sections such as:

```text
Mission
Vision
Values
Quality Philosophy
Service Philosophy
```

Recommended structure:

```text
Culture Section
├── Title
├── Description
├── Image
└── Sort Order
```

---

# 33. News CMS

News entity:

```text
id
category_id
author_id
status
published_at
featured
sort_order
created_at
updated_at
```

Translation:

```text
title
slug
excerpt
content
seo_title
seo_description
```

---

# 34. News Categories

Examples:

```text
Company News
Industry Dynamics
```

Admin can add categories.

Each category supports:

```text
Name
Slug
Description
SEO
Sort Order
Status
```

---

# 35. News Cover Media

Every news article may have:

```text
cover_image
```

Recommended:

```text
16:9
```

The CMS should validate file type/size.

---

# 36. News Author

News may reference an admin user or an editorial author entity.

Avoid storing only an arbitrary display string if author identity must be managed.

If public author profiles are not needed, a simple controlled author field is acceptable.

---

# 37. Blog CMS

Blog entity:

```text
id
category_id
author_id
status
published_at
featured
sort_order
created_at
updated_at
```

Translation:

```text
title
slug
excerpt
content
seo_title
seo_description
```

---

# 38. Blog Categories

Example:

```text
Problem Guide
Product Introduction
```

Categories should be CMS-managed.

---

# 39. Blog Tags

Blog posts may support:

```text
Tags
```

Many-to-many relationship:

```text
blog_tags
```

Tags support content discovery but should not replace categories.

---

# 40. Blog Content Editor

Supported rich content:

```text
Heading
Paragraph
List
Quote
Image
Link
Table
Callout
Code only when relevant
```

The editor should not allow unsafe arbitrary scripts.

---

# 41. Video CMS

Video entity may include:

```text
title
description
thumbnail
provider
video_url
duration
status
published_at
sort_order
```

Supported providers should be configurable.

Prefer:

```text
YouTube
Vimeo
Self-hosted
```

Only use providers actually needed by the project.

---

# 42. Video Performance

Do not load third-party video players on initial page load when avoidable.

Use:

```text
Thumbnail
+
Play button
```

Then load the player after interaction.

---

# 43. Certificate CMS

Certificate entity:

```text
id
type
issuer
certificate_number
issue_date
expiry_date
status
document
image
sort_order
```

Translation may include:

```text
title
description
```

---

# 44. Media Library

The Media Library is a shared asset repository.

Supported assets:

```text
Images
PDFs
Documents
Video files where appropriate
```

Recommended organization:

```text
Media
├── Products
├── News
├── Blog
├── Certificates
├── Company
├── Homepage
└── General
```

Folders should be organizational, not a security boundary.

---

# 45. Media Entity

Recommended fields:

```text
id
filename
original_filename
mime_type
file_size
storage_key
width
height
alt_text
caption
folder_id
uploaded_by
created_at
updated_at
```

Optional:

```text
checksum
blurhash
duration
```

---

# 46. Media Processing

Uploaded images should be processed where appropriate.

Possible outputs:

```text
Original
Large
Medium
Thumbnail
WebP
AVIF
```

The original may be retained according to storage policy.

---

# 47. Media Validation

Validate:

```text
MIME type
Extension
File size
Image dimensions
Filename
```

Never trust only the file extension.

Server-side validation is required.

---

# 48. Media Alt Text

Alt text should be editable.

Rules:

- Describe the useful content
- Do not keyword stuff
- Do not repeat the filename
- Decorative images may use empty alt text where semantically correct

Example:

```text
Disposable surgical gown displayed on product background
```

---

# 49. Media Replacement

Replacing an asset should consider existing references.

If a media file is referenced by multiple content entities:

```text
Do not silently break references.
```

Use a stable media ID/reference model.

---

# 50. Media Deletion

Before deletion:

```text
Find references
↓
Show usage
↓
Confirm
↓
Delete only when safe
```

The admin should know where the media asset is used.

---

# 51. Navigation CMS

Navigation must be configurable.

Entities:

```text
Menu
Menu Item
```

Menu item may contain:

```text
Label
URL
Internal route
External URL
Parent
Sort Order
Target
Visibility
```

---

# 52. Navigation Rules

Navigation should support:

```text
Nested items
```

but avoid excessive depth.

Recommended:

```text
Maximum practical depth: 2–3 levels
```

---

# 53. Footer CMS

Footer should support configurable:

```text
Columns
Links
Contact information
Social links
Legal links
Newsletter area if implemented
```

The footer should not duplicate site settings manually.

---

# 54. Site Settings

Global settings should include:

```text
Company Name
Logo
Favicon
Email
Phone
WhatsApp
Address
Business Hours
Social Links
Default Language
Fallback Language
Timezone
Default SEO
Analytics settings
```

---

# 55. Settings Groups

Recommended settings groups:

```text
General
Branding
Contact
Social
Localization
SEO
Email
Security
Integrations
```

Sensitive credentials must not be stored as ordinary public content fields.

Use secure environment/configuration management for secrets.

---

# 56. SEO CMS

Content editors should be able to configure:

```text
SEO title
Meta description
Canonical URL
OG title
OG description
OG image
Robots
```

Default values should be generated when fields are empty.

---

# 57. SEO Preview

Admin should provide an approximate preview:

```text
Search result title
URL
Description
```

Also support social preview where practical.

The preview is guidance, not a guarantee of how search engines will render content.

---

# 58. Redirect CMS

Redirect entity:

```text
source_path
destination_path
status_code
language
active
created_at
```

Common status:

```text
301
302
```

Use 301 for permanent content moves.

---

# 59. Redirect Validation

Prevent:

```text
Redirect loops
Self redirects
Invalid destinations
Duplicate conflicting rules
```

Test redirects before activation.

---

# 60. Content Search in Admin

Admin search should cover:

```text
Products
News
Blog
Pages
Videos
Certificates
Media
```

Search results should show:

```text
Title
Type
Status
Updated
Action
```

---

# 61. Content Filters in Admin

Recommended filters:

```text
Content type
Status
Language
Author
Category
Published date
Updated date
```

---

# 62. Bulk Content Actions

Safe bulk actions may include:

```text
Publish
Unpublish
Archive
Assign category
Assign tag
Delete
```

For destructive actions:

- Require confirmation
- Display count
- Display affected content type
- Log the action

---

# 63. Content Preview

Preview must render the same public components used by the real page.

Avoid maintaining a separate preview-only design.

Preview should support:

```text
Desktop
Tablet
Mobile
Language
```

---

# 64. Draft Preview Security

Draft previews must not become public through:

- Search engines
- Public navigation
- Sitemap
- Unauthenticated predictable URLs

Use secure preview tokens or authenticated preview sessions.

---

# 65. Content Scheduling

If scheduling is enabled:

```text
Publish At
Unpublish At (optional)
Timezone
```

The admin should clearly display:

```text
Scheduled for:
2026-xx-xx xx:xx
```

All timestamps must use the site's configured timezone while being stored consistently.

---

# 66. Content Publishing Rules

Publishing should validate:

```text
Required title
Valid slug
Required language
Valid media references
Valid category
No duplicate slug
No invalid links
SEO warnings where applicable
```

Warnings may be shown without blocking if they are not critical.

---

# 67. Content Completeness

Each content type should define required fields.

Example for News:

```text
Title
Slug
Category
Content
Cover image
Status
```

Example for Product:

```text
Name
Slug
Category
Primary image
Description
```

The completeness system should be configurable.

---

# 68. Rich Text Security

Rich content must be sanitized.

Disallow unsafe:

```text
<script>
javascript:
unsafe iframe
unsafe event handlers
```

unless explicitly approved by a controlled embedding mechanism.

---

# 69. External Links

CMS editors should be able to mark:

```text
Internal
External
```

External links may support:

```text
Open in new tab
```

but this should not be automatically applied to every link.

---

# 70. Content Relationships

CMS should support relationships such as:

```text
Product ↔ Category
Product ↔ Tag
Product ↔ Certificate
Product ↔ Video
Product ↔ Related Product

News ↔ Category
News ↔ Tag

Blog ↔ Category
Blog ↔ Tag

Page ↔ Related Content
```

Relationships should use IDs/references, not duplicated content.

---

# 71. Homepage Content Relationships

Homepage should reference:

```text
Products
Categories
News
Blog
Videos
Certificates
```

Do not copy their titles/descriptions into separate homepage records unless an explicit display override is needed.

---

# 72. Content Caching

Public content should be cacheable.

When content changes:

```text
Update database
↓
Invalidate affected cache
↓
Revalidate public route
```

Affected routes may include:

```text
Homepage
Listing
Detail page
Related content
Sitemap
RSS/feed if implemented
```

---

# 73. Content and Sitemap

Only eligible content should appear in XML sitemap.

General rule:

```text
Published
+
Indexable
+
Canonical
=
Sitemap candidate
```

Draft/archived/noindex content should not be included.

---

# 74. Content and Search

Public search should index only:

```text
Published
```

and appropriate:

```text
Indexable
```

content.

Drafts must never leak into public search.

---

# 75. Content Audit Log

Important CMS actions should create audit records.

Examples:

```text
Create
Update
Publish
Unpublish
Archive
Delete
Restore
Schedule
Translation update
Media replacement
SEO update
Navigation update
```

Audit record:

```text
Actor
Action
Entity Type
Entity ID
Timestamp
Metadata
```

---

# 76. CMS Permissions

Suggested permissions:

```text
content.view
content.create
content.edit
content.publish
content.archive
content.delete

news.manage
blog.manage
video.manage
certificate.manage
page.manage
history.manage
culture.manage
honor.manage

media.view
media.upload
media.edit
media.delete

navigation.manage
settings.manage
seo.manage
redirects.manage
translations.manage
```

The exact permission matrix is defined in the admin specification.

---

# 77. Role Examples

Possible roles:

```text
Super Admin
Content Manager
Sales Manager
Media Manager
SEO Manager
Translator
```

Typical responsibilities:

### Content Manager

Can:

- Create/edit content
- Manage news/blog/pages
- Manage selected product content

### Media Manager

Can:

- Upload media
- Edit metadata
- Organize assets

### SEO Manager

Can:

- Manage metadata
- Redirects
- Search indexing controls
- Sitemap configuration

### Translator

Can:

- Edit translation content
- Not necessarily publish production content

---

# 78. Translation Workflow

Recommended:

```text
Base content created
↓
Translation requested
↓
Translator edits
↓
Translation reviewed
↓
Translation published
```

Translation status may be:

```text
Missing
Draft
Translated
Reviewed
Published
```

---

# 79. Translation Consistency

The system should display translation coverage.

Example:

```text
English   Published
Spanish   Published
Arabic    Draft
Chinese   Missing
```

This allows admins to identify incomplete localized content.

---

# 80. Language-Specific Slugs

Localized URLs may use localized slugs.

Example:

```text
/en/products/surgical-gown
/es/products/bata-quirurgica
```

If localized slugs are not desired, stable shared slugs may be used.

The final routing strategy must remain consistent across the application.

---

# 81. Content Date Handling

Store timestamps in a consistent server/database format.

Display dates according to:

```text
Locale
Timezone
Content type
```

News/blog dates should not change unexpectedly when viewed from another timezone.

For date-only editorial fields, consider date-only storage rather than timestamps.

---

# 82. Content Authoring UX

Editors should have:

```text
Clear labels
Help text
Validation
Autosave where appropriate
Draft saving
Preview
Publish action
```

Avoid excessive confirmation dialogs for ordinary saves.

---

# 83. Autosave

Autosave may be implemented for long editing forms.

If used:

- Clearly show save status
- Never silently publish
- Handle network failures
- Prevent conflicting edits where possible

Example:

```text
Saved 10 seconds ago
Saving...
Unsaved changes
```

---

# 84. Concurrent Editing

If multiple admins can edit the same content:

- Detect stale versions
- Warn before overwriting another user's changes
- Preserve audit history
- Prefer conflict resolution over silent overwrite

---

# 85. Content Duplication

Duplicate action should create a draft.

Copy:

```text
Content fields
Categories
Tags
Media references
SEO fields
```

Do not copy:

```text
ID
Slug without uniqueness check
Publication state
Audit history
```

---

# 86. Content Deletion

Deletion should be conservative.

Before deleting content:

```text
Check references
Check navigation
Check related content
Check SEO redirects
Check media
Check inquiries if applicable
```

Prefer archive where historical value exists.

---

# 87. CMS Dashboard

Dashboard may show:

```text
Draft content
Scheduled content
Recently published
Recently edited
Missing translations
Media usage issues
SEO warnings
New inquiries
```

The dashboard should be actionable rather than decorative.

---

# 88. CMS Notifications

Useful notifications:

```text
Content published
Content saved
Translation completed
Scheduled publication completed
Media uploaded
Redirect created
```

Error notifications should be actionable.

---

# 89. CMS Error Handling

Never expose:

```text
SQL errors
Stack traces
Secret values
Internal storage keys
Authentication tokens
```

Use user-friendly messages:

```text
Unable to save this content.
Please try again.
```

Log technical details server-side.

---

# 90. CMS API/Data Access Rules

Public routes may read published content through server-side services.

Admin routes require:

```text
Authentication
+
Authorization
```

Do not expose unrestricted CRUD endpoints.

All mutation operations must validate:

```text
Input
Permissions
Relationships
Status transitions
```

---

# 91. Content API Concept

Public read operations:

```text
getPage()
getNews()
getNewsList()
getBlog()
getBlogList()
getVideo()
getVideoList()
getCertificate()
getCertificateList()
getHistory()
getCulture()
getHonor()
```

Admin operations:

```text
create
update
publish
unpublish
archive
delete
duplicate
schedule
```

The actual API implementation is specified in:

`08-API-BACKEND-SPEC.md`

---

# 92. CMS Database Relationship Summary

Conceptual structure:

```text
languages
   │
   ├── page_translations
   ├── product_translations
   ├── news_translations
   ├── blog_translations
   ├── video_translations
   ├── certificate_translations
   ├── honor_translations
   ├── history_translations
   └── culture_translations

pages
news
blogs
videos
certificates
honors
history_items
culture_sections

        │
        ▼
      media

        │
        ▼
       SEO

        │
        ▼
    navigation

        │
        ▼
  site_settings
```

---

# 93. CMS Content Integrity

The system should prevent:

- Duplicate language records
- Duplicate slugs
- Broken references
- Invalid status transitions
- Orphaned required relationships
- Missing required content
- Public exposure of drafts
- Public exposure of private media
- Broken navigation targets

---

# 94. CMS Backup Considerations

Backups must cover:

```text
Database
Media/storage
Configuration metadata
```

A database-only backup is insufficient if media assets are stored separately.

Restore testing should be part of deployment/operations.

---

# 95. CMS Performance

Admin performance should remain usable with:

```text
Hundreds of products
Thousands of media assets
Large news/blog archives
Multiple languages
```

Use:

- Pagination
- Server-side filtering
- Search indexes
- Lazy media loading
- Query optimization
- Appropriate caching

Do not load entire content tables into the browser.

---

# 96. CMS Accessibility

Admin UI must support:

- Keyboard navigation
- Visible focus
- Accessible labels
- Screen readers
- Table accessibility
- Dialog focus management
- Error announcements
- Color-independent status indicators

---

# 97. CMS Mobile Behavior

Admin is desktop-first but responsive.

Mobile should support:

```text
Dashboard
Content review
Inquiry review
Status changes
Basic edits
Media inspection
```

Complex editors should remain optimized for larger screens.

---

# 98. Content Security

CMS security requirements:

- Server-side permission checks
- CSRF protection where applicable
- Secure sessions
- Input validation
- Rich-text sanitization
- File validation
- Secure uploads
- Audit logging
- Rate limiting where appropriate
- No secret values in public content

---

# 99. CMS Content Quality Rules

Editors should be warned about:

```text
Missing title
Missing slug
Missing primary image
Very short description
Missing SEO description
Broken internal links
Missing translations
Invalid media
Duplicate slug
```

Warnings should be informative, not unnecessarily blocking.

---

# 100. Publishing Checklist

Before publishing content:

- [ ] Title verified
- [ ] Slug verified
- [ ] Content reviewed
- [ ] Category selected
- [ ] Media verified
- [ ] Alt text reviewed
- [ ] SEO metadata reviewed
- [ ] Translation status reviewed
- [ ] Links tested
- [ ] Preview checked
- [ ] Mobile layout checked
- [ ] Publication date checked
- [ ] Unsupported claims removed
- [ ] Permissions confirmed

---

# 101. CMS Acceptance Criteria

The CMS is considered complete when:

1. Authorized admins can create and edit all required content types.
2. Content can be saved as draft.
3. Content can be published and archived.
4. Content can support multiple languages.
5. Translation status is visible.
6. Media can be uploaded and reused.
7. Media metadata can be edited.
8. Media usage can be inspected before deletion.
9. Navigation is CMS-managed.
10. Site-wide business settings are CMS-managed.
11. SEO metadata is editable.
12. Redirects are manageable.
13. Public search excludes drafts.
14. Sitemap excludes non-indexable content.
15. Preview renders the actual public templates.
16. Draft preview is protected.
17. Content relationships use references rather than duplicated records.
18. Rich content is sanitized.
19. Admin permissions are enforced server-side.
20. Important actions are audited.
21. The CMS can handle multilingual content without duplicating entire content entities.
22. The system remains usable as content volume grows.
23. No mandatory paid CMS or SaaS service is required.
24. No AI content/chat feature is required for CMS operation.

---

# 102. Non-Goals

The initial CMS does not include:

- Public customer accounts
- Customer profile management
- Ecommerce checkout
- Online payments
- Order management
- AI content writer
- AI chatbot
- Mandatory paid translation API
- Mandatory paid media processing service
- Mandatory proprietary page builder
- Unrestricted arbitrary JavaScript injection
- Fabricated medical/certification content

---

# 103. Recommended CMS Build Order

Implementation order:

```text
1. Site Settings
2. Languages
3. Media Library
4. Categories
5. Products
6. Pages
7. News
8. Blog
9. Videos
10. Certificates
11. Honors
12. History
13. Culture
14. Navigation
15. SEO
16. Redirects
17. Publishing workflow
18. Audit logs
19. Translation workflow
20. CMS dashboard
```

This order minimizes dependencies.

---

# 104. Final CMS Architecture

```text
                    ┌───────────────────┐
                    │    Admin Panel    │
                    └─────────┬─────────┘
                              │
                ┌─────────────┼──────────────┐
                ▼             ▼              ▼
             Content        Media         Settings
                │             │              │
        ┌───────┼───────┐     │       ┌──────┴──────┐
        ▼       ▼       ▼     ▼       ▼             ▼
     Pages    News    Blog   Assets  Branding    Contact
        │       │       │     │
        └───────┼───────┼─────┘
                ▼
          Translations
                │
                ▼
               SEO
                │
                ▼
           Publishing
                │
                ▼
        Public Website
```

---

# 105. Final Directive for AI Coding Agents

When implementing the CMS:

1. Read `00-MASTER-PLAN.md`.
2. Read `01-PROJECT-ARCHITECTURE.md`.
3. Read `02-PAGE-BY-PAGE-SITEMAP.md`.
4. Read `03-UI-UX-DESIGN-SPEC.md`.
5. Treat this document as the CMS source of truth.
6. Keep content structured and database-driven.
7. Separate content identity from translations.
8. Keep drafts private.
9. Enforce publishing rules server-side.
10. Sanitize rich content.
11. Validate uploaded files.
12. Keep media reusable.
13. Keep business settings centralized.
14. Do not hardcode public business information.
15. Do not add public authentication.
16. Do not add AI features.
17. Do not introduce mandatory paid CMS services.
18. Preserve auditability.
19. Make preview use the actual public UI.
20. Preserve SEO and multilingual behavior.
21. Keep relationships normalized and reusable.
22. Avoid building an uncontrolled generic page builder.
23. Keep the implementation extensible without unnecessary abstraction.
24. Test content creation through public rendering end-to-end.

---

# 106. Completion Definition

The CMS implementation is complete when an authorized administrator can perform this full workflow:

```text
Admin Login
    ↓
Open CMS
    ↓
Upload Media
    ↓
Create/Edit Content
    ↓
Assign Category
    ↓
Add Translation
    ↓
Configure SEO
    ↓
Preview
    ↓
Save Draft
    ↓
Review
    ↓
Publish
    ↓
Public Page Updates
    ↓
Search/Sitemap Updates
    ↓
Audit Log Created
```

The CMS must make the public website manageable without requiring source-code edits for normal business content changes.
