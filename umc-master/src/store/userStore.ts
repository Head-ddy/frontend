import { create } from 'zustand';
import { getUsers, User } from '@apis/profileApi';

interface ProfileUpdateData {
  nickname?: string;
  city?: string;
  district?: string;
  hashtags?: string[];
}

interface UserState {
  user: User | null;
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  fetchUser: () => Promise<void>;
  updateProfile: (profileData: ProfileUpdateData) => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  fetchUser: async () => {
    const data = await getUsers();
    set({ user: data, profileImageUrl: data.profile_image_url || '' });
  },
  updateProfile: async (profileData) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...profileData } : state.user,
    }));
  },
  clearUser: () => undefined,
  profileImageUrl: '',
  setProfileImageUrl: (url) => set({ profileImageUrl: url }),
}));
