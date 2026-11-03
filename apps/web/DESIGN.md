# PeoplePay360 UI Design System

Single source of truth for `apps/web` visual language. **This document is the contract.** Implement CSS tokens and shared components only after this file is agreed; do not invent one-off styles in feature pages.

## 1. Philosophy — 30% neo-brutalism + 70% neo-minimalism

PeoplePay360 is an HR & Payroll product. It must look crisp, authoritative, and fast (Linear / Gumroad / Raycast), not like a meme and not like a washed-out generic SaaS admin.

| Share | Role | What it looks like |
| --- | --- | --- |
| **70% neo-minimalism** | Foundation | Clean whites/off-whites, 16–24px gutters, monochromatic slate/zinc, semantic color used only for status |
| **30% neo-brutalism** | Accents | Razor-sharp 1.5–2px ink borders, **hard offset shadows**, punchy bold headings, `:active` press translation |

**Not neomorphism.** Soft inner-glow elevation (`box-shadow` blur, dual light/dark insets on cards) is out of scope. Hard shadows (`2px 2px 0 #0f172a`) sit on a spacious white canvas.

**Not classic Odoo.** Do not use Odoo purple (`#714B67`) or Odoo’s rounded enterprise chrome unless product later asks for a brand accent.

**Not 100% brutalism.** No neon yellow, no 4px black borders, no rotated type.

**Not 100% minimalism.** No faint gray `1px #e2e8f0` hairlines as the only structure, no fuzzy `0 1px 3px rgba(0,0,0,0.1)` as the elevation system, no `#2563eb` as the primary action color.

**No gradients. No vibe-coded chrome.** Solid fills only. No emoji in the product UI. Error, success, and warning must use the semantic tokens in this file — never a one-off red/green.

Current app (`src/app/App.tsx` and feature tables) still uses Inter, blue tabs, soft shadows, and banner emoji. Treat that as **legacy**. New UI must follow this file.

---

## 2. Color tokens

Use these names when CSS variables are added later (`tokens.css`). Until then, copy the hex values exactly.

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-ink` | `#0f172a` | Borders, primary fill, primary text, hard shadows |
| `--color-canvas` | `#f8fafc` | Page background |
| `--color-card` | `#ffffff` | Cards, header, tables, inputs |
| `--color-muted` | `#f1f5f9` | Table header strip, badge-neutral fill, subtle fills |
| `--color-subtle` | `#64748b` | Secondary copy, timestamps, helper text |

### Semantic status (mandatory — do not invent other reds/greens)

Every success, warning, and error surface in the app uses **these tokens only**. Do not use Tailwind `red-*` / `green-*` defaults, `#ef4444`, `#22c55e`, `#fef2f2`, `#991b1b`, or any other palette.

| Token | Fill / accent | Surface | Text on surface | Border | Usage |
| --- | --- | --- | --- | --- | --- |
| `--color-success` | `#10b981` | `#dcfce7` | `#14532d` | `#86efac` | Paid, active, approved, real API mode, success alerts |
| `--color-warning` | `#f59e0b` | `#fef9c3` | `#713f12` | `#fde047` | Pending, late, mock mode, caution alerts |
| `--color-danger` | `#f43f5e` | `#fee2e2` | `#7f1d1d` | `#fca5a5` | Rejected, absent, API error, validation error, destructive actions |
| Neutral | — | `#f1f5f9` | `#0f172a` | `#cbd5e1` | Idle / unknown status |

**Error / success / warning blocks** (page-level API error, empty-success, validation):

- Background = semantic **surface**
- Color = semantic **text on surface**
- Border = `1.5px solid` semantic **border** (or ink `#0f172a` if the block is a primary card)
- Optional Lucide icon (`CircleAlert`, `CircleCheck`, `TriangleAlert`) in the matching accent hex — never an emoji
- Hard shadow only if the block is a card, not a full-bleed banner

**Mode banners** (mock vs real): warning / success **surface + text + 1.5px ink border**. Label in uppercase Badge-style type. No ⚠️ / 🟢.

**Danger button fill** is `--color-danger` (`#f43f5e`), not `#ef4444`.

---

## 3. Typography tokens

Load later via Google Fonts in `index.html` (not in this docs pass).

