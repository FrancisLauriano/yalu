import readline from 'readline-sync';


//classe ADM
class BancoDeAdm {
  constructor() {
    if (BancoDeAdm.instance) {
      return BancoDeAdm.instance;
    }
			this.Adms = [];

    BancoDeAdm.instance = this;
  }


  // Método para validar entrada de dados
  validarEntradaDeDados(dados, camposObrigatorios) {

  }


	// Método para verificar se o email já está cadastrado
  emailJaCadastrado(email) {

  }


	// Método para validar a senha
	validarSenha(senha) {

	}


  // Método para criar um ADM com validação de entrada de dados
	cadastrarAdm() {

}


  // Método para listar ADMs
  listarAdms() {

  }

// Método para buscar ADMs por Nome ou Email com base no número máximo de ocorrências de uma substring
	buscarAdmPorNomeOuEmail(buscaSubstring) {

}

  // Método para atualizar ADM
  atualizarAdm() {

  }

  // Método para deletar ADM
  deletarAdm() {

	}

}

export {BancoDeAdm};
