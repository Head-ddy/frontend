import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Section from './Section';
import Typography from '@components/common/typography';
import Tag from '@components/Tag/Tag';
import InterestEditModal from '../modal/InterestEditModal';
import { useUserStore } from '@store/userStore';

const interestCategories = [
  { section: '계절', tags: ['봄', '여름', '가을', '겨울'] },
  { section: '패션', tags: ['패션', '맨투맨', '니트', '바지', '치마', '블라우스', '자켓'] },
  { section: '청소', tags: ['청소', '방', '정리', '인테리어', '가구', '청소도구'] },
  {
    section: '요리 / 식재료',
    tags: ['요리', '음식', '보관', '냉장', '냉동', '면', '밥', '술', '반찬', '레시피', '냉장고'],
  },
  { section: '재활용 / 분리수거', tags: ['재활용', '분리수거', '리폼', '플라스틱', '스티로폼', '종이', '유리'] },
  { section: '주거', tags: ['주택', '원룸', '빌라', '아파트', '기숙사'] },
];

const BestInterest: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, updateProfile } = useUserStore();
  const interests = user?.hashtags || [];
  const theme = useTheme();

  const handleSaveInterests = async (hashtags: string[]) => {
    await updateProfile({ hashtags });
    setIsModalOpen(false);
  };

  return (
    <BestInterestContainer>
      <Section_1>
        <Section
          title="Best 꿀팁 선정 횟수"
          content={
            <BestChoice>
              <Typography variant="headingXxxSmall" style={{ color: theme.colors.text.black }}>
                10
              </Typography>
              <Typography variant="headingXxxSmall" style={{ color: theme.colors.text.black }}>
                회
              </Typography>
            </BestChoice>
          }
        />
      </Section_1>
      <Section_2>
        <Section
          title="나의 관심사"
          content={
            <InterestTagList>
              {interests.length > 0 ? (
                interests.map((interest, index) => <Tag key={`${interest}-${index}`} text={interest} backgroundColor="white" />)
              ) : (
                <Typography variant="bodySmall">관심사를 선택해 맞춤 꿀팁을 받아보세요.</Typography>
              )}
            </InterestTagList>
          }
        />
        <InterestEdit onClick={() => setIsModalOpen(true)}>편집하기</InterestEdit>
        <InterestEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveInterests}
          categories={interestCategories}
          initialTags={interests}
        />
      </Section_2>
    </BestInterestContainer>
  );
};

export default BestInterest;

const BestInterestContainer = styled.div`
  display: flex;
  width: 630px;
  height: 372px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 28px;
`;

const Section_1 = styled.div`
  display: flex;
  height: 72px;
  align-self: stretch;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
`;

const Section_2 = styled.div`
  position: relative;
  display: flex;
  height: 201px;
  align-self: stretch;
  flex-direction: column;
  align-items: flex-start;
  gap: 65px;
`;

const BestChoice = styled.div`
  display: flex;
  align-items: center;
`;

const InterestTagList = styled.div`
  display: flex;
  width: 626px;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
`;

const InterestEdit = styled.button`
  position: absolute;
  top: 23px;
  right: 0px;

  display: flex;
  width: 120px;
  height: 36px;
  padding: 7px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: #fff;

  font-family: ${({ theme }) => theme.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.title.xxxsmall.size};
  font-weight: ${({ theme }) => theme.typography.title.xxxsmall.weight};
  line-height: ${({ theme }) => theme.typography.title.xxxsmall.lineHeight};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
  }
`;
