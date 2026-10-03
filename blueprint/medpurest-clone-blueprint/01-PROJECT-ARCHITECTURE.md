# MedPurest Clone Blueprint --- Project Architecture

**Document:** `01-PROJECT-ARCHITECTURE.md`\
**Project:** MedPurest Clone / Rebuild Blueprint\
**Status:** FINAL ARCHITECTURE SPECIFICATION\
**Depends On:** `00-MASTER-PLAN.md`\
**Version:** 1.0

------------------------------------------------------------------------

## 1. Purpose

This document defines the technical architecture for the complete
MedPurest-style medical B2B website rebuild.

It converts the master plan into an implementation-oriented architecture
covering:

-   Application boundaries
-   Frontend architecture
-   Backend architecture
-   Database architecture
-   Authentication
-   Authorization
-   Storage
-   Search
-   CMS
-   Inquiry/CRM workflow
-   Multilingual architecture
-   SEO architecture
-   Admin architecture
-   API boundaries
-   File/folder structure
-   Environment configuration
-   Deployment topology
-   Development conventions
-   Scalability and extensibility

This document does **not** define every database column, every API
endpoint, or every page component. Those details belong to the
specialized documents in the locked blueprint.

------------------------------------------------------------------------

## 2. Architectural Goals

The architecture must achieve the following:

1.  Fast public website
2.  Mobile-first responsive UI
3.  Strong SEO
4.  Admin-managed content
5.  Product-first catalogue architecture
6.  Secure admin authentication
7.  Role-based authorization
8.  Multilingual support
9.  Centralized media management
10. Inquiry/lead management
11. Low infrastructure complexity
12. No mandatory paid API dependency
13. Maintainable TypeScript codebase
14. PostgreSQL relational data model
15. Clear separation of public and administrative concerns
16. Easy future extension
17. Reusable components
18. Server-side validation
19. Production-grade security
20. Predictable deployment and recovery

------------------------------------------------------------------------

## 3. Architectural Principles

### 3.1 Separation of Concerns

The project is divided into:

``` text
Presentation
    ↓
Application
    ↓
Domain
    ↓
Data Access
    ↓
Infrastructure
```

No UI component should directly contain complex database logic.

------------------------------------------------------------------------

### 3.2 Server-First by Default

Use server-side rendering and server-side data access where beneficial.

Client components should be introduced only when interactivity requires
them.

Examples:

Good client-side candidates:

-   Search input with live interaction
-   Image gallery
-   Language selector requiring client state
-   Admin forms
-   Rich text editor
-   Drag-and-drop media
-   Interactive filters

Static content should remain server-rendered whenever practical.

------------------------------------------------------------------------

### 3.3 Configuration Over Hard-Coding

Business identity must come from configuration/database rather than
being embedded throughout the application.

Avoid:

``` ts
const PHONE = "+92...";
```

Prefer a centralized settings service:

``` ts
const settings = await getSiteSettings();
```

The exact implementation may vary, but the principle is mandatory.

------------------------------------------------------------------------

### 3.4 Public and Admin Separation

The public website and admin dashboard share the same
application/database infrastructure but must have clearly separated
route groups and authorization boundaries.

``` text
Public
/
├── products
├── news
├── blog
├── video
├── certificate
├── about
└── contact

Admin
/admin
├── login
├── dashboard
├── products
├── content
├── media
├── inquiries
├── seo
└── settings
```

------------------------------------------------------------------------

## 4. Recommended Technology Stack

### 4.1 Application

``` text
Next.js
React
TypeScript
```

Use the Next.js App Router unless a future project constraint requires
another approach.

------------------------------------------------------------------------

### 4.2 Styling

Recommended:

``` text
Tailwind CSS
```

A small internal design-token layer should sit above the utility
classes.

------------------------------------------------------------------------

### 4.3 Database

``` text
PostgreSQL
```

Recommended hosted option:

``` text
Supabase PostgreSQL
```

The architecture must remain PostgreSQL-compatible so the application is
not permanently coupled to a single vendor.

------------------------------------------------------------------------

### 4.4 ORM / Data Access

Recommended:

``` text
Prisma
```

The ORM should be treated as the primary application data-access layer.

Raw SQL may be used when:

