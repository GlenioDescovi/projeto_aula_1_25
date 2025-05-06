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
    if(this.form.valid){
      console.log(this.form.value);
      console.log("CADASTRO REALIZADO COM SUCESSO");
      this.form.reset();

    }else{
      console.log("CAMPOS INVALIDOS ENCONTRADOS");
      this.marcarTodosComoClicados();
    }
  }

  marcarTodosComoClicados(){
    Object.values(this.form.controls)
      .forEach(campo => {
        campo.markAsTouched();
      });
  }

  isCampoValido(inputName: string): boolean {
    const campo: any = this.form.get(inputName);
    return campo && campo.touched && campo.invalid;
  }

}
