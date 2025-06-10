import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@assets/icons/close.svg?react';
import UserIcon from '@assets/icons/user.svg?react';
import TipIcon from '@assets/icons/tip.svg?react';
import LogoutIcon from '@assets/icons/logout.svg?react';
import Typography from '@components/common/typography';
import theme from '@styles/theme';
import { useAuthStore } from '@store/authStore';
import { useUserStore } from '@store/userStore';
import { getUsers } from '@apis/profileApi';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileImage: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, profileImage }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, []);
  getUsers();

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <ProfileWrapper>
          <ProfileImage src={profileImage} alt="Profile Image" />
          <Typography variant="titleXSmall">{user?.nickname} 님</Typography>
        </ProfileWrapper>
        <MenuList>
          <Typography variant="titleXxSmall" style={{ color: theme.colors.primary[600] }}>
            <MenuItemLink to="/mypage" onClick={onClose}>
              <UserIcon /> 마이페이지
            </MenuItemLink>
            <MenuItem onClick={onClose}>
              <TipIcon /> 마이꿀팁
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                onClose();
              }}
            >
              <LogoutIcon /> 로그아웃
            </MenuItem>
          </Typography>
        </MenuList>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ProfileModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 150px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 80px 20px 0 0;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  width: 420px;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.primary[600]};
  background: ${({ theme }) => theme.colors.text.white};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text.lightGray};
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary[600]};
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #e9e9e9;
  }
`;

const MenuItemLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary[600]};
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  color: ${theme.colors.primary[600]};

  &:hover {
    background: #e9e9e9;
  }
`;
