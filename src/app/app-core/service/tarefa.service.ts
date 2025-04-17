import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private tarefas: string[] = [];

  constructor() { }

  addTarefa(tarefa: string){
    this.tarefas.push(tarefa);
    console.log("TAREFAS CADASTRADAS: ", this.tarefas);
  }
}
