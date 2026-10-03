# MedPurest Clone Blueprint — Testing, QA & Acceptance Specification

**File:** `12-TESTING-QA-ACCEPTANCE.md`  
**Project:** MedPurest-style B2B Medical Product Catalogue & Lead Generation Platform  
**Purpose:** Complete quality assurance, testing strategy, acceptance criteria, release gates, and production verification plan  
**Architecture:** Next.js + React + TypeScript + PostgreSQL + Prisma + Modular Monolith  
**Status:** Final QA & Acceptance Specification

---

# 1. Purpose

This document defines the complete quality strategy for the project.

It establishes:

- Testing levels
- Test environments
- Test data
- Unit testing
- Integration testing
- API testing
- Database testing
- Admin testing
- Public website testing
- Multilingual testing
- SEO testing
- Security testing
- Accessibility testing
- Responsive testing
- Performance testing
- Media/upload testing
- Inquiry/lead testing
- Deployment testing
- Regression testing
- User acceptance testing
- Release gates
- Defect severity
- Definition of Done
- Final production acceptance criteria

The application must not be considered complete merely because:

```text
the application builds
or
the pages visually render
```

It is complete only when the functional, security, performance, accessibility, SEO, data, and deployment acceptance criteria in this document pass.

---

# 2. Quality Objectives

The final system must be:

```text
Functional
Secure
Reliable
Accessible
Responsive
Performant
SEO-ready
Multilingual
Maintainable
Recoverable
Production-ready
```

Primary quality goals:

1. No critical security vulnerabilities.
2. No broken core public journeys.
3. No unauthorized admin access.
4. No unauthorized data mutation.
5. No critical data-loss path.
6. Product catalogue remains searchable and navigable.
7. Inquiry submissions reliably create leads.
8. Multilingual routes behave consistently.
9. SEO metadata and indexation controls are correct.
10. Production deployment is repeatable and recoverable.

---

# 3. Testing Pyramid

Use the following testing distribution:

```text
                 E2E
              /-------\
             /         \
          Integration
         /-------------\
        /               \
      Unit Tests
     /-------------------\
```

Prioritize:

```text
many unit tests
+
meaningful integration tests
+
focused end-to-end tests
```

Do not rely exclusively on browser tests.

---

# 4. Test Types

The project must include:

```text
Unit Testing
Integration Testing
API Testing
Database Testing
Component Testing
End-to-End Testing
Regression Testing
Security Testing
Accessibility Testing
Responsive Testing
Performance Testing
SEO Testing
Media/File Testing
Email/Notification Testing
Migration Testing
Backup/Restore Testing
Deployment Smoke Testing
User Acceptance Testing
```

---

# 5. Test Environments

Maintain at least:

```text
Local Development
CI/Test
Staging
Production
```

## Local

Purpose:

```text
rapid development
unit tests
integration tests
UI development
```

## CI/Test

Purpose:

```text
automated validation
pull requests
regression
database tests
```

## Staging

Purpose:

```text
production-like verification
E2E
SEO
performance
security
deployment rehearsal
```

## Production

Purpose:

```text
smoke tests
monitoring
real-world verification
```

Never run destructive tests against production.

---

# 6. Test Configuration

The test environment must use separate:

```text
database
storage
credentials
email configuration
secrets
```

Never use production secrets in automated tests.

---

# 7. Test Data Strategy

Use deterministic test fixtures.

Create fixtures for:

```text
languages
users
roles
permissions
categories
products
translations
news
blogs
videos
certificates
media
inquiries
SEO metadata
redirects
settings
```

Test data must include:

```text
complete content
incomplete content
draft content
published content
archived content
missing translations
RTL content
long titles
long descriptions
special characters
Unicode
empty values
invalid values
```

Do not use fabricated medical claims as real production content.

---

# 8. Test Data Isolation

Automated tests must not depend on:

```text
production data
real customer information
real passwords
real API secrets
real patient information
```

Use synthetic test identities.

---

# 9. Unit Testing

Unit tests should cover pure logic and isolated services.

Required areas:

```text
validators
slug generation
permission checks
role resolution
translation resolution
SEO metadata generation
canonical URL generation
hreflang generation
pagination
sorting
search query construction
status transitions
inquiry validation
file validation
settings resolution
```

---

# 10. Validation Unit Tests

Test every major Zod/schema validator.

Cases:

```text
valid input
missing required field
null
empty string
whitespace
too long
too short
invalid email
invalid phone
invalid URL
invalid enum
malformed slug
unexpected object properties
```

Acceptance:

```text
✓ Invalid input never silently passes
✓ Error output is predictable
```

---

# 11. Slug Tests

Test:

```text
normal English
Unicode
Arabic
Chinese
Portuguese
Spanish
duplicate slug
reserved route
empty title
special characters
slug update
```

Acceptance:

```text
✓ Published URL remains stable unless intentionally changed
✓ Changed published slug creates redirect when required
```

---

# 12. RBAC Unit Tests

For every permission:

```text
authorized user
unauthorized user
multiple roles
disabled user
removed role
removed permission
```

Acceptance:

```text
✓ Authorization is enforced server-side
✓ UI hiding is never the only security control
```

---

# 13. Translation Unit Tests

Test:

```text
translation exists
translation missing
fallback
disabled language
default language
RTL language
localized slug
```

Do not expose unintended translation fallback on indexable localized routes.

---

# 14. SEO Unit Tests

Test generated:

```text
title
description
canonical
hreflang
Open Graph
structured data
robots directives
sitemap entries
```

Acceptance:

```text
✓ No accidental duplicate canonical
✓ No malformed hreflang
✓ Draft content is not indexed
```

---

# 15. Integration Testing

Integration tests must verify actual interactions between:

```text
service
database
validation
authorization
storage
API
```

Test all major mutations.

---

# 16. Database Integration Tests

Required:

```text
create
read
update
delete
publish
unpublish
archive
restore where supported
```

Verify:

```text
foreign keys
unique constraints
indexes where relevant
cascade behavior
restrict behavior
transactions
concurrent updates
```

---

# 17. Transaction Tests

Test operations such as:

```text
product + translation
page + translation
publish + audit log
slug change + redirect
inquiry + status history
role update + audit log
```

Acceptance:

```text
✓ Partial transaction failure rolls back correctly
✓ No orphan records are created
```

---

# 18. Concurrency Tests

Test simultaneous:

```text
content edit
publish
delete
role modification
inquiry status change
```

Verify no silent overwrites where conflict protection is required.

---

# 19. API Testing

Every public/admin API must be tested for:

```text
valid request
invalid request
missing request body
unauthorized request
forbidden request
not found
conflict
rate limited
server failure
```

Verify status codes and safe response bodies.

---

# 20. Public API Security Tests

Public endpoints must reject:

```text
oversized payload
unexpected fields
malformed JSON
invalid IDs
invalid URLs
excessive requests
malicious content
```

---

# 21. Admin API Security Tests

Every admin endpoint must test:

```text
anonymous
authenticated without permission
authenticated with permission
wrong resource
disabled user
expired session
```

Acceptance:

```text
✓ No privilege escalation
✓ No IDOR
✓ No hidden mutation endpoint bypass
```

---

# 22. Product Testing

## Product Creation

Verify:

```text
name
code
slug
category
description
features
applications
specifications
images
documents
translations
SEO
status
```

---

## Product Editing

Verify:

```text
content updates
media replacement
translation updates
specification changes
SEO changes
```

---

## Product Publishing

A product cannot publish when required fields are missing.

Verify:

```text
required content
valid slug
valid category
valid media where required
valid translation state
SEO validation
```

---

## Product Detail

Verify:

```text
correct product
gallery
specifications
documents
related products
breadcrumbs
inquiry CTA
SEO
```

---

# 23. Category Testing

Test:

```text
create
edit
delete
reorder
hierarchy
translation
slug
SEO
empty category
category with products
```

Acceptance:

```text
✓ Category URLs remain deterministic
✓ Product counts/listings remain consistent
```

---

# 24. News Testing

Test:

```text
category
article
translation
draft
published
scheduled
archived
detail
pagination
SEO
```

---

# 25. Blog Testing

Test:

```text
category
post
tags
translation
draft
publish
detail
related content
SEO
```

---

# 26. Video Testing

Test:

```text
thumbnail
video URL/embed
invalid URL
translation
listing
detail
SEO
```

Never allow unsafe arbitrary script injection through video fields.

---

# 27. Certificate Testing

Test:

```text
create
edit
media
document
translation
publication
detail
```

Ensure certificate information is stored/displayed exactly as approved.

Do not fabricate certification data.

---

# 28. Corporate Content Testing

Test:

