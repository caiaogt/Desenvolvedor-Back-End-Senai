const readline = require("readline-sync"); // Importa o módulo readline-sync para capturar entrada do usuário
const fs = require("fs"); // Importa o módulo fs para realizar operações de leitura e escrita de arquivos

const excluirProduto = async (caminho) => { // Define uma função assíncrona 'excluirProduto' que recebe o caminho do arquivo
    const visualizar = require ("./visualizarProdutos"); // Importa o módulo 'visualizarProdutos', que contém funções para visualizar produtos
    const produto = await visualizar.objProduto(caminho); // Chama a função 'objProduto' para carregar a lista de produtos do arquivo especificado por 'caminho'

    await visualizar.apresentarProdutos(produto); // Exibe a lista de produtos carregada para o usuário

    let qtd = produto.length; // Armazena o número total de produtos na variável 'qtd'

    if (qtd >= 1) { // Verifica se há pelo menos um produto na lista
        let opcao = readline.questionInt("\nSelecione um produto para excluir: "); // Solicita ao usuário o número do produto a ser excluído

        while (opcao < 1 || opcao > qtd) { // Valida a entrada do usuário para garantir que está dentro do intervalo aceitável
            console.log("OPÇÃO INVÁLIDA"); // Exibe uma mensagem de erro se a opção não for válida
            opcao = readline.questionInt("\nSelecione um produto para excluir: "); // Solicita novamente a opção do usuário
        }

        produto.splice(opcao - 1, 1); // Remove o produto selecionado da lista usando o método 'splice'. 'opcao - 1' ajusta o índice do produto
        const produtoJSON = JSON.stringify(produto.filter(Boolean)); // Converte a lista de produtos de volta para o formato JSON e remove quaisquer entradas 'null' ou 'undefined'

        try {
            fs.writeFileSync(caminho, produtoJSON); // Tenta escrever o conteúdo atualizado no arquivo
            console.log("Produto excluído com sucesso!"); // Exibe uma mensagem de sucesso se a operação for bem-sucedida
        } catch (err) { // Captura e trata qualquer erro que ocorra durante a escrita no arquivo
            console.log('Erro ao excluir produto: ', err); // Exibe uma mensagem de erro se ocorrer um problema
        }
    }
}

module.exports = excluirProduto; // Exporta a função 'excluirProduto' para que possa ser usada em outros módulos
