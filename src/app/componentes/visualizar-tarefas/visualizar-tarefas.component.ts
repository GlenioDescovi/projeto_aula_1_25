import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../../app-core/service/tarefa.service";
import {Tarefa} from "../../app-core/model/tarefa";
declare var $ : any;

@Component({
  selector: 'app-visualizar-tarefas',
  templateUrl: './visualizar-tarefas.component.html',
  styleUrls: ['./visualizar-tarefas.component.css']
})
export class VisualizarTarefasComponent implements OnInit {

  tarefas: Tarefa[] = [];

  constructor(private tarefaService: TarefaService) {
    this.tarefas= tarefaService.popularTabelaTeste();
  }

  ngOnInit(): void {

  }

  addtarefa(){
    this.tarefaService.addTarefa("TAREFA ");
    //this.i++;
  }

  openModal(){
    $('#add-tarefa').modal('show');
  }

  closeModal(){
    $('#add-tarefa').modal('hide');
  }

}
