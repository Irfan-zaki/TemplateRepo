

In **`apps/web`**, typography and colors are managed centrally through CSS custom properties (variables) defined in a single design token file.

---

### 1. Color and Font Definitions (Main File)
Primary location: `apps/web/src/styles/tokens.css`. The contract is `apps/web/DESIGN.md`.

#### **Colors**

Ink `#0f172a`, canvas `#f8fafc`, card `#ffffff`. Status fills: success `#10b981`, warning `#f59e0b`, danger `#f43f5e`. Do not introduce a second palette.

#### **Fonts & Typography**
Lines 7–37 define font families, font weights, and size scales:
```css
/* Font Families */
--font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

/* Type Scale */
--text-xs: 12px;
--text-sm: 13px;
--text-base: 15px;
--text-lg: 18px;
--text-xl: 22px;
--text-2xl: 28px;
```

---

### 2. Loading New Web Fonts
If you want to use a different Google Font (e.g., Roboto, Poppins):
**[`apps/web/index.html`](file:///c:/Users/zakii/Documents/odoo%20practise/apps/web/index.html#L8-L14)**

Replace or add your font `<link>` tags inside the `<head>`:
```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```
Then update `--font-sans` or `--font-mono` in [`tokens.css`](file:///c:/Users/zakii/Documents/odoo%20practise/apps/web/src/styles/tokens.css#L7-L8) to match the new family name.

---

### 3. Design System Guidelines
To review the design rules and color rationale:
**[`apps/web/DESIGN.md`](file:///c:/Users/zakii/Documents/odoo%20practise/apps/web/DESIGN.md)**