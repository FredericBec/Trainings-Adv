import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { environment } from 'src/environments/environment';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Injection du protocole http
  constructor(private http : HttpClient) { }

  /**
   * Requête permettant la récupération de la liste des formations depuis la base de données
   * @returns un observable<Training[]>
   */
  public getTrainings(){
    return this.http.get<Training[]>(environment.host + "/trainings");
  }

  /**
   * Requête permettant de récupérer une formation depuis la base de données
   * @param id de la formation
   * @returns un observable<Training>
   */
  public getTraining(id : number){
    return this.http.get<Training>(environment.host + "/trainings/" + id);
  }

  /**
   * Requête permettant d'ajouter une formation à la base de données
   * @param training formation ajoutée
   * @returns un observable<Training>
   */
  public addNewTraining(training : Training){
    return this.http.post<Training>(environment.host + "/trainings", training);
  }

  /**
   * Requête permettant de mettre à jour une formation
   * @param training formation à mettre à jour
   * @param id de la formation mise à jour
   * @returns un observable<Training>
   */
  public updateTraining(training : Training, id :number){
    return this.http.put<Training>(environment.host + "/trainings/" + id, training);
  }

  /**
   * Requête permettant de supprimer une formation
   * @param id de la formation à supprimer
   * @returns un observable<Training>
   */
  public deleteTraining(id : number){
    return this.http.delete<Training>(environment.host + "/trainings/" + id);
  }

}
