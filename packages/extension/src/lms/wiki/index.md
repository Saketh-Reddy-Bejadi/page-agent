# Admin Atlas Knowledge Base

An [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) (OKF) bundle for the Codebasics admin panel. Each concept is one markdown file with YAML frontmatter; pages cross-link with plain markdown links.

When answering a query, select the page(s) below that match the user's intent (by file name, e.g. `courses`, `offline_payments`). For pure navigation / "where is X" questions, use `admin_routes`.

## Workflows (operator-documented)

- [Courses](courses.md) - create & manage courses: the 7-step wizard (basic info, extra info, pricing, content, suggestions, FAQ, status). Route `/admin/webinars`.
- [Course Content](course_content.md) - course wizard Step 4 in detail: chapters/sections, video lectures, text lessons, quizzes (with questions), and assignments.
- [Course Bootcamps](bootcamps.md) - create & manage bootcamps (bundles of courses): 7-step wizard, versioning, bundled courses, content visibility. Route `/admin/bundles`.

## Operations (code-grounded)

- [Offline Payments](offline_payments.md) - review, approve, and reject manual bank payments. Route `/admin/financial/offline_payments`.
- [Orders](orders.md) - audit orders, view details, recheck status, process refunds. Route `/admin/orders`.
- [Users](users.md) - manage students/staff/instructors: edit, impersonate, delete, grant change permissions. Route `/admin/students`.
- [Permissions & Roles](permissions.md) - how admin access control works and how to manage roles and per-section permissions. Route `/admin/roles`.

## Reference

- [Admin Routes](admin_routes.md) - authoritative map of every admin route (path, controller, action) for navigation and deep-linking. Covers all features incl. discounts, payouts, certificates, events, live-sessions, placements, roles, quizzes, practice arenas, noticeboards.
