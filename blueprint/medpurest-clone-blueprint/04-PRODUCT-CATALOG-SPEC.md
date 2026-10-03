# MedPurest Clone Blueprint — Product Catalog Specification

**File:** `04-PRODUCT-CATALOG-SPEC.md`  
**Project:** MedPurest-style B2B Medical Product Catalogue & Lead Generation Platform  
**Status:** Implementation Specification  
**Audience:** Product designers, frontend engineers, backend engineers, CMS administrators, QA engineers, and AI coding agents

---

# 1. Purpose

This document defines the complete product catalogue system.

The product catalogue is the core business entity of the platform. It must support a professional B2B medical manufacturing catalogue where visitors can discover products, inspect detailed information, review specifications and documents, and submit inquiries.

The catalogue is **not an ecommerce checkout system**.

The system must therefore optimize for:

- Product discovery
- Product classification
- Technical information
- Product media
- Product documents
- SEO
- Multilingual content
- Related products
- Lead generation
- Inquiry attribution
- Admin maintainability
- Future catalog growth

---

# 2. Product Model

A product represents a medical product, medical supply, disposable item, surgical pack, protective item, cleaning/disinfection product, or another catalogued offering.

Conceptually:

```text
Product
├── Identity
├── Classification
├── Translated Content
├── Specifications
├── Media
├── Documents
├── Tags
├── SEO
├── Related Products
├── Publishing State
└── Inquiry Context
```

---

# 3. Product Catalog Principles

## 3.1 No Hardcoded Products

Product data must come from the database/CMS.

Do not hardcode product names, specifications, images, or descriptions inside React components.

---

## 3.2 Structured Data First

Important product information should be stored in structured fields.

Do not put every specification inside a rich-text description.

For example, prefer:

```text
Material = Non-woven fabric
Sterility = Non-sterile
Size = S / M / L / XL
Packaging = 10 pcs/bag
```

over storing all of this only as a paragraph.

---

## 3.3 Product Content Must Be Localizable

Every user-facing product text that requires translation must support language-specific values.

Examples:

- Product name
- Slug
- Short description
- Long description
- Applications
- Features
- Specification labels/values where appropriate
- SEO title
- SEO description
- Image alt text
- Document titles

---

# 4. Product Lifecycle

Recommended product lifecycle:

```text
Draft
  ↓
Review
  ↓
Published
  ↓
Archived
```

Optional scheduled state:

```text
Scheduled
```

---

## 4.1 Draft

Draft products:

- Are visible to authorized admins
- Are not publicly indexable
- Are not included in public product listings
- Must not appear in public search
- May be previewed by authorized admins

---

## 4.2 Review

Optional editorial review state.

Useful when:

- Content manager prepares product
- Sales/technical team verifies information
- SEO manager reviews metadata
- Translator verifies localized content

---

## 4.3 Published

Published products:

- Are publicly accessible
- Can appear in product listings
- Can appear in search
- Can be linked internally
- May be included in sitemap
- May generate inquiries

---

## 4.4 Archived

Archived products:

- Are removed from normal listings
- Should normally return `404` or an appropriate redirect depending on SEO policy
- Must remain available in admin
- Existing inquiries must retain historical product references

Never delete historical inquiry context merely because a product is archived.

---

# 5. Product Identity

Recommended core fields:

| Field | Type | Required |
|---|---|---|
| `id` | UUID | Yes |
| `product_code` | String | No/Recommended |
| `slug` | String | Yes |
| `status` | Enum | Yes |
| `featured` | Boolean | Yes |
| `sort_order` | Integer | Yes |
| `created_at` | DateTime | Yes |
| `updated_at` | DateTime | Yes |
| `published_at` | DateTime | No |
| `archived_at` | DateTime | No |

---

# 6. Product Code

A product code/SKU-like identifier may be used for internal and B2B reference.

Examples:

```text
MP-SG-001
MP-SP-ORTHO-002
MP-DIS-005
```

Rules:

- Must be unique when present
- Should be searchable
- Should be safe to expose publicly if intended
- Must not be used as the database primary key
- Should remain stable even if product name changes

