# MyArtverse Web — Known Issues

Date: 2026-06-13 · logged in as `TayM` · dev `http://localhost:3001` · backend `:8081`

Small things were fixed directly (see "Fixed" section). Bigger / structural items are tracked
below for later work.

---

## Fixed directly (small)

- **Default PFP on profile** — `(user)/layout.tsx` now falls back to `USER_DEFAULT_AVATAR`
  (`/UserProfile.png`) when a user has no avatar.
- **Navbar avatar alt text** — `components/Avatar.tsx` had a stray `"}` in the alt
  (`Avatar of TayM"}`). Removed.
- **Character cards broken import** — `CharacterCard.tsx` imported `ColorPalette` and `Status`
  as default exports, but both are named exports → runtime import error, cards didn't render.
  Fixed to named imports.
- **`FursonaCard` does not exist** — favorites `page.tsx` + `loading.tsx` imported `FursonaCard`
  from the Cards barrel, which only exports `CharacterCard` (identical props). Swapped to
  `CharacterCard`.
- **Hydration mismatch in settings sidebar** — `SidebarSettingsList.tsx` generated section
  heading IDs with `crypto.randomUUID()` during render, so server and client produced different
  IDs (React hydration error on every settings page). Replaced with a stable
  `${heading}-heading` id.

---

## Big / open issues

### Backend / infra
- **CORS header is malformed on the backend** — `Access-Control-Allow-Origin` comes back as
  `http://192.168.178.21:3000localhost:3000` (two origins concatenated, no separator). Any
  client-side `fetch` to `:8081` from the browser is blocked. Server-side calls work, so the app
  mostly functions, but client-side API calls will fail. Needs a backend env/config fix.
- **Duplicate `@types/react`** (pre-existing) — root `node_modules` has 18.3.3 (from
  `apps/desktop`) while `apps/web` uses 19.0.10; npm ignores the `resolutions` field in
  `apps/web/package.json`. Standalone `tsc`/`next build` typecheck fails with bogus
  "cannot be used as a JSX component". Editor + dev server are fine. Fix via root `overrides`.

### Env
- `.env.local.example` references port **8080**, but the working backend is on **8081**
  (per `.env`). Example file is stale.

### Unimplemented / placeholder pages (not yet built)
Most of these render plain placeholder text and need real UI + data wiring:
- **Settings** — most pages are stubs returning literal text:
  - `profile` → "Public profile" section body is just `content`; header reads
    "Logged in as **USER**" (should be the real username, e.g. TayM).
  - `appearance` → "appearance page"
  - `security` → "Security page"
  - `accessibility` → "Accessibility page"
  - `billing` → "Billing & subscriptions page"
  - `developers/api-keys` → "API lol page"
  - `developers/activity-logs` → "Activity logs page"
  - `privacy` → partially built (change-password form, linked accounts) but 2FA section is `content`.
  - `moderation` → scaffolded `Group`s with placeholder descriptions ("Blocklol", `"hi" messages`).
- **Settings sidebar links with no page (will 404):** `notifications`, `trade-history`,
  `blocked-users`, `deleted-content` are linked in `SidebarSettingsList` but have no `page.tsx`.
- **Studio** — `studio/overview` is a layout scaffold; all panels show literal
  "slot placeholder". Sidebar has stray "lol" text and a `Settings` link pointing at `/#`.
  No other studio routes exist.

### Profile / characters
- **Characters tab badge is hardcoded** — `ProfileMasthead.tsx` `profileTabs` sets
  `countIndicator: 5` for Characters regardless of the real count. TayM has 0 characters but the
  tab shows "5". Should be driven by real data.
- **`mainCharacter!` non-null assertion (latent crash)** — `CharacterView.tsx` (~line 120) uses
  `characters.mainCharacter!.refSheets[index]` for each card's palette. If a user has characters
  but `mainCharacter` is null, the `.map` throws and the whole list renders empty. Also the
  palette logic is questionable (indexes `mainCharacter`'s refSheets by each character's loop
  index). Couldn't fully repro because TayM has 0 characters; needs a guard + correct palette
  source.

---

## Verified working

- Home `/` (shadcn component showcase) — renders.
- Login — renders (light + dark).
- Profile Overview `/@TayM` — renders; content empty because no panels are configured (expected).
- Characters `/@TayM/characters` — renders; list empty because TayM has 0 characters (see badge
  issue above).
- Favorites `/@TayM/favorites` — renders after the `FursonaCard` fix; empty (no favorites).
- Settings layout + sidebar — renders (hydration error fixed).
- Studio overview — renders (scaffold).
- **Search modal** — works; typing "Tay" returns the TayM user result (server-side, not blocked
  by CORS).

---

## Small Stuff

- Fix issues where during page load, theme flashes white -> dark theme
- Upon logging into website, make sure that the user's profile icon loads