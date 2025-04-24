export class Tarefa {

  id: number;
  titulo: string;
  dataInicio: string;
  dataConclusao: string;
  status: string;
  descricao: string;

  constructor(titulo: string,
              dataInicio: string,
              dataConclusao: string,
              status: string,
              descricao: string,
              id: number) {

    this.titulo = titulo;
    this.dataInicio = dataInicio;
    this.dataConclusao = dataConclusao;
    this.status = status;
    this.descricao = descricao;
    this.id = id;
  }
}
