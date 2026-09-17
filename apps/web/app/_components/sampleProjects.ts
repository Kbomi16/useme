export type SampleComment = {
  name: string
  line: string
}

export const projectCategories = ["생산성", "개발", "생활", "소셜"] as const

export type ProjectCategory = (typeof projectCategories)[number]

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
  category: ProjectCategory
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
    category: "생산성",
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
    category: "생활",
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
    category: "개발",
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
    category: "소셜",
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
    category: "생산성",
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
    category: "생산성",
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
    category: "생산성",
  },
]

export const landingProjects = sampleProjects.slice(0, 3)
export const featuredProject = sampleProjects[0]!
export const shelfProjects = sampleProjects.slice(1)

export const getSampleProject = (slug: string) =>
  sampleProjects.find((project) => project.slug === slug)
