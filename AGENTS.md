# Project rules  (fill the [brackets], delete what doesn't apply)

## Project
[1-2 sentences: what the platform does and who uses it]

## Stack
- Frontend: Next.js  [App Router | Pages Router]  [TypeScript: yes/no]  [Tailwind: yes/no]
- Backend: Laravel (PHP), exposes a REST JSON API
- Database: PostgreSQL
- The frontend talks to the database ONLY through the Laravel API. No database logic in Next.js.
- UI language: [e.g. French]   |   Code and comments: English

## Laravel rules
- Every database change = a NEW migration. Never edit a migration that has already run.
- Eloquent models with relationships. Validation in Form Request classes. JSON output via API Resources. Permissions via Policies.
- Controllers stay thin; business logic goes in Service/Action classes.
- Never build SQL by string concatenation. Never commit `.env`, keys or passwords.
- After a change run: `php artisan test`  (and check migrations with `php artisan migrate --pretend`).

## Next.js rules
- Server Components by default. Use `"use client"` only when needed (state, effects, browser APIs).
- Data comes from the Laravel API. Keep the API base URL in an environment variable.
- Every screen that loads data handles: loading, error and empty states.
- Forms show the validation errors returned by Laravel.
- After a change run: `npm run lint` and `npm run build`.

## Database rules
- Use proper PostgreSQL types, foreign keys, NOT NULL where required, and indexes on columns used in filters/joins.
- Do NOT invent table or column names. Read the existing migrations and models first. If something is missing, ask me.

## Design
- Match the look of the existing pages (colors, fonts, spacing, components). Don't restyle anything I didn't ask about.

## How to work
1. Read the files involved before editing. Reuse existing patterns and components.
2. Smallest change that solves the task. No unrelated refactors. No new libraries without asking.
3. For anything bigger than one small change: write a short plan first and wait for my OK.
4. Never invent data. Use real data or ask.

## Definition of done
- `php artisan test`, `npm run lint`, `npm run build` all pass (or you tell me exactly what fails and why).
- Checked in the browser with the `ui-verify` skill (1280px and 390px) and you looked at the screenshots.
- Final message: what changed, which files, what you verified, what you did NOT verify.
