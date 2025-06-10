import Card from '@components/Card/Card';
import Typography from '@components/common/typography';
import styled, { useTheme } from 'styled-components';
import { useCallback, useEffect, useRef } from 'react';
import SkeletonCard from '@components/Skeleton/SkeletonCard';
import { useNavigate } from 'react-router-dom';
import { recentStore } from '@store/recentStore';
import { useSaveTipList } from '@apis/queries/useSaveTipQueries';

const PAGE_SIZE = 5;
const placeholderImg = 'https://via.placeholder.com/150';

const SaveTipPage: React.FC = () => {
  const theme = useTheme();
  const { addRecentTip } = recentStore();
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useSaveTipList();

  const loadMoreData = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!hasNextPage) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreData();
      }
    });

    if (lastElementRef.current) observerRef.current.observe(lastElementRef.current);

    return () => observerRef.current?.disconnect();
  }, [hasNextPage, loadMoreData]);

  const handleCardClick = (tipId: number) => {
    console.log('🖱️ 클릭한 tipId:', tipId);
    const clickedTip = data?.pages.flatMap((page) => page).find((item) => item.tipId === tipId);
    console.log('🔍 찾은 팁 데이터:', clickedTip);

    if (clickedTip) {
      addRecentTip(clickedTip);
    }
    navigate(`/save-tip/${tipId}`);
  };

  if (isLoading) {
    return;
  }

  return (
    <Container>
      <SavedTips>
        <Typography variant="headingXxSmall" style={{ color: theme.colors.primary[900] }}>
          저장한 꿀팁
        </Typography>
        {data?.pages.length === 0 && !isFetchingNextPage ? (
          <Typography variant="bodySmall">최근 본 꿀팁이 없습니다.</Typography>
        ) : (
          <TipCardList>
            {data?.pages
              .flatMap((page) => page)
              .filter(Boolean)
              .map((item) => {
                console.log('🔍 개별 아이템 확인:', item);
                return (
                  <Card
                    key={item.tipId}
                    image={
                      Array.isArray(item.imageUrls) && item.imageUrls.length > 0
                        ? item.imageUrls[0]?.media_url
                        : placeholderImg
                    }
                    text={item.title}
                    likes={item.likeCount ?? 0}
                    bookmarks={item.saveCount ?? 0}
                    date={item.createdAt.slice(0, 10)}
                    onClick={() => handleCardClick(item.tipId)}
                  />
                );
              })}

            {/* 마지막 요소 감지용 div */}
            {hasNextPage && !isFetchingNextPage && <div ref={lastElementRef} style={{ height: '10px' }} />}

            {/* 스켈레톤 UI */}
            {isFetchingNextPage &&
              Array.from({ length: PAGE_SIZE }).map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)}
          </TipCardList>
        )}
      </SavedTips>
    </Container>
  );
};

export default SaveTipPage;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 100px;
  background: #fff;
`;

const SavedTips = styled.div`
  display: flex;
  width: 1280px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const TipCardList = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  flex-wrap: wrap;
  cursor: pointer;
`;
