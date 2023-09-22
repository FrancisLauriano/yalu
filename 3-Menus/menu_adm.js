import readline from 'readline-sync';
import {MetodosBancoDeAdm} from '../2-Metodos_Banco/MetodosBancoDeAdm.js'


// Classe para o menu do Administrador - ADM
class MenuAdministrador {
  constructor() {
    this.bancoDeAdm = new MetodosBancoDeAdm();
  }

  iniciar() {
    while (true) {
      console.log('\n********** MENU ADMINISTRADOR **********');
      console.log('1. Criar ADM');
      console.log('2. Listar ADMs');
      console.log('3. Buscar ADM por Nome, Email ou ID');
      console.log('4. Atualizar ADM');
      console.log('5. Deletar ADM');
      console.log('0. Voltar');
      console.log('*******************************************');
      const opcaoAdm = readline.questionInt('Escolha uma opção: ');

      switch (opcaoAdm) {
        case 1:
          this.bancoDeAdm.cadastrarAdm();
          break;
        case 2:
          this.bancoDeAdm.listarAdms();
          break;
        case 3:
          this.bancoDeAdm.buscarAdm();
          break;
        case 4:
          this.bancoDeAdm.atualizarAdm();
          break;
        case 5:
          this.bancoDeAdm.deletarAdm();
          break;
        case 0:
          console.log('Voltando ao menu principal.');
          return; // retornar ao menu principal
        default:
          console.log('Opção inválida.');
          break;
      }
    }
  }
}

export {MenuAdministrador};
