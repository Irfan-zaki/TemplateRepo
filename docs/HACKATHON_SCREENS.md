# DealFlow360: Screen Data (24-hour hackathon)

Source: `docs/DealFlow360 - End to End Product Flow 24 hours oxp.excalidraw`
(18 frames, 654 text elements, 24 arrows). Every title, field, button, and rule below is copied from that file.

This file replaces the earlier guessed version based on the low-resolution board screenshots.

## Navigation

Top tab bar on every internal screen: **Dashboard, Quotations, Approvals, Fulfillment, Subscriptions, Invoices, Deal Health, Reports, Product**.

| Tab | Opens |
| --- | --- |
| Dashboard | Screen 2 |
| Quotations | Screen 3 (list), click row -> Screen 4 (detail) |
| Approvals | Screen 5 (list), click row -> Screen 6 (detail) |
| Fulfillment | Screen 7 (list), click row -> Screen 8 (detail) |
| Subscriptions | Screen 9 (list), click row -> Screen 10 (detail) |
| Invoices | Screen 12 (list), click row -> Screen 13 (detail) |
| Deal Health | Screen 14 |
| Reports | Screen 15 |
| Product | Screen 16 (list), click row -> Screen 17 (detail) |

Customer side: **My Quotation, Messages, Profile** open Screen 11 (Customer Portal).
Setup: Screen 18 (Discount tiers and approval chains) is reached from Product.

Pattern: every module has one **list** screen and one **detail** screen. The detail screen opens by clicking a row.

---

## Screen 1: Login / Signup

- **Purpose:** entry point for internal users and customers.
- **Title:** DealFlow360 / Login / Signup
- **Subtitle:** Entry point for internal users and customers
- **Actions:** Log In, Sign Up, Forgot Password?
- **Fields:** Email, Password
- **Rules:**
  - Company / team selector shown for multi-team setups.
  - Basic validation on email and password.
  - Sign Up creates a new internal or customer account.
  - After login, internal users go to Screen 2 (Sales Dashboard). Customers go to Screen 11 (Customer Portal).

## Screen 2: Sales Dashboard

- **Purpose:** central hub that links to every module.
- **Title:** Sales Dashboard / Home
- **Cards:** Pending Approvals (4 quotations waiting), Open Quotations (12 active deals), At-Risk Deals (3 flagged by Deal Health)
- **Actions:** + New Quotation, View Approvals
- **Recent Activity feed (sample):**
  - Acme Corp quotation approved by Finance
  - Beta Industries requested a discount change
  - East Depot stock updated for Order #2291

## Screen 3: Quotations List

- **Title:** Quotations (List)
- **Subtitle:** Every quotation in the system, one row per quotation, click a row to open it
- **Status filters:** Draft, Pending Approval, Approved, Negotiation, Confirmed
- **Sample rows:** Acme Corp $12,400 · Beta Industries $28,900 · Nova Retail $9,750 · Zenith Co $15,300 · Orion Ltd $41,000 · Delta LLC $3,200
- **Actions:** + New Quotation, Switch to Table View

## Screen 4: Quotation Detail

- **Title:** Quotation Detail: Q-1042 (Acme Corp)
- **Subtitle:** Add products, apply discounts, review upsells.
- **Line table columns:** Product, Qty, Price, Discount, Limit, Status
- **Sample lines:**

| Product | Qty | Price | Discount | Limit | Status |
| --- | --- | --- | --- | --- | --- |
| Laptop Pro 14 | 2 | $1,200 | 12% | 15% | OK |
| Onsite Setup Service | 1 | $450 | 18% | 10% | OVER (+8pt) |
| Extended Warranty | 1 | $180 | 10% | 15% | OK |

- **Rule:** discount is checked against each line's own limit **live, as soon as it is entered**, not only at submit.
- **Upsell suggestions:** + Wireless Mouse (Margin +$18), + Docking Station (Promo: 12% off), + Care Plan 2yr (Margin +$46)
- **Actions:** Save Draft, Submit for Approval

## Screen 5: Approvals List

- **Title:** Approvals (List)
- **Subtitle:** Every quotation that needed, needs, or is going through discount approval.
- **Counters:** 3 Pending, 1 Returned, 12 Approved
- **Columns:** Quotation, Customer, Blended Risk, Stage, Assigned To
- **Sample rows:**
  - Q-1042 · Acme Corp · HIGH · Sales Manager · M. Shah
  - Q-1039 · Beta Industries · MEDIUM · Finance · R. Iyer
  - Q-1035 · Nova Retail · LOW · Auto-Approved · -
- **Filter:** Pending Only
- **Rule:** click any row to open its approval detail, risk breakdown, and audit trail.

## Screen 6: Approval Detail

- **Title:** Approval Detail: Q-1042 (Acme Corp)
- **Header:** Blended Risk: HIGH · Customer Tier: Gold
- **Section: Why This Quote Was Flagged**

