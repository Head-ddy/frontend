import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import NumberCard from '@components/Card/NumberCard';
import SkeletonCard from '@components/Skeleton/SkeletonCard';
import { useNavigate } from 'react-router-dom';
import { dummyImage, dummyText } from '../dummydata';

interface Tip {
  id: number;
  image: string;
  text: string;
  likes: number;
  bookmarks: number;
  date: string;
  userNumber: number; // 더 이상 표시하지 않음
}

// 더미 데이터 생성 함수 (필요에 따라 유지)
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
  const [sortBy] = useState<'users' | 'latest'>('users');
  const [allData, setAllData] = useState<Tip[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 컴포넌트 마운트 시 더미 데이터 100개 생성
  useEffect(() => {
    setIsLoading(true);

    // 1초 뒤에 더미 데이터를 설정
    const timer = setTimeout(() => {
      const dummyData = generateDummyData(100, 1, dummyImage, dummyText);
      setAllData(dummyData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 정렬 로직 (유저 수 기준 / 최신 기준)
  const sortedAllData = useMemo(() => {
    return [...allData].sort((a, b) => {
      if (sortBy === 'users') {
        return b.userNumber - a.userNumber;
      } else if (sortBy === 'latest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  }, [allData, sortBy]);

  const displayedCards = useMemo(() => {
    return sortedAllData.slice(0, 10);
  }, [sortedAllData]);

  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/challenge/${id}`); // 상세 페이지로 이동
  };

  return (
    <Container>
      {isLoading ? (
        <SkeletonGrid>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}
        </SkeletonGrid>
      ) : (
        <NumberCard cards={displayedCards} showNumber={false} onCardClick={handleCardClick} />
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
  margin: 20px auto 0;
`;