---

# 7. Slug

The public URL slug must be:

- Unique
- Stable
- URL-safe
- Lowercase
- Human-readable
- Language-aware where multilingual URLs are used

Example:

```text
/products/surgical-gown
```

Localized example:

```text
/es/products/bata-quirurgica
```

or the project's selected locale routing strategy.

Slug changes must trigger redirect handling where required.

---

# 8. Product Categories

The category system must support hierarchical classification.

Recommended structure:

```text
Category
├── Parent Category
├── Child Categories
└── Products
```

Example:

```text
Products
├── Cleaning and Disinfection Series
├── Protective Equipment
│   ├── Medical Material
│   ├── Disposable Scrub Suits
│   ├── Disposable Patient Gowns
│   ├── Surgical Gown
│   └── Isolation Gown
├── Surgical Pack
│   ├── Gynecology & Obstetrics
│   ├── General Surgery
│   ├── Ophthalmology & ENT
│   ├── Orthopedic
│   ├── Urology
│   ├── Neurosurgery
│   └── Cardiovascular
└── Surgical Drapes
```

The actual catalog can evolve through the admin CMS.

---

# 9. Category Data

Recommended fields:

```text
id
parent_id
slug
status
sort_order
featured
image
created_at
updated_at
```

Localized fields:

```text
name
short_description
description
seo_title
seo_description
```

---

# 10. Category Rules

A category can:

- Have zero or more products
- Have child categories
- Have an image
- Have SEO content
- Have translated content

Category pages should remain useful even when there are many products.

If a category has no published products, the admin should be warned before publishing it publicly unless an editorial landing page intentionally exists.

---

# 11. Product-to-Category Relationship

A product may belong to:

- One primary category
- Multiple secondary categories

Recommended:

```text
primary_category_id
```

plus a many-to-many relationship:

```text
product_categories
```

The primary category determines the canonical/default navigation context.

---

# 12. Product Content Structure

Each product should support:

```text
Name
Short Description
Long Description
Features
Applications
Specifications
Packaging
Storage
Warnings/Notes where applicable
```

Only fields actually needed by the business should be displayed publicly.

Do not invent medical claims.

---

# 13. Product Title

Product title requirements:

- Concise
- Descriptive
- Human-readable
- SEO-friendly
- Unique where possible

Avoid keyword stuffing.

Bad:

```text
Best Cheap High Quality Surgical Gown Medical Surgical Gown Manufacturer
```

Better:

```text
Disposable Surgical Gown
```

---

# 14. Short Description

Recommended:

```text
1–3 short sentences
```

Purpose:

- Product cards
- Search results
- Product hero
- Related product blocks
- Meta/content previews

Do not duplicate the full product description.

---

# 15. Long Description

Long description may contain:

- Overview
- Product features
- Applications
- Construction/material information
- Packaging
- Usage information
- Manufacturing notes
- Other approved business content

Rich text must be sanitized before public rendering.

---

# 16. Product Features

Features should support structured repeatable items.

Example:

```text
Breathable non-woven material
Elastic cuffs
Lightweight construction
Multiple sizes
Bulk packaging available
```

Recommended database shape:

```text
product_features
├── id
├── product_id
├── sort_order
├── value
└── translations
```

If feature translations are required, store localized values separately.

---

# 17. Product Applications

Applications should also support repeatable structured values.

Example:

```text
Hospitals
Clinics
Operating rooms
Medical laboratories
Healthcare facilities
```

Do not automatically present an application as a medical indication unless the source content explicitly supports it.

---

# 18. Product Specifications

Specifications are a first-class product entity.

Recommended structure:

```text
Product
└── Specification Groups
    └── Specification Items
```

Example:

```text
General
  Material: Non-woven fabric
  Type: Disposable

Dimensions
  Size: S / M / L / XL

Packaging
  Pack Size: 10 pcs
  Carton: 100 pcs
```

---

# 19. Specification Groups

Each group may have:

```text
id
product_id
title
sort_order
```

