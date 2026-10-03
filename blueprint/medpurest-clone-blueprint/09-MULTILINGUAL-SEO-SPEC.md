# MedPurest Clone Blueprint — Multilingual & SEO Specification

**File:** `09-MULTILINGUAL-SEO-SPEC.md`  
**Project:** MedPurest-style B2B Medical Product Catalogue & Lead Generation Platform  
**Primary Goal:** Multilingual publishing + strong technical/content SEO  
**Frontend:** Next.js + React + TypeScript  
**Database:** PostgreSQL  
**Status:** Implementation Specification

---

# 1. Purpose

This document defines the complete multilingual and SEO architecture.

The system must support:

- Multiple public languages
- Language-aware URLs
- Translation management
- Translation fallback
- Language switching
- Per-language metadata
- Canonical URLs
- `hreflang`
- Open Graph metadata
- Twitter/X metadata
- XML sitemap
- `robots.txt`
- Structured data
- Search-engine-friendly URLs
- Redirect management
- Duplicate-content prevention
- Indexability controls
- Multilingual content workflows

The implementation must remain compatible with the content, product, database, API and admin specifications defined in the previous blueprint files.

---

# 2. SEO Principles

1. SEO must be built into the architecture, not added at the end.
2. Every indexable page must have one canonical URL.
3. Published content only should be indexable.
4. Draft and private content must never accidentally enter the sitemap.
5. Every supported language must have explicit language metadata.
6. Translations should be independently editable.
7. Missing translations must have deterministic fallback behavior.
8. URLs must be stable and readable.
9. Metadata must be editable from the CMS where appropriate.
10. Structured data must represent actual page content.
11. Never fabricate medical claims, certifications, product specifications or company facts for SEO.
12. Search-engine directives must never be treated as application security controls.

---

# 3. Supported Languages

The platform should support a configurable language registry.

Initial architecture should allow languages such as:

```text
en
es
ar
pt
zh
```

The exact enabled languages must come from the database/configuration rather than hard-coded UI assumptions.

Recommended language fields:

```text
id
code
name
native_name
locale
direction
enabled
is_default
sort_order
```

---

# 4. Language Code Rules

Use valid language/locale identifiers.

Examples:

```text
en
es
ar
pt
zh-CN
```

The application must normalize locale handling consistently.

Do not allow arbitrary user-created locale strings to become public routes without validation.

---

# 5. Default Language

One language must be marked as:

```text
is_default = true
```

Only one default language should be active at a time.

Recommended default:

```text
en
```

unless project configuration explicitly changes it.

---

# 6. URL Strategy

Recommended public architecture:

```text
/en/
es/
ar/
pt/
zh/
```

Example:

```text
/en/products/surgical-gown
/es/products/bata-quirurgica
/ar/products/...
/pt/products/...
/zh/products/...
```

The exact routing strategy may use a default-language prefix or a prefixless default language, but the implementation must choose one strategy and apply it consistently.

Recommended for the blueprint:

```text
/{locale}/...
```

for all localized public pages.

---

# 7. Localized URL Examples

Homepage:

```text
/en
/es
/ar
/pt
/zh
```

Products:

```text
/en/products
/es/products
/ar/products
```

Product detail:

```text
/en/products/surgical-gown
/es/products/bata-quirurgica
```

News:

```text
/en/news
/es/news
```

Blog:

```text
/en/blog
/ar/blog
```

---

# 8. Locale Middleware

Next.js middleware may be used to:

```text
Detect locale
Normalize locale
Redirect invalid locale
Handle default locale
Preserve requested path
```

Do not automatically redirect every visitor based on browser language without allowing explicit user choice.

Recommended behavior:

```text
First visit:
  optionally detect preferred language

Explicit URL:
  URL wins

User-selected language:
  persist preference

Search engine crawler:
  serve requested locale deterministically
```

---

# 9. Language Detection

Browser language can be used as a suggestion.

Do not create unstable redirects based only on:

```text
Accept-Language
IP address
geolocation
```

This can cause indexing and caching problems.

Prefer:

```text
explicit locale URL
cookie/local preference
optional first-visit suggestion
```

---

# 10. Language Switcher

Global language switcher must:

1. Show enabled languages.
2. Show native language names.
3. Preserve the current content context.
4. Link to the equivalent translated page when available.
5. Avoid generating broken URLs.
6. Handle missing translations gracefully.

Example:

```text
English → /en/products/surgical-gown
Español → /es/products/bata-quirurgica
العربية → /ar/products/...
```