| Line | Discount Given | Limit Allowed | Over By |
| --- | --- | --- | --- |
| Laptop (Hardware) | 12% | 15% | 0 pt, OK |
| Setup Service (Services) | 18% | 10% | 8 pt, OVER |

- **Rule:** the worst single line (8 pt over) plus the overall pattern across the order sets the blended score. **One bad line is enough to require approval.**
- **Approval chain:** Submitted -> Sales Manager -> Finance -> Confirmed
- **History:**
  - J. Rao · Submitted · Aug 20 · Initial 12% discount
  - M. Shah · Returned · Aug 21 · Requested justification
  - J. Rao · Resubmitted · Aug 22 · Added margin note
- **Actions:** Approve, Return for Revision, Reject

## Screen 7: Fulfillment List

- **Title:** Fulfillment and Stock (List)
- **Subtitle:** Live stock per warehouse, plus every order that still needs fulfilling.
- **Stock columns:** Warehouse, Product, In Stock, Reserved, Available
- **Sample stock:**
  - Main Warehouse · Laptop Pro 14 · 40 / 18 / 22
  - East Depot · Laptop Pro 14 · 10 / 6 / 4
  - Main Warehouse · Docking Station · 65 / 12 / 53
- **Orders awaiting fulfillment:**
  - Q-1042 · Acme Corp · Split Pending · Main + East Depot
  - Q-1030 · Zenith Co · Backorder · East Depot
- **Rule:** click an order row to open its warehouse split detail.

## Screen 8: Fulfillment Detail

- **Title:** Fulfillment Detail: Q-1042 (Acme Corp)
- **Columns:** Warehouse, Qty Fulfilled, Est. Shipments, Cost
- **Rows:** Main Warehouse · 18 units · 1 shipment · $42 · East Depot · 6 units · 1 shipment · $29
- **Rule:** a "Consolidate Remaining Backorder" prompt appears automatically once East Depot restocks.
- **Actions:** Accept Suggested Split, Manual Override

## Screen 9: Subscriptions List

- **Title:** Subscriptions (List)
- **Subtitle:** Every recurring plan across every customer, regardless of which order it came from.
- **Counters:** 18 Active, 2 Paused, 3 Cancelled
- **Columns:** Customer, Plan, Cycle, Next Bill, Status
- **Sample rows:**
  - Acme Corp · Care Plan 2yr · Monthly · Sep 15 · Active
  - Beta Industries · Support SLA · Quarterly · Nov 1 · Active
  - Delta LLC · Care Plan 1yr · Monthly · - · Paused
- **Rule:** click a row to open billing detail and proration history.
- **Actions:** + New Plan (Admin only)

## Screen 10: Billing Detail

- **Title:** Billing Detail: Acme Corp, Care Plan 2yr
- **One-time lines (from originating order):** Laptop Pro 14 × 2 = $2,280 · Onsite Setup × 1 = $450
- **Recurring lines:** Care Plan 2yr, Monthly, next bill Sep 15, $46 · Support SLA, Quarterly, next bill Nov 1, $300
- **Actions:** Modify Subscription, Cancel Subscription

## Screen 11: Customer Portal (Negotiation)

- **Tabs:** My Quotation, Messages, Profile
- **Title:** Customer Portal Negotiation Screen
- **Subtitle:** Customer reviews and negotiates the quote directly, no email needed.
- **Status:** Under Negotiation
- **Columns:** Line, Customer Comment (sample: "Can this be 15% off instead of 10%?" on Extended Warranty; "Can we push this to next month?" on Onsite Setup)
- **Inputs:** Counter Discount %, Requested Delivery Date
- **Actions:** Submit Request, Confirm Quotation
- **Rule:** if final terms exceed thresholds, the quote automatically re-enters approval (Screen 6).

## Screen 12: Invoices List

- **Title:** Invoices (List)
- **Subtitle:** Every invoice generated from one-time and recurring orders.
- **Counters:** 4 Unpaid, 21 Paid
- **Columns:** Invoice #, Customer, Amount, Status, Due Date
- **Sample rows:**
  - INV-1042 · Acme Corp · $2,730 · Unpaid · Sep 10
  - INV-1043 · Acme Corp · $46 · Paid · Sep 15
  - INV-1038 · Nova Retail · $9,750 · Paid · Aug 30
- **Rule:** click a row to open payment and delivery reconciliation.

## Screen 13: Invoice Detail

- **Title:** Invoice Detail: INV-1042 (Acme Corp)
- **Lifecycle:** Order Confirmed -> Shipped -> Invoiced -> Paid
- **Invoice rows:** INV-1042 · $2,730 · Unpaid · Sep 10 · INV-1043 (Recurring) · $46 · Paid · Sep 15
- **Actions:** Record Payment, Download Summary
- **Rule:** partial invoicing stays reconciled with partial delivery. **Nothing is billed before it ships.**

## Screen 14: Deal Health Dashboard

