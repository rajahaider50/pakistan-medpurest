# MedPurest Clone Blueprint — Database Schema Specification

**File:** `07-DATABASE-SCHEMA.md`  
**Project:** MedPurest-style B2B Medical Product Catalogue & Lead Generation Platform  
**Database:** PostgreSQL  
**ORM:** Prisma recommended  
**Primary hosting option:** Supabase PostgreSQL  
**Status:** Implementation Specification

---

# 1. Purpose

This document defines the production database architecture for the platform.

The database must support:

- B2B medical product catalogue
- Hierarchical categories
- Multilingual content
- CMS pages
- News
- Blog
- Videos
- Certificates
- Honors
- History
- Culture
- Media library
- Homepage content
- Navigation
- SEO
- Redirects
- Customer inquiries/leads
- Admin users
- RBAC
- Audit logs
- Publishing workflows

The schema must remain PostgreSQL-compatible and should avoid unnecessary vendor lock-in.

---

# 2. Core Database Principles

1. PostgreSQL is the source of truth.
2. Use UUIDs for externally exposed entity identifiers.
3. Use timestamps consistently.
4. Use foreign keys for relational integrity.
5. Index foreign keys used in joins/filtering.
6. Use unique constraints for stable identifiers.
7. Use explicit status fields rather than ambiguous booleans.
8. Separate translatable entity identity from language-specific content.
9. Avoid duplicating the same business data in multiple tables.
10. Do not store binary media files directly in normal database rows.
11. Store media metadata in the database and files in object storage.
12. Sensitive secrets must not be stored as ordinary content.
13. Admin authorization must not depend only on frontend logic.
14. Use database constraints for invariants wherever practical.
15. Prefer normalized relational structures over uncontrolled JSON.
16. JSON/JSONB is allowed for genuinely flexible metadata, not as a replacement for relational modeling.

---

# 3. Database Naming Convention

Use lowercase `snake_case` for PostgreSQL identifiers.

Examples:

```text
product
product_translation
created_at
updated_at
published_at
```

Avoid mixed-case table and column names.

---

# 4. Primary Key Convention

Recommended:

```sql
uuid
```

Example:

```sql
id uuid primary key default gen_random_uuid()
```

The application should expose stable IDs but should use slugs for public URLs.

---

# 5. Timestamp Convention

Common columns:

```text
created_at
updated_at
published_at
deleted_at
```

Use timezone-aware timestamps:

```text
timestamptz
```

Store timestamps consistently in UTC.

Display localized dates in the application.

---

# 6. Soft Delete Convention

Use soft deletion only where recovery/audit value exists.

Typical fields:

```text
deleted_at
```

Do not automatically add soft deletion to every table.

For content, an explicit lifecycle such as:

```text
draft
review
scheduled
published
archived
```

is often preferable.

---

# 7. Entity/Translation Architecture

Translatable entities should generally use:

```text
Base Entity
    +
Entity Translation
```

Example:

```text
product
product_translation
```

Base entity contains:

```text
id
code
status
sort_order
created_at
updated_at
```

Translation contains:

```text
product_id
language_id
name
slug
description
seo fields
```

This prevents duplicated structural records for every language.

---

# 8. Language Table

Table:

```text
languages
```

Fields:

```text
id
code
name
native_name
locale
direction
is_default
is_enabled
sort_order
created_at
updated_at
```

Constraints:

```text
code UNIQUE
locale UNIQUE
```

Recommended direction values:

```text
ltr
rtl
```

---

# 9. Users

Table:

```text
users
```

Purpose:

Admin/staff identities.

Fields:

```text
id uuid PK
email
display_name
password/auth_provider reference
status
last_login_at
created_at
updated_at
```

If an external authentication provider is used, authentication credentials should remain in the authentication system rather than being duplicated insecurely in this table.

Possible status:

```text
active
invited
disabled
```

---

# 10. Roles

Table:

```text
roles
```

Fields:

```text
id
name
slug
description
is_system
created_at
updated_at
```

Constraint:

```text
slug UNIQUE
```

---

# 11. Permissions

