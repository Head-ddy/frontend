import styled, { useTheme } from 'styled-components';
import ProfileSection from './components/ProfileSection';
import RecentTips from './components/RecentTips';
import BestInterest from './components/BestInterest';
import Typography from '@components/common/typography';

const MyPage: React.FC = () => {
  const theme = useTheme();
  return (
    <Container>
      <MyPageForm>
        <Typography variant="headingXxSmall" style={{ color: theme.colors.primary[900] }}>
          마이페이지
        </Typography>
        <ProfileSection />
        <ProfileCard>
          <RecentTips />
          <BestInterest />
        </ProfileCard>
      </MyPageForm>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const MyPageForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1440px;
  gap: 48px;
  padding: 80px 0px 100px;

  @media (max-width: 1024px) {
    gap: 32px;
    padding: 60px 16px 80px;
  }

  @media (max-width: 768px) {
    gap: 24px;
    padding: 40px 12px 60px;
  }
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  flex-shrink: 0;
  width: 100%;

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;
