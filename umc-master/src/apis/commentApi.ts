import {
  addPrototypeComment,
  deletePrototypeComment,
  editPrototypeComment,
  getPrototypeCommentsByTip,
} from '@mocks/prototypeStorage';

export const getComments = async (tipId: number) => getPrototypeCommentsByTip(tipId);

export const addComment = async (tipId: string, comment: string) => ({
  isSuccess: true,
  result: addPrototypeComment(Number(tipId), comment),
});

export const editComment = async (_tipId: string, commentId: string, newComment: string) => {
  void _tipId;
  editPrototypeComment(Number(commentId), newComment);
  return { isSuccess: true };
};

export const deleteComment = async (_tipId: string, commentId: string) => {
  void _tipId;
  deletePrototypeComment(Number(commentId));
  return { isSuccess: true };
};
