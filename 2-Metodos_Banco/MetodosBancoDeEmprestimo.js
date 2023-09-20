import readline from 'readline-sync';
import { BancoDeEmprestimo } from '../1-Classes_Banco/BancoDeEmprestimo.js';
import { MetodosBancoDeAlunos } from '../2-Metodos_Banco/MetodosBancoDeAluno.js';
import {MetodosBancoDeInstrumento} from '../2-Metodos_Banco/MetodosBancoDeInstrumento.js';


// Classe banco de Emprestimos
class MetodosBancoDeEmprestimo extends BancoDeEmprestimo{
  constructor() {
    if (MetodosBancoDeEmprestimo.instance) {
      return MetodosBancoDeEmprestimo.instance;
    }
		super ();
		this.bancoDeAlunos = new MetodosBancoDeAlunos(),
		this.bancoDeInstrumento = new MetodosBancoDeInstrumento(),
		MetodosBancoDeEmprestimo.instance = this;
  }


  emprestarInstrumento() {
    try {
      let status = "ok";

      while (true) {
        let idInstrumento = readline.questionInt("Digite o número do Instrumento, 0 para cancelar: ");
        if (idInstrumento === 0) {
          console.log("*** CANCELANDO ***");
          status = "d";
          break;
        }

        // Procurar o instrumento no banco de instrumentos
        let buscaInstrumento = this.bancoDeInstrumento.buscarInstrumentoPorId(idInstrumento);

        if (!buscaInstrumento) {
          console.log("----------------------------------");
          console.log("*** INSTRUMENTO NÃO CADASTRADO ***");
          console.log("----------------------------------");
          this.bancoDeInstrumento.pausarAtePressionarEnter()
          continue;
        }

        if (buscaInstrumento.disponibilidade & !buscaInstrumento.emprestado){
          console.log(`Tipo: ${buscaInstrumento.tipo}`)
          console.log(`Descrição: ${buscaInstrumento.descricao}`)
          status="ok"
        }else if(buscaInstrumento.emprestado == true){
              console.log("----------------------------------------");
              console.log(`*** O INSTRUMENTO JÁ ESTÁ EMPRESTADO ***`)
              console.log("----------------------------------------");
              status="e"
              break
          } else {
              status="i"
              console.log("---------------------------------");
              console.log(`*** INSTRUMENTO EM MANUTENÇÃO ***`)
              console.log("---------------------------------");
              break
              }


        let idAluno = 0;

        while (true) {
          idAluno = readline.questionInt("Digite a matrícula do aluno ou 0 para cancelar: ");
          if (idAluno === 0) {
            console.log("*** CANCELANDO ***");
            status = "a";
            break;
          }

          // Procurar o aluno no banco de alunos
          let buscaAluno = this.bancoDeAlunos.buscarAlunoPorMatricula(idAluno);

          if (!buscaAluno) {
            console.log("-------------------------");
            console.log("*** ALUNO INEXISTENTE ***");
            console.log("-------------------------");
            this.bancoDeInstrumento.pausarAtePressionarEnter()
            continue;
          }
          console.log(`Aluno: ${buscaAluno.nome}`)
          break;
        }

        if (status !== "ok") {
          break;
        }

        let evento = readline.question("Informe onde será usado: ");
        let confirmarEmprestimo = readline.question("Digite 1 para confirmar o empréstimo ou qualquer outra tecla para cancelar: ");
        if (confirmarEmprestimo === "1") {
          let dataEmprestimo = new Date();
          let idEmprestimo = this.idEmprestimoAnterior + 1;
          console.log("------------------------------------------------------------------------------------------------------------");
          console.log(`Instrumento liberado para empréstimo em ${dataEmprestimo}`);
          console.log(`- Número sequencial do empréstimo ===> ${idEmprestimo}`);
          console.log("------------------------------------------------------------------------------------------------------------");

          const novoEmprestimo = {
            idEmprestimo,
            idInstrumento,
            idAluno,
            evento,
            dataEmprestimo,
            dataDevolucao: null,
          };

          this.emprestimos.push(novoEmprestimo);
          this.bancoDeInstrumento.sinalizarEmprestimo(idInstrumento);
          this.idEmprestimoAnterior = novoEmprestimo.idEmprestimo;
        } else {
          console.log("----------------------------");
          console.log("*** EMPRÉSTIMO CANCELADO ***");
          console.log("----------------------------");
          status = "c";
        }
        break;
      }

      return [status, this.idEmprestimoAnterior];
    } catch (error) {
      console.error("Ocorreu um erro durante o empréstimo:", error);
    }
  }


