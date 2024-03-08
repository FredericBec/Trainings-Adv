import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, delay, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  users : User[];

  constructor() { 
    this.users = [
      {
        "email": "fred@free.fr",
        "password": "1234",
        "roles": ["Admin", "User"]
      },
      {
        "email": "martin@gmail.com",
        "password": "1234",
        "roles": ["User"]
      }
    ];
  }

  login(email : string, password : string): Observable<boolean>{
    console.log(this.users)
    const user = this.users.find(u => u.email === email && u.password === password);
    if(user){
      const isLoggedIn = (email == user.email && password == user.password);
      console.log(isLoggedIn);
      localStorage.setItem('isLoggedIn', isLoggedIn ? "true" : "false");
      return of(isLoggedIn).pipe(delay(1000), tap(isLoggedIn => this.isLoggedIn = isLoggedIn));
    }else {
      return of(false);
    }
  }

  logout(){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

  saveUser(user : User){
    localStorage.setItem('user', btoa(JSON.stringify(user)));
  }

  getUser() : User{
    let userData = localStorage.getItem('user');
    if(userData)
      return JSON.parse(atob(userData));
    else return new User("", "", []);
  }

  getRoleByEmail(email : string){
    const user = this.users.find(u => u.email === email);
    if(user) return user.roles;
    else return [];
  }

  isAdmin() : boolean{
    return this.getUser().roles.includes('Admin');
  }

  isUser(): boolean{
    return this.getUser().roles.includes('User');
  }
}
