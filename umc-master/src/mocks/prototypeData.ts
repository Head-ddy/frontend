import dummyImage from '@assets/dummyImage/dummy.jpeg';
import cleanImage from '@assets/dummyImage/clean.png';
import image1 from '@assets/dummyImage/1.png';
import image2 from '@assets/dummyImage/2.png';
import image3 from '@assets/dummyImage/3.png';
import image4 from '@assets/dummyImage/4.png';
import profileImage from '@assets/gray-character.png';

export const prototypeUser = {
  user_id: 1,
  email: 'prototype@umc.local',
  nickname: '프로토타입 유저',
  city: '서울특별시',
  district: '종로구',
  profile_image_url: profileImage,
  provider: 'prototype',
  providerId: 'prototype-user',
  role: 'USER',
  status: 'ACTIVE',
  created_at: '2026-06-01T09:00:00.000Z',
  updated_at: '2026-06-16T09:00:00.000Z',
  last_login: null,
  location_id: '17',
  hashtags: ['청소', '정리', '생활', '친환경'],
};

const authors = [
  { userId: 1, nickname: '프로토타입 유저', profileImageUrl: profileImage },
  { userId: 2, nickname: '살림고수', profileImageUrl: null },
  { userId: 3, nickname: '에코러버', profileImageUrl: null },
];

export const prototypeTips = [
  {
    tipId: 1,
    title: '베이킹소다로 싱크대 냄새 잡는 법',
    content: '배수구에 베이킹소다를 뿌리고 식초를 조금 부은 뒤 10분 후 뜨거운 물로 헹구면 냄새가 줄어듭니다.',
    createdAt: '2026-06-16T10:00:00.000Z',
    updatedAt: '2026-06-16T10:00:00.000Z',
    hashtags: [{ hashtagId: 1, name: '청소' }, { hashtagId: 2, name: '주방' }],
    imageUrls: [{ media_url: cleanImage, media_type: 'image' }],
    likesCount: 128,
    savesCount: 54,
    author: authors[1],
  },
  {
    tipId: 2,
    title: '분리수거함을 깔끔하게 유지하는 루틴',
    content: '라벨 제거용 스크래퍼와 작은 행주를 분리수거함 옆에 두면 배출 전 정리가 쉬워집니다.',
    createdAt: '2026-06-15T15:30:00.000Z',
    updatedAt: '2026-06-15T15:30:00.000Z',
    hashtags: [{ hashtagId: 3, name: '친환경' }, { hashtagId: 4, name: '정리' }],
    imageUrls: [{ media_url: image1, media_type: 'image' }],
    likesCount: 96,
    savesCount: 82,
    author: authors[2],
  },
  {
    tipId: 3,
    title: '옷장 습기 줄이는 신문지 활용법',
    content: '신문지를 접어 옷장 구석에 두고 2주마다 교체하면 습기와 냄새 관리에 도움이 됩니다.',
    createdAt: '2026-06-14T08:10:00.000Z',
    updatedAt: '2026-06-14T08:10:00.000Z',
    hashtags: [{ hashtagId: 5, name: '수납' }, { hashtagId: 6, name: '의류' }],
    imageUrls: [{ media_url: image2, media_type: 'image' }],
    likesCount: 74,
    savesCount: 41,
    author: authors[0],
  },
  {
    tipId: 4,
    title: '전자레인지 찌든 때 5분 청소',
    content: '물과 레몬 조각을 담은 컵을 3분 돌린 뒤 문을 닫은 채 2분 기다리고 닦아보세요.',
    createdAt: '2026-06-13T12:00:00.000Z',
    updatedAt: '2026-06-13T12:00:00.000Z',
    hashtags: [{ hashtagId: 1, name: '청소' }, { hashtagId: 7, name: '가전' }],
    imageUrls: [{ media_url: image3, media_type: 'image' }],
    likesCount: 152,
    savesCount: 100,
    author: authors[1],
  },
  {
    tipId: 5,
    title: '책상 위 케이블 정리 아이디어',
    content: '집게 클립과 벨크로 타이를 이용하면 충전 케이블이 바닥으로 떨어지는 일을 줄일 수 있습니다.',
    createdAt: '2026-06-12T18:20:00.000Z',
    updatedAt: '2026-06-12T18:20:00.000Z',
    hashtags: [{ hashtagId: 4, name: '정리' }, { hashtagId: 8, name: '데스크테리어' }],
    imageUrls: [{ media_url: image4, media_type: 'image' }],
    likesCount: 68,
    savesCount: 33,
    author: authors[2],
  },
  {
    tipId: 6,
    title: '냉장고 재료 위치 라벨링',
    content: '투명 박스 앞면에 재료명과 구매일을 붙이면 버리는 식재료를 줄일 수 있습니다.',
    createdAt: '2026-06-11T20:15:00.000Z',
    updatedAt: '2026-06-11T20:15:00.000Z',
    hashtags: [{ hashtagId: 2, name: '주방' }, { hashtagId: 4, name: '정리' }],
    imageUrls: [{ media_url: dummyImage, media_type: 'image' }],
    likesCount: 88,
    savesCount: 70,
    author: authors[0],
  },
];

