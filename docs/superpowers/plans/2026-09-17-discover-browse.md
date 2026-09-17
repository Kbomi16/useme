# 둘러보기 검색·카테고리·배너 Implementation Plan

> **For agentic workers:** 이 계획은 같은 세션에서 바로 구현한다. 커밋은 사용자가 요청할 때만.

**Goal:** `/discover` 상단에 숨고형 검색·카테고리·직사각 배너를 붙이고, 예시 카드를 화면에서 거른다.

**Architecture:** `page.tsx`는 서버로 샘플을 넘긴다. `DiscoverBrowse`만 클라이언트다. 검색 API는 없다.

**Tech Stack:** Next.js App Router, React Client Component, Tailwind, shadcn Input/Button, lucide icons.

## Global Constraints

- `page.tsx`에 `'use client'` 금지
- `type`만 사용, 핸들러는 `handle*` 화살표 함수
- 새 애니메이션 금지
- 배너 `rounded-none`
- 랜딩 `/` 미변경

## File map

- `apps/web/app/_components/sampleProjects.ts` — `category` 필드
- `apps/web/app/discover/_components/DiscoverPromoBanner.tsx` — 직사각 배너
- `apps/web/app/discover/_components/DiscoverBrowse.tsx` — 검색·카테고리·필터 레일
- `apps/web/app/discover/page.tsx` — Browse에 데이터 전달

## Tasks

- [ ] `category` 필드와 일곱 장 매핑
- [ ] 직사각 배너
- [ ] DiscoverBrowse 검색·카테고리·필터된 오늘/최근 레일
- [ ] page 연결
- [ ] 브라우저에서 카테고리·검색·배너·빈 칸 확인