---

# 11. Translation Entity Architecture

Translatable entities should separate:

```text
Core entity
+
Translation records
```

Example:

```text
products
product_translations
```

Similarly:

```text
pages
page_translations

news
news_translations

blogs
blog_translations
```

This architecture must be consistent across the database.

---

# 12. Translation Fields

Typical translation fields:

```text
title
slug
short_description
description
features
applications
seo_title
seo_description
seo_keywords
og_title
og_description
alt_text
```

Not every entity needs every field.

---

# 13. Non-Translated Fields

Fields that are normally shared across languages should remain on the core entity.

Examples:

```text
product_code
status
sort_order
created_at
updated_at
category_id
technical identifiers
```

Do not duplicate shared fields unnecessarily in every translation row.

---

# 14. Translation Uniqueness

For each translatable entity:

```text
UNIQUE(entity_id, language_id)
```

A single entity must have at most one translation per language.

---

# 15. Localized Slugs

Slugs should normally belong to translation records.

Example:

```text
English:
surgical-gown

Spanish:
bata-quirurgica
```

This allows meaningful localized URLs.

Slug requirements:

```text
lowercase
URL-safe
stable
unique within locale and resource type
```

---

# 16. Slug Validation

Reject:

```text
spaces
unsafe characters
duplicate slugs
reserved system paths
```

Normalize:

```text
Unicode where appropriate
case
punctuation
whitespace
```

Do not silently replace an existing slug without creating a redirect when the old URL was public.

---

# 17. Reserved Routes

The slug system must protect reserved routes such as:

```text
admin
api
login
search
robots.txt
sitemap.xml
favicon.ico
```

Resource slugs must not collide with system routes.

---

# 18. Translation Fallback

Recommended fallback order:

```text
Requested language
        ↓
Default language
        ↓
No content
```

However, SEO-indexable pages must not silently present another language while claiming to be the requested locale.

For indexable public pages:

```text
Missing translation
→ do not publish that locale page
```

or use an explicit non-indexable fallback page.

---

# 19. Translation Completeness

Each content record should expose translation status:

```text
complete
partial
missing
```

Example:

```text
Product:
English  ✓
Spanish  ✓
Arabic   ✓
Portuguese ✗
Chinese  ✓
```

Admin should clearly show this.

---

# 20. Translation Publishing Rule

A translation should become public only when:

```text
translation exists
AND
required fields are complete
AND
parent content is publishable
AND
translation is enabled/published
```

Do not expose unfinished translation drafts to search engines.

---

# 21. Translation Workflow

Recommended:

```text
Create base content
        ↓
Create source-language translation
        ↓
Save draft
        ↓
Translate
        ↓
Review
        ↓
Publish translation
        ↓
Generate localized URL
        ↓
Update sitemap/hreflang
```

---

# 22. Translation Roles

The RBAC system may include:

```text
Translator
Content Manager
SEO Manager
Super Admin
```

Possible permissions:

```text
translations.view
translations.edit
translations.publish
translations.delete
```

A translator should not automatically receive full system administration privileges.

---

# 23. Translation Copying

Admin may provide:

```text
Copy from English
Copy from another language
```

This should create editable content, not a permanent synchronization link.

---

# 24. Translation Independence

After copying:

```text
English changes
```

must not silently overwrite:

```text
Spanish translation
```

Translations are independent records.

---

# 25. Machine Translation

The architecture may allow future translation assistance.

However:

```text
No paid translation service is mandatory.
```

No automatic translation should be published without appropriate review.

The current project does not require an AI translation feature.

---

# 26. SEO Metadata Architecture

Every indexable page should be able to resolve:

```text
title
description
canonical
robots
og:title
og:description
og:image
twitter:title
twitter:description
twitter:image
```

Additional fields may include:

```text
keywords
author
publisher
```

but they should only be used when meaningful.

---

# 27. SEO Metadata Priority

Recommended priority:

```text
Explicit page SEO value
        ↓
Content-derived value
        ↓
Global default
```

Example:

```text
Product SEO title
→ Product translated name
→ Global site title
```

---

# 28. SEO Title Rules

Recommended:

```text
unique
descriptive
language-specific
human-readable
```

Avoid:

```text
keyword stuffing
repeated brand names
automatically generated nonsense
```

The exact character length should be treated as a guideline rather than a hard rule because search-engine display varies.

---

# 29. Meta Description Rules

Descriptions should:

