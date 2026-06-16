import { prototypeTips, prototypeUser } from '@mocks/prototypeData';

interface GetTipsParams {
  pageParam: number;
  sorted: string;
}

export interface NewPost {
  userId?: number;
  title: string;
  content: string;
  hashtags: string[];
  imageUrls: File[];
}

let tips = [...prototypeTips];

const sortTips = (sorted: string) =>
  [...tips].sort((a, b) => {
    if (sorted === 'likes') return b.likesCount - a.likesCount;
    if (sorted === 'saves') return b.savesCount - a.savesCount;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

export const getTips = async ({ pageParam, sorted }: GetTipsParams) => {
  const pageSize = 5;
  const sortedTips = sortTips(sorted);
  const start = (pageParam - 1) * pageSize;
  return {
    isSuccess: true,
    result: {
      tips: sortedTips.slice(start, start + pageSize),
      hasMore: start + pageSize < sortedTips.length,
    },
  };
};

export const createPost = async (newPost: NewPost): Promise<void> => {
  const now = new Date().toISOString();
  tips = [
    {
      tipId: Date.now(),
      title: newPost.title,
      content: newPost.content,
      createdAt: now,
      updatedAt: now,
      hashtags: newPost.hashtags.map((name, index) => ({ hashtagId: index + 100, name })),
      imageUrls: [],
      likesCount: 0,
      savesCount: 0,
      author: {
        userId: prototypeUser.user_id,
        nickname: prototypeUser.nickname,
        profileImageUrl: prototypeUser.profile_image_url,
      },
    },
    ...tips,
  ];
};

export const getSavedTips = async () =>
  tips.slice(0, 5).map((tip) => ({
    ...tip,
    likeCount: tip.likesCount,
    saveCount: tip.savesCount,
  }));

export const getTipDetail = async (tipId: number) => {
  const tip = tips.find((item) => item.tipId === tipId) || tips[0];
  return {
    tipId: tip.tipId,
    title: tip.title,
    content: tip.content,
    createdAt: tip.createdAt,
    media: tip.imageUrls.map((image) => ({ mediaUrl: image.media_url, mediaType: image.media_type })),
    hashtags: tip.hashtags.map((tag) => tag.name),
    user: {
      userId: tip.author.userId,
      nickname: tip.author.nickname,
      profileImageUrl: tip.author.profileImageUrl,
    },
    likesCount: tip.likesCount,
    savesCount: tip.savesCount,
    isLiked: false,
    isBookmarked: false,
  };
};

export const toggleLike = async (_tipId: number) => {
  void _tipId;
  return { isSuccess: true, message: '프로토타입 좋아요 토글' };
};

export const toggleBookmark = async (_tipId: number) => {
  void _tipId;
  return { isSuccess: true, message: '프로토타입 북마크 토글' };
};