Localized:

```text
title
```

Example groups:

```text
Product Information
Technical Specifications
Packaging
Available Sizes
Quality/Compliance
```

---

# 20. Specification Items

Each item may have:

```text
id
group_id
label
value
unit
sort_order
```

Localized fields can be supported for:

```text
label
value
unit
```

if the project requires full translation.

---

# 21. Specification Data Types

The system may support:

```text
Text
Number
Decimal
Boolean
Select
Multi-select
Range
```

However, the initial implementation can store display-ready values while preserving a clean schema.

Do not over-engineer product specifications before real catalog requirements justify it.

---

# 22. Variant Support

Products may require variants.

Examples:

```text
Size
Color
Material
Packaging
Model
Sterility
```

Recommended future-compatible model:

```text
Product
└── Product Variants
```

Each variant may contain:

```text
variant_code
name
status
sort_order
attributes
media
```

---

# 23. Variant Strategy

Do not create variants merely because a product has multiple specification values.

Use variants when the customer needs to distinguish selectable product configurations.

Example:

### Not necessarily variants

```text
Available sizes:
S / M / L / XL
```

### Actual variants

```text
Model A — Sterile — 10 pcs
Model B — Non-sterile — 20 pcs
```

The admin should decide based on the real catalog structure.

---

# 24. Product Media

Each product may have multiple media assets.

Recommended media types:

```text
Primary image
Gallery image
Detail image
Packaging image
Diagram
Certificate image
Video thumbnail
Product video reference
```

Relationship:

```text
Product
└── Product Images
```

---

# 25. Product Image Rules

Every product should have one primary image whenever possible.

Image metadata:

```text
media_id
product_id
role
sort_order
alt_text
caption
```

Roles:

```text
primary
gallery
packaging
detail
diagram
```

Only one image should be the primary image.

---

# 26. Product Image Presentation

Public product page:

```text
Primary Image
+
Thumbnail Gallery
```

Product listing:

```text
Primary Image
```

Related product:

```text
Primary Image
```

If no image exists:

- Use a controlled product placeholder
- Do not use unrelated stock imagery

---

# 27. Product Documents

Products may include downloadable/viewable documents.

Examples:

```text
Product specification sheet
Brochure
Technical document
Certificate
Packaging document
Instruction document
```

Document entity:

```text
id
product_id
media_id/file_reference
title
type
sort_order
visibility
```

---

# 28. Document Security

Documents should not expose private internal information.

Public product documents must be explicitly marked as public.

Private/internal documents must never be reachable through a predictable public URL.

If storage is private, use controlled access/download mechanisms.

---

# 29. Product Videos

Products may reference videos.

Preferred approach:

```text
Video entity
+
Product relation
```

This avoids duplicating video data.

Product video can show:

- Manufacturing process
- Product overview
- Packaging
- Usage demonstration
- Factory capability

Videos should be optional.

---

# 30. Product Tags

Tags are useful for discovery and internal organization.

Examples:

```text
Disposable
Surgical
Protective
Non-woven
Hospital
Orthopedic
```

Tags may be many-to-many:

```text
product_tags
```

Tags should not replace categories.

---

# 31. Featured Products

Products may be marked:

```text
featured = true
```

Featured products can appear on:

- Homepage
- Category highlights
- Landing pages

Use a manual `sort_order` for predictable presentation.

Do not randomly rotate products unless explicitly designed.

---

# 32. Product Visibility

Recommended visibility states:

```text
Draft
Published
Archived
```

Optional:

```text
Scheduled
```

A product should only appear publicly when:

```text
status = published
AND
published_at <= now
```

if publication date is used.

---

# 33. Product SEO

Each product should support:

```text
SEO title
Meta description
Canonical URL
Open Graph title
Open Graph description
Open Graph image
Robots directives
```

Defaults may be generated from product content.

Example:

```text
SEO title:
{Product Name} | {Company Name}
```

But admins must be able to override it.

---

# 34. Product Structured Data

Where appropriate, product pages may use schema.org structured data.