Table:

```text
permissions
```

Fields:

```text
id
name
resource
action
description
created_at
```

Unique logical permission:

```text
(resource, action)
```

Examples:

```text
products.view
products.create
products.edit
products.publish
products.archive
products.delete
```

---

# 12. User Roles

Table:

```text
user_roles
```

Fields:

```text
user_id
role_id
created_at
```

Primary key:

```text
(user_id, role_id)
```

Foreign keys must be indexed where required by query patterns.

---

# 13. Role Permissions

Table:

```text
role_permissions
```

Fields:

```text
role_id
permission_id
created_at
```

Primary key:

```text
(role_id, permission_id)
```

---

# 14. Content Status

Use a controlled status enum or constrained value.

Recommended:

```text
draft
review
scheduled
published
archived
```

The exact implementation may use PostgreSQL enums or application-level constants plus CHECK constraints.

---

# 15. Pages

Table:

```text
pages
```

Fields:

```text
id
template
status
sort_order
published_at
created_by
updated_by
created_at
updated_at
```

A page represents the language-independent identity.

---

# 16. Page Translations

Table:

```text
page_translations
```

Fields:

```text
id
page_id
language_id
title
slug
excerpt
content
seo_title
seo_description
seo_keywords
og_title
og_description
og_image_id
canonical_url
created_at
updated_at
```

Unique:

```text
(page_id, language_id)
(language_id, slug)
```

If global uniqueness across all routes is required, use a centralized route/slug registry instead.

---

# 17. Categories

Table:

```text
categories
```

Fields:

```text
id
parent_id
status
sort_order
image_id
created_at
updated_at
```

`parent_id` references:

```text
categories.id
```

Use `ON DELETE RESTRICT` or controlled deletion for parent categories.

---

# 18. Category Translations

Table:

```text
category_translations
```

Fields:

```text
id
category_id
language_id
name
slug
description
seo_title
seo_description
created_at
updated_at
```

Unique:

```text
(category_id, language_id)
(language_id, slug)
```

---

# 19. Product Table

Table:

```text
products
```

Fields:

```text
id uuid PK
product_code
status
featured
sort_order
category_id
created_by
updated_by
published_at
created_at
updated_at
```

Product code:

```text
UNIQUE
```

Product code must not depend on language.

---

# 20. Product Translations

Table:

```text
product_translations
```

Fields:

```text
id
product_id
language_id
name
slug
short_description
description
features
applications
seo_title
seo_description
og_title
og_description
created_at
updated_at
```

Unique:

```text
(product_id, language_id)
(language_id, slug)
```

---

# 21. Product Specifications

Recommended normalized model:

```text
product_spec_groups
product_spec_items
```

`product_spec_groups`:

```text
id
product_id
sort_order
```

Translation table:

```text
product_spec_group_translations
```

Fields:

```text
id
group_id
language_id
name
```

Items:

```text
product_spec_items
```

Fields:

```text
id
group_id
sort_order
```

Item translations:

```text
product_spec_item_translations
```

Fields:

```text
id
item_id
language_id
label
value
```

This supports structured product specification tables.

---

# 22. Product Variants

Table:

```text
product_variants
```

Fields:

```text
id
product_id
variant_code
name
status
sort_order
metadata
created_at
updated_at
```

`variant_code` should be unique where required.

Variant data must not imply inventory/pricing unless those capabilities are intentionally implemented later.

---

# 23. Product Images

Table:

```text
product_images
```

Fields:

```text
id
product_id
media_id
alt_text
sort_order
is_primary
created_at
```

Unique/constraint logic should prevent multiple primary images if the product model requires exactly one.

---

# 24. Product Documents

Table:

```text
product_documents
```

Fields:

```text
id
product_id
media_id
document_type
title
sort_order
created_at
```

Possible document types:

```text
catalog
datasheet
brochure
certificate
manual
other
```

---

# 25. Product Videos

Table:

```text
product_videos
```

Fields:

```text
id
product_id
video_id
sort_order
created_at
```

---

# 26. Related Products

Table:

```text
product_relations
```

Fields:

