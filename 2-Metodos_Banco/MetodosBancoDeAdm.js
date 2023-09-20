import readline from 'readline-sync';
import { BancoDeAdm } from '../1-Classes_Banco/BancoDeAdm.js';


//classe ADM
	class MetodosBancoDeAdm extends BancoDeAdm {
		constructor() {
			if (MetodosBancoDeAdm.instance) {
				return MetodosBancoDeAdm.instance;
			}
			super();
			MetodosBancoDeAdm.instance = this;
		}

  // Método para validar entrada de dados
  validarEntradaDeDados(dados, camposObrigatorios) {
    for (const campo of camposObrigatorios) {
      if (!dados[campo]) {
        console.log(`\nO campo '${campo}' é obrigatório.`);
        return false;
      }
    }
    return true;
  }


	// Método para verificar se o email já está cadastrado
  emailJaCadastrado(email) {
    return this.Adms.some((adm) => adm.email === email);
  }


	// Método para validar a senha
	validarSenha(senha) {
		const senhaRegex = /^\d{4,6}$/; // Senha com 4 a 6 dígitos numéricos
		return senhaRegex.test(senha);
	}


  // Método para criar um ADM com validação de entrada de dados
	cadastrarAdm() {
    console.log('\n** Cadastrar ADM **');
    const novoAdm = {
			id: this.Adms.length +1,
      nome: readline.question('Digite o nome do ADM: ').toLowerCase(),
      email: readline.question('Digite o email do ADM: ').toLowerCase(),
      senha: readline.question('Digite a senha do ADM (senha deverá ter de 4 à 6 digitos numéricos): '),
    };

    if (this.validarEntradaDeDados(novoAdm, ['nome', 'email', 'senha'])) {
			try {
					if (this.emailJaCadastrado(novoAdm.email)) { // validação de email
							console.log('\nEmail já cadastrado. Não é possível criar o ADM.');
					} else {
							if (this.validarSenha(novoAdm.senha)) {  // validação de senha
									this.Adms.push(novoAdm); // Adicionar o ADM ao repositório
									console.log(`\nADM cadastrado com sucesso:\nID: ${novoAdm.id}\nNome: ${novoAdm.nome}\nEmail: ${novoAdm.email}\nSenha: ${novoAdm.senha}`);
							} else {
									console.log('\nA senha não atende aos critérios de validação.');
							}
					}
			} catch (error) {
					console.error('\nErro ao cadastrar ADM:', error);
			}
	}
}


  // Método para listar ADMs
  listarAdms() {
    console.log('\n** Listar ADMs **');
    try {
      if (this.Adms.length > 0) {
        console.log('\nLista de ADMs:');
        this.Adms.forEach((adm, index) => {
          console.log(`ID: ${index + 1}, Nome: ${adm.nome}, Email: ${adm.email}`);
        });
      } else {
        console.log('\nNenhum ADM encontrado.');
      }
    } catch (error) {
      console.error('\nErro ao listar ADMs:', error);
    }
  }

// Método para buscar ADMs por Nome ou Email com base no número máximo de ocorrências de uma substring
buscarAdmPorNomeOuEmail(buscaSubstring) {
	console.log('\n** Buscar ADMs por Nome ou Email **');
  buscaSubstring = readline.question('Digite o nome ou email do ADM que deseja buscar: ').toLowerCase();

  try {
    const admsEncontrados = this.Adms.filter((adm) => {
      const nomeOcorrencias = (adm.nome.match(new RegExp(buscaSubstring, 'gi')) || []).length;
      const emailOcorrencias = (adm.email.match(new RegExp(buscaSubstring, 'gi')) || []).length;

      // ocorrências de substring em ordem decrescente.
      return nomeOcorrencias + emailOcorrencias > 0;
    });

    if (admsEncontrados.length > 0) {
      console.log('\nADM(s) encontrado(s):');
      admsEncontrados.forEach((adm, index) => {
        console.log(`ID: ${index + 1}, Nome: ${adm.nome}, Email: ${adm.email}`);
      });
    } else {
      console.log(`\nNenhum ADM encontrado com o nome ou email fornecido. "${buscaSubstring}".`);
    }
  } catch (error) {
    console.error('\nErro ao buscar ADMs por nome ou email:', error);
  }
}

  // Método para atualizar ADM
  atualizarAdm() {
    console.log('\n** Atualizar ADM **');
    const nomeOuEmail = readline.question('Digite o nome ou email do ADM que deseja atualizar: ').toLowerCase();

    try {
      // Procurar o ADM com base no nome ou email fornecido
      const admParaAtualizar = this.Adms.find(
        (adm) => adm.nome === nomeOuEmail || adm.email === nomeOuEmail
      );

      if (!admParaAtualizar) {
        console.log('\nADM não encontrado para atualização.');
        return;
      }

      // Mostrar os dados atuais do ADM
      console.log('Dados atuais do ADM:');
      console.log(`Nome: ${admParaAtualizar.nome}`);
      console.log(`Email: ${admParaAtualizar.email}`);
      console.log(`Senha: ${admParaAtualizar.senha}`);

      console.log('\nO que deseja atualizar?');
      console.log('1. Nome');
      console.log('2. Email');
      console.log('3. Senha');
      console.log('0. Cancelar');
      const opcao = readline.questionInt('Escolha uma opção: ');

      switch (opcao) {
        case 1:
          const novoNome = readline.question('Digite o novo nome (ou pressione Enter para manter o mesmo): ').toLowerCase();
          if (novoNome) {
            admParaAtualizar.nome = novoNome;
            console.log('\nNome atualizado com sucesso.');
          } else {
            console.log('\nNome não atualizado.');
          }
          break;
        case 2:
          const novoEmail = readline.question('Digite o novo email (ou pressione Enter para manter o mesmo): ').toLowerCase();
          if (novoEmail) {
            if (novoEmail !== admParaAtualizar.email && this.emailJaCadastrado(novoEmail)) {
              console.log('\nEmail já cadastrado para outro ADM. Não é possível atualizar.');
            } else {
              admParaAtualizar.email = novoEmail;
              console.log('\nEmail atualizado com sucesso.');
            }
          } else {
            console.log('\nEmail não atualizado.');
          }
          break;
        case 3:
          const novaSenha = readline.question('Digite a nova senha (de 4 a 6 dígitos numéricos ou pressione Enter para manter a mesma): ');
					if (novaSenha === '') {
							break;
					}
					if (this.validarSenha(novaSenha)) { //  validação de senha
							admParaAtualizar.senha = novaSenha;
							console.log('\nSenha atualizada com sucesso.');
					} else {
							console.log('\nA senha não atende aos critérios de validação.');
					}
					break;
        case 0:
          console.log('\nOperação de atualização cancelada.');
          break;
        default:
          console.log('\nOpção inválida.');
          break;
      }
    } catch (error) {
      console.error('\nErro ao atualizar ADM:', error);
    }
  }

  // Método para deletar ADM
  deletarAdm() {
    console.log('\n** Deletar ADM **');
    const nomeOuEmail = readline.question('Digite o nome ou email do ADM que deseja deletar: ').toLowerCase();

    try {
      // Procurar o ADM com base no nome ou email
      const admParaDeletar = this.Adms.find(
        (adm) => adm.nome === nomeOuEmail || adm.email === nomeOuEmail
      );

      if (!admParaDeletar) {
        console.log('\nADM não encontrado para exclusão.');
        return;
      }

      // Mostrar os dados do ADM antes da exclusão
      console.log('Dados do ADM a ser deletado:');
      console.log(`Nome: ${admParaDeletar.nome}`);
      console.log(`Email: ${admParaDeletar.email}`);
      console.log(`Senha: ${admParaDeletar.senha}`);

      console.log('\nDeseja realmente excluir este ADM?');
      console.log('1. Sim');
      console.log('2. Não');
      const confirmaDelecao = readline.questionInt('Escolha uma opção: ');

      if (confirmaDelecao === 1) {
        const index = this.Adms.indexOf(admParaDeletar);
        if (index !== -1) {
          this.Adms.splice(index, 1);
          console.log('\nADM removido com sucesso!');
        } else {
          console.log('\nErro ao remover ADM.');
        }
      } else if (confirmaDelecao === 2) {
        console.log('\nOperação de exclusão cancelada.');
      } else {
        console.log('\nOpção inválida. Nenhum dado foi removido.');
      }
    } catch (error) {
      console.error('\nErro ao deletar ADM:', error);
    }
  }
}

export {MetodosBancoDeAdm};