-   PostgreSQL-specific capabilities are required
-   Search performance requires it
-   A complex reporting query is substantially clearer in SQL

Any raw SQL must remain parameterized and reviewed.

------------------------------------------------------------------------

### 4.5 Storage

Recommended:

``` text
Supabase Storage
```

Alternative:

``` text
S3-compatible object storage
```

Storage access must be isolated behind application utilities rather than
scattered through UI components.

------------------------------------------------------------------------

### 4.6 Search

Initial:

``` text
PostgreSQL Full-Text Search
```

Optional future:

``` text
Meilisearch
Typesense
```

A separate search server is not required for the initial version.

------------------------------------------------------------------------

### 4.7 Authentication

Admin-only authentication.

Possible implementation:

``` text
Supabase Auth
```

or another secure server-side authentication system compatible with the
selected deployment architecture.

The public website must not require login.

------------------------------------------------------------------------

### 4.8 Email

Email sending must be optional.

The core application must not become unusable because an external email
provider is unavailable.

Potential implementation:

``` text
SMTP
Optional transactional email provider
```

The exact provider belongs in deployment configuration, not core
business logic.

------------------------------------------------------------------------

## 5. High-Level Architecture

``` text
                         INTERNET
                            │
                            ▼
                 ┌────────────────────┐
                 │   Next.js Web App   │
                 └─────────┬──────────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        Public UI      Admin UI       API/Actions
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                 ┌────────────────────┐
                 │ Application Layer  │
                 │ Auth / Validation  │
                 │ Business Services  │
                 └─────────┬──────────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
       PostgreSQL       Object Store    Search
             │
             ▼
        Audit / Data
```

------------------------------------------------------------------------

## 6. Logical Application Layers

### Layer 1 --- UI

Responsible for:

-   Layout
-   Components
-   Forms
-   User interactions
-   Accessibility
-   Responsive behavior

Should not contain direct database queries.

------------------------------------------------------------------------

### Layer 2 --- Application Services

Responsible for:

-   Business workflows
-   CRUD orchestration
-   Permission checks
-   Inquiry processing
-   Publishing logic
-   Media operations
-   Translation workflows

Example:

``` text
createProduct()
updateProduct()
publishProduct()
createInquiry()
assignInquiry()
publishArticle()
```

------------------------------------------------------------------------

### Layer 3 --- Domain Logic

Responsible for rules such as:

-   Product publication requirements
-   Inquiry status transitions
-   Translation state
-   Slug uniqueness
-   Content publication constraints
-   Role permissions

This layer should not depend on browser-specific APIs.

------------------------------------------------------------------------

### Layer 4 --- Data Access

Responsible for:

-   Database queries
-   Transactions
-   Repositories/services
-   Search queries
-   Pagination
-   Aggregations

Example:

``` text
productRepository
categoryRepository
newsRepository
inquiryRepository
mediaRepository
```

------------------------------------------------------------------------

### Layer 5 --- Infrastructure

Responsible for:

-   Database client
-   Storage provider
-   Authentication provider
-   Email adapter
-   Logging
-   External integrations

Infrastructure details should not leak into the presentation layer.

------------------------------------------------------------------------

## 7. Recommended Repository Structure

``` text
project-root/
│
├── app/
│   ├── (website)/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── products/
│   │   ├── news/
│   │   ├── blog/
│   │   ├── video/
│   │   ├── certificate/
│   │   ├── contact-us/
│   │   └── ...
│   │
│   ├── admin/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── news/
│   │   ├── blog/
│   │   ├── videos/
│   │   ├── certificates/
│   │   ├── honors/
│   │   ├── history/
│   │   ├── culture/
│   │   ├── pages/
│   │   ├── inquiries/
│   │   ├── media/
│   │   ├── navigation/
│   │   ├── languages/
│   │   ├── seo/
│   │   ├── settings/
│   │   └── users/
│   │
│   └── api/
│       └── ...
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── website/
│   ├── products/
│   ├── content/
│   ├── forms/
│   ├── search/
│   └── admin/
│
├── lib/
│   ├── auth/
│   ├── db/
│   ├── storage/
│   ├── search/
│   ├── email/
│   ├── seo/
│   ├── i18n/
│   ├── validation/
│   ├── permissions/
│   ├── logging/
│   └── utils/
│
├── services/
│   ├── products/
│   ├── categories/
│   ├── content/
│   ├── inquiries/
│   ├── media/
│   ├── users/
│   ├── seo/
│   └── settings/
│
├── repositories/
│   ├── products/
│   ├── categories/
│   ├── content/
│   ├── inquiries/
│   ├── media/
│   └── ...
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed/
│
├── public/
│   ├── icons/
│   └── static/
│
├── types/
│
├── hooks/
│
├── utils/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
│
├── scripts/
│
├── middleware.ts
├── next.config.*
├── package.json
├── tsconfig.json
├── tailwind.config.*
├── eslint.config.*
├── .env.example
└── README.md
```

