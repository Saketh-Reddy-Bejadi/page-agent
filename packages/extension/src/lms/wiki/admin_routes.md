---
type: Route Reference
title: Admin Routes
description: Authoritative map of admin panel routes (path, controller, action) for every feature area, for navigation and deep-linking.
route: /admin
tags: [routes, navigation, reference, controllers]
source: lms-web/routes/admin.php
timestamp: 2026-06-29
---

# Admin Routes

Every admin route is under the `/admin` prefix and the `admin` middleware (auth + admin check). Controllers resolve under `App\Http\Controllers\Admin`. **Permissions are enforced inside controllers, not in the route file** — there is no `can:` middleware on these routes. Use this page to find the right landing route for any feature, then consult the feature page for UI steps/selectors.

Use only real `/admin/...` web routes as navigation targets — never `.md` files or `/wiki/` paths.

## Education

| Feature             | Landing                  | Create                              | Notable actions                                                                                                                          |
| :------------------ | :----------------------- | :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| Courses (Webinars)  | `/admin/webinars`        | `/admin/webinars/create`            | `/admin/webinars/{id}/step/{step?}`, `/admin/webinars/{id}/students`, `/admin/webinars/{id}/delete` — see [Courses](courses.md)          |
| Bootcamps (Bundles) | `/admin/bundles`         | `/admin/bundles/create`             | `/admin/bundles/{id}/step/{step?}`, `/admin/bundle-webinars/store`, `/admin/bundles/community-champions` — see [Bootcamps](bootcamps.md) |
| Micro Courses       | `/admin/micro-courses`   | `/admin/micro-courses/create`       | `/admin/micro-courses/{id}/edit`                                                                                                         |
| Course Types        | `/admin/course-types`    | `/admin/course-types/create`        |                                                                                                                                          |
| Quizzes             | `/admin/quizzes`         | `/admin/quizzes/create`             | `/admin/quizzes/{id}/results`, `/admin/quizzes-questions/store`, `/admin/webinar-quiz/store`                                             |
| Assignments         | `/admin/assignments`     | (created inside course content)     | `/admin/assignments/assignment-submission-approve/{historyId}` (POST), `.../assignment-submission-reject/{historyId}` (POST)             |
| Certificates        | `/admin/certificates`    | `/admin/certificates/templates/new` | `/admin/certificates/{id}/download`, `/admin/certificates/templates`                                                                     |
| Practice Arenas     | `/admin/practice-arenas` | `/admin/practice-arenas/create`     | `/admin/practice-arena-problems`, `/admin/practice-arena-problems/create`                                                                |

## Financial

| Feature                     | Landing                                        | Notable actions                                                                                                                                 |
| :-------------------------- | :--------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| Orders                      | `/admin/orders`                                | `/admin/orders/{id}/detail`, `/admin/orders/{id}/refund`, `/admin/orders/refund` (POST), `/admin/orders/{id}/recheck` — see [Orders](orders.md) |
| Store Orders                | `/admin/store/orders`                          | `/admin/store/orders/{id}/invoice`, `/admin/store/orders/{id}/refund`                                                                           |
| Offline Payments            | `/admin/financial/offline_payments`            | `.../{id}/approved` (GET), `.../{id}/reject` (GET) — see [Offline Payments](offline_payments.md)                                                |
| Discounts / Coupons         | `/admin/financial/discounts`                   | `/admin/financial/discounts/new`, `/admin/financial/discounts/bulk`                                                                             |
| Subscription Discount Codes | `/admin/financial/subscription-discount-codes` | `.../new`, `.../{id}/edit`                                                                                                                      |
| Payouts                     | `/admin/financial/payouts`                     | `.../{id}/payout` (GET), `.../{id}/reject` (GET), `.../excel`                                                                                   |

## Users & Access

| Feature                 | Landing                                | Notable actions                                                     |
| :---------------------- | :------------------------------------- | :------------------------------------------------------------------ |
| Students                | `/admin/students`                      | impersonate / edit / delete — see [Users](users.md)                 |
| Staff                   | `/admin/staffs`                        |                                                                     |
| Instructors             | `/admin/instructors`                   | `/admin/users/become-instructors/{page}`                            |
| Organizations           | `/admin/organizations`                 |                                                                     |
| Create user             | `/admin/users/create`                  | `/admin/users/store` (POST)                                         |
| Roles                   | `/admin/roles`                         | `/admin/roles/create`, `/admin/roles/{id}/edit` (permission matrix) |
| Groups                  | `/admin/users/groups`                  | `/admin/users/groups/create`                                        |
| Badges                  | `/admin/users/badges`                  | `/admin/users/badges/store` (POST)                                  |
| Delete-account requests | `/admin/users/delete-account-requests` | `.../{id}/confirm`                                                  |

## Events & Engagement

| Feature             | Landing                      | Notable actions                                                                         |
| :------------------ | :--------------------------- | :-------------------------------------------------------------------------------------- |
| Events              | `/admin/events`              | `/admin/events/create`, `/admin/events/{id}/bookings`, `/admin/events/start-event/{id}` |
| Live Sessions       | `/admin/live-sessions`       | `/admin/live-sessions/create`, `.../{id}/submissions`                                   |
| Placements          | `/admin/placements`          | `/admin/placements/create`                                                              |
| Noticeboards        | `/admin/noticeboards`        | `/admin/noticeboards/send`, `/admin/noticeboards/store` (POST)                          |
| Course Noticeboards | `/admin/course-noticeboards` | `/admin/course-noticeboards/send`                                                       |

## Conventions

- List/index = `GET /admin/{feature}`; create form = `GET .../create` (or `/new`); save = `POST .../store`; edit form = `GET .../{id}/edit`; update = `POST .../{id}/update`; delete = `GET .../{id}/delete`.
- Multi-step editors expose `GET .../{id}/step/{step?}` (webinars, bundles, practice-arenas).
- Destructive actions (delete, approve, reject, payout) are typically GET routes fired from a confirmation button carrying `data-confirm-href` — automation must target `data-confirm-href`, not an `href`.
