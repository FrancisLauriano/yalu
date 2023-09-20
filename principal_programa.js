import { MenuAdministrador } from './3-Menus/menu_adm.js';
import { MenuAluno } from './3-Menus/menu_aluno.js';
import { MenuInstrumento } from './3-Menus/menu_instrumento.js';
import { MenuEmprestimos } from './3-Menus/menu_emprestimo.js';
import readline from 'readline-sync';

const menuAdm = new MenuAdministrador();
const menuAluno = new MenuAluno();
const menuInstrumento = new MenuInstrumento();
const menuEmprestimo = new MenuEmprestimos();

// Criando alguns objetos para teste (você pode removê-los em produção)
inicializandoAdministradores();
inicializandoInstrumentos();
inicializandoAlunos();

// Chamando a tela inicial do programa
telaInicial();

function telaInicial() {
  while (true) {
    console.log('\n***** YALU Maracatu Percussivo *****');
    console.log('\n1. Fazer login');
    console.log('2. Sair do sistema');
    console.log('\n************************************');
    let opcao = readline.questionInt('Digite sua opção: ');
    switch (opcao) {
      case 1:
        if (autenticarAdmin()) {
          menuPrincipal();
        }
        break;
      case 2:
        console.log('Encerrando o programa.');
        process.exit(0);
        break;
      default:
        console.log('\nOpção inválida. Por favor, escolha uma opção válida.');
        break;
    }
  }
}

function menuPrincipal() {
  let continuar = true;
  while (continuar) {
    console.log('\n********** YALU **********');
    console.log('\nOPÇÃO:');
    console.log('1. Administrador');
    console.log('2. Alunos');
    console.log('3. Instrumentos');
    console.log('4. Empréstimos');
    console.log('5. Manutenção');
    console.log('0. Sair\n');
    console.log('****************************');
    const opcaoPrincipal = readline.questionInt('Escolha uma opção: ');

    switch (opcaoPrincipal) {
      case 1:
        menuAdm.iniciar();
        break;
      case 2:
        menuAluno.iniciar();
        break;
      case 3:
        menuInstrumento.iniciar();
        break;
      case 4:
        menuEmprestimo.iniciar();
        break;
      case 5:
        console.log('\nMÓDULO EM CONSTRUÇÃO...');
        break;
      case 0:
        console.log('\nVoltando para tela inicial.');
        continuar = false;
        break;
      default:
        console.log('\nOpção inválida. Por favor, escolha uma opção válida.');
        break;
    }
  }
}

function autenticarAdmin() {
  while (true) {
    console.log('\n** Autenticação do Administrador **');
    const emailUsuario = readline.question('Digite o email (ou aperte enter para desistir): ').toLowerCase();
    if (emailUsuario.trim().length === 0) {
      console.log('... voltando para a tela inicial');
      return false;
    } else {
      const senha = readline.question('Digite a senha: ');
      const adminALogar = menuAdm.bancoDeAdm.Adms.find(admin => admin.email === emailUsuario && admin.senha === senha);
      if (adminALogar) {
        console.log('Autenticação bem-sucedida. Acesso permitido.');
        return true;
      } else {
        console.log('Credenciais inválidas. Acesso negado.');
        return false;
      }
    }
  }
}

// colocando administradores dentro do banco de administradores
function inicializandoAdministradores() {
	menuAdm.bancoDeAdm.Adms = [];
  menuAdm.bancoDeAdm.Adms.push({ nome: 'carlos', email: 'carlos@teste.com', senha: '1234'});
  menuAdm.bancoDeAdm.Adms.push({ nome: 'francis', email: 'francis@teste.com', senha: '1234'});
  menuAdm.bancoDeAdm.Adms.push({ nome: 'rebeca', email: 'rebeca@teste.com', senha: '1234'});
  menuAdm.bancoDeAdm.Adms.push({ nome: 'martha', email: 'martha@teste.com', senha: '1234'});
}

