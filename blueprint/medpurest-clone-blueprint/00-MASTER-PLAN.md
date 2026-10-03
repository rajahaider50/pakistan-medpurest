# MedPurest Clone Blueprint --- Master Plan

**Document:** `00-MASTER-PLAN.md`\
**Project:** MedPurest Clone / Rebuild Blueprint\
**Status:** FINAL MASTER SPECIFICATION\
**Version:** 1.0\
**Purpose:** Source of truth for all remaining project specification
documents

------------------------------------------------------------------------

## 1. Executive Summary

This project is a full, production-oriented rebuild of the public-facing
MedPurest-style medical B2B website as a new, independently branded and
administrable platform.

The goal is not to reproduce a company's private infrastructure or copy
proprietary implementation code. The goal is to reproduce the
**observable information architecture, public functionality, content
model, catalogue experience, inquiry flow, multilingual capability, SEO
structure, and administrative requirements** while replacing the
original branding, content ownership, contact information, assets, and
implementation.

The resulting system is a:

-   Medical and healthcare B2B product catalogue
-   Corporate company website
-   Product discovery and search platform
-   Content publishing system
-   Lead/inquiry collection system
-   Multilingual website
-   SEO-oriented content platform
-   Admin-managed media and branding system
-   Responsive mobile/desktop web application

The platform must be designed so that a non-technical administrator can
manage the majority of public website content without editing source
code.

------------------------------------------------------------------------

## 2. Project Vision

Build a modern, fast, secure, multilingual B2B healthcare website with a
strong product catalogue and a complete CMS/admin backend.

The public website should communicate:

1.  Who the company is
2.  What products it supplies
3.  Which product categories exist
4.  Product specifications and use cases
5.  Company history, certifications, honors, culture, and credibility
6.  News and industry content
7.  Blog/problem-solving content
8.  Videos and media
9.  How visitors can contact the company
10. How visitors can submit product/business inquiries

The admin platform should provide centralized control over:

-   Branding
-   Website settings
-   Products
-   Categories
-   Product media
-   News
-   Blogs
-   Videos
-   Certificates
-   Honors
-   History
-   Culture
-   Pages
-   Navigation
-   Languages
-   SEO
-   Inquiries
-   Users and permissions
-   Media assets
-   System configuration

------------------------------------------------------------------------

## 3. Core Product Definition

### 3.1 Primary Product

The core product is a **B2B medical product catalogue and
lead-generation website**.

It is not primarily an ecommerce checkout application.

The main conversion path is:

``` text
Visitor
  ↓
Discover category/product/content
  ↓
Read product information
  ↓
Build trust
  ↓
Contact / Request information
  ↓
Business inquiry
  ↓
Admin/Sales follow-up
```

### 3.2 Business Model Assumption

The system is optimized for organizations that:

-   Manufacture medical products
-   Supply healthcare products
-   Sell to hospitals and clinics
-   Serve distributors
-   Handle institutional procurement
-   Receive international B2B inquiries
-   Need product catalogues without mandatory online checkout

The architecture must remain extensible so ecommerce can be added later
without redesigning the entire database.

------------------------------------------------------------------------

## 4. Reference Scope

The reference website structure includes the following major areas:

``` text
Home
About
  ├── History
  ├── Certification
  ├── Honor
  └── Culture

Products
  ├── Cleaning and Disinfection Series
  ├── Protective Equipment
  │   ├── Medical Material
  │   ├── Disposable Scrub Suits
  │   ├── Disposable Patient Gowns
  │   ├── Surgical Gown
  │   └── Isolation Gown
  ├── Surgical Pack
  │   ├── Gynecology & Obstetrics Surgery Pack
  │   ├── General Surgery Pack
  │   ├── Ophthalmology & ENT Surgery Pack
  │   ├── Orthopedic Surgery Pack
  │   ├── Urology Surgery Pack
  │   ├── Neurosurgery Surgery Pack
  │   └── Cardiovascular Medical Surgery Pack
  └── Surgical Drapes

News
  ├── Company News
  └── Industry Dynamics

Blog
  ├── Problem Guide
  └── Product Introduction

Video
Certificate
Contact Us
Privacy Policy
Sitemap
Search
```

