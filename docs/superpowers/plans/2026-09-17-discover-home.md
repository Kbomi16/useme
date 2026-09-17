# 둘러보기 홈 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/discover`를 오늘의 카드 + 최근 카드 선반으로 채우고, `설명 보기`로 가짜 상세 `/project/[slug]`에 이어 준다.

**Architecture:** 샘플 일곱 장은 서버 모듈 `sampleProjects.ts`가 소유한다. `page.tsx`는 Server Component로 레일을 조립하고, 토스트가 필요한 `바로 써 보기`만 클라이언트 버튼으로 남긴다. Auth·API·새 애니메이션은 없다.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, shadcn nova, sonner, lucide-react.

## Global Constraints

- 모든 `page.tsx`는 Server Component (`'use client'` 금지).
- 페이지 전용 컴포넌트는 `app/<route>/_components/`에 둔다.
- 타입은 `type`, 메인/하위 React 컴포넌트만 `function` 선언, 나머지는 화살표 함수.
- UI 카피는 해요체. 토스트 문구는 `로그인은 다음에 붙일게요.` 고정.
- `isCompact` 같은 boolean 모드를 AppealCard에 넣지 않는다. `rank?: number`만 추가한다.
- 새 애니메이션·새 일러스트 파일을 만들지 않는다.
- 랜딩 샘플은 `sampleProjects.slice(0, 3)`만 렌더한다.
- 사용자 요청 전까지 git commit하지 않는다.

---

### Task 1: 샘플 일곱 장

**Files:**
- Modify: `apps/web/app/_components/sampleProjects.ts`
- Modify: `apps/web/app/_components/LandingSamples.tsx`
- Modify: `apps/web/app/_components/LandingFeedbackMocks.tsx`

**Interfaces:**
- Produces: `SampleProject`, `sampleProjects`, `landingProjects`, `featuredProject`, `shelfProjects`, `getSampleProject`

- [ ] **Step 1: `sampleProjects.ts`를 스펙 표 그대로 교체한다.**

