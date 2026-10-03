# MedPurest Clone Blueprint — Implementation Tasks

**File:** `11-IMPLEMENTATION-TASKS.md`  
**Project:** MedPurest-style B2B Medical Product Catalogue & Lead Generation Platform  
**Purpose:** Execution-ready implementation backlog for an AI coding agent or development team  
**Architecture:** Next.js + React + TypeScript + PostgreSQL + Prisma + modular monolith  
**Status:** Implementation Roadmap

---

# 1. Purpose

This document converts the complete blueprint into an ordered implementation plan.

It defines:

- Development phases
- Dependencies
- Tasks
- Subtasks
- Deliverables
- Acceptance criteria
- Testing requirements
- Security gates
- Performance gates
- Deployment gates
- AI coding-agent workflow
- Definition of done

The implementation must follow the locked project blueprint and must not introduce:

```text
public customer accounts
customer login/signup/OTP
cart
checkout
payment
AI chatbot
AI agent
mandatory paid services
fake reviews
fake ratings
fabricated product claims
```

The system is a:

```text
B2B Medical Product Catalogue
+
Content CMS
+
Lead/Inquiry Management
+
Multilingual SEO Platform
```

---

# 2. Source-of-Truth Files

The implementation agent must read these files before starting:

```text
00-MASTER-PLAN.md
01-PROJECT-ARCHITECTURE.md
02-PAGE-BY-PAGE-SITEMAP.md
03-UI-UX-DESIGN-SPEC.md
04-PRODUCT-CATALOG-SPEC.md
05-CONTENT-CMS-SPEC.md
06-ADMIN-PANEL-SPEC.md
07-DATABASE-SCHEMA.md
08-API-BACKEND-SPEC.md
09-MULTILINGUAL-SEO-SPEC.md
10-SECURITY-PERFORMANCE-DEPLOYMENT.md
```

This file defines execution order.

If two documents appear to conflict:

```text
Master plan
→ architecture
→ database/API contracts
→ domain-specific specification
→ implementation detail
```

Do not silently change the blueprint.

---

# 3. Implementation Strategy

Use:

```text
small vertical slices
+
frequent tests
+
working commits
+
incremental integration
```

Do not build the entire UI first and backend later.

Each phase should leave the project in a runnable state.

---

# 4. Dependency Graph

High-level dependency order:

```text
Project Foundation
        ↓
Database + Configuration
        ↓
Authentication + RBAC
        ↓
Core CMS Infrastructure
        ↓
Product Catalog
        ↓
Public Pages
        ↓
Inquiry System
        ↓
Multilingual
        ↓
SEO
        ↓
Performance/Security Hardening
        ↓
Testing
        ↓
Deployment
```

---

# 5. Phase 0 — Repository and Environment Foundation

## TASK-0001 — Initialize Repository

Create:

```text
Git repository
Next.js application
TypeScript
package manager
ESLint
Prettier
```

Acceptance:

```text
✓ Project starts locally
✓ TypeScript works
✓ Lint works
✓ Formatting works
✓ Production build works
```

---

## TASK-0002 — Establish Folder Structure

Create modular structure based on:

```text
src/
  app/
  components/
  features/
  lib/
  server/
  styles/
  types/
  validation/
```

Separate:

```text
public
admin
server
shared
```

responsibilities.

---

## TASK-0003 — Configure TypeScript

Enable strict mode.

Requirements:

```text
strict: true
no implicit any
safe null handling
```

Avoid unnecessary `any`.

---

## TASK-0004 — Environment Configuration

Create:

```text
.env.example
```

Define typed environment configuration.

Validate required values at runtime/startup.

Acceptance:

```text
✓ Missing required configuration fails safely
✓ Secrets never enter client bundles
```

---

## TASK-0005 — Git Hygiene

Create:

```text
.gitignore
.editorconfig
```

Ensure secrets and generated files are excluded.

---

## TASK-0006 — CI Skeleton

Create CI pipeline for:

```text
install
lint
typecheck
test
build
```

Do not require deployment yet.

---

# 6. Phase 1 — Database Foundation

## TASK-0101 — PostgreSQL Connection

Configure:

```text
PostgreSQL
Prisma
DATABASE_URL
```

Acceptance:

```text
✓ Database connects
✓ Prisma client works
✓ Local migration works
```

---

## TASK-0102 — Prisma Configuration

Create:

```text
prisma/schema.prisma
```

Configure migrations and generated client.

---

## TASK-0103 — Base Audit Fields

Standardize:

```text
id
created_at
updated_at
```

where appropriate.

Use consistent UUID/CUID strategy according to the database specification.

---

## TASK-0104 — Language Tables

Implement:

```text
languages
```

Fields include:

```text
code
name
native_name
locale
direction
enabled
is_default
sort_order
```

Acceptance:

```text
✓ Only one default language
✓ Locale values validated
```

---

## TASK-0105 — RBAC Tables

Implement:

```text
users
roles
permissions
user_roles
role_permissions
```

Seed initial roles and permissions.

---

## TASK-0106 — Content Tables

Implement the core CMS entities:

```text
pages
page_translations

categories
category_translations

products
product_translations

news_categories
news
news_translations

blog_categories
blogs
blog_translations

videos
video_translations

certificates
certificate_translations

honors
honor_translations

history_items
history_translations

culture_sections
culture_translations
```

---

## TASK-0107 — Product Support Tables

Implement:

```text
product_images
product_documents
product_variants
product_specification_groups
product_specification_items
tags
product_tags
```

Use the exact schema defined in `07-DATABASE-SCHEMA.md`.

---

## TASK-0108 — Inquiry Tables

Implement:

```text
inquiries
inquiry_notes
inquiry_status_history
```

Statuses:

```text
New
Contacted
Qualified
Quoted
Negotiating
Converted
Closed
Spam
```

---

## TASK-0109 — Media Tables

Implement:

```text
media
media_folders
```

Support:

```text
file metadata
alt text
mime type
size
storage key
visibility
```

---

## TASK-0110 — Navigation and Settings Tables

Implement:

```text
menus
menu_items
site_settings
```

---

## TASK-0111 — SEO Tables

Implement:

```text
seo_metadata
redirects
```

Ensure language-aware metadata.

---

## TASK-0112 — Activity Logs

Implement:

```text
activity_logs
```

Support security-sensitive administrative auditing.

---

## TASK-0113 — Database Indexes

Add indexes for:

```text
slug
status
published_at
language_id
entity_id + language_id
category_id
sort_order
created_at
```

Add full-text search indexes where specified.

---

## TASK-0114 — Foreign Keys and Delete Rules

Define safe relationships.

Explicitly decide:

```text
CASCADE
RESTRICT
SET NULL
```

per entity relationship.

Do not rely on accidental database defaults.

---

## TASK-0115 — Seed System

Create seeds for:

```text
languages
roles
permissions
default admin bootstrap
```

Do not seed fake public medical claims.

---

# 7. Phase 2 — Authentication and Authorization

## TASK-0201 — Admin Login

Implement:

```text
/admin/login
```

Acceptance:

```text
✓ Public users cannot access admin
✓ Invalid credentials fail safely
✓ Successful login creates secure session
```

---

## TASK-0202 — Admin Session

Implement:

```text
HttpOnly
Secure
SameSite
```

cookie/session behavior.

---

## TASK-0203 — Auth Middleware

Protect:

```text
/admin/*
```

except:

```text
/admin/login
```

---

## TASK-0204 — Permission Service

Create centralized:

```text
requirePermission()
```

and equivalent authorization helpers.

---

## TASK-0205 — RBAC Enforcement

Protect every admin mutation:

```text
create
edit
publish
delete
bulk action
settings update
user management
role management
```

---

## TASK-0206 — Admin User Management

Implement:

```text
users list
user detail
activate/deactivate
role assignment
password/security management
```

---

## TASK-0207 — MFA Foundation

Prepare optional:

```text
TOTP
```

for privileged users.

---

## TASK-0208 — Auth Security Tests

Test:

```text
unauthenticated access
wrong role
disabled user
expired session
permission removal
IDOR
```

---

# 8. Phase 3 — Core Application Services

## TASK-0301 — Validation Layer

Create shared Zod schemas for:

```text
products
categories
news
blogs
videos
certificates
pages
inquiries
media
users
roles
SEO
redirects
settings
```

---

## TASK-0302 — Error Model

Create standard:

```text
error code
safe message
request ID
optional safe details
```