The final exact folder structure may be refined during implementation,
but the separation of concerns should remain.

------------------------------------------------------------------------

## 8. Next.js Route Architecture

Use route groups to separate website and administration.

Conceptually:

``` text
app/
├── (website)/
└── admin/
```

The `(website)` route group does not affect public URLs.

Example:

``` text
app/(website)/products/page.tsx
```

produces:

``` text
/products
```

Admin:

``` text
app/admin/products/page.tsx
```

produces:

``` text
/admin/products
```

------------------------------------------------------------------------

## 9. Public Route Architecture

Recommended route map:

``` text
/
├── /about
├── /about/history
├── /about/certification
├── /about/honor
├── /about/culture
│
├── /products
├── /products/[category]
├── /products/[category]/[product]
│
├── /news
├── /news/[category]
├── /news/[category]/[slug]
│
├── /blog
├── /blog/[category]
├── /blog/[category]/[slug]
│
├── /video
├── /video/[slug]
│
├── /certificate
├── /contact-us
├── /search
├── /privacy-policy
└── /sitemap
```

Multilingual routing may prepend or otherwise encode the locale
depending on the final i18n implementation.

------------------------------------------------------------------------

## 10. Admin Route Architecture

``` text
/admin/login

/admin
/admin/dashboard

/admin/products
/admin/products/new
/admin/products/[id]
/admin/products/[id]/edit

/admin/categories
/admin/categories/new
/admin/categories/[id]

/admin/news
/admin/news/new
/admin/news/[id]/edit

/admin/blog
/admin/blog/new
/admin/blog/[id]/edit

/admin/videos
/admin/videos/new
/admin/videos/[id]/edit

/admin/certificates
/admin/certificates/new
/admin/certificates/[id]/edit

/admin/honors
/admin/history
/admin/culture

/admin/pages
/admin/pages/[id]/edit

/admin/inquiries
/admin/inquiries/[id]

/admin/media
/admin/navigation
/admin/languages
/admin/seo
/admin/settings
/admin/users
/admin/roles
/admin/activity-logs
```

------------------------------------------------------------------------

## 11. Admin Authentication Boundary

The authentication boundary must be enforced server-side.

Do not rely solely on:

``` text
if (user) show admin button
```

Client-side hiding is not authorization.

Every protected operation must verify:

``` text
Authenticated?
      ↓
Authorized?
      ↓
Allowed action?
```

Example:

``` text
Admin user
  ↓
Session verification
  ↓
User identity
  ↓
Role/permission lookup
  ↓
Permission check
  ↓
Mutation
```

------------------------------------------------------------------------

## 12. Authorization Model

Use RBAC:

``` text
User
  ↓
User Roles
  ↓
Roles
  ↓
Role Permissions
  ↓
Permissions
```

Example permission identifiers:

``` text
products.read
products.create
products.update
products.delete
products.publish

inquiries.read
inquiries.update
inquiries.assign

media.read
media.upload
media.delete

settings.read
settings.update
```

The final permission catalogue belongs in the admin and security
specifications.

------------------------------------------------------------------------

## 13. Supabase Architecture Option

If Supabase is selected as the deployment platform, use its components
selectively:

``` text
Supabase PostgreSQL
Supabase Auth
Supabase Storage
```

Do not expose privileged credentials to the browser.

A public client may use only the appropriate publishable client
configuration.

Never expose:

``` text
service_role
secret server keys
database passwords
```

through public/browser environment variables.

