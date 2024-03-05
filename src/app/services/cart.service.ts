import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart : Map<number, Training>;

  constructor() { 
    let cart = localStorage.getItem('cart');
    if(cart){
      this.cart = new Map(JSON.parse(cart));
    }
    else this.cart = new Map<number, Training>();
  }

  addTraining(training : Training){
    this.cart.set(training.id, training);
    this.saveCart();
  }

  saveCustomer(customer : Customer){
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  saveCart(){
    localStorage.setItem('cart', JSON.stringify([...this.cart]));
  }

  removeTraining(training : Training){
    this.cart.delete(training.id);
    this.saveCart();
  }

  getCart(): Training[] | undefined{
    if(this.cart.size > 0)
    return Array.from(this.cart.values())
    else return undefined;
  }

  getTotal() : number{
    let total = 0;
    this.cart.forEach(training => {
      total += training.price * training.quantity;
    });
    return total;
  }

  getCustomer() : Customer{
    let customer = localStorage.getItem('customer');
    if(customer) return JSON.parse(customer);
    return new Customer("unknown", "unknown", "unknown", "unknown", "unknown");
  }

  clearLocalStorage(){
    this.cart.clear();
    localStorage.setItem('cart', '');
  }
}
