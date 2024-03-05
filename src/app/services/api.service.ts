import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Training } from '../model/training.model';

@Injectable({
  providedIn: 'root'
})
export class apiService {

  constructor(private http: HttpClient) { }

  public getTrainings(){
    return this.http.get<Training[]>(environment.host + "/trainings");
  }

  public getTraining(id : number){
    return this.http.get<Training[]>(environment.host + "/trainings" + id)
  }
}