This structure is a reference information architecture, not a
requirement to preserve the original branding or exact visual
implementation.

------------------------------------------------------------------------

## 5. Project Scope

### 5.1 In Scope

The project includes:

-   Public website
-   Responsive UI
-   Product catalogue
-   Product categories
-   Product detail pages
-   Search
-   Content publishing
-   News
-   Blog
-   Video content
-   Certificates
-   Company history
-   Honors
-   Culture
-   Contact page
-   Inquiry forms
-   Inquiry management
-   Media library
-   Admin dashboard
-   Role-based admin access
-   Multilingual architecture
-   SEO management
-   Metadata management
-   Sitemap generation
-   Robots configuration
-   Redirect management
-   Structured data
-   Security controls
-   Performance optimization
-   Deployment documentation
-   Testing and QA
-   Acceptance criteria
-   Backup/recovery strategy

### 5.2 Out of Scope

The following are intentionally excluded from the core project:

-   AI chatbot
-   AI agent
-   AI sales assistant
-   Public customer accounts
-   Public customer login
-   Public OTP authentication
-   Public customer registration
-   Mandatory ecommerce checkout
-   Mandatory payment gateway
-   Mandatory paid SaaS dependency
-   Proprietary source-code cloning
-   Private/reference-site database extraction
-   Private/reference-site credentials
-   Unauthorized scraping of restricted/private content

------------------------------------------------------------------------

## 6. Critical Product Rules

These rules apply to the entire project.

### Rule 1 --- No AI Agent

No AI chatbot, AI agent, AI recommendation engine, or AI sales assistant
is part of the core system.

### Rule 2 --- No Public User Accounts

Visitors do not need to create an account to browse products or submit
an inquiry.

### Rule 3 --- Admin Authentication Only

The administrative system must have secure authentication.

Recommended route:

``` text
/admin/login
```

### Rule 4 --- Branding Must Be Editable

The following must be configurable from the admin panel:

-   Logo
-   Favicon
-   Company name
-   Company description
-   Email
-   Phone
-   WhatsApp
-   Address
-   Business hours
-   Social links
-   Footer information
-   Contact information
-   Copyright text
-   Default SEO information

No critical business identity information should be hard-coded into
components.

### Rule 5 --- Media Must Be Admin Managed

Images, PDFs, videos, certificates, logos, product photos, and other
supported assets should be manageable through a Media Library.

### Rule 6 --- No Mandatory Paid Service

The application must work without requiring a paid third-party service.

External services may be supported as optional integrations, but the
core product must not depend on paid APIs.

### Rule 7 --- Mobile First

The website must work correctly on:

-   Small Android phones
-   Large Android phones
-   iPhone-sized screens
-   Tablets
-   Laptops
-   Desktop monitors
-   Large desktop screens

### Rule 8 --- SEO Is Core Functionality

SEO must not be treated as a last-minute add-on.

Each major content entity must support:

-   SEO title
-   Meta description
-   Canonical URL
-   Slug
-   Open Graph data
-   Social preview image
-   Index/noindex control where appropriate
-   Structured data where applicable

------------------------------------------------------------------------

## 7. Recommended Technology Direction

The exact implementation may evolve during architecture work, but the
master direction is:

### Frontend

Recommended:

``` text
Next.js
React
TypeScript
Tailwind CSS
```

### Backend

Preferred initial approach:

``` text
Next.js server-side/API capabilities
TypeScript
```

A separate backend such as NestJS may be introduced only if the project
requirements justify it.

### Database

Recommended:

``` text
PostgreSQL
```

Supabase PostgreSQL may be used as the hosted database platform.

### ORM

