import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  //variables
  training : Training | undefined;
  trainingForm!: FormGroup;
  isUpdateForm : boolean | undefined;
  error: any;

  //injection de form builder, du service api et du router
  constructor(private formBuilder : FormBuilder, private apiService : ApiService, private router : Router) { 
  }
  
  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Fonction pour initialiser le formulaire
   * si c'est un formulaire de mise à jour de formation,
   * les données sont insérer aux champs du formaulaires
   */
  initForm(){
    const urlSegments = this.router.url.split('/');
    const trainingId = +urlSegments[urlSegments.length - 1];
    this.isUpdateForm = !isNaN(trainingId);
    this.trainingForm = this.formBuilder.group({
      id : [trainingId ? trainingId : ''],
      name : ['', [Validators.required]],
      description : ['', [Validators.required]],
      price : ['', [Validators.required]]
    });
    if(this.isUpdateForm){
      this.apiService.getTraining(trainingId).subscribe((data) => {
        if(this.trainingForm){
          this.trainingForm.patchValue({
            name : data.name,
            description : data.description,
            price : data.price
          })
        }
      });
    }
  }

  /**
   * getter du nom de la formation
   * pour vérifier le champ du formulaire
   */
  get name(){
    return this.trainingForm.get('name');
  }

  /**
   * getter de la description
   * pour vérifier le champ du formulaire
   */
  get description(){
    return this.trainingForm.get('description');
  }

  /**
   * getter du prix
   * pour vérifier le champ du formulaire
   */
  get price(){
    return this.trainingForm.get('price');
  }

  /**
   * Fonction pour soumettre soit le formulaire d'ajout
   * ou le formulaire de modification
   * @param form le formulaire
   */
  onSubmit(form : FormGroup){
    if(form.valid){
      console.log(this.isUpdateForm);
      if(this.isUpdateForm) this.apiService.updateTraining(form.value, form.value.id).subscribe();
      else this.apiService.addNewTraining(form.value).subscribe();
    }
  }

  /**
   * Fonction permettant de l'ajout d'une formation
   * puis de rediriger vers la page d'administraion
   */
  onAddNewTraining(){
    this.onSubmit(this.trainingForm);
    this.router.navigateByUrl('admin');
  }

  /**
   * Fonction permettant de la modification d'une formation
   * puis de rediriger vers la page d'administraion
   */
  onUpdateTraining(){
    this.onSubmit(this.trainingForm);
    this.router.navigateByUrl('admin');
  }
}
