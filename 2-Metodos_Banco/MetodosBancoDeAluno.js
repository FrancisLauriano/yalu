import readline from 'readline-sync';
import { BancoDeAlunos } from '../1-Classes_Banco/BancoDeAlunos.js';


class MetodosBancoDeAlunos extends BancoDeAlunos{
  constructor() {
    if (MetodosBancoDeAlunos.instance) {
      return MetodosBancoDeAlunos.instance;
    }
    super ()
    MetodosBancoDeAlunos.instance = this;
  }


  validarEntradaDeDados(dados, camposObrigatorios) {
    for (const campo of camposObrigatorios) {
      if (!dados[campo]) {
        console.log(`\nO campo '${campo}' é obrigatório.`);
        return false;
      }
    }
    return true;
  }

  emailJaCadastrado(email) {
    return this.alunos.some((aluno) => aluno.email === email);
  }

  cadastrarAluno() {
		console.log('\n** Cadastrar Aluno **');
		const novoAluno = {
      matricula: 1,
			nome: readline.question('Digite o nome do Aluno: ').toLowerCase(),
			email: readline.question('Digite o email do Aluno: ').toLowerCase(),
			telefone: readline.question('Digite o telefone do Aluno: '),
			turma: readline.questionInt(`Qual sua turma? (1)- Sábado iniciante (2)- Sábado avançado, (3)- Domingo iniciante, (4)- Domingo avançado\nEscolha uma opção: `),
		};

    if (this.alunos.length === 0) {
      novoAluno.matricula = 1
    } else {
      novoAluno.matricula = this.alunos[this.alunos.length-1].matricula + 1
    }

		switch (novoAluno.turma) {
			case 1:
				novoAluno.turma = "Sábado iniciante";
				break;
			case 2:
				novoAluno.turma = "Sábado avançado";
				break;
			case 3:
				novoAluno.turma = "Domingo iniciante";
				break;
			case 4:
				novoAluno.turma = "Domingo avançado";
				break;
			default:
				novoAluno.turma = "Opção inválida";
				break;
		}

		if (this.validarEntradaDeDados(novoAluno, ['nome', 'email', 'telefone', 'turma'])) {
			try {
				if (this.emailJaCadastrado(novoAluno.email)) {
					console.log('\nEmail já cadastrado. Não é possível criar o Aluno.');
				} else {
					this.alunos.push(novoAluno);
					console.log(`\nAluno cadastrado com sucesso:\nNome: ${novoAluno.nome}\nEmail: ${novoAluno.email}\nTelefone: ${novoAluno.telefone}\nTurma: ${novoAluno.turma}`);
				}
			} catch (error) {
				console.error('\nErro ao cadastrar Aluno:', error);
			}
		}
	}

  listarAlunos() {
    console.log('\n** Listar Alunos **');
    try {
      if (this.alunos.length > 0) {
        console.log('\nLista de Alunos:');
        this.alunos.forEach((aluno, index) => {
          console.log(`Matrícula: ${aluno.matricula}, Nome: ${aluno.nome}, Email: ${aluno.email}, Telefone: ${aluno.telefone}, Turma: ${aluno.turma}`);
        });
      } else {
        console.log('\Nenhum Aluno encontrado.');
      }
    } catch (error) {
      console.error('\nErro ao listar Alunos:', error);
    }
  }

  listarAlunosPorTurma() {
    console.log('\n** Listar Alunos por Turma **');
    const turmaDesejada = readline.question('Digite a turma que deseja listar (1 - Sábado iniciante, 2 - Sábado avançado, 3 - Domingo iniciante, 4 - Domingo avançado): ');

    try {
      let alunosPorTurma = [];

      switch (turmaDesejada) {
        case '1':
          alunosPorTurma = this.alunos.filter((aluno) => aluno.turma === 'Sábado iniciante');
          break;
        case '2':
          alunosPorTurma = this.alunos.filter((aluno) => aluno.turma === 'Sábado avançado');
          break;
        case '3':
          alunosPorTurma = this.alunos.filter((aluno) => aluno.turma === 'Domingo iniciante');
          break;
        case '4':
          alunosPorTurma = this.alunos.filter((aluno) => aluno.turma === 'Domingo avançado');
          break;
        default:
          console.log('\nTurma inválida. Não foi possível listar os alunos.');
          return;
      }

      if (alunosPorTurma.length > 0) {
        console.log(`\nAlunos da turma "${turmaDesejada}":`);
        alunosPorTurma.forEach((aluno) => {
          console.log(`Matrícula: ${aluno.matricula}, Nome: ${aluno.nome}, Email: ${aluno.email}, Telefone: ${aluno.telefone}, Turma: ${aluno.turma}`);
        });
      } else {
        console.log(`\nNenhum aluno encontrado na turma "${turmaDesejada}".`);
      }
    } catch (error) {
      console.error('\nErro ao listar alunos por turma:', error);
    }
  }


