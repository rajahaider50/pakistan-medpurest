# MedPurest Clone Blueprint — API & Backend Specification

**File:** `08-API-BACKEND-SPEC.md`  
**Project:** MedPurest-style B2B Medical Product Catalogue & Lead Generation Platform  
**Frontend:** Next.js + React + TypeScript  
**Backend:** Next.js server-first/hybrid application layer  
**Database:** PostgreSQL  
**ORM:** Prisma recommended  
**Status:** Implementation Specification

---

# 1. Purpose

This document defines the application backend and API contract for the platform.

The backend is responsible for:

- Public content delivery
- Product catalogue queries
- Search
- Multilingual content resolution
- Admin authentication
- RBAC authorization
- CMS mutations
- Product management
- Media management
- Inquiry/lead processing
- SEO management
- Navigation
- Site settings
- Audit logging
- Validation
- Security
- Caching
- Database access
- Error handling

The backend must support both the public website and the private admin panel without exposing privileged functionality to public users.

---

# 2. Backend Architecture

Recommended:

```text
Browser
   │
   ├── Public Website
   │
   └── Admin Panel
          │
          ▼
   Next.js Server Layer
          │
   ┌──────┼─────────────┐
   ▼      ▼             ▼
Queries  Mutations    Auth/RBAC
   │      │             │
   └──────┼─────────────┘
          ▼
     Domain Services
          │
          ▼
      Repository/
      Data Access
          │
          ▼
      PostgreSQL
          │
          ├── Object Storage
          └── Optional Email/External Services
```

---

# 3. Backend Principles

1. Server is authoritative.
2. Client input is never trusted.
3. Authentication and authorization are separate concerns.
4. Public APIs expose only published/public data.
5. Admin APIs require authentication and permissions.
6. Validation occurs at the server boundary.
7. Database constraints remain authoritative for integrity.
8. Business rules belong in domain/service code.
9. Reusable data-access functions prevent duplicated logic.
10. Mutations should be transactional where multiple records change.
11. Errors should be predictable and safe.
12. Secrets never reach the browser.
13. No mandatory paid API dependency.
14. No public customer account system.
15. No AI agent/chat backend.

---

# 4. API Style

The application may use a combination of:

```text
Server Components
Server Actions
Route Handlers
Internal service functions
```

Do not create HTTP endpoints merely for internal server-to-server calls when a direct server function is more appropriate.

Use Route Handlers when an actual HTTP API is required.

---

# 5. Server Components

Use Server Components for:

```text
Public product pages
Public content pages
Admin initial page data
SEO metadata
Server-rendered lists
```

Benefits:

- Reduced client JavaScript
- Direct server-side data access
- Better SEO
- Lower data exposure

---

# 6. Server Actions

Use Server Actions for controlled application mutations such as:

```text
Create product
Update product
Publish content
Change inquiry status
Save site settings
Create redirect
Upload metadata
```

Every Server Action must perform:

```text
Authentication check
Authorization check
Input validation
Business rule validation
Database operation
Audit logging when required
```

Never treat a Server Action as trusted merely because it is called from an admin UI.

---

# 7. Route Handlers

Use Route Handlers for cases such as:

```text
POST /api/inquiries
GET /api/search
GET /api/products
GET /api/sitemap
POST /api/webhooks/*
GET /api/health
```

Only create endpoints that have a real integration or HTTP requirement.

---

# 8. API Versioning

For externally consumed APIs, use:

```text
/api/v1
```

For internal application-only endpoints, versioning may be unnecessary.

Example:

```text
/api/v1/products
/api/v1/inquiries
/api/v1/search
```

The first-party frontend may use server functions instead of public API calls.

---

# 9. Content API Categories

Backend API domains:

```text
Products
Categories
News
Blog
Videos
Certificates
Honors
History
Culture
Pages
Homepage
Navigation
Languages
SEO
Media
Inquiries
Admin
```

---

# 10. Public API Security Model

Public endpoints may expose:

```text
Published products
Published categories
Published content
Public media
Public site settings
Search results
```

They must not expose:

```text
Draft content
Admin users
Roles
Permissions
Internal notes
Activity logs
Private media
Secrets
Unpublished inquiries
```

---

# 11. Public Product Endpoints

Recommended:

```text
GET /api/v1/products
GET /api/v1/products/:slug
GET /api/v1/categories
GET /api/v1/categories/:slug
```

If first-party frontend uses Server Components, equivalent internal service functions should be preferred.

---

# 12. Product List Parameters

Possible:

```text
language
category
search
tag
featured
page
limit
sort
```

Example concept:

```text
/api/v1/products?language=en&category=surgical-gowns&page=1&limit=20
```

