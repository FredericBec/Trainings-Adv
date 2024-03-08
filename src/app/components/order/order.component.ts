import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  //Structure de données
  dateOrder : Date = new Date();
  customer : Customer | undefined;

  //injection du service et du router
  constructor(public cartService : CartService, private router : Router) { }

  ngOnInit(): void {
    this.customer = this.cartService.getCustomer();
  }

  /**
   * Fonction qui permet de confirmaer la commande
   * et vide le local storage
   */
  onOrder(){
    if(confirm("Merci de votre visite : ")){
      this.cartService.clearLocalStorage();
      this.router.navigateByUrl('');
    }
  }

}