```text
describe actual page content
be unique where practical
use the page language
support user intent
avoid fabricated claims
```

Do not generate descriptions solely by concatenating random database fields.

---

# 30. Canonical URL

Every indexable page must have one canonical URL.

Example:

```text
https://example.com/en/products/surgical-gown
```

Canonical URLs must:

```text
use HTTPS
use the preferred hostname
use normalized locale
use the preferred slug
avoid unnecessary query parameters
```

---

# 31. Canonicalization

Normalize:

```text
trailing slash strategy
uppercase/lowercase
duplicate query parameters
legacy slugs
alternate URL forms
```

Choose one canonical URL format.

---

# 32. Canonical vs Redirect

Use:

```text
301/308 redirect
```

when an old URL should permanently move to a new URL.

Use:

```text
canonical
```

when multiple valid URL representations may exist but one is preferred.

Do not use canonical tags as a replacement for necessary redirects.

---

# 33. Hreflang

Localized equivalent pages should reference one another.

Example concept:

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/products/surgical-gown" />
<link rel="alternate" hreflang="es" href="https://example.com/es/products/bata-quirurgica" />
<link rel="alternate" hreflang="ar" href="https://example.com/ar/products/..." />
```

Each localized page should include the appropriate alternate set.

---

# 34. Hreflang Self-Reference

Each localized page should normally include:

```text
self
+
other available translations
```

Example:

```text
/en page
→ en
→ es
→ ar
→ pt
→ zh
```

provided those translations actually exist and are indexable.

---

# 35. Hreflang `x-default`

Where appropriate, define:

```text
x-default
```

as the neutral/default landing page.

It must point to a real page.

Do not use `x-default` to hide missing translations.

---

# 36. Hreflang Integrity

Do not emit alternate URLs for:

```text
draft translations
missing pages
noindex pages
404 pages
```

The alternate map must be generated from actual published translation records.

---

# 37. Open Graph

Each public page should support:

```text
og:title
og:description
og:url
og:type
og:image
og:locale
```

For content pages:

```text
og:type = article
```

may be appropriate.

For products/pages:

```text
website
```

may be used unless a more specific supported type is appropriate.

---

# 38. Social Image Strategy

Allow CMS-managed:

```text
default OG image
page-specific OG image
product OG image
article OG image
```

Images should:

```text
exist
be publicly accessible
have suitable dimensions
be optimized
```

Do not generate fake product imagery for SEO.

---

# 39. Twitter/X Metadata

Where useful:

```text
twitter:card
twitter:title
twitter:description
twitter:image
```

Use the actual current platform-supported metadata approach.

Do not make SEO functionality depend on social sharing.

---

# 40. Structured Data Strategy

Use Schema.org structured data where the page genuinely qualifies.

Potential types:

```text
Organization
WebSite
BreadcrumbList
Product
Article
VideoObject
ImageObject
```

Use only fields supported by actual content.

---

# 41. Organization Schema

Homepage/company pages may expose:

```text
Organization
```

with verified information such as:

```text
name
url
logo
email
telephone
address
sameAs
```

All values must come from editable site settings or verified project data.

---

# 42. Website Schema

Homepage may include:

```text
WebSite
```

with:

```text
name
url
potentialAction
```

A search action should only be declared if the site's search behavior genuinely supports it.

---

# 43. Breadcrumb Schema

Applicable pages should generate:

```text
BreadcrumbList
```

matching the visible breadcrumb hierarchy.

Example:

```text
Home
→ Products
→ Protective Equipment
→ Surgical Gown
```

Structured data must not contain breadcrumbs that are not visible or valid.

---

# 44. Product Structured Data

Product pages may use:

```text
Product
```

only for actual product information.

Possible fields:

```text
name
description
image
sku
brand
category
```

Do not fabricate:

```text
price
availability
review
rating
aggregateRating
```

when the site does not actually provide those values.

This is a B2B catalogue, not a mandatory ecommerce storefront.

---

# 45. Article Structured Data

News/blog detail pages may use:

```text
Article
```

or an appropriate subtype.

Possible fields:

```text
headline
description
image
datePublished
dateModified
author
publisher
```

All must match actual CMS records.

---

# 46. Video Structured Data

Video pages may use:

```text
VideoObject
```

when the required data is available.

Potential fields:

```text
name
description
thumbnailUrl
uploadDate
duration
contentUrl
embedUrl
```

Do not fabricate duration or upload dates.

---

# 47. Structured Data Validation

Structured data should be tested for:

```text
valid JSON-LD
correct URLs
correct language
actual page correspondence
missing required fields
```

Do not inject malformed JSON-LD.

---

# 48. Robots Meta

Indexability should be controllable per page where required.

Possible values:

```text
index,follow
noindex,follow
noindex,nofollow
```

Default public published content:

```text
index,follow
```

unless there is a specific reason otherwise.

---

# 49. Noindex Candidates

Potential `noindex` pages:

```text
Admin
Login
Internal search result pages where appropriate
Preview pages
Utility pages
Filtered duplicates where appropriate
```

The exact policy should be documented per route.

---

# 50. Search Result SEO

Do not automatically index unlimited internal search combinations.

For example:

```text
/search?q=gown
```

may remain non-indexable.

The search page can still be useful to users without becoming an indexable SEO landing page.

---

# 51. Faceted Navigation

Product filters can generate many URL combinations.

Do not allow unlimited filter combinations to create crawlable duplicate pages.

Possible strategy:

```text
Canonical to base category
+
noindex for non-SEO filters
```

SEO-friendly filtered landing pages should be explicitly curated rather than generated without control.

---

# 52. Pagination SEO

Paginated listing pages should have stable URLs.

Example:

```text
/en/products?page=2
```

or a path-based equivalent.

Do not create canonical loops.

Search engines should be able to discover valid paginated content when it provides unique useful content.

---

# 53. Infinite Scroll

If the UI uses infinite scroll:

```text
Provide crawlable paginated URLs
```

The server must still expose accessible content without requiring JavaScript-only interaction.

---

# 54. Sitemap Architecture

Generate:

```text
/sitemap.xml
```

For larger sites, use sitemap indexes.

Possible:

```text
/sitemap.xml
/sitemap-products.xml
/sitemap-news.xml
/sitemap-blog.xml
/sitemap-pages.xml
```

The implementation may choose one sitemap until scale requires splitting.

---

# 55. Sitemap Inclusion Rules

Include only URLs that are:

```text
public
published
canonical
indexable
HTTP 200
```

Exclude:

```text
404
redirect URLs
draft
archived
noindex
private
duplicate
```

---

# 56. Multilingual Sitemap

Every indexable localized URL should be represented.

Example:

```text
/en/products/surgical-gown
/es/products/bata-quirurgica
/ar/products/...
```

Do not include a locale URL if the corresponding translation is unavailable and the route would not serve a true localized page.

---

# 57. Sitemap Last Modified

Where available, use actual:

```text
updatedAt
```

or content modification timestamps.

Do not set every URL to the current time on every request.

That creates noisy signals and unnecessary regeneration.

---

# 58. Sitemap Caching

Sitemap generation can be cached/revalidated.

Invalidate or regenerate when:

```text
published content changes
slug changes
translation publishes
content becomes noindex
redirect changes
```

---

# 59. Robots.txt

Public:

```text
/robots.txt
```

should:

```text
allow public pages
disallow admin paths
disallow private utility paths
reference sitemap
```

Example concept:

```text
User-agent: *
Disallow: /admin/
Sitemap: https://example.com/sitemap.xml
```

Exact rules depend on final routes.

---

# 60. Robots Security Warning

`robots.txt` is not access control.

The admin must still require authentication.

Never place secrets in URLs or assume a disallowed URL is private.

---

# 61. Internal Linking

SEO architecture must intentionally connect:

```text
Homepage
→ Categories
→ Products
→ Related Products
→ News
→ Blog
→ Corporate pages
```

Product pages should link to relevant categories and related products.

Content pages should link to relevant products where genuinely useful.

---

# 62. Breadcrumb Architecture

Breadcrumbs should be generated from actual hierarchy.

Example:

```text
Home
Products
Protective Equipment
Surgical Gown
```

For multilingual pages, breadcrumb labels must use the selected language.

---

# 63. Related Content

The backend should support relationships such as:

```text
Related Products
Related News
Related Blog Posts
Related Categories
```

Avoid automatically creating irrelevant links just to increase internal linking.

---

# 64. Image SEO

Every meaningful image should have:

```text
alt text
```

Alt text must describe the image meaningfully.

Do not stuff keywords.

Decorative images may use:

```text
empty alt
```

when appropriate.

---

# 65. Image URL Strategy

Image URLs should be:

```text
stable
cacheable
HTTPS
public when used by public pages
```

Avoid exposing private storage paths or credentials.

---

# 66. Image Metadata by Language

Where the image context differs by language, allow:

```text
localized alt text
localized caption
```

Media records may store shared technical metadata while content relationships store localized presentation text.

---

# 67. Page Performance and SEO

SEO implementation must preserve:

```text
fast initial HTML
optimized images
minimal client JavaScript
server rendering where useful
cacheable public pages
```

Do not add heavy client-side libraries merely for SEO metadata.

---

# 68. Core Web Vitals

The implementation should monitor:

```text
LCP
INP
CLS
```

Optimize:

```text
hero image
font loading
layout dimensions
client JavaScript
third-party scripts
```

---

# 69. JavaScript and Crawlability

Important content must exist in server-rendered HTML where practical.

Do not require a crawler to:

```text
click buttons
submit forms
execute complex client state
```

to discover core products or articles.

---

# 70. Semantic HTML

Use semantic elements:

```text
header
nav
main
section
article
footer
h1-h6
```

Maintain a logical heading hierarchy.

---

# 71. One Primary H1

Each indexable page should normally have one clear primary heading.

The H1 should describe the actual page.

Do not hide dozens of keyword variations in headings.

---

# 72. SEO-Friendly Content Structure

Product page:

```text
H1 Product Name
Introduction
Features
Applications
Specifications
Documents
Related Products
Inquiry CTA
```

News/blog:

```text
H1 Title
Metadata
Article body
Related content
CTA
```

---

# 73. Medical Content Accuracy

Because this is a medical-product catalogue:

```text
SEO copy must not invent clinical claims.
```

Do not automatically generate statements such as:

```text
clinically proven
100% safe
FDA approved
hospital certified
best medical product
```

unless the underlying claim is actually documented and approved for publication.

---

# 74. Certification SEO

Certificate pages should use only actual certificates stored in the CMS.

Structured data and metadata must not imply certifications that are not documented.

---

# 75. Company Information SEO

Organization data must come from editable verified settings.

Admin should be able to manage:

```text
company name
logo
phone
email
address
social links
```

but changes should be audited.

---

# 76. Social Profile Schema

If `sameAs` is used, include only real official social URLs.

Do not create placeholder links.

---

# 77. Contact Page SEO

Contact page should have:

```text
unique title
unique description
canonical
localized metadata
Organization/LocalBusiness-related data only if genuinely applicable
```

Map embeds should not block the core contact information from rendering.

---

# 78. Privacy Page SEO

Privacy policy should be accessible.

Indexability may be configured according to the site's legal/content strategy.

Do not block access merely because it is a legal page.

---

# 79. Error Pages

Create localized where appropriate:

```text
404
500
```

Error pages should not enter the sitemap.

They should not accidentally be indexed as normal content.

---

# 80. Redirect Management

Admin must be able to create:

```text
source
destination
statusCode
language
enabled
```

Recommended permanent redirect codes:

```text
301
308
```

Temporary redirects:

```text
302
307
```

Use the appropriate status based on actual redirect intent.

---

# 81. Redirect Validation

Prevent:

```text
redirect loops
self redirects
obvious chains
invalid destinations
```

The admin UI should warn about potential conflicts.

---

# 82. Slug Change Workflow

When a published slug changes:

```text
old URL
   ↓