---

## TASK-0303 — Service Layer

Create domain services:

```text
productService
categoryService
contentService
inquiryService
mediaService
translationService
seoService
searchService
authService
settingsService
navigationService
```

---

## TASK-0304 — Repository/Data Access Layer

Centralize database access where useful.

Do not duplicate Prisma queries throughout UI components.

---

## TASK-0305 — Transaction Utilities

Create safe transaction patterns for:

```text
create + translation
publish + audit
slug change + redirect
delete + dependent cleanup
role change + audit
```

---

## TASK-0306 — Audit Service

Create:

```text
auditLogService
```

for security-sensitive actions.

---

# 9. Phase 4 — Media Library

## TASK-0401 — Storage Integration

Implement storage abstraction:

```text
storageService
```

Support configured storage provider.

---

## TASK-0402 — Media Upload

Admin can upload allowed:

```text
images
PDFs
documents
video assets where supported
```

---

## TASK-0403 — Upload Validation

Validate:

```text
file size
MIME
extension
signature
filename
```

---

## TASK-0404 — Image Processing

Implement:

```text
thumbnail
responsive sizes
WebP/AVIF where supported
metadata handling
```

---

## TASK-0405 — Media Library UI

Implement:

```text
browse
search
filter
folder
preview
replace
delete
copy URL
edit metadata
```

---

## TASK-0406 — Alt Text

Require/encourage meaningful:

```text
alt text
caption
```

where applicable.

---

## TASK-0407 — Media Security Tests

Test:

```text
oversized upload
invalid MIME
malicious SVG
path traversal
unauthorized delete
private file access
```

---

# 10. Phase 5 — Site Settings and Navigation

## TASK-0501 — Site Settings Service

Manage:

```text
brand name
logo
favicon
email
phone
WhatsApp
address
social links
company information
default SEO
contact details
```

---

## TASK-0502 — Branding UI

Admin can:

```text
upload logo
replace logo
upload favicon
edit branding
```

---

## TASK-0503 — Header Navigation

Implement CMS-driven navigation.

---

## TASK-0504 — Footer Navigation

Implement:

```text
footer columns
quick links
contact information
social links
```

---

## TASK-0505 — Navigation Validation

Prevent:

```text
broken links
invalid routes
duplicate positions
unsafe external URLs
```

---

# 11. Phase 6 — Product Catalog Backend

## TASK-0601 — Category CRUD

Implement:

```text
create
edit
delete
reorder
publish/unpublish
```

Support hierarchy.

---

## TASK-0602 — Category Translation

Implement multilingual category content.

---

## TASK-0603 — Product CRUD

Implement:

```text
create
edit
duplicate
publish
unpublish
archive
delete
```

---

## TASK-0604 — Product Translation

Implement:

```text
translation creation
translation editing
translation status
localized slug
```

---

## TASK-0605 — Product Specifications

Implement:

```text
groups
items
units
values
ordering
```

---

## TASK-0606 — Product Variants

Implement optional variants.

Do not force variant complexity onto simple products.

---

## TASK-0607 — Product Media

Attach:

```text
main image
gallery
documents
videos
```

---

## TASK-0608 — Product Tags

Implement:

```text
tags
product_tags
```

---

## TASK-0609 — Featured Products

Implement:

```text
featured
sort order
visibility
```

---

## TASK-0610 — Product Search

Implement PostgreSQL search.

Search fields may include:

```text
product name
code
description
features
applications
category
tags
```

---

## TASK-0611 — Product Filters

Implement:

```text
category
tag
status where admin-only
language
```

and future specification filtering where useful.

---

## TASK-0612 — Product API

Implement public and admin APIs according to:

```text
08-API-BACKEND-SPEC.md
```

---

# 12. Phase 7 — CMS Content Backend

## TASK-0701 — Generic Pages

Implement:

```text
page CRUD
translation
publication
SEO
```

---

## TASK-0702 — News

Implement:

```text
categories
articles
translations
publish workflow
SEO
```

---

## TASK-0703 — Blog

Implement:

```text
categories
posts
translations
tags
publish workflow
SEO
```

---

## TASK-0704 — Videos

Implement:

```text
video CRUD
translation
thumbnail
URL/embed validation
SEO
```

---

