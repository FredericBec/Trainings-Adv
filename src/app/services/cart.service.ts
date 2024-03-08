import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //Structure de données
  private cart : Map<number, Training>;

  //Initialisation des structure de données
  constructor() { 
    let cart = localStorage.getItem('cart');
    if(cart){
      this.cart = new Map(JSON.parse(cart));
    }
    else this.cart = new Map<number, Training>();
  }

  /**
   * Ajout de la formation au panier et met à jour le local storage
   * @param training formation ajoutée
   */
  addTraining(training : Training){
    this.cart.set(training.id, training);
    this.saveCart();
  }

  /**
   * Ajoute les données au local storage
   * @param customer client récupéré du formulaire
   */
  saveCustomer(customer : Customer){
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  /**
   * Met à jour le local storage
   */
  saveCart(){
    localStorage.setItem('cart', JSON.stringify([...this.cart]));
  }

  /**
   * Supprime la formation du panier et mets à jour le local storage
   * @param training formation à supprimer
   */
  removeTraining(training : Training){
    this.cart.delete(training.id);
    this.saveCart();
  }

  /**
   * Fonction pour récupérer les données du panier
   * @returns un tableau de formation ou undefined
   */
  getCart(): Training[] | undefined{
    if(this.cart.size > 0)
    return Array.from(this.cart.values())
    else return undefined;
  }

  /**
   * Calcule du montant total du panier 
   * en fonction du prix et de la quantité de chaque formation
   * @returns le total du panier
   */
  getTotal() : number{
    let total = 0;
    this.cart.forEach(training => {
      total += training.price * training.quantity;
    });
    return total;
  }

  /**
   * Récupère les dernières infos saisies du formulaire depuis le local storage
   * @returns le dernier client saisi ou un client inconnu
   */
  getCustomer() : Customer{
    let customer = localStorage.getItem('customer');
    if(customer) return JSON.parse(customer);
    return new Customer("unknown", "unknown", "unknown", "unknown", "unknown");
  }

  /**
   * Vide le panier et le local storage
   */
  clearLocalStorage(){
    this.cart.clear();
    localStorage.setItem('cart', '');
  }
}
