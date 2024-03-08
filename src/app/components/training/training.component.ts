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

  training : Training | undefined;
  trainingForm!: FormGroup;
  isUpdateForm : boolean | undefined;
  error: any;
  constructor(private formBuilder : FormBuilder, private apiService : ApiService, private router : Router) { 
  }
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    const urlSegments = this.router.url.split('/');
    const trainingId = +urlSegments[urlSegments.length - 1];
    this.isUpdateForm = !isNaN(trainingId);
    this.trainingForm = this.formBuilder.group({
      id : [trainingId ? trainingId : '', [Validators.required, Validators.pattern('[0-9]')]],
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

  onSubmit(form : FormGroup){
    if(form.valid){
      console.log(this.isUpdateForm);
      if(this.isUpdateForm) this.apiService.updateTraining(form.value, form.value.id).subscribe();
      else this.apiService.addNewTraining(new Training(form.value.id, form.value.name, form.value.description, form.value.price, 1)).subscribe();
    }
  }

  onAddNewTraining(){
    this.onSubmit(this.trainingForm);
    this.router.navigateByUrl('admin');
  }

  onUpdateTraining(){
    this.onSubmit(this.trainingForm);
    this.router.navigateByUrl('admin');
  }
}