  devolverInstrumento() {
    try {
      let devolver = readline.questionInt("Digite o número do empréstimo: ");
      let encontrado = false;

      for (let i = this.emprestimos.length - 1; i >= 0; i--) {
        if (this.emprestimos[i].idEmprestimo === devolver) {
          encontrado = true;
          console.log("-----------------------------------------------------------------------------------------------------");
          if (this.emprestimos[i].dataDevolucao === null) {
            let confirmarDevolucao = readline.question("Digite 1 para confirmar a devolução ou qualquer outra tecla para cancelar: ");

            if (confirmarDevolucao === "1") {
              this.emprestimos[i].dataDevolucao = new Date();
              this.bancoDeInstrumento.sinalizarDevolucao(this.emprestimos[i].idInstrumento);
              console.log(`Instrumento devolvido em ${this.emprestimos[i].dataDevolucao}`);
            } else {
              console.log(`*** DEVOLUÇÃO NÃO FINALIZADA, EMPRÉSTIMO ${devolver} EM ABERTO ***`);
            }
          } else {
            console.log(`Instrumento já devolvido em ${this.emprestimos[i].dataDevolucao} pelo aluno ${this.emprestimos[i].idAluno}`);
          }
          console.log("-----------------------------------------------------------------------------------------------------");
          break;
        }
      }

      if (!encontrado) {
        console.log("-------------------------------------------");
        console.log("*** NÚMERO DE EMPRÉSTIMO NÃO CADASTRADO ***");
        console.log("-------------------------------------------");
      }
    } catch (error) {
      console.error("Ocorreu um erro durante a devolução:", error);
    }
  }

