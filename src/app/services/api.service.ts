import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  public getTrainings(){
    return this.http.get<Training[]>(environment.host + "/trainings");
  }

  public getTraining(id : number){
    return this.http.get<Training>(environment.host + "/trainings/" + id);
  }

  public addNewTraining(training : Training){
    return this.http.post<Training>(environment.host + "/trainings", training);
  }

  public updateTraining(training : Training, id :number){
    return this.http.put<Training>(environment.host + "/trainings/" + id, training);
  }

  public deleteTraining(id : number){
    return this.http.delete<Training>(environment.host + "/trainings/" + id);
  }
}
