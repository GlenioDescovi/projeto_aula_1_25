import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../../app-core/service/tarefa.service";
import {Tarefa} from "../../app-core/model/tarefa";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $ : any;

@Component({
  selector: 'app-visualizar-tarefas',
  templateUrl: './visualizar-tarefas.component.html',
  styleUrls: ['./visualizar-tarefas.component.css']
})
export class VisualizarTarefasComponent implements OnInit {

  tarefas: Tarefa[] = [];
  form: FormGroup;

  constructor(private tarefaService: TarefaService,
              private fb: FormBuilder) {
    this.tarefas= tarefaService.popularTabelaTeste();

    this.form = this.fb.group({
      tituloTarefa: ['',Validators.required],
      dataInicioTarefa: ['', Validators.required],
      dataConclusaoTarefa: ['', Validators.required],
      statusTarefa: ['', Validators.required],
      descricaoTarefa: ['', Validators.required]
    });

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

  salvarTarefa(){
    console.log(this.form.value);
  }

}
