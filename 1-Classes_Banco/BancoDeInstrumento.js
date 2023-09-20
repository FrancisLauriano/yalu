import readline from "readline-sync";

class BancoDeInstrumento {
    constructor() {
        if (BancoDeInstrumento.instance) {
            return BancoDeInstrumento.instance;
        }
        this.bancoDeInstrumento = [];
        BancoDeInstrumento.instance = this;
    }

    // Métodos CRUD

    /**
     *  O método pede os dados ao usuario, valida, cria o objeto e insere no banco de instrumento.
     */
    cadastrarInstrumento() {

    }

    /**
     * Método recebe um inteiro e retorna o instrumento com o id igual do banco de instrumento.
     * @param {integer} idDigitado
     */
    buscarEMostrarInstrumentoPorId(idDigitado) {

    }

    /**
     * Método recebe um inteiro e deleta o instrumento com o id igual do banco de instrumento.
     * @param {integer} idDigitado
     */
    deletarInstrumentoPorId(idDigitado) {

    }

    /**
     * Método que recebe um inteiro e executa um menu de atualização para o instrumento com o id igual.
     * @param {integer} idDigitado
     */
    atualizarInstrumentoPorId(idDigitado) {

    }


    // Métodos LISTAGENS
    listarInstrumentos() {

    }

    listarInstrumentoPorTipo(tipoDigitado) {

    }

    listarInstrumentoPorDisponibilidade(disponibilidadeDigitada) {

    }

    listarInstrumentoPorSituacaoEmprestimo(emprestadoDigitado) {

    }

    // Estruturas de dados auxiliares
    tipos = {

    }

    meses = {

    }

    // Métodos AUXILIARES para cadastrar instrumentos
    validarStringNaoVazia(texto) {

    }

    pausarAtePressionarEnter() {

      }

    trueOrfalse() {

    }

    pedirId() {

    }

    pedirTipoInstrumento() {

    }

    pedirDescricaoInstrumento() {

    }

    pedirDataDeAquisicaoInstrumento() {

    }

    pedirDisponibilidadeInstrumento() {

    }

    pedirEmprestadoInstrumento() {

    }

    sinalizarEmprestimo(idInstrumento) {

    }

    sinalizarDevolucao(idInstrumento) {

    }

    buscarInstrumentoPorId(idInstrumento) {

    }

}
export {BancoDeInstrumento};
