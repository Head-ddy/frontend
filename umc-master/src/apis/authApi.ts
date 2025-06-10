import axiosInstance from '@apis/axios-instance';

interface UserSignup {
  email: string;
  password: string;
  nickname: string;
  hashtags: string[];
}

export const postSignup = async ({ email, password, nickname, hashtags }: UserSignup) => {
  const { data } = await axiosInstance.post(`/signup`, {
    email,
    password,
    nickname,
    hashtags,
  });
  return data;
};
