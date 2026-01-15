## Copilot / AI Agent Instructions for Conference Event Planner

Summary
- Small React + Vite single-page app that uses Redux Toolkit for client state only. No backend integration.

Big picture
- Entry: `src/main.jsx` mounts `App` and wraps it with `Provider` using `src/store.js`.
- Global state: three Redux slices (array-shaped) live under `src/`:
  - `venueSlice.js` -> reducer exposed as `venue` in `src/store.js`
  - `avSlice.js` -> reducer exposed as `av`
  - `mealsSlice.js` -> reducer exposed as `meals`
- UI: `App.jsx` (landing + toggles) -> `ConferenceEvent.jsx` (product lists, dispatches) -> `TotalCost.jsx` (summary view).

Key patterns & gotchas (do not change these without updating all callers)
- Slices use array index payloads. Actions like `incrementQuantity(index)` expect an index into the slice array. If you change to id-based objects, update every dispatch site in `ConferenceEvent.jsx` and any helper that constructs the payload.
- Reducers use Immer-style mutation (RTK `createSlice`). Mutations in reducers are fine, but keep logic consistent and return early where present.
- UI relies on specific string names and quantities for business rules:
  - Auditorium capacity logic is implemented in `ConferenceEvent.jsx` and `venueSlice.js`. Note: there is a subtle mismatch — `ConferenceEvent.jsx` checks for `"Auditorium Hall (Capacity:200)"` while `venueSlice.js` contains an entry with a leading space (`" Auditorium Hall (Capacity:200)"`). Be careful when editing name-based rules.
- Images/assets: item images are external URLs embedded in slice initialState. Prefer leaving these as-is unless replacing with local assets (add to `src/assets/` and update the slice path).

Data flow examples (specific files)
- Selecting a venue increments state: user clicks + in `ConferenceEvent.jsx` -> calls `dispatch(incrementQuantity(index))` -> `venueSlice.js` increments `state[index].quantity`.
- AV controls: buttons call `incrementAvQuantity` / `decrementAvQuantity` from `avSlice.js`.
- Meals: `mealsSlice.js` keeps `selected` booleans; `ConferenceEvent.jsx` keeps `numberOfPeople` locally and multiplies meal cost by that number when calculating totals.

Developer workflows
- Run dev server: `npm run dev` (uses Vite). Entry port is default Vite port.
- Build: `npm run build` and preview: `npm run preview` (note preview runs a build first).
- Lint: `npm run lint` (ESLint configured for `.js` and `.jsx`). No tests present in the repo.

Conventions in this repo
- Component filenames: PascalCase with `.jsx` (e.g., `ConferenceEvent.jsx`, `TotalCost.jsx`).
- Redux files: `*Slice.js` exporting a default reducer and named action creators.
- CSS: per-component `.css` files colocated with components (e.g., `TotalCost.css`).

Integration points and scope
- No API calls or server-side code. The app is fully client-side.
- If you add persistence (localStorage or backend), update `src/store.js` and ensure migrations handle the current array-shaped slice states.

Editing guidance for AI agents
- When making behavioral changes, update both slice logic and all dispatch sites. Grep for the action name (for example `incrementQuantity`) and ensure callers still match the payload contract.
- Prefer non-breaking refactors: if converting index-based slices to id-based items, provide a migration plan and update `ConferenceEvent.jsx` and any helper functions that read `quantity`.
- For UI edits, keep CSS class names; many selectors in the project rely on those names (avoid renaming without updating markup/CSS together).

Where to look first when debugging or extending
- `src/ConferenceEvent.jsx` — central UI, many event handlers, total calculations.
- `src/store.js` and the three slices — canonical state shape.
- `src/TotalCost.jsx` — how totals are computed and displayed.
- `package.json` — dev/build/lint scripts.

Questions for maintainers (if unclear)
- Should venue item names be canonicalized (remove leading/trailing spaces) and validated? This would remove a fragile string-based rule.
- Is there a desire to persist selections between reloads? If so, preferred mechanism: `localStorage` or remote API?

If you need to run the app locally
1. Install: `npm install`
2. Dev server: `npm run dev`
3. Lint: `npm run lint`

Keep changes minimal and run the local dev server to verify UI interactions after edits.
