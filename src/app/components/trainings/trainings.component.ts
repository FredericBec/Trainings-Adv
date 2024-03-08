import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

  //Struture de données
  listTrainings : Training[] | undefined;
  error: any;

  //injection des services et du router
  constructor(private apiService : ApiService, private cartService : CartService, private router : Router) {  }
  
  ngOnInit(): void {
    this.getAllTrainings();
  }

  /**
   * Fonction qui permet de récupérer la liste des formations
   * depuis la base de données
   */
  getAllTrainings(){
    this.apiService.getTrainings().subscribe({
      next : (data) => this.listTrainings = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    });
  }
  
  /**
   * Fonction pour ajouter une formation au panier
   * et naviguer vers le panier
   * @param training la formation ajoutée
   */
  onAddToCart(training : Training){
    this.cartService.addTraining(training);
    this.router.navigateByUrl('cart');

  }
}
