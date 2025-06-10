/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import styled from 'styled-components';
import theme from '@styles/theme';
import Typography from '@components/common/typography';
import Tag from '@components/Tag/Tag';
import ProfileDefault from '@assets/gray-character.png';
interface Media {
  mediaUrl: string;
  mediaType: string;
}

interface User {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface TipItem {
  tipId: number;
  title: string;
  content: string;
  createdAt: string;
  media: Media[];
  hashtags: [];
  user: User;
  likesCount: number;
  savesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface PostDetailProps {
  detail: TipItem;
}

const PostDetail: React.FC<PostDetailProps> = ({ detail }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!detail) {
    return <PostView>해당 포스트를 찾을 수 없습니다.</PostView>;
  }

  return (
    <PostView>
      {detail.media.length > 0 && (
        <ImageGrid count={detail.media.length}>
          {detail.media.map((item, index) => (
            <ImageItem
              key={index}
              index={index}
              count={detail.media.length}
              src={item.mediaUrl}
              alt={`이미지 ${index + 1}`}
            />
          ))}
        </ImageGrid>
      )}
      <Typography variant="headingXxSmall" style={{ color: theme.colors.primary[900] }}>
        {detail.title}
      </Typography>
      <PostInfo>
        <InfoDetail>
          <Author>
            <ProfileImg src={detail.user.profileImageUrl || ProfileDefault} alt="프로필 이미지" />
            <AuthorInfo>
              <Typography variant="titleXxSmall" style={{ color: theme.colors.text.black }}>
                {detail.user.nickname}
              </Typography>
              <Bestnum>
                <Typography variant="bodySmall" style={{ color: theme.colors.text.lightGray }}>
                  BEST 꿀팁 선정 횟수
                </Typography>
                <Typography variant="bodySmall" style={{ color: theme.colors.text.lightGray }}>
                  0 회
                </Typography>
              </Bestnum>
            </AuthorInfo>
          </Author>
          <Tags>
            {detail.hashtags.map((tag, index) => (
              <Tag key={index} selected={true} text={tag}></Tag>
            ))}
          </Tags>
        </InfoDetail>
        <PostDate>
          <Typography variant="bodySmall" style={{ color: theme.colors.text.black }}>
            {detail.createdAt.slice(0, 10)}
          </Typography>
        </PostDate>
      </PostInfo>
      <ContentWrapper>
        <Typography variant="bodySmall" style={{ color: theme.colors.text.black }}>
          {detail.content}
        </Typography>
      </ContentWrapper>
    </PostView>
  );
};

export default PostDetail;

const PostView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
`;

const ImageGrid = styled.div<{ count: number }>`
  display: grid;
  width: 80vw;
  gap: 10px;

  ${({ count }) =>
    count === 1
      ? `grid-template-columns: 1fr;
       grid-auto-rows: 360px;`
      : count === 2
        ? `grid-template-columns: 1fr 1fr;
        grid-auto-rows: 360px;`
        : count === 3
          ? `grid-template-columns: repeat(3, 1fr);`
          : count === 4
            ? `
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: auto auto;
              grid-template-areas: 
                "left top right"
                "left bottom right";
            `
            : count === 5
              ? `
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              & > :nth-child(4), & > :nth-child(5) {
                grid-column: span 1;
              }
            `
              : `grid-template-columns: repeat(3, 1fr);`}

  grid-auto-rows: minmax(180px, auto);
`;

const ImageItem = styled.img<{ index: number; count: number }>`
  width: 100%;
  border-radius: 20px;
  object-fit: cover;

  ${({ count, index }) =>
    count === 1
      ? `height: 360px;`
      : count === 4
        ? index === 0
          ? `grid-area: left; grid-row: span 2; height: 360px;`
          : index === 1
            ? `grid-area: top; height: 175px;`
            : index === 2
              ? `grid-area: bottom; height: 175px;`
              : index === 3
                ? `grid-area: right; grid-row: span 2; height: 360px;`
                : ''
        : // TODO: 수정
          // count === 5
          // ? index === 0
          //   ? `grid-area: left; grid-row: span 2; height: 360px;`
          //   : index === 1
          //     ? `grid-area: top; height: 175px;`
          //     : index === 2
          //       ? `grid-area: bottom-left; grid-column: span 1; height: 175px;`
          //       : index === 3
          //         ? `grid-area: bottom-right; grid-column: span 1; height: 175px;`
          //         : index === 4
          //           ? `grid-area: right; grid-row: span 2; height: 360px;`
          //           : ''
          count === 5
          ? index < 3
            ? `grid-column: span 1; height: 360px;`
            : `grid-column: span 2; height: 360px;`
          : `aspect-ratio: 16/9;`}
`;
const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const InfoDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;

const Author = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 19px;
`;

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  object-fit: cover;
  background: #d9d9d9;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const Bestnum = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PostDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentWrapper = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
`;
