const readline = require("readline-sync"); // Importa o módulo readline-sync para capturar a entrada do usuário
const fs = require("fs"); // Importa o módulo fs para operações de leitura e escrita de arquivos

// Função assíncrona para modificar o estoque de um produto
const modificarEstoqueProduto = async (caminho) => {
    // Importa o módulo para visualizar produtos
    const visualizar = require("./visualizarProdutos");

    // Obtém a lista de produtos do arquivo especificado
    const produtos = await visualizar.objProduto(caminho);

    // Exibe a lista de produtos ao usuário
    await visualizar.apresentarProdutos(produtos);

    // Obtém a quantidade de produtos
    let qtd = produtos.length;

    // Verifica se há produtos para modificar
    if (qtd >= 1) {
        // Captura a opção do usuário para selecionar o produto a ser modificado
        let opcao = readline.questionInt("\nSelecione o número do produto que deseja modificar: ");

        // Valida a opção fornecida pelo usuário
        while (opcao < 1 || opcao > qtd) {
            console.log("OPÇÃO INVÁLIDA"); // Exibe mensagem de erro para opção inválida
            opcao = readline.questionInt("\nSelecione o número do produto que deseja modificar: ");
        }

        // Seleciona o produto com base na opção fornecida
        const produtoSelecionado = produtos[opcao - 1];
        console.log(`\nProduto selecionado: ${produtoSelecionado.produto}`);
        console.log(`Quantidade atual em estoque: ${produtoSelecionado.estoque}`);

        // Captura a nova quantidade de estoque fornecida pelo usuário
        let novaQuantidade = readline.questionInt("\nInforme a nova quantidade em estoque: ");

        // Atualiza a quantidade de estoque do produto selecionado
        produtoSelecionado.estoque = parseInt(novaQuantidade, 10);

        // Exibe a nova quantidade de estoque para confirmação
        console.log(`Novo estoque de ${produtoSelecionado.produto}: ${produtoSelecionado.estoque}`);

        // Converte a lista de produtos atualizada para o formato JSON
        const produtoJSON = JSON.stringify(produtos, null, 2);

        try {
            // Salva a lista de produtos atualizada no arquivo
            fs.writeFileSync(caminho, produtoJSON);
            console.log("Estoque atualizado com sucesso!"); // Mensagem de sucesso
        } catch (err) {
            console.error('Erro ao salvar alterações: ', err); // Mensagem de erro em caso de falha ao salvar
        }
    } else {
        console.log("Não há produtos para modificar."); // Mensagem quando não há produtos
    }
}

// Exporta a função modificarEstoqueProduto para uso em outros módulos
module.exports = modificarEstoqueProduto;
