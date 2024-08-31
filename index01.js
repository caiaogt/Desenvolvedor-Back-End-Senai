const readline = require("readline-sync"); // Importa o módulo readline-sync para capturar entrada do usuário
const fs = require("fs"); // Importa o módulo fs para realizar operações de leitura e escrita de arquivos

const caminhoDoArquivo = './ControleDeEstoque.json'; // Define o caminho do arquivo JSON que armazena o controle de estoque

// Importa os módulos para adicionar, visualizar, excluir e modificar produtos
const adicionarProduto = require('./adicionarProduto.js');
const visualizarProdutos = require('./visualizarProdutos.js');
const excluirProduto = require('./excluirProduto.js');
const modificarEstoqueProduto = require('./modificarEstoqueProduto.js');

// Função para criar o arquivo de estoque se ele não existir
const criarArquivoSeNaoExiste = async (caminho) => {
    if (!fs.existsSync(caminho)) { // Verifica se o arquivo já existe
        try {
            fs.writeFileSync(caminho, "[]"); // Cria o arquivo com um array vazio
        } catch (err) {
            console.error("Erro ao criar arquivo: ", err); // Exibe uma mensagem de erro se não conseguir criar o arquivo
        }
    }
}

// Função para exibir o menu de opções para o usuário
const exibirMenuDeEstoque = async () => {
    console.log("-------------------------");
    // Solicita ao usuário a opção desejada
    const opcao = readline.questionInt("1- Adicionar produto;\n2- Visualizar Estoque;\n3- Modificar estoque\n4- Excluir produto\n5- Sair\n");
    console.log("-------------------------");

    // Executa a ação com base na opção selecionada pelo usuário
    switch (opcao) {
        case 1:
            // Adiciona um novo produto
            await adicionarProduto(caminhoDoArquivo, visualizarProdutos.objProduto(caminhoDoArquivo));
            break;
        case 2:
            // Exibe a lista de produtos no estoque
            await visualizarProdutos.apresentarProdutos(visualizarProdutos.objProduto(caminhoDoArquivo));
            break;
        case 3:
            // Modifica o estoque de um produto existente
            await modificarEstoqueProduto(caminhoDoArquivo);
            break;
        case 4:
            // Exclui um produto do estoque
            await excluirProduto(caminhoDoArquivo);
            break;
        case 5:
            // Encerra o loop do menu principal
            return false;
            break;
        default:
            console.log("Opção inválida!"); // Exibe uma mensagem de erro se a opção não for reconhecida
    }
    return true; // Retorna verdadeiro para continuar exibindo o menu
};

// Função principal que executa o menu até que o usuário escolha sair
const executarMenuPrincipal = async () => {
    let continuar = true; // Variável para controlar o loop do menu
    while (continuar) {
        continuar = await exibirMenuDeEstoque(); // Exibe o menu e atualiza a variável de controle
    }
}

// Função principal que cria o arquivo se não existir e inicia o menu
const main = async () => {
    await criarArquivoSeNaoExiste(caminhoDoArquivo); // Cria o arquivo de estoque se necessário
    await executarMenuPrincipal(); // Inicia o menu principal
}

// Chama a função principal para iniciar o programa
main();