create redirect
   ↓
new canonical URL
   ↓
update sitemap
   ↓
update hreflang
   ↓
invalidate cache
```

This should be automated where safe.

---

# 83. Redirect Chains

Prefer:

```text
old → final
```

rather than:

```text
old → intermediate → final
```

When editing redirects, the admin system should identify obvious chains.

---

# 84. Duplicate Content Prevention

Avoid duplicate indexable pages caused by:

```text
query parameters
trailing slash variants
duplicate slugs
locale duplication
preview routes
filter combinations
```

Use:

```text
canonicalization
redirects
noindex
route constraints
```

as appropriate.

---

# 85. Query Parameter Policy

Tracking parameters such as:

```text
utm_source
utm_medium
utm_campaign
```

should not create separate canonical pages.

Canonical should normally resolve to the clean content URL.

---

# 86. Language + Query Parameters

Example:

```text
/en/products/surgical-gown?utm_source=google
```

Canonical:

```text
/en/products/surgical-gown
```

Tracking parameters should not become part of the canonical content identity.

---

# 87. SEO Data Model

Recommended logical structure:

```text
seo_metadata
├── entity_type
├── entity_id
├── language_id
├── title
├── description
├── canonical_url
├── robots
├── og_title
├── og_description
├── og_image_id
└── ...
```

The exact schema must follow `07-DATABASE-SCHEMA.md`.

---

# 88. SEO Service

Recommended:

```text
seoService
```

Responsibilities:

```text
getMetadata()
buildCanonicalUrl()
buildAlternates()
buildRobots()
buildOpenGraph()
buildStructuredData()
generateSitemapEntries()
```

---

# 89. Metadata Resolver

Every public route should resolve metadata through one predictable mechanism.

Conceptually:

```text
resolvePageMetadata({
  locale,
  resourceType,
  resourceId
})
```

This prevents inconsistent title/canonical/hreflang logic across pages.

---

# 90. Alternate URL Resolver

Recommended:

```text
getLocalizedAlternates(resource)
```

Return only valid published translations.

Example:

```json
{
  "en": "https://example.com/en/products/surgical-gown",
  "es": "https://example.com/es/products/bata-quirurgica",
  "ar": "https://example.com/ar/products/..."
}
```

---

# 91. SEO Preview in Admin

Admin editors should see:

```text
SEO title
Meta description
Canonical
Preview URL
Social image
Indexability
Translation status
```

A simple search/snippet preview may be provided, but it must not claim to reproduce exact search-engine rendering.

---

# 92. SEO Validation

Before publishing, validate:

```text
Title exists
Description exists or valid fallback
Slug valid
Canonical resolvable
Locale valid
Published content exists
No forbidden indexability state
```

For products, also validate required product SEO/content fields.

---

# 93. SEO Publishing Checklist

Before publishing localized content:

```text
✓ Translation complete
✓ Slug valid
✓ Title valid
✓ Description valid
✓ Canonical correct
✓ Hreflang relationships valid
✓ Images have appropriate alt text
✓ Structured data valid where applicable
✓ Internal links valid
✓ No draft references
```

---

# 94. Search Engine Verification

Production deployment should allow the team to verify:

```text
robots.txt
sitemap.xml
canonical tags
hreflang
JSON-LD
HTTP status codes
redirects
indexability
```

Recommended tools include search-engine webmaster consoles, but the core platform must not depend on them to function.

---

# 95. Analytics and SEO

If analytics is added:

```text
Do not block page rendering unnecessarily.
```

Analytics should not determine whether a page is indexable.

Any analytics provider must be optional.

---

# 96. Privacy and Tracking

Tracking parameters may be stored for inquiry attribution:

```text
utm_source
utm_medium
utm_campaign
```

Do not expose private lead attribution data publicly.

---

# 97. Internationalization and RTL

Arabic support must include:

```text
dir="rtl"
```

where appropriate.

The design system must support both:

```text
LTR
RTL
```

without duplicating the application.

---

# 98. RTL Layout Rules

Avoid hard-coded:

```text
left
right
```

when logical properties can be used.

Prefer:

```text
margin-inline
padding-inline
inset-inline
text-align: start/end
```

This improves LTR/RTL compatibility.

---

# 99. Localized Date/Number Formatting

Use locale-aware formatting for:

```text
dates
numbers
```

Do not manually concatenate localized date strings.

Technical product specifications may require controlled formatting rather than automatic localization.

---

# 100. Localized Contact Information

Contact information can remain shared if the company details are the same.

Language-specific presentation may vary.

Example:

```text
Phone number → shared
Address → shared or localized representation
Business description → translated
```

---

# 101. Localized Product Specifications

Technical units should not be blindly translated.

For example:

```text
mm
cm
kg
%
```

should remain technically correct.

Translation should affect:

```text
label
description
context
```

not silently change measurement values.

---

# 102. URL Translation vs Product Code

Product codes should remain stable.

Example:

```text
Product code:
MP-SG-001
```

Localized URL:

```text
/en/products/surgical-gown
/es/products/bata-quirurgica
```

The product code should not be translated.

---

# 103. Content Publication Matrix

Each content entity can have:

```text
Draft
Review
Published
Scheduled
Archived
```

Each translation can have its own state if required.

The public router must check both:

```text
parent state
translation state
```

---

# 104. Scheduled Content

Scheduled publication should:

```text
publish at configured time
update sitemap eligibility
update metadata
invalidate cache
create audit event
```

Scheduled content must remain non-public until its publish time.

---

# 105. Unpublishing

When content becomes unpublished:

```text
remove from sitemap
stop generating hreflang
stop normal internal listing
invalidate cache
```

Then decide:

```text
404
410
redirect
```

based on content strategy.

Do not automatically redirect every removed page to the homepage.

---

# 106. 404 vs 410

Use `404` when:

```text
resource does not exist
```

Use `410` when:

```text
content is intentionally and permanently gone
```

The application should not randomly return one or the other.

---

# 107. International Redirects

Locale redirects must preserve content where possible.

Example:

```text
/en/products/surgical-gown
```

switching to Spanish should resolve to the Spanish translation if available.

If unavailable:

```text
show translation unavailable state
```

rather than silently pretending the page is translated.

---

# 108. Language Availability in Navigation

Navigation should show only enabled languages.

Do not show:

```text
future
disabled
unfinished
```

languages to normal public visitors.

---

# 109. SEO Content Governance

Admin workflow should define ownership:

```text
Content Manager
→ content

