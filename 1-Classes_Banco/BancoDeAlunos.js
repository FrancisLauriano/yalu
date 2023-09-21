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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 98221a0 (19-09-2023)
=======
>>>>>>> d031b04 (19-09-2023)
=======
>>>>>>> d8bec22bde952bcdfa3aec5de77760a740d48893
	listarAlunosPorTurma() {

	}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c11d00f (PRINCIPAL-PROGRAMA)
=======
>>>>>>> 98221a0 (19-09-2023)
=======
>>>>>>> b330d95 (PRINCIPAL-PROGRAMA)
=======
>>>>>>> d031b04 (19-09-2023)
=======
>>>>>>> d8bec22bde952bcdfa3aec5de77760a740d48893
  atualizarAluno() {

  }

  deletarAluno() {

  }

  buscarAlunoPorMatricula(matricula) {

	}

}


export {BancoDeAlunos};