```text
About
History
Certification
Honor
Culture
Contact
Privacy
```

Verify multilingual content and SEO.

---

# 29. Homepage Testing

Verify every configurable section:

```text
hero
statistics
featured products
categories
reasons
latest news
CTA
```

Test:

```text
missing section
empty data
large number of items
reordering
draft preview
published content
```

Acceptance:

```text
✓ Homepage remains usable if optional content is absent
✓ No broken layout caused by missing CMS data
```

---

# 30. Media Library Testing

Test:

```text
upload
preview
search
filter
folder
edit metadata
replace
delete
```

File security tests:

```text
wrong MIME
wrong extension
double extension
oversized file
malicious SVG
HTML file
executable file
path traversal
```

Acceptance:

```text
✓ Unsafe files are rejected
✓ Unauthorized users cannot delete/replace media
```

---

# 31. Image Testing

Verify:

```text
dimensions
responsive variants
orientation
large file handling
broken image fallback
alt text
lazy loading
priority loading
```

---

# 32. Inquiry Form Testing

Required valid flow:

```text
open form
→ enter valid data
→ submit
→ server validates
→ inquiry saved
→ notification attempted
→ success response
```

---

# 33. Inquiry Validation Tests

Test:

```text
missing name
invalid email
invalid phone
oversized message
HTML injection
URL injection
empty message
spam payload
duplicate submissions
```

---

# 34. Inquiry Reliability Test

Simulate email failure.

Expected:

```text
inquiry remains stored
admin can see inquiry
notification failure is logged
user receives safe response
```

The lead must not be lost because email delivery failed.

---

# 35. Inquiry Workflow Testing

Verify status transitions:

```text
New
→ Contacted
→ Qualified
→ Quoted
→ Negotiating
→ Converted
→ Closed
```

Also test:

```text
Spam
```

and authorized reopening/editing behavior where supported.

---

# 36. Search Testing

Test search for:

```text
product name
product code
category
tag
description
partial term
case differences
Unicode
Arabic
Chinese
Spanish
Portuguese
```

Test:

```text
empty query
no results
many results
special characters
very long query
```

Acceptance:

```text
✓ Search never exposes drafts
✓ Search respects publication and locale rules
```

---

# 37. Pagination Testing

Test:

```text
first page
middle page
last page
empty page
page beyond range
large page number
```

Verify stable ordering.

---

# 38. Authentication E2E Tests

Test:

```text
admin login
wrong password
unknown user
disabled user
logout
session expiry
protected route
```

Acceptance:

```text
✓ Public routes never require customer login
✓ Admin routes require valid admin authentication
```

---

# 39. Admin E2E Test Suite

Minimum flow:

```text
login
→ dashboard
→ create category
→ create product
→ upload image
→ add translation
→ save draft
→ preview
→ publish
→ verify public product
→ edit product
→ verify update
```

---

# 40. RBAC E2E Tests

For each role verify permitted and forbidden actions.

Example:

```text
Content Manager
Sales Manager
Media Manager
SEO Manager
Translator
Super Admin
```

Test:

```text
navigation visibility
page access
API access
mutation access
bulk action access
```

---

# 41. Navigation Testing

Verify:

```text
header
footer
mobile menu
breadcrumbs
internal links
external links
language switcher
```

No broken navigation should remain.

---

# 42. Public Route Testing

Every route in:

```text
02-PAGE-BY-PAGE-SITEMAP.md
```

must have a test.

Minimum checks:

```text
HTTP status
render
title
metadata
canonical
breadcrumbs where applicable
links
mobile layout
desktop layout
```

---

# 43. 404 Testing

Test:

```text
unknown page
unknown product
unknown category
unknown article
invalid locale
old redirected URL
```

Expected behavior must match route policy.

---

# 44. Redirect Testing

Verify:

```text
old slug → new slug
legacy route → current route
trailing slash policy
locale route changes
```

No redirect loops.

---

# 45. Multilingual QA

For every enabled language test:

```text
homepage
products
categories
product detail
news
blog
contact
navigation
footer
SEO
```

Verify:

```text
correct language
correct direction
correct localized URLs
correct metadata
correct hreflang
```

---

# 46. RTL Testing

Arabic/RTL pages must verify:

```text
layout direction
navigation
forms
buttons
icons
breadcrumbs
tables/specifications
pagination
modals
admin interfaces where supported
```

Do not simply mirror the entire UI blindly.

---

