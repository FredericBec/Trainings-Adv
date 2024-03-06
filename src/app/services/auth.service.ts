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
  constructor(private http : HttpClient) { }

  login(email : string, password : string): Observable<boolean>{
    const isLoggedIn = (email == this.getUser().email && password == this.getUser().password);
    return of(isLoggedIn).pipe(delay(1000), tap(isLoggedIn => this.isLoggedIn = isLoggedIn));
  }

  logout(){
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

  saveUser(user : User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() : User{
    let user = localStorage.getItem('user');
    if(user) return JSON.parse(user);
    else return new User("", "", []);
  }
}
