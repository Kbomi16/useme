export type SampleProject = {
  name: string
  tagline: string
  problem: string
  action: string
  metric: string
  appeal: number
}

export const sampleProjects: SampleProject[] = [
  {
    name: "자리비움",
    tagline: "회의실 문이 열려 있는지, 캘린더로 봐요.",
    problem: "쓸 수 있는 회의실인지 보러 복도를 한 바퀴 돌아요.",
    action: "구글 캘린더랑 붙여서, 비는 방을 슬랙에 알려줘요.",
    metric: "팀 12명이 하루 네 번은 덜 일어나요.",
    appeal: 72,
  },
  {
    name: "영수증함",
    tagline: "공동구매 정산을 사진 한 장으로 끝나요.",
    problem: "더치페이를 엑셀에 옮겨 적다 빠뜨려요.",
    action: "영수증 사진 올리면 인원대로 나눠 줘요.",
    metric: "정산이 20분에서 2분으로 줄었어요.",
    appeal: 81,
  },
  {
    name: "커밋모음",
    tagline: "이번 주 내가 한 일을 git log로 한 장 만들어요.",
    problem: "금요일 되면 이번 주에 뭘 했는지 기억이 안 나요.",
    action: "커밋을 모아서 회고용 한 장을 뽑아 줘요.",
    metric: "주간 회고 준비에 10분이면 돼요.",
    appeal: 64,
  },
]