## TASK-0705 — Certificates

Implement:

```text
certificate CRUD
translations
documents/images
metadata
```

---

## TASK-0706 — Honors

Implement:

```text
honor CRUD
translations
media
ordering
```

---

## TASK-0707 — History

Implement timeline/history items.

---

## TASK-0708 — Culture

Implement culture sections.

---

# 13. Phase 8 — Homepage CMS

## TASK-0801 — Hero Section

Manage:

```text
title
subtitle
background/media
CTA
link
```

---

## TASK-0802 — Company Stats

Manage configurable statistics.

Do not fabricate statistics.

---

## TASK-0803 — Featured Products

Configure:

```text
selection
ordering
```

---

## TASK-0804 — Product Categories

Configure homepage category presentation.

---

## TASK-0805 — Reasons to Choose Us

Create editable content blocks.

---

## TASK-0806 — Latest News

Configure:

```text
count
ordering
selection
```

---

## TASK-0807 — Homepage CTA

Manage:

```text
headline
description
button
contact destination
```

---

## TASK-0808 — Homepage Preview

Admin should be able to preview draft homepage content.

---

# 14. Phase 9 — Public Website Shell

## TASK-0901 — Global Layout

Implement:

```text
header
navigation
main
footer
language switcher
```

---

## TASK-0902 — Responsive Breakpoints

Verify:

```text
mobile
tablet
desktop
large desktop
```

---

## TASK-0903 — Accessibility Foundation

Implement:

```text
semantic HTML
keyboard navigation
focus states
ARIA only where necessary
contrast
skip link
```

---

## TASK-0904 — Loading States

Create consistent:

```text
skeleton
spinner
progress
```

patterns.

---

## TASK-0905 — Error States

Create:

```text
404
500
empty
permission
network
```

states.

---

# 15. Phase 10 — Public Pages

## TASK-1001 — Homepage

Implement all sections from:

```text
02-PAGE-BY-PAGE-SITEMAP.md
```

---

## TASK-1002 — About

Implement:

```text
/about
```

---

## TASK-1003 — History

Implement:

```text
/about/history
```

or the final route defined by the sitemap.

---

## TASK-1004 — Certification

Implement certification page.

---

## TASK-1005 — Honor

Implement honors page.

---

## TASK-1006 — Culture

Implement culture page.

---

## TASK-1007 — Products Index

Implement:

```text
products listing
categories
search/filter
pagination
```

---

## TASK-1008 — Product Category

Implement:

```text
category heading
description
product grid
pagination
breadcrumbs
SEO
```

---

## TASK-1009 — Product Detail

Implement:

```text
gallery
title
code
description
features
applications
specifications
documents
related products
inquiry CTA
```

---

## TASK-1010 — News

Implement:

```text
news listing
category
pagination
detail
```

---

## TASK-1011 — Blog

Implement:

```text
blog listing
category
pagination
detail
```

---

## TASK-1012 — Video

Implement:

```text
video listing
detail
```

---

## TASK-1013 — Certificate

Implement certificate listing/detail behavior.

---

## TASK-1014 — Contact

Implement:

```text
contact information
map
inquiry form
```

---

## TASK-1015 — Search

Implement global search.

---

## TASK-1016 — Privacy

Implement privacy policy page.

---

# 16. Phase 11 — Inquiry / Lead System

## TASK-1101 — Public Inquiry Form

Fields:

```text
Name
Email
Tel/WhatsApp
Message
```

Additional attribution fields may include:

```text
product
page URL
locale
UTM
```

---

## TASK-1102 — Server Validation

Validate all fields server-side.

---

## TASK-1103 — Spam Protection

Implement:

```text
honeypot
rate limit
duplicate detection
payload limits
```

Optional challenge integration may be added later.

---

## TASK-1104 — Inquiry Persistence

Store inquiry before notification.

---

## TASK-1105 — Email Notification

Attempt notification after successful persistence.

Email failure must not delete the inquiry.

---

## TASK-1106 — Admin Inquiry List

Implement:

```text
filter
search
sort
status
date
```

---

## TASK-1107 — Inquiry Detail

Show:

```text
contact information
message
source
product
history
notes
```

---

## TASK-1108 — Inquiry Status Workflow

Implement:

