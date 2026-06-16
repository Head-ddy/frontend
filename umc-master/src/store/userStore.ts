import { create } from 'zustand';
import { getUsers, User } from '@apis/profileApi';
import { getPrototypeUser, updatePrototypeUser } from '@mocks/prototypeStorage';

interface ProfileUpdateData {
  nickname?: string;
  city?: string;
  district?: string;
  profile_image_url?: string;
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

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  fetchUser: async () => {
    const data = await getUsers();
    set({ user: data, profileImageUrl: data.profile_image_url || '' });
  },
  updateProfile: async (profileData) => {
    const currentUser = get().user || (await getUsers());
    const updatedUser = updatePrototypeUser({ ...currentUser, ...profileData });
    set({ user: updatedUser, profileImageUrl: updatedUser.profile_image_url || '' });
  },
  clearUser: () => undefined,
  profileImageUrl: '',
  setProfileImageUrl: (url) => {
    const currentUser = get().user;
    const updatedUser = updatePrototypeUser({ ...(currentUser || getPrototypeUser()), profile_image_url: url });
    set({ user: updatedUser, profileImageUrl: url });
  },
}));
