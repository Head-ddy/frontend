/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@components/common/typography';
import Tag from '@components/Tag/Tag';
import { usePolicyGuide } from '@apis/queries/usePolicyQueries';
import ImageModal from '@components/Modal/image';

const MagazineDetailPage: React.FC = () => {
  const { magazineId } = useParams<{ magazineId: string }>();
  const { data, isLoading } = usePolicyGuide({ policyId: Number(magazineId) });
  console.log('매거진', data);

  const formattedDescription = data?.description
    .replace(/ {5,}/g, '\n\n') // 공백 5칸 이상 -> \n\n
    .replace(/ {3,4}/g, '\n'); // 공백 3~4칸 -> \n

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return;
  }

  return (
    <Container>
      <Image
        src={data?.image_url_list || '/placeholder.svg'}
        alt={data?.title}
        onClick={() => data?.image_url_list && handleImageClick(data?.image_url_list)}
      />
      <Title>
        <Typography variant="titleMedium">{data?.title}</Typography>
      </Title>
      <AuthorContainer>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <ProfileImage
            src={data?.organization.image || '/default-profile.png'}
            alt={data?.organization.name}
            $hasImage={!!data?.organization.image}
          />
          <Author>
            <Typography variant="titleXxSmall">{data?.organization.name}</Typography>
          </Author>
        </div>
        <Date>
          <Typography variant="bodySmall">{data?.updated_at.slice(0, 10)}</Typography>
        </Date>
      </AuthorContainer>
      <Tags>{data?.hashtag?.map((tag) => <Tag key={tag.id} text={tag.name} selected />) ?? []}</Tags>
      <Description>
        <Typography variant="bodySmall">{formattedDescription}</Typography>
      </Description>
      <Line />
      <Button href={data?.policy_url} target="_blank" rel="noopener noreferrer">
        <Typography variant="titleXSmall">해당 페이지로 이동하기</Typography>
      </Button>
      {isModalOpen && selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setIsModalOpen(false)} />}
    </Container>
  );
};

export default MagazineDetailPage;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 32px;
  cursor: pointer;
`;

const Title = styled.div`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary[900]};
  word-break: keep-all;
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;
`;

const ProfileImage = styled.img<{ $hasImage: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ $hasImage, theme }) => ($hasImage ? theme.colors.text.white : theme.colors.text.lightGray)};
  box-shadow: ${({ $hasImage }) => ($hasImage ? '0px 4px 10px rgba(0, 0, 0, 0.15)' : 'none')};
`;

const Author = styled.div`
  color: ${({ theme }) => theme.colors.text.black};
`;

const Date = styled.div`
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.text.black};
`;

const Tags = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const Description = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  margin: 60px 0;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.primary[800]};
`;

const Button = styled.a`
  display: block;
  width: 100%;
  margin-bottom: 100px;
  padding: 24px;
  border: none;
  border-radius: 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
  }
`;
