import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlantaListResponse } from '../model/plantaListResponse';
import { Observable } from 'rxjs';
import { PlantaDTO } from '../model/plantaDto';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {

  //private apiUrl = 'http://localhost:8080/api/plantas'; 
  private apiUrl = 'https://challenge-techforb-backend.onrender.com/api/plantas'; 

  constructor(private http: HttpClient) {}

  obtenerTodasLasPlantas(): Observable<PlantaListResponse[]> {
    return this.http.get<PlantaListResponse[]>(this.apiUrl+"/all");
  }

  crearPlanta(plantaDTO: PlantaDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, plantaDTO);
  }

  obtenerPaises(): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  editarPlanta(id: number, plantaDTO: PlantaDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, plantaDTO);
  }

  getLecturas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lecturas`);
  }

  getAlertMedias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alertas-medias`);
  }

  getAlertasRojas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alertas-rojas`);
  }

  getAllSensoresDeshabilitados(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sensores-deshabilitados`);
  }

}
