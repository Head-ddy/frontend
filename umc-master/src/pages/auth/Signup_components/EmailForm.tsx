/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import axiosInstance from "@apis/axios-instance";
import Button from "@components/Button/Button";
import Typography from "@components/common/typography";
import Input from "@components/Input/Input";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

const emails = [
  { value: "", label: "선택" },
  { value: "naver.com", label: "naver.com" },
  { value: "daum.net", label: "daum.net" }, 
  { value: "gmail.com", label: "gmail.com" }, 
  { value: "nate.com", label: "nate.com" }, 
  { value: "icloud.com", label: "icloud.com" }, 
  { value: "outlook.com", label: "outlook.com" }, 
];

const EmailForm: React.FC<{ 
  onCheckRequired: (isValid: boolean) => void,
  onEmailChange: (email: string) => void
}> = ({ onCheckRequired, onEmailChange }) => {
  
  const theme = useTheme();

  const [authCode, setAuthCode] = useState<string>('');
  const [localPart, setLocalPart] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false); 
  const [verified, setVerified] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(180);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState<boolean>(false);

  const fullEmail = localPart && domain ? `${localPart}@${domain}` : "";

  // 이메일과 인증번호 입력이 모두 채워졌는지 확인하는 useEffect
  useEffect(() => {
    if (verified) {
      onCheckRequired(true); // 유효성 체크
    } else {
      onCheckRequired(false); // 유효성 체크
    }
  }, [verified, onCheckRequired]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | undefined;
    if (emailSent && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } 
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [emailSent, timer]);

  const handleEmailRequest = async () => {
    if (!localPart || !domain) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      await axiosInstance.post("/auth/send-verification-email", { email: fullEmail });
      setEmailSent(true);
      alert("인증 코드가 발송되었습니다.");
    } catch (error) {
      alert("이메일 인증 요청에 실패했습니다.");
    }
  };

  const handleVerifyCode = async () => {
    if (!authCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }
    try {
      const response = await axiosInstance.post("/auth/verify-email-code", {
        email: fullEmail,
        code: authCode,
      });
      console.log("서버 응답:", response.data);
      if (response.data) {
        alert("이메일 인증이 완료되었습니다.");
        setVerified(true);
      } else {
        alert("인증번호가 올바르지 않습니다.");
      }
    } catch (error) {
      alert("인증번호 확인에 실패했습니다.");
    }
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedDomain = e.target.value;
    setDomain(updatedDomain);
  
    const updatedFullEmail = `${localPart}@${updatedDomain}`;
    onEmailChange(updatedFullEmail);
  
    console.log("도메인 변경:", updatedFullEmail);

    setIsEmailDuplicate(false); // 중복 확인 버튼을 다시 활성화
  };  

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setLocalPart(email);
  
    const updatedFullEmail = `${email}@${domain}`; // 최신 도메인 사용
    onEmailChange(updatedFullEmail);
  
    console.log("이메일 입력:", updatedFullEmail);

    setIsEmailDuplicate(false); // 중복 확인 버튼을 다시 활성화
  };
  
  // 이메일 중복 체크
  const checkEmailDuplicate = async () => {
    if (!fullEmail) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const response = await axiosInstance.post("/check-email", { email: fullEmail });
      if (response.data.isSuccess) {
        setIsEmailDuplicate(true);
        alert("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      alert("이메일이 이미 존재합니다.");
    }
  };

  const handleRetry = () => {
    setLocalPart("");
    setDomain("");
    setAuthCode("");
    setEmailSent(false);
    setVerified(false);
    setTimer(180);
  };

  return (
    <Container>
      <Typography 
        variant="headingXxxSmall"
        style={{color: theme.colors.primary[700]}}
      >이메일 입력 (필수) *</Typography>
      <Email>
        <Input 
          type={'text'} 
          placeholder={'이메일 입력'} 
          value={localPart}
          onChange={handleEmailChange}
          disabled={emailSent}
        />
        <Typography 
          variant="titleSmall"
          style={{color: theme.colors.text.lightGray}}
        >@</Typography>
        <EmailSelect
          value={domain}
          onChange={handleDomainChange}
          disabled={emailSent || verified}
        >
          {emails.map((email) => (
            <option key={email.value} value={email.value}>
              {email.label}
            </option>
          ))}
        </EmailSelect>
        <Button 
          variant="emailCheck" 
          onClick={isEmailDuplicate === false ? checkEmailDuplicate : handleEmailRequest} 
          disabled={emailSent || verified}
          style={{
            backgroundColor: isEmailDuplicate === false ? theme.colors.primary[500] : theme.colors.primary[900],
            transition: 'background-color 0.5s ease'
          }}
        >
          {isEmailDuplicate === false && !emailSent ? "중복 확인" : "이메일 인증"}
        </Button>
      </Email>
      <Email>
        <Input 
          errorMessage="" 
          type={'email'} 
          placeholder={'인증번호를 입력해주세요.'} 
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
        />
        <Button variant="emailCheck" onClick={handleVerifyCode} disabled={verified}>인증 확인</Button>
      </Email>
      {emailSent && (
        <Timer>
          <Typography 
            variant="titleXxxSmall"
            style={{color: theme.colors.red[500]}}
          >남은 시간: {Math.floor(timer / 60)}분 {timer % 60}초</Typography>
          <Button variant="emailCheck" onClick={handleRetry} >
            재시도
          </Button>
        </Timer>
      )}
    </Container>
  );
};

export default EmailForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`

const Email = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 21px;
  align-self: stretch;
`

const EmailSelect = styled.select`
  display: flex;
  min-width: 252px;
  height: 72px;
  padding: 21px 72px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.text.lightGray};
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

const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  width: 100%; /* 부모 컨테이너에서 중앙 정렬 */
  align-self: center;
`