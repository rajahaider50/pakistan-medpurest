# MedPurest Clone Blueprint — Admin Panel Specification

**File:** `06-ADMIN-PANEL-SPEC.md`  
**Project:** MedPurest-style B2B Medical Product Catalogue & Lead Generation Platform  
**Status:** Implementation Specification  
**Audience:** Product owners, administrators, frontend/backend engineers, QA engineers, security reviewers, and AI coding agents

---

# 1. Purpose

This document defines the complete administrative panel for the platform.

The admin panel is the private operational interface used by authorized staff to manage:

- Products
- Product categories
- News
- Blog
- Videos
- Certificates
- Honors
- History
- Culture
- Pages
- Homepage content
- Inquiries
- Media
- Navigation
- Languages
- SEO
- Site settings
- Users
- Roles
- Permissions
- Activity logs

The admin panel must be secure, responsive, auditable, and practical for daily content and lead management.

---

# 2. Admin Panel Principles

The admin panel must follow these principles:

1. Server-side authorization is mandatory.
2. Public users never access admin functionality.
3. Permissions are explicit.
4. Destructive actions require confirmation.
5. Content is database-driven.
6. Admin actions are auditable.
7. Forms validate on both client and server.
8. The interface should minimize unnecessary clicks.
9. Mobile/tablet usability should be supported for important operations.
10. No AI agent/chat functionality is required.
11. No mandatory paid third-party admin service is required.

---

# 3. Admin Route

Primary route:

```text
/admin
```

Authentication:

```text
/admin/login
```

Optional protected routes:

```text
/admin/forgot-password
/admin/reset-password
/admin/verify
```

The exact authentication provider may vary, but the route contract remains stable.

---

# 4. Admin Route Architecture

Recommended structure:

```text
/admin
├── login
├── dashboard
├── products
├── categories
├── news
├── news-categories
├── blog
├── blog-categories
├── videos
├── certificates
├── honors
├── history
├── culture
├── pages
├── homepage
├── inquiries
├── media
├── navigation
├── languages
├── seo
├── settings
├── users
├── roles
└── activity-logs
```

Use nested routes where appropriate.

---

# 5. Admin Authentication

Admin authentication must be separate from the public website.

There is:

```text
NO public customer login
NO public signup
NO public OTP account system
```

Only administrators/staff authenticate.

---

# 6. Authentication Requirements

Minimum:

```text
Email/username
Password
Secure session
Logout
```

Recommended:

```text
Password reset
Session expiration
Login rate limiting
Optional 2FA
```

---

# 7. Admin Login UI

Login screen should contain:

```text
Brand/logo
Email
Password
Show/hide password
Remember session (if supported securely)
Forgot password
Login button
Error state
Loading state
```

Do not display unnecessary public navigation.

---

# 8. Login Error Handling

Do not reveal whether a particular account exists.

Prefer:

```text
Invalid credentials.
```

rather than:

```text
This email does not exist.
```

Rate-limit repeated failures.

---

# 9. Admin Session

Admin sessions should:

- Be server-controlled
- Use secure cookies
- Use appropriate `HttpOnly`/`Secure` attributes
- Have defined expiration
- Support logout
- Be invalidatable

Do not store long-lived authentication secrets in localStorage.

---

# 10. Optional Two-Factor Authentication

2FA may be supported for privileged accounts.

Recommended approach:

```text
TOTP authenticator
```

Avoid making SMS OTP mandatory because the project should not depend on paid messaging services.

2FA recovery codes should be handled securely.

---

# 11. Admin Authorization

Authentication answers:

```text
Who are you?
```

Authorization answers:

```text
What are you allowed to do?
```

Every sensitive admin operation requires authorization.

Do not rely only on hiding buttons in the UI.

---

# 12. RBAC Model

Recommended:

```text
User
  ↓
User Roles
  ↓
Roles
  ↓
Permissions
```

Entities:

```text
users
roles
permissions
user_roles
role_permissions
```

---

# 13. Suggested Roles

Initial roles:

```text
Super Admin
Content Manager
Sales Manager
Media Manager
SEO Manager
Translator
```

Organizations may create additional custom roles.

---

# 14. Super Admin

Super Admin may manage:

```text
All content
Users
Roles
Permissions
Settings
Security
Audit logs
```

The Super Admin is the only role that should normally manage other administrators and critical system configuration.

---

# 15. Content Manager

Typical permissions:

```text
Products
Categories
Pages
Homepage
News
Blog
Videos
Certificates
History
Culture
Honors
```

May not necessarily manage:

```text
Users
Roles
Security
System secrets
```

---

# 16. Sales Manager

Typical permissions:

```text
Inquiries
Products view
Product details
Lead notes
Inquiry status
```

May have limited content editing.

---

# 17. Media Manager

Typical permissions:

```text
Media upload
Media metadata
Media organization
Media usage inspection
```

May not publish business content unless explicitly granted.

---

# 18. SEO Manager

Typical permissions:

```text
SEO metadata
Redirects
Sitemap controls
Indexing controls
Content SEO fields
```

---

# 19. Translator

Typical permissions:

```text
View source content
Edit translations
Manage translation status
```

Publishing rights should be optional.

---

# 20. Permission Naming

Recommended permission format:

```text
resource.action
```

Examples:

```text
products.view
products.create
products.edit
products.publish
products.archive
products.delete

news.view
news.create
news.edit
news.publish
news.delete

media.upload
media.edit
media.delete

seo.manage
settings.manage
users.manage
roles.manage
logs.view
```

---

# 21. Admin Layout

Recommended layout:

```text
┌───────────────────────────────────────────────────────────┐
│ Top Bar                                                   │
├───────────────┬───────────────────────────────────────────┤
│ Sidebar       │ Main Content                              │
│               │                                           │
│ Dashboard     │ Page Header                               │
│ Products      │ Filters / Actions                         │
│ Categories    │                                           │
│ News          │ Content                                   │
│ Blog          │                                           │
│ ...           │                                           │
│ Settings      │                                           │
└───────────────┴───────────────────────────────────────────┘
```

---

# 22. Sidebar

Sidebar should contain grouped navigation.

Example:

```text
OVERVIEW
Dashboard

CATALOG
Products
Categories

CONTENT
Pages
Homepage
News
Blog
Videos
Certificates
Honors
History
Culture

LEADS
Inquiries

ASSETS
Media

SITE
Navigation
Languages
SEO
Settings

ADMINISTRATION
Users
Roles
Activity Logs
```

Only show items the current user is authorized to access.

---

# 23. Top Bar

Top bar may contain:

```text
Sidebar toggle
Breadcrumb
Search (optional)
Notifications
Preview Website
User menu
Logout
```

---

# 24. User Menu

User menu:

```text
My Profile
Security
View Website
Logout
```

If profile editing is not required, keep it minimal.

---

# 25. Dashboard

Dashboard should focus on operational information.

Recommended widgets:

```text
Total Products
Published Products
Draft Products
New Inquiries
Open Inquiries
Published News
Pending Translations
Recent Activity
```

---

# 26. Dashboard Quick Actions

Provide shortcuts:

```text
Add Product
Add News
Add Blog Post
Upload Media
View New Inquiries
Open Website
```

Only show actions allowed by the user.

---

# 27. Dashboard Recent Activity

Show:

```text
Actor
Action
Content
Time
```

Examples:

```text
Admin published Surgical Gown
Content Manager updated About page
Media Manager uploaded product image
Sales Manager changed inquiry status
```

---

# 28. Dashboard Date/Timezone

Use the site's configured timezone for displayed operational dates.

Store timestamps consistently in the backend.

---

# 29. Generic Admin List Page

All management lists should follow a reusable pattern:

```text
Page Title
Description
Primary Action
Search
Filters
Bulk Actions
Data Table
Pagination
Empty State
```

---

# 30. Admin Data Table

Tables should support:

```text
Column visibility where useful
Sorting
Filtering
Pagination
Row actions
Bulk selection
Responsive behavior
```

Do not load thousands of records into the browser.

---

# 31. Row Actions

Typical actions:

```text
View
Edit
Duplicate
Preview
Publish
Archive
Delete
```

Only show actions permitted by the user's role.

---

# 32. Destructive Actions

Delete/archive actions must:

1. Clearly identify the target.
2. Explain consequences when necessary.
3. Require confirmation.
4. Execute server-side authorization.
5. Create an audit record.

