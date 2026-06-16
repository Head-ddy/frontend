import { prototypeQuiz } from '@mocks/prototypeData';

export interface QuizData {
  id: number;
  question: string;
  answer: number;
  description: string;
}

export interface QuizResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    response: {
      number_of_quiz: number;
      quiz_list: QuizData[];
    };
  };
}

export interface SubmitQuizResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    message: string;
  };
}

export const fetchQuizData = async (): Promise<QuizResponse> => ({
  isSuccess: true,
  code: 'PROTOTYPE_QUIZ',
  message: '프로토타입 퀴즈입니다.',
  result: { response: { number_of_quiz: 1, quiz_list: [prototypeQuiz] } },
});

export const submitQuizAnswer = async (_quizId: number, _isCorrect: boolean): Promise<SubmitQuizResponse> => {
  void _quizId;
  void _isCorrect;
  return ({
  isSuccess: true,
  code: 'PROTOTYPE_SUBMIT',
  message: '서버 없이 제출 처리되었습니다.',
  result: { message: '프로토타입 제출 완료' },
  });
};
