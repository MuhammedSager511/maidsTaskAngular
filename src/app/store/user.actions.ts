import { createAction, props } from '@ngrx/store';
import { User } from '../services/user.service';

// Action to load users for a specific page
export const loadUsers = createAction('[User] Load Users', props<{ page: number }>());

// Action triggered when users are successfully loaded
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());

// Action triggered when there is an error loading users
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: string }>());

// Action to load details of a single user by ID
export const loadUserById = createAction('[User] Load User By ID', props<{ id: number }>());

// Action triggered when user details are successfully loaded
export const loadUserByIdSuccess = createAction('[User] Load User By ID Success', props<{ user: User }>());

// Action triggered when there is an error loading user details
export const loadUserByIdFailure = createAction('[User] Load User By ID Failure', props<{ error: string }>());
