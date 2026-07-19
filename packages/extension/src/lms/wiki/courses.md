---
type: Admin Workflow
title: Courses
description: Create and manage courses through the 7-step wizard, including chapters, video lectures, text lessons, quizzes, and assignments.
route: /admin/webinars
tags: [courses, webinars, education, content, quiz, assignment]
source: admin.md, lms-web/routes/admin.php, lms-web/resources/views/admin/webinars
timestamp: 2026-06-29
---

# Courses

A Course is one of the main products students enrol in. In the codebase a course is the `Webinar` model (`type` = `course` or `webinar`), so all routes live under `/admin/webinars`. Creating a course is a **7-step wizard**.

**Sidebar:** EDUCATION > Courses. First sub-item opens the Courses List; **New** opens the wizard.

> **Important — use the prod backup website.** When creating courses or making changes, always use the prod backup website first. For uploading files, try the prod backup website first; only if it does not work, use codebasics.io.

## Routes

| Action            | Method | Route                               |
| :---------------- | :----- | :---------------------------------- |
| List              | GET    | `/admin/webinars`                   |
| New (create form) | GET    | `/admin/webinars/create`            |
| Save new          | POST   | `/admin/webinars/store`             |
| Edit a step       | GET    | `/admin/webinars/{id}/step/{step?}` |
| Edit              | GET    | `/admin/webinars/{id}/edit`         |
| Update            | POST   | `/admin/webinars/{id}/update`       |
| Delete            | GET    | `/admin/webinars/{id}/delete`       |
| Students          | GET    | `/admin/webinars/{id}/students`     |
| Export Excel      | GET    | `/admin/webinars/excel`             |

Wizard step slugs (progress bar `a.js-get-next-step` → `/admin/webinars/{id}/step/{step}`): `basic-info` (1/7), `extra-info` (2/7), `pricing` (3/7), `content` (4/7), `suggestions` (5/7), `faq` (6/7), `message-reviewer` (7/7).

## Courses List (`/admin/webinars`)

- Summary cards: **Total Courses**, **Pending Review Courses**, **Total Duration**, **Total Sales**.
- Filters (GET form): **Search** (`name="title"`), **Start/End Date** (`name="from"` / `name="to"`), **Filter Type** (`name="sort"`), **Instructor** (`name="teacher_ids[]"`), **Category** (`name="category_id"`), **Platform** (`name="platform"`), **Status** (`name="status"`). Submit with **Show results** (`input.btn.btn-primary[type=submit]`).
- Row actions: dropdown toggle `button.btn-transparent.dropdown-toggle` (`i.fa.fa-ellipsis-v`) → menu `.dropdown-menu.webinars-lists-dropdown`. Contains **Edit** (`a[href="/admin/webinars/{id}/edit"]`, `fa fa-edit`), Export JSON, Send notification, Students, Statistics, and **Delete**.
- **Delete uses a confirm button, not a link:** `button[data-confirm-href="/admin/webinars/{id}/delete"]`. Automation must read `data-confirm-href`, not `href`. Avoid clicking Delete.

### Find & open an existing course for editing

Always locate the course via search first — do not assume it is visible in the table. Each action below is a separate step:

1. Go to the Courses List (`/admin/webinars`) — sidebar **EDUCATION > Courses**.
2. In the **Search** box (`input[name="title"]`), type the course's title.
3. Click **Show results** (`input.btn.btn-primary[type="submit"]`) to filter the table.
4. In the matching row, click the three-dots actions toggle (`button.btn-transparent.dropdown-toggle`, icon `i.fa.fa-ellipsis-v`) to open its menu.
5. Click **Edit** (`a[href="/admin/webinars/{id}/edit"]`, `fa fa-edit`) to open the course on Step 1 (Basic Information).

This is the standard entry point for _any_ edit (title, pricing, content, status, etc.). After Step 5, go to the relevant wizard step below and change the field. To change the **title**: on Step 1, edit **Title** (`input[name="title"]`), then click **Save** / **Save and continue** (`button#saveAndContinue.btn-success`).

## Step 1/7 — Basic Information (`basic-info`)

Form: `form#webinarForm[action="/admin/webinars/store"]` (edit posts to `/admin/webinars/{id}/update`).

**Course details**

