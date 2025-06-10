/* eslint-disable react/prop-types */
import Typography from "@components/common/typography";
import styled, { useTheme } from "styled-components";

interface SignupStateProps {
  sectionCount: number;
}

const SignupState: React.FC<SignupStateProps> = ({ sectionCount }) => {
  
  const theme = useTheme();

  const steps = [
    "약관 동의",
    "이메일 입력",
    "비밀번호 입력",
    "개인정보 입력",
    "관심사 선택",
  ];

  return (
    <Container>
      <Sequence>
        <Line/>
        {steps.map((step, index) => (
          <Step key={index}>
            <Num isActive={sectionCount === index}>{index + 1}</Num>
            <Typography
              variant={sectionCount === index ? "titleXxSmall" : "bodyMedium"}
              style={{
                color: sectionCount === index ? theme.colors.primary[800] : theme.colors.text.lightGray, 
                whiteSpace: "nowrap"
              }}
            >
              {step}
            </Typography>
          </Step>
        ))}
      </Sequence>
    </Container>
  );
};

export default SignupState;

const Container = styled.div`
  width: 962px;
  height: 102px;
`

const Sequence = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 130px;
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 2;
`

const Num = styled.div<{ isActive: boolean }>`
  display: flex;
  width: 60px;
  padding: 9px 23px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
   background: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary[800] : theme.colors.text.lightGray};

  color: ${({ theme }) => theme.colors.text.white};

  font-family: ${({ theme }) => theme.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.heading.xxsmall.size};
  font-weight: ${({ theme }) => theme.typography.heading.xxsmall.weight};
  line-height: ${({ theme }) => theme.typography.heading.xxsmall.lineHeight};
`

const Line = styled.div`
  position: absolute;
  top: 30px;
  left: 15px;
  width: 99%;
  height: 1px;
  border: 1px dotted ${({ theme }) => theme.colors.text.lightGray};
  z-index: 1;
`