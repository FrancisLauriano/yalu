import readline from "readline-sync";
import { BancoDeInstrumento } from '../1-Classes_Banco/BancoDeInstrumento.js';

class MetodosBancoDeInstrumento extends BancoDeInstrumento{
    constructor() {
        if (MetodosBancoDeInstrumento.instance) {
            return MetodosBancoDeInstrumento.instance;
        }
        super ()
        MetodosBancoDeInstrumento.instance = this;
    }


    // Métodos CRUD

    /**
     *  O método pede os dados ao usuario, valida, cria o objeto e insere no banco de instrumento.
     */
    cadastrarInstrumento() {
        console.log('\n** Criar instrumento **');

        // pedir as informações
        console.log('---------------------------');
        console.log('>> Tipo do instrumento:')
        const tipoNovo = this.pedirTipoInstrumento();
        console.log('---------------------------');
        console.log('>> Descrição do instrumento:');
        const descricaoNova = this.pedirDescricaoInstrumento();
        console.log('---------------------------');
        console.log('>> Data de aquisicao do instrumento:')
        const dataAquisicaoNova = this.pedirDataDeAquisicaoInstrumento();
        console.log('---------------------------');
        console.log('>> Condição do instrumento:')
        const disponibilidadeNova = this.pedirDisponibilidadeInstrumento();
        //console.log('---------------------------');
        //console.log('>> Situação de empréstimo:')
        //const emprestadoNovo = this.pedirEmprestadoInstrumento();
        const emprestadoNovo = false;
        console.log('---------------------------');
        let idNovo;
        if (this.bancoDeInstrumento.length === 0) {
            idNovo = 1;
        } else {
            idNovo = this.bancoDeInstrumento[this.bancoDeInstrumento.length-1].id + 1;
        }

        // criar Instrumento e add no banco de instrumentos
        try {
            const novoInstrumento = {
                id: idNovo,
                tipo: tipoNovo,
                descricao: descricaoNova,
                dataAquisicao: dataAquisicaoNova,
                disponibilidade: disponibilidadeNova,
                emprestado: emprestadoNovo
            };
            this.bancoDeInstrumento.push(novoInstrumento);
            console.log('Instrumento cadastrado com sucesso.')
            this.pausarAtePressionarEnter();
            //readline.keyInPause();
        } catch (error) {
            console.log('Erro ao cadastrar instrumento', error)
        }
    }

    /**
     * Método recebe um inteiro e retorna o instrumento com o id igual do banco de instrumento.
     * @param {integer} idDigitado
     */
    buscarEMostrarInstrumentoPorId(idDigitado) {
        try {
            const instrumentoBuscado = this.bancoDeInstrumento.find((instrumento) => instrumento.id === idDigitado);
            if (!instrumentoBuscado) {
                throw new Error('\n(!) Instrumento não existe na base de dados. ');
            } else {
                console.log('\n\t** Instrumento **')
                console.log('\t---------------------------')
                console.log(`\tID: ${instrumentoBuscado.id}`);
                console.log(`\tTipo: ${instrumentoBuscado.tipo}`);
                console.log(`\tDescrição: ${instrumentoBuscado.descricao}`);
                console.log(`\tData de aquisição: ${instrumentoBuscado.dataAquisicao.mes} de ${instrumentoBuscado.dataAquisicao.ano}`);
                console.log(`\tCondição: ${instrumentoBuscado.disponibilidade ? 'Bom para uso' : 'Em manutenção'}`);
                console.log(`\tSituação de empréstimo: ${instrumentoBuscado.emprestado ? 'Emprestado' : 'Não emprestado'}`);
                console.log('\t---------------------------');
                return instrumentoBuscado;
            }
        } catch (error) {
                console.log(error.message);
                this.pausarAtePressionarEnter();
                return null;
        }
    }

    /**
     * Método recebe um inteiro e deleta o instrumento com o id igual do banco de instrumento.
     * @param {integer} idDigitado
     */
    deletarInstrumentoPorId(idDigitado) {
        try {
            // Procurar o instrumento
            const instrumentoParaDeletar = this.buscarEMostrarInstrumentoPorId(idDigitado);

            // se existir, excluir
            if (instrumentoParaDeletar) {
                console.log('Tem certeza que deseja excluir esse instrumento?');
                console.log('(1) Sim \n(2) Não')
                const excluir = this.trueOrfalse();

                if (excluir) {
                    const indice = this.bancoDeInstrumento.indexOf(instrumentoParaDeletar);
                    this.bancoDeInstrumento.splice(indice, 1);
                    console.log('Instrumento excluído com sucesso.');
                    this.pausarAtePressionarEnter();
                    //readline.keyInPause();
                } else {
                    console.log('Operação cancelada.');
                }
            } else {
                //throw new Error('\n(!) Não existe instrumento com esse ID no banco de dados.')
            }
        } catch (error) {
            console.log(error.message)
            this.pausarAtePressionarEnter();
        }
    }

