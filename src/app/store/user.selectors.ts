import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

// Select the 'users' feature state
export const selectUserState = createFeatureSelector<UserState>('users');

// Select all users from the state
export const selectAllUsers = createSelector(selectUserState, (state) => state.users);

// Select the selected user from the state
export const selectSelectedUser = createSelector(selectUserState, (state) => state.selectedUser);

// Select the loading state
export const selectLoading = createSelector(selectUserState, (state) => state.loading);

// Select the error message state
export const selectError = createSelector(selectUserState, (state) => state.error);
