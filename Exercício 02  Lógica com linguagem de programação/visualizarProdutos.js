const readline = require("readline-sync"); // Importa o módulo readline-sync para capturar a entrada do usuário
const fs = require("fs"); // Importa o módulo fs para operações de leitura e escrita de arquivos

const controller = {
    // Função assíncrona para obter a lista de produtos a partir de um arquivo
    objProduto: async (caminho) => {
        try {
            // Lê o conteúdo do arquivo no caminho especificado
            const conteudo = fs.readFileSync(caminho, 'utf-8');
            // Converte o conteúdo JSON do arquivo em um objeto JavaScript
            const produto = JSON.parse(conteudo);
            return produto; // Retorna o objeto de produtos
        } catch (err) {
            // Exibe uma mensagem de erro se houver um problema ao ler ou processar o arquivo
            console.error('Erro ao processar os produtos: ', err);
        }
    },

    // Função assíncrona para apresentar os produtos e suas quantidades em estoque
    apresentarProdutos: async (objProduto) => {
        // Obtém a lista de produtos, garantindo que é uma promessa resolvida
        const produto = await objProduto;

        // Obtém a quantidade total de produtos
        let qtd = produto.length;

        // Verifica se há produtos na lista
        if (qtd >= 1) {
            let status = "";

            // Itera sobre cada produto na lista
            for (let i = 0; i <= qtd - 1; i++) {
                // Converte a quantidade de estoque para um número inteiro
                let estoqueAtual = parseInt(produto[i].estoque, 10);

                // Define o status do produto com base na quantidade de estoque
                status = estoqueAtual > 0 ? "Produto em estoque" : "Produto não consta em estoque";

                // Exibe as informações do produto, incluindo a quantidade em estoque e o status
                console.log(`\n${i + 1}- ${produto[i].produto} | QUANTIDADE EM ESTOQUE: ${estoqueAtual} | ${status}\n`);
            }

        } else {
            // Exibe uma mensagem se não houver produtos na lista
            console.log("Não há produtos cadastrados!");
        }

    }

}

// Exporta o módulo controller para que possa ser utilizado em outros arquivos
module.exports = controller;
