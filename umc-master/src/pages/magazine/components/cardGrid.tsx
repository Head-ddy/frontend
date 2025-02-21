import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CardInfo from '@components/Card/CardInfo';

export interface PolicyData {
  id: number;
  title: string;
  imageUrl: string;
  likeCount: number;
  bookmarkCount: number;
  createAt: string;
}

export interface CardGridData {
  id: string;
  image: string;
  text: string;
  likes: number;
  bookmarks: number;
  date: string;
}

interface CardGridProps {
  cards: PolicyData[] | undefined;
}

interface ProcessedCardData extends CardGridData {
  columnSpan: number;
}

const transformPolicies = (policies: PolicyData[] | undefined): CardGridData[] => {
  if (!policies) return [];
  return policies.map((policy) => ({
    id: policy.id.toString(),
    image: policy.imageUrl || 'https://i.pinimg.com/736x/af/a0/76/afa07695334ef42a7864f09a0099a679.jpg', // 이미지 없을 경우 기본값
    text: policy.title,
    likes: policy.likeCount ?? 0, // undefined 방지
    bookmarks: policy.bookmarkCount ?? 0, // undefined 방지
    date: new Date(policy.createAt).toLocaleDateString('ko-KR'),
  }));
};

const generatePattern = (): number[] => {
  const patterns = [
    [2, 1], // 큰 카드 - 작은 카드
    [1, 2], // 작은 카드 - 큰 카드
    [1, 1, 1], // 작은 카드 3개
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
};

const applyPatternToCards = (cards: CardGridData[]): ProcessedCardData[] => {
  const updatedCards: ProcessedCardData[] = [];
  let index = 0;
  for (let i = 0; i < 3; i++) {
    const pattern = generatePattern();
    pattern.forEach((colSpan) => {
      if (index < cards.length) {
        updatedCards.push({ ...cards[index], columnSpan: colSpan });
        index++;
      }
    });
  }
  return updatedCards;
};

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  const navigate = useNavigate();

  const transformedCards = transformPolicies(cards);
  const updatedCards = applyPatternToCards(transformedCards);

  const handleClick = (id: string) => {
    navigate(`/magazine/${id}`);
  };

  return (
    <Container>
      <GridContainer>
        {updatedCards.map((card) => (
          <GridItem key={card.id} columnSpan={card.columnSpan} onClick={() => handleClick(card.id)}>
            <Image src={card.image} alt={card.text} />
            <CardInfo text={card.text} likes={card.likes} bookmarks={card.bookmarks} date={card.date} />
          </GridItem>
        ))}
      </GridContainer>
    </Container>
  );
};

export default CardGrid;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: start;
`;

const GridItem = styled.div<{ columnSpan: number }>`
  overflow: hidden;
  padding: 8px 4px;
  grid-column: span ${({ columnSpan }) => columnSpan};
  border-radius: 8px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
`;