# 47. Missing Translation Testing

Test:

```text
fully translated content
partially translated content
missing translation
unpublished translation
```

Verify fallback policy exactly matches the multilingual specification.

---

# 48. Accessibility Testing

Target:

```text
WCAG 2.2 AA-oriented implementation
```

Test:

```text
keyboard navigation
focus visibility
focus order
screen-reader labels
semantic headings
form labels
error messages
alt text
button names
link names
contrast
reduced motion
```

---

# 49. Accessibility Automated Checks

Run automated accessibility checks against representative pages.

At minimum test:

```text
homepage
product listing
product detail
contact
admin dashboard
admin product editor
login
```

Automated checks do not replace manual keyboard/screen-reader review.

---

# 50. Responsive Testing

Required view classes:

```text
small mobile
large mobile
tablet
desktop
large desktop
```

Verify:

```text
header
navigation
cards
tables
forms
gallery
modals
admin sidebar
```

No:

```text
horizontal overflow
clipped text
unusable controls
overlapping content
```

---

# 51. Browser Testing

At minimum validate current supported versions of:

```text
Chrome
Firefox
Safari
Edge
```

Include mobile browser testing where practical.

---

# 52. Performance Testing

Measure:

```text
TTFB
LCP
INP
CLS
FCP
server response time
database latency
API latency
JavaScript bundle size
image weight
```

---

# 53. Performance Acceptance

Public pages should avoid unnecessary client-side JavaScript.

Verify:

```text
server-first rendering where appropriate
optimized images
lazy loading
cache usage
efficient database queries
```

No major performance regression should be accepted without documented reason.

---

# 54. Load Testing

Simulate realistic traffic for:

```text
homepage
product listing
product detail
search
inquiry submission
admin read operations
```

Test progressively.

Do not perform uncontrolled load testing against production.

---

# 55. Database Performance QA

Inspect:

```text
slow queries
N+1 queries
large scans
missing indexes
unbounded queries
inefficient joins
```

Acceptance:

```text
✓ List endpoints use pagination
✓ Public queries select only needed fields
✓ N+1 patterns are removed
```

---

# 56. Cache Testing

Test:

```text
cached public page
CMS update
revalidation
fresh content
unpublished content
deleted content
```

Acceptance:

```text
✓ Published updates become visible within defined revalidation expectations
✓ Draft content never leaks through cache
```

---

# 57. Security Testing

Security testing must include:

```text
authentication
authorization
input validation
XSS
CSRF
SQL injection
IDOR
SSRF
open redirect
file upload
rate limiting
session security
security headers
secret handling
dependency vulnerabilities
```

---

# 58. XSS Testing

Attempt malicious input in:

```text
product descriptions
news
blog
pages
comments/notes if applicable
site settings
inquiry messages
SEO fields
URLs
```

Expected:

```text
unsafe HTML is sanitized/rejected
scripts never execute
```

---

# 59. SQL Injection Testing

Test user-controlled fields:

```text
search
filters
IDs
slugs
sort fields
query parameters
forms
```

Expected:

```text
✓ No raw unsafe SQL construction
✓ Parameterized/ORM queries used
```

---

# 60. IDOR Testing

Attempt to access another record by changing:

```text
ID
UUID
slug
request body
URL
```

especially in admin endpoints.

Expected:

```text
✓ Unauthorized record access rejected
```

---

# 61. SSRF Testing

Test server-side URL processing such as:

```text
video URL
external media
imports
webhooks
preview functionality
```

Block access to unsafe internal destinations where applicable.

---

# 62. Open Redirect Testing

Test:

```text
returnUrl
redirect
next
callback
```

Expected:

```text
✓ Only approved/local destinations accepted
```

---

# 63. CSRF Testing

Verify state-changing requests cannot be abused cross-site.

Test:

```text
admin mutations
settings
content
media
users
roles
```

---

# 64. Rate-Limit Testing

Verify limits for:

```text
login
inquiry
search where needed
password/security operations
sensitive admin APIs
```

Expected:

```text
✓ Excessive requests receive controlled response
✓ Legitimate users can recover after cooldown
```

---

# 65. Session Security Testing

Verify:

```text
HttpOnly
Secure in production
SameSite
expiry
logout invalidation
session rotation where required
```

---

# 66. Secrets Testing

Check:

```text
Git repository
client bundle
logs
error responses
build artifacts
public environment variables
```

No secrets should leak.

