export interface GroupBuyingEvent {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  link: string;
  tag?: string;
  status?: "진행중" | "마감" | "예정";
  photos?: string[];
}

export const groupBuyingEvents: GroupBuyingEvent[] = [
  {
    title: "유기농 제철 과일 공동구매",
    startDate: "2026-06-10",
    endDate: "2026-06-20",
    description:
      "🍎 신선한 유기농 제철 과일을 함께 구매해요!<br><br>BC주 로컬 농장에서 직접 재배한 신선한 과일을 합리적인 가격에 만나보세요. 사과, 배, 체리 등 다양한 과일을 준비했습니다.<br><br>최소 주문 수량: 10박스<br>배송: 6월 25일 일괄 배송 예정",
    link: "https://forms.gle/example1",
    tag: "진행중",
    status: "진행중",
    photos: [
      "/images/web/chibi-1.png",
      "/images/web/chibi-2.png",
      "/images/web/chibi-3.png",
    ],
  },
  {
    title: "한국 김치 대량 공동구매",
    startDate: "2026-05-20",
    endDate: "2026-06-05",
    description:
      "🥬 정통 한국식 김치 공동구매가 돌아왔어요!<br><br>밴쿠버 한인 커뮤니티에서 가장 인기 있는 김치 공동구매. 배추김치, 깍두기, 총각김치를 특별가로 만나보세요.<br><br>최소 주문: 5kg<br>픽업: 6월 8일 버나비 지정 장소",
    link: "https://forms.gle/example2",
    tag: "마감",
    status: "마감",
    photos: ["/images/web/chibi-2.png", "/images/web/chibi-1.png"],
  },
  {
    title: "친환경 생활용품 공동구매",
    startDate: "2026-06-01",
    endDate: "2026-06-15",
    description:
      "♻️ 지구를 생각하는 친환경 생활용품 공동구매!<br><br>대나무 칫솔, 비누, 천연 세제 등 일상에서 쉽게 사용할 수 있는 친환경 제품들을 한 번에! 환경도 지키고 비용도 절약하세요.<br><br>최소 주문: 품목당 20개<br>배송: 주문 마감 후 7일 이내",
    link: "https://forms.gle/example3",
    tag: "진행중",
    status: "진행중",
    photos: ["/images/web/chibi-3.png"],
  },
  {
    title: "수제 떡 명절 특별 공동구매",
    startDate: "2026-04-20",
    endDate: "2026-05-05",
    description:
      "🎂 명절을 맞아 준비한 특별한 수제 떡 공동구매!<br><br>전통 방식으로 만든 인절미, 송편, 백설기 등을 합리적인 가격에 만나보세요. 가족 모임이나 선물용으로 딱이에요.<br><br>최소 주문: 3팩<br>픽업: 5월 10일 코퀴틀람 지정 장소",
    link: "https://forms.gle/example4",
    tag: "마감",
    status: "마감",
  },
];
