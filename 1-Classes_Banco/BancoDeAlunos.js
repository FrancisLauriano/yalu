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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e4468fb (19-09-2023)
	listarAlunosPorTurma() {

	}

<<<<<<< HEAD
=======
>>>>>>> c11d00f (PRINCIPAL-PROGRAMA)
=======
>>>>>>> e4468fb (19-09-2023)
=======
>>>>>>> c11d00f (PRINCIPAL-PROGRAMA)
  atualizarAluno() {

  }

  deletarAluno() {

  }

  buscarAlunoPorMatricula(matricula) {

	}

}


export {BancoDeAlunos};