---

# 67. Dependency Security

Run package security audit.

Classify findings:

```text
critical
high
medium
low
```

No unresolved critical vulnerability may pass production release without documented exception and mitigation.

---

# 68. SEO QA

Every indexable page should have:

```text
unique title
appropriate description
canonical
correct locale
appropriate hreflang
correct robots behavior
```

---

# 69. Sitemap QA

Verify:

```text
published pages included
draft pages excluded
correct URLs
correct locale variants
no duplicates
no invalid URLs
```

---

# 70. Robots QA

Verify:

```text
public content crawlable
admin blocked
private/system routes protected from indexing
sitemap location correct
```

---

# 71. Structured Data QA

Validate applicable JSON-LD.

Check:

```text
valid JSON
correct entity type
required fields
URL consistency
image URLs
locale where relevant
```

Never fabricate structured business claims.

---

# 72. Canonical QA

Test:

```text
query parameters
pagination
localized pages
duplicate paths
trailing slash policy
redirected URLs
```

---

# 73. Hreflang QA

Verify:

```text
language code
region code where used
self-reference
alternate URLs
x-default where applicable
```

No alternate should point to:

```text
404
draft
unpublished
wrong-language page
```

---

# 74. Email Testing

Test:

```text
inquiry notification
reply-to
sender
subject
HTML/text rendering
missing SMTP
SMTP failure
slow SMTP
```

Acceptance:

```text
✓ Lead persistence does not depend on successful email delivery
```

---

# 75. Migration Testing

Before migration:

```text
backup
record counts
URL inventory
media inventory
```

After migration:

```text
record counts
content spot checks
URL checks
media checks
translation checks
redirect checks
```

---

# 76. Backup and Restore Testing

Perform a real restore rehearsal.

Verify:

```text
database restore
storage restore
application reconnect
migrations
content integrity
admin login
public pages
```

A backup is not considered verified until restoration succeeds.

---

# 77. Deployment Smoke Tests

Immediately after deployment test:

```text
homepage
product listing
product detail
search
contact form
language switch
admin login
admin dashboard
media
inquiry
sitemap
robots
```

---

# 78. Production Smoke Test Rules

Production smoke tests must:

```text
use safe non-destructive actions
use designated test inquiry where appropriate
avoid deleting real data
avoid modifying production content unless explicitly authorized
```

---

# 79. Regression Testing

Every significant change should trigger relevant regression suites.

Examples:

```text
database change
→ database + API + affected E2E tests

auth change
→ auth + RBAC + admin E2E

SEO change
→ SEO + route tests

translation change
→ locale + SEO tests

media change
→ upload + security + image tests
```

---

# 80. Defect Severity

## Severity 0 — Critical

Examples:

```text
data loss
remote code execution
authentication bypass
privilege escalation
production outage
payment issue if future ecommerce exists
```

Release:

```text
BLOCKED
```

---

## Severity 1 — High

Examples:

```text
major public route broken
admin mutation broken
inquiry loss
major SEO indexation failure
serious security vulnerability
```

Release:

```text
normally BLOCKED
```

---

## Severity 2 — Medium

Examples:

```text
non-critical workflow issue
specific browser issue
localized content bug
minor accessibility defect
```

Release:

```text
may proceed only with documented decision
```

---

## Severity 3 — Low

Examples:

```text
cosmetic issue
minor spacing
small copy inconsistency
```

Release:

```text
may proceed if core quality remains acceptable
```

---

# 81. Bug Report Requirements

Every defect should contain:

```text
Title
Severity
Environment
URL/feature
Steps to reproduce
Expected result
Actual result
Evidence
Browser/device
Build/version
```

---

# 82. Test Evidence

For important release checks retain:

```text
test reports
screenshots where useful
logs
performance measurements
security scan results
migration results
backup/restore evidence
```

---

# 83. Pull Request QA Gate

A PR affecting application behavior should pass:

```text
lint
typecheck
unit tests
relevant integration tests
build
```

Additional tests are required when relevant:

```text
E2E
security
accessibility
SEO
performance
```

---

# 84. CI Quality Gate

CI should fail on:

```text
type errors
lint errors
failing required tests
failed build
schema/migration inconsistency
```

Security checks should flag critical findings.

---

# 85. Staging Acceptance

Before production:

```text
all critical user journeys pass
all critical security tests pass
SEO checks pass
responsive checks pass
accessibility checks pass
performance is acceptable
backup/restore is verified
```

