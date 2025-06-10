import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import LogoImage from '@assets/logo.png';
import RoutePaths from '@router/routePaths';
import Typography from '@components/common/typography';
import AlarmIcon from '@assets/icons/alarm.svg?react';
import AlarmModal from '@components/Modal/alarm';
import ProfileModal from '@components/Modal/profile';
import { useUserStore } from '@store/userStore';
import { getUsers } from '@apis/profileApi';
import gray_character from '@assets/gray-character.png';

interface NavigationBarProps {
  login: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ login }) => {
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser(); // 컴포넌트 마운트 시 사용자 정보 가져오기
  }, []);
  getUsers();

  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };

  const toggleAlarmModal = () => setIsAlarmModalOpen((prev) => !prev);
  const toggleProfileModal = () => setIsProfileModalOpen((prev) => !prev);

  return (
    <Container>
      <Nav>
        <LeftSection>
          <NavLink to={RoutePaths.MAIN} onClick={handleNavClick}>
            <Logo src={LogoImage} alt="Logo" />
          </NavLink>
          <Typography variant="titleXxSmall">
            <MenuItems>
              <StyledNavLink to={RoutePaths.MAGAZINE} onClick={handleNavClick}>
                매거진
              </StyledNavLink>
              <StyledNavLink to={RoutePaths.COMMUNITY} onClick={handleNavClick}>
                꿀팁나눔
              </StyledNavLink>
              <StyledNavLink to={RoutePaths.SAVE_TIP} onClick={handleNavClick}>
                저장한 꿀팁
              </StyledNavLink>
              <StyledNavLink to={RoutePaths.CHALLENGE} onClick={handleNavClick}>
                챌린지
              </StyledNavLink>
            </MenuItems>
          </Typography>
        </LeftSection>

        {login ? (
          <UserSection>
            <AlarmIcon onClick={toggleAlarmModal} />
            <ProfileImg
              src={user?.profile_image_url || gray_character}
              alt="Profile Image"
              onClick={toggleProfileModal}
            />
          </UserSection>
        ) : (
          <LoginBtn to={RoutePaths.LOGIN}>
            <Typography variant="bodySmall">로그인</Typography>
          </LoginBtn>
        )}
      </Nav>

      <AlarmModal isOpen={isAlarmModalOpen} onClose={toggleAlarmModal} />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={toggleProfileModal}
        profileImage={user?.profile_image_url || gray_character}
      />
    </Container>
  );
};

export default NavigationBar;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text.white};
  z-index: 9999;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  margin: 0 auto;
  padding: 0 clamp(20px, 10vw, 320px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 48px;
`;

const Logo = styled.img`
  height: 42px;
  cursor: pointer;
`;

const MenuItems = styled.div`
  display: flex;
  gap: clamp(20px, 10vw, 40px);
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text.black};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[400]};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const LoginBtn = styled(NavLink)`
  background: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.text.white};
  padding: 7px 27px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(10px, 10vw, 20px);
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  background: #e0e0e0; /** TODO: 프로필 이미지 추가 */
  border-radius: 50%;
  cursor: pointer;
`;