Recommended:

``` text
Prisma
```

### Storage

Preferred:

``` text
Supabase Storage
```

or another S3-compatible/object-storage solution.

The application should keep storage access behind an abstraction so the
provider can be changed later.

### Search

Initial:

``` text
PostgreSQL full-text search
```

Optional future:

``` text
Meilisearch
Typesense
```

A dedicated search engine must not be mandatory for the first production
version.

### Authentication

Admin-only authentication using a secure server-side approach.

Public visitors must not require authentication.

------------------------------------------------------------------------

## 8. High-Level System Architecture

``` text
                    ┌─────────────────────┐
                    │      Visitor        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Public Website    │
                    │ Next.js / React      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        Product Data      Content CMS      Inquiry API
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Application Layer   │
                    │ Validation/Auth     │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        PostgreSQL          Storage          Search
```

Administration:

``` text
Admin
  ↓
/admin/login
  ↓
Authentication
  ↓
Role / Permission Check
  ↓
Admin Dashboard
  ↓
CRUD + Settings + Media + CRM
  ↓
Database / Storage
```

------------------------------------------------------------------------

## 9. Public Website Architecture

The public website must be organized around discoverability and
conversion.

### Primary navigation

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

Additional utility features:

``` text
Search
Language Selector
WhatsApp / Contact CTA
```

The exact navigation labels must be configurable through the admin
panel.

------------------------------------------------------------------------

## 10. Public Content Areas

### 10.1 Homepage

The homepage should be composed of manageable sections such as:

-   Header
-   Main navigation
-   Hero/banner
-   Search or popular searches
-   Company introduction
-   Company statistics
-   Featured products
-   Product categories
-   Why choose us
-   Certifications/trust indicators
-   Call to action
-   Latest news
-   Latest blog content
-   Video/media section
-   Contact CTA
-   Footer

Homepage sections should be modular enough to allow future
rearrangement.

### 10.2 Products

Product architecture must support:

``` text
Category
  ↓
Subcategory
  ↓
Product Listing
  ↓
Product Detail
  ↓
Inquiry CTA
```

### 10.3 News

Support:

-   Company News
-   Industry Dynamics
-   Featured news
-   Related news
-   Pagination
-   Search/filtering where required
-   SEO metadata

### 10.4 Blog

Support:

-   Problem Guide
-   Product Introduction
-   Tags
-   Categories
-   Related posts
-   Featured posts
-   SEO metadata

### 10.5 Video

Support:

-   Video title
-   Description
-   Thumbnail
-   Video source
-   External video URL where applicable
-   Local video asset where supported
-   Category
-   Publish status
-   SEO information

### 10.6 Certificate

Support:

-   Certificate name
-   Certificate number
-   Issuing organization
-   Issue date
-   Expiry date
-   Certificate image/PDF
-   Description
-   Status

### 10.7 Contact

Support:

-   Company contact information
-   Address
-   Email
-   Phone
-   WhatsApp
-   Map/location embed
-   Business hours
-   Inquiry form
-   Social links

------------------------------------------------------------------------

## 11. Inquiry / Lead System

The inquiry system is one of the most important business functions.

### Visitor side

A visitor should be able to submit:

-   Name
-   Email
-   Phone
-   WhatsApp
-   Company
-   Country
-   Subject
-   Message
-   Product reference
-   Optional attachment where enabled

The exact fields must be configurable where practical.

### Admin side

Inquiry statuses:

``` text
New
Contacted
Qualified
Quoted
Negotiating
Converted
Closed
Spam
```

Each inquiry should support:

-   Internal notes
-   Status
-   Assigned sales user
-   Created date
-   Updated date
-   Source page
-   Referenced product
-   Contact details
-   Activity history

------------------------------------------------------------------------

## 12. Product Catalogue Strategy

Products are the core business entity.

Each product should be able to contain:

-   Product name
-   Slug
-   SKU/code
-   Category
-   Subcategory
-   Short description
-   Full description
-   Product images
-   Features
-   Applications
-   Material
-   Specifications
-   Packaging
-   Customization information
-   Documents
-   Related products
-   Tags
-   Featured status
-   Publication status
-   Sort order
-   SEO metadata

The exact fields will be finalized in:

``` text
04-PRODUCT-CATALOG-SPEC.md
```

------------------------------------------------------------------------

## 13. Content Management Strategy

The CMS must allow non-developers to manage business content.

Core managed content:

``` text
Pages
Products
Categories
News
Blogs
Videos
Certificates
Honors
History
Culture
Menus
Media
SEO
Site Settings
```

Content should have lifecycle states such as:

``` text
Draft
Published
Archived
```

Where appropriate.

------------------------------------------------------------------------

## 14. Admin Panel

The admin dashboard should contain:

``` text
Dashboard
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
Inquiries
Media Library
Navigation
Languages
SEO
Settings
Users
Roles & Permissions
Activity Logs
```

The final admin information architecture will be defined in:

``` text
06-ADMIN-PANEL-SPEC.md
```

------------------------------------------------------------------------

## 15. Role-Based Access Control

Recommended roles:

``` text
Super Admin
Content Manager
Sales Manager
Media Manager
SEO Manager
Translator
```

Permissions must be granular enough to restrict:

-   View
-   Create
-   Edit
-   Delete
-   Publish
-   Manage
-   Export
-   Configure

The system must prevent unauthorized access to administrative
operations.

------------------------------------------------------------------------

## 16. Database Strategy

The database must use normalized relational structures rather than
storing the entire website inside unstructured JSON.

Major entity groups include:

### Identity and authorization

``` text
users
roles
permissions
user_roles
role_permissions
```

### Catalogue

``` text
categories
category_translations
products
product_translations
product_images
product_documents
tags
product_tags
```

### Content

``` text
pages
page_translations
news_categories
news
news_translations
blog_categories
blogs
blog_translations
blog_tags
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

### Business

``` text
inquiries
inquiry_notes
```

### System

``` text
media
media_folders
menus
menu_items
languages
site_settings
seo_metadata
redirects
activity_logs
```

The final schema will be defined in:

``` text
07-DATABASE-SCHEMA.md
```

------------------------------------------------------------------------

## 17. Multilingual Strategy

The system must be designed for multilingual publishing from the
beginning.

Potential languages may include:

``` text
English
Spanish
Arabic
Portuguese
Chinese
```

Additional languages must be addable without database redesign.

Translations should generally be separated from base entities.

Example:

``` text
products
    ↓
product_translations
    ├── English
    ├── Arabic
    ├── Spanish
    └── Chinese
