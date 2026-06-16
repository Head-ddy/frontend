import React from 'react';
import styled from 'styled-components';
import Typography from '@components/common/typography';

interface TagProps {
  selected?: boolean;
  text: string;
  backgroundColor?: string;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({ selected, text, backgroundColor, onClick }) => {
  return (
    <TagContainer selected={selected} $backgroundColor={backgroundColor} onClick={onClick}>
      <Typography variant="bodySmall">#{text}</Typography>
    </TagContainer>
  );
};

export default Tag;

const TagContainer = styled.div<{ selected?: boolean; $backgroundColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  border-radius: 30px;
  height: 48px;
  background-color: ${({ selected, $backgroundColor, theme }) =>
    $backgroundColor || (selected ? theme.colors.primary[500] : theme.colors.text.lightGray)};
  color: ${({ $backgroundColor, theme }) =>
    $backgroundColor === "white" ? theme.colors.text.black : theme.colors.text.white};
  border: ${({ $backgroundColor, theme }) =>
    $backgroundColor === "white" ? `2px solid ${theme.colors.primary[500]}` : "none"};
  cursor: pointer;
`;
