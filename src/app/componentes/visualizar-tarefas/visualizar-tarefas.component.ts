import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../../app-core/service/tarefa.service";

@Component({
  selector: 'app-visualizar-tarefas',
  templateUrl: './visualizar-tarefas.component.html',
  styleUrls: ['./visualizar-tarefas.component.css']
})
export class VisualizarTarefasComponent implements OnInit {

  i: number =0;

  constructor(private tarefaService: TarefaService) {

  }

  ngOnInit(): void {
  }

  addtarefa(){
    this.tarefaService.addTarefa("TAREFA " + this.i);
    this.i++;
  }

}
