/* eslint-disable react/prop-types */
import Typography from "@components/common/typography";
import Input from "@components/Input/Input";
import { styled, useTheme } from "styled-components";
import CameraImg from "@assets/cameraImg.svg"
import { addressOptions, busanDistricts, chungcheongbukDistricts, chungcheongnamDistricts, daeguDistricts, daejeonDistricts, gangwonDistricts, gwangjuDistricts, gyeonggiDistricts, gyeongsangbukDistricts, gyeongsangnamDistricts, incheonDistricts, jejuDistricts, jeollabukDistricts, jeollanamDistricts, sejongDistricts, seoulDistricts } from "../dummydata/region_dummy";
import { useState } from "react";
import gray_character from '@assets/gray-character.png';

interface District {
  value: string;
  label: string;
}

const PrivacyForm: React.FC<{ 
  onCheckRequired: (isValid: boolean) => void;
  onNicknameChange: (nickname: string) => void; 
}> = ({ onCheckRequired, onNicknameChange }) => {

  const theme = useTheme();

  const [profileImageUrl, setProfileImageUrlLocal] = useState(gray_character);
  const [selectedCity, setSelectedCity] = useState<string>("default");
  const [districts, setDistricts] = useState<District[]>([]);
  const [nickname, setNickname] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 닉네임 입력값을 업데이트하는 함수
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    onNicknameChange(newNickname);
    const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣._]+$/;

    if (newNickname.length === 0) {
      setErrorMessage("닉네임을 입력해주세요.");
      onCheckRequired(false);
    } else if (newNickname.length > 11) {
      setErrorMessage("닉네임을 최대 10자까지 입력 가능합니다.");
      onCheckRequired(false);
    } else if (!nicknameRegex.test(newNickname)) {
      setErrorMessage("닉네임은 한글, 영문, 숫자, '.', '_' 만 사용할 수 있습니다.");
      onCheckRequired(false);
    } else {
      setErrorMessage("");
      onCheckRequired(true);
    }
  };

  // 도시 선택시 구 목록을 업데이트하는 함수
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);

    switch (city) {
        case "seoul":
            setDistricts(seoulDistricts);
            break;
        case "busan":
            setDistricts(busanDistricts);
            break;
        case "incheon":
            setDistricts(incheonDistricts);
            break;
        case "daegu":
            setDistricts(daeguDistricts);
            break;
        case "daejeon":
            setDistricts(daejeonDistricts);
            break;
        case "gwangju":
            setDistricts(gwangjuDistricts);
            break;
        case "sejong":
            setDistricts(sejongDistricts);
            break;
        case "gyeonggi":
            setDistricts(gyeonggiDistricts);
            break;
        case "gangwon":
            setDistricts(gangwonDistricts);
            break;
        case "chungcheongbuk":
            setDistricts(chungcheongbukDistricts);
            break;
        case "chungcheongnam":
            setDistricts(chungcheongnamDistricts);
            break;
        case "jeollabuk":
            setDistricts(jeollabukDistricts);
            break;
        case "jeollanam":
            setDistricts(jeollanamDistricts);
            break;
        case "gyeongsangbuk":
            setDistricts(gyeongsangbukDistricts);
            break;
        case "gyeongsangnam":
            setDistricts(gyeongsangnamDistricts);
            break;
        case "jeju":
            setDistricts(jejuDistricts);
            break;
        default:
            setDistricts([]);
            break;
        }
      };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImageUrlLocal(imageUrl); // 로컬 상태 업데이트
        // api 연결
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Profile>
        <ProfileImage src={profileImageUrl} alt="Profile Image"/>
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
      </Profile>
      <InfoEditForm>
        <NameEditForm>
          <Typography 
            variant="headingXxxSmall"
            style={{color: theme.colors.primary[700]}}
          >닉네임 (필수) *</Typography>
          <Input 
            errorMessage={errorMessage} 
            type={'nickname'} 
            placeholder={'닉네임 입력 (최대 10자 이내)'}
            value={nickname}
            onChange={handleNicknameChange}
          />
        </NameEditForm>
        <Privacy>
          <AddressEditForm>
            <Typography 
              variant="headingXxxSmall"
              style={{color: theme.colors.primary[700]}}
            >주소 (선택)</Typography>
            <Address>
              <AddressSelect className="box" id="region-list" defaultValue={selectedCity} onChange={handleCityChange}>
                {addressOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </AddressSelect>
              <AddressSelect className="box" id="seoul-district-list" defaultValue="default">
                {districts.map((district) => (
                  <option key={district.value} value={district.value}>
                    {district.label}
                  </option>
                ))}
              </AddressSelect>
            </Address>
          </AddressEditForm>
          <Typography 
            variant="bodyXSmall"
            style={{color: theme.colors.blue[500]}}
          >※ 입력하면 해당 지역에서 진행하는 지원 프로그램 정보를 확인 할 수 있습니다.</Typography>
        </Privacy>
      </InfoEditForm>
    </Container>
  );
};

export default PrivacyForm;

const Container = styled.div`
  display: flex;
  width: 989px;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`

const Profile = styled.div`
  position: relative;
  display: flex;
  width: 178px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

const ProfileImage = styled.img`
  width: 140px;
  height: 140px;
  background-color: rgb(230, 230, 230);
  border-radius: 50%;
  object-fit: cover;  /* 이미지 비율 유지하면서 잘리도록 설정 */
  object-position: center;  /* 이미지의 중심을 기준으로 정렬 */
`

const Img = styled.img`
  position: absolute;
  bottom: -11px;
  right: 2px;
  width: 60px;
  height: 60px;
  cursor: pointer;
`

const InputImg = styled.input`
  display: none;
`

const Privacy = styled.div`
  width: 500px;
  height: 162px;
  align-self: stretch;
  gap: 5px;
`

const InfoEditForm = styled.div`
  display: inline-flex;
  align-items: start;
  gap: 40px;
`

const NameEditForm = styled.div`
  display: flex;
  width: 476px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`

const AddressEditForm = styled.div`
  display: flex;
  width: 420px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`

const Address = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  align-self: stretch;
`

const AddressSelect = styled.select`
  display: flex;
  width: 200px;
  height: 72px;
  padding: 20px 35px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.text.lightGray};
  color : ${({ theme }) => theme.colors.text.black};
  background: #FFF;
  
  font-size: ${({ theme }) => theme.typography.body.small.size};
  font-weight: ${({ theme }) => theme.typography.body.small.weight};
  line-height: ${({ theme }) => theme.typography.body.small.lineHeight};


  appearance: none; /* 기본 드롭다운 화살표 제거 */

  /* 드롭다운 화살표 추가 */
  background-image: url('/src/assets/Dropdown Arrow.svg');
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 25px;

  & option {
    padding: 8px 12px;
    background-color: ${({ theme }) => theme.colors.text.white};
    color: ${({ theme }) => theme.colors.text.black};
  }
`