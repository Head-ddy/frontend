/* eslint-disable react/prop-types */
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.css';
import Typography from '@components/common/typography';
import Tag from '@components/Tag/Tag';
import { useEffect, useState } from 'react';
import CategoryInputSection from './CategoriesInputSection';
import { useUserStore } from '@store/userStore';
import dummyCategories from '@assets/dummy/dummyCategories';

interface InterestsAndCategoriesProps {
  userHashtags?: string[];
}

const InterestsAndCategories: React.FC<InterestsAndCategoriesProps> = ({ userHashtags }) => {
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(userHashtags || []); // 초기값으로 userHashtags 설정
  const { user, updateProfile, fetchUser } = useUserStore();

  useEffect(() => {
    if (userHashtags) {
      setSelectedTags(userHashtags);
    }
  }, [userHashtags]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else if (prev.length < 10) {
        return [...prev, tag];
      } else {
        alert('최대 10개까지만 선택할 수 있습니다.');
        return prev;
      }
    });
  };

  const handleComplete = async () => {
    try {
      await updateProfile({
        nickname: user?.nickname,
        city: user?.city || '',
        district: user?.district || '',
        hashtags: selectedTags,
      });

      await fetchUser();

      alert('관심사 재설정이 완료되었습니다.');

      setIsCategoryVisible(false);
    } catch (error) {
      alert('관심사 업데이트에 실패했습니다.');
      console.error(error);
    }
  };

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  return (
    <Container>
      <TopRightIcon onClick={toggleCategoryVisibility}>
        <i className={`fas fa-chevron-${isCategoryVisible ? 'up' : 'down'}`}></i>
      </TopRightIcon>
      <Section>
        <StyledTypographyWrapper>
          <Typography style={{ marginRight: '4px' }} variant="headingXxxSmall">
            {user?.nickname}
          </Typography>
          <Typography variant="titleXSmall"> 님의 관심사</Typography>
        </StyledTypographyWrapper>
        <TagsWrapper>
          {selectedTags.map((tag, index) => (
            <Tag key={index} text={tag} selected={true} />
          ))}
        </TagsWrapper>
      </Section>

      {isCategoryVisible && <Divider />}

      {isCategoryVisible && (
        <CategoryInputSection
          categories={dummyCategories}
          onComplete={handleComplete}
          onTagClick={handleTagClick}
          selectedTags={selectedTags}
          isComplete={true}
          tagAndTitleGap={20}
        />
      )}
    </Container>
  );
};

export default InterestsAndCategories;

const Container = styled.div`
  position: relative;
  max-width: 1280px;
  width: 100%;
  padding: 29px 80px;
  border: 2px solid rgba(13, 99, 100, 1);
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.text['white']};
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const TopRightIcon = styled.div`
  position: absolute;
  top: 44px;
  right: 70px;
  font-size: 24px;
  color: grey;
  cursor: pointer;
  i {
    font-size: 36px;
  }
`;
const Section = styled.div``;

const StyledTypographyWrapper = styled.div`
  margin-bottom: 32px;
  display: flex;
  color: ${({ theme }) => theme.colors.primary[900]};
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.primary[700]};
  margin: 20px 0;
`;
