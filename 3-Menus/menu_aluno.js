import readline from 'readline-sync';
import {MetodosBancoDeAlunos} from '../2-Metodos_Banco/MetodosBancoDeAluno.js'

// Classe para o menu do Aluno
class MenuAluno {
    constructor() {
      this.bancoDeAlunos = new MetodosBancoDeAlunos();
    }

    iniciar() {
      while (true) {
        console.log('\n********** MENU DO ALUNO **********');
        console.log('1. Cadastrar Aluno');
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d031b04 (19-09-2023)
        console.log('2. Listar todos os Alunos');
				console.log('3. Listar Alunos por Turma');
        console.log('4. Buscar Aluno por Nome ou Email');
        console.log('5. Atualizar Aluno');
        console.log('6. Deletar Aluno');
<<<<<<< HEAD
=======
        console.log('2. Listar Alunos');
        console.log('3. Buscar Aluno por Nome ou Email');
        console.log('4. Atualizar Aluno');
        console.log('5. Deletar Aluno');
>>>>>>> b330d95 (PRINCIPAL-PROGRAMA)
=======
>>>>>>> d031b04 (19-09-2023)
        console.log('0. Voltar');
        console.log('*******************************************');
        const opcaoAluno = readline.questionInt('Escolha uma opção: ');

        switch (opcaoAluno) {
          case 1:
            this.bancoDeAlunos.cadastrarAluno();
            break;
          case 2:
            this.bancoDeAlunos.listarAlunos();
            break;
          case 3:
<<<<<<< HEAD
<<<<<<< HEAD
            this.bancoDeAlunos.listarAlunosPorTurma();
            break;
          case 4:
						this.bancoDeAlunos.buscarAluno();
            break;
          case 5:
						this.bancoDeAlunos.atualizarAluno();
						break;
					case 6:
						this.bancoDeAlunos.deletarAluno();
=======
            this.bancoDeAlunos.buscarAluno();
=======
            this.bancoDeAlunos.listarAlunosPorTurma();
>>>>>>> d031b04 (19-09-2023)
            break;
          case 4:
						this.bancoDeAlunos.buscarAluno();
            break;
          case 5:
<<<<<<< HEAD
            this.bancoDeAlunos.deletarAluno();
>>>>>>> b330d95 (PRINCIPAL-PROGRAMA)
=======
						this.bancoDeAlunos.atualizarAluno();
						break;
					case 6:
						this.bancoDeAlunos.deletarAluno();
>>>>>>> d031b04 (19-09-2023)
            break;
          case 0:
            console.log('Voltando ao menu principal.');
            return;
          default:
            console.log('Opção inválida.');
            break;
        }
      }
    }
  }

  export {MenuAluno};