If Supabase Data API is exposed for any table, Row Level Security must
be enabled and policies must match the actual access model.

Authorization data must not rely on user-editable metadata.

------------------------------------------------------------------------

## 14. Database Access Architecture

The preferred path is:

``` text
UI
 ↓
Server Action / Route Handler
 ↓
Application Service
 ↓
Repository / Data Access
 ↓
Prisma/PostgreSQL
```

Avoid:

``` text
UI
 ↓
Direct database access
```

This protects business rules and authorization boundaries.

------------------------------------------------------------------------

## 15. Transaction Boundaries

Use database transactions when multiple related changes must succeed or
fail together.

Examples:

### Product publishing

``` text
Update product
Update translation state
Update SEO metadata
Write audit event
```

### Inquiry assignment

``` text
Update inquiry
Create assignment/activity record
Write audit event
```

### Category deletion

Before deleting:

``` text
Check child categories
Check products
Check references
```

Do not silently destroy related production data.

------------------------------------------------------------------------

## 16. Product Module Architecture

Product module:

``` text
Product
 ├── Category
 ├── Translations
 ├── Images
 ├── Documents
 ├── Tags
 ├── SEO
 └── Related Products
```

Public:

``` text
Category listing
    ↓
Product cards
    ↓
Product detail
    ↓
Inquiry CTA
```

Admin:

``` text
Products
    ↓
Create/Edit
    ↓
Media
    ↓
Translations
    ↓
SEO
    ↓
Publish
```

The detailed product specification is defined in:

``` text
04-PRODUCT-CATALOG-SPEC.md
```

------------------------------------------------------------------------

## 17. Content Module Architecture

Content entities share common concepts:

``` text
Title
Slug
Summary
Body
Featured Image
Status
Published At
Author
Translations
SEO
```

But they should remain separate domain entities.

Do not force every content type into one oversized generic table if it
makes validation and querying unclear.

Primary modules:

``` text
News
Blog
Video
Certificate
Honor
History
Culture
Page
```

------------------------------------------------------------------------

## 18. Media Architecture

Media is treated as an infrastructure/content service.

``` text
Admin Upload
     ↓
Upload Validation
     ↓
Storage
     ↓
Media Record
     ↓
Content Reference
```

The database should store metadata and object references, not large
binary files.

Example:

``` text
media
 ├── id
 ├── filename
 ├── storage_path
 ├── mime_type
 ├── size
 ├── width
 ├── height
 ├── alt_text
 └── created_by
```

------------------------------------------------------------------------

## 19. Storage Separation

Keep these concepts separate:

### Public/static assets

Examples:

``` text
favicon
static icons
application assets
```

### CMS media

Examples:

``` text
product images
certificate files
blog images
logos
documents
```

CMS media should use managed object storage.

------------------------------------------------------------------------

## 20. Inquiry Architecture

``` text
Public Form
   ↓
Validation
   ↓
Spam/rate-limit checks
   ↓
Inquiry Service
   ↓
Database
   ↓
Admin Queue
   ↓
Assignment
   ↓
Status Workflow
   ↓
Follow-up
```

An inquiry should retain its source context where useful:

``` text
source_page
product_id
campaign/source
locale
referrer where permitted
```

Avoid collecting unnecessary personal information.

------------------------------------------------------------------------

## 21. Search Architecture

Search pipeline:

``` text
Search Request
     ↓
Normalize Query
     ↓
Detect Locale
     ↓
Search Indexed/Queryable Content
     ↓
Rank
     ↓
Filter
     ↓
Paginate
     ↓
Return Results
```

Initial searchable entities:

``` text
Products
Categories
News
Blog
Video
Certificates
```

Search should be optimized with database indexes and full-text search
rather than loading all records into application memory.

------------------------------------------------------------------------

## 22. Multilingual Architecture

The architecture should separate:

``` text
Base Entity
      +
Translation Records
```

Example:

``` text
products
   │
   ├── product_translations(en)
   ├── product_translations(ar)
   ├── product_translations(es)
   └── product_translations(zh)
```

Language configuration:

``` text
languages
 ├── code
 ├── name
 ├── native_name
 ├── direction
 ├── enabled
 ├── default
 └── sort_order
```

Arabic requires:

