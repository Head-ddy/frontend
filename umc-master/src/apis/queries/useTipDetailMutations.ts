import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike, toggleBookmark } from '@apis/tipApi';

const invalidatePrototypeTipQueries = (queryClient: ReturnType<typeof useQueryClient>, tipId: number) => {
  queryClient.invalidateQueries({ queryKey: ['tipDetail', tipId] });
  queryClient.invalidateQueries({ queryKey: ['savedTips'] });
  queryClient.invalidateQueries({ queryKey: ['tips'] });
};

export const useToggleLike = (tipId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(tipId),
    onSuccess: (data) => {
      console.log(data.message);
      invalidatePrototypeTipQueries(queryClient, tipId);
    },
    onError: (error) => {
      console.error('좋아요 토글 오류:', error);
    },
  });
};

export const useToggleBookmark = (tipId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleBookmark(tipId),
    onSuccess: (data) => {
      console.log(data.message);
      invalidatePrototypeTipQueries(queryClient, tipId);
    },
    onError: (error) => {
      console.error('북마크 토글 오류:', error);
    },
  });
};
