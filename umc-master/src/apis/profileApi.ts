import { getPrototypeUser, PrototypeUser } from '@mocks/prototypeStorage';

export type User = PrototypeUser;

export const getUsers = async (): Promise<User> => getPrototypeUser();
