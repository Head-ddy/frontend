/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTipList } from '@apis/queries/useTipQueries';
import Card from '@components/Card/Card';
import SkeletonCard from '@components/Skeleton/SkeletonCard';
import Typography from '@components/common/typography';
import usePagination from '@hooks/usePagination';
import dummyImage from '@assets/dummyImage/dummy.jpeg';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchList } from '@apis/queries/useSearchList';
import BigCard from '@components/Card/BigCard';
import SkeletonBigCard from '@components/Skeleton/SkeletonBigCard';
import { recentStore } from '@store/recentStore';
interface TipsSectionProps {
  title?: string;
  showArrows?: boolean;
  showLikes?: boolean;
  showRecent?: boolean;
  defaultSort?: 'latest' | 'likes' | 'saves';
  isLoading?: boolean;
  items?: TipItem[];
  tags?: string[];
  timeFilter?: '7days' | 'today' | '24h' | 'none';
  isSearchSection?: boolean;
  isBigCard?: boolean;
  query?: string;
  isMoreLimit?: boolean;
}

interface Hashtag {
  hashtagId: number;
  name: string;
}

interface Image {
  media_url: string;
  media_type: string;
}
interface Author {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

interface TipItem {
  tipId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  hashtags: Hashtag[];
  imageUrls: Image[];
  likesCount: number;
  savesCount: number;
  author: Author;
}

type TimeFilter = '7days' | 'today' | '24h' | 'none';

function filterByTime(tips: TipItem[], timeFilter: TimeFilter) {
  if (timeFilter === 'none') return tips;

  const now = new Date();
  const filterDates: Record<TimeFilter, () => { start: Date; end?: Date }> = {
    '7days': () => ({
      start: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    }),
    '24h': () => ({
      start: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    }),
    today: () => ({
      start: new Date(now.setHours(0, 0, 0, 0)),
      end: new Date(now.setHours(23, 59, 59, 999)),
    }),
    none: () => ({ start: new Date(0) }),
  };

  const { start, end } = filterDates[timeFilter]();

  return tips.filter((tip) => {
    const created = new Date(tip.createdAt);
    return end ? created >= start && created <= end : created >= start;
  });
}

const TipsSection: React.FC<TipsSectionProps> = ({
  title,
  showArrows = false,
  showLikes = true,
  showRecent = false,
  items,
  defaultSort = 'latest',
  timeFilter = 'none',
  tags,
  isSearchSection = false,
  isBigCard = false,
  query,
  isMoreLimit = false,
}) => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<'likes' | 'latest' | 'saves'>(defaultSort);
  const { page, handlePrevPage, handleNextPage } = usePagination(1);
  const [direction, setDirection] = useState<number>(0);

  const {
    data: searchData,
    isFetching: isSearchFetching,
    isError: isSearchError,
  } = isSearchSection && !items
    ? useSearchList({
        query,
        tags,
        page,
        limit: isMoreLimit ? 10 : 5,
        sort: sortOption,
      })
    : { data: undefined, isFetching: false, isError: false };

  const {
    data: tipsData,
    isFetching: isTipsFetching,
    isError: isTipsError,
  } = !isSearchSection
    ? useTipList({ title: title || '', page, sortOption })
    : { data: undefined, isFetching: false, isError: false };

  // 만약 외부 데이터가 없으면 내부 데이터 사용
  const tips: TipItem[] = items || (isSearchSection ? searchData?.result : tipsData?.result?.tips) || [];
  const isFetching = isSearchFetching || isTipsFetching;
  const isError = isSearchError || isTipsError;

  const filteredTips = filterByTime(tips, timeFilter);

  const sortedItems =
    filteredTips.length > 0
      ? [...filteredTips].sort((a, b) => {
          if (sortOption === 'likes') return (b.likesCount || 0) - (a.likesCount || 0);
          if (sortOption === 'latest')
            return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
          if (sortOption === 'saves') return (b.savesCount || 0) - (a.savesCount || 0);
          return 0;
        })
      : [];

  if (isError) return <div>Something went wrong...</div>; // 에러 발생 시 표시

  const { addRecentTip } = recentStore(); // Zustand 상태 가져오기

  const handleCardClick = (tip: TipItem) => {
    addRecentTip(tip); // 최근 본 팁으로 저장
    navigate(`/save-tip/${tip.tipId}`); // 상세 페이지로 이동
  };