---

# 33. Empty States

Empty state should be useful.

Example:

```text
No products found.

Create your first product to begin building the catalogue.
[Add Product]
```

Do not show a blank table.

---

# 34. Loading States

Use:

```text
Skeletons
Spinners for short operations
Disabled action state
Progress indicators for uploads
```

Avoid flashing incomplete content.

---

# 35. Error States

Display:

```text
What failed
What the user can do
Retry action
```

Example:

```text
Unable to save this product.
Please check the highlighted fields and try again.
[Retry]
```

Never expose stack traces.

---

# 36. Toast Notifications

Use concise notifications:

```text
Product saved
Product published
Media uploaded
Inquiry updated
Settings saved
```

Errors should remain visible long enough to understand.

---

# 37. Product Management

Route:

```text
/admin/products
```

Features:

```text
List
Search
Filter
Create
Edit
Duplicate
Preview
Publish
Archive
Delete
```

Detailed product specification is defined in:

`04-PRODUCT-CATALOG-SPEC.md`

---

# 38. Product List Columns

Recommended:

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

---

# 39. Product Filters

Recommended:

```text
Status
Category
Featured
Language completeness
Updated date
```

---

# 40. Product Form

Sections:

```text
Basic Information
Content
Categories
Features
Applications
Specifications
Variants
Media
Documents
Videos
Related Products
SEO
Publishing
```

---

# 41. Category Management

Route:

```text
/admin/categories
```

Features:

```text
List
Create
Edit
Reorder
Archive
Delete
```

Category list should visually show hierarchy.

Example:

```text
Protective Equipment
  ├─ Medical Material
  ├─ Surgical Gown
  └─ Isolation Gown
```

---

# 42. Category Form

Fields:

```text
Name
Parent
Slug
Description
Image
SEO
Status
Sort Order
```

---

# 43. News Management

Route:

```text
/admin/news
```

Features:

```text
Create
Edit
Preview
Publish
Schedule
Archive
Delete
```

---

# 44. News List

Columns:

```text
Cover
Title
Category
Status
Published Date
Author
Updated
Actions
```

Filters:

```text
Category
Status
Author
Date
Language
```

---

# 45. News Editor

Sections:

```text
Basic Information
Content
Cover Media
Category
Tags
SEO
Publishing
```

---

# 46. Blog Management

Route:

```text
/admin/blog
```

Features:

```text
Create
Edit
Preview
Publish
Schedule
Archive
Delete
```

---

# 47. Blog Editor

Sections:

```text
Basic Information
Content
Cover Media
Category
Tags
SEO
Publishing
```

---

# 48. Video Management

Route:

```text
/admin/videos
```

Fields:

```text
Title
Description
Thumbnail
Provider
Video URL
Duration
Category/Tags if used
Status
Publish Date
Sort Order
SEO
```

---

# 49. Certificate Management

Route:

```text
/admin/certificates
```

Fields:

```text
Title
Issuer
Certificate Number
Issue Date
Expiry Date
Description
Image
Document
Status
Sort Order
```

Certificate validity information must be based on real source documents.

---

# 50. Honor Management

Route:

```text
/admin/honors
```

Fields:

```text
Title
Organization
Date
Description
Image
Document
Sort Order
Status
```

---

# 51. History Management

Route:

```text
/admin/history
```

Use a timeline-oriented editor.

Fields:

```text
Year/Date
Title
Description
Image
Sort Order
Status
```

---

# 52. Culture Management

Route:

```text
/admin/culture
```

Fields:

```text
Title
Description
Image
Sort Order
Status
```

Optional section types:

```text
Mission
Vision
Values
Quality
Service
```

---

# 53. Pages Management

Route:

```text
/admin/pages
```

Pages may include:

```text
About
Contact
Privacy
Custom corporate pages
Landing pages
```

List columns:

```text
Title
Template
Status
Language
Updated
Actions
```

---

# 54. Homepage Management

Route:

```text
/admin/homepage
```

Homepage editor sections:

```text
Hero
Statistics
Featured Products
Categories
Reasons
Trust/Certificates
Latest News
CTA
```

The editor should use structured sections rather than unrestricted page-builder blocks.

---

# 55. Homepage Section Reordering

