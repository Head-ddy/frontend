import {
  addPrototypeTip,
  getBookmarkedPrototypeTips,
  getPrototypeTipById,
  getPrototypeTips,
  isTipBookmarked,
  isTipLiked,
  togglePrototypeBookmark,
  togglePrototypeLike,
} from '@mocks/prototypeStorage';

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

const sortTips = (sorted: string) =>
  [...getPrototypeTips()].sort((a, b) => {
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
  await addPrototypeTip({
    title: newPost.title,
    content: newPost.content,
    hashtags: newPost.hashtags,
    imageFiles: newPost.imageUrls,
  });
};

export const getSavedTips = async () =>
  getBookmarkedPrototypeTips().map((tip) => ({
    ...tip,
    likeCount: tip.likesCount,
    saveCount: tip.savesCount,
  }));

export const getTipDetail = async (tipId: number) => {
  const tip = getPrototypeTipById(tipId);
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
    isLiked: isTipLiked(tip.tipId),
    isBookmarked: isTipBookmarked(tip.tipId),
  };
};

export const toggleLike = async (tipId: number) => {
  const liked = togglePrototypeLike(tipId);
  return { isSuccess: true, message: liked ? '좋아요에 추가했습니다.' : '좋아요를 취소했습니다.' };
};

export const toggleBookmark = async (tipId: number) => {
  const bookmarked = togglePrototypeBookmark(tipId);
  return { isSuccess: true, message: bookmarked ? '저장한 꿀팁에 추가했습니다.' : '저장을 취소했습니다.' };
};
