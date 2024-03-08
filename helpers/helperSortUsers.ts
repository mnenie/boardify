import type { IUser } from '~/types/user.interface';

export const sortUsers = (users: Ref<IUser[]>) => {
  users.value.sort((a: IUser, b: IUser) => {
    return a.email.localeCompare(b.email);
  });
};
