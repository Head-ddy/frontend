import { prototypeTips } from '@mocks/prototypeData';

export interface Author {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface Hashtag {
  hashtagId: number;
  name: string;
}

export interface Image {
  media_url: string;
  media_type: string;
}

export interface TipItem {
  tipId: number;
  title: string;
  content: string;
  author: Author;
  hashtags: Hashtag[];
  imageUrls: Image[];
  likesCount: number;
  savesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TipsResponse {
  isSuccess: boolean;
  message: string;
  result: TipItem[];
}

export interface GetTipsParams {
  query?: string;
  page: number;
  limit: number;
  tags?: string[];
  sort?: 'latest' | 'likes' | 'saves';
}

export const getSearchTips = async ({ query, tags, page, limit, sort = 'latest' }: GetTipsParams): Promise<TipsResponse> => {
  const normalizedQuery = query?.trim().toLowerCase();
  const filtered = prototypeTips.filter((tip) => {
    const matchesQuery = !normalizedQuery || `${tip.title} ${tip.content}`.toLowerCase().includes(normalizedQuery);
    const matchesTags = !tags?.length || tip.hashtags.some((tag) => tags.includes(tag.name));
    return matchesQuery && matchesTags;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'likes') return b.likesCount - a.likesCount;
    if (sort === 'saves') return b.savesCount - a.savesCount;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const start = (page - 1) * limit;
  return { isSuccess: true, message: '프로토타입 검색 결과입니다.', result: sorted.slice(start, start + limit) };
};