```

The language system must support:

-   Language switcher
-   Localized URLs
-   Translation status
-   Per-language SEO
-   hreflang
-   Localized metadata
-   Fallback behavior
-   RTL support for Arabic

------------------------------------------------------------------------

## 18. SEO Strategy

SEO is a first-class system feature.

Required foundations:

-   Semantic HTML
-   Clean URLs
-   Editable slugs
-   Metadata
-   Canonicals
-   XML sitemap
-   Robots.txt
-   Open Graph
-   Twitter/X card metadata
-   Breadcrumbs
-   Structured data
-   Image alt text
-   Internal linking
-   Redirect management
-   Multilingual hreflang
-   Pagination handling
-   Indexation controls

The implementation must avoid duplicate-content problems caused by
multilingual routes and filters.

------------------------------------------------------------------------

## 19. Search Strategy

Global search should be capable of searching relevant public content.

Potential searchable entities:

``` text
Products
Categories
News
Blogs
Videos
Certificates
```

Search should support:

-   Keyword matching
-   Product names
-   Category names
-   Tags
-   Relevant descriptions
-   Language-aware content

The first implementation should prefer PostgreSQL capabilities before
adding another infrastructure dependency.

------------------------------------------------------------------------

## 20. Media Library

The Media Library should centralize assets.

Supported asset categories:

``` text
Images
Logos
Icons
PDFs
Certificates
Videos
Documents
```

Each asset should support metadata such as:

-   Filename
-   MIME type
-   Size
-   Dimensions
-   Alt text
-   Caption
-   Folder
-   Upload date
-   Uploader
-   Usage/reference information

The system should prevent accidental deletion of assets that are still
referenced by published content, or at minimum provide a clear warning.

------------------------------------------------------------------------

## 21. Branding and White-Label Requirements

The rebuilt application must not be permanently tied to MedPurest
branding.

Admin-configurable brand elements include:

``` text
Company name
Logo
Logo variants
Favicon
Primary contact information
Email
Phone
WhatsApp
Address
Social media
Footer text
Copyright
Brand colors
Default fonts where supported
Default SEO title
Default SEO description
```

The project should be reusable as a template for another medical B2B
company.

------------------------------------------------------------------------

## 22. Security Requirements

Minimum security requirements:

-   Secure admin authentication
-   Password hashing
-   Session security
-   CSRF protection where applicable
-   Server-side authorization
-   Input validation
-   Output encoding
-   SQL injection protection through parameterized ORM/query usage
-   File upload validation
-   MIME/type validation
-   File-size limits
-   Rate limiting for public forms
-   Spam protection
-   Secure headers
-   Environment secrets
-   No secrets in client-side source
-   Audit logging
-   Secure error handling
-   Dependency updates
-   Backup strategy

Public visitors must never receive admin privileges through client-side
manipulation.

------------------------------------------------------------------------

## 23. Performance Requirements

The system should prioritize:

-   Fast initial load
-   Responsive images
-   Lazy loading
-   Modern image formats
-   Minimal JavaScript
-   Server-side rendering where beneficial
-   Static generation/caching where appropriate
-   Database indexes
-   Efficient queries
-   Pagination
-   CDN-compatible assets
-   Avoidance of unnecessary third-party scripts

Performance should be tested on mobile networks, not only high-speed
desktop connections.

------------------------------------------------------------------------

## 24. Deployment Strategy

The deployment architecture should support free or low-cost
environments.

The system must not require a paid proprietary infrastructure product to
function.

Potential deployment components:

``` text
Web application
Database
Object storage
Domain
HTTPS
Optional email provider
```

Environment configuration must separate:

``` text
Development
Staging
Production
```

Secrets must be stored through environment variables or the deployment
platform's secure secret manager.

------------------------------------------------------------------------

## 25. Backup and Recovery

The production system should have:

-   Database backups
-   Media backup strategy
-   Configuration backup
-   Migration history
-   Restore procedure
-   Recovery documentation

The exact backup frequency depends on the hosting environment.

At minimum, the project documentation must explain:

1.  What is backed up
2.  Where backups exist
3.  How to restore
4.  How to verify a restore
5.  How to recover from accidental content deletion

------------------------------------------------------------------------

## 26. Development Principles

All implementation should follow these principles:

### Reusability

Build reusable components instead of duplicating page code.

### Configuration over hard-coding

Business content belongs in the CMS/database wherever practical.

### Type safety

Use TypeScript throughout the application layer.

### Validation

Validate data at the server boundary.

### Accessibility

Build accessible forms, navigation, buttons, images, and interactive
components.

### Responsive design

Do not create separate desktop and mobile applications unless
technically necessary.

### Progressive enhancement

Core content must remain usable even if non-essential JavaScript fails.

### Maintainability

Prefer understandable architecture over unnecessary abstraction.

------------------------------------------------------------------------

## 27. Source-of-Truth Document Hierarchy

This master document controls the overall project.

The remaining documents specialize the master plan:

``` text
00-MASTER-PLAN.md
        │
        ├── 01-PROJECT-ARCHITECTURE.md
        ├── 02-PAGE-BY-PAGE-SITEMAP.md
        ├── 03-UI-UX-DESIGN-SPEC.md
        ├── 04-PRODUCT-CATALOG-SPEC.md
        ├── 05-CONTENT-CMS-SPEC.md
        ├── 06-ADMIN-PANEL-SPEC.md
        ├── 07-DATABASE-SCHEMA.md
        ├── 08-API-BACKEND-SPEC.md
        ├── 09-MULTILINGUAL-SEO-SPEC.md
        ├── 10-SECURITY-PERFORMANCE-DEPLOYMENT.md
        ├── 11-IMPLEMENTATION-TASKS.md
        └── 12-TESTING-QA-ACCEPTANCE.md
