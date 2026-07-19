---
type: Admin Workflow
title: Course Bootcamps
description: Create and manage bootcamps (bundles of courses) through the 7-step wizard, including versioning, pricing, bundled courses, and content visibility.
route: /admin/bundles
tags: [bootcamps, bundles, education, versioning, pricing]
source: admin.md, lms-web/routes/admin.php, lms-web/resources/views/admin/bundles
timestamp: 2026-06-29
---

# Course Bootcamps

A bootcamp is a **bundle of multiple courses**. In the codebase it is the `Bundle` model, so all routes live under `/admin/bundles`. Creating a bootcamp is a **7-step wizard**, similar to courses.

**Sidebar:** Course Bootcamps (expand) > **List** / **New** / **Community Champions**.

> **Important — use the prod backup website** for creating and testing; only use codebasics.io if prod backup does not work for file uploads.

## Routes

| Action                 | Method | Route                                |
| :--------------------- | :----- | :----------------------------------- |
| List                   | GET    | `/admin/bundles`                     |
| New (create form)      | GET    | `/admin/bundles/create`              |
| Save new               | POST   | `/admin/bundles/store`               |
| Edit a step            | GET    | `/admin/bundles/{id}/step/{step?}`   |
| Edit                   | GET    | `/admin/bundles/{id}/edit`           |
| Update                 | POST   | `/admin/bundles/{id}/update`         |
| Delete                 | GET    | `/admin/bundles/{id}/delete`         |
| Students               | GET    | `/admin/bundles/{id}/students`       |
| Export Excel           | GET    | `/admin/bundles/excel`               |
| Add course to bootcamp | POST   | `/admin/bundle-webinars/store`       |
| Community Champions    | GET    | `/admin/bundles/community-champions` |

Wizard step slugs (progress links → `/admin/bundles/{id}/step/{step}`): `basic-info`, `extra-info`, `pricing`, `courses`, `content`, `faq`, `status`.

## Bootcamps List (`/admin/bundles`)

- Summary cards: **Total Course Bundles**, **Pending Review**, **Total Sales** (count), **Total Sales (₹)** (revenue).
- Filters (GET form): **Search** (`name="title"`), **Start/End Date** (`name="from"`/`name="to"`), **Filter Type** (`name="sort"`), **Instructor** (`name="teacher_ids[]"`), **Category** (`name="category_id"`), **Status** (`name="status"`; options `pending`, `active`, `inactive`, `is_draft`). Submit **Show results**.
- Table columns: ID, Title, Instructor, Price, Sales, New Enrolments, Courses Count, Created/Updated Date, Status, Actions. **Export Excel** → `/admin/bundles/excel`.
- Actions (three-dots dropdown `.dropdown-menu.webinars-lists-dropdown`): Send notification (`/admin/bundles/{id}/sendNotification`), Students (`/admin/bundles/{id}/students`), Message teacher, **Edit** (`/admin/bundles/{id}/edit`), **Delete** (`button[data-confirm-href="/admin/bundles/{id}/delete"]` — avoid).
- **Community Champions** — community members who help others on Discord for a bootcamp; shown on the bootcamp dashboard.

### Find & open an existing bootcamp for editing

Always locate the bootcamp via search first — do not assume it is visible in the table. Each action below is a separate step:

1. Go to the Bootcamps List (`/admin/bundles`) — sidebar **Course Bootcamps > List**.
2. In the **Search** box (`input[name="title"]`), type the bootcamp's title.
3. Click **Show results** (`input.btn.btn-primary[type="submit"]`) to filter the table.
4. In the matching row, click the three-dots actions toggle (`button.btn-transparent.dropdown-toggle`, icon `i.fa.fa-ellipsis-v`) to open its menu.
5. Click **Edit** (`a[href="/admin/bundles/{id}/edit"]`) to open the bootcamp on Step 1 (Basic Information).

This is the standard entry point for _any_ edit (title, pricing, status, courses, etc.). After Step 5, go to the relevant wizard step below and change the field. To change the **title**: on Step 1, edit **Title** (`input[name="title"]`), then click **Save** / **Save and continue** (`button#saveAndContinue.btn-success`).

## Step 1/7 — Basic Information (`basic-info`)

Form: `form#bundleForm[action="/admin/bundles/store"]` (edit posts to `/admin/bundles/{id}/update`).

- **Title** (`name="title"`, required) — full bootcamp name.
- **Subtitle** (`name="subtitle"`, required) — tagline on the bootcamp info page.
- **Alias Title** — alternate title on Testimonials/Placements pages.
- **Bundle URL** (`name="slug"`, required) — slug, lowercase, dashes, unique across bootcamps.
- **Category** (`name="category_id"`, `select#categories`, required).
- **Select an Instructor** (`name="teacher_id"`, `.search-user-select2`, required); **Partner Instructor** (`name="partner_instructor"`, `#partnerInstructorSwitch`) → **partners** (`name="partners[]"`).
- **Description** (`name="description"`, `textarea#summernote`, required) — rich text; used on the bootcamp homepage.
- **Short Description** (`name="short_description"`) — min 300 words; HTML/images allowed; shown on card and landing page.
- **Certificate Description** (`name="certificate_description"`, required) — printed on the completion certificate.
- **Media:** Thumbnail (`name="thumbnail"`, `#thumbnail`, required, `.webp`, 1000×563 px), Cover Image (`name="image_cover"`, `#cover_image`, required), Demo Video Source (`name="video_demo_source"`: Upload/YouTube/Gumlet/External Link) + Path (`name="video_demo"`, `#demo_video`), Logo (`name="logo"`, optional).

