/* eslint-disable react/prop-types */
import Typography from "@components/common/typography";
import styled, { useTheme } from "styled-components";
import ImgAdd from "@assets/add.svg";
import ImgRemove from "@assets/remove.svg";
import { useState } from "react";

interface AgreementItemProps {
  isRequired: boolean;  // 필수 여부
  label: string;        // 약관 이름
  isOptional: boolean;  // 선택 사항 여부
  checked: boolean;     // 체크 여부
  onChange: (checked: boolean) => void; // 체크 상태 변경 함수
  detail: string;       // 이용 약관 상세
}

const AgreementItem: React.FC<AgreementItemProps& { isAllAgreement?: boolean }> = ({ isRequired, label, isOptional, checked, onChange, detail, isAllAgreement = false }) => {
  const theme = useTheme();
  const [showDetails, setShowDetails] = useState(false);

  const labelColor = isRequired
    ? theme.colors.text.gray
    : isOptional
    ? theme.colors.text.gray
    : theme.colors.text.black;

  return (
    <>
      <Agreement>
        <Terms>
          <Checkbox type="checkbox" id="agreement" checked={checked} onChange={(e) => onChange(e.target.checked)}/>
          {isRequired && <Typography variant="bodySmall" style={{ color: theme.colors.red[500] }}>(필수)</Typography>}
          {!isRequired && isOptional && <Typography variant="bodySmall" style={{ color: theme.colors.blue[400] }}>(선택)</Typography>}
          <Typography variant="bodySmall" style={{ color: labelColor }}>
            {label}
          </Typography>
        </Terms>
        {!isAllAgreement && (
          <Plus onClick={() => setShowDetails(!showDetails)}>
            <img src={showDetails ? ImgRemove : ImgAdd} alt="toggleDetails" />
          </Plus>
        )}
      </Agreement>
      {showDetails && !isAllAgreement && (
        <Details>
          <Typography 
            variant="bodyXSmall"
            style={{color: theme.colors.text.gray}}
          >
            {detail}
          </Typography>
        </Details>
      )}
    </>
  );
};

interface Section1Props {
  onCheckRequired: (areRequiredChecked: boolean) => void;
}

const AgreementForm: React.FC<Section1Props> = ({ onCheckRequired }) => {
  
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    terms: false, privacy: false, thirdinfo: false, marketing: false, 
  });

  // 전체 동의 체크박스
  const handleAllAgreeChange = () => {
    const newCheckedState = !isAllAgreed;
    setIsAllAgreed(newCheckedState);
    const updatedItems = {
      terms: newCheckedState, 
      privacy: newCheckedState, 
      thirdinfo: newCheckedState, 
      marketing: newCheckedState, 
    };
    setCheckedItems(updatedItems);
    onCheckRequired(updatedItems.terms && updatedItems.privacy);
  };

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setCheckedItems((prevState) => {
      const updatedItems = { ...prevState, [key]: checked };
      const allChecked = Object.values(updatedItems).every(Boolean);
      setIsAllAgreed(allChecked);
      onCheckRequired(updatedItems.terms && updatedItems.privacy);
      return updatedItems;
    });
  };

  return (
    <Container>
      <AgreementItem 
        isRequired={false} 
        label="전체 약관에 동의합니다." 
        isOptional={false}
        checked={isAllAgreed}
        onChange={handleAllAgreeChange}
        detail=""
        isAllAgreement={true}
      />
      <AgreementItem 
        isRequired={true} 
        label="이용 약관 동의" 
        isOptional={false} 
        checked={checkedItems.terms}
        onChange={(checked) => handleCheckboxChange('terms', checked)}
        detail="홈마스터 홈페이지 회원에 가입하시면 더욱 더 다양한 서비스를 이용하실 수 있습니다. 우리 사이트는 정보통신망 이용촉진에 관한 법률 등 관련 법령에 따라 아래와 같이 이용자의 동의를 받은 후 회원가입을 받고 있습니다."
      />
      <AgreementItem 
        isRequired={true} 
        label="개인 정보 수집 및 이용 약관 동의" 
        isOptional={false} 
        checked={checkedItems.privacy}
        onChange={(checked => handleCheckboxChange('privacy', checked))}
        detail="홈마스터는 홈페이지 회원 가입 시 회원 서비스 제공에 필요한 최소한의 정보를 수집하고 있으며 개인정보파일에 수집되는 항목은 다음과 같습니다."
      />
      <AgreementItem 
        isRequired={false} 
        label="제 3자 정보 제공 동의" 
        isOptional={true} 
        checked={checkedItems.thirdinfo}
        onChange={(checked) => handleCheckboxChange('thirdinfo', checked)}
        detail="이벤트를 위한 개인 정보를 수집합니다."
      />
      <AgreementItem 
        isRequired={false} 
        label="마케팅 활용 동의" 
        isOptional={true} 
        checked={checkedItems.marketing}
        onChange={(checked) => handleCheckboxChange('marketing', checked)}
        detail="E-mail, SMS 수신에 동의합니다."
      />
    </Container>
  );
};

export default AgreementForm;
  
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`

const Agreement = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`

const Terms = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`

const Checkbox = styled.input`
  width: 30px;
  height: 30px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary[600]};
`

const Plus = styled.button`
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Details = styled.div`
  margin-left: 30px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.text.white};
  width: 92%;
`