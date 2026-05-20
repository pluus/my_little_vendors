import type { Business } from "~/types/business";

export const businesses: Business[] = [
  {
    id: 1,
    name: "봉마탱 베이커리",
    description:
      "매일 아침 직접 구운 사워도우, 크루아상, 계절 페이스트리. 주말 픽업은 목요일까지 예약해 주세요.",
    category: "음식 & 베이커리",
    location: "서울, 마포구",
    tags: ["사워도우", "페이스트리", "글루텐프리 옵션", "예약주문"],
    cover:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    instagram: "bonmatinbakery",
    kakao: "https://open.kakao.com/o/sBonMatin",
    contact: "hello@bonmatin.com",
    featured: true,
  },
  {
    id: 2,
    name: "Thread & Thyme",
    description:
      "손으로 짠 벽 장식, 마크라메 화분 걸이, 맞춤 섬유 예술 작품. 천연 염료로 하나하나 제작되는 유일무이한 작품들.",
    category: "수공예 & 공예",
    location: "서울, 성수동",
    tags: ["마크라메", "벽 장식", "천연 염료", "주문 제작"],
    cover:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80",
      "https://images.unsplash.com/photo-1597696929736-6d13bed8e6a8?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    instagram: "threadandthyme",
    kakao: "https://open.kakao.com/o/sTdThyme",
    featured: true,
  },
  {
    id: 3,
    name: "솔 스킨 스튜디오",
    description:
      "소량 제작 식물성 스킨케어 — 유기농 원료로 만든 페이스 오일, 밤, 세럼. 합성 향료 제로.",
    category: "뷰티 & 웰니스",
    location: "서울, 한남동",
    tags: ["유기농", "식물성", "비건", "소량 제작"],
    cover:
      "https://images.unsplash.com/photo-1556228852-6d35a585d566?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    instagram: "solskinstudio",
    kakao: "https://open.kakao.com/o/sSolSkin",
    contact: "sol@solskin.co",
    featured: true,
  },
  {
    id: 4,
    name: "그린 썸 코.",
    description:
      "희귀 열대 실내 식물, 맞춤 화분, 초보자를 위한 스타터 키트. 직접 수령 및 지역 배송 가능.",
    category: "식물 & 가드닝",
    location: "서울, 서대문구",
    tags: ["열대 식물", "희귀 식물", "배송 가능", "스타터 키트"],
    cover:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&q=80",
      "https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    instagram: "greenthumbco",
    kakao: "https://open.kakao.com/o/sGrnThmb",
  },
  {
    id: 5,
    name: "잉크 앤 폼",
    description:
      "미니멀 리소그래프 프린트, 일러스트 카드, 맞춤 반려동물 초상화. 전 세계 배송 — 매월 한정판 출시.",
    category: "아트 & 디자인",
    location: "부산, 해운대구",
    tags: ["리소그래프", "프린트", "반려동물 초상화", "한정판"],
    cover:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80",
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    instagram: "inkandform",
    kakao: "https://open.kakao.com/o/sInkForm",
    contact: "hello@inkandform.art",
  },
  {
    id: 6,
    name: "룸 앤 스티치",
    description:
      "업사이클 데님, 손 자수 토트백, 개성을 살린 슬로 패션 아이템. 패스트 패션은 절대 없습니다.",
    category: "의류 & 패션",
    location: "서울, 홍대",
    tags: ["업사이클", "자수", "슬로 패션", "데님"],
    cover:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    instagram: "loomandstitch",
    kakao: "https://open.kakao.com/o/sLoomStch",
  },
  {
    id: 7,
    name: "하스 앤 홀드",
    description:
      "손으로 부은 소이 캔들, 세라믹 소품 트레이, 공간에 따뜻함을 더하는 홈 굿즈.",
    category: "홈 & 인테리어",
    location: "서울, 이태원",
    tags: ["소이 캔들", "세라믹", "홈 굿즈", "선물"],
    cover:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1608181831718-c9a24f6a26b7?w=600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
    instagram: "hearthandhold",
    kakao: "https://open.kakao.com/o/sHrthHold",
    contact: "shop@hearthandhold.com",
  },
  {
    id: 8,
    name: "포 앤 니트",
    description:
      "강아지와 고양이를 위한 맞춤 손뜨개 스웨터, 반다나, 보타이. 사이즈 가이드 제공 — 모두 주문 제작.",
    category: "반려동물",
    location: "서울, 연남동",
    tags: ["강아지", "고양이", "손뜨개", "주문 제작"],
    cover:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80",
    instagram: "pawandknit",
    kakao: "https://open.kakao.com/o/sPawKnit",
  },
  {
    id: 9,
    name: "달콤한 꿈 베이커리",
    description:
      "정통 멕시코식 팬 둘세, 트레스 레체스 케이크, 맞춤 기념 케이크. 망원동 직접 수령 가능.",
    category: "음식 & 베이커리",
    location: "서울, 망원동",
    tags: ["팬 둘세", "트레스 레체스", "맞춤 케이크", "직접 수령"],
    cover:
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&q=80",
    instagram: "dulcedreams_la",
    kakao: "https://open.kakao.com/o/sDulceDrm",
    contact: "orders@dulcedreams.com",
  },
  {
    id: 10,
    name: "클레이 아틀리에",
    description:
      "작은 홈 스튜디오에서 물레로 빚은 석기 머그컵, 그릇, 화병. 일상의 식탁을 위한 기능성 예술.",
    category: "홈 & 인테리어",
    location: "경기, 성남시",
    tags: ["석기", "물레 성형", "머그컵", "기능성 예술"],
    cover:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80",
    instagram: "theclaytelier",
    kakao: "https://open.kakao.com/o/sClayAtl",
  },
  {
    id: 11,
    name: "퍼먼트 앤 플러리시",
    description:
      "수제 콤부차, 김치, 젖산 발효 핫소스. 소량 제작, 대량 생산 없는 건강한 발효 식품.",
    category: "음식 & 베이커리",
    location: "서울, 서초구",
    tags: ["콤부차", "김치", "발효 식품", "장 건강"],
    cover:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&q=80",
      "https://images.unsplash.com/photo-1583394293214-deb5b8f6db43?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&q=80",
    instagram: "fermentflourish",
    kakao: "https://open.kakao.com/o/sFrmntFl",
    contact: "hi@fermentflourish.com",
  },
  {
    id: 12,
    name: "블룸 프레스 스튜디오",
    description:
      "식물 사이아노타입 프린트와 압화 액자 작품. 자연 속 찰나의 순간을 담은 벽 장식.",
    category: "아트 & 디자인",
    location: "강원, 춘천시",
    tags: ["사이아노타입", "식물 압화", "벽 장식", "액자"],
    cover:
      "https://images.unsplash.com/photo-1490750967868-88df5691cc3e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      "https://images.unsplash.com/photo-1548460893-2d165c9e3f3e?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
    instagram: "bloompressstudio",
    kakao: "https://open.kakao.com/o/sBlmPrss",
  },
];

export const categories = [
  "전체",
  "음식 & 베이커리",
  "수공예 & 공예",
  "뷰티 & 웰니스",
  "식물 & 가드닝",
  "아트 & 디자인",
  "의류 & 패션",
  "홈 & 인테리어",
  "반려동물",
];
