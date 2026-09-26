# useMe

토이프로젝트를 어필 카드로 바꿔 공유하고, 사람들이 직접 써 보고 피드백하는 플랫폼이다.

> “내 프로젝트 써 봐”를 카드로 뿌리고, 도착한 사람이 체험하며 피드백한다.

## 코어 루프

등록 → 어필 3칸 → 홍보팩 → 공유/스포트라이트 → 체험·반응 → 크레딧 → 다음 등록

### Must

프로젝트 프로필 · 어필력 게이지 · 홍보팩 · 24h 스포트라이트 · 디스커버

### Should

상호 홍보 · 소셜 로그인 · admin 본기능 · 개발 노트 · 캡슐

크레딧·티어는 리텐션용이다. 잔액은 마이페이지에만 두고, 랜딩·홍보팩 CTA에는 넣지 않는다.

## 저장소 구조

```text
useme/
  apps/web/                 # 공개 플랫폼 (port 3000)
  apps/admin/               # 운영 콘솔 (port 3001)
  packages/ui/              # shadcn 공통 UI (@workspace/ui)
  packages/config/          # TypeScript / ESLint / Prettier
  supabase/                 # Auth·profiles 마이그레이션
```

## 기술 스택

- Next.js App Router · TypeScript · Tailwind CSS v4 · shadcn/ui
- TanStack Query · Zustand · Axios (`/api` BFF)
- 배포 예정: Vercel · Auth: Supabase (`@supabase/ssr` 쿠키 세션)

## 요구 사항

- Node.js 20+
- pnpm 10+

## 실행

```bash
pnpm install

# 환경 변수 (값은 본인 Supabase 프로젝트에서)
cp .env.example apps/web/.env.local

# web 3000, admin 3001
pnpm dev

# 앱 하나만
pnpm dev:web
pnpm dev:admin

# 검증
pnpm typecheck
pnpm lint
pnpm build
```

## 환경 변수

`apps/web/.env.local`에 넣습니다. `service_role`은 클라이언트·`NEXT_PUBLIC_`에 두지 않습니다.

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

대시보드에서 Email · Google · Kakao 제공자를 켜고 Redirect URL은 `{origin}/auth/callback`입니다.

## 이번 브랜치에 없는 것

- `/me` 크레딧 UI, `daily_logins`, admin 로그인
- 프로젝트 CRUD, 브라우저에서 supabase-js로 DB 조회

## 로드맵

1. **지금:** Auth (이메일/비밀번호 · Google · 카카오) · `profiles`
2. **다음:** 프로젝트 CRUD · 공개 · OG · 게이지
3. **스프린트 B:** 홍보팩 · 스포트라이트 · 디스커버

## 기획

- [useMe](https://app.notion.com/p/2463307fa7e68081847df575fb164cae)
- [기획서](https://app.notion.com/p/3da3307fa7e6815c986ff011f3869c84)
- [주요기능](https://app.notion.com/p/24b3307fa7e680bfb589fd3b97e9affb)
- [데이터 모델](https://app.notion.com/p/3db3307fa7e681f19211f0aa91f4fa9e)
- [크레딧 체계](https://app.notion.com/p/24b3307fa7e68017b068c8ef9442b178)