**Save / navigate:** `button#saveAndContinue.btn-success`, Next `button#getNextStep`, Delete `button.btn-danger[data-confirm-href="/admin/bundles/{id}/delete"]` (avoid).

## Step 2/7 — Extra Information (`extra-info`)

- **SEO:** SEO Meta Title, SEO Meta Keywords (comma-separated), SEO Meta Description (155–160 chars).
- **Bootcamp Homepage:** Special Features (one per line), Details Page Features (purple box, one per line, supports `<br>`), Footer CTA (shortcodes `[price]`, `[upgrade_price]`), Bootcamp Brochure (PDF, < 50–70 MB → adds **View Brochure**), Desktop/Mobile Journey Image (embedded roadmap), Boarding Pass (JPEG given after enrolling, ideal 4630×1742 px), Bootcamp Certificate (+ **View Bootcamp Certificate**), Certificate Template Override (+ **View Certificate Template Image**).
- **Checkout Page:** Cart Item Description (required, one per line), What You Learn (required, one per line), Bonus Modules (one per line).
- **Bootcamp Card Homepage:** Homepage Badge (e.g. "In Demand"), Homepage Caption, Homepage Points (one per line), Landing Page Subtitles (add as tags).
- **Extra:** Bootcamp Short Label, Short Bootcamp Name, Role Name (job role used in emails), Course Type (homepage section), Daily Learning / Quiz / WhatsApp Channel URLs, Dashboard Curriculum Label (blank hides the curriculum tab, max 50 chars), Bootcamp Completion Video URL, Discord Link / Channel ID / Role ID, What's new in this bootcamp (one per line).

## Step 3/7 — Pricing (`pricing`)

Geo-based pricing.

- **Price India (in ₹)**, **Price Low Price (in US$)** (lower-economic countries), **Price High Price (in US$)** (higher-economic countries).
- **Select Benefit Bootcamps** — students of these bootcamps get a discount on this one.
- **Refund Days** (e.g. 30) and **Refund text for Cart page**.
- **Upgrade Price** (schedules a future change): new ₹ / low US$ / high US$ (enter 0 for free) + **Price Change Date** (when the price switches; drives when the upgrade message is removed).
- **Course Suggestions** — same as courses; **Add Course Suggestion**.

## Step 4/7 — Courses (`courses`)

Add the courses bundled into the bootcamp. Starts empty with **Add new course to bootcamp** (posts to `/admin/bundle-webinars/store`). Table shows Title, Instructor, Version Required, Price, Date Published.

- **Add new course to bootcamp** → popup: **Select a course** + **Minimum Version Required**.
- **Versioning:** bootcamps launch in versions (V1 at launch, V2 ~5–6 months later). Upgrading is optional. A course added in a newer version is only accessible to students on that version or higher.
- Manage: move (reorder), edit pencil (change course / min version), ✕ (remove).

## Step 5/7 — Content (`content`)

Control which lectures from each bundled course are visible to bootcamp students. Left panel = courses from Step 4; click one → right panel lists its lectures with checkboxes. **Checked** = visible, **Unchecked** = hidden. **Select All** / **Deselect All** (top-right) bulk-toggle the current course.

## Step 6/7 — FAQ (`faq`)

Three homepage sections, all start empty.

- **Why Should You Enroll in this Bootcamp?** — **Add New** → Title (label under the video card), Image (thumbnail, ideal 1920×1080), Video URL (Gumlet embed). Manage with move/edit/✕.
- **Work On Real World Projects** — **Add New** → Image (icon, ideal 64×64), Heading (project name, supports `<br />`), Description.
- **FAQ** — **New FAQ** → Title (question), Answer. Manage with View, move, edit, ✕.

## Step 7/7 — Status (`status`)

- **Status** (`name="status"`) — `active` (live), `pending` (awaiting approval), `is_draft` (work in progress), `inactive` (disabled), `test` (**Test Mode** — internal testing, not visible to students), `coming_soon` (shown, not yet enrollable).
- **Bootcamp Type** — Regular (`regular`, self-paced) / Live (`live`, scheduled sessions).
- **Current Bootcamp Version** + **Upgrade Date** — drive Step 4 versioning; students on older versions only access courses marked for their version or lower.
- **Is Bootcamp Launched?**, **Show Begin Your Journey pop-up**, **Show Our Placements on Bootcamp Landing Page**, **Allow new enrolments** (off keeps existing students), **Display Bootcamp on Home Page**, **Allow unrestricted access to all roadmap courses** (gives all courses within the student's current version; does not bypass the version requirement).
- **Tool/Product Access (JAP — Job Assistance Portal):** Course required to access Portfolio, Course required to access JAP, Minimum Version Required for Resume Builder / Mock Interview / LinkedIn Optimizer, Bundled Courses (extra courses purchasers also get).
- Save: **Save** finalizes with the chosen status; **Previous** goes back; avoid **Delete**.

## Related

- [Courses](courses.md) — the building blocks bundled here.
- [Admin Routes](admin_routes.md) — full route map.
