import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Section from './Section';
import Typography from '@components/common/typography';
import Tag from '@components/Tag/Tag';
import InterestEditModal from '../modal/InterestEditModal';
import { useUserStore } from '@store/userStore';
import dummyCategories from '@assets/dummy/dummyCategories';

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
          categories={dummyCategories}
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