Because this is a B2B catalogue without mandatory ecommerce pricing, do not fabricate:

- Price
- Availability
- Reviews
- Ratings
- Aggregate ratings

Only output structured data supported by actual CMS data.

---

# 35. Product Search

Search should support:

```text
Product name
Product code
Short description
Long description
Category
Tags
Selected specification fields
```

Search implementation:

### Initial

PostgreSQL full-text search / indexed search.

### Optional future

Meilisearch or Typesense.

Do not make an external search service mandatory for the initial build.

---

# 36. Search Ranking

Suggested ranking priority:

```text
Exact product code
Exact product name
Name prefix
Name terms
Category
Tags
Description
```

Featured products should not automatically outrank an exact search match.

---

# 37. Product Filters

Potential filters:

```text
Category
Subcategory
Product type
Material
Application
Tag
Featured
```

Only expose filters that have meaningful data.

---

# 38. Filter URL State

Filters should be represented in URL query parameters where appropriate.

Example:

```text
/products?category=surgical-gown&material=non-woven
```

Benefits:

- Shareable results
- Browser back/forward support
- SEO control
- Reproducible searches

Avoid indexing every arbitrary filter combination unless explicitly planned.

---

# 39. Product Sorting

Possible sorting:

```text
Recommended
Newest
Name A–Z
Name Z–A
```

Recommended/default should use controlled CMS ordering.

Do not sort by fake popularity.

---

# 40. Product Pagination

Recommended:

```text
12
24
36
```

products per page depending on design/performance.

The default should balance:

- Discovery
- Performance
- Image payload
- Mobile usability

---

# 41. Product Detail URL

Recommended:

```text
/products/{slug}
```

or category-aware URLs if explicitly required.

Prefer a stable canonical product URL independent of category nesting.

Example:

```text
/products/disposable-surgical-gown
```

This prevents duplicate URLs when a product belongs to multiple categories.

---

# 42. Related Products

Related products can be selected manually or automatically.

Recommended priority:

1. Manually selected related products
2. Same primary category
3. Shared tags
4. Similar product attributes

The admin should be able to override automatic suggestions.

---

# 43. Product Inquiry Flow

The product inquiry flow is a core feature.

User journey:

```text
Product Detail
↓
Send Inquiry
↓
Inquiry Form
↓
Product context prefilled
↓
Submit
↓
Success
↓
Admin Inquiry
```

---

# 44. Product Inquiry Form

Recommended fields:

```text
Name *
Email *
Company
Country
Phone / WhatsApp
Product
Quantity (optional)
Message *
```

The product should be automatically associated with the inquiry.

The user should not have to manually identify the product.

---

# 45. Inquiry Quantity

Quantity may be collected as an optional B2B requirement.

Use a neutral field:

```text
Estimated Quantity
```

Do not imply checkout or guaranteed stock.

---

# 46. Inquiry Attribution

Store contextual information where legally and technically appropriate:

```text
product_id
product_name_snapshot
source_url
referrer
language
campaign/UTM values
created_at
```

The product name snapshot is useful because product titles may later change.

---

# 47. Product Inquiry Success

After submission:

```text
Thank you.
Your inquiry has been received.
Our team will contact you soon.
```

Optional actions:

```text
Continue Browsing
Chat on WhatsApp
```

Do not expose internal inquiry IDs unless useful.

---

# 48. Product-to-Inquiry Relationship

The database should preserve:

```text
inquiry.product_id
```

when the inquiry is product-specific.

Historical inquiries should remain understandable even if:

- Product is renamed
- Product is archived
- Product category changes
- Product is later removed

---

# 49. Product Admin List

Admin product list should include:

```text
Image
Product Name
Code
Category
Status
Featured
Updated
Actions
```

Useful filters:

```text
Status
Category
Featured
Language/content completeness
Updated date
```

---

# 50. Product Admin Actions

Recommended:

```text
Create
Edit
Duplicate
Preview
Publish
Unpublish
Archive
Delete
Bulk publish
Bulk archive
```

Permanent deletion should be restricted.

