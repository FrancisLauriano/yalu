import readline from 'readline-sync';



// Classe banco de Emprestimos
class BancoDeEmprestimo {
  constructor() {
    if (BancoDeEmprestimo.instance) {
      return BancoDeEmprestimo.instance;
    }
    this.emprestimos = [];
    this.idEmprestimoAnterior = 0

		BancoDeEmprestimo.instance = this;
  }

  emprestarInstrumento() {

  }

	devolverInstrumento() {

	}

  buscarEmprestimo() {

  }

  buscarUltimoEmprestimoDoInstrumento() {

  }

  listarEmprestimosDoInstrumento() {

  }

  listarEmprestimosEmAberto() {

  }

  listarInstrumentosDisponiveis() {

  }

  sinalizarEmprestimo(idInstrumento) {

  }

  sinalizarDevolucao(idInstrumento) {

  }
}

export {BancoDeEmprestimo};

