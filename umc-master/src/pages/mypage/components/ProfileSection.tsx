import Typography from '@components/common/typography';
import styled, { useTheme } from 'styled-components';
import CameraImg from '@assets/icons/cameraImg.svg'
import { useEffect, useState } from 'react';
import ProfileEditModal from '../modal/ProfileEditModal';
import { useUserStore } from '@store/userStore';
import gray_character from '@assets/gray-character.png';


const ProfileSection: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, fetchUser, setProfileImageUrl } = useUserStore();
  const [profileImageUrl, setProfileImageUrlLocal] = useState(user?.profile_image_url || gray_character);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    setProfileImageUrlLocal(user?.profile_image_url || gray_character);
  }, [user?.profile_image_url]);

  const theme = useTheme();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImageUrlLocal(imageUrl); // 로컬 상태 업데이트
        setProfileImageUrl(imageUrl); // 전역 상태 업데이트
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileCard>
      <State>
        <ProfileImg src={profileImageUrl} alt="Profile Image"/>
        <Img 
          src={CameraImg}
          onClick={() => document.getElementById('fileInput')?.click()}
        />
        <InputImg
          id = "fileInput"
          type = 'file'
          accept = "image/*"
          onChange={handleImageChange}
        />
      </State>
      <Card>
        <Text>
          <Hello>
            <Typography 
              variant='headingXxxSmall'
              style={{color: theme.colors.text.black}}
            >{user?.nickname}</Typography>
            <Typography
              variant='bodySmall'
              style={{color: theme.colors.text.black}}
            >님 오늘도 반가워요!</Typography>
          </Hello>
          <LoginType>프로토타입 계정</LoginType>
        </Text>
        <ProfileEdit onClick={() => setIsModalOpen(true)}>프로필 변경</ProfileEdit>
        <ProfileEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onEdit={async (profileData) => {
            await useUserStore.getState().updateProfile(profileData);
          }}
        />
      </Card>
    </ProfileCard>
  );
};

export default ProfileSection;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`

const State = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImg = styled.img`
  width: 140px;
  height: 140px;
  background-color: rgb(230, 230, 230);
  border-radius: 50%;
  object-fit: cover;  /* 이미지 비율 유지하면서 잘리도록 설정 */
  object-position: center;  /* 이미지의 중심을 기준으로 정렬 */
`

const Img = styled.img`
  position: absolute;
  bottom: -13px;
  right: -33px;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
`

const InputImg = styled.input`
  display: none;
`

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1240px;
  height: 140px;
  padding: 18px 56px 20px 56px;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid var(--Text-gray, #636363);
  background-color: #fff;
  position: relative;
`

const Text = styled.div`
  display: flex;
  width: 565px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`

const Hello = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ProfileEdit = styled.button`
  position: absolute;
  right: 56px;

  display: flex;
  width: 196px;
  height: 60px;
  padding: 17px 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: #FFF;

  font-family: ${({ theme }) => theme.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.title.xxsmall.size};
  font-weight: ${({ theme }) => theme.typography.title.xxsmall.weight};
  line-height: ${({ theme }) => theme.typography.title.xxsmall.lineHeight};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
  }
`

const LoginType = styled.button`
  display: flex;
  width: 160px;
  height: 50px;
  padding: 18px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: #3B1E1E;
  color: #FFF;

  font-family: ${({ theme }) => theme.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.body.small.size};
  font-weight: ${({ theme }) => theme.typography.body.small.weight};
  line-height: ${({ theme }) => theme.typography.body.small.lineHeight};
`