  buscarAluno(buscaSubstring) {
    console.log('\n** Buscar Aluno por Nome, Email ou Matrícula **');
    buscaSubstring = readline.question('Digite o nome, email ou matrícula do Aluno que deseja buscar: ').toLowerCase();

    try {
      const alunosEncontrados = this.alunos.filter((aluno) => {
        const nomeOcorrencias = (aluno.nome.match(new RegExp(buscaSubstring, 'gi')) || []).length;
        const emailOcorrencias = (aluno.email.match(new RegExp(buscaSubstring, 'gi')) || []).length;
        const matriculaOcorrencias = (aluno.matricula.toString().match(new RegExp(buscaSubstring, 'gi')) || []).length;

        // ocorrências de substring em ordem decrescente.
        return nomeOcorrencias + emailOcorrencias + matriculaOcorrencias > 0;
      });

      if (alunosEncontrados.length > 0) {
        console.log('\nAluno(s) encontrado(s):');
        alunosEncontrados.forEach((aluno) => {
          console.log(`Matrícula: ${aluno.matricula}, Nome: ${aluno.nome}, Email: ${aluno.email}, Telefone: ${aluno.telefone}, Turma: ${aluno.turma}`);
        });
      } else {
        console.log(`\nNenhum Aluno encontrado com o nome, email ou matrícula fornecido. "${buscaSubstring}".`);
      }
    } catch (error) {
      console.error('\nErro ao buscar Alunos por nome, email ou matrícula:', error);
    }
  }  