```text
product_id
related_product_id
relation_type
sort_order
created_at
```

Primary key:

```text
(product_id, related_product_id, relation_type)
```

Prevent self-relations unless explicitly needed.

---

# 27. Tags

Table:

```text
tags
```

Fields:

```text
id
slug
created_at
```

Translation:

```text
tag_translations
```

Fields:

```text
id
tag_id
language_id
name
```

Unique:

```text
(tag_id, language_id)
(language_id, slug)
```

---

# 28. Product Tags

Table:

```text
product_tags
```

Fields:

```text
product_id
tag_id
```

Primary key:

```text
(product_id, tag_id)
```

---

# 29. News Categories

Table:

```text
news_categories
```

Fields:

```text
id
slug
status
sort_order
created_at
updated_at
```

Translation:

```text
news_category_translations
```

---

# 30. News

Table:

```text
news
```

Fields:

```text
id
category_id
status
cover_media_id
author_id
published_at
created_at
updated_at
```

Translation:

```text
news_translations
```

Fields:

```text
id
news_id
language_id
title
slug
excerpt
content
seo_title
seo_description
og_title
og_description
created_at
updated_at
```

Unique:

```text
(news_id, language_id)
(language_id, slug)
```

---

# 31. Blog Categories

Table:

```text
blog_categories
```

Fields:

```text
id
status
sort_order
created_at
updated_at
```

Translations:

```text
blog_category_translations
```

---

# 32. Blog Posts

Table:

```text
blogs
```

Fields:

```text
id
category_id
status
cover_media_id
author_id
published_at
created_at
updated_at
```

Translations:

```text
blog_translations
```

Fields:

```text
id
blog_id
language_id
title
slug
excerpt
content
seo_title
seo_description
og_title
og_description
created_at
updated_at
```

---

# 33. Blog Tags

Table:

```text
blog_tags
```

Fields:

```text
blog_id
tag_id
```

Primary key:

```text
(blog_id, tag_id)
```

---

# 34. Videos

Table:

```text
videos
```

Fields:

```text
id
provider
video_url
thumbnail_media_id
duration_seconds
status
sort_order
published_at
created_at
updated_at
```

Translations:

```text
video_translations
```

Fields:

```text
id
video_id
language_id
title
description
slug
seo_title
seo_description
```

---

# 35. Certificates

Table:

```text
certificates
```

Fields:

```text
id
issuer
certificate_number
issue_date
expiry_date
image_media_id
document_media_id
status
sort_order
created_at
updated_at
```

Translations:

```text
certificate_translations
```

Fields:

```text
id
certificate_id
language_id
title
description
```

---

# 36. Honors

Table:

```text
honors
```

Fields:

```text
id
organization
award_date
image_media_id
document_media_id
status
sort_order
created_at
updated_at
```

Translations:

```text
honor_translations
```

---

# 37. History

Table:

```text
history_items
```

Fields:

```text
id
event_date
sort_order
status
image_media_id
created_at
updated_at
```

Translations:

```text
history_translations
```

Fields:

```text
id
history_item_id
language_id
title
description
```

---

# 38. Culture

Table:

```text
culture_sections
```

Fields:

```text
id
section_type
sort_order
status
image_media_id
created_at
updated_at
```

Translations:

```text
culture_translations
```

Fields:

```text
id
culture_section_id
language_id
title
description
```

---

# 39. Media

Table:

```text
media
```

Fields:

```text
id uuid PK
storage_provider
storage_bucket
storage_key
original_filename
mime_type
file_size
width
height
duration_seconds
alt_text
caption
folder_id
uploaded_by
created_at
updated_at
```

Do not store actual binary files in this table.

---

# 40. Media Folders

Table:

```text
media_folders
```

Fields:

```text
id
parent_id
name
slug
created_at
updated_at
```

Unique folder naming should be scoped appropriately.

---

# 41. Menus

Table:

```text
menus
```

Fields:

```text
id
location
name
created_at
updated_at
```

Examples:

```text
header
footer
```

---

# 42. Menu Items

Table:

```text
menu_items
```

