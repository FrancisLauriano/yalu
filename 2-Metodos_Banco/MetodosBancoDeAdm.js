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
      id: 1, //  lógica para gerar o ID aqui
      nome: readline.question('Digite o nome do ADM: ').toLowerCase(),
      email: readline.question('Digite o email do ADM: ').toLowerCase(),
      senha: readline.question('Digite a senha do ADM (senha deverá ter de 4 à 6 dígitos numéricos): '),
    };

    // Lógica para gerar o ID
    if (this.Adms.length === 0) {
      novoAdm.id = 1;
    } else {
      novoAdm.id = this.Adms[this.Adms.length - 1].id + 1;
    }

    if (this.validarEntradaDeDados(novoAdm, ['nome', 'email', 'senha'])) {
      try {
        if (this.emailJaCadastrado(novoAdm.email)) {
          console.log('\nEmail já cadastrado. Não é possível criar o ADM.');
        } else {
          if (this.validarSenha(novoAdm.senha)) {
            this.Adms.push(novoAdm);
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

  listarAdms() {
    console.log('\n** Listar ADMs **');
    try {
      if (this.Adms.length > 0) {
        console.log('\nLista de ADMs:');
        this.Adms.forEach((adm, index) => {
          console.log(`ID: ${adm.id}, Nome: ${adm.nome}, Email: ${adm.email}`);
        });
      } else {
        console.log('\nNenhum ADM encontrado.');
      }
    } catch (error) {
      console.error('\nErro ao listar ADMs:', error);
    }
  }


  buscarAdm(buscaSubstring) {
    console.log('\n** Buscar ADM **');
    buscaSubstring = readline.question('Digite o nome, email ou ID do ADM que deseja buscar: ').toLowerCase();

    try {
      const admsEncontrados = this.Adms.filter((adm) => {
        if (!isNaN(buscaSubstring)) { // Verifica se a entrada é um número (ID)
          return adm.id === parseInt(buscaSubstring);
        } else {
          const nomeOcorrencias = (adm.nome.match(new RegExp(buscaSubstring, 'gi')) || []).length;
          const emailOcorrencias = (adm.email.match(new RegExp(buscaSubstring, 'gi')) || []).length;
          return nomeOcorrencias + emailOcorrencias > 0;
        }
      });

      if (admsEncontrados.length > 0) {
        console.log('\nADM(s) encontrado(s):');
        admsEncontrados.forEach((adm) => {
          console.log(`ID: ${adm.id}, Nome: ${adm.nome}, Email: ${adm.email}`);
        });
      } else {
        console.log(`\nNenhum ADM encontrado com o nome, email ou ID fornecido. "${buscaSubstring}".`);
      }
    } catch (error) {
      console.error('\nErro ao buscar ADM:', error);
    }
  }

  atualizarAdm() {
    console.log('\n** Atualizar ADM **');
    const buscaSubstring = readline.question('Digite o nome, email ou ID do ADM que deseja atualizar: ').toLowerCase();

    try {
      // Filtrar ADMs com base na substring fornecida
      const admsEncontrados = this.Adms.filter((adm) => {
        if (!isNaN(buscaSubstring)) { // Verifica se a entrada é um número (ID)
          return adm.id === parseInt(buscaSubstring);
        } else {
          return adm.nome.includes(buscaSubstring) || adm.email.includes(buscaSubstring);
        }
      });

      if (admsEncontrados.length === 0) {
        console.log(`\nNenhum ADM encontrado com a busca: "${buscaSubstring}".`);
        return;
      }

      // Mostrar os ADMs encontrados
      console.log('\nADM(s) encontrado(s):');
      admsEncontrados.forEach((adm) => {
        console.log(`ID: ${adm.id}, Nome: ${adm.nome}, Email: ${adm.email}`);
      });

      const opcao = readline.questionInt('Escolha o ID do ADM que deseja atualizar ou digite 0 para cancelar: ');

      if (opcao === 0) {
        console.log('\nOperação de atualização cancelada.');
        return;
      }

      const admParaAtualizar = admsEncontrados.find((adm) => adm.id === opcao);

      if (!admParaAtualizar) {
        console.log('\nADM não encontrado para atualização.');
        return;
      }

      // Mostrar os dados atuais do ADM selecionado
      console.log('\nDados atuais do ADM:');
      console.log(`ID: ${admParaAtualizar.id}`);
      console.log(`Nome: ${admParaAtualizar.nome}`);
      console.log(`Email: ${admParaAtualizar.email}`);
      console.log(`Senha: ${admParaAtualizar.senha}`);

      console.log('\nO que deseja atualizar?');
      console.log('1. Nome');
      console.log('2. Email');
      console.log('3. Senha');
      console.log('0. Cancelar');
      const escolha = readline.questionInt('Escolha uma opção: ');

      switch (escolha) {
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
          const novaSenha = readline.question('Digite a nova senha (senha deverá ter de 4 à 6 dígitos numéricos) ou pressione Enter para manter a mesma senha: ');
          if (novaSenha) {
            if (this.validarSenha(novaSenha)) {
              admParaAtualizar.senha = novaSenha;
              console.log('\nSenha atualizada com sucesso.');
            } else {
              console.log('\nA senha não atende aos critérios de validação.');
            }
          } else {
            console.log('\nSenha não atualizada.');
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

  deletarAdm() {
    console.log('\n** Deletar ADM **');
    const buscaSubstring = readline.question('Digite o nome, email ou ID do ADM que deseja deletar: ').toLowerCase();

    try {
      // Filtrar ADMs com base na substring fornecida
      const admsEncontrados = this.Adms.filter((adm) => {
        if (!isNaN(buscaSubstring)) { // Verifica se a entrada é um número (ID)
          return adm.id === parseInt(buscaSubstring);
        } else {
          return adm.nome.includes(buscaSubstring) || adm.email.includes(buscaSubstring);
        }
      });

      if (admsEncontrados.length === 0) {
        console.log(`\nNenhum ADM encontrado com a busca: "${buscaSubstring}".`);
        return;
      }

      // Mostrar os ADMs encontrados
      console.log('\nADM(s) encontrado(s):');
      admsEncontrados.forEach((adm) => {
        console.log(`ID: ${adm.id}, Nome: ${adm.nome}, Email: ${adm.email}`);
      });

      const opcao = readline.questionInt('Escolha o ID do ADM que deseja deletar ou digite 0 para cancelar: ');

      if (opcao === 0) {
        console.log('\nOperação de exclusão cancelada.');
        return;
      }

      const admParaDeletar = admsEncontrados.find((adm) => adm.id === opcao);

      if (!admParaDeletar) {
        console.log('\nADM não encontrado para exclusão.');
        return;
      }

      // Mostrar os dados do ADM a ser deletado
      console.log('\nDados do ADM a ser deletado:');
      console.log(`ID: ${admParaDeletar.id}`);
      console.log(`Nome: ${admParaDeletar.nome}`);
      console.log(`Email: ${admParaDeletar.email}`);

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
