# useMe 모노레포 골격 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** pnpm + Turborepo 모노레포에서 web(3000)·admin(3001)이 정적 홈으로 뜨고, QueryProvider와 Axios instance가 준비된 개발 틀을 만든다.

**Architecture:** shadcn Next 모노레포 템플릿으로 `apps/web` + `packages/ui`를 만든 뒤 `apps/admin`과 `packages/config`를 추가한다. 홈은 Server Component 정적 페이지다. `app/api`와 Supabase 클라이언트는 없다.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind v4, shadcn nova, pnpm, Turborepo, TanStack Query, Zustand(설치만), Axios, `@workspace/ui`

## Global Constraints

- `app/page.tsx`와 `app/layout.tsx`에 `'use client'`를 두지 않는다.
- React 컴포넌트(메인·하위)만 `function` 선언. Route Handler가 생기면 화살표 함수. 타입은 `type`만.
- `useQuery` / `useMutation` / Zustand 스토어 / `app/api` / supabase npm / `.env.example` 금지.
- 홈 카피에 크레딧·티어를 넣지 않는다.
- 컴포넌트 추가는 `pnpm dlx shadcn@latest add`만 사용한다.
- 커밋은 사용자가 요청할 때만 한다.
- 검증: `pnpm typecheck`, `pnpm lint`, `pnpm build`, 브라우저에서 3000·3001 홈.

---

### Task 1: shadcn 모노레포 스캐폴드

**Files:**
- Create (via CLI, then move into repo): `apps/web/**`, `packages/ui/**`, root `package.json`, `pnpm-workspace.yaml`, `turbo.json`
- Preserve: `.git`, `docs/superpowers/specs/2026-09-14-monorepo-setup-design.md`

**Interfaces:**
- Consumes: empty repo except README + spec
- Produces: working `apps/web` Next app and `@workspace/ui`

- [ ] **Step 1: Scaffold into /tmp**

```bash
rm -rf /tmp/useme-scaffold
cd /tmp
pnpm dlx shadcn@latest init --name useme-scaffold --preset nova --template next --monorepo --yes
```

Expected: `/tmp/useme-scaffold/apps/web` and `/tmp/useme-scaffold/packages/ui` exist.

- [ ] **Step 2: Move into the git repo without touching .git**

Copy all scaffold files into `/Users/kimbomi/workspace/useme`, excluding `.git`. Keep `docs/superpowers/**`. Overwrite root README later in Task 6.

- [ ] **Step 3: Confirm web boots at the template default**

From repo root, `pnpm install` if the template did not already. Do not add admin yet.

---

### Task 2: packages/config + root scripts

**Files:**
- Create: `packages/config/package.json`, `packages/config/typescript/base.json`, `packages/config/typescript/nextjs.json`, `packages/config/typescript/react-library.json`, `packages/config/eslint/index.js`, `packages/config/prettier/index.js`
- Modify: root `package.json` scripts, `apps/web/package.json` (port 3000), app/package tsconfigs to extend config

**Interfaces:**
- Consumes: template tsconfig/eslint
- Produces: `@workspace/config` (or `config` workspace name `@workspace/config`)

- [ ] **Step 1: Add `@workspace/config` package**

`packages/config/package.json` name: `@workspace/config`, private, files exported via package.json exports for typescript/eslint/prettier.

- [ ] **Step 2: Point web and ui tsconfig at config**

If the template already has working tsconfig, keep compilerOptions working; still add `packages/config` as the shared source of truth and extend it.

- [ ] **Step 3: Root scripts**

```json
{
  "scripts": {
    "dev": "turbo dev",
    "dev:web": "pnpm --filter web dev",
    "dev:admin": "pnpm --filter admin dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck"
  },
  "engines": { "node": ">=20" }
}
```

web `dev` script: `next dev --port 3000`. Add `typecheck`: `tsc --noEmit` (or `next typegen && tsc --noEmit` if Next 16 requires it) in each app.

---

### Task 3: apps/admin

**Files:**
- Create: copy of `apps/web` → `apps/admin` with package name `admin`, port 3001, distinct layout metadata

**Interfaces:**
- Consumes: web app structure, `@workspace/ui`
- Produces: `pnpm --filter admin dev` on 3001

- [ ] **Step 1: Copy web to admin**

Change `package.json` `name` to `admin`. `dev`: `next dev --port 3001`.

- [ ] **Step 2: components.json**

Same aliases as web so shadcn CLI still installs into `packages/ui`.

- [ ] **Step 3: turbo.json**

Ensure `dev` has `persistent: true` and `cache: false` so both apps can run.

---

### Task 4: QueryProvider + Axios instance (no calls)

