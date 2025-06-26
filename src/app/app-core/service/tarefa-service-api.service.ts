import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Tarefa} from "../model/tarefa";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TarefaServiceApiService {

  private apiUrl = 'http://localhost:8080/api/tarefa';

  constructor(private http: HttpClient) { }

  buscarTarefa(): Observable<Tarefa[]>{
    return this.http.get<Tarefa[]>(this.apiUrl + '/buscar');
  }

  salvarTarefa(tarefa: Tarefa): Observable<Tarefa>{
    return this.http
      .post<Tarefa>(this.apiUrl+ '/cadastrar-tarefa', tarefa);
  }

}