``` text
direction = rtl
```

The exact URL and fallback strategy is defined in:

``` text
09-MULTILINGUAL-SEO-SPEC.md
```

------------------------------------------------------------------------

## 23. SEO Architecture

SEO data should be available to content entities through a consistent
service.

Conceptual model:

``` text
Content Entity
     ↓
SEO Service
     ↓
Metadata
     ↓
Canonical
     ↓
Structured Data
     ↓
Sitemap
```

The architecture must support:

-   Dynamic metadata
-   Canonical URLs
-   hreflang
-   XML sitemap
-   Robots rules
-   Breadcrumbs
-   Open Graph
-   Structured data

------------------------------------------------------------------------

## 24. Site Settings Architecture

Use centralized settings rather than hard-coded business data.

Conceptual categories:

``` text
Brand
Contact
Social
Navigation
SEO Defaults
Analytics
Email
Localization
Appearance
System
```

Settings may be represented using normalized tables or a controlled
key/value structure depending on final schema requirements.

Critical settings should have explicit types and validation.

------------------------------------------------------------------------

## 25. Navigation Architecture

Navigation should be database-managed.

Conceptual model:

``` text
Menu
  ↓
Menu Items
  ├── Label
  ├── URL
  ├── Parent
  ├── Order
  ├── Visibility
  ├── Target
  └── Translation
```

The frontend should render navigation from validated menu data.

Invalid links should not be allowed to break the primary site
navigation.

------------------------------------------------------------------------

## 26. API Architecture

The API is divided conceptually into:

### Public APIs

``` text
search
contact/inquiry submission
public content retrieval where necessary
```

### Admin APIs

``` text
products
categories
content
media
inquiries
settings
languages
SEO
users
```

Public endpoints must be intentionally limited.

Admin endpoints require authentication and authorization.

Detailed endpoint definitions belong in:

``` text
08-API-BACKEND-SPEC.md
```

------------------------------------------------------------------------

## 27. Server Actions vs Route Handlers

Use server actions where they improve internal form workflows and remain
appropriately secured.

Use route handlers when:

-   A public HTTP API is required
-   An external integration consumes the endpoint
-   A specific REST-style contract is needed
-   File or webhook processing requires it

Regardless of mechanism:

``` text
Authentication
Authorization
Validation
Business Logic
```

must remain server-side.

------------------------------------------------------------------------

## 28. Validation Architecture

Use a shared schema-validation strategy.

Validation must occur at the server boundary.

Examples:

``` text
ProductCreateSchema
ProductUpdateSchema
InquiryCreateSchema
CategoryCreateSchema
NewsCreateSchema
MediaUploadSchema
SettingsUpdateSchema
```

Validation should cover:

-   Required fields
-   Data types
-   Lengths
-   URL formats
-   Email formats
-   File constraints
-   Slugs
-   Enum values
-   Permission-sensitive fields

------------------------------------------------------------------------

## 29. Error Handling

Errors should be classified:

``` text
Validation Error
Authentication Error
Authorization Error
Not Found
Conflict
Rate Limited
Internal Error
External Service Error
```

Public users should receive safe messages.

Do not expose:

-   SQL errors
-   Stack traces
-   Secrets
-   Internal file paths
-   Authentication internals

Production logging may retain technical details securely.

------------------------------------------------------------------------

## 30. Logging and Audit Architecture

Two concepts should remain distinct.

### Application logs

Technical events:

``` text
errors
warnings
performance
requests
integration failures
```

### Audit logs

Business/admin actions:

``` text
user logged in
product created
product updated
product published
content deleted
settings changed
inquiry reassigned
media deleted
```

Audit records should include enough context to identify:

``` text
actor
action
entity
entity_id
timestamp
relevant metadata
```

Sensitive values should not be logged unnecessarily.

------------------------------------------------------------------------

## 31. Caching Architecture

Caching should be applied according to content volatility.

### Highly cacheable

``` text
Published product pages
Published blog pages
Published news pages
Static company pages
```

### Low-cache / dynamic

``` text
Admin dashboard
Inquiry queue
User management
Settings editor
```

After content publication or update, relevant cache
invalidation/revalidation must occur.

------------------------------------------------------------------------

## 32. Image Architecture

