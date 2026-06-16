import { prototypeUser } from '@mocks/prototypeData';

export type User = typeof prototypeUser;

export const getUsers = async (): Promise<User> => prototypeUser;
