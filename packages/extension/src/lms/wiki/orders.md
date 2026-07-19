---
type: Admin Workflow
title: Orders
description: Audit course/bootcamp orders, view details, recheck payment status, and process refunds.
route: /admin/orders
tags: [financial, orders, refunds, sales]
source: lms-web/routes/admin.php, lms-web/resources/views/admin/orders, lms-web/app/Models/Order.php
timestamp: 2026-06-29
---

# Orders

Order auditing and refunds for digital purchases (courses, bootcamps, etc.). Backed by the `Order` model. Physical-product (store) orders live under a separate `/admin/store/orders` group.

> Source note: derived from the codebase (routes + DataTable/transformer + model). Not yet covered in the operator handbook (`admin.md`).

## Routes

| Action         | Method | Route                        |
| :------------- | :----- | :--------------------------- |
| List           | GET    | `/admin/orders`              |
| Order detail   | GET    | `/admin/orders/{id}/detail`  |
| Recheck order  | GET    | `/admin/orders/{id}/recheck` |
| Refund view    | GET    | `/admin/orders/{id}/refund`  |
| Process refund | POST   | `/admin/orders/refund`       |
| Store orders   | GET    | `/admin/store/orders`        |

## List (`/admin/orders`)

Server-side DataTable: `table#enroll-table`. Columns: `id, user_name, user_email, amount, total_amount, status, payment_gateway, created_at, action`. Each row carries `data-id="{orderId}"`.

Row actions (rendered by `OrderTransformer`):

- **Refund:** `a.btn.btn-sm.btn-primary[target="_blank"]` → the refund view (`/admin/orders/{id}/refund`). Text is "Refund", or "Refund Details" if already refunded. Shown unless the order is `pending`/`fail`, and only with the `admin_sales_refund` permission.
- **Invoice:** `a.btn.btn-sm.btn-primary[target="_blank"]` → download invoice. Shown unless `pending`/`fail`.

There is no inline Edit/Delete on this list.

## Status & types (`Order`)

Status: `pending` · `paying` · `paid` · `refunded` · `fail`.
Types include: `webinar`, `bundle`, `meeting`, `charge`, `subscribe`, `promotion`, `registration_package`, `product`, `event_booking` (plus ledger types `addiction`, `deduction`, `income`, `asset`).
Key fields: `user_id, amount, total_amount, status, payment_gateway, payment_gateway_id, currency, created_at`.

## Related

- [Offline Payments](offline_payments.md) · [Admin Routes](admin_routes.md)
