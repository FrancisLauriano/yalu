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
>>>>>>> d031b04 (19-09-2023)
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e4468fb (19-09-2023)
=======
>>>>>>> bce8997368b82c9a94fbb71bd0594c0e9e6c50f7
=======
>>>>>>> 98221a0 (19-09-2023)
=======
>>>>>>> d031b04 (19-09-2023)
<<<<<<< HEAD
=======
=======
>>>>>>> d8bec22bde952bcdfa3aec5de77760a740d48893
>>>>>>> bce8997368b82c9a94fbb71bd0594c0e9e6c50f7
>>>>>>> 48443fd7d6b764b45687222d3b931f40eb878619
	listarAlunosPorTurma() {

	}

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c11d00f (PRINCIPAL-PROGRAMA)
=======
>>>>>>> e4468fb (19-09-2023)
=======
>>>>>>> bce8997368b82c9a94fbb71bd0594c0e9e6c50f7
=======
>>>>>>> c11d00f (PRINCIPAL-PROGRAMA)
=======
>>>>>>> 98221a0 (19-09-2023)
>>>>>>> 48443fd7d6b764b45687222d3b931f40eb878619
=======
>>>>>>> b330d95 (PRINCIPAL-PROGRAMA)
=======
>>>>>>> d031b04 (19-09-2023)
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
>>>>>>> d8bec22bde952bcdfa3aec5de77760a740d48893
>>>>>>> bce8997368b82c9a94fbb71bd0594c0e9e6c50f7
>>>>>>> 48443fd7d6b764b45687222d3b931f40eb878619
  atualizarAluno() {

  }

  deletarAluno() {

  }

  buscarAlunoPorMatricula(matricula) {

	}

}


export {BancoDeAlunos};