---

# 86. User Acceptance Testing

UAT should cover real business workflows.

## UAT Flow 1 — Product Management

```text
Admin login
→ category
→ product
→ specifications
→ media
→ translation
→ publish
→ public verification
```

---

## UAT Flow 2 — Content Management

```text
Create article
→ translate
→ preview
→ publish
→ verify listing
→ verify detail
```

---

## UAT Flow 3 — Lead Management

```text
Visitor
→ product
→ inquiry
→ submission
→ admin receives lead
→ status update
→ sales note
→ conversion/closure
```

---

## UAT Flow 4 — Multilingual

```text
Open language
→ browse products
→ open detail
→ switch language
→ verify equivalent content
→ verify metadata
```

---

## UAT Flow 5 — Branding

Verify editable:

```text
logo
company name
email
phone
WhatsApp
address
social links
footer
about content
```

No source-code change should be required for ordinary branding updates.

---

# 87. Acceptance Criteria — Public Website

The public website is accepted when:

```text
✓ All sitemap routes render correctly
✓ Navigation works
✓ Products are discoverable
✓ Product details are complete
✓ Search works
✓ Inquiry form works
✓ Contact information is correct
✓ Multilingual routes work
✓ RTL works where required
✓ SEO metadata is correct
✓ Sitemap works
✓ Robots works
✓ 404/500 handling works
✓ Mobile layout works
✓ Desktop layout works
✓ Accessibility checks pass
✓ Security checks pass
✓ Performance is acceptable
```

---

# 88. Acceptance Criteria — Admin Panel

Admin is accepted when:

```text
✓ Login works
✓ Unauthorized users are blocked
✓ RBAC works
✓ Dashboard works
✓ Products CRUD works
✓ Content CRUD works
✓ Media works
✓ Inquiries work
✓ Settings work
✓ Navigation works
✓ Languages work
✓ SEO controls work
✓ User/role management works
✓ Activity logs work
✓ Publishing workflow works
✓ Preview works
```

---

# 89. Acceptance Criteria — Product Catalog

```text
✓ Categories support hierarchy
✓ Products have stable identity
✓ Products support translations
✓ Specifications work
✓ Variants work where enabled
✓ Images work
✓ Documents work
✓ Related products work
✓ Search works
✓ Filters work
✓ SEO works
✓ Inquiry CTA works
```

---

# 90. Acceptance Criteria — CMS

```text
✓ Draft content works
✓ Publishing works
✓ Scheduling works where implemented
✓ Translation works
✓ Preview works
✓ Media integration works
✓ SEO fields work
✓ Audit trail works
✓ Permissions work
```

---

# 91. Acceptance Criteria — Inquiry System

```text
✓ Public submission works
✓ Validation works
✓ Spam controls work
✓ Inquiry persists
✓ Notification is attempted
✓ Email failure does not lose inquiry
✓ Admin can search/filter
✓ Status workflow works
✓ Notes work
✓ Audit trail works
```

---

# 92. Acceptance Criteria — Multilingual

```text
✓ Languages can be enabled/disabled
✓ Translations can be managed
✓ Localized URLs work
✓ Language switching works
✓ RTL works
✓ SEO metadata is localized
✓ Hreflang is correct
✓ Draft/unpublished translations are not incorrectly indexed
```

---

# 93. Acceptance Criteria — Security

```text
✓ No critical vulnerabilities
✓ Admin authentication works
✓ RBAC enforced server-side
✓ Secure sessions
✓ Input validation
✓ Output sanitization
✓ Upload restrictions
✓ Rate limiting
✓ Security headers
✓ No secret leakage
✓ IDOR protection
✓ SSRF protection where relevant
✓ Open redirect protection
```

---

# 94. Acceptance Criteria — Performance

```text
✓ Public pages use appropriate server rendering
✓ Images optimized
✓ No major N+1 queries
✓ Database indexes verified
✓ Cache/revalidation works
✓ JavaScript is not unnecessarily shipped
✓ Core Web Vitals are measured
✓ No severe performance regression
```

---

# 95. Acceptance Criteria — Deployment

```text
✓ Production build passes
✓ Environment variables documented
✓ Database migration works
✓ Storage works
✓ Email works
✓ Health checks work
✓ Monitoring works
✓ Backup works
✓ Restore works
✓ Rollback procedure documented
✓ Smoke tests pass
```

