import Typography from '@components/common/typography';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const onClickCreateBTN = () => {
    navigate(`/create-post`);
  };
  return (
    <Container>
      <Typography variant="headingSmall">진짜 유저들의 생생한 꿀팁</Typography>
      <Typography variant="titleSmall">당신의 꿀팁을 작성해 다른 사람들과 공유하세요!</Typography>
      <TipCreateBTN onClick={onClickCreateBTN}>
        <Typography variant="bodyMedium">나만의 꿀팁 공유하기</Typography>
      </TipCreateBTN>
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 320px;
  background: linear-gradient(${({ theme }) => theme.colors.primary[600]}, ${({ theme }) => theme.colors.primary[900]});
  color: ${({ theme }) => theme.colors.text['white']};
  margin-bottom: 100px;
`;

const TipCreateBTN = styled.button`
  height: 48px;
  padding: 8px 39px;
  background-color: ${({ theme }) => theme.colors.text['white']};
  border-radius: 50px;
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.text['black']};
  cursor: pointer;
`;
