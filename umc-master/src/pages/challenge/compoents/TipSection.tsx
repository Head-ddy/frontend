import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ChallengeHeader from './ChallengeHeader';
import NumberCard from '@components/Card/NumberCard';
import styled from 'styled-components';
import SkeletonCard from '@components/Skeleton/SkeletonCard';
import { useNavigate } from 'react-router-dom';
import { dummyImage, dummyText } from '@pages/mychallenge/dummydata';

interface Tip {
  id: number;
  image: string;
  text: string;
  likes: number;
  bookmarks: number;
  date: string;
  userNumber: number;
}

const PAGE_SIZE = 10;

const generateDummyData = (count: number, startId: number, images: string[], texts: string[]): Tip[] => {
  return Array.from({ length: count }, (_, index) => {
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - randomDaysAgo);
    return {
      id: startId + index,
      image: images[Math.floor(Math.random() * images.length)], // 랜덤 이미지
      text: texts[Math.floor(Math.random() * texts.length)], // 랜덤 텍스트
      likes: Math.floor(Math.random() * 5000),
      bookmarks: Math.floor(Math.random() * 5000),
      date: date.toISOString().slice(0, 10),
      userNumber: Math.floor(Math.random() * 1000),
    };
  });
};

const TipSection = () => {
  const [sortBy, setSortBy] = useState<'users' | 'latest'>('users');
  const [selectedCategory, setSelectedCategory] = useState('cleaning');
  const [allData, setAllData] = useState<Tip[]>([]);
  const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // 초기 로딩도 비동기처럼 보여주기 위해 setTimeout 사용
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const dummyData = generateDummyData(100, 1, dummyImage, dummyText);
      setAllData(dummyData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const sortedAllData = useMemo(() => {
    return [...allData].sort((a, b) => {
      if (sortBy === 'users') {
        return b.userNumber - a.userNumber;
      }
      if (sortBy === 'latest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  }, [allData, sortBy]);

  const displayedCards = useMemo(() => {
    return sortedAllData.slice(0, loadedCount);
  }, [sortedAllData, loadedCount]);

  const hasMore = loadedCount < sortedAllData.length;

  const loadMoreData = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    // 추가 로딩도 1초 지연
    setTimeout(() => {
      setLoadedCount((prev) => prev + PAGE_SIZE);
      setIsLoading(false);
    }, 1000);
  }, [isLoading, hasMore]);

  // IntersectionObserver: 마지막 요소 보이면 loadMoreData 호출
  useEffect(() => {
    if (isLoading || !hasMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreData();
      }
    });
    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [isLoading, hasMore, loadMoreData]);

  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/challenge/${id}`); // 상세 페이지로 이동
  };

  return (
    <Container>
      <ChallengeHeader
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {isLoading && displayedCards.length === 0 ? (
        <SkeletonGrid>
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <SkeletonCard key={`initial${index}`} />
          ))}
        </SkeletonGrid>
      ) : (
        <NumberCard cards={displayedCards} showNumber={sortBy !== 'latest'} onCardClick={handleCardClick} />
      )}

      {hasMore && !isLoading && <div ref={lastElementRef} style={{ height: '10px' }} />}

      {isLoading && displayedCards.length > 0 && (
        <SkeletonGrid style={{ marginTop: '20px' }}>
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <SkeletonCard key={`more${index}`} />
          ))}
        </SkeletonGrid>
      )}
    </Container>
  );
};

export default TipSection;

const Container = styled.div`
  margin-bottom: 80px;
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  max-width: 1280px;
  margin: 0 auto;
`;