Images should be optimized before delivery where possible.

Requirements:

-   Responsive sizes
-   Appropriate formats
-   Width/height metadata
-   Lazy loading below the fold
-   Priority loading for critical hero imagery
-   Meaningful alt text
-   Avoid oversized originals in page payloads

The CMS should preserve the original asset while allowing optimized
delivery.

------------------------------------------------------------------------

## 33. Security Boundary Model

``` text
Browser
  ↓
Public/Authenticated Request
  ↓
Middleware / Route Guard
  ↓
Authentication
  ↓
Authorization
  ↓
Validation
  ↓
Application Service
  ↓
Repository
  ↓
Database
```

Never skip directly from a browser-controlled identifier to a privileged
database mutation without authorization.

------------------------------------------------------------------------

## 34. Environment Architecture

Required environments:

``` text
Development
Staging
Production
```

Typical environment variables:

``` text
DATABASE_URL
DIRECT_URL
AUTH configuration
STORAGE configuration
EMAIL configuration
NEXT_PUBLIC_SITE_URL
```

No real secrets belong in:

``` text
.git
source code
public files
client bundles
documentation examples
```

`.env.example` should contain names and safe placeholder values only.

------------------------------------------------------------------------

## 35. Development Workflow

Recommended workflow:

``` text
Specification
    ↓
Database design
    ↓
Migration
    ↓
Service logic
    ↓
API/server action
    ↓
Admin UI
    ↓
Public UI
    ↓
Tests
    ↓
Security review
    ↓
Performance review
```

Avoid building the entire visual frontend before establishing the
underlying data model.

------------------------------------------------------------------------

## 36. Feature Implementation Pattern

For a typical feature:

``` text
1. Define requirements
2. Define data model
3. Define permissions
4. Define validation
5. Define service methods
6. Define API/action
7. Build admin interface
8. Build public interface
9. Add SEO
10. Add tests
11. Review accessibility
12. Review performance
```

This sequence becomes the basis for the implementation task document.

------------------------------------------------------------------------

## 37. Testing Architecture

Testing layers:

``` text
Unit
Integration
End-to-End
Security
Accessibility
Responsive
Performance
SEO
```

Examples:

### Unit

-   Slug generation
-   Permission checks
-   Status transitions
-   Validation

### Integration

-   Product CRUD
-   Inquiry creation
-   Media metadata
-   Translation persistence

### E2E

-   Admin login
-   Create product
-   Publish product
-   Public product discovery
-   Submit inquiry

The complete test matrix belongs in:

``` text
12-TESTING-QA-ACCEPTANCE.md
```

------------------------------------------------------------------------

## 38. Scalability Strategy

The initial architecture should comfortably support:

-   Hundreds of products
-   Thousands of content records
-   Multiple languages
-   Multiple admin users
-   Growing inquiry volume

The architecture should also be capable of scaling further through:

-   Database indexes
-   Pagination
-   Caching
-   CDN/object storage
-   Background jobs where necessary
-   Search engine introduction later

Do not introduce microservices prematurely.

------------------------------------------------------------------------

## 39. Why a Modular Monolith

The recommended initial architecture is a modular monolith.

``` text
One deployable application
        │
        ├── Products module
        ├── Content module
        ├── Inquiry module
        ├── Media module
        ├── Auth module
        ├── SEO module
        └── Settings module
```

Advantages:

-   Easier development
-   Easier deployment
-   Lower cost
-   Fewer network boundaries
-   Simpler debugging
-   Easier local development
-   Easier database transactions

Microservices are not justified for the initial project scope.

------------------------------------------------------------------------

## 40. Dependency Rules

Modules should depend in a controlled direction.

Preferred:

``` text
UI
 ↓
Application Services
 ↓
Repositories / Infrastructure
```

Avoid circular dependencies.

For example:

``` text
Product UI
```

should not import:

``` text
Database internals
```

directly.

------------------------------------------------------------------------

## 41. Reusable Component Architecture

Component categories:

``` text
UI primitives
├── Button
├── Input
├── Select
├── Modal
├── Table
├── Badge
└── Pagination

Website
├── Header
├── Footer
├── Hero
├── ProductCard
├── NewsCard
├── BlogCard
├── Breadcrumb
└── CTA

Admin
├── AdminSidebar
├── DataTable
├── FormSection
├── MediaPicker
├── RichTextEditor
├── StatusBadge
└── PermissionGate
```