**Files:**
- Create: `apps/web/libs/query/createQueryClient.ts`, `apps/web/libs/httpClient.ts`, `apps/web/components/common/Providers.tsx`
- Create: same three files under `apps/admin/`
- Modify: both `app/layout.tsx` to wrap `{children}` with `<Providers>`
- Modify: both app `package.json` dependencies: `@tanstack/react-query`, `zustand`, `axios`

**Interfaces:**
- Consumes: none
- Produces:
  - `createQueryClient(): QueryClient`
  - `httpClient` Axios instance `baseURL: "/api"`
  - `Providers({ children: React.ReactNode })`

- [ ] **Step 1: Install deps in both apps**

```bash
pnpm --filter web add @tanstack/react-query zustand axios
pnpm --filter admin add @tanstack/react-query zustand axios
```

- [ ] **Step 2: Web helpers**

```ts
// apps/web/libs/query/createQueryClient.ts
import { QueryClient } from "@tanstack/react-query"

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })
```

```ts
// apps/web/libs/httpClient.ts
import axios from "axios"

export const httpClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
})
```

```tsx
// apps/web/components/common/Providers.tsx
"use client"

import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"

import { createQueryClient } from "@/libs/query/createQueryClient"

type ProvidersProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

If the app uses `#libs` package imports instead of `@/`, match the template alias. Do not invent a second alias system.

- [ ] **Step 3: Duplicate for admin**

Identical files. Adjust import alias to whatever admin tsconfig uses (same as web).

- [ ] **Step 4: Wrap layouts**

`layout.tsx` stays a Server Component. Import `Providers` and wrap children. Do not add `'use client'` to layout.

---

### Task 5: 정적 홈 + shadcn 기본 세트

**Files:**
- Modify: `apps/web/app/page.tsx`, `apps/admin/app/page.tsx`
- Modify: `packages/ui` via CLI add

**Interfaces:**
- Consumes: `@workspace/ui/components/button`, `@workspace/ui/components/card`
- Produces: static homes with specified copy

- [ ] **Step 1: Add shadcn set from apps/web**

```bash
cd apps/web
pnpm dlx shadcn@latest add button card input label textarea select switch tabs dialog alert-dialog sheet dropdown-menu badge separator skeleton table --yes
```

- [ ] **Step 2: Web home (Server Component)**

Copy:

- 제목: `useMe`
- 본문: `토이프로젝트를 어필 카드로 바꿔 공유하고, 사람들이 직접 써 보고 피드백하는 플랫폼`
- 보조: `공개 플랫폼 골격입니다. 기능은 다음 작업에서 붙입니다.`
- Button: `시작 안내`, `type="button"`, `disabled`

Use `Card` composition (`CardHeader` / `CardTitle` / `CardDescription` / `CardContent`). Semantic tokens only. No credit/tier copy. No fetch.

- [ ] **Step 3: Admin home**

- 제목: `useMe Admin`
- 본문: `운영 콘솔 골격입니다. 지금은 최소 화면만 있습니다.`
- Button: `시작 안내` disabled

- [ ] **Step 4: Shell**

`body` uses `bg-background text-foreground`. `next/font` only.

---

### Task 6: supabase 자리 + README

**Files:**
- Create: `supabase/migrations/.gitkeep`
- Modify: `README.md`

- [ ] **Step 1: Empty migrations folder**

Do not run `supabase init`. Do not add supabase npm packages.

- [ ] **Step 2: README**

Korean sections from the spec: 정의, 코어 루프/Must/Should, 구조, 스택, Node 20+ / pnpm, 실행 명령, 이번 브랜치에 없는 것, 로드맵, 노션 링크.

Commands only:

```bash
pnpm install
pnpm dev
pnpm dev:web
pnpm dev:admin
pnpm typecheck
pnpm lint
pnpm build
```

No `curl /api/health`.

---

### Task 7: 검증 + 노션 작업장

**Files:**
- Notion page `3db3307fa7e6804faf11c695841d336d`

- [ ] **Step 1: typecheck, lint, build**

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Expected: all pass. Fix any errors before continuing.

- [ ] **Step 2: Browser**

`pnpm dev`, open `http://localhost:3000` and `http://localhost:3001`. Confirm copy, Card, disabled Button. Click is not required to succeed (button disabled). Check both viewports if layout is wide.

- [ ] **Step 3: Notion**

Replace the empty 프로젝트 세팅 page with 구조, 명령어, 이번 범위, 허점, 다음 스텝 (Supabase 연동 브랜치). Set 상태 to `프론트엔드`.

---

## Self-review

1. Spec coverage: 골격, Provider/httpClient, 정적 홈, packages/ui·config, migrations gitkeep, README, 노션 — 각 Task에 대응. API/Supabase 클라이언트는 의도적으로 없음.
2. Placeholders: 없음. 템플릿 alias(`@/` vs `#`)는 Task 4에서 템플릿에 맞추라고 명시.
3. Types: `createQueryClient` / `httpClient` / `ProvidersProps`가 spec과 동일.
