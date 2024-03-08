import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  //injection du service auth et du router
  constructor(private authService : AuthService, private router : Router) { }

  /**
   * A l'initialisation du composant, appel de la fonction logout du service auth
   * et redirection vers la page par défaut
   */
  ngOnInit(): void {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}