- **Title** (`name="title"`, required) — full course name students see.
- **Short Title** (`name="short_title"`) — condensed title shown inside a bootcamp curriculum.
- **Subtitle** (`name="subtitle"`, optional) — tagline under the title.
- **Course type** (`name="type"` select; values `webinar`, `course`, `text_lesson`) — Video Course (all courses currently are), Live Class (not in use), Text Course (not in use).
- **Platform** (`name="platform"` select; values `codebasics`, `careertorch`).
- **Course URL** (`name="slug"`, required) — slug, lowercase, dashes, no spaces. Not auto-generated; must be unique; changeable later.
- **Course Level** (`name="level"`) — 1 Beginner, 2 Intermediate, 3 Expert, 4 Beginner to Advanced, 0 All Levels.
- **Category** (`name="category_id"`, `select#categories`, required) — subject grouping; appears as "Course Topic" on the free-courses section. _(Note: the website topic filter only works for free courses.)_
- **Language** (`name="language"`) — e.g. English. Displays on the course details page.
- **Dashboard Display** (`name="dashboard_display"`, `#dashboard_display`) — show/hide on dashboard.
- **Discussion Type** (`name="discussion_type"`) — None / QnA / FAQ.

**Instructor**

- **Select an Instructor** (`name="teacher_id"`, `select.search-user-select2`, required) — main teacher.
- **Partner Instructor** (`name="partner_instructor"`, `#partnerInstructorSwitch`) — toggle on for a co-instructor.
- **Select a partner instructor** (`name="partners[]"`) — co-instructors get content access and appear on the course page.

**Media**

- **Thumbnail** (`name="thumbnail"`, `#thumbnail`, required) — main card image. `.webp` strongly recommended; size **1000 × 563 px**; no spaces/special chars in filename.
- **Cover Image** (`name="image_cover"`, `#cover_image`, required) — banner; same rules.
- **Demo Video Source** (`name="video_demo_source"`, optional) — Upload / YouTube / Vimeo / Gumlet / External Link.
- **Path** (`name="video_demo"`, `#demo_video`) — embed URL; only if a Demo Video Source is set.

**Testimonials & branding**

- **Alias Title** (optional), **Logo** (`name="logo"`, `#logo`, optional, `.PNG/.JPEG/.WEBP` only).

**Description**

- **Description** (`name="short_description"`, `textarea#short_description`, required) — full overview; shown on course details page.
    > **Gotcha:** the validation message calls this "short description." Saving without it shows _"The short description field is required."_ — that refers to this Description box.

**Certificate settings**

- **Certificate Background Image** (`name="certificate_background_image"`, optional).
- **Certificate Template Override** (`name="certificate_template_id"`, `select#webinar_certificate_template_select`) — type must match (course or virtual_internship). **View Certificate Template Image** to preview.
- **Certificate Description** (`name="certificate_description"`).
- **Bootcamp Certificate Description** (`name="bootcamp_certificate_description"`, optional).

**Upload button:** the small upload-arrow next to image fields is `button.input-group-text.admin-file-manager[data-input="..."]`; it opens the built-in File Manager (browse, create folders, upload, rename/delete). View button: `button.admin-file-view[data-input="..."]`.

**Save / navigate:** `button#saveAndContinue.btn-success` ("Save and continue"); Next `button#getNextStep.btn-primary`; Previous `a.btn-primary[href="/admin/webinars/{id}/step/{prev}"]`. **Delete** `button.btn-danger[data-confirm-href=".../delete"]` — avoid.

**Required-field validation messages (verbatim):**

- Title → _"The title field is required."_
- Category → _"The category id field is required."_
- Instructor → _"The teacher id field is required."_
- Thumbnail → _"The thumbnail field is required."_
- Cover Image → _"The image cover field is required."_
- Description → _"The short description field is required."_

## Step 2/7 — Extra Information (`extra-info`)

