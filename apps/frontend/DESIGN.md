# HackCore UI Design System (Odoo theme)

Single source of truth for `apps/frontend` visual language. **This document is the contract.** Tokens live in `src/styles/tokens.css`; shared components live in `src/components/ui/`. Do not invent one-off styles in feature pages.

## 1. Philosophy: flat, warm, full-width Odoo

HackCore looks like a modern Odoo back-office: warm off-white surfaces, muted plum actions, teal links, tinted pill badges, and lists that run edge to edge.

| Rule | What it means |
| --- | --- |
| **Full-bleed** | The shell and every list use the whole browser width. No max-width wrapper and no floating card around a page. |
| **Flat** | Elevation is a 1px hairline border. No shadows. |
| **Warm** | Beige and off-white surfaces, never pure white or cool slate. |
| **Quiet colour** | Plum for actions, teal for links and info, status colours only for status. |

**No gradients. No emoji in the DOM.** Solid fills only. Error, success, and warning use the semantic tokens in section 2.

---

## 2. Colours: how to change them

Two steps. Everything lives in `src/styles/tokens.css`.

1. **Palette (section A):** raw hex codes, grouped by colour family. Change a hex code here and every screen updates. This is the only place hex codes live.
2. **Meaning (section B):** what each colour is used for. Screens use these names. Change a name's target here to repoint a use, for example make all buttons teal.

### What each colour is for (plain language)

| Group | Name in code | What it colours |
| --- | --- | --- |
| **Page** | `--page` | Whole background |
| **Surfaces** | `--card` | Cards, table body, inputs, dialogs |
| | `--section` | Table header, summary boxes, hover on nav |
| | `--line` / `--line-strong` | Thin dividers / input and secondary button borders |
| **Text** | `--text` | Headings and main text |
| | `--text-muted` | Subtitles, helper text, secondary table text |
| **Brand (plum)** | `--brand` | Main buttons, logo, active tab underline |
| | `--brand-hover` / `--brand-press` | Same button when hovered / pressed |
| | `--brand-tint` / `--brand-line` | Light plum tiles and borders |
| | `--on-brand` | Text on plum buttons |
| **Accent (teal)** | `--accent` | Focus ring (keyboard outline) |
| | `--accent-text` | Links and info text |
| | `--accent-tint` / `--accent-line` | Info badges and tiles |
| **Success (green)** | `--success`, `--success-bg`, `--success-text`, `--success-line` | Active, paid, approved |
| **Warning (amber)** | `--warning`, `--warning-bg`, `--warning-text`, `--warning-line` | Pending, mock mode |
| **Danger (rose)** | `--danger`, `--danger-bg`, `--danger-text`, `--danger-line`, `--on-danger` | Errors, rejected, delete buttons |
| **Neutral (grey-beige)** | `--neutral-bg`, `--neutral-text`, `--neutral-line` | Idle or unknown status |

Pattern for status groups: plain name = strong colour, `-bg` = background, `-text` = text on the background, `-line` = border.

### Palette (section A)

| Family | Names | Used for |
| --- | --- | --- |
| Beige | `--beige-0` to `--beige-4` | White-ish cards, page, section, lines |
| Ink | `--ink-1`, `--ink-2` | Main text, secondary text |
| Plum | `--plum-1` to `--plum-5` | Brand buttons and tints |
| Teal | `--teal-1` to `--teal-4` | Accent, links, focus |
| Green | `--green-1` to `--green-4` | Success |
| Amber | `--amber-1` to `--amber-4` | Warning |
| Rose | `--rose-1` to `--rose-4` | Danger |
| White | `--white` | Text on danger buttons |

### Rules that do not change

- Plum is never a status colour. Teal is never a status colour.
- No gradients, no shadows, no emoji.
- Do not use the blue, red or green of other palettes (for example `#2563eb`).

## 3. Typography

Loaded via Google Fonts in `index.html`.

| Role | Family | Token |
| --- | --- | --- |
| UI, headings, forms, tables | **Inter** | `--font-sans` |
| IDs, money, clock times, technical metadata | **JetBrains Mono** + `tabular-nums` | `--font-mono` |

| Token | Size | Usage |
| --- | ---: | --- |
| `--text-xs` | 12px | Badges, technical metadata |
| `--text-sm` | 13px | Helper text, table headers, small buttons |
| `--text-base` | 15px | Body, inputs, table cells |
| `--text-lg` | 18px | Brand name, card headings |
| `--text-xl` | 22px | Page title in the control panel |
| `--text-2xl` | 28px | Large numbers only |

Buttons: 14px, weight 600. Labels: 14px, weight 500. Table headers: 13px, weight 600, sentence case (not uppercase). Mono is only for IDs, currency, and timestamps.

---

## 4. Elevation, radius, borders