Fields:

```text
id
menu_id
parent_id
label
target_type
target_value
open_in_new_tab
is_visible
sort_order
created_at
updated_at
```

Menu labels may optionally be localized through:

```text
menu_item_translations
```

if language-specific labels are required.

---

# 43. Site Settings

Table:

```text
site_settings
```

Recommended fields:

```text
id
key
value_json
value_type
is_public
updated_by
created_at
updated_at
```

Unique:

```text
key
```

Use JSONB only for genuinely grouped configuration.

Do not place all application data inside one settings JSON document.

---

# 44. Homepage Configuration

If the homepage is structured, use dedicated tables.

Recommended:

```text
homepage
homepage_translations
homepage_stats
homepage_stat_translations
homepage_reasons
homepage_reason_translations
homepage_featured_products
homepage_featured_categories
```

This is preferable to storing the entire homepage as one giant JSON blob.

---

# 45. Homepage Base

Table:

```text
homepage
```

Fields:

```text
id
status
updated_by
created_at
updated_at
```

Translation:

```text
homepage_translations
```

Fields:

```text
id
homepage_id
language_id
hero_title
hero_description
hero_cta_label
hero_cta_url
cta_title
cta_description
```

---

# 46. Homepage Statistics

Table:

```text
homepage_stats
```

Fields:

```text
id
sort_order
value
icon
is_visible
created_at
updated_at
```

Translation:

```text
homepage_stat_translations
```

Fields:

```text
id
stat_id
language_id
label
```

---

# 47. Homepage Featured Products

Table:

```text
homepage_featured_products
```

Fields:

```text
homepage_id
product_id
sort_order
```

Primary key:

```text
(homepage_id, product_id)
```

---

# 48. Homepage Featured Categories

Table:

```text
homepage_featured_categories
```

Fields:

```text
homepage_id
category_id
sort_order
```

---

# 49. Homepage Reasons

Table:

```text
homepage_reasons
```

Fields:

```text
id
sort_order
icon
is_visible
created_at
updated_at
```

Translation:

```text
homepage_reason_translations
```

Fields:

```text
id
reason_id
language_id
title
description
```

---

# 50. Inquiries

Table:

```text
inquiries
```

Fields:

```text
id uuid PK
name
company
email
phone
whatsapp
country
product_id
message
quantity
source_url
referrer_url
language_id
status
assigned_to
created_at
updated_at
```

Optional campaign fields:

```text
utm_source
utm_medium
utm_campaign
utm_term
utm_content
```

Do not collect unnecessary personal data.

---

# 51. Inquiry Notes

Table:

```text
inquiry_notes
```

Fields:

```text
id
inquiry_id
author_id
note
created_at
```

Notes are internal-only.

---

# 52. Inquiry Status History

Table:

```text
inquiry_status_history
```

Fields:

```text
id
inquiry_id
old_status
new_status
changed_by
created_at
```

This provides a reliable lead lifecycle history.

---

# 53. SEO Metadata

For reusable SEO overrides, table:

```text
seo_metadata
```

Fields:

```text
id
entity_type
entity_id
language_id
title
description
keywords
og_title
og_description
og_image_id
canonical_url
robots
created_at
updated_at
```

If SEO fields are already embedded in translation tables, this table is optional.

Do not duplicate SEO fields without a clear ownership rule.

---

# 54. Redirects

Table:

```text
redirects
```

Fields:

```text
id
source_path
destination_path
status_code
language_id
is_active
created_at
updated_at
```

Recommended status codes:

```text
301
302
```

For permanent SEO redirects, prefer `301`.

---

# 55. Activity Logs

Table:

```text
activity_logs
```

Fields:

```text
id
actor_id
action
resource_type
resource_id
summary
metadata_json
ip_address
user_agent
created_at
```

Never store passwords, tokens, or secrets in `metadata_json`.

---

# 56. Publishing/Scheduling

Content tables that support scheduling should contain:

```text
status
published_at
```

Optional:

```text
scheduled_at
```

Publishing logic:

```text
draft
  ↓
review
  ↓
scheduled
  ↓
published
```