    /**
     * Método que recebe um inteiro e executa um menu de atualização para o instrumento com o id igual.
     * @param {integer} idDigitado
     */
    atualizarInstrumentoPorId(idDigitado) {
        try {

            if (this.bancoDeInstrumento.find(instrumento => instrumento.id === idDigitado)){
                let continuar = true;
                while (continuar) {
                    const instrumentoParaAlterar = this.buscarEMostrarInstrumentoPorId(idDigitado);
                    // voltar sempre para perguntar, pois o usuário pode querer atualizar mais de um campo
                    console.log(`O que deseja atualizar no instrumento (${idDigitado})?`);
                    console.log('1. Tipo');
                    console.log('2. Descrição');
                    console.log('3. Data de aquisição');
                    console.log('4. Condições de uso');
                    console.log('5. Situaçao de emprestimo');
                    console.log('0. Voltar');
                    let opcao = readline.questionInt('>> Escolha uma opção: ');

                    switch (opcao) {
                        case 1:
                            // pedir tipo e atualizar o objeto
                            console.log('---------------------------');
                            console.log('>> Novo tipo do instrumento:');
                            instrumentoParaAlterar.tipo = this.pedirTipoInstrumento();
                            break;
                        case 2:
                            // pedir descrição e atualizar:
                            console.log('---------------------------');
                            console.log('>> Nova descrição do instrumento:');
                            instrumentoParaAlterar.descricao = this.pedirDescricaoInstrumento();
                            break;
                        case 3:
                            // pedir data e atualizar:
                            console.log('---------------------------');
                            console.log('>> Nova data de aquisição:');
                            instrumentoParaAlterar.dataAquisicao = this.pedirDataDeAquisicaoInstrumento();
                            break;
                        case 4:
                            // pedir disponibilidade e atualizar:
                            console.log('---------------------------');
                            console.log('>> Nova condição:');
                            instrumentoParaAlterar.disponibilidade = this.pedirDisponibilidadeInstrumento();
                            break;
                        case 5:
                            // pedir situação de emprestimo e atualizar:
                            console.log('---------------------------');
                            console.log('>> Nova situação:');
                            instrumentoParaAlterar.emprestado = this.pedirEmprestadoInstrumento();
                            break;
                        case 0:
                            // sair da atualização
                            continuar = false;
                            break;
                        default:
                            console.log('(!) Opção inválida.');
                            break;
                    }
                }
            } else {
            // se o id não existir no banco
                throw new Error('\n(!) Não existe instrumento com esse ID no banco de dados.')
            }
        } catch (error) {
            console.log(error.message)
            this.pausarAtePressionarEnter();
        }
    }


    // Métodos LISTAGENS
    listarInstrumentos() {
        console.log('\n** Lista - TODOS os instrumentos **');
        console.log('-----------------------------------');
        try {
            if (this.bancoDeInstrumento.length > 0) {
                this.bancoDeInstrumento.forEach((instrumento) => {
                console.log(`- ID: ${instrumento.id} | Tipo: ${instrumento.tipo} | Descrição: ${instrumento.descricao} | Condição: ${instrumento.disponibilidade ? 'Bom para uso' : 'Em manutenção'} | Emprestado: ${instrumento.emprestado ? 'Sim' : 'Não'}`)
                });
            } else {
            console.log('(!) Existem 0 instrumentos nessa lista.');
            }
        } catch (error) {
            console.error('Erro ao listar instrumentos:', error);
        }
        console.log('-----------------------------------');
        this.pausarAtePressionarEnter();
        //readline.keyInPause(); // mudar para digite enter para continuar
    }

