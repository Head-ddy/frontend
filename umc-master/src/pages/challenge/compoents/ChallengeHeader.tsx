import Typography from '@components/common/typography';
import React from 'react';
import styled from 'styled-components';

interface ChallengeHeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'users' | 'latest';
  onSortChange: (sortType: 'users' | 'latest') => void;
}

const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) => {
  const categories = [
    { id: 'cleaning', label: '청소' },
    { id: 'season', label: '계절' },
    { id: 'fashion', label: '패션' },
    { id: 'cooking', label: '요리/사계절' },
    { id: 'games', label: '게임형/분리하기' },
    { id: 'etc', label: '후기' },
  ];

  return (
    <CategoriesConatiner>
      <CategoryList>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            $active={selectedCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
          >
            <Typography variant="bodySmall">{category.label}</Typography>
          </CategoryButton>
        ))}
      </CategoryList>
      <SortButtons>
        <SortButton $active={sortBy === 'users'} onClick={() => onSortChange('users')}>
          인기순
        </SortButton>
        <SortButton $active={sortBy === 'latest'} onClick={() => onSortChange('latest')}>
          최신순
        </SortButton>
      </SortButtons>
    </CategoriesConatiner>
  );
};

export default ChallengeHeader;

const CategoriesConatiner = styled.div`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1280px;
  margin: 0 auto;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  justify-content: center;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: 10px 24px;
  border-radius: 30px;
  border: none;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.primary[500] : theme.colors.text['lightGray'])};
  color: ${({ theme }) => theme.colors.text['white']};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const SortButtons = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-bottom: 16px;
  margin-left: auto;
`;

const SortButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  color: ${({ $active, theme }) => ($active ? theme.colors.text['white'] : theme.colors.text['gray'])};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.primary[600] : theme.colors.text['white'])};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  border: ${({ $active }) => ($active ? 'none' : '1px solid #ccc')};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[500]};
    color: ${({ theme }) => theme.colors.text['white']};
  }
`;