Translator
→ translation

SEO Manager
→ SEO metadata

Super Admin
→ global configuration
```

This reduces accidental SEO changes.

---

# 110. SEO Audit Log

Audit:

```text
SEO metadata changes
canonical changes
robots changes
slug changes
redirect changes
indexability changes
language enable/disable
```

---

# 111. Performance of Multilingual Queries

Use indexes for:

```text
language_id
slug
status
published_at
entity_id + language_id
```

The exact indexes must follow `07-DATABASE-SCHEMA.md`.

Avoid loading all languages when only one locale is requested.

---

# 112. Multilingual Query Pattern

Prefer:

```text
WHERE language = requestedLocale
AND status = published
```

rather than:

```text
load all translations
then filter in JavaScript
```

This reduces database and application overhead.

---

# 113. SEO Cache Keys

Cache keys must include locale where the response is language-specific.

Example:

```text
homepage:en
homepage:es
product:{id}:en
product:{id}:es
```

Do not serve English cached metadata to Spanish pages.

---

# 114. CDN Cache Safety

Public localized pages may be cached.

Cache key must distinguish:

```text
locale
path
relevant query parameters
```

Do not cache authenticated responses as public.

---

# 115. Sitemap Cache Keys

If sitemap is split:

```text
sitemap:products:en
sitemap:products:es
```

or equivalent architecture may be used.

Do not regenerate every sitemap for every unrelated content edit if avoidable.

---

# 116. SEO API/Server Boundary

SEO data should be resolved server-side.

Do not require client JavaScript to insert essential:

```text
title
canonical
hreflang
robots
```

metadata after page load.

---

# 117. Accessibility and SEO

The SEO implementation must not damage accessibility.

Maintain:

```text
semantic headings
accessible navigation
descriptive links
alt text
keyboard support
RTL correctness
```

Accessibility and SEO should reinforce each other.

---

# 118. Content Quality

Search optimization must never replace useful content.

Product pages should contain meaningful:

```text
product information
features
applications
specifications
documents
media
inquiry CTA
```

Avoid:

```text
keyword stuffing
hidden text
duplicate boilerplate
automated meaningless paragraphs
```

---

# 119. SEO Non-Goals

This project does not require:

```text
Guaranteed search rankings
Guaranteed traffic
Black-hat SEO
Keyword stuffing
Fake reviews
Fake ratings
Fake backlinks
Fake certifications
Automatically fabricated medical claims
Paid SEO API dependency
```

---

# 120. Acceptance Criteria

The multilingual/SEO implementation is complete when:

1. Multiple languages can be enabled from admin.
2. Each language has validated locale metadata.
3. Public URLs are deterministic.
4. Translation records are independent.
5. Localized slugs work.
6. Translation completeness is visible in admin.
7. Missing translations do not accidentally become indexed fake translations.
8. Language switching preserves context when a translation exists.
9. RTL works for Arabic.
10. Every indexable page has a canonical URL.
11. Hreflang is generated only for valid published translations.
12. `x-default` is used appropriately where required.
13. Metadata is localized.
14. Open Graph data is available.
15. Structured data uses actual content.
16. Product schema never fabricates price/review/rating data.
17. Sitemap includes only indexable public URLs.
18. Robots.txt protects private routes from crawling.
19. Robots.txt is not used as security.
20. Slug changes can create redirects.
21. Redirect loops are prevented.
22. Duplicate URL variants are normalized.
23. Search/filter pages have a deliberate indexability policy.
24. Images support meaningful alt text.
25. SEO changes are auditable.
26. Published content changes trigger appropriate cache/sitemap updates.
27. Public pages are server-rendered where appropriate.
28. Core content is crawlable without client-only interaction.
29. SEO configuration is editable without code changes where intended.
30. No mandatory paid SEO/translation service exists.

---

# 121. Recommended Implementation Order

```text
1. Language database/configuration
2. Locale routing
3. Translation relations
4. Localized slug system
5. Translation admin UI
6. Language switcher
7. Translation fallback rules
8. Metadata resolver
9. Canonical URL system
10. Hreflang generation
11. Robots handling
12. Sitemap generation
13. Redirect management
14. Structured data
15. Open Graph/social metadata
16. Image alt-text workflow
17. SEO admin/editor
18. Search/facet indexability rules
19. RTL verification
20. Cache/revalidation integration
21. Automated SEO tests
22. Production crawl verification
```

---

# 122. Automated SEO Test Matrix

Test at minimum:

```text
English homepage
Spanish homepage
Arabic homepage
Product detail in each enabled language
News detail
Blog detail
Category
Search
404
Redirect
Sitemap
Robots
Canonical
Hreflang
Structured data
Noindex page
Draft page
Unpublished translation
Changed slug
```

---

# 123. Example Product SEO Contract

For:

```text
Product:
Surgical Gown

