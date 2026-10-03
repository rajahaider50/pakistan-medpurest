# MedPurest Clone Blueprint — Security, Performance & Deployment Specification

**File:** `10-SECURITY-PERFORMANCE-DEPLOYMENT.md`  
**Project:** MedPurest-style B2B Medical Product Catalogue & Lead Generation Platform  
**Primary Goal:** Secure, fast, reliable, maintainable and production-ready deployment  
**Frontend:** Next.js + React + TypeScript  
**Database:** PostgreSQL  
**Architecture:** Modular Monolith  
**Status:** Implementation Specification

---

# 1. Purpose

This document defines the production engineering requirements for:

- Application security
- Authentication security
- Authorization
- Database security
- File/media security
- API security
- Input validation
- Abuse prevention
- Performance
- Caching
- Image optimization
- Database performance
- Observability
- Backups
- Disaster recovery
- Deployment
- Environment configuration
- CI/CD
- Infrastructure hardening
- Production readiness

The implementation must remain consistent with:

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
```

---

# 2. Security Principles

The system must follow:

```text
least privilege
defense in depth
secure defaults
server-side authorization
explicit validation
minimal attack surface
auditable administration
safe failure
secret isolation
dependency hygiene
```

Security must never depend only on client-side controls.

---

# 3. Threat Model

The application should explicitly consider:

```text
unauthenticated public users
malicious form submissions
credential attacks
session theft
CSRF
XSS
SQL injection
SSRF
file upload abuse
path traversal
malicious redirects
privilege escalation
broken access control
IDOR
brute-force attacks
bot/spam traffic
DoS/resource exhaustion
dependency vulnerabilities
database exposure
storage exposure
leaked secrets
misconfigured deployment
```

---

# 4. Trust Boundaries

Primary trust boundaries:

```text
Browser
   ↓
Next.js application
   ↓
Server services
   ↓
PostgreSQL
   ↓
Object storage
   ↓
Optional email provider
```

Additional:

```text
Admin browser
   ↓
Admin authentication
   ↓
RBAC
   ↓
Admin services
```

Never trust data crossing any boundary.

---

# 5. Public Security Model

Public visitors:

```text
NO account
NO login
NO signup
NO OTP
NO customer session
NO checkout
NO payment
```

Public endpoints must expose only intentionally public data.

---

# 6. Admin Security Model

Admin access is protected through:

```text
/admin/login
```

Administrative operations require:

```text
authenticated admin session
+
active user
+
required permission
```

Sensitive operations should additionally require recent authentication where appropriate.

---

# 7. Admin Authentication

Authentication must use a proven authentication mechanism.

Do not implement password cryptography manually.

Recommended options include:

```text
Supabase Auth
or
another established server-side auth system
```

The application should remain architecturally portable.

---

# 8. Password Requirements

If application-managed passwords are used:

```text
minimum length
secure password hashing
rate limiting
breach-resistant storage
session invalidation after password reset
```

Never store plaintext passwords.

Never log passwords.

---

# 9. Password Hashing

If passwords are managed by the application, use an established password hashing algorithm such as:

```text
Argon2id
```

or another modern library-approved password hashing mechanism.

Do not implement hashing manually.

---

# 10. Session Security

Admin sessions must use:

```text
Secure cookies
HttpOnly cookies
SameSite protection
short/appropriate session lifetime
server-side validation
```

Avoid storing authentication tokens in:

```text
localStorage
sessionStorage
```

unless a specific architecture requires it and its risks are explicitly handled.

---

# 11. Session Revocation

The system should support revoking admin access when:

```text
user disabled
password reset
security incident
role removed
session invalidated
```

---

# 12. Optional Two-Factor Authentication

Admin accounts may support:

```text
TOTP
```

or another established MFA method.

MFA should be especially encouraged for:

```text
Super Admin
```

The application must not invent custom OTP cryptography.

---

# 13. RBAC

Authorization must be permission-based.

Example:

```text
products.view
products.create
products.edit
products.publish
products.delete
```

and:

```text
settings.edit
users.manage
roles.manage
activity_logs.view
```

Never authorize based only on hidden UI buttons.

---

# 14. Server-Side Authorization

Every protected operation must verify permissions on the server.

Example:

```text
User clicks "Delete"
      ↓
Server checks session
      ↓
Server checks permission
      ↓
Server validates resource
      ↓
