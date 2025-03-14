import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadUserById, loadUserByIdSuccess, loadUserByIdFailure } from './user.actions';
import { User } from '../services/user.service';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  
  // Start loading users
  on(loadUsers, state => ({ ...state, loading: true, error: null })),
  
  // Success loading users
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  
  // Failure loading users
  on(loadUsersFailure, (state, { error }) => ({ ...state, error: error || 'An error occurred while loading users.', loading: false })),
  
  // Start loading single user by ID
  on(loadUserById, state => ({ ...state, loading: true, error: null })),
  
  // Success loading single user by ID
  on(loadUserByIdSuccess, (state, { user }) => ({ ...state, selectedUser: user, loading: false })),
  
  // Failure loading single user by ID
  on(loadUserByIdFailure, (state, { error }) => ({ ...state, error: error || 'An error occurred while loading the user details.', loading: false }))
);
