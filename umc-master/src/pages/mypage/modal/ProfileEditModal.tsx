/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Typography from '@components/common/typography';
import Input from '@components/Input/Input';
import {
  addressOptions,
  busanDistricts,
  chungcheongbukDistricts,
  chungcheongnamDistricts,
  daeguDistricts,
  daejeonDistricts,
  gangwonDistricts,
  gwangjuDistricts,
  gyeonggiDistricts,
  gyeongsangbukDistricts,
  gyeongsangnamDistricts,
  incheonDistricts,
  jejuDistricts,
  jeollabukDistricts,
  jeollanamDistricts,
  sejongDistricts,
  seoulDistricts,
} from '../dummyData/region_dummy';
import Button from '@components/Button/Button';
import ImgClose from '@assets/close.svg';
import { useUserStore } from '@store/userStore';

interface ProfileUpdateData {
  nickname?: string;
  city?: string;
  district?: string;
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (profileData: ProfileUpdateData) => void | Promise<void>;
}

interface District {
  value: string;
  label: string;
}

const districtMap: Record<string, District[]> = {
  seoul: seoulDistricts,
  busan: busanDistricts,
  incheon: incheonDistricts,
  daegu: daeguDistricts,
  daejeon: daejeonDistricts,
  gwangju: gwangjuDistricts,
  sejong: sejongDistricts,
  gyeonggi: gyeonggiDistricts,
  gangwon: gangwonDistricts,
  chungcheongbuk: chungcheongbukDistricts,
  chungcheongnam: chungcheongnamDistricts,
  jeollabuk: jeollabukDistricts,
  jeollanam: jeollanamDistricts,
  gyeongsangbuk: gyeongsangbukDistricts,
  gyeongsangnam: gyeongsangnamDistricts,
  jeju: jejuDistricts,
};

const getOptionValueByLabel = (options: { value: string; label: string }[], label?: string | null) =>
  options.find((option) => option.label === label)?.value || 'default';

const getOptionLabelByValue = (options: { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label || '';

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, onEdit }) => {
  const { user } = useUserStore();
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [selectedCity, setSelectedCity] = useState<string>('default');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('default');
  const [districts, setDistricts] = useState<District[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (!isOpen) return;
    const cityValue = getOptionValueByLabel(addressOptions, user?.city);
    const nextDistricts = districtMap[cityValue] || [];
    setNickname(user?.nickname || '');
    setSelectedCity(cityValue);
    setDistricts(nextDistricts);
    setSelectedDistrict(getOptionValueByLabel(nextDistricts, user?.district));
  }, [isOpen, user?.city, user?.district, user?.nickname]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    const nextDistricts = districtMap[city] || [];
    setSelectedCity(city);
    setDistricts(nextDistricts);
    setSelectedDistrict('default');
  };

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    await onEdit({
      nickname: nickname.trim().slice(0, 10),
      city: getOptionLabelByValue(addressOptions, selectedCity) || user?.city || '',
      district: getOptionLabelByValue(districts, selectedDistrict) || user?.district || '',
    });
    alert('프로필이 로컬 프로토타입에 저장되었습니다.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ProfileEditForm>
          <Close onClick={onClose}>
            <img src={ImgClose} alt="close" />
          </Close>
          <Typography variant="headingXxSmall" style={{ color: theme.colors.primary[900] }}>
            프로필 변경
          </Typography>
          <PasswordEditForm>
            <Typography variant="titleXSmall" style={{ color: theme.colors.primary[800] }}>
              비밀번호 변경
            </Typography>
            <Typography variant="bodySmall" style={{ color: theme.colors.text.gray }}>
              서버 없는 프로토타입에서는 비밀번호를 저장하지 않아요.
            </Typography>
          </PasswordEditForm>
          <InfoEditForm>
            <NameEditForm>
              <Typography variant="titleXSmall" style={{ color: theme.colors.primary[800] }}>
                닉네임 변경
              </Typography>
              <Input
                type="text"
                placeholder="닉네임 입력 (10자 이내)"
                maxLength={10}
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
              />
            </NameEditForm>
            <AddressEditForm>
              <Typography variant="titleXSmall" style={{ color: theme.colors.primary[800] }}>
                주소 변경 (선택)
              </Typography>
              <Address>
                <AddressSelect className="box" id="region-list" value={selectedCity} onChange={handleCityChange}>
                  {addressOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </AddressSelect>
                <AddressSelect
                  className="box"
                  id="district-list"
                  value={selectedDistrict}
                  onChange={(event) => setSelectedDistrict(event.target.value)}
                >
                  <option value="default">시/군/구 선택</option>
                  {districts.map((district) => (
                    <option key={district.value} value={district.value}>
                      {district.label}
                    </option>
                  ))}
                </AddressSelect>
              </Address>
            </AddressEditForm>
          </InfoEditForm>
          <Typography variant="bodyXSmall" style={{ color: theme.colors.blue[500] }}>
            ※ 입력한 지역은 매거진/지원 프로그램 화면의 로컬 프로토타입 기준으로 활용됩니다.
          </Typography>
          <Button variant="profileEdit" onClick={handleSubmit}>
            프로필 변경 완료
          </Button>
        </ProfileEditForm>
      </Container>
    </ModalOverlay>
  );
};

export default ProfileEditModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 68px 60px 68px 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  display: flex;
  width: 760px;
  padding: 100px 54px 63px 54px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.primary[800]};
  background: #fff;
`;

const Close = styled.button`
  position: absolute;
  top: -60px;
  right: 0px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const ProfileEditForm = styled.div`
  position: relative;
  display: flex;
  width: 652px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  flex-shrink: 0;
`;

const PasswordEditForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const InfoEditForm = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
  align-self: stretch;
`;

const NameEditForm = styled.div`
  display: flex;
  width: 250px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const AddressEditForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const Address = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  align-self: stretch;
`;

const AddressSelect = styled.select`
  display: flex;
  width: 175px;
  height: 72px;
  padding: 21px 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.text.lightGray};
  color: ${({ theme }) => theme.colors.text.black};
  background: #fff;

  font-size: ${({ theme }) => theme.typography.body.small.size};
  font-weight: ${({ theme }) => theme.typography.body.small.weight};
  line-height: ${({ theme }) => theme.typography.body.small.lineHeight};

  appearance: none;
  background-image: url('/src/assets/Dropdown Arrow.svg');
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 25px;

  & option {
    padding: 8px 12px;
  }
`;
