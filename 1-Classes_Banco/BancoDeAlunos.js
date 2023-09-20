import readline from 'readline-sync';

class BancoDeAlunos {
  constructor() {
    if (BancoDeAlunos.instance) {
      return BancoDeAlunos.instance;
    }
    this.alunos = [];
    BancoDeAlunos.instance = this;
  }

  validarEntradaDeDados(dados, camposObrigatorios) {

  }

  emailJaCadastrado(email) {

  }

  cadastrarAluno() {

	}

  listarAlunos() {

  }

  buscarAluno() {

  }

<<<<<<< HEAD
	listarAlunosPorTurma() {

	}

=======
>>>>>>> b330d95 (PRINCIPAL-PROGRAMA)
  atualizarAluno() {

  }

  deletarAluno() {

  }

  buscarAlunoPorMatricula(matricula) {

	}

}


export {BancoDeAlunos};
