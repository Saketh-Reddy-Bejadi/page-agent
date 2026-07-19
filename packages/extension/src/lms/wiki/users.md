---
type: Admin Workflow
title: Users
description: Manage students, staff, and instructors — edit, impersonate (login as), grant change permissions, and delete accounts.
route: /admin/students
tags: [users, students, staff, instructors, impersonate, roles]
source: lms-web/routes/admin.php, lms-web/resources/views/admin/users, lms-web/app/User.php
timestamp: 2026-06-29
---

# Users

Administer accounts. There are separate listing screens for **students** (`/admin/students`), **staff** (`/admin/staffs`), **instructors** (`/admin/instructors`), and **organizations** (`/admin/organizations`). Create/edit/delete actions live under `/admin/users/*`. Backed by the `User` model (`App\User`).

> Source note: derived from the codebase (routes + blade views + model). Not yet covered in the operator handbook (`admin.md`).

## Routes

| Action                        | Method | Route                                              |
| :---------------------------- | :----- | :------------------------------------------------- |
| Students list                 | GET    | `/admin/students`                                  |
| Staff list                    | GET    | `/admin/staffs`                                    |
| Instructors list              | GET    | `/admin/instructors`                               |
| New user (form)               | GET    | `/admin/users/create`                              |
| Save new                      | POST   | `/admin/users/store`                               |
| Edit                          | GET    | `/admin/users/{id}/edit`                           |
| Update                        | POST   | `/admin/users/{id}/update`                         |
| Impersonate (login as)        | GET    | `/admin/users/{user_id}/impersonate`               |
| Delete                        | GET    | `/admin/users/{id}/delete`                         |
| Allow certificate-name change | GET    | `/admin/users/enable-change-certificate-name/{id}` |
| Allow phone-number change     | GET    | `/admin/users/enable-change-phone-number/{id}`     |
| Export students Excel         | GET    | `/admin/students/excel`                            |

Roles & permissions are managed separately at `/admin/roles` (see [Admin Routes](admin_routes.md)).

## Students list (`/admin/students`)

- Filters (GET): **Search** (`name="full_name"`), Date range (`name="from"`/`name="to"`), Sort (`name="sort"`), Organization (`name="organization_id"`), Group (`name="group_id"`), **Status** (`name="status"`: `active_verified`, `active_notVerified`, `inactive`, `ban`). Submit **Show results**.
- Row actions (dropdown `.dropdown-menu.webinars-lists-dropdown`, toggle `button.btn-transparent.dropdown-toggle` `fa fa-ellipsis-v`):
    - **Login / Impersonate:** `a[href="/admin/users/{id}/impersonate"][target="_blank"]` — opens the app as that user.
    - **Edit:** `a[href="/admin/users/{id}/edit"]` (`fa fa-edit`).
    - **Allow Certificate Name Change** / **Allow Phone Number Change** (the enable-change routes above).
    - **Delete:** `button[data-confirm-href="/admin/users/{id}/delete"]` (confirm button — read `data-confirm-href`).

## Status values (`User`)

`active` · `pending` · `inactive`. A separate `ban` flag (with `ban_end_at`) handles bans — it is not part of `status`. Key fields: `full_name, email, mobile, role_id, status, ban, certificate_name_editable, email_verified_at, phone_verified_at`.

## Related

- [Admin Routes](admin_routes.md) — roles, groups, badges, become-instructor, delete-account requests.
