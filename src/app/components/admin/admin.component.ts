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

  listTrainings : Training[] | undefined;
  error: any;
  constructor(private apiService : ApiService, private router : Router) { }

  ngOnInit(): void {
    this.getAllTrainings();
  }

  getAllTrainings(){
    this.apiService.getTrainings().subscribe({
      next : (data) => this.listTrainings = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    });
  }

  goToCreateForm(){
    this.router.navigateByUrl('training');
  }

  goToUpdateForm(training : Training){
    console.log(training);
    this.router.navigate(['/training', training.id]);
  }

  onDeleteTraining(id : number){
    this.apiService.deleteTraining(id).subscribe();
    this.getAllTrainings();
  }

}