---

# 51. Product Editor Structure

Recommended editor:

```text
Product
├── Basic Information
├── Content
├── Categories
├── Features
├── Applications
├── Specifications
├── Variants
├── Media
├── Documents
├── Videos
├── Related Products
├── SEO
└── Publishing
```

Use tabs/sections according to screen size.

---

# 52. Product Editor — Basic Information

Fields:

```text
Product Name
Product Code
Slug
Short Description
Primary Category
Status
Featured
Sort Order
```

Slug generation:

```text
Product Name
↓
Normalize
↓
Generate slug
↓
Check uniqueness
↓
Allow manual override
```

---

# 53. Product Editor — Content

Support:

```text
Long Description
Features
Applications
Additional Information
```

Rich text editor requirements:

- Safe formatting
- Headings
- Paragraphs
- Lists
- Links
- Tables if needed
- Image insertion where permitted
- Sanitization

Avoid excessive editor features.

---

# 54. Product Editor — Specifications

Admins should be able to:

```text
Add group
Rename group
Reorder group
Add item
Edit label
Edit value
Edit unit
Reorder item
Delete item
```

Use drag-and-drop only if it provides real usability value.

Always provide a keyboard/alternative ordering method if possible.

---

# 55. Product Editor — Media

Admin actions:

```text
Upload
Select from Media Library
Set Primary
Reorder
Remove
Edit Alt Text
Edit Caption
Preview
```

Do not duplicate the same physical file unnecessarily.

---

# 56. Product Editor — Documents

Actions:

```text
Attach document
Set title
Set type
Set visibility
Reorder
Remove
```

Documents should be validated by MIME/type and file-size policies.

---

# 57. Product Editor — Related Products

Provide:

```text
Search products
Select products
Reorder
Remove
```

Prevent a product from relating to itself.

---

# 58. Product Editor — SEO

Fields:

```text
SEO Title
Meta Description
Canonical URL
OG Title
OG Description
OG Image
Robots
```

Show live guidance:

```text
Character count
Preview
Missing fields
```

Do not make SEO fields mandatory when safe defaults can be generated.

---

# 59. Product Preview

Admin should be able to preview a product before publishing.

Preview should display the actual public template:

```text
Header
Breadcrumb
Product
Gallery
Specifications
Documents
Related Products
Inquiry CTA
Footer
```

Preview should not accidentally expose drafts to public search engines.

---

# 60. Product Duplication

Duplicate action should create a new draft.

Copy:

- Content
- Specifications
- Features
- Applications
- Media references where safe
- Documents where appropriate
- Tags

Do not copy:

- ID
- Slug without uniqueness check
- Publication state
- Historical inquiry relations
- Audit history

---

# 61. Product Deletion

Deletion should be restricted.

Before deleting:

- Check inquiries
- Check related products
- Check category relationships
- Check SEO references
- Check content references
- Check media usage

Prefer:

```text
Archive
```

when historical preservation matters.

---

# 62. Product Completeness Score

The admin may show a non-authoritative completeness indicator.

Example checks:

```text
✓ Name
✓ Slug
✓ Category
✓ Short description
✓ Primary image
✓ Long description
✓ Specifications
✓ SEO title
✓ Meta description
```

The score should guide editors, not block publishing unless explicitly configured.

---

# 63. Product Translation Completeness

For multilingual products, admin should show:

```text
English: Complete
Spanish: 80%
Arabic: 60%
Portuguese: Complete
Chinese: Draft
```

Do not silently publish an untranslated language version as if it were complete.

Fallback behavior must be defined by the multilingual specification.

---

# 64. Category/Product Navigation

The UI should make the relationship clear:

```text
Products
→ Category
→ Subcategory
→ Product
```

Product breadcrumbs should reflect the primary category.

---

# 65. Product Card Data Requirements

Minimum:

```text
Primary image
Product name
Link
```

Recommended:

```text
Category
Short description
```

Optional:

```text
Product code
```

Avoid overloading cards with technical specifications.

---

# 66. Product Detail Data Requirements