- **Title:** Deal Health and Anomaly Dashboard
- **Subtitle:** Real-time flags for stalled deals and unusual discount patterns.
- **Cards:** Stalled Deals (5 quotes idle 7+ days) · Discount Anomalies (2 above rep average) · Delivery Slippage (3 promise dates at risk)
- **Columns:** Deal, Issue, Flagged, Action
- **Sample rows:**
  - Zenith Co · Idle 9 days · Aug 24 · Nudge sent
  - Delta LLC · Discount 22% vs avg 8% · Aug 25 · Escalated to Manager
- **Actions:** Escalate, Nudge Rep

## Screen 15: Admin / Reporting Dashboard (Optional)

- **Subtitle:** Sales trends, approval bottlenecks, and platform usage.
- **Filters:** Period, Sales Team, Approval Status, Product
- **Metrics:** Quotes Created (148 this month) · Avg Approval Time (6.4 hours) · Top Upsold Product (Care Plan 2yr)
- **Actions:** Export PDF, Export XLS

## Screen 16: Product Catalog

- **Title:** Product catalog
- **Subtitle:** Every product, variant, and price list in one place.
- **Counters:** Total Products 128 active, 6 archived · Pricelists 3 tiers, 2 currencies · Variants 340 SKUs
- **Columns:** Product name, Category, Variants, Price, Unit, Tax, Status
- **Sample rows:**
  - Laptop Pro 14 · Hardware · 3 (size) · $1,200 · Each · 15% · Active
  - Onsite Setup Service · Services · - · $450 · Each · 10% · Active
  - Docking Station · Hardware · 3 (color) · $180 · Each · 15% · Active
  - Care Plan 3 years · Subscription · - · $40/month · Recurring · 0% · Active
- **Actions:** + New Product, Manage Price fields
- **Rule:** click a row to open general info, variants, and tier/currency price lists.

## Screen 17: Product Details

- **Title:** Product and pricelist
- **General info fields:** Product name, Category, Price, Unit, Quantity on hand (integer), Tax %, Description
- **Subscription:** Subscription Yes/No. If Yes, the Recurring field appears with Monthly / Yearly / Weekly.
- **Product variants:**
  - Color: Blue, Black (extra price 0)
  - RAM: 4GB, 8GB (+$30)
  - Manufacturer: Dell, HP (+$10 / +$30)
- **Pricelists:**
  - Bronze, USD, Price, no adjustment
  - Gold, USD/EUR, Price minus 10% base
- **Notes:**
  - Product details must be filled.
  - Recurring orders with this product are invoiced at the beginning of the period.

## Screen 18: Discount Tiers and Approval Chains

- **Title:** Discount tiers and approval chains
- **Tier discount ceilings:** Bronze 5% · Silver 10% · Gold 15%
- **Category discount ceilings:** Hardware 15% · Services 10%
- **Approval routing:**

| Discount range | Result |
| --- | --- |
| Within tier / category limit | No approval needed |
| Over limit, blended risk medium | Sales Manager |
| Over limit, blended risk high | Sales Manager, then Finance |

- **Rules:**
  - When a quote mixes categories with different ceilings, the system computes a blended risk score and routes to the highest required level.
  - All approvals, rejections, and edits are logged with user, timestamp, and reason.
- **Actions:** Save configuration

---

## Business rules (cross-screen)

1. **Live discount check:** each line is checked against its own limit as soon as it is entered (Screen 4).
2. **Blended risk:** the worst line plus the overall pattern sets the score. One line over its limit is enough to require approval (Screens 4, 6, 18).
3. **Negotiation re-approval:** if customer-negotiated terms exceed thresholds, the quote returns to approval (Screen 11 -> Screen 6).
4. **Billing timing:** nothing is invoiced before it ships. Recurring orders are invoiced at the start of each period (Screens 13, 17).
5. **Audit:** every approval, rejection, and edit is logged with user, timestamp, and reason (Screens 6, 18).
6. **Admin only:** creating a new subscription plan (Screen 9).

## Inconsistencies to check before building

1. **Care Plan naming:** Screens 4 and 9 say "Care Plan 2yr". Screen 16 says "Care Plan 3 years" at $40/month. Pick one name and price.
2. **Laptop line total:** Screen 4 shows 2 × $1,200 with 12% discount, which is about $2,112. Screen 10 bills it at $2,280, which is a 5% discount. Confirm which is correct.
3. **Setup Service:** Screen 4 applies an 18% discount to $450 (about $369). Screen 10 bills $450. Confirm.
4. **Dates:** approval history uses Aug 20–25 and invoices use Aug 30 to Sep 15. Confirm the demo calendar.
5. **Typo on the board:** "adjustmeent" on Screen 17 should read "adjustment".

## Next steps

Build per `AGENTS.md` and `docs/HACKATHON_PLAYBOOK.md`:

1. Start with the **Quotation -> Approval -> Fulfillment -> Invoice** happy path. It has the most business logic.
2. Put every list and detail page behind the central `apiClient`. Backend routes need `requireRole` for approvals and new subscriptions.
3. Use `apps/frontend/DESIGN.md` for colours and status tokens. The board uses blue nav bars and red/green/orange buttons, which must map to the semantic tokens.