```text
New
Contacted
Qualified
Quoted
Negotiating
Converted
Closed
Spam
```

---

## TASK-1109 — Inquiry Notes

Allow authorized sales users to add internal notes.

---

## TASK-1110 — Inquiry Audit

Record status changes and important actions.

---

# 17. Phase 12 — Multilingual System

## TASK-1201 — Locale Routing

Implement locale-aware routes.

---

## TASK-1202 — Language Registry

Load enabled languages from database/configuration.

---

## TASK-1203 — Translation Resolver

Implement:

```text
requested locale
→ translation
→ default fallback for non-indexable UI contexts
```

Do not fake translated indexable pages.

---

## TASK-1204 — Language Switcher

Preserve equivalent page when translation exists.

---

## TASK-1205 — Localized Slugs

Implement translated slugs.

---

## TASK-1206 — Translation Completeness

Admin must see:

```text
complete
partial
missing
```

---

## TASK-1207 — RTL

Implement Arabic direction support.

---

## TASK-1208 — Locale Formatting

Implement localized:

```text
dates
numbers
direction
```

---

## TASK-1209 — Multilingual Tests

Test every enabled locale across:

```text
homepage
category
product
news
blog
contact
```

---

# 18. Phase 13 — SEO System

## TASK-1301 — Metadata Resolver

Implement centralized SEO metadata resolution.

---

## TASK-1302 — Canonical URLs

Generate deterministic canonical URLs.

---

## TASK-1303 — Hreflang

Generate valid published translation alternates.

---

## TASK-1304 — Open Graph

Generate localized:

```text
og:title
og:description
og:url
og:image
og:locale
```

---

## TASK-1305 — Structured Data

Implement applicable:

```text
Organization
WebSite
BreadcrumbList
Product
Article
VideoObject
```

---

## TASK-1306 — Sitemap

Implement:

```text
/sitemap.xml
```

and split sitemaps if required.

---

## TASK-1307 — Robots

Implement:

```text
/robots.txt
```

---

## TASK-1308 — Redirect Manager

Implement:

```text
301
302
307
308
```

as appropriate.

---

## TASK-1309 — Slug Redirect Automation

When a published slug changes:

```text
old URL → redirect → new URL
```

---

## TASK-1310 — SEO Admin Controls

Implement:

```text
SEO title
description
canonical
robots
OG image
```

---

## TASK-1311 — SEO Validation

Prevent publishing invalid:

```text
canonical
slug
metadata
locale
```

---

# 19. Phase 14 — Admin Dashboard

## TASK-1401 — Dashboard Shell

Implement:

```text
sidebar
header
breadcrumbs
user menu
```

---

## TASK-1402 — Dashboard Metrics

Show useful operational metrics:

```text
products
published products
inquiries
new inquiries
content
media
```

Do not create misleading business metrics.

---

## TASK-1403 — Product Admin

Implement complete product management UI.

---

## TASK-1404 — Content Admin

Implement:

```text
news
blog
videos
certificates
honors
history
culture
pages
```

---

## TASK-1405 — Media Admin

Connect media library.

---

## TASK-1406 — Inquiry Admin

Connect lead management.

---

## TASK-1407 — SEO Admin

Connect SEO controls.

---

## TASK-1408 — Settings Admin

Connect global settings.

---

## TASK-1409 — User/Roles Admin

Connect RBAC management.

---

## TASK-1410 — Activity Logs

Create searchable audit log UI.

---

# 20. Phase 15 — Publishing Workflow

## TASK-1501 — Draft State

Every major content entity supports draft state.

---

## TASK-1502 — Review State

Implement review workflow where required.

---

## TASK-1503 — Publish

Publishing must validate:

```text
required content
translation state
slug
SEO
media
relationships
```

---

## TASK-1504 — Schedule

Support scheduled publication.

---

## TASK-1505 — Unpublish

Ensure unpublishing updates:

```text
public listings
sitemap
hreflang
cache
```

---

## TASK-1506 — Preview

Implement secure admin preview for draft content.

Preview must not become public/indexable.

---

# 21. Phase 16 — Performance

## TASK-1601 — Server Components

Convert content-heavy public components to server rendering where appropriate.

---

## TASK-1602 — Client Bundle Review

Find and remove unnecessary client components.

---

## TASK-1603 — Image Optimization