English:
slug = surgical-gown

Spanish:
slug = bata-quirurgica
```

The system should generate:

```text
English canonical:
https://example.com/en/products/surgical-gown

Spanish canonical:
https://example.com/es/products/bata-quirurgica
```

and mutually reference valid localized alternatives.

---

# 124. Example News SEO Contract

A published news article:

```text
English:
Company Expands Medical Product Manufacturing
slug:
company-expands-medical-product-manufacturing
```

Spanish translation:

```text
slug:
empresa-amplia-fabricacion-productos-medicos
```

Each page receives:

```text
localized title
localized description
localized canonical
localized hreflang
localized Open Graph
```

---

# 125. Example Missing Translation

If:

```text
English = published
Spanish = missing
```

then:

```text
/en/... → indexable
/es/... → do not create a fake translated page
```

The language switcher should indicate that Spanish is unavailable for that specific resource.

---

# 126. Example Slug Change

Old:

```text
/en/products/surgical-gown
```

New:

```text
/en/products/medical-surgical-gown
```

Expected:

```text
301/308:
old → new

canonical:
new

sitemap:
new only

hreflang:
new localized URL set
```

The old URL should not remain as a separate indexable page.

---

# 127. Final SEO Architecture

```text
                    PUBLIC URL
                         │
                    Locale Router
                         │
                 Content Resolution
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     Translation      SEO Data       Publication
       Resolver        Resolver         State
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                  Server-rendered Page
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      Canonical       Hreflang       Structured Data
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                    Search Engine
```

---

# 128. Final Directive for AI Coding Agents

When implementing multilingual and SEO functionality:

1. Read `00-MASTER-PLAN.md` through `08-API-BACKEND-SPEC.md`.
2. Treat this document as the multilingual/SEO source of truth.
3. Do not hard-code language lists in multiple places.
4. Use the database/configuration as the source for enabled languages.
5. Keep translation records independent.
6. Never publish unfinished translations.
7. Never generate hreflang for missing/unpublished translations.
8. Keep canonical URLs deterministic.
9. Create redirects automatically for safe published slug changes.
10. Keep sitemap membership tied to actual indexability.
11. Never use robots.txt as authorization.
12. Generate essential metadata server-side.
13. Use actual content for structured data.
14. Never fabricate medical, certification, pricing, review or rating claims.
15. Support RTL correctly.
16. Keep cache keys locale-aware.
17. Test every public locale and critical SEO signal.
18. Do not introduce a mandatory paid SEO or translation service.
19. Keep SEO controls auditable.
20. Preserve accessibility while implementing SEO.
21. Prefer stable URLs over clever URL schemes.
22. Do not create millions of crawlable filter combinations.
23. Keep public and admin routes strictly separated.
24. Make the implementation compatible with the database and API contracts already defined.
25. Do not introduce AI/chat functionality.

---

# 129. Completion Definition

The multilingual and SEO layer is complete when:

```text
Content
   ↓
Translation
   ↓
Localized URL
   ↓
Publication Validation
   ↓
SEO Metadata
   ↓
Canonical
   ↓
Hreflang
   ↓
Structured Data
   ↓
Sitemap
   ↓
Search Engine Discovery
```

works consistently for every enabled language and every supported public content type.

The final implementation must provide a stable, multilingual, crawlable, accessible and maintainable foundation without requiring paid external SEO or translation infrastructure.