```

If a later document needs implementation-level detail, it must remain
consistent with the constraints established here.

------------------------------------------------------------------------

## 28. Implementation Phases

### Phase 1 --- Foundation

-   Repository initialization
-   TypeScript
-   Next.js
-   Styling system
-   Environment configuration
-   Code quality tools
-   Basic project structure

### Phase 2 --- Database

-   PostgreSQL
-   ORM
-   Migrations
-   Core schema
-   Seed strategy
-   Database indexes

### Phase 3 --- Authentication

-   Admin login
-   Session handling
-   Roles
-   Permissions
-   Protected routes

### Phase 4 --- Admin Foundation

-   Admin shell
-   Sidebar
-   Header
-   Dashboard
-   Settings
-   Media Library

### Phase 5 --- Product Catalogue

-   Categories
-   Products
-   Product images
-   Product documents
-   Product details
-   Search/filtering

### Phase 6 --- Content CMS

-   News
-   Blog
-   Video
-   Certificates
-   Honors
-   History
-   Culture
-   Pages

### Phase 7 --- Public Website

-   Homepage
-   About
-   Products
-   News
-   Blog
-   Video
-   Certificate
-   Contact

### Phase 8 --- Inquiry System

-   Contact form
-   Product inquiry
-   Admin inquiry list
-   Status management
-   Internal notes
-   Assignment

### Phase 9 --- Multilingual

-   Language configuration
-   Translation model
-   Localized routes
-   RTL support
-   hreflang
-   Translation UI

### Phase 10 --- SEO

-   Metadata
-   Sitemap
-   Robots
-   Canonical
-   Structured data
-   Redirects
-   Social previews

### Phase 11 --- Security and Performance

-   Security hardening
-   Rate limits
-   Upload validation
-   Query optimization
-   Caching
-   Image optimization

### Phase 12 --- QA

-   Functional testing
-   Responsive testing
-   Accessibility testing
-   SEO testing
-   Security testing
-   Browser testing
-   Admin permission testing

### Phase 13 --- Production

-   Production configuration
-   Database migration
-   Asset deployment
-   Domain/HTTPS
-   Backup configuration
-   Monitoring
-   Final acceptance

------------------------------------------------------------------------

## 29. Definition of Done

The project is not considered complete merely because the website
visually resembles the reference structure.

A feature is complete only when:

-   UI exists
-   Responsive behavior works
-   Database model exists where needed
-   API/server logic works where needed
-   Validation exists
-   Authorization exists where needed
-   Admin management exists where required
-   Empty/loading/error states exist
-   SEO is implemented where applicable
-   Accessibility is considered
-   Tests pass
-   Production build succeeds

------------------------------------------------------------------------

## 30. Acceptance Criteria

The final application should satisfy all of the following high-level
criteria.

### Public website

-   Visitors can navigate all major sections.
-   Product categories work.
-   Product detail pages work.
-   Search works.
-   Content pages work.
-   Contact information is correct and editable.
-   Inquiry forms work.
-   Website is responsive.
-   Website is multilingual-capable.
-   SEO metadata is generated correctly.

### Admin

-   Admin can securely log in.
-   Admin can manage products.
-   Admin can manage categories.
-   Admin can manage content.
-   Admin can manage media.
-   Admin can manage inquiries.
-   Admin can change branding.
-   Admin can change contact details.
-   Admin can manage languages.
-   Admin can manage SEO.
-   Role permissions are enforced.

### Technical

-   Production build succeeds.
-   Database migrations are reproducible.
-   No secrets are committed.
-   No critical paid API is mandatory.
-   Major security controls are implemented.
-   Performance is acceptable on mobile.
-   Backups and recovery are documented.

------------------------------------------------------------------------

## 31. Future Extension Points

The architecture should allow future additions without rebuilding the
core.

Potential future modules:

``` text
Ecommerce
Customer Accounts
RFQ Management
Quotation Management
Distributor Portal
Order Management
Payment Integration
Inventory
CRM Integration
ERP Integration
Advanced Analytics
Email Campaigns
Product Comparison
Wishlist
Download Center
API for Mobile Apps
```

These are extension points only and are not part of the initial core
scope.

------------------------------------------------------------------------

## 32. Important Architectural Boundary

The initial product should remain focused.

The project should **not** become an unnecessarily large enterprise
platform before the catalogue, CMS, inquiry system, multilingual
support, SEO, security, and responsive public website are stable.

Build the core correctly first.

Then add optional business modules.

------------------------------------------------------------------------

## 33. Final Project Structure

The documentation package is permanently defined as:

``` text
medpurest-clone-blueprint/
│
├── 00-MASTER-PLAN.md
├── 01-PROJECT-ARCHITECTURE.md
├── 02-PAGE-BY-PAGE-SITEMAP.md
├── 03-UI-UX-DESIGN-SPEC.md
├── 04-PRODUCT-CATALOG-SPEC.md
├── 05-CONTENT-CMS-SPEC.md
├── 06-ADMIN-PANEL-SPEC.md
├── 07-DATABASE-SCHEMA.md
├── 08-API-BACKEND-SPEC.md
├── 09-MULTILINGUAL-SEO-SPEC.md
├── 10-SECURITY-PERFORMANCE-DEPLOYMENT.md
├── 11-IMPLEMENTATION-TASKS.md
└── 12-TESTING-QA-ACCEPTANCE.md
```

This structure is locked for the project documentation.

------------------------------------------------------------------------

## 34. Final Master Directive

Every subsequent project specification must preserve these master
requirements:

1.  Build a new implementation, not a proprietary-code clone.
2.  Recreate the useful public information architecture and
    functionality.
3.  Use new branding and admin-controlled business information.
4.  Keep the public website account-free.
5.  Keep authentication restricted to administration unless future scope
    explicitly changes.
6.  Do not add an AI agent or AI chatbot.
7.  Avoid mandatory paid services.
8.  Use a relational PostgreSQL architecture.
9.  Make products a first-class business entity.
10. Treat inquiries as a first-class business workflow.
11. Make content manageable through the CMS.
12. Make media centrally manageable.
13. Design multilingual support from the beginning.
14. Treat SEO as core functionality.
15. Apply secure server-side authorization.
16. Build mobile-first responsive interfaces.
17. Document implementation tasks before development begins.
18. Define QA and acceptance criteria before declaring completion.
19. Keep the architecture maintainable and extensible.
20. Do not change the locked 13-file documentation structure.

------------------------------------------------------------------------

## 35. Master Success Definition

The project succeeds when a developer can take this documentation
package and implement the complete application with minimal
architectural guesswork.

The documentation must answer:

``` text
What are we building?
        ↓
How should it work?
        ↓
What pages exist?
        ↓
What does each page contain?
        ↓
What does the admin manage?
        ↓
What data exists?
        ↓
How does the API work?
        ↓
How does multilingual SEO work?
        ↓
How is it secured and deployed?
        ↓
What exact development tasks are required?
        ↓
How do we test and accept the finished product?
```

That chain is the foundation of the entire `medpurest-clone-blueprint`
project.

**End of Master Plan**