Verify:

```text
responsive sizes
WebP/AVIF
lazy loading
priority images
```

---

## TASK-1604 — Database Query Review

Inspect:

```text
N+1
large selects
missing indexes
duplicate queries
```

---

## TASK-1605 — Caching

Implement safe cache strategy for:

```text
public content
navigation
settings
products
categories
news
blog
```

---

## TASK-1606 — Cache Invalidation

Connect CMS mutations to revalidation.

---

## TASK-1607 — Search Performance

Benchmark search with realistic product volume.

---

## TASK-1608 — Core Web Vitals

Measure:

```text
LCP
INP
CLS
```

and fix major regressions.

---

# 22. Phase 17 — Security Hardening

## TASK-1701 — Security Headers

Configure:

```text
CSP
HSTS
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

---

## TASK-1702 — Authentication Hardening

Verify:

```text
secure cookies
session expiration
revocation
rate limits
```

---

## TASK-1703 — Authorization Audit

Verify every admin mutation.

---

## TASK-1704 — Input Validation Audit

Review every external input.

---

## TASK-1705 — File Upload Audit

Test malicious files and unauthorized access.

---

## TASK-1706 — API Abuse Audit

Test:

```text
rate limits
large payloads
invalid IDs
mass assignment
```

---

## TASK-1707 — Dependency Audit

Run security checks and update vulnerable packages.

---

## TASK-1708 — Secret Audit

Search repository/build output for accidental secrets.

---

# 23. Phase 18 — Testing

## TASK-1801 — Unit Tests

Test:

```text
services
validators
formatters
SEO builders
permission checks
slug generation
```

---

## TASK-1802 — Integration Tests

Test:

```text
database operations
API routes
Server Actions
auth
RBAC
storage abstraction
```

---

## TASK-1803 — E2E Public Tests

Test:

```text
homepage
products
product detail
news
blog
search
contact
language switching
```

---

## TASK-1804 — E2E Admin Tests

Test:

```text
login
dashboard
product CRUD
content CRUD
media
inquiries
SEO
settings
RBAC
```

---

## TASK-1805 — Security Tests

Test:

```text
XSS
CSRF
SQL injection
IDOR
SSRF
open redirect
upload abuse
privilege escalation
```

---

## TASK-1806 — Accessibility Tests

Check:

```text
keyboard
focus
headings
labels
alt text
contrast
RTL
```

---

## TASK-1807 — SEO Tests

Check:

```text
canonical
hreflang
metadata
structured data
sitemap
robots
redirects
indexability
```

---

## TASK-1808 — Responsive Tests

Test:

```text
mobile
tablet
desktop
large screen
```

---

# 24. Phase 19 — Data and Content Migration

## TASK-1901 — Content Import Strategy

Prepare optional migration tools for:

```text
products
categories
news
blog
certificates
corporate content
media
```

---

## TASK-1902 — Content Normalization

Normalize:

```text
slugs
HTML
images
links
metadata
```

---

## TASK-1903 — Media Migration

Map source media to new storage.

---

## TASK-1904 — Translation Migration

Map supported source translations.

---

## TASK-1905 — Redirect Migration

Create redirects from legacy URLs where required.

---

## TASK-1906 — Migration Verification

Compare:

```text
counts
URLs
images
content
translations
```

before/after migration.

---

# 25. Phase 20 — Production Deployment

## TASK-2001 — Production Environment

Configure:

```text
domain
HTTPS
database
storage
environment variables
```

---

## TASK-2002 — Database Migration

Apply production migrations through controlled process.

---

## TASK-2003 — Seed Production Essentials

Create only:

```text
roles
permissions
languages
authorized admin
```

Do not insert fake public content.

---

## TASK-2004 — Storage Configuration

Verify:

```text
public media
private media
signed URLs if needed
CORS
cache headers
```

---

## TASK-2005 — Email

Configure SMTP or chosen provider.

Verify:

```text
inquiry notification
reply address
deliverability
failure handling
```

---

## TASK-2006 — Monitoring

Enable:

```text
logs
health checks
error monitoring
uptime monitoring
```

as available.

---

## TASK-2007 — Backups

Verify:

```text
database backup
storage backup/recovery
restore procedure
```

---

## TASK-2008 — Production Smoke Test

Run:

```text
homepage
product
category
news
blog
contact
search
admin
media
inquiry
language switch
sitemap
robots
```

---

# 26. Phase 21 — Launch Readiness

## TASK-2101 — Security Gate

All critical security tests pass.

---

## TASK-2102 — Performance Gate

No critical performance regression.

---

## TASK-2103 — SEO Gate

All indexable routes have:

```text
correct canonical
correct metadata
correct locale
correct hreflang
```

---

## TASK-2104 — Content Gate

Verify:

```text
branding
company information
contact details
products
certificates
documents
legal pages
```

---

## TASK-2105 — Admin Gate

Verify all admin roles and permissions.

---

## TASK-2106 — Recovery Gate

Perform a documented backup/restore test.

---

## TASK-2107 — Deployment Gate

Verify:

```text
build
migration
startup
health
rollback
```

---

# 27. Phase 22 — Post-Launch

## TASK-2201 — Monitor Errors

Review first production period for:

```text
500 errors
failed API requests
database issues
email failures
```

---

## TASK-2202 — Monitor Performance

Review:

```text
TTFB
LCP
INP
CLS
API latency
database latency
```

---

## TASK-2203 — SEO Verification

Check:

```text
robots
sitemap
canonical
hreflang
indexability
```

---

## TASK-2204 — Lead Verification

Submit real test inquiry and verify:

```text
database
admin dashboard
email notification
audit trail
```

---

## TASK-2205 — Security Review

Review:

```text
auth failures
rate limits
uploads
logs
admin actions
```

---

# 28. AI Coding Agent Execution Rules

The coding agent must follow these rules.

## Rule 1 — Read Before Coding

Before implementing a phase:

```text
read relevant blueprint files
inspect existing repository
identify dependencies
```

Do not blindly overwrite existing code.

---

## Rule 2 — Work in Small Tasks

Implement:

```text
one logical task
→ tests
→ verify
→ commit
```

rather than producing massive untested changes.

---

## Rule 3 — Preserve Existing Contracts

Do not casually change:

```text
database fields
API response shapes
routes
permission names
environment variables
```

without updating all dependent layers.

---

## Rule 4 — No Fake Data in Production

Demo data may exist in development.

Production must use real approved content.

---

## Rule 5 — No Security Bypass

Never solve a blocked implementation by:

```text
disabling auth
removing validation
making API public
using service-role credentials in browser
disabling RLS without analysis
```

---

## Rule 6 — Test Every Mutation

Every create/update/delete/publish operation should have tests.

---

## Rule 7 — Keep UI and Backend Contracts Aligned

If a backend field changes:

```text
schema
service
API
validation
UI
tests
```

must be checked.

---

## Rule 8 — Avoid Overengineering

Do not introduce:

```text
microservices
Kubernetes
complex event buses
external search cluster
paid AI services
```

unless future scale genuinely requires them.

---

## Rule 9 — Prefer Existing Dependencies

Reuse existing project utilities before adding packages.

---

## Rule 10 — Document Decisions

For non-obvious architecture choices, add concise code comments or project documentation.

---

# 29. Recommended Task Execution Order

The coding agent should execute approximately in this order:

```text
0001 Repository
0002 Folder structure
0003 TypeScript
0004 Environment
0005 Git hygiene
0006 CI

