import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../../app-core/service/tarefa.service";
import {Tarefa} from "../../app-core/model/tarefa";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $ : any;
import Swal from "sweetalert2";
import {error} from "@angular/compiler-cli/src/transformers/util";



@Component({
  selector: 'app-visualizar-tarefas',
  templateUrl: './visualizar-tarefas.component.html',
  styleUrls: ['./visualizar-tarefas.component.css']
})
export class VisualizarTarefasComponent implements OnInit {

  tarefas: Tarefa[] = [];
  form: FormGroup;
  loading: boolean = true;
  tarefaVisualizar: any;

  constructor(private tarefaService: TarefaService,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      tituloTarefa: ['',Validators.required],
      dataInicioTarefa: ['', Validators.required],
      dataConclusaoTarefa: ['', Validators.required],
      statusTarefa: ['', Validators.required],
      descricaoTarefa: ['', Validators.required],
      id: [0],
    });

  }

  ngOnInit(): void {
    this.listartarefas();
  }

  listartarefas(){
    this.loading= true;
    this.tarefaService.buscarTarefas()
      .then(reposta => {
        this.tarefas= reposta;
        this.loading=false;
      });
  }

  openModal(){
    $('#add-tarefa').modal('show');
  }

  closeModal(){
    $('#add-tarefa').modal('hide');
  }

  submitForm(){
    if(this.form.value.id > 0){
      //VAMOS CHAMAR A FUNÇÃO DE EDITAR A TAREFA
      this.editarTarefa();
    }else{
      //VAMOS CHAMAR A FUNÇÃO DE SALVAR A TAREFA
      this.salvarTarefa();
    }
  }

  salvarTarefa(){
    if(this.form.valid){
      const novaTarefa: Tarefa =
        new Tarefa(
          this.form.value.tituloTarefa,
          this.form.value.dataInicioTarefa,
          this.form.value.dataConclusaoTarefa,
          this.form.value.statusTarefa,
          this.form.value.descricaoTarefa);

      this.tarefaService.adicionarTarefa(novaTarefa)
        .then(reposta => {
            if(reposta > 0){
              Swal.fire('Sucesso!', 'Tarefa Salva com sucesso!',
                         'success');
              this.form.reset();
              this.closeModal();
              this.listartarefas();
            }
        }).catch(respostaErro => {
        Swal.fire('Não foi dessa vez!', 'Não foi possível salvar' +
          ' a tarefa, tente novamente mais tarde.', 'error');
        console.log(respostaErro);
      });

    }else{
      console.log("CAMPOS INVALIDOS ENCONTRADOS");
      Swal.fire("Atenção!", "Alguns campos do formulário" +
                " não estão corretos.", 'warning');
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

  setTarefaAtual(t: Tarefa){

    this.tarefaVisualizar = t;
  }

  excluirTarefa(id: number){
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Sim, deletar tarefa!',
      confirmButtonColor: '#3085d6'
    }).then(tipoBotao => {
      if (tipoBotao.isConfirmed) {
        this.tarefaService.removerTarefa(id)
          .then(() => {
            Swal.fire({
              title: 'Deletado!',
              text: 'A tarefa foi deletada com sucesso!',
              icon: 'success',
            });
            this.listartarefas();
          })
      }
    }).catch(error => {
      console.log(error);
      Swal.fire('Ops!', 'A tarefa não foi deletada, ' +
        'tente novamente mais tarde. ' +
        'Caso persistir contate o suporte.', 'warning');
    })
  }

  carregarDadosTarefa(tarefa: Tarefa){
    this.form.patchValue({
      tituloTarefa: tarefa.titulo,
      dataInicioTarefa: tarefa.dataInicio,
      dataConclusaoTarefa: tarefa.dataConclusao,
      statusTarefa: tarefa.status,
      descricaoTarefa: tarefa.descricao,
      id: tarefa.id
    });

    this.openModal();
  }

  editarTarefa(){
    if(this.form.valid){
      const editarTarefa: Tarefa = new Tarefa(
        this.form.value.tituloTarefa,
        this.form.value.dataInicioTarefa,
        this.form.value.dataConclusaoTarefa,
        this.form.value.statusTarefa,
        this.form.value.descricaoTarefa
      );
      this.tarefaService.
       atualizarTarefa(this.form.value.id,editarTarefa).then(
        reposta => {
          if(reposta === 1){
            Swal.fire('Sucesso!',
                      'Tarefa editada com sucesso!',
                      'success');
            this.form.reset();
            this.closeModal();
            this.listartarefas();
          }else{
            Swal.fire('Atenção',
                      'Nenhuma tarefa encontrada ou ' +
                      'nenhuma alteração realizada',
                      'info');
          }
      }).catch(error => {
        Swal.fire('Cuidado!',
                  'Não foi possível editar a tarefa',
                  'error');
      });
    }else{
      Swal.fire('Cuidado!',
                'Alguns campos estão incorretos!',
                'warning');
      this.marcarTodosComoClicados();
    }
  }
}
