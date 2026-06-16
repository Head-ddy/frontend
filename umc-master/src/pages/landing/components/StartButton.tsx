import React from 'react';
import { CSSProperties, styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '@router/routePaths';
import Typography from '@components/common/typography';

const StartButton: React.FC<{ style?: CSSProperties }> = ({ style }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate(RoutePaths.MAIN);
  };

  return (
    <Button onClick={handleStartClick} style={style}>
      <Typography variant="titleXSmall">지금 시작하기</Typography>
    </Button>
  );
};

export default StartButton;

const Button = styled.button`
  padding: 18px 42px;
  background-color: ${({ theme }) => theme.colors.text.white};
  border-radius: 50px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
