---
type: Admin Workflow
title: Course Content
description: Build a course's curriculum in Step 4 — chapters (sections) and the lectures inside them: video files, text lessons, quizzes, and assignments.
route: /admin/webinars/{id}/step/content
tags: [courses, content, chapters, lectures, quiz, assignment, video]
source: admin.md, lms-web/resources/views/admin/webinars/modals
timestamp: 2026-06-29
---

# Course Content (Step 4 of the course wizard)

This is **Step 4 — Content** of the [course](courses.md) wizard. Reach it by editing a course and opening the `content` step: `/admin/webinars/{id}/step/content`. Here you build chapters ("Sections") and add lectures inside them (video files, text lessons, quizzes, assignments). Everything here is modal/repeater driven (modals under `webinars/modals/*`).

> **Important:** Step 4 starts empty (just the **New Section** button). You must add at least one chapter before saving the course as draft or active, or the course page shows an error. For testing, add a dummy chapter.

**Terminology:** a **Section = chapter**; a **Topic = lecture**. Chapter row icons: **+** (green, add lecture), pencil (edit chapter), trash (delete — avoid), move (reorder), chevron (expand/collapse).

## New Section (chapter)

**New Section** (top-right) → "Edit Section" dialog:

- **Section Title** (required) — chapter name.
- **Section Label** (optional) — short display tag, e.g. "NEW".
- **Active** (required toggle) — make the chapter visible.
- **The student should pass all parts** (off by default) — when on, students must complete every lecture in order.

Click **Save**. Edit an existing chapter with its pencil icon.

## Add a Video Lecture

Chapter **+** → **New File**:

- **Title** (required).
- **Source** (required) — dropdown. As of June 2026 use **Gumlet** or **Cloudflare** (add Gumlet or YouTube only).
- **Accessibility** (required) — Free or Paid (Free = no purchase/login needed).
- **Video embed link** (required) — paste the embed URL. **Update Video Source** opens a separate page to enter the numbers from the embed link, which updates the lecture link on Cloudflare.
- **Video contains DRM protection** (off by default) — _not functional_.
- **Duration (Seconds)** (required).
- **Description** (required) — shown under the embedded lecture.
- **SEO Meta Title** (optional, ≤255 chars), **SEO Meta Description** (optional).
- **Active** (required).
- **Attachments** (optional) — click + to add downloadable files (upload arrow = File Manager).
- **Drip Content** (off by default) — scheduled release.
- **Display in Course** (required), **Is Mandatory?** (required), **Label** (optional tag).

## Add a Text Lesson

Chapter **+** → **New Text Lesson**:

- **Title** (required).
- **Duration (Seconds)** (optional) — time the learner must spend for it to count as completed.
- **Image** (optional), **Attachments** (optional).
- **Accessibility** (required) — Free or Paid.
- **Summary** (required).
- **SEO Meta Title** (optional, ≤255), **SEO Meta Description** (optional).
- **Content** (required) — rich text editor (bold, italic, headings, lists, blockquotes, links, images, raw HTML).
- **Active** (required), **Drip Content** (off), **Display in Course** (required), **Is Mandatory?** (required), **Label** (optional).

## Add a Quiz

Chapter **+** → **New Quiz**. Settings:

- **Quiz Title** (required).
- **Duration (Seconds)** (optional), **Time (Minutes)** (blank = unlimited), **Number of Attempts** (blank = unlimited).
- **Pass Mark** (required) — this is **marks, not percentage**. In-chapter quizzes = 100% of total marks; the final course quiz = 70%. Always confirm the passing % with program managers.
- **Certificate Included** (off), **Custom Result Message** (off).
- **Active Quiz** (required), **Is This Final Quiz?** (required), **Display in Course** (required), **Is Mandatory?** (required).
- **Expert Quiz** (off) — a student who knows the content takes the quiz directly without watching lectures; passing marks the entire chapter complete.
- **Label** (optional).

**Adding questions:**

- **Multiple Choice question** — Question Title (required), Grade (required), Negative Grade (default 0), Image/Video (optional). Per option click **Add an answer** → **Answer Title** (required), **Answer Image** (optional), **Correct Answer** (at least one required — the quiz won't work without it), red ✕ removes an option. **Correct answer explanation** (rich text, shown after answering).
- **Descriptive question** — Question Title (required), Grade (required), Image/Video (optional), **Correct Answer** (required — student responses are compared against this).

Standalone quiz management also exists at `/admin/quizzes`.

## Add an Assignment

Chapter **+** → **New Assignment**:

- **Title** (required) — also used for virtual-internship assignments.
- **Description** (required) — instructions.
- **Grade** (required, total marks), **Pass Grade** (required, minimum to pass).
- **Deadline** (optional, display only), **Attempts** (optional), **Attachments** (optional, reference files).
- **Active** (required), **Auto Approved** (off — auto-approve without manual review).
- **URL Response** (off — allow URL answers), **Text Response** (required — enables text answers and approval/rejection emails), **File Upload Response** (required — lets learners upload a file).
- **Approved Message** (required), **Under Review Message** (required), **Rejected Message** (required).
- **Drip Content** (off), **Display in Course** (required), **Is Mandatory?** (required), **Lock for Free Users (Micro Course)** (off), **Label** (optional).

Standalone assignment review also exists at `/admin/assignments` (approve/reject submissions).

## Things to watch out for

- Always add at least one chapter — even for testing; saving without chapters causes errors.
- "New Section" = new chapter — Sections are chapters, Topics are lectures.
- Pass Mark is marks, not percentage — in-chapter quizzes 100%, final quiz 70%; confirm with program managers.
- Mark at least one Correct Answer — multiple choice won't work without it.
- Drip Content is off by default everywhere.

## Related

- [Courses](courses.md) — the full 7-step course wizard this step belongs to.
- [Admin Routes](admin_routes.md) — standalone `/admin/quizzes` and `/admin/assignments`.
