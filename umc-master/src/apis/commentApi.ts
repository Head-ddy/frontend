import { prototypeComments, prototypeUser } from '@mocks/prototypeData';

let comments = [...prototypeComments];

export const getComments = async (tipId: number) => comments.filter((comment) => comment.tips_id === tipId);

export const addComment = async (tipId: string, comment: string) => {
  const newComment = {
    comment_id: Date.now(),
    tips_id: Number(tipId),
    user: {
      user_id: prototypeUser.user_id,
      nickname: prototypeUser.nickname,
      profileImageUrl: prototypeUser.profile_image_url,
    },
    comment,
    created_at: new Date().toISOString(),
  };
  comments = [newComment, ...comments];
  return { isSuccess: true, result: newComment };
};

export const editComment = async (_tipId: string, commentId: string, newComment: string) => {
  comments = comments.map((comment) =>
    comment.comment_id === Number(commentId) ? { ...comment, comment: newComment } : comment
  );
  return { isSuccess: true };
};

export const deleteComment = async (_tipId: string, commentId: string) => {
  comments = comments.filter((comment) => comment.comment_id !== Number(commentId));
  return { isSuccess: true };
};