Validate every query parameter.

---

# 13. Product List Response

Recommended shape:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "totalPages": 0
  }
}
```

Do not expose internal database fields unnecessarily.

---

# 14. Product Detail Response

Conceptual shape:

```json
{
  "id": "uuid",
  "code": "PRODUCT-001",
  "name": "Surgical Gown",
  "slug": "surgical-gown",
  "description": "...",
  "features": [],
  "applications": [],
  "specifications": [],
  "images": [],
  "documents": [],
  "videos": [],
  "relatedProducts": [],
  "seo": {}
}
```

Only published content should be returned publicly.

---

# 15. Product Service

Recommended internal service:

```text
productService
```

Responsibilities:

```text
getPublishedProducts()
getPublishedProductBySlug()
searchProducts()
createProduct()
updateProduct()
publishProduct()
archiveProduct()
deleteProduct()
```

Keep business rules inside service/domain code rather than UI components.

---

# 16. Category API

Recommended:

```text
GET /api/v1/categories
GET /api/v1/categories/:slug
```

Public response should contain only categories visible in the selected language.

---

# 17. News API

Recommended:

```text
GET /api/v1/news
GET /api/v1/news/:slug
GET /api/v1/news/categories
```

Parameters:

```text
language
category
page
limit
search
```

Only published news is public.

---

# 18. Blog API

Recommended:

```text
GET /api/v1/blog
GET /api/v1/blog/:slug
GET /api/v1/blog/categories
```

Only published posts should be returned publicly.

---

# 19. Video API

Recommended:

```text
GET /api/v1/videos
GET /api/v1/videos/:slug
```

Return only published videos.

---

# 20. Certificate API

Recommended:

```text
GET /api/v1/certificates
GET /api/v1/certificates/:id
```

If certificates do not require public detail pages, only the listing endpoint is necessary.

---

# 21. Corporate Content API

Potential public endpoints:

```text
GET /api/v1/pages/:slug
GET /api/v1/history
GET /api/v1/honors
GET /api/v1/culture
GET /api/v1/about
```

The first-party website may instead resolve these through internal server services.

---

# 22. Homepage Data

Recommended internal service:

```text
homepageService.getPublishedHomepage(language)
```

It should return:

```text
Hero
Statistics
Featured Products
Featured Categories
Reasons
Latest News
CTA
```

Only published/visible records should be included.

---

# 23. Search API

Recommended:

```text
GET /api/v1/search
```

Parameters:

```text
q
language
type
page
limit
```

Possible `type` values:

```text
all
products
news
blog
pages
```

---

# 24. Search Rules

Search must:

1. Normalize input.
2. Enforce a reasonable maximum query length.
3. Apply language filtering.
4. Apply publication filtering.
5. Limit result count.
6. Use indexed database search.
7. Avoid unbounded wildcard queries.
8. Return content type with each result.

---

# 25. Search Response

Example:

```json
{
  "data": [
    {
      "type": "product",
      "title": "Surgical Gown",
      "slug": "surgical-gown",
      "excerpt": "...",
      "url": "/products/surgical-gown"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```

---

# 26. Inquiry Submission API

Primary public lead endpoint:

```text
POST /api/v1/inquiries
```

Fields may include:

```text
name
company
email
phone
whatsapp
country
productId
quantity
message
language
sourceUrl
```

Optional attribution:

```text
utm_source
utm_medium
utm_campaign
utm_term
utm_content
```

---

# 27. Inquiry Validation

Required:

```text
Name
At least one valid contact method
Message where required by business rules
```

If email is supplied:

```text
Validate email format
```

If quantity is supplied:

```text
Validate numeric range
```

Never trust a client-supplied product name as the canonical product identity.

Use:

```text
productId
```

and resolve the product server-side.

---

# 28. Inquiry Spam Protection

Use layered controls:

```text
Rate limiting
Honeypot field
Origin/referrer checks where appropriate
Input validation
Duplicate detection where useful
Optional CAPTCHA integration
```

CAPTCHA must remain optional rather than a mandatory paid dependency.

---

# 29. Inquiry Response

Do not return internal lead details.

Successful response:

```json
{
  "success": true,
  "message": "Your inquiry has been submitted successfully."
}
```

Do not expose:

```text
database ID
internal status
assigned user
internal notes
```

unless there is a specific trusted integration requirement.

---

# 30. Inquiry Processing

After validation:

```text
Receive request
   ↓
Rate limit
   ↓
Validate input
   ↓
Resolve product
   ↓
Create inquiry
   ↓
Create initial activity/status record
   ↓
Optional email notification
   ↓
Return success
```

The database transaction should cover the records that must be created atomically.

---

# 31. Admin Inquiry API

Recommended:

```text
GET /api/v1/admin/inquiries
GET /api/v1/admin/inquiries/:id
PATCH /api/v1/admin/inquiries/:id
POST /api/v1/admin/inquiries/:id/notes
POST /api/v1/admin/inquiries/:id/assign
```

All require appropriate permissions.

---

# 32. Inquiry Status Update

Allowed status transitions should be defined centrally.

Typical lifecycle:

```text
New
 ↓
Contacted
 ↓
Qualified
 ↓
Quoted
 ↓
Negotiating
 ↓
Converted
 ↓
Closed
```

`Spam` may be reached from appropriate stages.

The service must validate transitions.

---

# 33. Admin Product API

Possible:

```text
GET    /api/v1/admin/products
POST   /api/v1/admin/products
GET    /api/v1/admin/products/:id
PATCH  /api/v1/admin/products/:id
DELETE /api/v1/admin/products/:id

POST /api/v1/admin/products/:id/publish
POST /api/v1/admin/products/:id/archive
POST /api/v1/admin/products/:id/duplicate
```

Authorization:

```text
products.view
products.create
products.edit
products.delete
products.publish
products.archive
```

---

# 34. Product Create Flow

```text
Authenticate
   ↓
Authorize
   ↓
Validate base fields
   ↓
Validate category
   ↓
Validate translations
   ↓
Validate media references
   ↓
Create product
   ↓
Create translations/specifications/relations
   ↓
Write audit log
   ↓
Return product
```

Use a transaction for the multi-record operation.

---

# 35. Product Update Flow

Do not blindly overwrite the complete entity.

Validate:

```text
Editable fields
Relations
Translations
Status
Slug
Media
```

Use partial updates where appropriate.

---

# 36. Product Publish Flow

Publishing must verify:

```text
Required product fields
At least one valid translation
Valid category
Required public media where applicable
SEO requirements
No invalid references
```

Then:

```text
Set status = published
Set published_at
Invalidate relevant caches
Write audit log
```

---

# 37. Product Archive Flow

Archive should:

```text
Set status = archived
Invalidate public cache
Remove from public listing
Preserve product data
Write audit log
```

Do not automatically delete the product.

---

# 38. Admin Category API

Recommended:

```text
GET    /api/v1/admin/categories
POST   /api/v1/admin/categories
PATCH  /api/v1/admin/categories/:id
DELETE /api/v1/admin/categories/:id
POST   /api/v1/admin/categories/reorder
```

Prevent circular parent relationships.

---

# 39. Admin News API

Recommended:

```text
GET    /api/v1/admin/news
POST   /api/v1/admin/news
GET    /api/v1/admin/news/:id
PATCH  /api/v1/admin/news/:id
DELETE /api/v1/admin/news/:id
POST   /api/v1/admin/news/:id/publish
POST   /api/v1/admin/news/:id/archive
```

---

# 40. Admin Blog API

Recommended:

```text
GET    /api/v1/admin/blog
POST   /api/v1/admin/blog
GET    /api/v1/admin/blog/:id
PATCH  /api/v1/admin/blog/:id
DELETE /api/v1/admin/blog/:id
POST   /api/v1/admin/blog/:id/publish
POST   /api/v1/admin/blog/:id/archive
```

---

# 41. Admin Video API

Recommended:

```text
GET    /api/v1/admin/videos
POST   /api/v1/admin/videos
PATCH  /api/v1/admin/videos/:id
DELETE /api/v1/admin/videos/:id
```

Validate external video URLs.

---

# 42. Admin Certificate API

Recommended:

```text
GET    /api/v1/admin/certificates
POST   /api/v1/admin/certificates
PATCH  /api/v1/admin/certificates/:id
DELETE /api/v1/admin/certificates/:id
```

---

# 43. Admin Corporate Content APIs

Recommended resource pattern:

```text
/admin/history
/admin/honors
/admin/culture
/admin/pages
```

Each mutation must use the same authorization and validation architecture.

---

# 44. Homepage Admin API

Recommended:

```text
GET /api/v1/admin/homepage
PATCH /api/v1/admin/homepage
POST /api/v1/admin/homepage/publish
```

Homepage child sections may have dedicated mutation services.

---

# 45. Media API

Recommended:

```text
GET  /api/v1/admin/media
POST /api/v1/admin/media
GET  /api/v1/admin/media/:id
PATCH /api/v1/admin/media/:id
DELETE /api/v1/admin/media/:id
```

Actual binary upload may use:

```text
direct storage upload
signed upload URL
```

rather than sending large files through the application server.

---

# 46. Media Upload Flow

Recommended:

```text
Admin requests upload authorization
        ↓
Server verifies permission
        ↓
Server creates safe storage target
        ↓
Client uploads to storage
        ↓
Server validates/records metadata
        ↓
Media row created
        ↓
Audit log
```

Do not allow arbitrary storage paths supplied by the browser.

---

# 47. Media Delete Flow

Before deleting:

```text
Check authorization
Check usage references
Check whether media is required
```

If actively used:

```text
Block deletion
```

or require explicit replacement workflow.

---

# 48. Navigation API

Recommended:

```text
GET /api/v1/navigation
GET /api/v1/admin/navigation
PATCH /api/v1/admin/navigation
```

Admin mutation requires:

```text
navigation.manage
```

---

# 49. Language API

Public:

```text
GET /api/v1/languages
```

Admin:

```text
GET /api/v1/admin/languages
POST /api/v1/admin/languages
PATCH /api/v1/admin/languages/:id
```

Only enabled languages should be publicly selectable.

---

# 50. Translation API

Possible:

```text
GET /api/v1/admin/translations
PATCH /api/v1/admin/translations/:resource/:id
```

The implementation may instead use resource-specific mutations.

Translation authorization should be independent from ordinary content publishing where required.

---

# 51. SEO API

Admin:

```text
GET /api/v1/admin/seo
PATCH /api/v1/admin/seo
GET /api/v1/admin/redirects
POST /api/v1/admin/redirects
PATCH /api/v1/admin/redirects/:id
DELETE /api/v1/admin/redirects/:id
```

---

# 52. Site Settings API

Admin:

```text
GET /api/v1/admin/settings
PATCH /api/v1/admin/settings
```

Settings must be grouped and validated.

Never return secret values to the browser after storage.

For example:

```text
smtp_password
```

should not be returned as plaintext.

---

# 53. User API

Admin:

```text
GET    /api/v1/admin/users
POST   /api/v1/admin/users
GET    /api/v1/admin/users/:id
PATCH  /api/v1/admin/users/:id
POST   /api/v1/admin/users/:id/disable
POST   /api/v1/admin/users/:id/reset-access
```

Permissions:

```text
users.view
users.create
users.edit
users.disable
```

---

# 54. Role API

Admin:

```text
GET   /api/v1/admin/roles
POST  /api/v1/admin/roles
PATCH /api/v1/admin/roles/:id
```

Permission changes must be audited.

---

# 55. Activity Log API

Admin:

```text
GET /api/v1/admin/activity-logs
GET /api/v1/admin/activity-logs/:id
```

Ordinary users should not mutate logs.

---

# 56. Authentication Service

Recommended internal service:

```text
authService
```

Responsibilities:

```text
signIn
signOut
getCurrentUser
requireUser
requirePermission
requireRole
```

---

# 57. Authorization Service

Recommended:

```text
authorizationService
```

Functions:

```text
hasPermission(user, permission)
requirePermission(permission)
hasRole(user, role)
requireRole(role)
```

Do not duplicate authorization rules across dozens of route handlers.

---

# 58. Permission Enforcement

Every protected mutation should follow:

```text
const user = await requireUser();
await requirePermission(user, "products.edit");
const input = validate(...);
await service.update(...);
```

The exact implementation can differ, but the order matters.

---

# 59. Resource-Level Authorization

Permissions alone may not be enough.

For some future roles, enforce:

```text
resource ownership
assigned-team restrictions
language restrictions
content scope
```

Example:

```text
Translator may edit translations
but may not publish the original content.
```

---

# 60. Validation Layer

Recommended validation library:

```text
Zod
```

Use shared schemas where possible.

Example conceptual structure:

```text
schemas/
├── product.schema.ts
├── inquiry.schema.ts
├── news.schema.ts
├── blog.schema.ts
├── media.schema.ts
└── settings.schema.ts
```

---

# 61. Input Validation Rules

Validate:

```text
Required fields
String length
Enum values
UUID format
Slug format
URLs
Email
Dates
Numbers
Arrays
Nested objects
```

Reject unexpected or unsafe input where appropriate.

---

# 62. Rich Text Validation

Rich text must be sanitized before rendering.

Do not render arbitrary submitted HTML directly.

Allow only a controlled subset:

```text
p
h2
h3
strong
em
ul
ol
li
a
blockquote
img
table
```

The exact allowlist depends on the chosen editor.

---

# 63. URL Validation

External URLs should validate:

```text
https
```

where HTTPS is expected.

Do not allow dangerous protocols such as:

```text
javascript:
data:
vbscript:
```

unless a narrowly controlled use case explicitly requires them.

---

# 64. Error Model

Use predictable errors.

Recommended shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please correct the highlighted fields.",
    "fields": {
      "email": "Invalid email address."
    }
  }
}
```

Do not expose stack traces.

---

# 65. Error Codes

Suggested:

```text
UNAUTHORIZED
FORBIDDEN
VALIDATION_ERROR
NOT_FOUND
CONFLICT
RATE_LIMITED
INVALID_STATE
UPLOAD_FAILED
DATABASE_ERROR
INTERNAL_ERROR
```

---

# 66. HTTP Status Codes

Recommended:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error
```

---

# 67. Not Found Behavior

Public content:

```text
404
```

Admin:

```text
404
```

Do not reveal whether a private resource exists when the current user is unauthorized.

---

# 68. Conflict Handling

Use `409 Conflict` for:

```text
Duplicate slug
Duplicate product code
Concurrent update
Invalid uniqueness condition
```

Example:

```json
{
  "error": {
    "code": "SLUG_CONFLICT",
    "message": "This slug is already in use."
  }
}
```

---

# 69. Database Error Handling

Map known database errors to safe application errors.

Never return raw:

```text
SQL
stack trace
database host
connection details
```

---

# 70. Transactions

Use transactions for:

```text
Create/update product with translations
Publish content + audit
Inquiry + status history
Role + permission changes
Menu reorder
Bulk content operations
```

Avoid long transactions containing network requests.

---

# 71. External Services and Transactions

Do not hold a database transaction open while waiting for:

```text
Email API
External HTTP API
Large file upload
```

Instead:

```text
Commit database state
then process external side effect
```

or use a reliable background job/outbox pattern where required.

---

# 72. Email Notifications

Email is optional infrastructure.

Potential notifications:

```text
New inquiry
Inquiry assignment
Password reset
Admin invitation
```

Core content functionality must not fail permanently because an email provider is unavailable.

---

# 73. Email Failure Handling

For inquiry submission:

```text
Create inquiry successfully
        ↓
Attempt notification
        ↓
If notification fails:
  retain inquiry
  log notification failure
```

Do not roll back a valid lead solely because notification email failed unless business requirements explicitly demand atomic notification.

---

# 74. Webhooks

If external webhooks are later required:

```text
/api/v1/webhooks/*
```

Requirements:

```text
Signature verification
Replay protection
Rate limiting
Idempotency
Audit logging
```

No webhook should be trusted based only on its URL.

---

# 75. Idempotency

Use idempotency for operations where duplicate requests can cause duplicate business records.

Important example:

```text
Inquiry submission
Webhook processing
Payment/order operations if added later
```

Although ecommerce is not currently implemented, the backend should not make idempotency impossible.

---

# 76. Rate Limiting

Apply rate limiting to:

```text
Admin login
Public inquiry submission
Search
Public API
Password reset
Webhook endpoints
```

Different endpoints may have different limits.

---

# 77. Public API Rate Limits

Do not choose arbitrary production limits without measuring traffic.

The system should support configurable limits.

Example conceptual policy:

```text
Search: moderate
Inquiry: strict
Login: very strict
Static content: generous
```

---

# 78. Caching Architecture

Public content is highly cacheable.

Recommended layers:

```text
Next.js server cache
CDN/cache where available
Database query optimization
```

Cache candidates:

```text
Homepage
Categories
Published product lists
Product details
News
Blog
Navigation
Site settings
Languages
```

---

# 79. Cache Invalidation

When content changes:

```text
Product published
    → invalidate product page
    → invalidate category
    → invalidate homepage if featured
    → invalidate search where needed
```

Similar rules apply to:

```text
News
Blog
Navigation
Site Settings
```

---

# 80. Revalidation Strategy

Use route/tag-based revalidation where practical.

Example conceptual tags:

```text
products
product:{id}
product-slug:{language}:{slug}
category:{id}
news
blog
navigation
settings
homepage:{language}
```

Do not invalidate the entire site for every small content update.

---

# 81. Public Cache Safety

Never cache personalized/private data in public caches.

Never cache:

```text
Admin pages
Inquiry details
Internal notes
User data
Role data
```

unless cache isolation is explicitly guaranteed.

---

# 82. Database Access Layer

Recommended structure:

```text
src/
├── server/
│   ├── auth/
│   ├── permissions/
│   ├── services/
│   ├── repositories/
│   ├── validators/
│   ├── queries/
│   └── mutations/
```

---

# 83. Repository Responsibilities

Repositories handle:

```text
Database queries
Relations
Pagination
Transactions where appropriate
```

Repositories should not contain UI concerns.

---

# 84. Service Responsibilities

Services handle:

```text
Business rules
State transitions
Authorization coordination
Multi-step workflows
Audit events
Cache invalidation
```

---

# 85. Query/Mutation Separation

Recommended:

```text
Queries → read-only
Mutations → state changes
```

This improves predictability.

---

# 86. Data Transfer Objects

Do not return Prisma/database objects directly everywhere.

Use application DTOs where useful.

Benefits:

```text
Prevent accidental field exposure
Stable API contracts
Clear public/admin boundaries
Easier future database changes
```

---

# 87. Public DTO Example

Public product DTO:

```text
id
code
name
slug
shortDescription
description
features
applications
specifications
images
documents
videos
relatedProducts
seo
```

Do not include:

```text
createdBy
updatedBy
internal metadata
draft state
admin notes
audit data
```

---

# 88. Admin DTO Example

Admin product DTO may additionally include:

```text
status
createdAt
updatedAt
createdBy
updatedBy
translation completeness
media usage
```

Only return fields appropriate to the current permission scope.

---

# 89. Pagination Contract

Use a consistent format:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 120,
    "totalPages": 6
  }
}
```

For cursor-based APIs:

```json
{
  "data": [],
  "nextCursor": "..."
}
```

Do not mix pagination styles randomly within equivalent modules.

---

# 90. Filtering Contract

Use predictable names:

```text
status
category
language
search
featured
dateFrom
dateTo
assignedTo
```

Validate enum values and date ranges.

---

# 91. Sorting Contract

Example:

```text
sort=createdAt
order=desc
```

Do not allow arbitrary SQL expressions as sort values.

Map accepted fields explicitly:

```text
createdAt → created_at
updatedAt → updated_at
sortOrder → sort_order
```

---

# 92. Bulk API

For safe bulk operations:

```text
POST /api/v1/admin/products/bulk
```

Payload:

```json
{
  "action": "archive",
  "ids": ["..."]
}
```

Validate:

```text
action
IDs
permissions
maximum batch size
state transitions
```

---

# 93. Bulk Operation Safety

Do not allow unrestricted:

```text
DELETE ALL
```

Use:

```text
explicit IDs
bounded batch sizes
confirmation
audit log
```

---

# 94. File Upload Constraints

Server/storage layer should enforce:

```text
Maximum file size
Allowed MIME types
Allowed extensions
Image dimensions where required
```

Typical content types:

```text
image/jpeg
image/png
image/webp
image/avif
application/pdf
```

Exact limits should be configurable.

---

# 95. Image Processing

Recommended workflow:

```text
Upload original
   ↓
Validate
   ↓
Generate optimized derivatives
   ↓
Store metadata
   ↓
Serve responsive versions
```

Use the framework/image pipeline where practical.

Do not require a paid image API.

---

# 96. Database Health Endpoint

Internal health endpoint:

```text
GET /api/health
```

Should verify basic application health.

Do not expose:

```text
database credentials
connection strings
internal infrastructure details
```

A minimal response:

```json
{
  "status": "ok"
}
```

---

# 97. Readiness vs Liveness

If deployment requires advanced health checks:

```text
/api/health/live
/api/health/ready
```

Liveness:

```text
Application process is running.
```

Readiness:

```text
Application can serve required dependencies.
```

Do not make readiness unnecessarily dependent on non-critical external services.

---

# 98. Logging

Backend logs should include:

```text
timestamp
level
request/correlation ID
route/action
user ID when available
duration
result
error code
```

Avoid logging:

```text
passwords
tokens
full personal data
secrets
```

---

# 99. Correlation IDs

For significant requests:

```text
request_id
```

should be generated or propagated safely.

This helps connect:

```text
request
database error
email failure
audit event
```

---

# 100. Observability

Monitor:

```text
API latency
Database latency
Error rates
Rate-limit events
Failed logins
Inquiry failures
Upload failures
Cache performance
```

The first release does not require a paid observability platform.

Structured application logs are sufficient initially.

---

# 101. Security Headers

Application should configure appropriate headers, including where applicable:

```text
Content-Security-Policy
X-Content-Type-Options
Referrer-Policy
Strict-Transport-Security
Permissions-Policy
```

The exact CSP must be compatible with required media, maps, analytics, and video providers.

---

# 102. CORS

Do not enable broad:

```text
Access-Control-Allow-Origin: *
```

for privileged endpoints.

If an API is same-origin, avoid unnecessary CORS configuration.

---

# 103. CSRF

For cookie-authenticated mutations, apply the framework's recommended CSRF protections or use same-origin protections appropriately.

Do not assume that:

```text
POST = automatically safe
```

---

# 104. SSRF Protection

If the server fetches user-provided URLs, validate and restrict destinations.

Avoid arbitrary server-side URL fetching.

Examples requiring caution:

```text
Remote image import
URL preview
External document fetching
Webhook configuration
```

---

# 105. SQL Injection Protection

Use Prisma parameterized queries or safe SQL parameterization.

Do not concatenate user input into SQL.

If raw SQL is necessary:

```text
parameterize values
```

and review it explicitly.

---

# 106. Authorization Testing

Test:

```text
Unauthenticated user → protected endpoint
Authenticated low-role user → admin endpoint
Wrong resource ID → protected resource
Translator → publish operation
Sales manager → product mutation
Content manager → role mutation
```

All must enforce server-side authorization.

---

# 107. Public/Private Boundary

The backend must maintain a strict boundary:

```text
PUBLIC
  ↓
Published content only

ADMIN
  ↓
Authenticated + authorized
  ↓
Draft/private/internal content
```

Never solve this by hiding links.

---

# 108. Draft Preview

Draft preview should use a protected mechanism.

Possible:

```text
Preview token
Authenticated admin session
Signed short-lived preview URL
```

Never expose all drafts through a public query parameter without authorization.

---

# 109. SEO Backend

Backend must provide data needed for:

```text
metadata
canonical URL
alternate language URLs
Open Graph
robots
sitemap
structured data
```

The final rendering layer can generate HTML metadata.

---

# 110. Sitemap Generation

Sitemap should include only:

```text
published
indexable
canonical
public
```

content.

Exclude:

```text
draft
archived
noindex
admin
search results
private pages
```

---

# 111. Robots Generation

Robots configuration should protect admin routes:

```text
/admin/
```

and other private paths.

Do not rely on robots.txt for security.

Security must be enforced by authentication/authorization.

---

# 112. API Documentation

If external API consumption is required, generate:

```text
OpenAPI specification
```

Otherwise, maintain this document plus typed server contracts.

Do not create an OpenAPI layer solely for internal Server Actions.

---

# 113. API Contract Stability

When changing public API response shapes:

```text
Avoid silent breaking changes
```

Prefer:

```text
additive changes
versioning
deprecation period
```

---

# 114. Backward Compatibility

Internal frontend and backend code can evolve together.

For public/external consumers:

```text
/api/v1
```

must remain stable unless a breaking version is introduced.

---

# 115. Backend Testing

Required:

### Unit

```text
Validators
Permission checks
State transitions
Utility functions
```

### Integration

```text
Database queries
Services
Mutations
Auth
RBAC
```

### E2E

```text
Admin login
Product creation
Product publishing
Inquiry submission
Inquiry management
Media upload
Translation workflow
SEO changes
Logout
```

---

# 116. API Test Matrix

At minimum test:

```text
Public GET
Public POST inquiry
Unauthorized admin GET
Unauthorized admin POST
Authorized content mutation
Forbidden mutation
Validation failure
Not found
Conflict
Rate limited request
Database failure
External notification failure
```

---

# 117. Performance Testing

Measure:

```text
Homepage response
Product listing
Product detail
Search
News listing
Admin inquiry listing
Admin product listing
Media library
```

Test with realistic record counts.

---

# 118. Backend Deployment

Recommended environment separation:

```text
development
staging
production
```

Each environment should have separate:

```text
database
storage
secrets
authentication configuration
```

Do not connect local development directly to production data.

---

# 119. Environment Variables

Examples:

```text
DATABASE_URL
DIRECT_DATABASE_URL
AUTH_SECRET
NEXT_PUBLIC_SITE_URL
STORAGE_ENDPOINT
STORAGE_BUCKET
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
```

Only variables explicitly intended for browsers may use:

```text
NEXT_PUBLIC_
```

Never expose:

```text
DATABASE_URL
AUTH_SECRET
service-role keys
SMTP_PASSWORD
```

---

# 120. Database Connection Strategy

For serverless deployments:

```text
connection pooling
```

may be required.

Keep connection limits aligned with deployment concurrency.

Do not create a new unmanaged database pool for every request.

---

# 121. Backend Module Structure

Recommended:

```text
src/
├── app/
│   ├── api/
│   └── admin/
├── server/
│   ├── auth/
│   ├── authorization/
│   ├── database/
│   ├── services/
│   │   ├── product/
│   │   ├── content/
│   │   ├── inquiry/
│   │   ├── media/
│   │   ├── seo/
│   │   └── settings/
│   ├── repositories/
│   ├── validators/
│   ├── cache/
│   ├── audit/
│   └── email/
├── lib/
└── types/
```

---

# 122. Domain Service Example

Conceptual:

```text
productService.publishProduct(productId, actor)
```

Internally:

```text
require permission
load product
validate publish requirements
update status
create audit event
invalidate cache
return DTO
```

The UI should not implement these rules itself.

---

# 123. Database Transaction Example

Product creation may conceptually execute:

```text
BEGIN

create product
create translations
create specifications
create relations
create media references
create audit log

COMMIT
```

If any required operation fails:

```text
ROLLBACK
```

---

# 124. Audit Strategy

Audit important mutations:

```text
Create
Update
Publish
Archive
Delete
Role changes
Permission changes
Settings changes
Inquiry assignment/status
Login security events
```

Avoid auditing every harmless read.

---

# 125. API Acceptance Criteria

Backend is complete when:

1. Public content APIs return only public/published data.
2. Admin mutations require authentication.
3. Admin mutations require correct permissions.
4. Input validation exists at the server boundary.
5. Product APIs support full catalogue workflows.
6. CMS APIs support content lifecycle.
7. Inquiry API safely accepts leads.
8. Inquiry spam controls exist.
9. Media upload is secure.
10. Search is indexed and bounded.
11. Multilingual content is resolved correctly.
12. SEO data is accessible to the rendering layer.
13. Cache invalidation is implemented for content mutations.
14. Errors use predictable structures.
15. Database transactions protect multi-record operations.
16. External notification failures do not destroy valid inquiry data.
17. Secrets never reach clients.
18. Audit logs record sensitive mutations.
19. Rate limiting protects high-risk endpoints.
20. Health checks exist.
21. Logging is structured.
22. Security tests cover authorization boundaries.
23. No public login/signup/OTP exists.
24. No AI agent/chat backend exists.
25. No mandatory paid API is required.

---

# 126. Recommended Implementation Order

```text
1. Database client
2. Environment configuration
3. Authentication
4. Authorization/RBAC
5. Validation framework
6. Error framework
7. Core repositories
8. Product service
9. Category service
10. Public content services
11. Inquiry service
12. Media service
13. CMS services
14. SEO services
15. Navigation/settings services
16. Cache/revalidation
17. Audit logging
18. Rate limiting
19. Health checks
20. Automated tests
21. Security hardening
22. Performance testing
```

---

# 127. Final Backend Architecture

```text
                  CLIENT
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
     PUBLIC SITE          ADMIN PANEL
          │                   │
          └─────────┬─────────┘
                    ▼
              NEXT.JS SERVER
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
   Queries       Mutations    Auth/RBAC
       │            │            │
       └────────────┼────────────┘
                    ▼
              DOMAIN SERVICES
                    │
             ┌──────┴──────┐
             ▼             ▼
        REPOSITORIES     CACHE
             │
             ▼
          POSTGRES
             │
      ┌──────┴──────┐
      ▼             ▼
   STORAGE        EMAIL
```

---

# 128. Final Directive for AI Coding Agents

When implementing the backend:

1. Read all previous blueprint files first.
2. Treat this document as the backend/API source of truth.
3. Keep public and admin data boundaries strict.
4. Prefer Server Components for server-rendered reads.
5. Prefer Server Actions for first-party mutations where appropriate.
6. Use Route Handlers when a real HTTP API is required.
7. Validate every mutation server-side.
8. Authorize every protected operation server-side.
9. Never trust hidden UI controls as authorization.
10. Use transactions for multi-record business operations.
11. Keep external network calls outside long database transactions.
12. Use DTOs to control data exposure.
13. Keep database access in repositories/services.
14. Keep business rules out of React components.
15. Use parameterized queries.
16. Sanitize rich text.
17. Protect file uploads.
18. Rate-limit authentication and public lead endpoints.
19. Keep secrets server-only.
20. Implement cache invalidation deliberately.
21. Audit sensitive mutations.
22. Test unauthorized and forbidden paths explicitly.
23. Keep APIs typed and predictable.
24. Avoid unnecessary endpoints.
25. Do not introduce public accounts.
26. Do not introduce ecommerce checkout/payment.
27. Do not introduce AI/chat.
28. Do not require paid external infrastructure.

---

# 129. Completion Definition

The backend implementation is complete when the platform can safely execute the complete workflow:

```text
Public Request
      ↓
Route / Server Component / API
      ↓
Validation
      ↓
Public Data Query
      ↓
Published Content
      ↓
Rendered Website
```

and:

```text
Admin Request
      ↓
Authentication
      ↓
Authorization
      ↓
Validation
      ↓
Domain Service
      ↓
Database Transaction
      ↓
Audit Log
      ↓
Cache Invalidation
      ↓
Updated Admin/Public State
```

while maintaining:

```text
security
data integrity
performance
multilingual support
SEO correctness
auditability
production reliability
```