Components should remain composable rather than becoming giant
all-purpose components.

------------------------------------------------------------------------

## 42. Design System Architecture

Define shared design tokens:

``` text
Colors
Typography
Spacing
Radius
Shadows
Breakpoints
Motion
Z-index
```

Brand-specific values should be configurable where practical.

The detailed visual system belongs in:

``` text
03-UI-UX-DESIGN-SPEC.md
```

------------------------------------------------------------------------

## 43. Accessibility Architecture

Accessibility is a cross-cutting requirement.

Minimum considerations:

-   Semantic HTML
-   Keyboard navigation
-   Visible focus
-   Form labels
-   Error messages
-   Sufficient contrast
-   Alt text
-   Accessible modals
-   Accessible dropdowns
-   Reduced-motion consideration
-   Screen-reader-friendly structure

Do not rely on visual styling alone to communicate state.

------------------------------------------------------------------------

## 44. Deployment Topology

A practical deployment can look like:

``` text
                    DOMAIN
                       │
                       ▼
                HTTPS / CDN
                       │
                       ▼
                 Next.js App
                  │       │
                  │       ├── Auth
                  │       ├── Storage
                  │       └── Email
                  │
                  ▼
               PostgreSQL
```

With Supabase:

``` text
Next.js
   │
   ├── Supabase Auth
   ├── Supabase Storage
   └── Supabase PostgreSQL
```

The architecture should avoid direct coupling that prevents migration to
another PostgreSQL/storage provider.

------------------------------------------------------------------------

## 45. Backup Architecture

Database:

``` text
PostgreSQL backup
```

Media:

``` text
Object storage backup/synchronization
```

Code:

``` text
Git repository
```

Configuration:

``` text
Secure secret/environment management
```

A restore process must be tested, not merely documented.

------------------------------------------------------------------------

## 46. Migration Strategy

Database changes must use versioned migrations.

Conceptual workflow:

``` text
Schema Change
   ↓
Migration
   ↓
Review
   ↓
Test
   ↓
Apply
   ↓
Verify
```

Never rely on manually editing production tables as the normal
development process.

------------------------------------------------------------------------

## 47. Seed Data Strategy

Development environments should have reproducible seed data.

Seed data may include:

``` text
Admin role
Demo permissions
Languages
Demo categories
Demo products
Demo content
Default site settings
```

Real production credentials must never be included in seeds.

------------------------------------------------------------------------

## 48. Local Development Architecture

A developer should be able to run the project locally with minimal
external dependencies.

Expected workflow:

``` text
Install dependencies
        ↓
Configure .env
        ↓
Prepare database
        ↓
Run migrations
        ↓
Seed development data
        ↓
Start development server
```

The project README must document the exact process.

------------------------------------------------------------------------

## 49. No Paid-Service Lock-In

The architecture must support:

``` text
Self-hosted/open-source alternatives
```

for critical functionality where practical.

Examples:

``` text
PostgreSQL
SMTP
S3-compatible storage
PostgreSQL search
```

Optional SaaS services may improve convenience but must not be mandatory
for the core system.

------------------------------------------------------------------------

## 50. Future Ecommerce Compatibility

Although checkout is outside the initial scope, the data model should
avoid decisions that block it.

For example, products may have future-compatible concepts such as:

``` text
SKU
Product Code
Documents
Variants
Packaging
Availability
```

But do not build a full inventory/order/payment subsystem unless
explicitly activated in future scope.

------------------------------------------------------------------------

## 51. Future Mobile App Compatibility

A future mobile application should be able to consume selected
application services/API contracts without rewriting business logic.

Therefore:

``` text
Business rules
```

should not be embedded exclusively in:

``` text
React components
```

------------------------------------------------------------------------

## 52. Architecture Anti-Patterns

Avoid:

### Giant component

One page containing all business logic.

### Direct database from UI

Client components directly calling privileged database functionality.

### Hard-coded business identity

Phone/email/logo embedded in many files.

### Generic everything table

Putting products, blogs, news, certificates, and pages into one poorly
typed table.

