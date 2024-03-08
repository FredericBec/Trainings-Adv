import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //Struture de données
  listTrainings : Training[] | undefined;
  error: any;

  //injection du service api et du router
  constructor(private apiService : ApiService, private router : Router) { }

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
   * Fonction pour rediriger vers le formulaire d'ajout
   */
  goToCreateForm(){
    this.router.navigateByUrl('training');
  }

  /**
   * Fonction permettant de rediriger vers le
   * formulaire de modification
   * @param training la formation sélectionnée
   */
  goToUpdateForm(training : Training){
    console.log(training);
    this.router.navigate(['/training', training.id]);
  }

  /**
   * Fonction pour supprimer la formation sélectionnée
   * @param id de la formation sélectionnée
   */
  onDeleteTraining(id : number){
    this.apiService.deleteTraining(id).subscribe();
    this.getAllTrainings();
  }

}
