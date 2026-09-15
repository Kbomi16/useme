export type SampleProject = {
  name: string
  tagline: string
  problem: string
  action: string
  metric: string
  imageSrc: string
}

export const sampleProjects: SampleProject[] = [
  {
    name: "자리비움",
    tagline: "빈 회의실을 찾으러 복도를 안 돌아도 돼요.",
    problem: "쓸 수 있는 방인지 보러 매번 일어나요.",
    action: "캘린더랑 붙여서 비는 방을 슬랙에 알려줘요.",
    metric: "팀 12명이 하루 네 번은 덜 걸어가요.",
    imageSrc: "/illustrations/og-room.png",
  },
  {
    name: "영수증함",
    tagline: "공동구매 정산을 사진 한 장으로 끝나요.",
    problem: "더치페이를 엑셀에 옮기다 빠뜨려요.",
    action: "영수증 사진 올리면 인원대로 나눠 줘요.",
    metric: "정산이 20분에서 2분으로 줄었어요.",
    imageSrc: "/illustrations/og-bill.png",
  },
  {
    name: "커밋모음",
    tagline: "이번 주 한 일을 커밋으로 한 장 만들어요.",
    problem: "금요일이면 이번 주에 뭘 했는지 기억이 안 나요.",
    action: "git log를 모아서 회고용 한 장을 줘요.",
    metric: "주간 회고 준비에 10분이면 돼요.",
    imageSrc: "/illustrations/og-git.png",
  },
]