Server performs action
```

Client-side hiding is not security.

---

# 15. Resource-Level Authorization

For sensitive operations, verify:

```text
user
role
permission
resource
resource ownership/scope
```

This prevents IDOR vulnerabilities.

Example:

```text
/admin/inquiries/123
```

must not become accessible merely because a user guesses:

```text
123
```

---

# 16. Privilege Escalation Prevention

Prevent users from:

```text
assigning themselves roles
editing their own permissions
creating Super Admin users
changing security settings
```

unless their current permission explicitly allows the operation.

---

# 17. Super Admin Protection

Super Admin operations should receive extra safeguards:

```text
audit logging
confirmation for destructive actions
optional recent-authentication requirement
MFA recommendation
```

---

# 18. CSRF Protection

State-changing operations must be protected against CSRF.

This includes:

```text
POST
PUT
PATCH
DELETE
Server Actions
```

Use the framework/authentication mechanism's established CSRF protections and secure cookie settings.

Do not invent custom token schemes unnecessarily.

---

# 19. XSS Prevention

All user/content input must be treated as untrusted.

Protect against:

```text
stored XSS
reflected XSS
DOM XSS
```

Particularly:

```text
rich text
HTML fields
URLs
media metadata
inquiry fields
admin-entered content
```

---

# 20. Rich Text Sanitization

If HTML/rich text is supported:

```text
sanitize on trusted server boundary
```

Allow only explicitly approved tags/attributes.

Do not allow arbitrary:

```html
<script>
```

or unsafe event handlers.

---

# 21. Markdown Security

If Markdown is accepted:

```text
sanitize rendered HTML
sanitize links
handle raw HTML according to policy
```

Do not assume Markdown is automatically safe.

---

# 22. SQL Injection Prevention

Database access must use:

```text
Prisma parameterized queries
```

or safe parameterized SQL.

Never concatenate user input directly into SQL.

---

# 23. Dynamic SQL

When dynamic SQL is unavoidable:

```text
allow-list identifiers
parameterize values
validate sorting fields
validate filter fields
```

Never accept arbitrary SQL fragments from clients.

---

# 24. SSRF Prevention

Any server-side URL fetch must validate the destination.

Protect against:

```text
localhost
127.0.0.1
private networks
cloud metadata endpoints
internal service addresses
```

Only fetch URLs when the feature genuinely requires it.

---

# 25. External URL Validation

For fields such as:

```text
social links
video URLs
document links
redirect destinations
```

validate:

```text
protocol
hostname
allowed schemes
length
format
```

Avoid unsafe schemes such as:

```text
javascript:
data:
```

unless a narrowly controlled use case explicitly requires them.

---

# 26. Open Redirect Prevention

Do not allow arbitrary user-controlled redirects.

Redirect destinations should be:

```text
validated
normalized
audited
```

Internal redirect targets should preferably be path-based.

---

# 27. Security Headers

Production should configure appropriate headers such as:

```text
Content-Security-Policy
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Strict-Transport-Security
```

Avoid obsolete headers when modern browser policy supersedes them.

---

# 28. Content Security Policy

A CSP should be introduced carefully.

Possible baseline:

```text
default-src 'self'
```

Then explicitly allow required:

```text
images
fonts
maps
video hosts
analytics
```

Avoid:

```text
unsafe-eval
```

and minimize:

```text
unsafe-inline
```

where technically possible.

---

# 29. HTTPS

Production must use:

```text
HTTPS
```

HTTP should redirect to HTTPS where applicable.

Secure cookies must only be used over HTTPS in production.

---

# 30. HSTS

Once HTTPS deployment is stable, use:

```text
Strict-Transport-Security
```

with a suitable production policy.

Do not enable aggressive preload behavior without confirming the domain and deployment strategy can permanently support HTTPS.

---

# 31. CORS

CORS should be restrictive.

If the application does not require cross-origin browser API access:

```text
do not enable broad CORS
```

Avoid:

```text
Access-Control-Allow-Origin: *
```

for authenticated/private APIs.

---

# 32. API Rate Limiting

Rate limit sensitive endpoints.

Especially:

```text
inquiry submission
admin login
password reset
MFA verification
search
media upload
public API endpoints
```

Limits should be configurable.

---

# 33. Rate-Limit Dimensions

Possible dimensions:

```text
IP
route
authenticated user
session
email
device fingerprint where appropriate
```

Avoid relying on a single signal.

---

# 34. Inquiry Spam Protection

The public inquiry form should include layered protection:

```text
server-side validation
rate limiting
honeypot
minimum submission interval where appropriate
duplicate detection
optional CAPTCHA/challenge
```

CAPTCHA must not be a mandatory paid service.

---

# 35. Inquiry Abuse Controls

Reject or flag:

```text
oversized payloads
invalid email
invalid phone
obvious bot patterns
excessive repeated submissions
malicious URLs
HTML injection
```

Do not silently discard legitimate leads without trace where possible.

---

# 36. Input Size Limits

Set explicit limits for:

```text
request body
JSON payload
text fields
search query
rich text
file uploads
array lengths
```

Example conceptual limits:

```text
name: 100 chars
email: 320 chars
subject: 200 chars
message: 10,000 chars
```

Actual values should be defined centrally and adjusted to business needs.

---

# 37. File Upload Security

All uploads must validate:

```text
MIME type
file extension
file signature where practical
file size
filename
storage path
```

Never trust the browser-provided MIME type alone.

---

# 38. Allowed File Types

Media library may support:

```text
JPEG
PNG
WebP
AVIF
SVG only under controlled sanitization
PDF
MP4
WebM
```

The exact list must be configurable.

---

# 39. SVG Security

SVG files can contain active content.

Options:

```text
sanitize SVG
or
disallow SVG uploads
```

If SVG is allowed, sanitize it before public serving.

---

# 40. Filename Security

Never use raw uploaded filenames directly as filesystem paths.

Generate safe identifiers such as:

```text
UUID
content hash
safe slug + unique suffix
```

Store original filename separately if needed.

---

# 41. Path Traversal Prevention

Never allow user input to directly determine:

```text
filesystem paths
storage bucket paths
```

Reject traversal patterns such as:

```text
../
..\ 
```

and use generated storage keys.

---

# 42. Private vs Public Storage

Public media:

```text
product images
public certificates
public brochures
```

may use public/cacheable URLs.

Private files:

```text
internal documents
admin exports
security artifacts
```

must use private storage and signed URLs where needed.

---

# 43. Storage Access

Never expose:

```text
storage secret keys
service-role keys
database credentials
```

to the browser.

Only public/publishable URLs should reach public clients.

---

# 44. Database Security

Production database must not be publicly exposed without appropriate network/security controls.

Use:

```text
TLS
strong credentials
least privilege
connection limits
backups
logging
```

---

# 45. Database Credentials

Never commit credentials to:

```text
Git
README
client JavaScript
public environment files
logs
```

Use environment variables or a secure secret manager.

---

# 46. Supabase Security

If Supabase is used:

```text
anon/public key
```

may be exposed only where intended.

The:

```text
service role key
```

must remain server-side and secret.

RLS policies must be treated as an additional security boundary, not a reason to skip application authorization.

---

# 47. Row-Level Security

If Supabase RLS is enabled, define policies explicitly.

Do not enable RLS and leave the application behavior undefined.

Test:

```text
anonymous
authenticated
admin
different roles
```

against relevant tables.

---

# 48. Database Least Privilege

Application credentials should receive only required permissions.

Administrative database access should be separate from normal runtime access where practical.

---

# 49. Secrets Management

Required secrets may include:

```text
DATABASE_URL
AUTH_SECRET
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SMTP credentials
storage credentials
```

Only include variables actually required by the chosen deployment architecture.

---

# 50. Environment Separation

Maintain separate environments:

```text
development
staging
production
```

Never use production credentials in local development.

---

# 51. Environment Variables

Use:

```text
.env.local
```

for local development.

Commit only:

```text
.env.example
```

with placeholders.

Never commit:

```text
.env
.env.local
production secrets
```

---

# 52. Public Environment Variables

Next.js variables exposed to the browser must be deliberately prefixed and reviewed.

Never expose:

```text
database credentials
service-role secrets
private API keys
admin secrets
```

---

# 53. Secret Rotation

The project should support rotating:

```text
database credentials
auth secrets
storage credentials
SMTP credentials
API keys
```

without code changes.

---

# 54. Dependency Security

Use:

```text
npm/pnpm audit
Dependabot/Renovate where appropriate
lockfiles
regular updates
```

Review major dependency upgrades before production rollout.

---

# 55. Dependency Policy

Avoid unnecessary dependencies.

Every new package should be evaluated for:

```text
maintenance
license
security history
bundle size
necessity
```

---

# 56. Supply Chain Security

Pin dependency versions through lockfiles.

Use trusted package registries.

Avoid installing:

```text
unknown packages
unmaintained packages
packages with unnecessary postinstall scripts
```

---

# 57. Build Security

Production build must:

```text
fail on critical type errors
fail on critical lint errors
run tests
run migration checks
validate environment
```

The exact CI policy may distinguish warnings from blockers.

---

# 58. Production Debugging

Never enable verbose production errors containing:

```text
stack traces
SQL
environment variables
internal paths
tokens
```

Public errors should expose safe messages.

Detailed information belongs in server logs.

---

# 59. Error Handling

Use a standardized error model:

```text
code
message
requestId
details only when safe
```

Example:

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid request.",
  "requestId": "..."
}
```

