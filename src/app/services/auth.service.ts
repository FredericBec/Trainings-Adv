import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, delay, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Structure de données
  isLoggedIn: boolean = false;
  users : User[];

  //initialisation du tableau users
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

  /**
   * Fonction permettant de vérifier si l'utilisateur est connecté
   * @return vrai si l'e-mail et le mot de passe sont les mêmes que ceux du tableau users 
   */
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

  /**
   * Fonction qui permet la déconnexion de l'utilisateur
   */
  logout(){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

  /**
   * Fonction qui stocke les données cryptées dans le local storage
   * @param user 
   */
  saveUser(user : User){
    localStorage.setItem('user', btoa(JSON.stringify(user)));
  }

  /**
   * Fonction pour récupérer les données de l'utilisateur depuis le local storage
   * @returns les données décryptées ou un utilisateur vide
   */
  getUser() : User{
    let userData = localStorage.getItem('user');
    if(userData)
      return JSON.parse(atob(userData));
    else return new User("", "", []);
  }

  /**
   * Fonction pour récupérer les rôles de l'utilisateur
   * en fonction de son e-mail
   * @param email de l'utilisateur trouvé
   * @returns les roles de l'utilisateur
   */
  getRoleByEmail(email : string){
    const user = this.users.find(u => u.email === email);
    if(user) return user.roles;
    else return [];
  }

  /**
   * Fonction pour vérifier que le rôle de l'utilisateur
   * @returns vrai si l'utilisateur a le rôle Admin
   */
  isAdmin() : boolean{
    return this.getUser().roles.includes('Admin');
  }

  /**
   * Fonction pour vérifier que le rôle de l'utilisateur
   * @returns vrai si l'utilisateur a le rôle User
   */
  isUser(): boolean{
    return this.getUser().roles.includes('User');
  }
}