- **Course settings:** Points (`name="points"`, gamification, leave empty to disable), Time Zone (`name="timezone"`, only affects DB timestamps), Access Period Days (`name="access_days"` — _not functional_).
- **Toggles:** Support (`name="support"` `#supportSwitch`, usually off), Completion Certificate (`name="certificate"` `#certificateSwitch`, on for most), Is Virtual Internship (`name="is_virtual_internship"` `#isVirtualInternshipSwitch`), Has Final Quiz (`name="has_final_quiz"` `#hasFinalQuizSwitch`), Downloadable (`name="downloadable"` `#downloadableSwitch` — _not functional_), Course Forum (`name="forum"` `#forumSwitch`), Hide course on courses page (`name="hide_course_page"` `#coursePageDisplaySwitch`).
- **Discord:** Discord Link (`name="discord_channel_link"`), Role ID for course (`name="discord_role_id"`), Channel ID (`name="discord_channel_id"`).
- **Counts/display:** Exercise count (`name="exercise_count"`, display only), Business Scenario count (`name="business_scenario_count"`, display only), Course completion % (`name="course_completion_percentage"`, e.g. 70; standalone courses only), Home Page Display Order (`name="home_page_display_order"`, lower shows first).
- **SEO:** SEO Title (`name="seo_title"`), Meta Description (`name="seo_description"`, keep 155–160 chars), Meta Keywords (`name="seo_keywords"`, comma-separated).
- **Scripts (advanced):** Landing Page Script (`name="landing_page_scripts"`), Thank You Page Script (`name="thankyou_page_scripts"`), Thank You Page Notes (`name="thanks_note"`).
- **Tags & related:** Tags (`name="tags"`, `.inputtags`, press Enter, max 5), Related Courses (`name="related_webinar_ids[]"` — _panel label is misspelled "Realeted Courses"_).
- **Type/notifications/prereqs:** Course Type (`name="course_type_id"`, homepage section grouping — different from Step 1's Course type), Course Notification (`name="notification_text"` — _panel label misspelled "Couorse Notification"_; shows under the title on course details), Previous Course (`name="previous_webinar_id"` — _not functional_), Homepage Points (`name="homepage_points"`, one per line).

## Step 3/7 — Pricing (`pricing`)

Geo-based pricing.

- **Price** (`name="price"`) — base INR.
- **Price India (in ₹)** (`name="in_regular_price"`) — usually same as base.
- **Price Low Price (in US$)** (`name="low_regular_price"`) — USD for lower-economic countries.
- **Price High Price (in US$)** (`name="high_regular_price"`) — USD for higher-economic countries.
- **Discount for Bootcamp Learner (%)** (`name="bootcamp_discount"`, optional).
- **Validity (Years)** (`name="validity"`) — display only on the course page (not functional otherwise).
- **Course is Micro Course** (`name="is_micro_course"`, `#isMicroCourse`) — when on, **Micro Course Sections** (`name="micro_course_section_ids[]"`) appears; micro courses also list under Education > Micro Courses (`/admin/micro-courses`).
- Add price plan/ticket: `button#webinarAddTicket.btn-primary`.

## Step 4/7 — Content (`content`)

Build chapters ("Sections"); inside each add lectures: video files, text lessons, quizzes, and assignments. This step is large enough to be its own concept — see **[Course Content](course_content.md)** for the full field-by-field detail (New Section dialog, video lectures, text lessons, quizzes with questions, assignments).

> **Important:** Step 4 starts empty (just the **New Section** button). You must add at least one chapter before saving the course as draft or active, or the course page shows an error. For testing, add a dummy chapter.

Quick terminology: a **Section = chapter**; a **Topic = lecture**.

## Step 5/7 — Suggestions (`suggestions`)

Course recommendations; starts empty, rarely used. **Add Course Suggestion** → dialog: Select Suggestion Title, Select Suggestion Type (e.g. "Course"), Course (pick the one to recommend). **Save** / **Close**.

## Step 6/7 — FAQ, What You'll Learn & Requirements (`faq`)

Three homepage sections, all start empty.

- **FAQ:** **New FAQ** → Title (question), Answer, Category. Manage with View, Edit (pencil), ✕ (remove).
- **What you will learn?:** **Add** → Content (outcomes, one per line). Save.
- **Requirements:** **New requirement** → fill details, Save.

## Step 7/7 — Message to Reviewer (`message-reviewer`)

- **Status** (`name="status"`) — `active` (live/enrollable), `pending` (awaiting approval), `is_draft` (work in progress), `inactive` (disabled), `only_for_bootcamp` (only inside a bootcamp), `coming_soon` (shown, not yet enrollable).
- **Allow new enrolments** — off closes enrolments (existing students keep access; admins can still grant manual access).
- **Enrolment Closure Message** (optional), **Show button for Join Waitlist** (off by default), **Message to reviewer** (internal notes, not shown to students).
- Save: **Save** (green) finalizes with the chosen status. **Previous** goes back. Avoid **Delete**.

> Choosing **Active** makes the course live immediately — use Draft/Pending while still working. "Only For Bootcamp" hides it from standalone browsing.

## Related

- [Course Content](course_content.md) — Step 4 in full: chapters, video lectures, text lessons, quizzes, assignments.
- [Bootcamps](bootcamps.md) — courses are bundled into bootcamps.
- [Admin Routes](admin_routes.md) — full route map, incl. quizzes/assignments/certificates/micro-courses.
