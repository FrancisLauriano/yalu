import readline from 'readline-sync';
import {MetodosBancoDeEmprestimo} from '../2-Metodos_Banco/MetodosBancoDeEmprestimo.js';

// Classe para o menu de empréstimos
class MenuEmprestimos {
	constructor() {
		this.bancoDeEmprestimos = new MetodosBancoDeEmprestimo();
	}

	aguardarEnter() {
		console.log('Pressione Enter para continuar...');
		readline.question('');
	  }

	iniciar() {
		while (true) {
			console.log('\n*** REGISTRO DE EMPRESTIMO DE INSTRUMENTO ***');
			console.log('OPÇÃO:');
			console.log('1. Emprestar Instrumento');
			console.log('2. Devolver Instrumento');
			console.log('3. Buscar Emprestimo');
			console.log('4. Localizar ultimo empréstimo do Instrumento');
			console.log('5. Listar todos empréstimos do Instrumento');
			console.log('6. Listar Empréstimo em aberto');
			console.log('7. Listar Instrumentos disponíveis para Empréstimo');
			console.log('0. Sair');
			console.log('**********************************************');
			const opcao = readline.questionInt('Escolha uma opção: ');

			switch (opcao) {
				case 1:
					this.bancoDeEmprestimos.emprestarInstrumento();
					this.aguardarEnter()
					continue;

				case 2:
					this.bancoDeEmprestimos.devolverInstrumento();
					this.aguardarEnter()
					continue;

				case 3:
					this.bancoDeEmprestimos.buscarEmprestimo();
					this.aguardarEnter()
					continue;

				case 4:
					this.bancoDeEmprestimos.buscarUltimoEmprestimoDoInstrumento();
					this.aguardarEnter()
					continue;

				case 5:
					this.bancoDeEmprestimos.listarEmprestimosDoInstrumento();
					this.aguardarEnter()
					continue;

				case 6:
					this.bancoDeEmprestimos.listarEmprestimosEmAberto();
					this.aguardarEnter()
					continue;

				case 7:
					this.bancoDeEmprestimos.listarInstrumentosDisponiveis();
					this.aguardarEnter()
					continue;

				case 0:
					console.log('Encerrando o programa');
					return;

				default:
					console.log('Opção inválida. Por favor, escolha uma opção válida.');
					break;
			}

		}
	}
}

export {MenuEmprestimos};
