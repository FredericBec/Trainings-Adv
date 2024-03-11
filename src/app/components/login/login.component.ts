import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm : FormGroup

  /**
   * Injection du form builder, du service auth et du router
   * initialisation du formulaire utilisateur
   * @param formBuilder 
   * @param authService service d'authentification
   * @param router 
   */
  constructor(private formBuilder : FormBuilder, public authService : AuthService, private router : Router) { 
    this.userForm = this.formBuilder.group({
      email: [this.authService.getUser().email, [Validators.required, Validators.pattern('[a-zA-Z0-9.@]*')]],
      password: [this.authService.getUser().password, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  /**
   * getter de l'e-mail pour la validation
   */
  get email(){
    return this.userForm.get('email');
  }

  /**
   * getter du mot de passe pour la validation
   */
  get password(){
    return this.userForm.get('password');
  }

  /**
   * Fonction pour stocker les infos de l'utilisateur dans le local storage
   * si le formulaire est valide
   * @param form 
   */
  onSaveUser(form : FormGroup){
    if(form.valid){
      const roles = this.authService.getRoleByEmail(form.value.email);
      this.authService.saveUser(new User(form.value.email, form.value.password, roles));
    }else{
      alert('vous devez saisir vos identifiants');
    }
  }

  /**
   * Fonction permettant de connecter un utilisateur
   * et de rediriger vers la page par défaut
   */
  onLogin(){
    this.onSaveUser(this.userForm);
    const val = this.userForm.value;

    if(val.email && val.password){
      this.authService.login(val.email, val.password).subscribe(() => {
        this.router.navigateByUrl('');
      });
    }
  }
}
