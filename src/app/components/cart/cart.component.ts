import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart : Training[] | undefined;
  total : number = 0;
  orderAlert : boolean = false;
  constructor(private cartService : CartService, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  /**
   * Fonction pour supprimer la formation selectionnée
   * et mise àjour du montant du panier
   * @param training formation selectionnée
   */
  onRemoveFromCart(training : Training){
    this.cartService.removeTraining(training);
    this.cart = this.cartService.getCart();
  }

  /**
   * Fonction pour rediriger vers le formulaire client
   * seulement si c'est un utilisateur ou un administrateur
   */
  onNewOrder(){
    if(this.authService.isUser() || this.authService.isAdmin()){
      this.router.navigateByUrl('customer');
    }else{
      this.orderAlert = true;
    }
  }
}
