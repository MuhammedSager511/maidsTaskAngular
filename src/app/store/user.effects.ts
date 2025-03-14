import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService, User } from '../services/user.service'; // Importing the necessary services and models
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadUserById, loadUserByIdSuccess, loadUserByIdFailure } from './user.actions'; // Importing actions

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  // Effect to load users based on the page number
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers), // Listen for the 'loadUsers' action
      mergeMap(({ page }) =>
        this.userService.getUsers(page).pipe( // Call the service to get users
          map(users => loadUsersSuccess({ users })), // On success, dispatch 'loadUsersSuccess'
          catchError(error => of(loadUsersFailure({ error: error.message }))) // On error, dispatch 'loadUsersFailure'
        )
      )
    )
  );

  // Effect to load a user by ID
  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserById), // Listen for the 'loadUserById' action
      mergeMap(({ id }) =>
        this.userService.getUserById(id).pipe( // Call the service to get a single user's details by ID
          map(user => loadUserByIdSuccess({ user })), // On success, dispatch 'loadUserByIdSuccess'
          catchError(error => of(loadUserByIdFailure({ error: error.message }))) // On error, dispatch 'loadUserByIdFailure'
        )
      )
    )
  );
}
