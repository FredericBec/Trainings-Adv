import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart : Training[] | undefined;
  total : number = 0;
  constructor(private cartService : CartService, private router : Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  onRemoveFromCart(training : Training){
    this.cartService.removeTraining(training);
    this.cart = this.cartService.getCart();
  }

  onNewOrder(){
    this.router.navigateByUrl('customer');
  }
}