0101 Database
0102 Prisma
0103 Base fields
0104 Languages
0105 RBAC
0106 CMS tables
0107 Product tables
0108 Inquiry tables
0109 Media
0110 Navigation/settings
0111 SEO
0112 Audit logs
0113 Indexes
0114 Relations
0115 Seeds

0201 Admin login
0202 Sessions
0203 Middleware
0204 Permission service
0205 RBAC
0206 User management
0207 MFA
0208 Auth tests

0301 Validation
0302 Errors
0303 Services
0304 Repositories
0305 Transactions
0306 Audit service

0401 Storage
0402 Upload
0403 Validation
0404 Processing
0405 Media UI
0406 Alt text
0407 Security tests

0501 Settings
0502 Branding
0503 Header
0504 Footer
0505 Navigation validation

0601-0612 Product system

0701-0708 CMS system

0801-0808 Homepage CMS

0901-0905 Public shell
1001-1016 Public pages

1101-1110 Inquiry system

1201-1209 Multilingual

1301-1311 SEO

1401-1410 Admin dashboard

1501-1506 Publishing

1601-1608 Performance

1701-1708 Security

1801-1808 Testing

1901-1906 Migration

2001-2008 Production deployment

2101-2107 Launch readiness

2201-2205 Post-launch
```

---

# 30. Parallel Work Opportunities

After foundational contracts are stable, these can be developed in parallel:

```text
Product backend
CMS backend
Media library
Admin UI
Public design system
SEO services
Testing
```

However, parallel work must respect shared schema/API contracts.

---

# 31. Tasks That Must Remain Sequential

These should not be parallelized carelessly:

```text
database schema
→ Prisma migrations
→ services
→ API
→ dependent UI

