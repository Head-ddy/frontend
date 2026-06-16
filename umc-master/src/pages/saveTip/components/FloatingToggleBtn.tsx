/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import theme from '@styles/theme';
import Typography from '@components/common/typography';
import Likes from '@assets/savetipdetail/Likes.svg';
import Liked from '@assets/savetipdetail/liked.svg';
import Saves from '@assets/savetipdetail/saves.svg';
import Saved from '@assets/savetipdetail/saved.svg';
import Link from '@assets/savetipdetail/link.svg';
import { useToggleLike, useToggleBookmark } from '@apis/queries/useTipDetailMutations';

interface FloatingToggleBtnProps {
  tipId: number;
  initialLikes: number;
  initialSaves: number;
  userLiked: boolean;
  userSaved: boolean;
}

const FloatingToggleBtn: React.FC<FloatingToggleBtnProps> = ({
  tipId,
  initialLikes,
  initialSaves,
  userLiked,
  userSaved,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(userLiked);
  const [saves, setSaves] = useState(initialSaves);
  const [saved, setSaved] = useState(userSaved);

  const { mutate: toggleLike } = useToggleLike(tipId);
  const { mutate: toggleBookmark } = useToggleBookmark(tipId);

  const handleLikeClick = () => {
    toggleLike();
    setLikes((prevLikes) => prevLikes + (liked ? -1 : 1));
    setLiked(!liked);
  };

  const handleSaveClick = () => {
    toggleBookmark();
    setSaves((prevSaves) => prevSaves + (saved ? -1 : 1));
    setSaved(!saved);
  };

  const shareUrl = window.location.href;

  const sharePrototypeLink = async () => {
    const shareData = {
      title: '오늘의 꿀팁',
      text: '오늘의 꿀팁을 보러 갈까요?',
      url: shareUrl,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard?.writeText(shareUrl);
    alert('프로토타입 링크가 복사되었습니다.');
  };

  return (
    <BtnContainer>
      <InteractionBtn onClick={handleLikeClick}>
        <BtnImg src={liked ? Liked : Likes} alt="좋아요" />
        <Typography variant="bodyXSmall" style={{ color: theme.colors.text.lightGray }}>
          {likes}
        </Typography>
      </InteractionBtn>
      <InteractionBtn onClick={handleSaveClick}>
        <BtnImg src={saved ? Saved : Saves} alt="저장하기" />
        <Typography variant="bodyXSmall" style={{ color: theme.colors.text.lightGray }}>
          {saves}
        </Typography>
      </InteractionBtn>
      <InteractionBtn onClick={sharePrototypeLink}>
        <BtnImg src={Link} alt="공유하기" />
        <Typography variant="bodyXSmall" style={{ color: theme.colors.text.lightGray }}>
          공유하기
        </Typography>
      </InteractionBtn>
    </BtnContainer>
  );
};

export default FloatingToggleBtn;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 2%;
  bottom: 5%;
  gap: 26px;
`;

const InteractionBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`;

const BtnImg = styled.img`
  object-fit: cover;
  cursor: pointer;
`;