If section order is configurable:

```text
sort_order
```

must be stored.

Do not hardcode section order in multiple places.

However, the set of supported section types should remain controlled.

---

# 56. Inquiry Management

Route:

```text
/admin/inquiries
```

This is a major operational module.

List columns:

```text
Name
Company
Email
Phone/WhatsApp
Product
Status
Created
Assigned To
```

---

# 57. Inquiry Filters

Recommended:

```text
Status
Product
Date range
Assigned user
Country
Source
```

---

# 58. Inquiry Statuses

Recommended:

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

Status changes should be audited.

---

# 59. Inquiry Detail

Show:

```text
Contact information
Company
Country
Product context
Quantity
Message
Source URL
Language
UTM/campaign data where collected
Created date
Status
Assigned user
Internal notes
Activity history
```

---

# 60. Inquiry Notes

Internal notes should never be exposed publicly.

Example:

```text
Customer requested 5,000 units.
Follow up with export team.
```

Notes should be timestamped and attributed.

---

# 61. Inquiry Assignment

Optional:

```text
Assigned Sales Manager
```

Assignment must be permission-controlled.

---

# 62. Inquiry Export

Authorized users may export inquiry data.

Potential format:

```text
CSV
```

Export must:

- Respect permissions
- Avoid unnecessary sensitive fields
- Be audited
- Avoid exposing data to unauthorized users

---

# 63. Media Management

Route:

```text
/admin/media
```

Features:

```text
Upload
Browse
Search
Filter
Folders
Preview
Edit metadata
Inspect usage
Delete
```

---

# 64. Media Upload UI

Upload should support:

```text
Drag and drop
File picker
Progress
Validation errors
Multiple files where supported
```

Show:

```text
Filename
Size
Type
Upload status
```

---

# 65. Media Usage

When viewing media details, show:

```text
Used by:
Product X
News Y
Homepage Hero
Certificate Z
```

This prevents accidental deletion.

---

# 66. Navigation Management

Route:

```text
/admin/navigation
```

Support:

```text
Header Menu
Footer Menu
Other configured menus
```

---

# 67. Navigation Editor

Fields:

```text
Label
Target
Parent
Order
Visibility
Open in new tab
```

Target types:

```text
Internal Route
External URL
Content Reference
```

---

# 68. Language Management

Route:

```text
/admin/languages
```

Fields:

```text
Language Name
Code
Locale
Direction
Enabled
Default
Fallback
Sort Order
```

Support RTL languages.

Example:

```text
Arabic → RTL
English → LTR
```

---

# 69. Language Activation

Before enabling a language publicly:

- Routing must work
- Translation fallback must work
- Navigation must work
- Core pages should be available
- SEO alternate links should be valid

---

# 70. Translation Management

Provide a translation overview:

```text
Content
English
Spanish
Arabic
Portuguese
Chinese
```

Statuses:

```text
Published
Draft
Missing
Needs Review
```

---

# 71. Translation Editor

Recommended split view:

```text
Source Language
        │
        ▼
Target Language Editor
```

Useful features:

```text
Copy source
Character count
Save draft
Mark reviewed
Publish if permitted
```

Do not automatically machine-translate through a paid API.

---

# 72. SEO Management

Route:

```text
/admin/seo
```

Sections:

```text
Global SEO
Page SEO
Product SEO
News SEO
Blog SEO
Redirects
Robots
Sitemap
```

---

# 73. SEO Global Settings

Fields:

```text
Default Site Title
Default Meta Description
Default OG Image
Default Robots
Sitemap Enabled
```

---

# 74. Redirect Management

List:

```text
Source
Destination
Status
Language
Active
Created
```

Actions:

```text
Create
Edit
Disable
Delete
```

---

# 75. Site Settings

Route:

```text
/admin/settings
```

Groups:

```text
General
Branding
Contact
Social
Localization
SEO
Email
Security
```

---

# 76. Branding Settings

Editable:

```text
Logo
Dark Logo if needed
Favicon
Site Name
Footer Logo
Default Social Image
```

The frontend must read these values from configuration/content storage.

---

# 77. Contact Settings

Editable:

```text
Email
Phone
WhatsApp
Address
Business Hours
Map Coordinates/Embed Configuration
```