Archived content:

```text
published → archived
```

---

# 57. Content Versioning

For a first production version, versioning can be implemented through:

```text
activity_logs
```

plus database-level backups.

If full editorial rollback is required, add dedicated revision tables such as:

```text
product_revisions
page_revisions
news_revisions
blog_revisions
```

Do not add revision storage to every entity unless required.

---

# 58. Route/Slug Strategy

Public URLs use localized slugs.

Example:

```text
/products/surgical-gown
/es/products/bata-quirurgica
/ar/products/...
```

The exact locale-prefix strategy must follow `02-PAGE-BY-PAGE-SITEMAP.md`.

A slug must be unique within its language and route namespace.

---

# 59. Slug Uniqueness

Do not assume this is enough:

```text
UNIQUE(slug)
```

Instead, uniqueness normally depends on:

```text
language
route/content type
slug
```

Example:

```text
UNIQUE(language_id, slug)
```

If multiple content types can share the same path namespace, add a route namespace field or centralized route registry.

---

# 60. Foreign Key Rules

Use explicit FK behavior.

Recommended examples:

```text
product → category
RESTRICT
```

```text
product_translation → product
CASCADE
```

```text
product_image → product
CASCADE
```

```text
inquiry → product
SET NULL
```

The principle is:

- Delete dependent translation/junction rows when their parent is permanently deleted.
- Preserve business records such as inquiries when a referenced product is removed.
- Prevent accidental deletion of structural parents with active children.

---

# 61. Required Foreign Key Indexes

Index foreign-key columns that participate in:

```text
JOIN
WHERE
ORDER BY
CASCADE
```

Important examples:

```text
product.category_id
product_translation.product_id
product_translation.language_id
news.category_id
news_translation.news_id
news_translation.language_id
blog.category_id
blog_translation.blog_id
blog_translation.language_id
inquiry.product_id
inquiry.assigned_to
inquiry_status_history.inquiry_id
inquiry_notes.inquiry_id
activity_logs.actor_id
menu_items.menu_id
menu_items.parent_id
media.folder_id
```

PostgreSQL does not automatically create indexes for foreign keys.

---

# 62. Composite Index Strategy

Use composite indexes for common multi-column filters.

Examples:

```sql
CREATE INDEX products_status_category_idx
ON products (status, category_id);
```

```sql
CREATE INDEX inquiries_status_created_idx
ON inquiries (status, created_at DESC);
```

```sql
CREATE INDEX news_status_published_idx
ON news (status, published_at DESC);
```

Column order should follow real query patterns, generally placing equality filters before range/order columns.

---

# 63. Partial Indexes

For high-frequency public queries, partial indexes may be useful.

Example:

```sql
CREATE INDEX products_published_idx
ON products (sort_order, updated_at DESC)
WHERE status = 'published';
```

Use partial indexes only when query patterns justify them.

---

# 64. Search

Initial search can use PostgreSQL full-text search.

Possible generated/search columns:

```text
search_vector
```

or generated expressions based on:

```text
name
description
features
applications
```

Search should respect:

```text
language
status
visibility
```

---

# 65. Full-Text Search Index

For larger datasets, use PostgreSQL GIN indexes.

Conceptually:

```sql
CREATE INDEX product_search_idx
ON product_translations
USING GIN (search_vector);
```

The exact implementation should be tested against actual queries.

---

# 66. JSONB Usage

Good uses:

```text
Flexible metadata
External integration metadata
Analytics attribution metadata
Non-critical extension fields
```

Bad uses:

```text
All product specifications
All page content
All relationships
All permissions
All translations
```

Core business relationships belong in relational tables.

---

# 67. Product Specification JSON Alternative

If product specifications vary dramatically, a controlled JSONB field may be used in addition to normalized specifications.

Example:

```text
metadata_json
```

However:

- Validate its schema.
- Do not make core searchable fields JSON-only.
- Do not create uncontrolled nested structures without documentation.

---

# 68. Prisma Model Organization

Recommended Prisma organization:

```text
prisma/
├── schema.prisma
├── migrations/
└── seed/
```

