import { Injectable } from '@angular/core';
import {Tarefa} from "../model/tarefa";
import Dexie from "dexie";


@Injectable({
  providedIn: 'root'
})
export class TarefaService extends Dexie{

  tarefas: Dexie.Table<Tarefa,number>;

  constructor() {
    super('TarefaDB');
    this.version(1).stores({
      tarefas: '++id, titulo, dataInicio, dataConclusao,' +
        'status, descricao'
    });
    this.tarefas = this.table('tarefas')
  }

  async buscarTarefas(): Promise<Tarefa[]> {
    return await this.tarefas.toArray();
  }

  async adicionarTarefa(tarefa: Tarefa): Promise<number>{
    return await this.tarefas.add(tarefa);
  }

}
