import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@store/userStore';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@store/modalStore';
import { createPost, NewPost } from '@apis/tipApi';

export const useTipCreateAndPost = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const showModal = useModalStore((state) => state.showModal);

  return useMutation({
    mutationFn: (newPost: NewPost) => createPost({ ...newPost, userId: user?.user_id || 0 }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      showModal();
      navigate('/community', { replace: true });
      window.scrollTo(0, 0);
    },
    onError: (error: Error) => {
      console.error(`등록에 실패했습니다: ${error.message}`);
    },
  });
};