```ts
export type SampleComment = {
  name: string
  line: string
}

export type SampleProject = {
  slug: string
  name: string
  tagline: string
  problem: string
  action: string
  metric: string
  imageSrc: string
  likes: number
  comments: SampleComment[]
}

export const sampleProjects: SampleProject[] = [
  {
    slug: "seat",
    name: "자리비움",
    tagline: "빈 회의실을 찾으러 복도를 안 돌아도 돼요.",
    problem: "쓸 수 있는 방인지 보러 매번 일어나요.",
    action: "캘린더랑 붙여서 비는 방을 슬랙에 알려줘요.",
    metric: "팀 12명이 하루 네 번은 덜 걸어가요.",
    imageSrc: "/illustrations/og-room.png",
    likes: 24,
    comments: [
      { name: "재원", line: "복도 안 돌아도 되네요." },
      { name: "유미", line: "슬랙에 바로 떠서 바로 썼어요." },
    ],
  },
  {
    slug: "receipt",
    name: "영수증함",
    tagline: "공동구매 정산을 사진 한 장으로 끝나요.",
    problem: "더치페이를 엑셀에 옮기다 빠뜨려요.",
    action: "영수증 사진 올리면 인원대로 나눠 줘요.",
    metric: "정산이 20분에서 2분으로 줄었어요.",
    imageSrc: "/illustrations/og-bill.png",
    likes: 18,
    comments: [
      { name: "민지", line: "정산 엑셀 안 열어도 되네요." },
      { name: "태호", line: "인원만 고르면 끝나요." },
    ],
  },
  {
    slug: "commits",
    name: "커밋모음",
    tagline: "이번 주 한 일을 커밋으로 한 장 만들어요.",
    problem: "금요일이면 이번 주에 뭘 했는지 기억이 안 나요.",
    action: "git log를 모아서 회고용 한 장을 줘요.",
    metric: "주간 회고 준비에 10분이면 돼요.",
    imageSrc: "/illustrations/og-git.png",
    likes: 15,
    comments: [
      { name: "하은", line: "금요일에 이거 열고 붙여요." },
      { name: "준서", line: "회고 빈칸이 안 생겨요." },
    ],
  },
  {
    slug: "lunch",
    name: "점심투표",
    tagline: "오늘 뭐 먹을지 단톡에서 안 싸워요.",
    problem: "점심 메뉴를 고르다 채팅이 길어져요.",
    action: "후보 세 개를 올려 두고 이모지로 골라요.",
    metric: "고르는 시간이 10분에서 1분으로 줄었어요.",
    imageSrc: "/illustrations/slot-why-cut.png",
    likes: 31,
    comments: [
      { name: "소연", line: "단톡이 조용해졌어요." },
      { name: "현우", line: "세 개만 올려도 충분해요." },
    ],
  },
  {
    slug: "lights",
    name: "불끄기",
    tagline: "마지막에 나가는 사람이 불을 안 깜빡해요.",
    problem: "누가 남았는지 몰라서 전등을 켜 두고 가요.",
    action: "자리 비움을 보고 마지막이면 슬랙에 알려줘요.",
    metric: "야근 다음 날 항의가 거의 없어졌어요.",
    imageSrc: "/illustrations/slot-what-cut.png",
    likes: 11,
    comments: [
      { name: "다은", line: "꺼졌는지 확인하러 안 돌아가요." },
      { name: "시훈", line: "마지막이면 알림이 와요." },
    ],
  },
  {
    slug: "meeting",
    name: "회의한장",
    tagline: "회의가 끝나면 요약 한 장이 나와요.",
    problem: "녹음을 다시 듣다 다음 회의가 시작돼요.",
    action: "녹음을 넣으면 결정이랑 할 일만 남겨 줘요.",
    metric: "정리에 30분 쓰던 게 3분이면 돼요.",
    imageSrc: "/illustrations/slot-metric-cut.png",
    likes: 22,
    comments: [
      { name: "지혜", line: "할 일만 남아서 바로 나눠요." },
      { name: "도윤", line: "녹음 다시 안 들어요." },
    ],
  },
  {
    slug: "oncall",
    name: "당번표",
    tagline: "이번 주 온콜이 누구인지 바로 보여요.",
    problem: "위키를 열어야 당번이 나와요.",
    action: "달력 기준으로 이번 주 당번을 홈에 붙여요.",
    metric: "“누구야?” 질문이 주 열 번에서 한 번으로 줄었어요.",
    imageSrc: "/illustrations/link-chat.png",
    likes: 9,
    comments: [
      { name: "나래", line: "위키 안 찾아도 돼요." },
      { name: "성민", line: "이번 주 당번이 한눈에 보여요." },
    ],
  },
]

export const landingProjects = sampleProjects.slice(0, 3)
export const featuredProject = sampleProjects[0]!
export const shelfProjects = sampleProjects.slice(1)

export const getSampleProject = (slug: string) =>
  sampleProjects.find((project) => project.slug === slug)
```

- [ ] **Step 2: 랜딩은 세 장만 쓰게 바꾼다.**

`LandingSamples.tsx`: `landingProjects`를 map.
`LandingFeedbackMocks.tsx`: `featuredProject`, `landingProjects.map`.

---

### Task 2: AppealCard 배지

**Files:**
- Modify: `apps/web/app/_components/AppealCard.tsx`

**Interfaces:**
- Consumes: `SampleProject`
- Produces: `AppealCard({ project, className, rank?: number })`

- [ ] **Step 1: 썸네일 칩을 양쪽으로 나눈다.** `rank`가 있으면 왼쪽 `1`, `예시 프로젝트`는 오른쪽.

```tsx
type AppealCardProps = {
  project: SampleProject
  className?: string
  rank?: number
}
```

왼쪽 배지 클래스: `absolute top-3 left-3 z-10 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground`
예시 칩: `absolute top-3 right-3`.

---

### Task 3: 둘러보기 전용 UI

