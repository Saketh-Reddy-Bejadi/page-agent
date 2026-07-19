---
type: Admin Workflow
title: Offline Payments
description: Review, approve, and reject manual/offline bank payments submitted by students.
route: /admin/financial/offline_payments
tags: [financial, offline-payments, approvals, wallet]
source: lms-web/routes/admin.php, lms-web/resources/views/admin/financial/offline_payments, lms-web/app/Models/OfflinePayment.php
timestamp: 2026-06-29
---

# Offline Payments

Students who pay by bank transfer submit an offline payment with proof; an admin reviews and approves or rejects it. Backed by the `OfflinePayment` model.

> Source note: derived from the codebase (routes + blade views + model). The operator handbook (`admin.md`) does not yet document this screen, so selectors/routes below are authoritative; exact button copy may vary.

## Routes (all under `/admin/financial/offline_payments`)

| Action       | Method | Route                                             |
| :----------- | :----- | :------------------------------------------------ |
| List         | GET    | `/admin/financial/offline_payments`               |
| Approve      | GET    | `/admin/financial/offline_payments/{id}/approved` |
| Reject       | GET    | `/admin/financial/offline_payments/{id}/reject`   |
| Export Excel | GET    | `/admin/financial/offline_payments/excel`         |

Note: approve and reject are **GET** routes triggered through a confirmation button (not POST form submits).

## List & filters (`/admin/financial/offline_payments`)

- The list has two views via hidden `name="page_type"`: **requests** (pending) and **history**.
- Filters: **Search** (`name="search"`), Date range (`name="from"` `#fsdate` / `name="to"` `#lsdate`), **Status** (`name="status"`, history only: `approved`, `reject`), Role (`name="role_id"`), Users (`name="user_ids[]"`), Account type (`name="account_type"`, e.g. bank), Sort (`name="sort"`: `amount_asc/desc`, `pay_date_asc/desc`). Submit **Show results**.
- View the uploaded proof: `a[href="{attachment path}"][target="_blank"]`.

## Approve / Reject

Action buttons appear only in the **requests** view for rows with status `waiting`. Both are confirm buttons (read `data-confirm-href`, not `href`):

- **Approve:** `button[data-confirm-href="/admin/financial/offline_payments/{id}/approved"]` (icon `fa-check`).
- **Reject:** `button[data-confirm-href="/admin/financial/offline_payments/{id}/reject"]` (icon `fa-times-circle`).

Approving credits the student (wallet/ledger) and is what unlocks their purchase; rejecting dismisses the request.

## Status values (`OfflinePayment`)

`waiting` (pending review) · `approved` · `reject`. Key fields: `user_id, amount, bank, reference_number, attachment, pay_date, status`.

## Related

- [Orders](orders.md) · [Admin Routes](admin_routes.md)
