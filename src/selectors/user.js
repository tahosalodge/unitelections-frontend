/* eslint-disable import/prefer-default-export */
export const selectUsers = state => Object.values(state.user.items);

export const selectUser = (state, { userId }) => state.user.items[userId];