export const prototypeComments = [
  {
    comment_id: 1,
    tips_id: 1,
    user: { user_id: 1, nickname: '프로토타입 유저', profileImageUrl: profileImage },
    comment: '서버 없이도 댓글 UI 확인이 가능하도록 들어간 임시 댓글입니다.',
    created_at: '2026-06-16T11:00:00.000Z',
  },
  {
    comment_id: 2,
    tips_id: 1,
    user: { user_id: 2, nickname: '살림고수', profileImageUrl: null },
    comment: '베이킹소다 팁 좋아요! 식초 양은 조금만 넣는 게 좋더라고요.',
    created_at: '2026-06-16T11:30:00.000Z',
  },
  {
    comment_id: 3,
    tips_id: 2,
    user: { user_id: 3, nickname: '에코러버', profileImageUrl: null },
    comment: '분리수거 루틴 화면 확인용 댓글입니다.',
    created_at: '2026-06-15T16:00:00.000Z',
  },
];

export const prototypePolicies = [
  {
    id: 1,
    title: '종로구 1인가구 정리수납 지원 프로그램',
    description: '좁은 공간을 효율적으로 쓰는 정리수납 교육과 생활 컨설팅을 제공합니다.',
    created_at: '2026-05-20T09:00:00.000Z',
    updated_at: '2026-06-10T09:00:00.000Z',
    policy_url: 'https://example.com/prototype-policy-1',
    image_url_list: cleanImage,
    magazine_likes: 320,
    magazine_bookmarks: 140,
    imageUrl: cleanImage,
    likeCount: 320,
    bookmarkCount: 140,
    createAt: '2026-06-10T09:00:00.000Z',
    organization: { id: 1, name: '종로구청', image: profileImage },
    location: { id: 17, name: '종로구' },
    hashtag: [{ id: 1, name: '정리' }, { id: 2, name: '생활' }],
  },
  {
    id: 2,
    title: '친환경 생활 실천 챌린지',
    description: '일회용품 줄이기와 재활용 습관을 돕는 지역 커뮤니티 챌린지입니다.',
    created_at: '2026-05-25T09:00:00.000Z',
    updated_at: '2026-06-12T09:00:00.000Z',
    policy_url: 'https://example.com/prototype-policy-2',
    image_url_list: image1,
    magazine_likes: 270,
    magazine_bookmarks: 120,
    imageUrl: image1,
    likeCount: 270,
    bookmarkCount: 120,
    createAt: '2026-06-12T09:00:00.000Z',
    organization: { id: 2, name: '생활환경센터', image: profileImage },
    location: { id: 17, name: '종로구' },
    hashtag: [{ id: 3, name: '친환경' }, { id: 4, name: '챌린지' }],
  },
];

export const prototypeHashtags = [
  { hashtag_id: 1, name: '청소', popularity: 99 },
  { hashtag_id: 2, name: '정리', popularity: 94 },
  { hashtag_id: 3, name: '친환경', popularity: 90 },
  { hashtag_id: 4, name: '주방', popularity: 85 },
  { hashtag_id: 5, name: '수납', popularity: 80 },
  { hashtag_id: 6, name: '생활', popularity: 75 },
];

export const prototypeQuiz = {
  id: 1,
  question: '베이킹소다와 식초를 함께 쓰면 배수구 냄새 완화에 도움이 될까요?',
  answer: 1,
  description: '거품 반응이 오염물을 느슨하게 만들어 청소에 도움을 줄 수 있어요. 사용 후에는 물로 충분히 헹궈주세요.',
};