    listarInstrumentoPorTipo(tipoDigitado) {
        console.log(`\n** Lista - TIPO de instrumento: ${tipoDigitado} **`);
        console.log('-----------------------------------');

        try {
            const listaTipos = this.bancoDeInstrumento.filter((instrumento) => instrumento.tipo === tipoDigitado);

            if (listaTipos.length > 0) {
                listaTipos.forEach((instrumento) => {
                console.log(`- ID: ${instrumento.id} | Tipo: ${instrumento.tipo} | Descrição: ${instrumento.descricao} | Condição: ${instrumento.disponibilidade ? 'Bom para uso' : 'Em manutenção'} | Emprestado: ${instrumento.emprestado ? 'Sim' : 'Não'}`)
                });
            } else {
            console.log('(!) Existem 0 instrumentos nessa lista.');
            }
        } catch (error) {
            console.error('Erro ao listar instrumentos:', error);
        }
        console.log('-----------------------------------');
        //readline.keyInPause();
        this.pausarAtePressionarEnter();
    }

    listarInstrumentoPorDisponibilidade(disponibilidadeDigitada) {
        if (disponibilidadeDigitada) {
            console.log(`\n** Lista - CONDIÇÃO de instrumento: Bom para uso **`);
        } else {
            console.log(`\n** Lista - CONDIÇÃO de instrumento: Em manutenção **`);
        }
        console.log('-----------------------------------');

        try {
            const listaDisponibilidade = this.bancoDeInstrumento.filter((instrumento) => instrumento.disponibilidade === disponibilidadeDigitada);

            if (listaDisponibilidade.length > 0) {
                listaDisponibilidade.forEach((instrumento) => {
                console.log(`- ID: ${instrumento.id} | Tipo: ${instrumento.tipo} | Descrição: ${instrumento.descricao} | Condição: ${instrumento.disponibilidade ? 'Bom para uso' : 'Em manutenção'} | Emprestado: ${instrumento.emprestado ? 'Sim' : 'Não'}`)
                });
            } else {
            console.log('(!) Existem 0 instrumentos nessa lista.');
            }
        } catch (error) {
            console.error('Erro ao listar instrumentos:', error);
        }
        console.log('-----------------------------------');
        this.pausarAtePressionarEnter();
        //readline.keyInPause();
    }

    listarInstrumentoPorSituacaoEmprestimo(emprestadoDigitado) {
        if (emprestadoDigitado) {
            console.log(`\n** Lista - SITUAÇAO DE EMPRESTIMO: Emprestado **`);
        } else {
            console.log(`\n** Lista - SITUAÇAO DE EMPRESTIMO: Não emprestado **`);
        }
        console.log('-----------------------------------');
        try {
            const listaEmprestado = this.bancoDeInstrumento.filter((instrumento) => instrumento.emprestado === emprestadoDigitado);

            if (listaEmprestado.length > 0) {
                listaEmprestado.forEach((instrumento) => {
                console.log(`- ID: ${instrumento.id} | Tipo: ${instrumento.tipo} | Descrição: ${instrumento.descricao} | Condição: ${instrumento.disponibilidade ? 'Bom para uso' : 'Em manutenção'} | Emprestado: ${instrumento.emprestado ? 'Sim' : 'Não'}`)
                });
            } else {
            console.log('(!) Existem 0 instrumentos nessa lista.');
            }
        } catch (error) {
            console.error('Erro ao listar instrumentos:', error);
        }
        console.log('-----------------------------------');
        this.pausarAtePressionarEnter();
        //readline.keyInPause();
    }

    // Estruturas de dados auxiliares
    tipos = {
        1: 'Alfaia',
        2: 'Caixa',
        3: 'Agogo',
        4: 'Agbe'
    }
    meses = {
        1: 'Janeiro',
        2: 'Fevereiro',
        3: 'Marco',
        4: 'Abril',
        5: 'Maio',
        6: 'Junho',
        7: 'Julho',
        8: 'Agosto',
        9: 'Setembro',
        10: 'Outubro',
        11: 'Novembro',
        12: 'Dezembro'
    }

    // Métodos AUXILIARES para cadastrar instrumentos
    validarStringNaoVazia(texto) {
        const textoSemEspacos = texto.trim();
        return textoSemEspacos.length > 0;
    }

    pausarAtePressionarEnter() {
        console.log('Pressione Enter para continuar...');
        readline.question('');
      }