For large teams, schema fragments may be maintained externally and generated into the final Prisma schema if the build workflow supports it.

---

# 69. Prisma Relation Naming

Use explicit relation names where multiple relations exist between the same models.

Example:

```text
createdBy
updatedBy
assignedTo
```

This avoids ambiguous Prisma relations.

---

# 70. Prisma Delete Behavior

Explicitly define relation behavior.

Examples:

```text
Cascade
Restrict
SetNull
```

Do not depend on accidental database defaults.

---

# 71. Transaction Boundaries

Use database transactions for multi-step operations.

Examples:

```text
Create product + translations + images
Publish content + audit log
Change inquiry status + status history
Assign role + permissions
Delete entity + dependent records
```

Keep transactions short.

---

# 72. Race Conditions

Important operations should account for concurrent updates.

Examples:

```text
Publishing
Slug uniqueness
Featured ordering
Inquiry assignment
Role changes
```

Use:

```text
unique constraints
transactions
optimistic locking where needed
```

Do not rely only on frontend checks.

---

# 73. Optimistic Concurrency

For high-value editorial workflows, optional field:

```text
version integer
```

or compare:

```text
updated_at
```

before applying an update.

If another admin changed the record:

```text
Your version is outdated. Reload before saving.
```

---

# 74. Database-Level Constraints

Use constraints for:

```text
Unique email
Unique product code
Unique language code
Unique translation per entity/language
Valid status values
Positive sort order where applicable
Valid date relationships
```

Example:

```text
expiry_date >= issue_date
```

for certificates where both values exist.

---

# 75. Certificate Date Constraint

Conceptually:

```sql
CHECK (
  expiry_date IS NULL
  OR issue_date IS NULL
  OR expiry_date >= issue_date
)
```

---

# 76. Product Code Constraint

Product codes should:

```text
NOT NULL
UNIQUE
```

if every product requires a stable code.

---

# 77. Email Constraint

Database-level email validation should remain conservative.

The application should perform full format validation.

Do not create an overly restrictive database regex that rejects legitimate email addresses.

---

# 78. Audit Integrity

Activity logs should be append-oriented.

Ordinary admins should not have permission to:

```text
Edit historical logs
Delete logs
```

Retention policy should be defined separately.

---

# 79. Public vs Private Data

Public:

```text
Published products
Published content
Public site settings
Published media
```

Private:

```text
Admin users
Roles
Permissions
Inquiry details
Internal notes
Activity logs
Secrets
Draft content
```

---

# 80. Supabase RLS Strategy

If Supabase Data API exposes the schema:

```text
Enable RLS on exposed tables.
```

Do not assume:

```text
authenticated = authorized
```

Authorization must check the user's actual permissions/roles.

For sensitive admin data, prefer server-side access through the application layer where appropriate.

---

# 81. Supabase Auth Authorization

If Supabase Auth is used:

- Never use editable user metadata as an authorization source.
- Keep authorization data in trusted server/database structures.
- If JWT claims are used, account for claim freshness.
- Never expose service-role/secret keys to the browser.
- Use publishable client credentials only in public clients.

---

# 82. Supabase Storage

Media binaries may use Supabase Storage.

Recommended architecture:

```text
Database
  ↓
media row
  ↓
storage_bucket + storage_key
```

Do not store public file URLs as the only source of truth.

The application can construct signed/public URLs from storage metadata.

---

# 83. Storage Security

For private admin uploads:

```text
Admin authorization
Storage policies
Safe object paths
MIME validation
Size limits
```

If media is public website content, only published assets should be publicly retrievable.

---

# 84. Database Schema Overview

```text
users
  ├── user_roles
  │      └── roles
  │             └── role_permissions
  │                    └── permissions
  │
  └── activity_logs

categories
  └── category_translations
        │
        └── products
              ├── product_translations
              ├── product_images
              ├── product_documents
              ├── product_variants
              ├── product_videos
              ├── product_tags
              └── product_relations

languages
  └── all translation tables

news
  └── news_translations

blogs
  └── blog_translations

videos
  └── video_translations

certificates
  └── certificate_translations

honors
  └── honor_translations

history_items
  └── history_translations

culture_sections
  └── culture_translations

media
  └── media_folders

pages
  └── page_translations

menus
  └── menu_items

inquiries
  ├── inquiry_notes
  └── inquiry_status_history
```

