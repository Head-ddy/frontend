/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@components/common/typography';
import MindMap from './components/mindMap';
import CardGrid, { CardGridData } from './components/cardGrid';
import { usePolicies } from '@apis/queries/usePolicyQueries';

const IMAGES = [
  'https://i.pinimg.com/736x/06/e6/e5/06e6e5415db0dc7aa3aaba1b93f03b20.jpg',
  'https://i.pinimg.com/1200x/7c/6f/7c/7c6f7c596654678b7400ef2c07c086ad.jpg',
  'https://i.pinimg.com/1200x/ad/24/04/ad24045a4a3ae15c6d765b3b711f61c1.jpg',
  'https://i.pinimg.com/1200x/7d/78/fa/7d78faa3c633bf5fde231e1b446bc4fb.jpg',
  'https://i.pinimg.com/1200x/12/76/a2/1276a2dc2749275436a49fb3561770ba.jpg',
  'https://i.pinimg.com/1200x/d8/0d/a9/d80da9b244d7de383b319457de475e89.jpg',
  'https://i.pinimg.com/1200x/cf/93/b1/cf93b11fac04e6790fab2f83e60b70cf.jpg',
  'https://i.pinimg.com/1200x/60/39/77/60397711931a8bbbdcb2d25493556a27.jpg',
  'https://i.pinimg.com/736x/62/6f/e8/626fe850e3fd8c62c9ad4126571112bf.jpg',
] as const;

const TEXTS = [
  '세탁 꿀팁 모음',
  '욕실 청소 가이드',
  '냉장고 정리 꿀팁',
  '주방 유리창 청소법',
  '강아지 털 청소 방법',
  '빨래 냄새 없애는 법',
  '전자레인지 찌든때 제거',
  '청소 동선 최적화 팁',
  '원룸 미니멀 정리법',
] as const;

const generateDummyData = (): CardGridData[] => {
  const randomDaysAgo = Math.floor(Math.random() * 30);
  const date = new Date();
  date.setDate(date.getDate() - randomDaysAgo);
  return Array.from({ length: 9 }, (_, index) => ({
    id: String(index + 1),
    image: IMAGES[index % IMAGES.length],
    text: TEXTS[index % TEXTS.length],
    likes: Math.floor(Math.random() * 2000) + 1000,
    bookmarks: Math.floor(Math.random() * 2000) + 1000,
    date: date.toISOString().slice(0, 10),
  }));
};

const MagazinePage = () => {
  const { data: policiesData } = usePolicies({ locationId: 17 });
  const influencerData = generateDummyData();

  const influencerPolicies: PolicyData[] = influencerData.map((c) => ({
    id: Number(c.id),
    title: c.text,
    imageUrl: c.image,
    likeCount: c.likes,
    bookmarkCount: c.bookmarks,
    createAt: c.date,
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Title style={{ marginTop: 10 }}>
        <Typography variant="headingXxSmall">인기 관심사</Typography>
      </Title>
      <MindMap />
      <Title>
        <Typography variant="headingXxSmall">종로구 지원 프로그램</Typography>
      </Title>
      <CardGrid cards={policiesData || []} />
      <Title>
        <Typography variant="headingXxSmall">인플루언서 꿀팁</Typography>
      </Title>
      <CardGrid cards={influencerPolicies} />
      <div style={{ height: 100 }} />
    </Container>
  );
};

export default MagazinePage;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 80px;
  margin-bottom: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary[900]};
`;
