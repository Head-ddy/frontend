import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useComments } from '@apis/queries/useCommentQueries';
import { Comment, useAddComment, useDeleteComment, useUpdateComment } from '@apis/queries/useCommentMutations';
import { useUserStore } from '@store/userStore';
import Typography from '@components/common/typography';
import SkeletonComment from '@components/Skeleton/SkeletonComment';
import styled from 'styled-components';
import ProfileDefault from '@assets/gray-character.png';

const COMMENTS_PER_LOAD = 3;

const CommentView: React.FC = () => {
  const theme = useTheme();
  const { tipId } = useParams<{ tipId: string }>();
  const { user } = useUserStore();

  const { data: comments = [], isLoading, error } = useComments(Number(tipId));
  const addCommentMutation = useAddComment(Number(tipId));
  const deleteCommentMutation = useDeleteComment(Number(tipId));
  const updateCommentMutation = useUpdateComment(Number(tipId));

  const [inputValue, setInputValue] = useState('');
  const [visibleComments, setVisibleComments] = useState(COMMENTS_PER_LOAD);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [editedComment, setEditedComment] = useState<{ [key: number]: string }>({});

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const handleAddComment = () => {
    if (inputValue.trim().length === 0) return;
    addCommentMutation.mutate(inputValue, {
      onSuccess: () => setInputValue(''),
    });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  const handleEditToggle = (commentId: number, commentText: string) => {
    setEditMode((prev) => ({ ...prev, [commentId]: true }));
    setEditedComment((prev) => ({ ...prev, [commentId]: commentText }));
  };

  const handleEditSubmit = (commentId: number) => {
    updateCommentMutation.mutate({ commentId, newComment: editedComment[commentId] });
    setEditMode((prev) => ({ ...prev, [commentId]: false }));
  };

  const loadMoreData = useCallback(() => {
    setVisibleComments((prev) => prev + COMMENTS_PER_LOAD);
  }, []);

  useEffect(() => {
    if (!comments || comments.length <= visibleComments) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 1.0 }
    );

    if (lastElementRef.current) observerRef.current.observe(lastElementRef.current);

    return () => observerRef.current?.disconnect();
  }, [comments, visibleComments, loadMoreData]);

  if (error) return <Typography variant="bodySmall">댓글을 불러오는 데 실패했습니다.</Typography>;

  return (
    <CommentContainer>
      <CommentAdd>
        <Typography variant="headingXxxSmall">댓글 ({comments?.length || 0})</Typography>
        <StyledInput
          type="text"
          placeholder="댓글을 작성해주세요. (최대 300자)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
        />
      </CommentAdd>
      <CommentList>
        {isLoading
          ? Array.from({ length: COMMENTS_PER_LOAD }).map((_, index) => <SkeletonComment key={index} />)
          : comments.slice(0, visibleComments).map((cmt: Comment) => (
              <CommentCard key={cmt.comment_id}>
                <CommentHeader>
                  <ProfileImg src={cmt.user.profileImageUrl || ProfileDefault} />
                  <CommentInfo>
                    <Typography variant="titleXxSmall">{cmt.user.nickname}</Typography>
                    <Typography variant="bodyXSmall" style={{ color: theme.colors.text.gray }}>
                      {new Date(cmt.created_at).toLocaleDateString()}{' '}
                      {new Date(cmt.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </CommentInfo>
                  {user?.user_id === cmt.user.user_id && (
                    <EditDelete>
                      <EditText onClick={() => handleEditToggle(cmt.comment_id, cmt.comment)}>수정</EditText>
                      <DeleteText onClick={() => handleDeleteComment(cmt.comment_id)}>삭제</DeleteText>
                    </EditDelete>
                  )}
                </CommentHeader>
                {editMode[cmt.comment_id] ? (
                  <StyledEditInput
                    type="text"
                    value={editedComment[cmt.comment_id]}
                    onChange={(e) => setEditedComment({ ...editedComment, [cmt.comment_id]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit(cmt.comment_id)}
                  />
                ) : (
                  <Typography variant="bodySmall" style={{ paddingTop: 32 }}>
                    {cmt.comment}
                  </Typography>
                )}
              </CommentCard>
            ))}
        {comments?.length > visibleComments && <div ref={lastElementRef} style={{ height: '10px' }} />}
      </CommentList>
    </CommentContainer>
  );
};

export default CommentView;

const CommentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 60px;
`;

const CommentAdd = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StyledInput = styled.input`
  padding: 26px 32px;
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
  border-radius: 20px;
  font-size: 14px;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const CommentCard = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditDelete = styled.div`
  display: flex;
  gap: 5px;
  margin-left: auto;
`;

const EditText = styled.span`
  cursor: pointer;
  font-size: 12px;
`;

const DeleteText = styled.span`
  cursor: pointer;
  font-size: 12px;
`;

const StyledEditInput = styled.input`
  margin-top: 16px;
  padding: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
  border-radius: 5px;
  background: #f7f7f7;
`;