Minimum:

```text
Product name
Primary image
Description
Category
Inquiry CTA
```

Recommended:

```text
Gallery
Specifications
Features
Applications
Documents
Related products
SEO metadata
```

---

# 67. Medical Content Safety

The CMS must distinguish between:

```text
Technical product information
```

and:

```text
Medical/clinical claims
```

Admins must not invent unsupported claims.

Do not automatically state:

- Treatment efficacy
- Disease prevention
- Clinical superiority
- Regulatory approval
- Sterility
- Safety certification

unless supported by verified source content/documents.

---

# 68. Compliance/Certification Data

If a product has certification/compliance information, connect it to real certificate/document entities where appropriate.

Example:

```text
Product
→ Certificate
→ Certificate Document
```

Avoid duplicate manually typed certification claims when a reusable certificate entity can be referenced.

---

# 69. Product Import

Future-compatible import may support:

```text
CSV
XLSX
JSON
```

Initial implementation does not need bulk import unless required.

If implemented:

- Validate rows
- Preview before import
- Report errors
- Never silently overwrite products
- Support dry-run mode
- Log import activity

---

# 70. Product Export

Admin may export catalog data.

Possible formats:

```text
CSV
JSON
```

Export should respect permissions.

Sensitive internal fields should not be exported to ordinary content managers.

---

# 71. Product API Requirements

The backend should expose product data through internal service/repository layers.

Public read operations:

```text
List products
Get product
List categories
Get category
Search products
Get related products
```

Admin operations:

```text
Create
Update
Publish
Unpublish
Archive
Delete
Duplicate
Manage media
Manage documents
Manage relations
```

All admin mutation endpoints/actions must enforce authorization.

---

# 72. Product API Response Shape

A public product response should conceptually include:

```json
{
  "id": "...",
  "slug": "...",
  "name": "...",
  "shortDescription": "...",
  "description": "...",
  "category": {},
  "images": [],
  "features": [],
  "applications": [],
  "specifications": [],
  "documents": [],
  "relatedProducts": [],
  "seo": {}
}
```

Do not expose internal-only database fields.

---

# 73. Product Caching

Public product pages are strong candidates for caching.

Cache invalidation must occur when:

```text
Product published
Product updated
Product archived
Category changed
Media changed
Related products changed
```

Do not serve stale content indefinitely after an admin update.

---

# 74. Product Database Indexing

Recommended indexes:

```text
products.slug
products.product_code
products.status
products.featured
products.primary_category_id
products.published_at
products.updated_at
```

Translation indexes:

```text
product_translations(product_id, language_id)
product_translations(slug, language_id)
```

Relationship indexes:

```text
product_categories(product_id)
product_categories(category_id)
product_tags(product_id)
product_tags(tag_id)
```

Actual indexing should be validated against query patterns.

---

# 75. Product Uniqueness

Recommended uniqueness constraints:

```text
products.slug
```

and where used:

```text
products.product_code
```

For translations:

```text
(product_id, language_id)
```

and language-specific slug uniqueness:

```text
(language_id, slug)
```

depending on the routing model.

---

# 76. Product Ordering

Use explicit ordering:

```text
sort_order
```

Recommended behavior:

```text
Lower number = earlier position
```

If equal:

```text
updated_at DESC
```

or another documented deterministic fallback.

Never depend on database insertion order.

---

# 77. Product Featured Logic

Featured products should be selected through:

```text
featured = true
```

and ordered by:

```text
sort_order
```

Optional limits:

```text
Homepage: 6
Category highlight: configurable
```

Do not create separate product records merely for featured presentation.

---

# 78. Product Related Logic

Related products should be deterministic.

Recommended algorithm:

```text
Manual relation
    ↓
Same category
    ↓
Shared tags
    ↓
Shared structured attributes
    ↓
Fallback to curated products
```

The admin's manual choices must take priority.

---

# 79. Product Search UX Requirements

Search results should display:

```text
Query
Result count
Products
Content results where applicable
```

If the query matches a product code exactly, that product should be highly visible.

