import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = '';
  searchUser: User | null = null;
  private searchSubject = new Subject<string>();
  currentPage: number = 1;
  totalPages: number = 2; // يمكن تحديثه ديناميكيًا لاحقًا

  constructor(public  userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers(this.currentPage);

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.userService.getUserById(Number(term)))
    ).subscribe(user => this.searchUser = user, () => this.searchUser = null);
  }

  loadUsers(page: number) {
    this.userService.getUsers(page).subscribe(data => {
      this.users = data;
      this.currentPage = page;
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.searchSubject.next(this.searchTerm);
    } else {
      this.searchUser = null;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadUsers(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadUsers(this.currentPage - 1);
    }
  }
}
