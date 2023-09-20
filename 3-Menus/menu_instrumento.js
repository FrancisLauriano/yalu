import readline from 'readline-sync';
import {MetodosBancoDeInstrumento} from '../2-Metodos_Banco/MetodosBancoDeInstrumento.js';

class MenuInstrumento {
  constructor() {
    this.bancoDeInstrumento = new MetodosBancoDeInstrumento();
  }

  pausarAtePressionarEnter() {
    console.log('Pressione Enter para continuar...');
    readline.question('');
  }

  // Função para o menu do Instrumento
  iniciar() {
    let idDigitado
    while (true) {
      console.log('\n************* MENU INSTRUMENTO *************');
      console.log('1. Criar instrumento');
      console.log('2. Listar instrumentos');
      console.log('3. Buscar instrumento');
      console.log('4. Atualizar instrumento');
      console.log('5. Deletar instrumento');
      console.log('6. Listar instrumentos por tipo');
      console.log('7. Listar instrumentos por situação de manutenção');
      console.log('8. Listar instrumentos por situação de empréstimo');
      console.log('0. Voltar');
      console.log('********************************************');
      let opcaoInstrumento = readline.questionInt('Escolha uma opção: ');


      switch (opcaoInstrumento) {
        case 1:
          this.bancoDeInstrumento.cadastrarInstrumento();
          break;
        case 2:
          this.bancoDeInstrumento.listarInstrumentos();
          break;
        case 3:
          idDigitado = this.bancoDeInstrumento.pedirId();
          try {
            if (idDigitado !== 0) {
              this.bancoDeInstrumento.buscarEMostrarInstrumentoPorId(idDigitado);
              this.pausarAtePressionarEnter();
              //readline.keyInPause();
            } else {
              console.log('\t...cancelando...')
            }
          } catch (error) {
            console.log(error.message)
          }
          break;
        case 4:
          idDigitado = this.bancoDeInstrumento.pedirId();
          try {
            if (idDigitado !== 0) {
              this.bancoDeInstrumento.atualizarInstrumentoPorId(idDigitado);
            } else {
              console.log('\t...cancelando...')
            }
          } catch (error) {
            console.log(error.message)
          }
          break;
        case 5:
          idDigitado = this.bancoDeInstrumento.pedirId();
          try {
            if (idDigitado !== 0) {
              this.bancoDeInstrumento.deletarInstrumentoPorId(idDigitado);
            } else {
              console.log('\t...cancelando...')
            }
          } catch (error) {
            console.log(error.message)
          }
          break;
        case 6:
          console.log('\nVoce deseja ver a relação de qual instrumento?')
          this.bancoDeInstrumento.listarInstrumentoPorTipo(this.bancoDeInstrumento.pedirTipoInstrumento());
          break;
        case 7:
          console.log('\nVoce deseja ver a relação de instrumentos em qual condição?')
          this.bancoDeInstrumento.listarInstrumentoPorDisponibilidade(this.bancoDeInstrumento.pedirDisponibilidadeInstrumento());
          break;
        case 8:
          console.log('\nVoce deseja ver a relação de instrumentos em qual situação de empréstimo?')
          this.bancoDeInstrumento.listarInstrumentoPorSituacaoEmprestimo(this.bancoDeInstrumento.pedirEmprestadoInstrumento());
          break;
        case 0:
          console.log('\nVoltando ao menu principal.');
          return; // retornar ao menu principal
        default:
          console.log('Opção inválida.');
          break;
      }
    }
  }

}
export {MenuInstrumento};