| Role | Family | CSS token | Weights |
| --- | --- | --- | --- |
| UI and headings | **Plus Jakarta Sans** | `--font-sans` | 400 body, 600 UI/emphasis, 700 headings and badges |
| IDs, money, timestamps | **JetBrains Mono** | `--font-mono` | Regular + `font-variant-numeric: tabular-nums` |

### Type scale

| Element | Size | Weight | Notes |
| --- | --- | --- | --- |
| App title | `1.25rem` | 700 | Plus Jakarta Sans, ink |
| Page heading (`h2`) | `1.125rem`–`1.25rem` | 700 | Tight margin under title |
| Body / helper | `0.875rem` | 400 | Helper uses `--color-subtle` |
| Button `md` | `0.875rem` | 600 | |
| Button `sm` | `0.8125rem` | 600 | |
| Table header | `0.75rem` | 700 | Uppercase, slight letter-spacing, ink on `--color-muted` |
| Badge | `0.75rem` | 700 | Uppercase, `letter-spacing: 0.03em` |

**Mono is required** for employee codes (`EMP-001`), currency (`$5,000.00`), and clock times (`08:55 AM`). Do not use the UI sans for those cells.

---

## 4. Elevation, radius, interaction

```css
/* Default micro-elevation (buttons, cards) */
box-shadow: 2px 2px 0px #0f172a;

/* Pressed */
transform: translate(1px, 1px);
box-shadow: 1px 1px 0px #0f172a;

/* Tables / large surfaces */
box-shadow: 3px 3px 0px #0f172a;
```

- Border: `1.5px solid #0f172a` (tables and prominent cards may use `2px`).
- Radius: **6px** on buttons, inputs, cards; **4px** on badges. Not `0`, not `16px`.
- Transition: `all 0.1s ease-in-out` on pressable controls.
- **No** blurred elevation (`0 10px 15px rgba(...)`).
- **No** gradients: no `linear-gradient`, `radial-gradient`, `conic-gradient`, mesh, shine, or Tailwind `from-` / `to-` / `bg-gradient-*`.
- **No** neomorphic card insets. A *very* light inset on **inputs only** is allowed: `inset 1px 1px 2px rgba(0,0,0,0.05)`.

---

## 5. Spacing

- Layout grid gutters: **16px–24px**.
- Page / feature padding: `1.5rem`.
- Header / nav horizontal padding: `2rem`.
- Table cells: `12px`.
- Button `md` padding: `10px 18px`; `sm`: `6px 12px`.
- Badge padding: `2px 8px`.
- Input padding: `8px 12px`.
- Control gap (icon + label): `8px`.

---

## 6. Component contracts

Specs only. Do **not** add `src/components/ui/*` in this pass. When implemented, they must match this contract so every feature looks identical.

### Button

- Variants: `primary` | `secondary` | `danger` | `outline`.
- Sizes: `sm` | `md` (default `md`).
- Always: ink border `1.5px`, hard shadow `2px 2px 0`, radius `6px`, weight 600, inline-flex, gap `8px`.
- `primary`: fill `#0f172a`, text `#ffffff`.
- `secondary`: fill `#f8fafc`, text `#0f172a`.
- `danger`: fill `--color-danger` (`#f43f5e`), text `#ffffff`.
- `outline`: transparent fill, ink text.
- `:active`: translate + reduced shadow.
- **No `#2563eb`.** Refresh and primary actions use `primary` (ink), not blue.

### Badge

- Variants: `success` | `warning` | `danger` | `neutral`.
- Uppercase, weight 700, `0.75rem`, radius `4px`, `1.5px` semantic border, surface fill from the semantic table above.
- Map domain status here (active → success, pending → warning, rejected/inactive → danger). Do not invent a second badge look per feature.
- Status copy is text (`ACTIVE`, `ERROR`), not emoji.

### Input

- Full width, white fill, ink text, `1.5px solid #0f172a`, radius `6px`, `0.875rem`.
- Optional light inset shadow (fields only).
- Focus: keep outline accessible (ink ring or 2px ink border); do not remove focus without a replacement.

### Table

- Outer container: `1.5px` (or `2px`) ink border + `3px 3px 0 #0f172a` shadow, radius `6px`, overflow hidden or inner `border-collapse`.
- Header row: `--color-muted` (`#f8fafc`), bold uppercase headers.
- Body rows: `#ffffff`, hairline between rows may be `#e2e8f0` **inside** the ink frame (not as the outer border).
- ID, currency, and time columns: `--font-mono` + `tabular-nums`.

---

## 7. Layout