  atualizarAluno() {
    console.log('\n** Atualizar Aluno **');
    const buscaSubstring = readline.question('Digite o nome, email ou matrícula do Aluno que deseja atualizar: ').toLowerCase();

    try {
      // Filtrar Alunos com base na substring fornecida
      const alunosEncontrados = this.alunos.filter((aluno) => {
        return aluno.nome.includes(buscaSubstring) || aluno.email.includes(buscaSubstring) || aluno.matricula.toString().includes(buscaSubstring);
      });

      if (alunosEncontrados.length === 0) {
        console.log(`\nNenhum Aluno encontrado com a busca: "${buscaSubstring}".`);
        return;
      }

      // Mostrar os Alunos encontrados
      console.log('\nAluno(s) encontrado(s):');
      alunosEncontrados.forEach((aluno) => {
        console.log(`Matrícula: ${aluno.matricula}, Nome: ${aluno.nome}, Email: ${aluno.email}, Telefone: ${aluno.telefone}, Turma: ${aluno.turma}`);
      });

      const opcao = readline.questionInt('Escolha a matrícula do Aluno que deseja atualizar ou digite 0 para cancelar: ');

      if (opcao === 0) {
        console.log('\nOperação de atualização cancelada.');
        return;
      }

      const alunoParaAtualizar = alunosEncontrados.find((aluno) => aluno.matricula === opcao);

      if (!alunoParaAtualizar) {
        console.log('\nAluno não encontrado para atualização.');
        return;
      }

      // Mostrar os dados atuais do Aluno selecionado
      console.log('\nDados atuais do Aluno:');
      console.log(`Matrícula: ${alunoParaAtualizar.matricula}`);
      console.log(`Nome: ${alunoParaAtualizar.nome}`);
      console.log(`Email: ${alunoParaAtualizar.email}`);
      console.log(`Telefone: ${alunoParaAtualizar.telefone}`);
      console.log(`Turma: ${alunoParaAtualizar.turma}`);

      console.log('\nO que deseja atualizar?');
      console.log('1. Nome');
      console.log('2. Email');
      console.log('3. Telefone');
      console.log('4. Turma');
      console.log('0. Cancelar');
      const escolha = readline.questionInt('Escolha uma opção: ');

      switch (escolha) {
        case 1:
          const novoNome = readline.question('Digite o novo nome (ou pressione Enter para manter o mesmo): ').toLowerCase();
          if (novoNome) {
            alunoParaAtualizar.nome = novoNome;
            console.log('\nNome atualizado com sucesso.');
          } else {
            console.log('\nNome não atualizado.');
          }
          break;
        case 2:
          const novoEmail = readline.question('Digite o novo email (ou pressione Enter para manter o mesmo): ').toLowerCase();
          if (novoEmail) {
            if (novoEmail !== alunoParaAtualizar.email && this.emailJaCadastrado(novoEmail)) {
              console.log('\nEmail já cadastrado para outro Aluno. Não é possível atualizar.');
            } else {
              alunoParaAtualizar.email = novoEmail;
              console.log('\nEmail atualizado com sucesso.');
            }
          } else {
            console.log('\nEmail não atualizado.');
          }
          break;
        case 3:
          const novoTelefone = readline.question('Digite o novo telefone (ou pressione Enter para manter o mesmo): ');
          if (novoTelefone) {
            alunoParaAtualizar.telefone = novoTelefone;
            console.log('\nTelefone atualizado com sucesso.');
          } else {
            console.log('\nTelefone não atualizado.');
          }
          break;
        case 4:
          const novaTurmaInput = readline.questionInt('Digite a nova turma (ou pressione Enter para manter a mesma)\n(1)- Sábado iniciante (2)- Sábado avançado, (3)- Domingo iniciante, (4)- Domingo avançado\nEscolha uma opção:  ');

          let novaTurma = ''; // Variável para armazenar a turma atualizada

          switch (novaTurmaInput) {
            case 1:
              novaTurma = "Sábado iniciante";
              break;
            case 2:
              novaTurma = "Sábado avançado";
              break;
            case 3:
              novaTurma = "Domingo iniciante";
              break;
            case 4:
              novaTurma = "Domingo avançado";
              break;
            case 0:
              console.log('\nOperação de atualização cancelada.');
              break;
            default:
              console.log('\nOpção de turma inválida. A turma não foi atualizada.');
              break;
          }
          if (novaTurma !== '') {
            alunoParaAtualizar.turma = novaTurma;
            console.log('\nTurma atualizada com sucesso.');
          } else {
            console.log('\nTurma não atualizada.');
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
      console.error('\nErro ao atualizar Aluno:', error);
    }
  }

  deletarAluno() {
    console.log('\n** Deletar Aluno **');
    const buscaSubstring = readline.question('Digite o nome, email ou matrícula do Aluno que deseja deletar: ').toLowerCase();

    try {
      // Filtrar Alunos com base na substring fornecida
      const alunosEncontrados = this.alunos.filter((aluno) => {
        return aluno.nome.includes(buscaSubstring) || aluno.email.includes(buscaSubstring) || aluno.matricula.toString().includes(buscaSubstring);
      });

      if (alunosEncontrados.length === 0) {
        console.log(`\nNenhum Aluno encontrado com a busca: "${buscaSubstring}".`);
        return;
      }

      // Mostrar os Alunos encontrados
      console.log('\nAluno(s) encontrado(s):');
      alunosEncontrados.forEach((aluno) => {
        console.log(`Matrícula: ${aluno.matricula}, Nome: ${aluno.nome}, Email: ${aluno.email}, Telefone: ${aluno.telefone}, Turma: ${aluno.turma}`);
      });

      const opcao = readline.questionInt('Escolha a matrícula do Aluno que deseja deletar ou digite 0 para cancelar: ');

      if (opcao === 0) {
        console.log('\nOperação de exclusão cancelada.');
        return;
      }

      const alunoParaDeletar = alunosEncontrados.find((aluno) => aluno.matricula === opcao);

      if (!alunoParaDeletar) {
        console.log('\nAluno não encontrado para exclusão.');
        return;
      }

      // Mostrar os dados do Aluno a ser deletado
      console.log('\nDados do Aluno a ser deletado:');
      console.log(`Matrícula: ${alunoParaDeletar.matricula}`);
      console.log(`Nome: ${alunoParaDeletar.nome}`);
      console.log(`Email: ${alunoParaDeletar.email}`);
      console.log(`Telefone: ${alunoParaDeletar.telefone}`);
      console.log(`Turma: ${alunoParaDeletar.turma}`);

      console.log('\nDeseja realmente excluir este Aluno?');
      console.log('1. Sim');
      console.log('2. Não');
      const confirmaDelecao = readline.questionInt('Escolha uma opção: ');

      if (confirmaDelecao === 1) {
        const index = this.alunos.indexOf(alunoParaDeletar);
        if (index !== -1) {
          this.alunos.splice(index, 1);
          console.log('\nAluno removido com sucesso!');
        } else {
          console.log('\nErro ao remover Aluno.');
        }
      } else if (confirmaDelecao === 2) {
        console.log('\nOperação de exclusão cancelada.');
      } else {
        console.log('\nOpção inválida. Nenhum dado foi removido.');
      }
    } catch (error) {
      console.error('\nErro ao deletar Aluno:', error);
    }
  }
}  

export {MetodosBancoDeAlunos};