---

# 60. Logging

Log important security/application events:

```text
admin login success/failure
logout
password reset
MFA changes
role changes
permission changes
content publish
content delete
slug changes
redirect changes
settings changes
media deletion
failed authorization
rate-limit events
```

---

# 61. Sensitive Data in Logs

Never log:

```text
passwords
session tokens
access tokens
API secrets
full payment data
unnecessary personal data
```

Inquiry data should be logged minimally.

---

# 62. Correlation IDs

Each server request should have a correlation/request ID.

Example:

```text
X-Request-ID
```

or an application-generated equivalent.

This helps connect:

```text
browser request
server logs
database operation
error report
```

---

# 63. Audit Logs

Security-sensitive admin actions must enter:

```text
activity_logs
```

Recommended fields:

```text
actor
action
resource_type
resource_id
metadata
IP where appropriate
user_agent where appropriate
created_at
```

Avoid storing secrets inside audit metadata.

---

# 64. Monitoring

Production monitoring should cover:

```text
availability
error rate
latency
database health
storage failures
email failures
authentication failures
rate limits
resource usage
```

A paid monitoring service is optional, not mandatory.

---

# 65. Health Endpoint

Provide:

```text
/health
```

for basic application health.

It should be lightweight.

---

# 66. Readiness Endpoint