- Page canvas: `--color-canvas` (`#f8fafc`).
- App header and main card: `--color-card` (`#ffffff`) with ink border + micro-shadow (replace the current `1px #e2e8f0` header hairline and fuzzy main `box-shadow`).
- Max content width: `1200px`, centered, with `2rem` top margin.
- **Nav:** ink color for the active tab, `2px solid #0f172a` underline. Inactive: `--color-subtle`. **Not blue.**

---

## 8. Libraries (when implementing — do not install in this pass)

| Need | Choice | Notes |
| --- | --- | --- |
| Icons | `lucide-react` | `strokeWidth={1.75}` or `2`. Prefer over Heroicons (breadth + stroke consistency). |
| Complex overlays | Radix unstyled (`dialog`, `dropdown-menu`, `popover`, `tabs`) | Only when a feature needs modal/menu/focus-trap. Not for Button/Input/Badge/Table. |
| Simple controls | Native React + these tokens | No extra UI kit. |
| CSS | CSS custom properties (`tokens.css`) | App has no Tailwind; do not add Tailwind unless a later pass explicitly chooses it. |

### Icons rule

Use Lucide **only** for explicit user actions (refresh, approve, export) or visual status indicators. No decorative icons in every table cell or on every nav label.

Radix UI is **not** an icon pack. Heroicons is **not** the primitive library. Do not mix those roles.

---

## 9. Hard bans: gradients, emoji, off-palette status

Agents and humans **must not** ship these in `apps/web`.

### No gradients

- Solid token colors only on backgrounds, buttons, banners, badges, borders, and text.
- Forbidden: `linear-gradient`, `radial-gradient`, `conic-gradient`, CSS `background-image` washes, Tailwind `bg-gradient-*` / `from-*` / `via-*` / `to-*`, glossy overlays, aurora/mesh blobs.

### No vibe-coded emoji in the UI

The product UI is enterprise HR/Payroll. Emoji make it look generated and unprofessional.

- Forbidden in rendered UI (JSX, `aria-label` that displays, buttons, banners, empty states, table cells, titles): ⚠️ ✨ 🚀 🎉 ✅ ❌ 🟢 🔴 💡 🔥 and any other emoji/pictograph.
- Use Lucide for actions/status, or the Badge + semantic tokens.
- Emoji are allowed in this markdown file and in code comments only if they do not reach the DOM.

### Strict color adherence for states

- Success / warning / error **always** use the semantic table in section 2 (fill, surface, text, border).
- Do not mix: green fill with a random red border; `#22c55e` “success”; Bootstrap / default browser red; blue for errors.
- Loading and empty states use ink + `--color-subtle` on canvas/card — not a new accent.

---

## 10. Do / don’t

**Do**

- Use ink (`#0f172a`) as primary, border, and shadow.
- Use semantic surfaces **and** semantic text/border for status, errors, and success.
- Put money, IDs, and times in JetBrains Mono.
- Keep whitespace generous; let the 70% minimalism carry density.
- Use Lucide or Badge text instead of emoji.

**Don’t**

- Gradients of any kind.
- Emoji in the product UI (banners, buttons, empty states, tables).
- One-off blues (`#2563eb`), random reds/greens, or Odoo purple.
- Heroicons, extra icon packs, or icons-for-decoration.
- A second badge/button/alert style inside a feature folder.
- Blurry shadows as elevation; neomorphic insets on cards.
- Neon / 4px / rotated brutalism.
- `setTimeout` to fake success (see workspace mock-data rules).
- Hardcoded sample employees, payroll, or leave rows in components.
- Local fallback data when an API fails.

---

## 11. Implementation backlog (out of this pass)

This file is docs only. Later work, in order:

1. Add Google Fonts (Plus Jakarta Sans + JetBrains Mono) in `index.html`.
2. Add `src/styles/tokens.css` (or equivalent) with the CSS variables above; import from `main.tsx`.
3. Install `lucide-react` when the first action icon is needed.
4. Add Radix packages only with the first dialog/dropdown/popover.
5. Create `src/components/ui/Button.tsx`, `Badge.tsx`, `Input.tsx`, `Table.tsx` from these contracts (classNames + tokens, not one-off inline palettes).
6. Restyle `App.tsx` (banner, header, nav) and the four feature pages/tables: Employees, Attendance, Time Off, Payroll.

Until that pass, do not treat existing inline styles as the design system.