### Premature microservices

Splitting a small-to-medium application into many services.

### Mandatory third-party dependency

Making the website unusable because one paid API is unavailable.

### Client-only authorization

Hiding admin controls without server-side permission enforcement.

### Unbounded uploads

Allowing arbitrary file types/sizes.

### No migration history

Changing production schema manually without reproducible migrations.

------------------------------------------------------------------------

## 53. Architectural Quality Gates

Before a module is considered architecturally complete, verify:

``` text
[ ] Data model defined
[ ] Permissions defined
[ ] Validation defined
[ ] Server-side business logic defined
[ ] Public/admin boundary defined
[ ] Error handling defined
[ ] SEO impact considered
[ ] Multilingual impact considered
[ ] Media requirements considered
[ ] Tests identified
[ ] Performance impact considered
[ ] Security reviewed
```

------------------------------------------------------------------------

## 54. Relationship With Other Blueprint Files

This document provides architecture.

Use the following documents for deeper detail:

``` text
02-PAGE-BY-PAGE-SITEMAP.md
→ Complete page and route specification

03-UI-UX-DESIGN-SPEC.md
→ Visual system and interaction design

04-PRODUCT-CATALOG-SPEC.md
→ Product domain and catalogue behavior

05-CONTENT-CMS-SPEC.md
→ CMS and content models

06-ADMIN-PANEL-SPEC.md
→ Administrative UX and permissions

07-DATABASE-SCHEMA.md
→ Exact relational schema

08-API-BACKEND-SPEC.md
→ Exact API contracts

09-MULTILINGUAL-SEO-SPEC.md
→ Localization and search-engine architecture

10-SECURITY-PERFORMANCE-DEPLOYMENT.md
→ Production hardening and deployment

11-IMPLEMENTATION-TASKS.md
→ Ordered development plan

12-TESTING-QA-ACCEPTANCE.md
→ Test and acceptance matrix
```

------------------------------------------------------------------------

## 55. Final Architecture Decision

The recommended baseline is:

``` text
Frontend:
Next.js + React + TypeScript

UI:
Tailwind CSS + internal design system

Application:
Next.js server-side architecture

Database:
PostgreSQL

ORM:
Prisma

Auth:
Admin-only secure authentication

Storage:
Supabase Storage or S3-compatible storage

Search:
PostgreSQL Full-Text Search initially

Architecture:
Modular Monolith

Rendering:
Server-first / hybrid rendering

Content:
Database-backed CMS

Public Accounts:
None

Admin:
RBAC-protected

AI:
None

Mandatory Paid Services:
None

Deployment:
Cloud/self-hostable compatible
```

------------------------------------------------------------------------

## 56. Final Architecture Rule

The architecture should remain simple enough for a small development
team to understand and operate, while structured enough to support a
growing B2B medical catalogue.

The project should optimize for:

``` text
Clarity
Security
Maintainability
Performance
SEO
Content Management
Extensibility
Low Operational Complexity
```

not for unnecessary technical complexity.

------------------------------------------------------------------------

## 57. Architecture Completion Checklist

Before moving to implementation, confirm:

``` text
[ ] Master plan accepted
[ ] Application architecture accepted
[ ] Route structure accepted
[ ] Module boundaries accepted
[ ] Database direction accepted
[ ] Authentication boundary accepted
[ ] RBAC direction accepted
[ ] Storage strategy accepted
[ ] Search strategy accepted
[ ] Multilingual direction accepted
[ ] SEO architecture accepted
[ ] Media architecture accepted
[ ] Inquiry architecture accepted
[ ] Testing architecture accepted
[ ] Deployment direction accepted
[ ] No-AI requirement preserved
[ ] No-public-account requirement preserved
[ ] No-mandatory-paid-service requirement preserved
[ ] Locked 13-document structure preserved
```

------------------------------------------------------------------------

## 58. Final Directive

All implementation documents and code generated after this specification
must remain compatible with both:

``` text
00-MASTER-PLAN.md
```

and:

``` text
01-PROJECT-ARCHITECTURE.md
```

If a later implementation detail appears to conflict with these
documents, resolve the conflict deliberately rather than silently
introducing a different architecture.

**End of Project Architecture Specification**
