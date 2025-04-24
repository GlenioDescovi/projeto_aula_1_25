import { Injectable } from '@angular/core';
import {Tarefa} from "../model/tarefa";

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private tarefas: string[] = [];
  private tarefasTeste: Tarefa[] = [];

  constructor() { }

  addTarefa(tarefa: string){
    this.tarefas.push(tarefa);
    console.log("TAREFAS CADASTRADAS: ", this.tarefas);
  }

  popularTabelaTeste(): Tarefa[] {
    let tarefa: Tarefa = new Tarefa(
      'Estudar Angular',
      '24/04/2025',
      '24/05/2025',
      'Em andamento',
      'Essa tarefa é dstinada a estudar o framework Angular.',
      0);

    let tarefa2: Tarefa = new Tarefa(
      'Estudar Bootstrap',
      '17/04/2025',
      '30/05/2025',
      'Em andamento',
      'Essa tarefa é dstinada a estudar o framework Bootstrap.',
      0);

    let tarefa3: Tarefa = new Tarefa(
      'Desenvolver o Trabalho',
      '22/04/2025',
      '30/06/2025',
      'Nova',
      'Essa tarefa é dstinada a desenvolver o sistema de aula.',
      0);

    this.tarefasTeste.push(tarefa,
                           tarefa2,
                           tarefa3);

    return this.tarefasTeste;
  }
}