---

# 85. Seed Data

Development/staging seed should create:

```text
Default languages
Default roles
Default permissions
Default admin bootstrap procedure
Core product categories
Default menus
Initial site settings
```

Do not hardcode real production credentials in seed files.

---

# 86. Seed Safety

Never commit:

```text
Production passwords
Production API secrets
Service-role keys
SMTP passwords
Private storage credentials
```

Use environment variables or secure secret management.

---

# 87. Migration Strategy

Every schema change must be migration-based.

Examples:

```text
create_languages
create_users_roles_permissions
create_categories
create_products
create_product_translations
create_content
create_media
create_inquiries
create_seo
create_activity_logs
```

Migration names should describe the change.

---

# 88. Migration Rules

Before adding constraints:

- Check existing data.
- Backfill missing values.
- Validate duplicates.
- Add indexes where needed.
- Apply constraint.
- Test rollback/recovery strategy.

PostgreSQL does not support generic:

```sql
ADD CONSTRAINT IF NOT EXISTS
```

so migrations must use explicit existence checks or be designed as one-time deterministic migrations.

---

# 89. Database Backup

Production database must have:

```text
Automated backups
Point-in-time recovery where available
Tested restoration procedure
```

Backups must not be considered complete until restoration has been tested.

---

# 90. Data Retention

Define retention policies for:

```text
Activity logs
Inquiries
Deleted content
Media
Sessions/auth data
```

Retention should follow business, legal, and privacy requirements.

Do not retain personal data indefinitely without purpose.

---

# 91. Privacy

Inquiry data may contain personal information.

Apply:

```text
Least privilege
Access controls
Retention limits
Secure transport
Secure storage
Audit logging
```

Avoid collecting fields that are not required for lead processing.

---

# 92. Database Performance Checklist

Before production:

```text
Foreign keys indexed
Common filters indexed
Composite indexes reviewed
Pagination implemented
N+1 queries eliminated
Slow queries measured
Statistics/analyze maintained
Connection pooling configured
Large media excluded from database
```

---

# 93. Query Performance

Use:

```text
EXPLAIN
EXPLAIN ANALYZE
```

for important queries.

Measure real workloads rather than assuming an index is useful.

---

# 94. N+1 Prevention

Do not fetch:

```text
100 products
```

then run:

```text
100 separate category queries
```

Use appropriate joins/includes/batched queries.

Prisma queries should explicitly load only required relations.

---

# 95. Pagination Strategy

Admin:

```text
offset pagination
```

is acceptable for moderate datasets.

For very large/high-volume tables, consider:

```text
cursor pagination
```

especially for:

```text
activity_logs
inquiries
news
```

---

# 96. Connection Management

For serverless deployment:

- Avoid opening a new unrestricted database connection per request.
- Use supported connection pooling.
- Configure connection limits according to deployment architecture.
- Monitor connection saturation.

---

# 97. Public Query Rules

Public queries must always constrain by:

```text
status = published
language
visibility
```

Never query all rows and filter them only in React.

---

# 98. Admin Query Rules

Admin queries must:

```text
Authenticate
Authorize
Validate filters
Paginate
Select only needed fields
```

---

# 99. Search Query Rules

Search should:

```text
Normalize input
Limit result size
Use indexed search
Filter language
Filter published content publicly
```

Protect against expensive unbounded search requests.

---

# 100. Database Acceptance Criteria

The schema is complete when:

1. All core entities have explicit tables.
2. Relationships are represented with foreign keys.
3. Multilingual content uses translation tables.
4. Product data supports specifications and media.
5. CMS entities are represented.
6. Inquiries and lifecycle history are represented.
7. Admin RBAC is represented.
8. Media metadata is separated from binary storage.
9. SEO and redirects are represented.
10. Homepage content can be managed structurally.
11. Audit logs are represented.
12. Important foreign keys are indexed.
13. Common multi-column queries have appropriate indexes.
14. Unique constraints prevent duplicate translations/slugs/codes.
15. Delete behavior is explicit.
16. Draft/public separation is enforceable.
17. The schema is PostgreSQL-compatible.
18. Prisma can represent the model cleanly.
19. Supabase can host the database without requiring vendor-specific application logic.
20. Sensitive tables have an explicit authorization strategy.
21. No public customer account system is introduced.
22. No ecommerce cart/order/payment schema is required at this stage.
23. No AI/chat schema is required.

---

# 101. Final Entity Checklist

```text
[ ] users
[ ] roles
[ ] permissions
[ ] user_roles
[ ] role_permissions

[ ] languages

[ ] pages
[ ] page_translations

[ ] categories
[ ] category_translations

[ ] products
[ ] product_translations
[ ] product_spec_groups
[ ] product_spec_group_translations
[ ] product_spec_items
[ ] product_spec_item_translations
[ ] product_variants
[ ] product_images
[ ] product_documents
[ ] product_videos
[ ] product_relations
[ ] product_tags

[ ] tags
[ ] tag_translations

[ ] news_categories
[ ] news_category_translations
[ ] news
[ ] news_translations

[ ] blog_categories
[ ] blog_category_translations
[ ] blogs
[ ] blog_translations
[ ] blog_tags

[ ] videos
[ ] video_translations

[ ] certificates
[ ] certificate_translations

[ ] honors
[ ] honor_translations

[ ] history_items
[ ] history_translations

[ ] culture_sections
[ ] culture_translations

[ ] media
[ ] media_folders

[ ] menus
[ ] menu_items

[ ] homepage
[ ] homepage_translations
[ ] homepage_stats
[ ] homepage_stat_translations
[ ] homepage_featured_products
[ ] homepage_featured_categories
[ ] homepage_reasons
[ ] homepage_reason_translations

[ ] site_settings

[ ] inquiries
[ ] inquiry_notes
[ ] inquiry_status_history

[ ] seo_metadata
[ ] redirects

[ ] activity_logs
```

---

# 102. Final Directive for AI Coding Agents

When implementing the database:

1. Read `00-MASTER-PLAN.md`.
2. Read `01-PROJECT-ARCHITECTURE.md`.
3. Read `04-PRODUCT-CATALOG-SPEC.md`.
4. Read `05-CONTENT-CMS-SPEC.md`.
5. Read `06-ADMIN-PANEL-SPEC.md`.
6. Treat this file as the database source of truth.
7. Implement migrations before application features that depend on them.
8. Use PostgreSQL-native constraints and indexes where appropriate.
9. Index important foreign keys.
10. Use composite indexes based on real query patterns.
11. Keep translation records normalized.
12. Avoid giant JSON blobs for core entities.
13. Keep media binaries out of PostgreSQL rows.
14. Keep inquiry records independent from product deletion.
15. Protect admin data with server-side authorization.
16. If Supabase Data API is used, enable RLS on exposed tables.
17. Never use editable user metadata as an authorization source.
18. Never expose service-role or secret keys to browsers.
19. Keep transactions short.
20. Prevent N+1 query patterns.
21. Test migrations on realistic data.
22. Run performance checks on important queries.
23. Keep schema compatible with future ecommerce/mobile extensions without implementing ecommerce now.
24. Do not introduce public login/signup/OTP.
25. Do not introduce AI/chat functionality.
26. Do not require a paid database service.

---

# 103. Completion Definition

The database implementation is complete when the application can reliably support:

```text
Admin Authentication
        ↓
RBAC
        ↓
CMS
        ↓
Product Catalogue
        ↓
Multilingual Content
        ↓
Media
        ↓
SEO
        ↓
Inquiries
        ↓
Audit Logs
```

with:

```text
referential integrity
secure authorization
migration history
appropriate indexes
validated constraints
transaction safety
production backup strategy
```

and without introducing unnecessary infrastructure or paid-service dependencies.