function inicializandoAlunos() {
	menuAluno.bancoDeAlunos.alunos = [];
  menuAluno.bancoDeAlunos.alunos.push({matricula: 1, nome: 'Ana Maria Campos', email: 'ana@teste.com', telefone: '99932-4566', turma: 'Sábado avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 2, nome: 'José Campelo de Souza', email: 'jose@teste.com', telefone: '99426-4677', turma: 'Sábado avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 3, nome: 'Teresa Maria', email: 'teresa@teste.com', telefone: '98744-9988', turma: 'Domingo avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 4, nome: 'Andréa Cardoso', email: 'andrea@teste.com', telefone: '99738-1154', turma: 'Domingo avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 5, nome: 'Tadeu Leão', email: 'tadeu@teste.com', telefone: '9861-5005', turma: 'Sábado avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 6, nome: 'Dalila Star', email: 'dalila@teste.com', telefone: '99889-6633', turma: 'Domingo avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 7, nome: 'Tiago Pereira', email: 'tiago@teste.com', telefone: '99741-2200', turma: 'Sábado avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 8, nome: 'Mariana Leite', email: 'mariana@teste.com', telefone: '95622-6332', turma: 'Sábado avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 9, nome: 'Paula Torres', email: 'paula@teste.com', telefone: '987714234', turma: 'Domingo iniciante'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 10, nome: 'Ricardo Pontes', email: 'ricardo@teste.com', telefone: '976542301', turma: 'Domingo iniciante'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 11, nome: 'Walter Araújo', email: 'walter@teste.com', telefone: '989852322', turma: 'Sábado avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 12, nome: 'Daniel Dantes', email: 'daniel@teste.com', telefone: '999186618', turma: 'Sábado iniciante'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 13, nome: 'Ananias Lima', email: 'ananias@teste.com', telefone: '999884643', turma: 'Domingo avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 14, nome: 'Jéssica Macedo', email: 'jessica@teste.com', telefone: '99727-4633', turma: 'Domingo iniciante'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 15, nome: 'Carla Barbosa', email: 'carla@teste.com', telefone: '997448520', turma: 'Sábado avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 16, nome: 'Lara Silva', email: 'lara@teste.com', telefone: '997465623', turma: 'Domingo avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 17, nome: 'Elys Ribeiro', email: 'elys@teste.com', telefone: '995662-3256', turma: 'Sábado iniciante'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 18, nome: 'Marcos Inacio', email: 'marcos@teste.com', telefone: '997978686', turma: 'Sábado avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 19, nome: 'Saulo Sales', email: 'saulo@teste.com', telefone: '99998-6635', turma: 'Domingo iniciante'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 20, nome: 'Fátima Oliveira', email: 'fatima@teste.com', telefone: '99632-8565', turma: 'Domingo iniciante'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 21, nome: 'Felipe Carvalho', email: 'felipe@teste.com', telefone: '997555655', turma: 'Domingo avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 22, nome: 'Laura Brasileiro', email: 'laura@teste.com', telefone: '99999-8818', turma: 'Sábado avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 23, nome: 'Clarice Compasso', email: 'clarice@teste.com', telefone: '99785-4412', turma: 'Sábado avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 24, nome: 'Ana Jacobine', email: 'anajac@teste.com', telefone: '99552-1515', turma: 'Sábado iniciante'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 25, nome: 'Simone Gameiro', email: 'simone@teste.com', telefone: '99966-5522', turma: 'Domingo avançado'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 26, nome: 'Joana Guimarães', email: 'joana@teste.com', telefone: '99214-7423', turma: 'Domingo iniciante'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 27, nome: 'Roberto Tatuapé', email: 'roberto@teste.com', telefone: '99111-3773', turma: 'Sábado iniciante'});
  menuAluno.bancoDeAlunos.alunos.push({matricula: 28, nome: 'Frederico Silva', email: 'fred@teste.com', telefone: '98861-6445', turma: 'Sábado avançado'});
}

// colocando os instrumentos dentro do banco de instrumentos
function inicializandoInstrumentos() {
	menuInstrumento.bancoDeInstrumento.bancoDeInstrumento = [];
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 1, tipo: 'Agogo', descricao: 'preto, grande', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 2, tipo: 'Agbe', descricao: 'Vermelho e branco, grande', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 3, tipo: 'Caixa', descricao: 'Nagano, pele preta', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 4, tipo: 'Alfaia', descricao: 'Aro 18, bandeira de PE', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 5, tipo: 'Alfaia', descricao: 'Aro 20, encordamento amarelo', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 6, tipo: 'Alfaia', descricao: 'Aro 18, listrado', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 7, tipo: 'Alfaia', descricao: 'Aro 18, pele remendada', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: false, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 8, tipo: 'Alfaia', descricao: 'Aro 16, peso leve', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: false, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 9, tipo: 'Alfaia', descricao: 'Aro 20, macaíba treme terra', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 10, tipo: 'Alfaia', descricao: 'Aro 18, aro simples, leve', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 11, tipo: 'Agbe', descricao: 'Vermelho, pequeno', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 12, tipo: 'Agbe', descricao: 'Azul e roxo, medio', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 13, tipo: 'Caixa', descricao: 'Nagano, pele arvensis', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 14, tipo: 'Caixa', descricao: 'Nagano, pele luen', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 15, tipo: 'Caixa', descricao: 'Latão, pele luen', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 16, tipo: 'Agogo', descricao: 'Cromado, grande', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 17, tipo: 'Alfaia', descricao: 'Aro 22, pesada', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 18, tipo: 'Alfaia', descricao: 'Aro 14, infantil', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 19, tipo: 'Alfaia', descricao: 'Aro 18, com estrelas', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 20, tipo: 'Agbe', descricao: 'Rachadura na boca', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 21, tipo: 'Agbe', descricao: 'Laranja pequeno', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 22, tipo: 'Agbe', descricao: 'Azul com cruz vermelha', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 23, tipo: 'Caixa', descricao: 'Pearl, principal da contramestre', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 24, tipo: 'Alfaia', descricao: 'Aro 20, frase na pele', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 25, tipo: 'Alfaia', descricao: 'Aro 18, duplo, do mestre', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 26, tipo: 'Agbe', descricao: 'Arco-iris, grande', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
  menuInstrumento.bancoDeInstrumento.bancoDeInstrumento.push({id: 27, tipo: 'Agogo', descricao: 'Preto, Gope, medio, com solda', dataAquisicao: {mes: 'Abril', ano: 2022}, disponibilidade: true, emprestado: false});
}