Where deployment infrastructure supports it:

```text
/ready
```

or equivalent should verify that required dependencies are ready.

Avoid exposing sensitive diagnostic details publicly.

---

# 67. Health Check Rules

Health checks should distinguish:

```text
process alive
application ready
database reachable
```

Do not make a public health endpoint execute expensive database queries on every request.

---

# 68. Performance Principles

Performance priorities:

```text
server rendering
small client bundles
optimized images
efficient database queries
cache public content
avoid unnecessary requests
avoid N+1 queries
lazy-load noncritical resources
```

---

# 69. Performance Budgets

Set practical targets such as:

```text
JavaScript: keep route bundles lean
Images: optimized and responsive
API p95 latency: monitored
Database queries: indexed
LCP: target strong real-world performance
CLS: minimal
INP: responsive interactions
```

Exact thresholds should be measured on representative production-like pages rather than treated as arbitrary guarantees.

---

# 70. Next.js Rendering Strategy

Prefer:

```text
Server Components
```

for content-heavy public pages.

Use Client Components only where interactivity requires them.

Examples:

```text
search interaction
filters
language switcher interaction
admin editor
modal
carousel
```

---

# 71. Client JavaScript Reduction

Do not mark entire page trees as:

```text
"use client"
```

unless necessary.

Keep:

```text
layout
content
SEO metadata
product descriptions
articles
```

server-rendered.

---

# 72. Data Fetching

Prefer server-side data fetching for:

```text
product detail
category pages
news
blog
homepage CMS
SEO metadata
```

Avoid fetching the same data twice on server and client.

---

# 73. N+1 Prevention

Avoid:

```text
load products
then query category per product
then query translations per product
```

Use:

```text
select/include
joined queries
batched queries
```

where appropriate.

---

# 74. Database Indexing

Important indexes include:

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

Exact indexes follow the database specification.

---

# 75. Query Projection

Select only fields required for the page.

Do not load:

```text
large rich text
all media
all translations
```

when the current UI only needs a small subset.

---

# 76. Pagination

Never load unlimited:

```text
products
news
blog posts
inquiries
activity logs
```

Use pagination.

Admin tables should support:

```text
page
page size
filters
sorting
```

---

# 77. Cursor Pagination

Cursor pagination may be preferred for:

```text
large datasets
activity logs
news feeds
```

Offset pagination remains acceptable for small/admin datasets.

---

# 78. Search Performance

Initial search:

```text
PostgreSQL full-text search
```

is sufficient.

Optimize with:

```text
GIN indexes
normalized search vectors
language-aware search where appropriate
```

Optional future search engines may be added later.

---

# 79. Cache Strategy

Cache public content that changes relatively infrequently:

```text
homepage
categories
product pages
news
blog
certificates
corporate pages
navigation
site settings
```

Admin/private data should not be publicly cached.

---

# 80. Cache Invalidation

Content changes should invalidate relevant cache entries.

Examples:

```text
product update
→ product cache
→ category cache if listing affected
→ related cache where required
→ sitemap if indexability/slug changed
```

---

# 81. Revalidation

Use Next.js revalidation mechanisms where appropriate.

Possible strategies:

```text
time-based revalidation
on-demand revalidation
cache tags
```

Prefer event-driven invalidation for CMS publishing when practical.

---

# 82. Cache Safety

Never cache responses containing:

```text
admin data
private inquiry data
user-specific data
session information
```

as public content.

---

# 83. CDN Strategy

Static assets should be CDN-cacheable.

Recommended:

```text
images
fonts
CSS
JS
public documents
```

Use long-lived cache headers for immutable hashed assets.

---

# 84. Browser Caching

Use appropriate:

```text
Cache-Control
ETag
Last-Modified
```

where supported.

Do not cache content forever if URLs are mutable and not versioned.

---

# 85. Image Optimization

Use Next.js image optimization or an equivalent optimized pipeline.

