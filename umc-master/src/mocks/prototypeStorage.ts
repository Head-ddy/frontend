import { prototypeComments, prototypeTips, prototypeUser } from './prototypeData';

export type PrototypeUser = typeof prototypeUser;
export type PrototypeTip = (typeof prototypeTips)[number];
export type PrototypeComment = (typeof prototypeComments)[number];

type StoredTip = Omit<PrototypeTip, 'author'> & {
  author: PrototypeTip['author'];
  isUserCreated?: boolean;
};

type TipInteractionState = {
  likedTipIds: number[];
  bookmarkedTipIds: number[];
};

const STORAGE_KEYS = {
  user: 'umc-prototype:user',
  tips: 'umc-prototype:tips',
  comments: 'umc-prototype:comments',
  interactions: 'umc-prototype:interactions',
};

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const readJson = <T>(key: string, fallback: T): T => {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = <T>(key: string, value: T) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const defaultInteractions: TipInteractionState = {
  likedTipIds: [],
  bookmarkedTipIds: [1, 2],
};

export const getPrototypeUser = (): PrototypeUser => readJson(STORAGE_KEYS.user, prototypeUser);

export const savePrototypeUser = (user: PrototypeUser) => writeJson(STORAGE_KEYS.user, user);

export const updatePrototypeUser = (profileData: Partial<PrototypeUser>) => {
  const updatedUser = {
    ...getPrototypeUser(),
    ...profileData,
    updated_at: new Date().toISOString(),
  };
  savePrototypeUser(updatedUser);
  return updatedUser;
};

export const getPrototypeTips = (): StoredTip[] => readJson<StoredTip[]>(STORAGE_KEYS.tips, prototypeTips as StoredTip[]);

const savePrototypeTips = (tips: StoredTip[]) => writeJson(STORAGE_KEYS.tips, tips);

export const getPrototypeComments = (): PrototypeComment[] =>
  readJson<PrototypeComment[]>(STORAGE_KEYS.comments, prototypeComments);

const savePrototypeComments = (comments: PrototypeComment[]) => writeJson(STORAGE_KEYS.comments, comments);

export const getTipInteractions = (): TipInteractionState => readJson(STORAGE_KEYS.interactions, defaultInteractions);

const saveTipInteractions = (interactions: TipInteractionState) => writeJson(STORAGE_KEYS.interactions, interactions);

const toggleId = (ids: number[], id: number) => (ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);

const adjustTipCount = (tipId: number, key: 'likesCount' | 'savesCount', isActive: boolean) => {
  const tips = getPrototypeTips().map((tip) =>
    tip.tipId === tipId ? { ...tip, [key]: Math.max(0, tip[key] + (isActive ? 1 : -1)) } : tip
  );
  savePrototypeTips(tips);
};

export const isTipLiked = (tipId: number) => getTipInteractions().likedTipIds.includes(tipId);

export const isTipBookmarked = (tipId: number) => getTipInteractions().bookmarkedTipIds.includes(tipId);

export const togglePrototypeLike = (tipId: number) => {
  const current = getTipInteractions();
  const willLike = !current.likedTipIds.includes(tipId);
  saveTipInteractions({ ...current, likedTipIds: toggleId(current.likedTipIds, tipId) });
  adjustTipCount(tipId, 'likesCount', willLike);
  return willLike;
};

export const togglePrototypeBookmark = (tipId: number) => {
  const current = getTipInteractions();
  const willBookmark = !current.bookmarkedTipIds.includes(tipId);
  saveTipInteractions({ ...current, bookmarkedTipIds: toggleId(current.bookmarkedTipIds, tipId) });
  adjustTipCount(tipId, 'savesCount', willBookmark);
  return willBookmark;
};

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });

export const addPrototypeTip = async ({
  title,
  content,
  hashtags,
  imageFiles,
}: {
  title: string;
  content: string;
  hashtags: string[];
  imageFiles: File[];
}) => {
  const user = getPrototypeUser();
  const imageUrls = (await Promise.all(imageFiles.map(fileToDataUrl)))
    .filter(Boolean)
    .map((media_url) => ({ media_url, media_type: 'image' }));
  const now = new Date().toISOString();
  const newTip: StoredTip = {
    tipId: Date.now(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
    hashtags: hashtags.map((name, index) => ({ hashtagId: Date.now() + index, name })),
    imageUrls,
    likesCount: 0,
    savesCount: 0,
    author: {
      userId: user.user_id,
      nickname: user.nickname,
      profileImageUrl: user.profile_image_url,
    },
    isUserCreated: true,
  };

  savePrototypeTips([newTip, ...getPrototypeTips()]);
  return newTip;
};

export const getBookmarkedPrototypeTips = () => {
  const bookmarkedIds = getTipInteractions().bookmarkedTipIds;
  return getPrototypeTips().filter((tip) => bookmarkedIds.includes(tip.tipId));
};

export const getPrototypeTipById = (tipId: number) => getPrototypeTips().find((tip) => tip.tipId === tipId) || getPrototypeTips()[0];

export const getPrototypeCommentsByTip = (tipId: number) =>
  getPrototypeComments().filter((comment) => comment.tips_id === tipId);

export const addPrototypeComment = (tipId: number, comment: string) => {
  const user = getPrototypeUser();
  const newComment: PrototypeComment = {
    comment_id: Date.now(),
    tips_id: tipId,
    user: {
      user_id: user.user_id,
      nickname: user.nickname,
      profileImageUrl: user.profile_image_url,
    },
    comment,
    created_at: new Date().toISOString(),
  };
  savePrototypeComments([newComment, ...getPrototypeComments()]);
  return newComment;
};

export const editPrototypeComment = (commentId: number, nextComment: string) => {
  const comments = getPrototypeComments().map((comment) =>
    comment.comment_id === commentId ? { ...comment, comment: nextComment } : comment
  );
  savePrototypeComments(comments);
};

export const deletePrototypeComment = (commentId: number) => {
  savePrototypeComments(getPrototypeComments().filter((comment) => comment.comment_id !== commentId));
};

export const resetPrototypeStorage = () => {
  if (!canUseStorage()) return;
  Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
};