    trueOrfalse() {
        let op
        while (true) {
            try {
                let opcaoDigitada = readline.question('Digite o numero correspondente: ');
                op = parseInt(opcaoDigitada, 10);
                if (!isNaN(op) && (op === 1 || op === 2)) {
                    break;
                } else {
                    throw new Error('(!) Por favor, escolha entre as opcoes.')
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        return op === 1 ? true : false;
    }

    pedirId() {
        let idDigitado
        while (true) {
          try {
              const id = readline.question('Digite o ID do instrumento (0 para cancelar): ');
              idDigitado = parseInt(id, 10);
              if (!isNaN(idDigitado) && idDigitado >= 0) {
                  break;
              } else {
                  throw new Error('(!) ID inválido. Por favor tente novamente.');
              }
            } catch (error) {
              console.log(error.message);
            }
        }
        return idDigitado;
    }

    pedirTipoInstrumento() {
        let tipoDigitado
        //console.log('\t---------------------------');
        console.log('(1) Alfaia \n(2) Caixa \n(3) Agogo \n(4) Agbe');
        while (true) {
            try {
                tipoDigitado = readline.question('Digite o numero correspondente: ');
                if (!isNaN(parseInt(tipoDigitado, 10)) && tipoDigitado >= 1 && tipoDigitado <= 4) {
                    console.log(`(Tipo escolhido: ${this.tipos[tipoDigitado]})`)
                    break;
                } else {
                    throw new Error('(!) Por favor, escolha entre as opcoes.')
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        return this.tipos[tipoDigitado];
    }

    pedirDescricaoInstrumento() {
        let descricaoNovoInstrumento;
        //console.log('\t---------------------------');
        while (true) {
            try {
                descricaoNovoInstrumento = readline.question('');
                if (this.validarStringNaoVazia(descricaoNovoInstrumento)) {
                    break;
                } else {
                    throw new Error('(!) Descricao em branco. Por favor, digite alguma caracteristica do instrumento.')
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        return descricaoNovoInstrumento;
    }

    pedirDataDeAquisicaoInstrumento() {
        let dataAquisicaoNovoInstrumento, mesDigitado, anoDigitado
        let dataAtual = new Date();
        //console.log('\t---------------------------');

        // pedir o mes
        while (true) {
            try {
                const mesAquisicao = readline.question('\tDigite o mês (1 a 12): ');
                mesDigitado = parseInt(mesAquisicao, 10);
                if (!isNaN(mesDigitado) && mesDigitado >= 1 && mesDigitado <= 12) {
                    break;
                } else {
                    throw new Error('\t(!) Mes inválido. Por favor tente novamente.');
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        // pedir o ano
        while (true) {
            try {
                const anoAquisicao = readline.question('\tDigite o ano (a partir de 2005): ');
                anoDigitado = parseInt(anoAquisicao, 10);
                if (!isNaN(anoDigitado) && anoDigitado >= 2005 && anoDigitado <= dataAtual.getFullYear()) {
                    break;
                } else {
                    throw new Error('\t(!) Ano inválido. Por favor tente novamente.');
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        // montar a data
        dataAquisicaoNovoInstrumento = {
            mes: this.meses[mesDigitado],
            ano: anoDigitado
        }
        console.log(`\t(Aquisicao em ${dataAquisicaoNovoInstrumento.mes} de ${dataAquisicaoNovoInstrumento.ano})`)
        return dataAquisicaoNovoInstrumento;
    }

    pedirDisponibilidadeInstrumento() {
        //console.log('\t---------------------------');
        console.log('(1) Bom para uso \n(2) Em manutenção');
        return this.trueOrfalse();
    }

    pedirEmprestadoInstrumento() {
        //console.log('\t---------------------------');
        console.log('(1) Emprestado \n(2) Não emprestado');
        return this.trueOrfalse();
    }



    sinalizarEmprestimo(idInstrumento) {
        const instrumento = this.buscarInstrumentoPorId(idInstrumento);
        if (instrumento) {
            instrumento.emprestado = true;
            console.log(`Instrumento ${idInstrumento} emprestado.`);
        }
    }

    sinalizarDevolucao(idInstrumento) {
        const instrumento = this.buscarInstrumentoPorId(idInstrumento);
        if (instrumento) {
            instrumento.emprestado = false;
            console.log(`Instrumento ${idInstrumento} devolvido.`);
        }
    }

    buscarInstrumentoPorId(idInstrumento) {
        return this.bancoDeInstrumento.find(instrumento => instrumento.id === idInstrumento);
    }

}
export {MetodosBancoDeInstrumento};