---

# 96. Final Release Gate

Production release is approved only when all mandatory gates pass:

```text
GATE 1 — Build
✓

GATE 2 — Type/Lint
✓

GATE 3 — Unit Tests
✓

GATE 4 — Integration Tests
✓

GATE 5 — E2E Core Flows
✓

GATE 6 — Security
✓

GATE 7 — Accessibility
✓

GATE 8 — SEO
✓

GATE 9 — Performance
✓

GATE 10 — Database/Migration
✓

GATE 11 — Backup/Restore
✓

GATE 12 — Production Smoke Test
✓
```

Any unresolved Severity 0 defect blocks release.

Any unresolved Severity 1 defect normally blocks release.

---

# 97. Final Core Journey Matrix

| Journey | Required |
|---|---|
| Homepage | PASS |
| Product discovery | PASS |
| Product detail | PASS |
| Product search | PASS |
| Category navigation | PASS |
| Inquiry submission | PASS |
| Contact page | PASS |
| Language switching | PASS |
| Arabic/RTL where enabled | PASS |
| Admin login | PASS |
| Admin authorization | PASS |
| Product CRUD | PASS |
| Content CRUD | PASS |
| Media upload | PASS |
| Publishing | PASS |
| Inquiry management | PASS |
| SEO metadata | PASS |
| Sitemap | PASS |
| Robots | PASS |
| Backup/restore | PASS |
| Production deployment | PASS |

---

# 98. Final Regression Checklist

Before every major release:

```text
□ Build
□ Typecheck
□ Lint
□ Unit tests
□ Integration tests
□ Public E2E
□ Admin E2E
□ Auth/RBAC
□ Product flows
□ CMS flows
□ Inquiry flow
□ Media
□ Search
□ Multilingual
□ RTL
□ SEO
□ Accessibility
□ Security
□ Performance
□ Migration
□ Backup
□ Smoke test
```

---

# 99. Definition of QA Complete

QA is complete only when:

```text
all mandatory test suites pass
+
all release gates pass
+
known defects are classified
+
no blocking defects remain
+
production smoke tests pass
```

A green build alone is not sufficient.

---

# 100. Final Project Acceptance

The MedPurest-style clone is considered production-ready when it can demonstrate all of the following:

```text
Public Visitor
    ↓
Finds Product
    ↓
Reads Product Details
    ↓
Switches Language
    ↓
Submits Inquiry
    ↓
Lead Saved
    ↓
Admin Receives Lead
    ↓
Sales Updates Status
```

and:

```text
Admin
    ↓
Logs In Securely
    ↓
Uses Authorized Role
    ↓
Manages Products
    ↓
Manages Content
    ↓
Manages Media
    ↓
Manages SEO
    ↓
Publishes Content
    ↓
Public Site Updates Safely
```

while:

```text
Security
Performance
Accessibility
SEO
Multilingual behavior
Data integrity
Backups
Deployment
```

remain within the defined acceptance criteria.

---

# 101. Final QA Directive for AI Coding Agents

An AI coding agent implementing this project must never declare the project complete based only on:

```text
"build succeeded"
"tests passed"
"UI looks good"
```

The agent must evaluate the complete system against:

```text
functional requirements
database integrity
authorization
security
SEO
accessibility
responsive behavior
performance
multilingual behavior
deployment
recovery
```

When a test fails:

```text
reproduce
→ identify root cause
→ fix minimally
→ rerun focused test
→ rerun affected regression suite
→ document if necessary
```

Do not hide failures by weakening tests.

Do not delete failing tests merely to obtain a green build.

Do not bypass authentication or validation to make E2E tests pass.

Do not mark a feature complete when its acceptance criteria are incomplete.

---

# 102. Final Definition of Done

The project is officially **DONE** only when:

```text
✓ All blueprint requirements implemented
✓ All mandatory tests passing
✓ No blocking security defects
✓ No blocking functional defects
✓ Core public journeys verified
✓ Core admin journeys verified
✓ Product catalogue verified
✓ CMS verified
✓ Inquiry system verified
✓ Multilingual verified
✓ SEO verified
✓ Accessibility verified
✓ Responsive behavior verified
✓ Performance verified
✓ Database migrations verified
✓ Backup/restore verified
✓ Production deployment verified
✓ Production smoke tests passed
✓ Documentation complete
```

This document is the final QA and acceptance gate for the MedPurest clone blueprint.
