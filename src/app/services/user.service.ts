import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, finalize, shareReplay, catchError } from 'rxjs/operators';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users?page=';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  private cache = new Map<number, Observable<User[]>>(); // Cache for storing paginated user data
  private userCache = new Map<number, Observable<User>>(); // Cache for storing individual user data

  constructor(private http: HttpClient) {}

  /** Fetches a list of users with caching */
  getUsers(page: number = 1): Observable<User[]> {
    if (this.cache.has(page)) {
      return this.cache.get(page)!; // Retrieve data from cache
    }

    this.loadingSubject.next(true); // Trigger loading state
    const request$ = this.http.get<{ data: User[] }>(`${this.apiUrl}${page}`).pipe(
      map(response => response.data), // Extract the user data from the response
      shareReplay(1), // Cache the response to prevent duplicate requests
      finalize(() => this.loadingSubject.next(false)), // Stop loading after request completes
      catchError(() => of([])) // Return an empty array on error to avoid breaking the app
    );

    this.cache.set(page, request$); // Store the data in cache
    return request$;
  }

  /** Fetches a single user by ID with caching */
  getUserById(id: number): Observable<User> {
    if (this.userCache.has(id)) {
      return this.userCache.get(id)!; // Retrieve data from cache
    }

    this.loadingSubject.next(true); // Trigger loading state
    const request$ = this.http.get<{ data: User }>(`https://reqres.in/api/users/${id}`).pipe(
      map(response => response.data), // Extract the user data from the response
      shareReplay(1), // Cache the response
      finalize(() => this.loadingSubject.next(false)), // Stop loading after request completes
      catchError(() => of(null as any)) // Return null on error to avoid breaking the app
    );

    this.userCache.set(id, request$); // Store the data in cache
    return request$;
  }
}