  buscarEmprestimo() {
    try {
      let emprest = readline.questionInt(`Digite o número do empréstimo: `);
      let encontrado = false;

      for (let i = this.emprestimos.length - 1; i >= 0; i--) {
        if (this.emprestimos[i].idEmprestimo === emprest) {
          encontrado = true;
          let devolvido = "";

          if (this.emprestimos[i].dataDevolucao === null) {
            devolvido = "Em aberto";
          } else {
            devolvido = this.emprestimos[i].dataDevolucao;
          }
          console.log("--------------------------------------------------------------------------------------------------------------------------------------------------");
          console.log(`- Empréstimo Nº: ${this.emprestimos[i].idEmprestimo} | Matricula do Aluno: ${this.emprestimos[i].idAluno} | Emprestado em ${this.emprestimos[i].dataEmprestimo} | Devolvido em: ${devolvido}`);
          console.log("--------------------------------------------------------------------------------------------------------------------------------------------------");
          break;
        }
      }

      if (!encontrado) {
        console.log("-------------------------------------------");
        console.log(`*** NÚMERO DE EMPRÉSTIMO NÃO CADASTRADO ***`);
        console.log("-------------------------------------------");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao buscar o empréstimo:", error);
    }
  }

  buscarUltimoEmprestimoDoInstrumento() {
    try {
      let localizar = readline.questionInt(`Digite o número do instrumento à localizar: `);
      let encontrado = false;

      for (let i = this.emprestimos.length - 1; i >= 0; i--) {
        if (this.emprestimos[i].idInstrumento === localizar) {
          encontrado = true;
          let devolvido = "";

          if (this.emprestimos[i].dataDevolucao === null) {
            devolvido = "Em aberto";
          } else {
            devolvido = this.emprestimos[i].dataDevolucao;
          }
          console.log("--------------------------------------------------------------------------------------------------------------------------------------------------");
          console.log(` - Empréstimo Nº: ${this.emprestimos[i].idEmprestimo} | Matricula do Aluno: ${this.emprestimos[i].idAluno} | Emprestado em ${this.emprestimos[i].dataEmprestimo} | Devolvido em: ${devolvido}`);
          console.log("--------------------------------------------------------------------------------------------------------------------------------------------------");
          break;
        }
      }

      if (!encontrado) {
        console.log("--------------------------------------------");
        console.log(`*** INSTRUMENTO AINDA NÃO FOI EMPRESTADO ***`);
        console.log("--------------------------------------------");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao buscar o último empréstimo do instrumento:", error);
    }
  }

  listarEmprestimosDoInstrumento() {
    try {
      let localizar = readline.questionInt(`Digite o número do instrumento: `);
      let encontrado = false;
      console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
      for (let i = this.emprestimos.length - 1; i >= 0; i--) {
        if (this.emprestimos[i].idInstrumento === localizar) {
          encontrado = true;
          let devolvido = "";

          if (this.emprestimos[i].dataDevolucao === null) {
            devolvido = "EM ABERTO";
          } else {
            devolvido = this.emprestimos[i].dataDevolucao;
          }
          console.log(`- Empréstimo Nº: ${this.emprestimos[i].idEmprestimo} | Matricula do Aluno: ${this.emprestimos[i].idAluno} | Devolvido em: ${devolvido}`);
        }
      }

      if (!encontrado) {
        console.log("--------------------------------------------");
        console.log(`*** INSTRUMENTO AINDA NÃO FOI EMPRESTADO ***`);
        console.log("--------------------------------------------");
      } else{
        console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao listar os empréstimos do instrumento:", error);
    }
  }

  listarEmprestimosEmAberto() {
    try {
      let emAberto = false;
      console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
      for (const emprestimo of this.emprestimos) {
        if (emprestimo.dataDevolucao === null) {
          emAberto = true;
          console.log(`- Empréstimo Nº: ${emprestimo.idEmprestimo} | Matricula do Aluno: ${emprestimo.idAluno} | Instrumento Nº: ${emprestimo.idInstrumento} | Em aberto desde: ${emprestimo.dataEmprestimo}`);
        }
      }

      if (!emAberto) {
        console.log(`*** Nao existem empréstimo em aberto ***`);
      }
      console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
    } catch (error) {
      console.error("Ocorreu um erro ao listar os empréstimos em aberto:", error);
    }
  }

  listarInstrumentosDisponiveis() {
    try {
      let emAberto = false;

      console.log("------------------------------------------------------------------------------------");
      for (const instrumento of this.bancoDeInstrumento.bancoDeInstrumento) {
        if (instrumento.disponibilidade && !instrumento.emprestado) {
          emAberto = true;
          console.log(`Instrumento Nº: ${instrumento.id} - Tipo: ${instrumento.tipo} - Descrição: ${instrumento.descricao}`);
        }
      }

      if (!emAberto) {
        console.log(`No momento não existem instrumentos disponíveis para empréstimo, volte mais tarde.`);
      }
      console.log("------------------------------------------------------------------------------------");
    } catch (error) {
      console.error("Ocorreu um erro ao listar os instrumentos disponíveis:", error);
    }
  }

  sinalizarEmprestimo(idInstrumento) {
    try {
      const instrumento = this.buscarInstrumentoPorId(idInstrumento);
      if (instrumento) {
        instrumento.emprestado = true;
        //console.log(`Instrumento ${idInstrumento} emprestado.`);
      }
    } catch (error) {
      console.error("Ocorreu um erro ao sinalizar o empréstimo:", error);
    }
  }

  sinalizarDevolucao(idInstrumento) {
    try {
      const instrumento = this.buscarInstrumentoPorId(idInstrumento);
      if (instrumento) {
        instrumento.emprestado = false;
        //console.log(`Instrumento ${idInstrumento} devolvido.`);
      }
    } catch (error) {
      console.error("Ocorreu um erro ao sinalizar a devolução:", error);
    }
  }
}

export {MetodosBancoDeEmprestimo};