Do not hardcode these values into components.

---

# 78. Social Settings

Editable:

```text
Facebook
Instagram
LinkedIn
YouTube
TikTok
WhatsApp
WeChat
Other supported social links
```

Only show configured networks publicly.

---

# 79. Email Settings

Possible fields:

```text
From Name
From Address
Reply-To
SMTP host
SMTP port
SMTP username
```

Secrets should be stored securely.

Prefer environment/secret management for passwords and tokens.

---

# 80. Security Settings

Security settings may include:

```text
Session timeout
Password policy
2FA policy
Login rate limits
Admin IP restrictions if supported
```

Critical settings require elevated permissions.

---

# 81. User Management

Route:

```text
/admin/users
```

Features:

```text
List
Create
Edit
Disable
Reset access
Assign roles
View activity
```

Do not allow ordinary content managers to elevate themselves.

---

# 82. User List

Columns:

```text
Name
Email
Roles
Status
Last Login
Created
Actions
```

---

# 83. User Form

Fields:

```text
Name
Email
Status
Roles
```

Password handling should use secure reset/invitation flows rather than storing or exposing passwords.

---

# 84. Role Management

Route:

```text
/admin/roles
```

Features:

```text
Create role
Edit role
Assign permissions
Duplicate role
Disable role
```

System-critical roles should be protected from accidental deletion.

---

# 85. Role Permission Matrix

Example:

| Permission | Super Admin | Content Manager | Sales Manager | Media Manager | SEO Manager | Translator |
|---|---:|---:|---:|---:|---:|---:|
| Products View | ✓ | ✓ | ✓ | - | - | ✓ |
| Products Edit | ✓ | ✓ | - | - | - | ✓ |
| Products Publish | ✓ | ✓ | - | - | - | - |
| Inquiries | ✓ | - | ✓ | - | - | - |
| Media Manage | ✓ | ✓ | - | ✓ | - | - |
| SEO Manage | ✓ | - | - | - | ✓ | - |
| Users Manage | ✓ | - | - | - | - | - |
| Roles Manage | ✓ | - | - | - | - | - |
| Settings Manage | ✓ | - | - | - | - | - |
| Activity Logs | ✓ | Optional | Optional | Optional | Optional | - |

The actual permission matrix should be configurable.

---

# 86. Activity Logs

Route:

```text
/admin/activity-logs
```

Record:

```text
Actor
Action
Resource
Resource ID
Timestamp
IP/device metadata where appropriate
Summary
Metadata
```

---

# 87. Activity Log Actions

Examples:

```text
LOGIN
LOGOUT
CREATE
UPDATE
PUBLISH
UNPUBLISH
ARCHIVE
DELETE
UPLOAD
DOWNLOAD
ROLE_CHANGED
PERMISSION_CHANGED
SETTING_CHANGED
```

---

# 88. Activity Log Privacy

Do not store:

```text
Passwords
Authentication tokens
Raw secrets
Full sensitive request bodies
```

Only retain necessary audit information.

---

# 89. Admin Search

Optional global admin search:

```text
Products
News
Blog
Pages
Media
Inquiries
```

Search result should include content type.

Example:

```text
Surgical Gown
Product
Published
```

---

# 90. Breadcrumbs

Admin pages should show:

```text
Products > Edit > Surgical Gown
```

This improves navigation in deep workflows.

---

# 91. Form Validation

Client-side validation provides immediate feedback.

Server-side validation remains authoritative.

Examples:

```text
Required fields
String lengths
Email format
Slug format
URL format
Date validity
File type
File size
Relationships
Permission checks
```

---

# 92. Unsaved Changes

If a form has unsaved changes:

```text
Warn before navigation
```

Do not block intentional navigation without a clear confirmation.

---

# 93. Form Save States

Show:

```text
Saving...
Saved
Unsaved changes
Save failed
```

For long forms, preserve user input after validation errors.

---

# 94. Rich Text Editor

The admin editor should support:

```text
Headings
Paragraphs
Bold
Italic
Lists
Links
Images
Tables where needed
Quotes
```

Avoid unnecessary editor complexity.

---

# 95. File Upload Security

All uploads must be checked server-side.

Validate:

```text
MIME
Extension
Size
Actual file signature where practical
```