Search should preserve:

```text
query
filters
page
language
```

where relevant.

---

# 80. Product SEO URL Rules

Avoid:

```text
/products?id=123
```

Prefer:

```text
/products/surgical-gown
```

Avoid exposing database IDs as the primary public URL.

---

# 81. Product Canonicalization

A product should have one canonical public URL per language/routing strategy.

If multiple paths reach the same product:

```text
301 redirect
```

or canonical metadata must be used according to the SEO specification.

---

# 82. Product 404 Behavior

If a product does not exist:

```text
404
```

If a product was permanently moved:

```text
301 redirect
```

If archived without replacement:

- Return appropriate not-found behavior
- Preserve SEO redirect strategy where needed
- Keep inquiry history intact

---

# 83. Product Accessibility

Product pages must provide:

- Descriptive image alt text
- Semantic headings
- Accessible specification tables
- Keyboard-accessible gallery
- Accessible inquiry form
- Visible focus states
- Accessible download links
- Accessible related product cards

---

# 84. Product Performance

Product pages must avoid loading everything immediately.

Recommended:

```text
Above-the-fold:
Primary image
Core product information
Primary CTA
```

Lazy-load:

```text
Below-the-fold gallery images
Related products
Videos
Large documents/previews
```

Do not lazy-load the primary hero image if it is the LCP element.

---

# 85. Product Analytics

The architecture may support privacy-conscious analytics events.

Possible events:

```text
product_view
product_search
product_filter
product_document_open
product_inquiry_start
product_inquiry_submit
whatsapp_click
```

Analytics must not be required for core product functionality.

Do not block the site if analytics are unavailable.

---

# 86. Product Data Validation

Validation should happen at:

```text
UI
Server
Database
```

Examples:

```text
Slug must be valid
Product code must be unique when provided
Status must be valid
Category must exist
Referenced media must exist
Related product cannot equal current product
```

---

# 87. Product Audit Trail

Important admin changes should be auditable.

Examples:

```text
Product created
Product updated
Product published
Product unpublished
Product archived
Product deleted
Product media changed
Product category changed
```

Audit logs should include:

```text
actor
action
entity
entity_id
timestamp
metadata
```

---

# 88. Product Permissions

Suggested permissions:

```text
products.view
products.create
products.edit
products.publish
products.archive
products.delete
products.manage_media
products.manage_documents
products.manage_relations
```

Roles determine which permissions are available.

---

# 89. Product Admin Workflow

Recommended:

```text
Create draft
↓
Enter basic information
↓
Assign category
↓
Add content
↓
Add specifications
↓
Add media
↓
Add documents
↓
Configure SEO
↓
Preview
↓
Review
↓
Publish
```

---

# 90. Product Content Quality Checklist

Before publishing:

- [ ] Product name is correct
- [ ] Slug is correct
- [ ] Primary category is assigned
- [ ] Short description exists
- [ ] Long description reviewed
- [ ] Specifications checked
- [ ] Product image added
- [ ] Alt text added
- [ ] Documents verified
- [ ] Related products checked
- [ ] SEO title reviewed
- [ ] Meta description reviewed
- [ ] Translation status reviewed
- [ ] No unsupported medical claims
- [ ] Inquiry CTA works
- [ ] Preview checked on mobile

---

# 91. Catalog Acceptance Criteria

The product catalog is considered complete when:

1. Products can be created and edited through the admin panel.
2. Products can be classified into hierarchical categories.
3. Products support multilingual content.
4. Products support structured specifications.
5. Products support features and applications.
6. Products support multiple images.
7. Products support public documents where appropriate.
8. Products can reference videos.
9. Products can be tagged.
10. Products can be featured.
11. Products have controlled publication states.
12. Product URLs are stable and SEO-friendly.
13. Product search works without a paid external service.
14. Product filters are URL-aware where appropriate.
15. Product detail pages have a clear inquiry path.
16. Product inquiries retain product context.
17. Admin users can preview products before publishing.
18. Product duplication creates a safe new draft.
19. Archiving does not destroy historical inquiry context.
20. Product permissions are enforced server-side.
21. Product media is optimized and accessible.
22. No unsupported medical claims are automatically generated.
23. Product pages remain usable across mobile, tablet, and desktop.
24. The architecture can scale to a substantially larger catalog without replacing the core model.

