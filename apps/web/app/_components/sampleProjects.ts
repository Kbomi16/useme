export const projectCategories = ["생산성", "개발", "생활", "소셜"] as const

export type ProjectCategory = (typeof projectCategories)[number]

export const commentCategories = [
  "일반",
  "피드백",
  "버그",
  "질문",
  "응원",
] as const

export type CommentCategory = (typeof commentCategories)[number]

export type SampleComment = {
  id: string
  name: string
  line: string
  category: CommentCategory
}

export type SampleHighlight = {
  value: string
  label: string
}

export type SampleAuthor = {
  name: string
  bio: string
}

export type SampleProject = {
  slug: string
  name: string
  tagline: string
  problem: string
  action: string
  metric: string
  story: {
    why: string
    what: string
    how: string
  }
  steps: [string, string, string]
  audience: string[]
  highlights: [SampleHighlight, SampleHighlight]
  imageSrc: string
  likes: number
  comments: SampleComment[]
  category: ProjectCategory
  author: SampleAuthor
}

export const sampleProjects: SampleProject[] = [
  {
    slug: "seat",
    name: "자리비움",
    tagline: "빈 회의실을 찾으러 복도를 안 돌아도 돼요.",
    problem: "쓸 수 있는 방인지 보러 매번 일어나요.",
    action: "캘린더랑 붙여서 비는 방을 슬랙에 알려줘요.",
    metric: "팀 12명이 하루 네 번은 덜 걸어가요.",
    story: {
      why: "회의 직전에 빈 방을 찾으러 복도를 돌면, 이미 누가 들어가 있는 일이 많아요. 문 앞까지 가서 확인하고 다시 자리로 돌아오는 시간이 하루에도 몇 번씩 쌓여요.",
      what: "쓰는 캘린더와 회의실을 붙여 두면, 지금 비는 방이 슬랙으로 와요. 복도를 돌기 전에 채팅만 보면 돼요.",
      how: "열두 명이 쓰는 팀에서 하루 네 번쯤 덜 일어나게 됐어요. 방 찾는 일이 메시지 한 줄로 끝나요.",
    },
    steps: [
      "슬랙에 봇을 붙여요.",
      "캘린더에서 회의실을 골라요.",
      "비는 방이 메시지로 와요.",
    ],
    audience: ["회의실이 많은 팀", "슬랙을 쓰는 팀", "자리 찾아 헤매는 팀"],
    highlights: [
      { value: "12명", label: "쓰는 팀" },
      { value: "4번", label: "하루" },
    ],
    imageSrc: "/illustrations/og-room.png",
    likes: 24,
    comments: [
      {
        id: "seat-1",
        name: "재원",
        line: "복도 안 돌아도 되네요.",
        category: "피드백",
      },
      {
        id: "seat-2",
        name: "유미",
        line: "슬랙에 바로 떠서 바로 썼어요.",
        category: "일반",
      },
      {
        id: "seat-3",
        name: "민아",
        line: "구글 캘린더만 되나요?",
        category: "질문",
      },
      {
        id: "seat-4",
        name: "태윤",
        line: "방 이름에 공백 있으면 안 떠요.",
        category: "버그",
      },
      {
        id: "seat-5",
        name: "하늘",
        line: "우리 팀에도 이걸로 충분해요.",
        category: "응원",
      },
    ],
    category: "생산성",
    author: {
      name: "이안",
      bio: "빈 방 찾으러 복도를 돌다 이 카드를 올렸어요.",
    },
  },
  {
    slug: "receipt",
    name: "영수증함",
    tagline: "공동구매 정산을 사진 한 장으로 끝나요.",
    problem: "더치페이를 엑셀에 옮기다 빠뜨려요.",
    action: "영수증 사진 올리면 인원대로 나눠 줘요.",
    metric: "정산이 20분에서 2분으로 줄었어요.",
    story: {
      why: "같이 산 걸 나눌 때마다 엑셀을 열고 이름을 옮기다 보면, 한 사람은 빠지고 한 사람은 두 번 들어가요.",
      what: "영수증 사진만 올리면 금액이 읽히고, 인원만 고르면 나눠 줘요. 엑셀을 안 열어도 돼요.",
      how: "정산 준비에 20분 쓰던 게 2분이면 끝나요. 모임이 끝난 직후에 바로 보낼 수 있어요.",
    },
    steps: [
      "영수증 사진을 올려요.",
      "나눌 사람을 골라요.",
      "각자 낼 금액이 나와요.",
    ],
    audience: ["공동구매하는 팀", "더치페이가 잦은 모임", "정산이 밀리는 사람"],
    highlights: [
      { value: "2분", label: "정산" },
      { value: "20→2", label: "줄었어요" },
    ],
    imageSrc: "/illustrations/og-bill.png",
    likes: 18,
    comments: [
      {
        id: "receipt-1",
        name: "민지",
        line: "정산 엑셀 안 열어도 되네요.",
        category: "피드백",
      },
      {
        id: "receipt-2",
        name: "태호",
        line: "인원만 고르면 끝나요.",
        category: "일반",
      },
      {
        id: "receipt-3",
        name: "서연",
        line: "해외 영수증도 읽히나요?",
        category: "질문",
      },
      {
        id: "receipt-4",
        name: "지훈",
        line: "흐릿한 사진은 금액이 0으로 나와요.",
        category: "버그",
      },
    ],
    category: "생활",
    author: {
      name: "수아",
      bio: "더치페이할 때마다 엑셀을 열다 이 카드를 올렸어요.",
    },
  },
  {
    slug: "commits",
    name: "커밋모음",
    tagline: "이번 주 한 일을 커밋으로 한 장 만들어요.",
    problem: "금요일이면 이번 주에 뭘 했는지 기억이 안 나요.",
    action: "git log를 모아서 회고용 한 장을 줘요.",
    metric: "주간 회고 준비에 10분이면 돼요.",
    story: {
      why: "금요일 회고 전에 git log를 스크롤하다 보면, 한 일은 많은데 한 줄로 안 정리돼요.",
      what: "저장소만 연결하면 이번 주 커밋을 모아서 회고용 한 장을 만들어 줘요.",
      how: "주간 회고 칸을 채우는 데 10분이면 돼요. 빈칸을 메우려고 기억을 더듬지 않아도 돼요.",
    },
    steps: [
      "저장소를 연결해요.",
      "이번 주 범위를 골라요.",
      "회고용 한 장을 복사해요.",
    ],
    audience: ["주간 회고하는 팀", "커밋이 많은 사람", "금요일마다 막히는 사람"],
    highlights: [
      { value: "10분", label: "회고 준비" },
      { value: "한 장", label: "정리" },
    ],
    imageSrc: "/illustrations/og-git.png",
    likes: 15,
    comments: [
      {
        id: "commits-1",
        name: "하은",
        line: "금요일에 이거 열고 붙여요.",
        category: "일반",
      },
      {
        id: "commits-2",
        name: "준서",
        line: "회고 빈칸이 안 생겨요.",
        category: "응원",
      },
      {
        id: "commits-3",
        name: "다온",
        line: "모노레포도 되나요?",
        category: "질문",
      },
      {
        id: "commits-4",
        name: "시우",
        line: "머지 커밋이 두 번 들어가요.",
        category: "버그",
      },
    ],
    category: "개발",
    author: {
      name: "현",
      bio: "금요일 회고 전에 git log를 보다 이 카드를 올렸어요.",
    },
  },
  {
    slug: "lunch",
    name: "점심투표",
    tagline: "오늘 뭐 먹을지 단톡에서 안 싸워요.",
    problem: "점심 메뉴를 고르다 채팅이 길어져요.",
    action: "후보 세 개를 올려 두고 이모지로 골라요.",
    metric: "고르는 시간이 10분에서 1분으로 줄었어요.",
    story: {
      why: "점심마다 단톡이 메뉴 이야기로 가득 차요. 고르다 보면 이미 밥 먹을 시간이 지나 있어요.",
      what: "후보 세 개만 올려 두고 이모지로 고르게 해요. 채팅이 길어지지 않아요.",
      how: "고르는 시간이 10분에서 1분으로 줄었어요. 단톡은 다른 이야기로 비어요.",
    },
    steps: [
      "후보 세 개를 올려요.",
      "이모지로 골라요.",
      "가장 많은 곳으로 가요.",
    ],
    audience: ["점심을 같이 먹는 팀", "단톡이 시끄러운 팀", "메뉴 고르기 싫은 사람"],
    highlights: [
      { value: "1분", label: "고르는 시간" },
      { value: "3개", label: "후보" },
    ],
    imageSrc: "/illustrations/slot-why-cut.png",
    likes: 31,
    comments: [
      {
        id: "lunch-1",
        name: "소연",
        line: "단톡이 조용해졌어요.",
        category: "피드백",
      },
      {
        id: "lunch-2",
        name: "현우",
        line: "세 개만 올려도 충분해요.",
        category: "일반",
      },
      {
        id: "lunch-3",
        name: "가은",
        line: "채식 필터도 있으면 좋겠어요.",
        category: "피드백",
      },
      {
        id: "lunch-4",
        name: "노아",
        line: "같은 이모지를 두 번 누르면 빠지지 않아요.",
        category: "버그",
      },
    ],
    category: "소셜",
    author: {
      name: "모아",
      bio: "점심 메뉴 고르다 단톡이 길어져서 이 카드를 올렸어요.",
    },
  },
  {
    slug: "lights",
    name: "불끄기",
    tagline: "마지막에 나가는 사람이 불을 안 깜빡해요.",
    problem: "누가 남았는지 몰라서 전등을 켜 두고 가요.",
    action: "자리 비움을 보고 마지막이면 슬랙에 알려줘요.",
    metric: "야근 다음 날 항의가 거의 없어졌어요.",
    story: {
      why: "누가 아직 있는지 몰라서 전등을 켜 두고 가면, 다음 날 항의가 와요. 다시 사무실에 돌아가기도 애매해요.",
      what: "자리 비움을 보고 마지막 사람이면 슬랙에 알려 줘요. 끄고 나가면 돼요.",
      how: "야근 다음 날 항의가 거의 없어졌어요. 불을 확인하러 다시 가지 않아도 돼요.",
    },
    steps: [
      "자리 비움을 켜 둬요.",
      "마지막이면 알림이 와요.",
      "불만 끄고 나가요.",
    ],
    audience: ["사무실 팀이 있는 곳", "야근이 있는 팀", "마지막이 자주 바뀌는 팀"],
    highlights: [
      { value: "거의 0", label: "항의" },
      { value: "1번", label: "확인" },
    ],
    imageSrc: "/illustrations/slot-what-cut.png",
    likes: 11,
    comments: [
      {
        id: "lights-1",
        name: "다은",
        line: "꺼졌는지 확인하러 안 돌아가요.",
        category: "일반",
      },
      {
        id: "lights-2",
        name: "시훈",
        line: "마지막이면 알림이 와요.",
        category: "피드백",
      },
      {
        id: "lights-3",
        name: "보라",
        line: "재택이랑 같이 쓰면 헷갈려요.",
        category: "질문",
      },
    ],
    category: "생산성",
    author: {
      name: "하린",
      bio: "불 끄러 다시 사무실에 돌아가다 이 카드를 올렸어요.",
    },
  },
  {
    slug: "meeting",
    name: "회의한장",
    tagline: "회의가 끝나면 요약 한 장이 나와요.",
    problem: "녹음을 다시 듣다 다음 회의가 시작돼요.",
    action: "녹음을 넣으면 결정이랑 할 일만 남겨 줘요.",
    metric: "정리에 30분 쓰던 게 3분이면 돼요.",
    story: {
      why: "회의가 끝나면 녹음을 다시 들으며 할 일을 골라요. 그러다 다음 회의가 시작돼요.",
      what: "녹음만 넣으면 결정이랑 할 일만 남긴 한 장이 나와요. 다시 듣지 않아도 돼요.",
      how: "정리에 30분 쓰던 게 3분이면 돼요. 나온 할 일을 바로 나눠 줄 수 있어요.",
    },
    steps: [
      "회의 녹음을 올려요.",
      "결정이랑 할 일을 확인해요.",
      "한 장을 팀에 보내요.",
    ],
    audience: ["회의가 잦은 팀", "녹음을 다시 듣는 사람", "할 일이 흩어지는 팀"],
    highlights: [
      { value: "3분", label: "정리" },
      { value: "한 장", label: "요약" },
    ],
    imageSrc: "/illustrations/slot-metric-cut.png",
    likes: 22,
    comments: [
      {
        id: "meeting-1",
        name: "지혜",
        line: "할 일만 남아서 바로 나눠요.",
        category: "피드백",
      },
      {
        id: "meeting-2",
        name: "도윤",
        line: "녹음 다시 안 들어요.",
        category: "응원",
      },
      {
        id: "meeting-3",
        name: "은채",
        line: "영어 회의도 되나요?",
        category: "질문",
      },
      {
        id: "meeting-4",
        name: "현석",
        line: "한 시간 넘으면 뒷부분이 잘려요.",
        category: "버그",
      },
    ],
    category: "생산성",
    author: {
      name: "다온",
      bio: "녹음 다시 듣다 다음 회의가 시작돼서 이 카드를 올렸어요.",
    },
  },
  {
    slug: "oncall",
    name: "당번표",
    tagline: "이번 주 온콜이 누구인지 바로 보여요.",
    problem: "위키를 열어야 당번이 나와요.",
    action: "달력 기준으로 이번 주 당번을 홈에 붙여요.",
    metric: "“누구야?” 질문이 주 열 번에서 한 번으로 줄었어요.",
    story: {
      why: "온콜이 누구인지 물을 때마다 위키를 찾아요. 위키 위치도 사람마다 달라요.",
      what: "달력 기준으로 이번 주 당번을 홈에 붙여 둬요. 열지 않아도 보여요.",
      how: "“누구야?” 질문이 주 열 번에서 한 번으로 줄었어요. 당번 찾는 시간이 없어져요.",
    },
    steps: [
      "당번 달력을 붙여요.",
      "이번 주 이름을 확인해요.",
      "홈에서 바로 봐요.",
    ],
    audience: ["온콜이 있는 팀", "위키를 자주 여는 팀", "교대가 잦은 팀"],
    highlights: [
      { value: "1번", label: "주 질문" },
      { value: "10→1", label: "줄었어요" },
    ],
    imageSrc: "/illustrations/link-chat.png",
    likes: 9,
    comments: [
      {
        id: "oncall-1",
        name: "나래",
        line: "위키 안 찾아도 돼요.",
        category: "일반",
      },
      {
        id: "oncall-2",
        name: "성민",
        line: "이번 주 당번이 한눈에 보여요.",
        category: "피드백",
      },
      {
        id: "oncall-3",
        name: "유나",
        line: "대체 당번도 같이 보이나요?",
        category: "질문",
      },
    ],
    category: "생산성",
    author: {
      name: "태린",
      bio: "온콜이 누구인지 물을 때마다 위키를 찾다 이 카드를 올렸어요.",
    },
  },
]

export const landingProjects = sampleProjects.slice(0, 3)
export const featuredProject = sampleProjects[0]!
export const shelfProjects = sampleProjects.slice(1)

export const getSampleProject = (slug: string) =>
  sampleProjects.find((project) => project.slug === slug)

export const getRelatedProjects = (slug: string) => {
  const project = getSampleProject(slug)

  if (!project) return []

  const sameCategory = sampleProjects.filter(
    (item) => item.slug !== slug && item.category === project.category
  )
  const others = sampleProjects.filter(
    (item) => item.slug !== slug && item.category !== project.category
  )

  return [...sameCategory, ...others].slice(0, 3)
}
