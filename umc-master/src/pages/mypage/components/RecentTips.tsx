import styled, { useTheme } from 'styled-components';
import Card from '@components/Card/Card';
import Typography from '@components/common/typography';
import { useNavigate } from 'react-router-dom';
import { recentStore } from '@store/recentStore';
import { useEffect } from 'react';
import dummyImage from '@assets/dummyImage/dummy.jpeg';

const RecentTips: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  // zustand 상태에서 최근 팁 가져오기
  const { recentTips } = recentStore();

  const handleCardClick = (id: string) => {
    navigate(`/save-tip/${id}`); // 상세 페이지로 이동
  };

  useEffect(() => {
    // 처음 렌더링 시에 최근 본 팁이 로컬스토리지에 있으면 복원됩니다.
  }, []);

  return (
    <RecentGoodTip>
      <Typography variant="titleXxSmall" style={{ color: theme.colors.primary[800] }}>
        최근에 본 꿀팁
      </Typography>
      {recentTips.length === 0 ? (
        <Typography variant="bodySmall">최근 본 꿀팁이 없습니다.</Typography>
      ) : (
        <TipCardList>
          {recentTips.map((item) => (
            <Card
              key={item.tipId}
              image={item.imageUrls?.[0]?.media_url || dummyImage}
              text={item.title}
              likes={item.likesCount || 0}
              bookmarks={item.savesCount || 0}
              date={item.createdAt?.slice(0, 10) || ''}
              onClick={() => handleCardClick(String(item.tipId))}
            />
          ))}
        </TipCardList>
      )}
    </RecentGoodTip>
  );
};

export default RecentTips;

const RecentGoodTip = styled.div`
  display: flex;
  width: 780px;
  height: 295px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
`;

const TipCardList = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  align-self: stretch;
`;
