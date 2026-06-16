import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import RoutePaths from './routePaths';
import LandingPage from '@pages/landing/LandingPage';
import MyPage from '@pages/mypage/MyPage';
import MainPage from '@pages/main/MainPage';
import SearchPage from '@pages/search/SearchPage';
import SaveTipPage from '@pages/saveTip/SaveTipPage';
import SaveTipDetailPage from '@pages/saveTip/SaveTipDetailPage';
import CreatePostPage from '@pages/createPost/CreatePostPage';
import CommunityPage from '@pages/community/CommunityPage';
import MagazinePage from '@pages/magazine/MagazinePage';
import MagazineDetailPage from '@pages/magazine/MagazineDetailPage';
import RootLayout from '@layouts/root-layout';
import ChallengePage from '@pages/challenge/ChallengePage';
import ChatPage from '@pages/chat/ChatPage';
import ErrorPage from '@pages/error/ErrorPage';
import MyChallengePage from '@pages/mychallenge/MyChallenge';
import ChallengeDetailPage from '@pages/challenge/ChallengeDetailPage';

const appRoutes = [
  { index: true, element: <LandingPage /> },
  { path: RoutePaths.MAIN, element: <MainPage /> },
  { path: RoutePaths.MYPAGE, element: <MyPage /> },
  { path: RoutePaths.SAVE_TIP, element: <SaveTipPage /> },
  { path: RoutePaths.SEARCH, element: <SearchPage /> },
  { path: RoutePaths.SAVE_TIP_DETAIL, element: <SaveTipDetailPage /> },
  { path: RoutePaths.CREATE_POST, element: <CreatePostPage /> },
  { path: RoutePaths.COMMUNITY, element: <CommunityPage /> },
  { path: RoutePaths.MAGAZINE, element: <MagazinePage /> },
  { path: RoutePaths.MAGAZINE_DETAIL, element: <MagazineDetailPage /> },
  { path: RoutePaths.CHALLENGE, element: <ChallengePage /> },
  { path: RoutePaths.MYCHALLENGE, element: <MyChallengePage /> },
  { path: RoutePaths.CHALLENGE_DETAIL, element: <ChallengeDetailPage /> },
  { path: RoutePaths.CHAT, element: <ChatPage /> },
  { path: '*', element: <Navigate to={RoutePaths.MAIN} replace /> },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: appRoutes,
      },
    ],
  },
]);

const Router: React.FC = () => <RouterProvider router={router} />;

export default Router;