- **No shadows.** Separation comes from borders and background steps (canvas to surface).
- Hairline: `--border-default` (`1px solid #d9d0c1`). Input and secondary-button border: `--border-strong`.
- Radius: buttons and inputs `4px` (`--radius-btn`, `--radius-input`), cards and tiles `6px` (`--radius-card`), badges pill (`--radius-badge`).
- Transition: `--transition-fast` (background, border, and colour, 0.12s).
- Focus: `2px solid --accent` with 1px offset. Never remove it.

---

## 5. Spacing

- **Page gutter:** `--layout-gutter` (16px) is the left and right inset for the navbar, control panel, KPI row, and the first and last table cells.
- Control panel: `12px 16px` padding. KPI row: `16px` vertical.
- Table cells: `10px 12px`.
- Button `md`: `9px 16px`. `sm`: `5px 12px`.
- Badge: `2px 10px`.
- Control gap (icon and label): `8px`.

---

## 6. Layout: how the page fills the width

This section fixes the "box does not cover the page" problem. The cause was a width-limited, bordered card wrapped around every page. The rule now is:

```
Navbar            full width, canvas background, 1px bottom border
Control panel     full width, title left, actions right, 1px bottom border
KPI row           padded with the gutter, tinted tiles (optional)
List / table      full width, surface background, 1px top and bottom border only
```

Rules:

1. `AppShell` has **no `max-width`, no margin, no outer card**. `main` is `width: 100%`.
2. A feature page is a plain `div`. It never adds its own outer padding. Each band (control panel, KPI row, table) applies `--layout-gutter` itself.
3. **Tables are edge to edge.** No outer border, no rounded frame. The section around the table has a top and bottom hairline. First and last cells align to the gutter.
4. **Forms and auth cards are the only width-limited elements**, because a form should not stretch. Auth: `--auth-card-width` (440px), signup: `--auth-card-width-wide` (560px). Their page header, background, and footer are still full-bleed.
5. Detail pages follow the same pattern: control panel on top, then full-width sections. Use a two-column grid inside a section when the content needs it.

---

## 7. Component contracts

### Button (`components/ui/Button.tsx`, styles in `tokens.css`)

- Variants: `primary` (plum fill, off-white text), `secondary` (surface fill, strong border, ink text), `outline` (transparent, plum border and text), `danger` (`--danger` fill, white text).
- Sizes: `sm` | `md`. Flat, 4px radius, weight 600, 8px gap. Hover darkens, disabled is 55% opacity.
- **Placement:** create actions in the control panel (right side). State-changing actions in a footer row under the data they act on. Destructive actions are separated, use `danger`, and ask for confirmation.

### Badge

- Variants: `success` | `warning` | `danger` | `info` | `neutral`.
- Tinted pill: 1px semantic border, surface fill, text-on-surface colour, 12px, weight 600, capitalised. Not uppercase.
- Map domain status to a variant. Do not invent a second badge look.

### Input and Select

- Surface fill, `--border-strong`, 4px radius, 15px text, `10px 12px` padding. No inset shadow.
- Error: 1px `--danger` border plus the helper text in `--danger-text`.

### Tax select (invoice, quotation, and purchase lines)

Use this wherever a line has a **Taxes** field. The user picks from a predefined list. They never type a tax rate by hand.

**Behaviour**

- Closed state: a Select in the line row, placeholder empty, chevron on the right. Same look as Input and Select above.
- Open state: a flat popover under the field. Surface fill, 1px `--border-default`, 4px radius, no shadow. Options are one per row, 15px text, `10px 12px` padding. Row hover uses `--section`. The selected row shows a check icon in `--accent-text`.
- Last row is **Search more...** in `--accent-text`. It opens a Dialog with a searchable list of every tax.
- Keyboard: arrow keys move, Enter selects, Esc closes. Focus ring is the standard 2px `--accent`.
- Choosing a tax recalculates that line's Amount and the document totals immediately.
- Single select by default. Multi-select (pills inside the field) only if the brief needs stacked taxes.

**Predefined options (default list)**

| Label | Rate | Notes |
| --- | ---: | --- |
| 0% Exempt | 0 | Exempt supply |
| Nil Rated | 0 | Nil-rated supply |
| 0% NGST P | 0 | Non-GST purchase |
| 5% GST P (No ITC) | 5 | CGST + SGST, intra-state |
| 18% GST P (No ITC) | 18 | CGST + SGST, intra-state |
| 40% GST P (No ITC) | 40 | CGST + SGST, intra-state |
| 5% IGST P (No ITC) | 5 | Inter-state |
| 18% IGST P (No ITC) | 18 | Inter-state |

Sales documents use the same pattern with an `S` suffix (for example `18% GST S`). Show only the taxes that match the document type: purchases show `P`, sales show `S`.

