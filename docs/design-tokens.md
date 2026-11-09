# Stratum AI design tokens

The shared palette is defined in `components/shared/theme.ts`. The CSS variables in `app/globals.css` mirror those values and are the preferred way to style components.

## Palette

- `--ink`: primary text and strong controls
- `--muted-ink`: secondary text
- `--line`: borders and dividers
- `--soft`: muted surfaces
- `--paper`: page background
- `--accent`: active navigation, focus, and primary actions
- `--accent-soft`: selected/hover surfaces

To change the theme, update the values in `components/shared/theme.ts` and the matching `:root` variables in `app/globals.css`. Keep contrast accessible, and use semantic variables rather than raw hex values in component styles.

## Shared navigation

`components/shared/app-nav.tsx` is the reusable top navigation used by Live and Settings. Pass `active="live"` or `active="settings"` to control the selected state. The gear icon is the Settings action; pass `onSettings` when the screen should open the settings view.
