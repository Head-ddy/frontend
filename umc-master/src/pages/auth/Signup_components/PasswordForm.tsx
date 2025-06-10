/* eslint-disable react/prop-types */
import Typography from "@components/common/typography";
import Input from "@components/Input/Input";
import useInput from "@hooks/useInput";
import { validatePasswordFormat } from "@utils/validation";
import { useEffect, useState } from "react";
import { styled, useTheme } from "styled-components";


const PasswordForm: React.FC<{ 
  onCheckRequired: (isValid: boolean) => void;
  onPasswordChange: (password: string) => void;
}> = ({ onCheckRequired, onPasswordChange }) => {


  const theme = useTheme();

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  // 비밀번호 상태 검증 및 에러메세지
  const {
    input: password, 
    errorMessage: passwordInputErrorMessage,
    changeHandler: passwordChangeHandler,
  } = useInput({
    initialValue: "",
    validate: async (value) => {
      const error = validatePasswordFormat(value);
      setIsPasswordValid(!error); // 형식이 맞으면 true, 아니면 false
      return error;
    }
  });

  // 비밀번호 확인 오류 메시지 실시간 변동
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordErrorMessage("");
    }
  }, [confirmPassword, password]);

  useEffect(() => {
      setPasswordErrorMessage(passwordInputErrorMessage || "");
  }, [passwordInputErrorMessage]);

  useEffect(() => {
    if (isPasswordValid && confirmPassword && password === confirmPassword) {
      onCheckRequired(true);
    } else {
      onCheckRequired(false);
    }
  }, [password, confirmPassword]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    onPasswordChange(newPassword); // 상위 컴포넌트에 전달
    passwordChangeHandler(e);
    console.log("비밀번호: ", newPassword);
  };
  
  return (
    <Container>
      <Typography 
        variant="headingXxxSmall"
        style={{color: theme.colors.primary[700]}}
      >비밀번호 입력 (필수) *</Typography>
      <Input 
        errorMessage={passwordErrorMessage} 
        type={'password'} 
        placeholder={'비밀번호 입력 (숫자, 영문자, 문자 포함 8~15자 이내)'}
        value={password}
        onChange={handlePasswordChange}
      />
      <Input 
        errorMessage={confirmPasswordErrorMessage} 
        type={'password'} 
        placeholder={'비밀번호 확인'} 
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </Container>
  );
};

export default PasswordForm;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`