Support:

```text
responsive sizes
WebP
AVIF where supported
lazy loading
priority loading for critical hero imagery
```

---

# 86. Hero Image Strategy

Above-the-fold hero image:

```text
optimized
appropriately sized
priority-loaded when genuinely critical
```

Do not mark every image as priority.

---

# 87. Lazy Loading

Lazy-load:

```text
below-the-fold images
noncritical embeds
secondary content
```

Do not lazy-load content whose immediate visibility is essential to initial rendering.

---

# 88. Font Strategy

Use a limited font set.

Prefer:

```text
self-hosted or framework-optimized fonts
```

Avoid large unnecessary font families and weights.

For multilingual support, ensure selected fonts support:

```text
Latin
Arabic
Chinese
```

where required.

---

# 89. Third-Party Scripts

Minimize:

```text
analytics
maps
social widgets
video embeds
chat widgets
```

No AI/chat widget is required.

Load noncritical scripts lazily.

---

# 90. Maps

The contact page may use a map.

The map must not block:

```text
address
phone
email
inquiry form
```

Prefer lazy loading.

---

# 91. Video Performance

Video pages should use:

```text
poster images
lazy embeds
responsive players
```

Avoid autoplay-heavy background video on low-bandwidth devices unless genuinely required.

---

# 92. Document Delivery

PDF brochures/certificates should:

```text
be cacheable
use correct Content-Type
have stable URLs
avoid exposing private storage
```

Large documents should not be loaded into HTML unnecessarily.

---

# 93. Database Connection Management

Use a safe PostgreSQL connection strategy for the deployment environment.

Avoid creating excessive database connections per request.

Serverless deployments must use connection pooling/appropriate managed connection mechanisms.

---

# 94. Database Transactions

Use transactions for operations requiring atomicity.

Examples:

```text
publish content + update translation state
create product + translations
delete product + dependent records
slug change + redirect
role change + audit log
```

---

# 95. Migration Safety

Database migrations must be:

```text
versioned
reviewed
repeatable
tested
backward-aware where needed
```

Do not manually modify production schema without a recorded migration.

---

# 96. Destructive Migrations

Avoid destructive changes in a single production deployment when existing application versions may still depend on the old schema.

Prefer:

```text
expand
migrate
switch
contract
```

for risky schema changes.

---

# 97. Seed Data

Development/staging may include seed data for:

```text
roles
permissions
languages
categories
demo products
demo content
```

Production seed scripts must not insert fake public content unless explicitly intended.

---

# 98. Backup Strategy

Production database should have:

```text
automated backups
retention policy
restore procedure
```

Storage assets should also have an appropriate backup/versioning strategy.

---

# 99. Backup Verification

A backup is not considered reliable until restoration is tested.

Perform periodic:

```text
restore tests
schema validation
application compatibility checks
```

---

# 100. Recovery Objectives

Define:

```text
RPO — acceptable data loss window
RTO — acceptable recovery time
```

The exact targets depend on hosting and business requirements.

Document them before production launch.

---

# 101. Disaster Recovery

Document recovery steps:

```text
database restore
storage restore
environment recreation
DNS/domain recovery
secret restoration
migration verification
application deployment
health checks
```

---

# 102. Storage Backup

For important media:

```text
product images
certificates
documents
brand assets
```

maintain a recoverable copy.

Avoid a single irreversible storage dependency.

---

# 103. Deployment Architecture

Recommended production flow:

```text
Git Repository
      ↓
CI
      ↓
Tests
      ↓
Build
      ↓
Migration validation
      ↓
Deploy
      ↓
Health check
      ↓
Smoke tests
```

---

# 104. Hosting Model

The application should support:

```text
Vercel-like Next.js hosting
or
self-hosted Node.js
or
containerized deployment
```

without changing the core application architecture.

---

# 105. Container Option

A production container may use:

```text
Node.js LTS
```

with:

```text
multi-stage build
non-root runtime user
minimal runtime image
```

---

# 106. Non-Root Containers

If Docker is used:

```text
do not run application as root
```

unless there is a documented infrastructure requirement.

---

# 107. Docker Image Security

Use:

```text
small base image
pinned dependencies
no unnecessary packages
regular image updates
```

Scan images where tooling is available.

---

# 108. CI Pipeline

Minimum CI stages:

```text
Install
Lint
Typecheck
Unit tests
Integration tests
Build
Migration validation
Security/dependency checks
```

E2E tests may run in a dedicated stage.

---

# 109. Branch Strategy

A simple workflow is sufficient:

```text
main
feature/*
fix/*
```

Production should deploy only from an approved branch/tag process.

---

# 110. Pull Request Requirements

PRs affecting production should include:

```text
description
tests
migration notes
security impact
performance impact
screenshots for UI changes where useful
```

---