**Where the list comes from**

- The list is reference data in PostgreSQL (`taxes` table, seeded), served by `GET /api/taxes` through `apiClient`. Do not hardcode it inside a component.
- Mock mode serves the same list from `src/mocks/fixtures/` and a handler, and is listed in `docs/MOCK_INVENTORY.md`.
- Each tax has `id`, `label`, `rate`, `type` (`gst` | `igst` | `exempt` | `nil`), and `scope` (`purchase` | `sales`).
- A line stores the tax `id`, not the label, so renaming a label never changes old documents.

### Money input (unit price, amounts)

Use this for **Unit Price**, discounts, and any other currency the user types. The user types plain digits. The field formats them with commas when they leave it.

**Behaviour**

- While typing: accept digits and one decimal point only. Do not insert commas mid-keystroke, so the cursor never jumps.
- On blur: format with the Indian grouping and two decimals. `100000` becomes `1,00,000.00`. `2500.5` becomes `2,500.50`.
- On focus: show the raw number again (no commas) so it is easy to edit.
- Empty stays empty. Never auto-fill `0.00`.
- Paste: strip commas, spaces, and the currency symbol, then validate.
- Reject negatives and letters. Show the Input error state and helper text for an invalid value.
- Submit and store the **plain number** (`100000.5`), never the formatted string. The API receives a number or a decimal string. Format only for display.
- Display uses `Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })`. Use one shared helper (`lib/format-money.ts`) for the input and for every read-only amount.

**Look**

- Right-aligned text in `--font-mono` with `tabular-nums`, so decimals line up down the Unit Price and Amount columns.
- Currency symbol (for example `₹`) is shown on read-only Amount cells and totals, not inside the editable Unit Price field.
- Totals block (Untaxed, Tax, Total) is right-aligned, mono, with the Total in weight 600.

**Component**

- `components/ui/MoneyInput.tsx` wraps Input. Props: `value` (number or null), `onChange(number | null)`, `currency`, `disabled`, `error`.
- Feature pages never format money themselves. They call `MoneyInput` and `formatMoney`.

### Table (`components/ui/Table.tsx`, class `.data-table`)

- No outer frame. Header row on `--section` with a strong bottom border. Body rows on surface with hairlines. Row hover uses the page colour.
- ID, currency, and time columns use `--font-mono` and do not wrap.

### Control panel (`components/ui/PageHeader.tsx`)

- Full-width bar on canvas with a bottom hairline. Title (22px, 600) and optional description on the left, actions on the right.

### Navbar (`AppShell`)

- One bar: brand mark, feature links, then mode badge, user, role badge, sign out.
- Link: subtle text. Active link: ink text, weight 600, 2px plum underline.

### KPI tile

- Tinted surface (plum, success, or tertiary) with matching 1px border. Value in mono 22px, label in 13px subtle text.

### Alert

- Semantic surface, text, and 1px semantic border. Lucide-style icon in the accent colour. Never emoji.

---

## 8. Libraries

| Need | Choice |
| --- | --- |
| Icons | `lucide-react` style icons (`components/ui/icons.tsx`) with `strokeWidth` 1.75 or 2 |
| Complex overlays | Radix unstyled, only when a feature needs them |
| Simple controls | Native React with these tokens |
| CSS | CSS custom properties in `tokens.css`. No Tailwind. |

Use icons only for explicit actions or status. No decorative icons in every cell.

---

## 9. Hard bans

- **Gradients** of any kind: `linear-gradient`, `radial-gradient`, `conic-gradient`, `bg-gradient-*`, `from-` / `via-` / `to-`, shine or mesh overlays.
- **Emoji in the rendered UI** (JSX, buttons, banners, empty states, table cells, titles). Use icons or Badge text.
- **Off-palette status colours.** Success, warning, and error use only the semantic table in section 2.
- **Shadows and thick borders.** The theme is flat.
- **Second styles.** No separate badge, button, or alert look inside a feature folder.
- **Fake data.** No hardcoded business rows, no `setTimeout` fake success, no fallback data when an API fails (see `AGENTS.md`).

---

## 10. Do / don't

**Do**

- Let every list and control panel run edge to edge.
- Use plum for the one main action, teal for links, and status tokens for status.
- Put money, IDs, and times in JetBrains Mono.
- Pick taxes from the predefined Tax select. Format typed money with `MoneyInput`.
- Put every colour in `tokens.css` and reference it by variable.

**Don't**

- Wrap a page in a width-limited bordered card.
- Add padding around a table that makes it float inside the page.
- Use plum or teal to mean success, warning, or error.
- Use pure white or cool slate backgrounds.
- Let users type a tax rate as free text, or hardcode the tax list in a component.
- Store a comma-formatted string such as `"1,00,000.00"` in state or send it to the API.