---

# 92. Recommended Initial Catalog Limits

These are implementation defaults, not hard business limits.

```text
Products per page: 12
Featured products: 6
Related products: 4–8
Product gallery: 1 primary + multiple gallery images
Specification groups: unlimited
Specification items: unlimited
Product tags: multiple
Product categories: multiple with one primary
```

Avoid artificial database limits unless performance or business requirements justify them.

---

# 93. Future Catalog Extensions

The architecture should leave room for:

```text
Product variants
Bulk import/export
Advanced attribute filtering
Product comparison
Download center
RFQ workflow
Distributor portal
Customer-specific catalogs
Regional catalogs
Inventory integration
ERP integration
PIM integration
Ecommerce checkout
```

These are future capabilities and must not be implemented as mandatory scope in the initial catalogue build.

---

# 94. Non-Goals

The initial product catalog does **not** include:

- Public customer accounts
- Login/signup
- OTP
- Shopping cart
- Checkout
- Online payment
- Customer order history
- Customer dashboard
- AI product assistant
- AI chatbot
- Fake reviews
- Fake product ratings
- Fake inventory
- Fabricated pricing

---

# 95. Final Product Catalog Architecture

The final conceptual architecture is:

```text
                    ┌────────────────────┐
                    │      Product       │
                    └─────────┬──────────┘
                              │
        ┌─────────────────────┼──────────────────────┐
        │                     │                      │
        ▼                     ▼                      ▼
   Categories             Translations           Tags
        │                     │                      │
        └──────────────┬──────┴──────────────┬──────┘
                       │                     │
                       ▼                     ▼
                Specifications          Features/
                                        Applications
                       │
        ┌──────────────┼───────────────┐
        ▼              ▼               ▼
      Media         Documents        Videos
        │              │               │
        └──────────────┼───────────────┘
                       ▼
                      SEO
                       │
                       ▼
               Related Products
                       │
                       ▼
                 Product Page
                       │
              ┌────────┴────────┐
              ▼                 ▼
           Inquiry            WhatsApp
              │                 │
              └────────┬────────┘
                       ▼
                   Sales Lead
```

---

# 96. Final Directive for AI Coding Agents

When implementing the product catalogue:

1. Treat products as the core business entity.
2. Keep product content database-driven.
3. Keep public product pages server-rendered by default.
4. Use reusable product components.
5. Keep specifications structured.
6. Keep categories hierarchical.
7. Support multilingual content from the data model.
8. Keep product media separate from product records.
9. Keep documents explicitly permissioned/public.
10. Preserve inquiry context.
11. Use stable SEO-friendly product URLs.
12. Avoid mandatory paid search or storage services.
13. Do not add ecommerce features to the initial scope.
14. Do not add public authentication.
15. Do not add AI features.
16. Do not fabricate medical, regulatory, certification, pricing, stock, review, or performance claims.
17. Validate all admin mutations server-side.
18. Preserve auditability for important catalog changes.
19. Optimize public product pages for performance and accessibility.
20. Keep the catalog model extensible for future integrations without over-engineering the first release.

---

# 97. Completion Definition

The product catalogue implementation is complete only when the following end-to-end path works:

```text
Admin Login
    ↓
Create Category
    ↓
Create Product
    ↓
Add Multilingual Content
    ↓
Add Specifications
    ↓
Upload Product Media
    ↓
Attach Public Documents
    ↓
Configure SEO
    ↓
Preview Product
    ↓
Publish Product
    ↓
Public Category Page
    ↓
Public Product Page
    ↓
Search Product
    ↓
Open Product
    ↓
Submit Product Inquiry
    ↓
Admin Receives Inquiry
    ↓
Product Context Is Preserved
```

This is the minimum complete product-catalog workflow for the platform.
