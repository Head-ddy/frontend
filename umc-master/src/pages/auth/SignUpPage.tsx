import Typography from "@components/common/typography";
import styled, { useTheme } from "styled-components";
import SignupState from "./Signup_components/SignupState";
import { useEffect, useState } from "react";
import AgreementForm from "./Signup_components/AgreementForm";
import EmailForm from "./Signup_components/EmailForm";
import PasswordForm from "./Signup_components/PasswordForm";
import PrivacyForm from "./Signup_components/PrivacyForm";
import InterestForm from "./Signup_components/InterestForm";
import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom";
import { postSignup } from "@apis/authApi";

const SignUpPage: React.FC = () => {

const theme = useTheme();
const navigate = useNavigate();
const [sectionCount, setSectionCount] = useState(0);
const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [nickname, setNickname] = useState("");
const [hashtags, setHashtag] = useState<string[]>([]);

useEffect(() => {
    setIsNextButtonEnabled(false); // 섹션이 변경될 때마다 버튼 비활성화
}, [sectionCount]);

const handleCheckRequired = (areRequiredChecked: boolean) => {
  setIsNextButtonEnabled(areRequiredChecked);
}

const handleEmailChange = (email: string) => {
  setEmail(email);
};

const handlePasswordChange = (password: string) => {
  setPassword(password);
};

const handleNicknameChange = (nickname: string) => {
  setNickname(nickname);
};

const handleHashtagChange = (hashtags: string[]) => {
  const hashtagStrings = hashtags.map(hashtag => hashtag.toString());
  setHashtag(hashtagStrings);
};

const handleSignUpComplete = async () => {
  try {
    const userSignupData = { email, password, nickname, hashtags };
    console.log("회원가입 확인:", userSignupData)
    await postSignup(userSignupData);
    alert("회원가입 성공!");
    navigate("/login");
  } catch (error) {
    console.error("회원가입 오류:", error);
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
  }
};

  const renderSection = () => {
    switch (sectionCount) {
      case 0:
        return <AgreementForm onCheckRequired={handleCheckRequired}/>;
      case 1:
        return <EmailForm onCheckRequired={handleCheckRequired} onEmailChange={handleEmailChange}/>;
      case 2:
        return <PasswordForm onCheckRequired={handleCheckRequired} onPasswordChange={handlePasswordChange}/>;
      case 3:
        return <PrivacyForm onCheckRequired={handleCheckRequired} onNicknameChange={handleNicknameChange}/>;
      case 4:
        return <InterestForm onHashtagChange={handleHashtagChange} />;
      default:
        return <AgreementForm onCheckRequired={handleCheckRequired} />;
    }
  };

  return (
    <Container>
      <SignupForm>
        <Typography 
          variant="headingXxSmall"
          style={{color: theme.colors.primary[900]}}
        >회원가입</Typography>
        <SignupState sectionCount={sectionCount}/>
        {renderSection()}
        <ButtonContainer>
          {sectionCount > 0 && (
            <Button variant = "pageDown" onClick={() => setSectionCount(sectionCount - 1)}>이전</Button>
          )}
          {sectionCount < 4 && (
            <Button variant = "pageUp" onClick={() => setSectionCount(sectionCount + 1)} disabled={!isNextButtonEnabled}>다음</Button>
          )}
          {sectionCount === 4 && (
            <Button variant = "signUp" onClick={handleSignUpComplete}>회원가입 완료</Button>
          )}
        </ButtonContainer>
      </SignupForm>
    </Container>
  );
};

export default SignUpPage;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 100px;
  background: #FFF;
`

const SignupForm = styled.div`
  display: flex;
  width: 978px;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;