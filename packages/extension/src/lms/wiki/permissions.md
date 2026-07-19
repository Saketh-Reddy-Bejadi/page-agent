---
type: System Concept
title: Permissions & Roles
description: How admin access control works (admin gate + per-section permission gates) and how to manage roles and their permissions.
route: /admin/roles
tags: [permissions, roles, access-control, gates, security]
source: lms-web/app/Providers/AuthServiceProvider.php, lms-web/app/User.php, lms-web/app/Models/Role.php, lms-web/resources/views/admin/roles
timestamp: 2026-06-29
---

# Permissions & Roles

Admin access control has two layers: a coarse **admin gate** (can you enter `/admin` at all) and fine-grained **per-section permissions** (which features you can use). Managed from `/admin/roles`.

> Source note: derived from the codebase (`AuthServiceProvider`, `User`, `Role`, `Section`, `Permission`, roles views). Not covered in the operator handbook (`admin.md`).

## How it works

- **Admin gate** — the `admin` middleware (`AdminAuthenticate`) requires `auth()->user()->isAdmin()`, which returns `$this->role->is_admin`. A user can only load any `/admin/...` route if their **role** has `is_admin = true`.
- **Sections = permissions** — each row in the `sections` table is one permission. A `Section` has a `name` (the gate string, e.g. `admin_webinars`, `admin_orders_list`) and a `caption` (the human label shown in the UI). Sections can have `children` (nested sub-permissions).
- **Gates** — at boot, `AuthServiceProvider` loads `Section::all()` (cached as `sections_ids` for 30 days) and defines one Gate per section: `Gate::define($section->name, fn($user) => $user->hasPermission($section->name))`. So every section name is usable as a gate.
- **Permission check** — `User::hasPermission($section_name)` returns `false` unless the user `isAdmin`, then looks up `Permission` rows for the user's `role_id` where `allow = true`, maps `section_id → Section.name`, and checks membership. Results are cached for 1 hour per role (`section_permissions_list_{roleId}`, `section_permissions_section_names_{roleId}`).
- **Where checks run** — controllers via `$this->authorize('section_name')` / `can('section_name')`; Blade UI via `@can('section_name')` and `@canany([...])` (e.g. the sidebar hides items the role can't access). Routes themselves carry no `can:` middleware — enforcement is in controllers/views.

## Routes (`/admin/roles`)

| Action      | Method | Route                      |
| :---------- | :----- | :------------------------- |
| List roles  | GET    | `/admin/roles`             |
| New role    | GET    | `/admin/roles/create`      |
| Save new    | POST   | `/admin/roles/store`       |
| Edit role   | GET    | `/admin/roles/{id}/edit`   |
| Update role | POST   | `/admin/roles/{id}/update` |
| Delete role | GET    | `/admin/roles/{id}/delete` |

## Create / edit a role (assign permissions)

Form: `form[action="/admin/roles/store"]` (edit posts to `/admin/roles/{id}/update`, method Post).

1. Go to `/admin/roles` and click **New** (or **Edit** an existing role).
2. **Name** (`name="name"`) — role identifier (rendered hidden when editing an existing role).
3. **Caption** (`name="caption"`) — human-readable display name.
4. **Is Admin** (`input#isAdmin[name="is_admin"]`, `.section-parent` checkbox) — toggle on to grant admin-panel access. The permission matrix (`#sections`) is hidden (`d-none`) until this is on.
5. **Permission matrix** (`#sections`) — one `.card.section-box` per top-level section. Each is a checkbox `input[name="permissions[]"][id="permissions_{sectionId}"][value="{sectionId}"]` (class `section-parent` for top-level, `section-child` for nested), labelled with the section's caption. Tick the sections this role may use.
6. Submit with `button.btn-primary`.

## Important

- A role needs **Is Admin** on before any per-section permission applies — `hasPermission()` returns false for non-admin roles regardless of ticked boxes.
- Permission changes are **cached** (30 days for the section list, 1 hour per-role for grants). `RoleController@update` calls `resetRolePermissionCache()` to clear the per-role caches on save, so updates take effect immediately for that role.
- Assigning a user to a role is done on the user record (`role_id`), not here — see [Users](users.md).

## Related

- [Users](users.md) — assign a role to a user. · [Admin Routes](admin_routes.md).
