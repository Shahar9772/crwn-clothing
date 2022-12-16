import { createSelector } from 'reselect';

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUser
);

export const selectUserIsLoading = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.isLoading
);

export const selectUserError = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.error
);