auth
→ permissions
→ protected admin routes

translation model
→ locale routing
→ localized pages
→ hreflang

storage abstraction
→ media upload
→ media-dependent content
```

---

# 32. Definition of Task Done

A task is not complete merely because code exists.

A task is done when:

```text
✓ implementation exists
✓ types pass
✓ lint passes
✓ relevant tests pass
✓ authorization is checked
✓ validation exists
✓ error states are handled
✓ accessibility is considered
✓ performance impact is reasonable
✓ documentation is updated where necessary
```

---

# 33. Definition of Phase Done

A phase is complete when:

```text
all phase tasks
+
integration tests
+
acceptance criteria
```

pass.

The next phase should not depend on known broken functionality from the previous phase.

---

# 34. Definition of Project Done

The complete project is done when:

```text
✓ public website works
✓ admin panel works
✓ products work
✓ CMS works
✓ inquiries work
✓ multilingual works
✓ SEO works
✓ media works
✓ RBAC works
✓ security tests pass
✓ performance targets are acceptable
✓ accessibility checks pass
✓ responsive layouts work
✓ backups work
✓ deployment is reproducible
✓ monitoring works
✓ production smoke tests pass
```

---

# 35. Final Release Checklist

```text
PROJECT
□ Repository clean
□ README complete
□ Environment documented
□ CI green

DATABASE
□ Migrations applied
□ Indexes verified
□ Backups verified
□ Restore tested

AUTH
□ Admin login works
□ Sessions secure
□ RBAC verified
□ MFA considered
□ Password/security policies verified

CONTENT
□ Products verified
□ Categories verified
□ News verified
□ Blog verified
□ Certificates verified
□ Corporate pages verified
□ Media verified

INQUIRIES
□ Form works
□ Validation works
□ Spam protection works
□ Leads persist
□ Email notification works
□ Admin workflow works

MULTILINGUAL
□ Enabled languages verified
□ Translation workflow works
□ Localized slugs work
□ RTL works
□ Language switch works

SEO
□ Metadata works
□ Canonical works
□ Hreflang works
□ Structured data works
□ Sitemap works
□ Robots works
□ Redirects work

SECURITY
□ Headers configured
□ XSS tests pass
□ CSRF tests pass
□ SQL injection tests pass
□ IDOR tests pass
□ Upload tests pass
□ Rate limiting works
□ Secrets protected

PERFORMANCE
□ Images optimized
□ JS bundle reviewed
□ Database queries reviewed
□ Cache configured
□ Core Web Vitals measured

DEPLOYMENT
□ Production build passes
□ Migrations controlled
□ Health checks pass
□ Monitoring active
□ Rollback documented
□ Recovery tested

LAUNCH
□ DNS verified
□ HTTPS verified
□ Smoke tests pass
□ Real inquiry test completed
□ Admin access verified
```

---

# 36. Final Implementation Directive

The AI coding agent should treat this document as the execution backlog for the entire project.

The correct implementation pattern is:

```text
Read specification
      ↓
Inspect repository
      ↓
Choose next task
      ↓
Implement smallest complete change
      ↓
Run relevant tests
      ↓
Review security
      ↓
Review performance
      ↓
Verify acceptance criteria
      ↓
Commit
      ↓
Continue
```

Do not skip foundational architecture in order to reach visual pages faster.

The final product must remain:

```text
secure
fast
multilingual
SEO-ready
accessible
responsive
maintainable
self-hostable
B2B-focused
lead-generation focused
```

and must not introduce features explicitly excluded by the master plan.
