import type { Business } from "~/types/business";

export const businesses: Business[] = [
  {
    id: 1,
    name: "봉마탱 베이커리 [Demo]",
    description:
      "매일 아침 직접 구운 사워도우, 크루아상, 계절 페이스트리. 주말 픽업은 목요일까지 예약해 주세요.",
    category: "음식 & 베이커리",
    location: "Vancouver, Kitsilano",
    tags: ["사워도우", "페이스트리", "글루텐프리 옵션", "예약주문"],
    cover:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&q=80",
    ],
    hours: "월-금0 08:00–19:00 · 일 09:00–14:00",
    website: "https://bonmatinbakery.kr",
    gallery: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80",
      "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=600&q=80",
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
    name: "Thread & Thyme [Demo]",
    description:
      "손으로 짠 벽 장식, 마크라메 화분 걸이, 맞춤 섬유 예술 작품. 천연 염료로 하나하나 제작되는 유일무이한 작품들.",
    category: "수공예 & 공예",
    location: "Vancouver, Mount Pleasant",
    tags: ["마크라메", "벽 장식", "천연 염료", "주문 제작"],
    cover:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&q=80",
    ],
    hours: "월-금0 08:00–19:00 · 일 09:00–14:00",
    website: "https://bonmatinbakery.kr",
    gallery: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80",
      "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    instagram: "threadandthyme",
    kakao: "https://open.kakao.com/o/sTdThyme",
    featured: true,
  },
  {
    id: 3,
    name: "솔 스킨 스튜디오 [Demo]",
    description:
      "소량 제작 식물성 스킨케어 — 유기농 원료로 만든 페이스 오일, 밤, 세럼. 합성 향료 제로.",
    category: "뷰티 & 웰니스",
    location: "Vancouver, South Granville",
    tags: ["유기농", "식물성", "비건", "소량 제작"],
    cover:
      "https://images.unsplash.com/photo-1556228852-6d35a585d566?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80",
    ],
    hours: "월-금 10:00–18:00 · 주말 예약제",
    website: "https://solskinstudio.co.kr",
    gallery: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80",
      "https://images.unsplash.com/photo-1552693673-1bf823388162?w=600&q=80",
      "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=600&q=80",
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
    name: "그린 썸 코. [Demo]",
    description:
      "희귀 열대 실내 식물, 맞춤 화분, 초보자를 위한 스타터 키트. 직접 수령 및 지역 배송 가능.",
    category: "식물 & 가드닝",
    location: "Burnaby, Metrotown",
    tags: ["열대 식물", "희귀 식물", "배송 가능", "스타터 키트"],
    cover:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&q=80",
      "https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=600&q=80",
    ],
    hours: "화-일 10:00–19:00 · 월 휴무",
    website: "https://greenthumbco.kr",
    gallery: [
      "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=600&q=80",
      "https://images.unsplash.com/photo-1444318426923-cb2abc3ff966?w=600&q=80",
      "https://images.unsplash.com/photo-1520302630591-fd1717d9de04?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    instagram: "greenthumbco",
    kakao: "https://open.kakao.com/o/sGrnThmb",
  },
  {
    id: 5,
    name: "잉크 앤 폼 [Demo]",
    description:
      "미니멀 리소그래프 프린트, 일러스트 카드, 맞춤 반려동물 초상화. 전 세계 배송 — 매월 한정판 출시.",
    category: "아트 & 디자인",
    location: "North Vancouver, Lonsdale",
    tags: ["리소그래프", "프린트", "반려동물 초상화", "한정판"],
    cover:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80",
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=600&q=80",
    ],
    hours: "온라인 스토어 24시간",
    website: "https://inkandform.art",
    gallery: [
      "https://images.unsplash.com/photo-1579965342575-16428a7c8881?w=600&q=80",
      "https://images.unsplash.com/photo-1502101872923-d48509bff386?w=600&q=80",
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    instagram: "inkandform",
    kakao: "https://open.kakao.com/o/sInkForm",
    contact: "hello@inkandform.art",
  },
  {
    id: 6,
    name: "룸 앤 스티치 [Demo]",
    description:
      "업사이클 데님, 손 자수 토트백, 개성을 살린 슬로 패션 아이템. 패스트 패션은 절대 없습니다.",
    category: "의류 & 패션",
    location: "Vancouver, Commercial Drive",
    tags: ["업사이클", "자수", "슬로 패션", "데님"],
    cover:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    ],
    hours: "화-일 12:00–19:00 · 월 휴무",
    website: "https://loomandstitch.kr",
    gallery: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    instagram: "loomandstitch",
    kakao: "https://open.kakao.com/o/sLoomStch",
  },
  {
    id: 7,
    name: "하스 앤 홀드 [Demo]",
    description:
      "손으로 부은 소이 캔들, 세라믹 소품 트레이, 공간에 따뜻함을 더하는 홈 굿즈.",
    category: "홈 & 인테리어",
    location: "Vancouver, Gastown",
    tags: ["소이 캔들", "세라믹", "홈 굿즈", "선물"],
    cover:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1608181831718-c9a24f6a26b7?w=600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    ],
    hours: "월-금0 11:00–20:00 · 일 휴무",
    website: "https://hearthandhold.com",
    gallery: [
      "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=600&q=80",
      "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=600&q=80",
      "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
    instagram: "hearthandhold",
    kakao: "https://open.kakao.com/o/sHrthHold",
    contact: "shop@hearthandhold.com",
  },
  {
    id: 8,
    name: "포 앤 니트 [Demo]",
    description:
      "강아지와 고양이를 위한 맞춤 손뜨개 스웨터, 반다나, 보타이. 사이즈 가이드 제공 — 모두 주문 제작.",
    category: "반려동물",
    location: "Vancouver, Main Street",
    tags: ["강아지", "고양이", "손뜨개", "주문 제작"],
    cover:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
    ],
    hours: "온라인 주문 24시간 · 상담 월-금",
    website: "https://pawandknit.co.kr",
    gallery: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80",
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&q=80",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80",
    instagram: "pawandknit",
    kakao: "https://open.kakao.com/o/sPawKnit",
  },
  {
    id: 9,
    name: "달콤한 꿈 베이커리 [Demo]",
    description:
      "정통 멕시코식 팬 둘세, 트레스 레체스 케이크, 맞춤 기념 케이크. 망원동 직접 수령 가능.",
    category: "음식 & 베이커리",
    location: "Richmond, Steveston",
    tags: ["팬 둘세", "트레스 레체스", "맞춤 케이크", "직접 수령"],
    cover:
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80",
    ],
    hours: "수-일 10:00–18:00 · 월화 휴무",
    website: "https://dulcedreamsbakery.kr",
    gallery: [
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80",
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80",
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&q=80",
    instagram: "dulcedreams_la",
    kakao: "https://open.kakao.com/o/sDulceDrm",
    contact: "orders@dulcedreams.com",
  },
  {
    id: 10,
    name: "클레이 아틀리에 [Demo]",
    description:
      "작은 홈 스튜디오에서 물레로 빚은 석기 머그컵, 그릇, 화병. 일상의 식탁을 위한 기능성 예술.",
    category: "홈 & 인테리어",
    location: "Coquitlam, Burke Mountain",
    tags: ["석기", "물레 성형", "머그컵", "기능성 예술"],
    cover:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80",
    ],
    hours: "화-턤0 11:00–18:00 · 일월 휴무",
    website: "https://theclaytelier.com",
    gallery: [
      "https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=600&q=80",
      "https://images.unsplash.com/photo-1604326531570-1a56be1aff37?w=600&q=80",
      "https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80",
    instagram: "theclaytelier",
    kakao: "https://open.kakao.com/o/sClayAtl",
  },
  {
    id: 11,
    name: "퍼먼트 앤 플러리시 [Demo]",
    description:
      "수제 콤부차, 김치, 젖산 발효 핫소스. 소량 제작, 대량 생산 없는 건강한 발효 식품.",
    category: "음식 & 베이커리",
    location: "Surrey, Cloverdale",
    tags: ["콤부차", "김치", "발효 식품", "장 건강"],
    cover:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&q=80",
      "https://images.unsplash.com/photo-1583394293214-deb5b8f6db43?w=600&q=80",
    ],
    hours: "월-금 09:00–17:00 · 일 휴무",
    website: "https://fermentandflourish.kr",
    gallery: [
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&q=80",
      "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&q=80",
      "https://images.unsplash.com/photo-1506802913710-d90dbad888a3?w=600&q=80",
    ],
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&q=80",
    instagram: "fermentflourish",
    kakao: "https://open.kakao.com/o/sFrmntFl",
    contact: "hi@fermentflourish.com",
  },
  {
    id: 12,
    name: "블룸 프레스 스튜디오 [Demo]",
    description:
      "식물 사이아노타입 프린트와 압화 액자 작품. 자연 속 찰나의 순간을 담은 벽 장식.",
    category: "아트 & 디자인",
    location: "Port Moody, Inlet Centre",
    tags: ["사이아노타입", "식물 압화", "벽 장식", "액자"],
    cover:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      "https://images.unsplash.com/photo-1548460893-2d165c9e3f3e?w=600&q=80",
    ],
    hours: "온라인 스토어 · 방문 예약제",
    website: "https://bloompressstudio.com",
    gallery: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",

      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
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