**Files:**
- Create: `apps/web/app/discover/_components/DiscoverSocial.tsx`
- Create: `apps/web/app/discover/_components/DiscoverCommentList.tsx`
- Create: `apps/web/app/discover/_components/DiscoverTryButton.tsx`
- Create: `apps/web/app/discover/_components/DiscoverProjectActions.tsx`
- Create: `apps/web/app/discover/_components/DiscoverProjectBlock.tsx`

**Interfaces:**
- Consumes: `SampleProject`, `SampleComment`
- Produces: 위 컴포넌트들. `DiscoverTryButton`만 `'use client'`.

- [ ] **Step 1: `DiscoverSocial`** — lucide `Heart`, `MessageCircle` + `project.likes` / `project.comments.length`. 클릭 없음. `aria-label={`좋아요 ${likes}`}` 형태.

- [ ] **Step 2: `DiscoverCommentList`** — `comments.map`으로 이름(semibold) + 한 줄. 입력 없음.

- [ ] **Step 3: `DiscoverTryButton`**

```tsx
"use client"

import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/sonner"

type DiscoverTryButtonProps = {
  className?: string
}

export default function DiscoverTryButton({ className }: DiscoverTryButtonProps) {
  const handleTry = () => {
    toast.info("로그인은 다음에 붙일게요.")
  }

  return (
    <Button type="button" className={className} onClick={handleTry}>
      바로 써 보기
    </Button>
  )
}
```

- [ ] **Step 4: `DiscoverProjectActions`** — 기본 버튼 + outline `Link` `설명 보기` `href={`/project/${slug}`}`. 상세에서는 이 컴포넌트를 쓰지 않고 TryButton만 쓴다.

- [ ] **Step 5: `DiscoverProjectBlock`** — `AppealCard` + Social + optional comments + Actions. `showComments` 불리언 모드 금지. 오늘의 카드는 페이지에서 CommentList를 직접 끼운다.

오늘의 카드 조립은 page에서:

```tsx
<article className="flex flex-col gap-3">
  <AppealCard project={featuredProject} rank={1} />
  <DiscoverSocial project={featuredProject} />
  <DiscoverCommentList comments={featuredProject.comments} />
  <DiscoverProjectActions slug={featuredProject.slug} />
</article>
```

선반은 comments 없이 같은 패턴.

---

### Task 4: `/discover` 페이지

**Files:**
- Modify: `apps/web/app/discover/page.tsx`

- [ ] **Step 1: 스펙 카피·레일대로 서버 페이지를 다시 쓴다.** 보조 문단 없음. `max-w-5xl`. CTA `내 프로젝트 올려보기` → `/upload`.

선반: `shelfProjects`를 `grid gap-8 sm:grid-cols-2 lg:grid-cols-3`.

---

### Task 5: `/project/[slug]`

**Files:**
- Create: `apps/web/app/project/[slug]/page.tsx`
- Create: `apps/web/app/project/[slug]/not-found.tsx`

- [ ] **Step 1: 서버 페이지.** `params: Promise<{ slug: string }>`. `getSampleProject` 없으면 `notFound()`. `generateStaticParams`는 `sampleProjects.map(({ slug }) => ({ slug }))`.

상세 JSX:

```tsx
<main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-12 md:px-6 md:py-16">
  <div className="mx-auto flex w-full max-w-md flex-col gap-4">
    <AppealCard project={project} />
    <DiscoverSocial project={project} />
    <DiscoverCommentList comments={project.comments} />
    <DiscoverTryButton className="w-full" />
  </div>
</main>
```

- [ ] **Step 2: `not-found.tsx`** — 제목 `그 카드는 없어요.` + Link `둘러보기` `/discover`. `'use client'` 없음.

---

### Task 6: 검증

- [ ] **Step 1:** `pnpm --filter web typecheck`
- [ ] **Step 2:** 브라우저 `/discover`, `/project/seat`, `/project/nope`, `/`, `/upload`. 데스크톱 1280·모바일 375. 토스트·세 칸·버튼 둘·랜딩 3장 확인.

Expected: typecheck 통과, 스펙 완료 조건 1–9 충족.