# 111. Database Migration Deployment

Do not run destructive production migrations blindly during application startup.

Prefer an explicit deployment/migration step.

---

# 112. Zero/Low-Downtime Deployment

Where possible:

```text
backward-compatible schema
health checks
rolling deployment
atomic release
```

Avoid long maintenance windows for routine content deployments.

---

# 113. Rollback

Every deployment should have a rollback strategy.

Application rollback:

```text
previous build
```

Database rollback is more complex.

Prefer forward-compatible migrations over automatic destructive rollback scripts.

---

# 114. Deployment Smoke Tests

After deployment verify:

```text
homepage
products
product detail
news
blog
contact
search
language switch
admin login
database connection
media
sitemap
robots
```

---

# 115. Production Domain Configuration

Verify:

```text
HTTPS
DNS
www/non-www policy
canonical hostname
redirects
sitemap hostname
email configuration
```

The canonical hostname must be consistent with SEO configuration.

---

# 116. Email Configuration

Inquiry notifications may use:

```text
SMTP
optional transactional email provider
```

The platform must not require a paid provider.

Email failures should not destroy the inquiry record.

---

# 117. Inquiry Reliability

Submission flow:

```text
validate
↓
store inquiry
↓
commit transaction
↓
attempt notification
↓
log notification result
```

Do not lose the lead merely because email delivery fails.

---

# 118. Email Security

Email templates must prevent:

```text
header injection
HTML injection
unsafe links
```

Do not place secrets in email content.

---

# 119. Queueing

A queue may be introduced for:

```text
email
image processing
sitemap regeneration
heavy background tasks
```

The core architecture should work without requiring a paid queue service.

---

# 120. Background Job Reliability

Jobs should support:

```text
retry
backoff
failure logging
idempotency
dead-letter handling where needed
```

Avoid infinite retry loops.

---

# 121. Idempotency

Important operations should avoid duplicate effects.

Examples:

```text
scheduled publish
email notification
media processing
migration task
```

Use idempotency keys or deterministic state transitions where appropriate.

---

# 122. Cron/Scheduled Tasks

Scheduled jobs may handle:

```text
scheduled publishing
cleanup
cache maintenance
health checks
```

Use platform cron or open-source/self-hosted scheduling where available.

---

# 123. No Mandatory Paid Infrastructure

The application must remain functional without mandatory:

```text
paid AI API
paid translation API
paid search API
paid CAPTCHA
paid analytics
paid email provider
paid CDN
```

Optional services may improve scale but must not be hard dependencies for basic operation.

---

# 124. Free/Open Infrastructure

A valid baseline can use:

```text
Next.js
Node.js
PostgreSQL
Prisma
Supabase PostgreSQL
Supabase Storage
SMTP
open-source libraries
self-hosted infrastructure
```

Actual production provider selection may vary.

---

# 125. Vendor Lock-In

Application services should be abstracted behind internal modules where practical.

Examples:

```text
storageService
emailService
searchService
authService
```

This allows providers to be replaced.

---

# 126. Observability Architecture

Recommended layers:

```text
application logs
database logs
deployment logs
error monitoring
performance monitoring
uptime monitoring
```

At minimum, application logs and deployment health must be available.

---

# 127. Error Monitoring

Production should capture:

```text
unhandled exceptions
server errors
failed actions
critical client errors
```

The monitoring service is optional.

Do not expose monitoring credentials to public clients unless specifically designed for that provider.

---

# 128. Performance Monitoring

Measure:

```text
TTFB
LCP
INP
CLS
API latency
database query latency
error rates
```

Use real-user monitoring only if privacy requirements are satisfied.

---

# 129. Privacy-Aware Logging

Do not collect more personal information than required.

For IP/user-agent logging:

```text
define retention
restrict access
document purpose
```

Follow applicable privacy/legal requirements.

---

# 130. Admin Audit Retention

Define a reasonable retention period for:

```text
activity logs
security events
authentication failures
```

Do not retain indefinitely without purpose.

---

# 131. Security Testing

Before production:

```text
dependency scan
authentication tests
authorization tests
XSS tests
CSRF tests
SQL injection tests
file upload tests
SSRF tests
redirect tests
rate-limit tests
```

---

# 132. Performance Testing

Test representative:

```text
homepage
category
product detail
news listing
blog listing
search
admin listing
```

with realistic database/content volumes.

---

# 133. Load Testing

At minimum test:

```text
concurrent homepage requests
product browsing
search
inquiry submission
admin list access
```

The goal is to discover bottlenecks, not to assume a universal traffic number.

---

# 134. Accessibility Performance

Do not sacrifice accessibility for performance.

Examples:

```text
lazy loading
```

must not remove accessible content.

---

# 135. Security Headers Testing

Production verification should inspect:

```text
HTTPS
HSTS
CSP
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
cookie flags
```

---

# 136. Cookie Policy

Admin cookies should use:

```text
HttpOnly
Secure
SameSite
```

as appropriate.

Do not store unnecessary sensitive information in cookies.

---

# 137. Session Cookie Scope

Restrict cookie:

```text
domain
path
lifetime
```

to the minimum required scope.

---

# 138. Admin Route Protection

Every admin page and admin API must be protected server-side.

Do not rely on:

```text
middleware alone
```

if deeper service authorization is still required.

Defense should exist at:

```text
route
service
data
```

layers where appropriate.

---

# 139. Public API Exposure

Do not expose internal admin APIs through public routes.

Keep:

```text
public DTOs
admin DTOs
```

separate.

---

# 140. Data Minimization

Public APIs should return only required fields.

Do not expose:

```text
internal IDs unnecessarily
audit logs
admin notes
private inquiry data
storage secrets
internal metadata
```

---

# 141. Admin Data Export

If exports are implemented:

```text
permission required
audit logged
rate limited
```

Generated files should have controlled access and expiration where appropriate.

---

# 142. Backup Encryption

Backups should be encrypted by the hosting/storage system where available.

If self-hosted:

```text
encrypt backup archives
protect keys separately
```

---

# 143. Recovery Secrets

Recovery credentials should not be stored in the same location as encrypted backups.

Maintain secure emergency access procedures.

---

# 144. Production Checklist

Before launch:

```text
□ HTTPS active
□ DNS correct
□ Production secrets configured
□ Debug disabled
□ Admin auth tested
□ RBAC tested
□ MFA considered/enabled for privileged users
□ Database backups active
□ Storage backups/recovery verified
□ Migrations applied
□ Health endpoint works
□ Error handling verified
□ Rate limits active
□ Inquiry spam protection active
□ File upload restrictions active
□ Security headers active
□ CORS restricted
□ CSP reviewed
□ Sitemap works
□ Robots works
□ Canonicals work
□ Hreflang works
□ Locales work
□ RTL works
□ Images optimized
□ Performance tested
□ E2E smoke tests pass
□ Rollback procedure documented
```

---

# 145. Incident Response

Document what to do for:

```text
credential leak
database compromise
malicious upload
admin account compromise
spam attack
DDoS/resource exhaustion
storage outage
email outage
bad deployment
data corruption
```

Basic process:

```text
detect
contain
preserve evidence
rotate credentials
restore service
verify integrity
communicate
post-incident review
```

---

# 146. Compromised Admin Account

If an admin account is compromised:

```text
disable account
revoke sessions
rotate credentials if required
review audit logs
inspect recent changes
restore malicious changes
enable/verify MFA
```

---

# 147. Malicious File Incident

If a malicious file is detected:

```text
quarantine
remove public access
identify uploader
review access logs
scan related uploads
rotate affected credentials if required
```

---

# 148. Database Incident

If database integrity is questioned:

```text
stop destructive writes if necessary
preserve logs
identify affected records
restore from verified backup if required
run integrity checks
reconcile application state
```

---

# 149. Performance Regression Process

When performance drops:

```text
measure
identify endpoint/page
inspect database
inspect bundle
inspect images
inspect third-party scripts
fix
benchmark
deploy
verify
```

Do not guess at performance problems without measurements.

---

# 150. Security Regression Process

When a security issue is discovered:

```text
reproduce
assess impact
patch
add regression test
rotate secrets if necessary
deploy
review logs
document
```

---

# 151. Production Configuration Validation

At startup/deployment validate required environment variables.

Example:

```text
DATABASE_URL
AUTH configuration
storage configuration
application URL
```

Optional services should not make the application fail if intentionally disabled.

---

# 152. Configuration Schema

Use a typed environment configuration layer.

Validate:

```text
required values
URL formats
booleans
numbers
enum values
```

Fail fast on invalid production configuration.

---

# 153. Build-Time vs Runtime Secrets

Keep secrets available only where required.

Do not bake secrets into:

```text
client bundles
Docker image layers
static output
```

---

# 154. Static Assets

Immutable static assets should use hashed filenames where the framework supports it.

Use long cache lifetimes for:

```text
hashed JS
hashed CSS
fonts
immutable images
```

---

# 155. Cache-Control

Examples:

```text
Immutable static asset:
public, max-age=31536000, immutable

Dynamic public page:
short/controlled caching

Admin:
private, no-store where appropriate
```

Exact policies must follow the hosting architecture.

---

# 156. Database Maintenance

Monitor:

```text
table growth
index size
slow queries
connection count
vacuum/analyze health
storage usage
```

Managed PostgreSQL may handle some maintenance automatically.

---

# 157. Slow Query Monitoring

Track slow queries and optimize using:

```text
EXPLAIN
EXPLAIN ANALYZE
indexes
query restructuring
projection
pagination
```

Do not optimize based only on intuition.

---

# 158. Search Index Maintenance

If PostgreSQL full-text search is used:

```text
maintain search vectors
index them
update on content changes
```

Optional external search can be introduced later without changing public contracts.

---

# 159. Application Startup

Startup should be lightweight.

Avoid:

```text
loading all products
loading all translations
large database migrations
network calls to optional services
```

on every process start.

---

# 160. Graceful Shutdown

Node.js processes should gracefully handle shutdown signals where applicable:

```text
SIGTERM
SIGINT
```

Allow active requests/jobs to finish within a controlled timeout.

---

# 161. Request Timeout

External calls should have explicit timeouts.

Never allow:

```text
unbounded network requests
```

to hold server resources indefinitely.

---

# 162. Retry Policy

Retries should be limited to transient failures.

Do not retry:

```text
validation errors
authorization failures
invalid requests
```

Use exponential backoff for transient service failures.

---

# 163. Availability Targets

Define a realistic availability target based on selected hosting.

Do not promise a percentage until:

```text
hosting
monitoring
backup
recovery
```

are actually configured.

---

# 164. Deployment Documentation

The repository should contain:

```text
README.md
.env.example
deployment documentation
migration instructions
backup/recovery instructions
```

The deployment process must be reproducible by another qualified developer.

---

# 165. AI Coding Agent Directive

When implementing this file:

1. Read all previous blueprint files.
2. Do not weaken security to simplify implementation.
3. Keep all authorization server-side.
4. Never expose secrets to the client.
5. Validate all external input.
6. Sanitize rich content.
7. Protect uploads.
8. Add rate limits to abuse-prone endpoints.
9. Avoid N+1 database queries.
10. Use appropriate indexes.
11. Cache public content safely.
12. Keep private/admin data out of public caches.
13. Use locale-aware cache keys.
14. Preserve SEO behavior during optimization.
15. Keep migrations versioned.
16. Never silently alter production data.
17. Make deployment reproducible.
18. Keep backups and restore procedures documented.
19. Add regression tests for security fixes.
20. Avoid mandatory paid infrastructure.
21. Keep provider-specific code behind service abstractions.
22. Do not introduce AI/chat functionality.
23. Do not add public customer accounts.
24. Do not introduce ecommerce/payment functionality unless explicitly requested in a future scope.
25. Do not fabricate medical, certification or product claims.

---

# 166. Final Production Architecture

```text
                    INTERNET
                       │
                    HTTPS
                       │
              CDN / Edge Cache
                       │
                Next.js Application
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     Public         Admin          API/Actions
        │              │              │
        │          Auth + RBAC        │
        │              │              │
        └──────────────┼──────────────┘
                       │
                Application Services
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
     PostgreSQL     Object Store   Email
          │            │            │
          └────────────┼────────────┘
                       │
                Monitoring/Logs
                       │
                 Backup/Recovery
```

---

# 167. Final Acceptance Criteria

The implementation is production-ready when:

```text
Security
✓ Admin authentication works
✓ RBAC works server-side
✓ Sessions are secure
✓ CSRF protections are active
✓ XSS protections are active
✓ SQL injection protections are active
✓ SSRF protections exist where needed
✓ Upload validation exists
✓ Rate limiting exists
✓ Secrets are protected
✓ Security headers are configured
✓ Audit logging works

Performance
✓ Public pages render efficiently
✓ Client JS is minimized
✓ Images are optimized
✓ Database queries are indexed
✓ N+1 issues are avoided
✓ Public caching works safely
✓ Private/admin data is not publicly cached
✓ Search is performant
✓ Core Web Vitals are measured

Deployment
✓ Environment separation exists
✓ Production configuration is validated
✓ Migrations are versioned
✓ CI passes
✓ Deployment is reproducible
✓ Health checks work
✓ Backups are active
✓ Restore procedure is documented
✓ Rollback procedure exists
✓ Monitoring/logging exists
✓ Smoke tests pass

Reliability
✓ Inquiry data survives email failures
✓ Background tasks are retry-safe
✓ External calls have timeouts
✓ Graceful shutdown works
✓ Error handling is safe

SEO Compatibility
✓ HTTPS works
✓ Canonical URLs remain correct
✓ Hreflang remains correct
✓ Sitemap remains correct
✓ Robots remains correct
✓ Locale-aware caching works
```

---

# 168. Completion Definition

The security, performance and deployment layer is complete when the application can move from development to production through a controlled, repeatable process while maintaining:

```text
confidentiality
integrity
availability
performance
recoverability
auditability
SEO correctness
accessibility
maintainability
```

without requiring mandatory paid infrastructure and without weakening the public B2B catalogue/lead-generation architecture.
