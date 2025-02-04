import UserCollection from '../db/models/User.js';

export const register = async (payload) => {
  const newUser = await UserCollection.create(payload);

  return newUser;
};