Store files with safe generated storage keys.

Do not use user-provided filenames directly as executable paths.

---

# 96. Admin Performance

Admin pages should use:

```text
Server-side pagination
Server-side filtering
Debounced search
Optimistic UI only where safe
Lazy media loading
Efficient database queries
```

---

# 97. Admin Responsive Design

Desktop:

```text
Full sidebar
Wide tables
Multi-column forms
```

Tablet:

```text
Collapsible sidebar
Responsive tables
Two-column forms where possible
```

Mobile:

```text
Drawer sidebar
Stacked forms
Card/list alternatives for tables
Large touch targets
```

---

# 98. Admin Accessibility

Required:

- Keyboard navigation
- Visible focus
- Labels for every form field
- Accessible error messages
- Dialog focus management
- Screen-reader-friendly tables
- Color-independent status indicators
- Adequate touch targets

---

# 99. Admin Security

Required:

```text
Secure authentication
Secure sessions
RBAC
Server-side authorization
Rate limiting
CSRF protection where applicable
Input validation
Output escaping
Rich-text sanitization
Secure file handling
Audit logs
```

---

# 100. Admin API Security

Never assume:

```text
If button is hidden → user cannot call API
```

Every mutation must independently check:

```text
Authenticated user
Required permission
Valid input
Valid entity
Allowed state transition
```

---

# 101. Bulk Operations

Bulk actions should be available only where safe.

Examples:

```text
Publish products
Archive news
Assign category
Delete media
```

Before execution:

```text
Selected count
Action
Potential consequence
Confirmation
```

---

# 102. Pagination

Recommended:

```text
20
50
100
```

per page depending on module.

Default should be chosen based on expected data size and usability.

---

# 103. Filtering UX

Filters should:

- Be visible
- Be resettable
- Preserve state in URL where practical
- Work with pagination
- Work with search

Example:

```text
Status = Published
Category = Surgical
Search = gown
```

---

# 104. Sorting

Sortable columns should have clear indicators.

Do not sort by arbitrary client-side state if the dataset is paginated server-side.

---

# 105. Confirmation Dialog Standard

A destructive confirmation should include:

```text
Title
What will happen
Affected item
Cancel
Confirm
```

Example:

```text
Archive Product?

This product will be removed from public listings but retained in the admin system.

[Cancel] [Archive Product]
```

---

# 106. Preview Website

Admin top bar should optionally provide:

```text
View Website
```

For draft content:

```text
Preview
```

Preview links must be protected.

---

# 107. Admin Notifications

Notification center may show:

```text
New inquiry
Scheduled content published
Translation requires review
Media upload completed
System warning
```

Notifications are optional and must not replace dashboard data.

---

# 108. Admin Settings Safety

Critical settings should show:

```text
Current value
Effect
Save confirmation
```

For especially sensitive changes:

```text
Re-authentication
```

may be required.

---

# 109. Admin Logout

Logout must:

```text
Invalidate session
Clear secure client state
Redirect to /admin/login
```

After logout, browser back navigation must not expose protected content through server rendering/cache.

---

# 110. Admin Error Boundary

Admin application should have module-level error boundaries.

If one component fails:

```text
Do not crash the entire admin panel.
```

Provide:

```text
Something went wrong.
Try again.
```

Log technical details server-side.

---

# 111. Admin Testing Requirements

Every major module should have:

### Unit tests

```text
Validation
Permission logic
State transitions
Data formatting
```

### Integration tests

```text
Create
Read
Update
Publish
Archive
Delete
```

### E2E tests

```text
Login
Navigate
Create content
Publish content
Manage inquiry
Upload media
Logout
```

---

# 112. Security Testing

Test:

```text
Unauthorized route access
Horizontal privilege escalation
Vertical privilege escalation
CSRF
XSS
File upload abuse
SQL injection through inputs
Broken object-level authorization
Session invalidation
Rate limiting
```

---

# 113. Admin Acceptance Criteria

The Admin Panel is considered complete when:

1. `/admin/login` securely authenticates authorized users.
2. Public users cannot access admin functionality.
3. RBAC is enforced server-side.
4. Super Admin can manage users and roles.
5. Content managers can manage permitted content.
6. Sales managers can manage inquiries.
7. Media managers can manage media.
8. SEO managers can manage SEO controls.
9. Translators can manage permitted translations.
10. Products can be fully managed.
11. Categories can be managed hierarchically.
12. News can be created, edited, published, scheduled, and archived.
13. Blog can be managed.
14. Videos can be managed.
15. Certificates can be managed.
16. Honors, history, and culture can be managed.
17. Homepage content can be managed.
18. Site settings are editable.
19. Navigation is editable.
20. Languages are manageable.
21. SEO metadata and redirects are manageable.
22. Inquiries can be reviewed and updated.
23. Media can be uploaded and reused.
24. Audit logs record important actions.
25. Destructive actions require confirmation.
26. Forms validate on client and server.
27. Draft content is not publicly exposed.
28. Admin works on desktop and remains usable on mobile/tablet.
29. Accessibility requirements are met.
30. No mandatory paid SaaS service is required.
31. No public customer login/signup/OTP is implemented.
32. No AI agent/chat feature is required.

---

# 114. Recommended Implementation Order

Implement the admin panel in this sequence:

```text
1. Admin authentication
2. Admin layout/shell
3. RBAC/permissions
4. Dashboard
5. Site settings
6. Media Library
7. Categories
8. Products
9. Inquiries
10. Pages/Homepage
11. News
12. Blog
13. Videos
14. Certificates
15. Honors
16. History
17. Culture
18. Navigation
19. Languages/translations
20. SEO
21. Redirects
22. Users
23. Roles
24. Activity logs
25. Security hardening
26. Automated tests
```

---

# 115. Final Admin Architecture

```text
                    ┌──────────────────────┐
                    │    Admin Login       │
                    └──────────┬───────────┘
                               │
                         Authentication
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Admin App Shell    │
                    └──────────┬───────────┘
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
             RBAC           Dashboard       Search
                │
       ┌────────┼────────┬────────┬───────────┐
       ▼        ▼        ▼        ▼           ▼
    Catalog   Content   Leads    Media       Site
       │        │        │        │           │
       ▼        ▼        ▼        ▼           ▼
   Products   Pages   Inquiries  Assets    Navigation
   Categories News                          Languages
              Blog                          SEO
              Videos                        Settings
              Certificates
              Honors
              History
              Culture
       │
       └──────────────────────────────┐
                                      ▼
                                Activity Logs
```

---

# 116. Final Directive for AI Coding Agents

When implementing the Admin Panel:

1. Read the master plan first.
2. Treat this document as the admin UI source of truth.
3. Use the architecture defined in `01-PROJECT-ARCHITECTURE.md`.
4. Follow routes from `02-PAGE-BY-PAGE-SITEMAP.md`.
5. Follow visual rules from `03-UI-UX-DESIGN-SPEC.md`.
6. Follow product rules from `04-PRODUCT-CATALOG-SPEC.md`.
7. Follow CMS rules from `05-CONTENT-CMS-SPEC.md`.
8. Do not invent alternative admin modules without a real requirement.
9. Enforce authorization server-side.
10. Do not trust client-side permission checks.
11. Keep forms reusable.
12. Keep tables reusable.
13. Keep content editors structured.
14. Keep destructive actions protected.
15. Keep audit logs immutable to ordinary admins.
16. Never expose passwords or secrets.
17. Sanitize rich content.
18. Validate file uploads.
19. Preserve multilingual workflows.
20. Preserve draft/public separation.
21. Keep admin performance scalable.
22. Test permissions as seriously as functionality.
23. Do not add public authentication.
24. Do not add AI functionality.
25. Do not require paid external admin infrastructure.
26. Keep the implementation modular but avoid unnecessary abstraction.

---

# 117. Completion Definition

The Admin Panel implementation is complete when an authorized administrator can perform the complete operational workflow:

```text
/admin/login
      ↓
Authenticate
      ↓
Dashboard
      ↓
Manage Products
      ↓
Manage Content
      ↓
Manage Media
      ↓
Manage Languages
      ↓
Manage SEO
      ↓
Review Inquiries
      ↓
Manage Users/Roles
      ↓
Review Activity Logs
      ↓
Logout
```

Every sensitive operation must be permission-controlled, validated, auditable, and safe to perform in production.
