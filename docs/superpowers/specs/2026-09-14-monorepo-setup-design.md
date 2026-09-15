# useMe 모노레포 프로젝트 세팅 설계

날짜: 2026-09-14  
상태: 범위 축소 반영 · 구현 전 스펙 리뷰 대기  
범위: **앱이 뜨는 모노레포 골격.** QueryProvider와 Axios instance 파일은 미리 둔다. API 호출·Route Handler·Supabase 연동은 다른 브랜치.

## 1. 배경

useMe는 토이프로젝트를 어필 카드로 공유하고, 방문자가 체험·피드백하는 플랫폼이다. 저장소 `github.com/Kbomi16/useme`는 README만 있는 빈 레포다.

이번 브랜치는 스프린트 A 이전의 **폴더·앱·공유 UI 틀**만 만든다. 헬스 체크를 포함한 기본 API, Auth, 스키마, `@supabase/ssr` 클라이언트는 넣지 않는다.

제품 방향 요약 (README에만 적고, 앱 기능으로 구현하지 않음):

- 코어 루프: 등록 → 어필 3칸 → 홍보팩 → 공유/스포트라이트 → 체험·반응 → 크레딧 → 다음 등록
- Must: 프로젝트 프로필, 어필력 게이지, 홍보팩, 24h 스포트라이트, 디스커버
- Should: 상호 홍보, 소셜 로그인, admin 본기능, 개발 노트, 캡슐
- 크레딧·티어는 리텐션용. 잔액은 `/me`에만 표시하고 랜딩·홍보팩 CTA에는 넣지 않는다.
- 백엔드는 NestJS/RDS가 아니라 Supabase. **연동 코드는 다음 브랜치.**

참고 문서:

- [useMe 홈](https://app.notion.com/p/2463307fa7e68081847df575fb164cae)
- [기획서](https://app.notion.com/p/3da3307fa7e6815c986ff011f3869c84)
- [주요기능](https://app.notion.com/p/24b3307fa7e680bfb589fd3b97e9affb)
- [데이터 모델](https://app.notion.com/p/3db3307fa7e681f19211f0aa91f4fa9e)
- [크레딧 체계](https://app.notion.com/p/24b3307fa7e68017b068c8ef9442b178)
- 작업 기록 위치: [프로젝트 세팅](https://app.notion.com/p/3db3307fa7e6804faf11c695841d336d)

## 2. 목표 (완료 조건)

아래가 모두 되면 세팅 완료다.

1. `apps/web`(3000)과 `apps/admin`(3001)이 로컬에서 뜬다.
2. 각 앱 홈은 Server Component `page.tsx`다. 데이터 fetch·Route Handler가 없다.
3. 홈에 shadcn `Button`·`Card`가 `@workspace/ui`에서 import되어 정적 카피와 함께 렌더된다.
4. `Providers`(QueryClientProvider)와 `httpClient`(Axios, `baseURL: "/api"`) 파일은 있다. `useQuery` 호출, Zustand 스토어, `app/api`는 없다.
5. `supabase/migrations/`는 빈 폴더(`.gitkeep`)만 둔다. `supabase init`, env 키, supabase JS 패키지는 없다.
6. 루트 README가 기획 요약 + 실행 명령어를 포함한다.
7. 노션 작업장 [프로젝트 세팅](https://app.notion.com/p/3db3307fa7e6804faf11c695841d336d)에 동일 명령어와 허점/다음 스텝이 정리된다.

명시적으로 하지 않는 것:

- `app/api/**` Route Handler, 헬스 체크, 도메인 API
- `useQuery` / `useMutation` 호출, Zustand 스토어
- `@supabase/ssr`, `@supabase/supabase-js`, `.env.example`의 Supabase 키
- Auth, RLS, 테이블 마이그레이션
- `/login`, `/discover`, `/me`, `/project/[slug]` 등 IA 라우트
- Vercel 링크, 원격 Supabase 프로젝트 생성
- 애니메이션, 다크모드 강제

## 3. 기술 스택

| 영역 | 선택 | 이번 브랜치 |
| --- | --- | --- |
| 패키지 매니저 | pnpm | 사용 |
| 빌드 오케스트레이션 | Turborepo | 사용 |
| 앱 | Next.js App Router (shadcn next 템플릿 스테이블. 다운그레이드 없음) | 사용 |
| 언어 | TypeScript strict | 사용 |
| 스타일 | Tailwind CSS v4 + shadcn/ui nova (base-nova) | 사용 |
| 아이콘 | lucide-react | 사용 |
| TanStack Query v5 | Provider까지 | `useQuery` 없음 |
| Zustand | 설치만 | 스토어 없음 |
| Axios | instance 파일까지 | 호출 코드 없음 |
| Supabase | 폴더 자리만 | 패키지·init 없음 |
| UI 패키지명 | `@workspace/ui` | 사용 |

Node.js 20 이상. 루트 `package.json` `engines.node`는 `>=20`.

## 4. 아키텍처

이번 브랜치의 런타임 흐름은 정적 페이지 + 준비된 클라이언트 셸이다.

```
브라우저 → layout의 Providers(QueryClientProvider)
        → Server Component 홈
        → @workspace/ui Button/Card (정적, fetch 없음)

httpClient는 파일이 있을 뿐 홈에서 import하지 않는다.
```

이후 브랜치에서 붙일 목표 구조 (지금은 코드로 고정하지 않음):

```
브라우저 → Axios (/api) → Next Route Handler (BFF) → @supabase/ssr
TanStack Query는 Axios 래퍼만 호출
Zustand는 UI/세션 상태만
```

앱이 두 개이므로 이후 BFF도 앱마다 둔다. 공통 API 패키지는 만들지 않는다.

### 4.1 디렉터리

```
useme/
  apps/
    web/                     # 공개 플랫폼, port 3000, package name: web
    admin/                   # 운영 콘솔, port 3001, package name: admin
  packages/
    ui/                      # shadcn 소스, @workspace/ui
    config/                  # tsconfig / eslint / prettier 공유
  supabase/
    migrations/              # .gitkeep만
  docs/superpowers/specs/
  pnpm-workspace.yaml
  turbo.json
  package.json
  README.md
```

`pnpm dlx shadcn@latest init --preset nova --template next --monorepo`로 `apps/web` + `packages/ui`를 만든 뒤 `apps/admin`과 `packages/config`를 추가한다.

생성은 `/tmp/useme-scaffold`에서 한 다음 `.git`을 제외하고 `useme/`로 옮긴다. 기존 `README.md`는 섹션 8 내용으로 덮어쓴다.

### 4.2 워크스페이스

`pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

루트 스크립트:

```json
{
  "scripts": {
    "dev": "turbo dev",
    "dev:web": "pnpm --filter web dev",
    "dev:admin": "pnpm --filter admin dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck"
  }
}
```

- web: `next dev --port 3000`
- admin: `next dev --port 3001`

## 5. 앱 내부

FE-STYLE:

- `app/page.tsx`와 `app/layout.tsx`는 Server Component. `'use client'` 금지.
- 페이지 전용 컴포넌트가 필요하면 `app/<route>/_components/`. 이번 홈은 page에서 Card를 직접 써도 된다. 상태·이벤트가 없으면 클라이언트 파일을 만들지 않는다.
- 앱 공통은 `components/common/`. `Providers`만 둔다.
- 메인/하위 React 컴포넌트만 `function` 선언. 그 외는 화살표 함수.
- 타입은 `type`만 사용.

### 5.1 web

| 파일 | 책임 |
| --- | --- |
| `apps/web/app/layout.tsx` | html/body, 폰트, `globals.css`, `Providers` |
| `apps/web/app/page.tsx` | 정적 홈. fetch 없음 |
| `apps/web/components/common/Providers.tsx` | QueryClientProvider만 |
| `apps/web/libs/query/createQueryClient.ts` | QueryClient 팩토리 |
| `apps/web/libs/httpClient.ts` | Axios instance, `baseURL: "/api"` |
| `apps/web/components.json` | ui alias → `@workspace/ui/components` |

홈 카피:

- 제목: `useMe`
- 본문: `토이프로젝트를 어필 카드로 바꿔 공유하고, 사람들이 직접 써 보고 피드백하는 플랫폼`
- Card 안의 보조 문장: `공개 플랫폼 골격입니다. 기능은 다음 작업에서 붙입니다.`
- Button 라벨: `시작 안내` — `href` 없는 `type="button"` disabled. 클릭 동작 없음 (가짜 네비게이션을 만들지 않음)

크레딧·티어 문구는 홈에 넣지 않는다. `app/api` 디렉터리는 만들지 않는다. `httpClient`는 홈에서 import하지 않는다.

`createQueryClient`와 `httpClient` 시그니처:

```ts
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

export const httpClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
})
```

### 5.2 admin

web과 같은 파일 역할(`Providers`, `createQueryClient`, `httpClient` 포함). 경로만 `apps/admin/`.

카피:

- 제목: `useMe Admin`
- 본문: `운영 콘솔 골격입니다. 지금은 최소 화면만 있습니다.`
- Button: `시작 안내` disabled

어드민 권한 가드는 다음 브랜치. 지금은 로컬에서 `/`를 누구나 본다.

## 6. 공유 패키지

### 6.1 `packages/ui` (`@workspace/ui`)

shadcn 소스는 여기만 둔다. 앱은 컴포넌트를 복제하지 않는다.

설치 세트:

`button`, `card`, `input`, `label`, `textarea`, `select`, `switch`, `tabs`, `dialog`, `alert-dialog`, `sheet`, `dropdown-menu`, `badge`, `separator`, `skeleton`, `table`

홈은 `button`과 `card`만 쓴다.

스타일:

- `bg-background text-foreground` 셸
- 시맨틱 토큰만. 하드코딩 색상 없음
- 라이트 기본. 테마 스위치 없음
- `next/font`. 외부 Google Fonts 링크 금지
- 컴포넌트 추가는 `pnpm dlx shadcn@latest add <name>`만. 레지스트리 파일 수동 복사 금지

### 6.2 `packages/config`

| 파일 | 책임 |
| --- | --- |
| `typescript/base.json` | 공통 compilerOptions (strict, bundler) |
| `typescript/nextjs.json` | Next 앱용 |
| `typescript/react-library.json` | `packages/ui`용 |
| `eslint/index.js` | ESLint flat config export |
| `prettier/index.js` | Prettier 공유 옵션 |

앱과 `packages/ui`의 `tsconfig.json`은 이 패키지를 extends한다.

## 7. Supabase 자리만

- `supabase/migrations/.gitkeep`만 커밋 가능하게 둔다.
- `supabase init` 하지 않는다. `config.toml`을 만들지 않는다.
- supabase npm 패키지를 설치하지 않는다.
- `.env.example`을 만들지 않는다. 키 이름은 다음 연동 브랜치에서 추가한다.

README에 “Supabase 연동은 별도 브랜치”라고 한 줄 명시한다.

## 8. 문서

### 8.1 README.md

한국어. 제품 언어를 앞에 둔다.

필수 섹션:

1. 한 줄 정의
2. 코어 루프 / Must / Should 요약
3. 저장소 구조
4. 기술 스택
5. 요구 사항 (Node 20+, pnpm)
6. 실행 명령어
7. 이번 브랜치에 없는 것 (API, Auth, 스키마, Supabase 클라이언트)
8. 스프린트 로드맵 (다음: Supabase 연동 브랜치 → A: 스키마·Auth·CRUD·공개·OG·게이지 → B: 홍보팩·스포트라이트·디스커버)
9. 노션 기획 링크

실행 명령어:

```bash
pnpm install

pnpm dev

pnpm dev:web
pnpm dev:admin

pnpm typecheck
pnpm lint
pnpm build
```

`curl /api/health`는 문서에 넣지 않는다. 엔드포인트가 없다.

### 8.2 노션 작업장

[프로젝트 세팅](https://app.notion.com/p/3db3307fa7e6804faf11c695841d336d) 본문에 README와 같은 명령어, 디렉터리, 허점, 다음 스텝을 적는다. 완료 후 상태를 `프론트엔드`로 바꾼다. 하위 페이지를 새로 만들지 않는다.

## 9. 에러 처리 · 검증

API가 없으므로 앱 레벨 에러 UI(`error.tsx`)를 추가하지 않는다. Next 기본값을 쓴다.

검증:

1. `pnpm install` 성공
2. `pnpm typecheck` 성공
3. `pnpm lint` 성공
4. `pnpm build`가 web·admin 모두 성공
5. `pnpm dev` 후 브라우저에서 `http://localhost:3000`과 `http://localhost:3001`을 연다. 카피, Card, disabled Button을 확인한다. 스크린샷만으로 끝내지 않는다.

테스트 프레임워크는 넣지 않는다.

## 10. 허점 · 보완점

이번 틀 위에 다음에 메워야 하는 공백이다.

1. **BFF가 아직 없다.** 다음 기능 브랜치에서 Axios는 같은 출처 `/api`만 호출하고, Route Handler가 Supabase와 말하도록 고정하는 것이 안전하다. 브라우저에서 supabase-js와 Axios를 동시에 쓰면 세션이 갈라진다.
2. **호출 코드는 없다.** Provider와 httpClient는 준비돼 있다. 다음 브랜치의 첫 Route Handler에서 `useQuery` + `httpClient`를 연결한다. Zustand 스토어는 UI 상태가 필요하면 그때 추가한다.
3. **web/admin 쿠키 분리.** 포트가 다르면 세션이 공유되지 않는다. 운영은 호스트 분리 + `profiles.role = admin` 가드가 필요하다.
4. **스키마·RLS 없음.** 공개 스키마는 RLS 기본. `user_metadata`로 권한 판단 금지. service role을 `NEXT_PUBLIC_`로 노출 금지.
5. **배포는 Vercel 프로젝트 2개.** root directory `apps/web`, `apps/admin`.
6. **소셜 로그인·개발 노트·캡슐·상호 홍보**는 Should.
7. **크레딧 티어 혜택**에 미정 항목이 있다. UI에 혜택을 하드코딩하지 말 것.
8. **공유 도메인 타입 패키지 없음.** `Project` 타입이 필요해지면 `packages/types`를 그때 추가.
9. **Next.js 16 `middleware` → `proxy.ts`.** Auth 가드 추가 시 파일명 확인.
10. **작업장 상태값.** `프론트엔드`가 complete 그룹이라 보드 의미와 실제 단계가 어긋날 수 있다.

## 11. 구현 순서

1. `/tmp/useme-scaffold`에 shadcn Next 모노레포 생성, `useme/`로 이동 (`.git` 유지)
2. `packages/config` 연결, 루트 스크립트·turbo 정리
3. `apps/admin` 추가, 포트 3001
4. 두 앱에 Query/Zustand/Axios 설치. Providers + httpClient만 추가 (`useQuery` 없음)
5. 정적 홈 + shadcn 기본 컴포넌트
6. `supabase/migrations/.gitkeep`
7. README 작성
8. typecheck/lint/build/브라우저 검증
9. 노션 작업장 페이지 갱신

커밋은 사용자가 요청할 때만 한다.