  const handleSlide = (direction: number) => {
    setDirection(direction);
    if (direction === -1) handlePrevPage();
    if (direction === 1) handleNextPage(100);
  };

  /** Card or BigCard 분기 */
  const CardComponent = isBigCard ? BigCard : Card;
  const SkeletonComponent = isBigCard ? SkeletonBigCard : SkeletonCard;

  /** 열 개수 분기 */
  const columns = isBigCard ? 4 : 5;
  /** 스켈레톤/카드 표시 개수 분기 */
  const itemCount = isBigCard ? 8 : 5;

  return (
    <SectionContainer>
      <SectionHeader>
        <Typography variant="headingXxSmall">{title}</Typography>
      </SectionHeader>
      <SortAndCardWrapper>
        <SortButtonGroup $hasButtons={showLikes}>
          {showLikes && (
            <>
              {showRecent && (
                <SortButton $active={sortOption === 'latest'} onClick={() => setSortOption('latest')}>
                  <Typography variant="bodyXSmall">최신순</Typography>
                </SortButton>
              )}
              <SortButton $active={sortOption === 'likes'} onClick={() => setSortOption('likes')}>
                <Typography variant="bodyXSmall">좋아요순</Typography>
              </SortButton>
              <SortButton $active={sortOption === 'saves'} onClick={() => setSortOption('saves')}>
                <Typography variant="bodyXSmall">저장많은순</Typography>
              </SortButton>
            </>
          )}
        </SortButtonGroup>
        <CardsOuterWrapper>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <CardsWrapper
              key={page}
              columns={columns}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              {isFetching
                ? Array.from({ length: itemCount }).map((_, index) => <SkeletonComponent key={index} />)
                : sortedItems
                    .slice(0, itemCount)
                    .map((item: TipItem, index: number) => (
                      <CardComponent
                        key={index}
                        image={item?.imageUrls[0]?.media_url || dummyImage}
                        text={item.title}
                        likes={item.likesCount || 0}
                        bookmarks={item.savesCount || 0}
                        date={item.createdAt?.slice(0, 10) || ''}
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
            </CardsWrapper>
          </AnimatePresence>
        </CardsOuterWrapper>

        {showArrows && (
          <>
            <LeftArrow onClick={() => handleSlide(-1)}>{'<'}</LeftArrow>
            <RightArrow onClick={() => handleSlide(1)}>{'>'}</RightArrow>
          </>
        )}
      </SortAndCardWrapper>
    </SectionContainer>
  );
};

export default TipsSection;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const SortAndCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  max-width: 1280px;
  margin: 0 auto;
`;

const SectionContainer = styled.div`
  max-width: 1424px;
  margin: 0 auto;
  margin-bottom: 150px;
  display: flex;
  flex-direction: column;
`;

const SortButtonGroup = styled.div<{ $hasButtons: boolean }>`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  margin-left: auto;
  height: ${({ $hasButtons }) => ($hasButtons ? 'auto' : '40px')}; /* 버튼이 없을 때 고정된 높이 */
`;

const SortButton = styled.button<{ $active: boolean }>`
  padding: 7px 16px;
  color: ${({ $active, theme }) => ($active ? theme.colors.text['white'] : theme.colors.text['gray'])};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.primary[600] : theme.colors.text['white'])};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  border: ${({ $active }) => ($active ? 'none' : '1px solid #ccc')};
  &:hover {
    background-color: ${({ $active, theme }) => ($active ? theme.colors.primary[600] : theme.colors.text['white'])};
  }
  margin: 0 auto; /* 가운데 정렬 */
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.primary[900]};
`;

const CardsOuterWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  /* 필요에 따라 고정 높이 또는 min-height를 지정 */
  min-height: 300px;
`;

const CardsWrapper = styled(motion.div)<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.columns}, minmax(240px, 1fr));
  gap: 20px;
  position: relative;
  max-width: 1280px; /* 원하는 최대 너비 설정 */
  margin: 0 auto; /* 가운데 정렬 */
  z-index: 0;
`;

const LeftArrow = styled.span`
  font-size: 40px;
  font-weight: bold;
  color: #121212;
  position: absolute;
  top: 50%;
  left: -62px;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
`;

const RightArrow = styled.span`
  font-size: 40px;
  font-weight: bold;
  color: #121212;
  position: absolute;
  top: 50%;
  right: -62px;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
`;
