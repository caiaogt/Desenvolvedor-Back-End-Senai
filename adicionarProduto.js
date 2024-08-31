const readline = require("readline-sync"); // Importa o módulo readline-sync para permitir entrada de dados do usuário no terminal.
const fs = require("fs"); // Importa o módulo fs (file system) para manipulação de arquivos.

const adicionarProduto = async (caminho, ControleDeEstoque) => {
    // Função assíncrona para adicionar um novo produto ao estoque.
    // `caminho` é o caminho do arquivo onde os produtos serão armazenados.
    // `ControleDeEstoque` é o array de produtos existente (já lido do arquivo).

    let produto = await ControleDeEstoque; // Espera a promessa ser resolvida e armazena o array de produtos existente.

    let qtdProduto = produto.length + 1; // Calcula o ID do novo produto com base na quantidade de produtos existente.

    let novoProduto = { // Cria um novo objeto de produto com os detalhes fornecidos pelo usuário.
        id: qtdProduto, // ID do produto, definido como a quantidade atual de produtos + 1.
        produto: readline.question('\nQual o nome do produto: '), // Solicita o nome do produto ao usuário.
        estoque: parseInt(readline.question('\nQual a quantidade em estoque: '), 10), // Solicita a quantidade em estoque e converte para número inteiro.
        status: 0 // Define o status inicial como 0 (possivelmente para indicar que o produto está ativo ou disponível).
    };

    produto.push(novoProduto); // Adiciona o novo produto ao array de produtos existente.

    const produtoJSON = JSON.stringify(produto); // Converte o array de produtos para formato JSON para armazenamento.

    try {
        fs.writeFileSync(caminho, produtoJSON); // Grava o array de produtos atualizado no arquivo especificado.
        console.log('Produto adicionado com sucesso!'); // Mensagem de sucesso após adicionar o produto.
    } catch (err) { // Captura erros que possam ocorrer durante a gravação do arquivo.
        console.error("Erro ao adicionar produto: ", err); // Exibe uma mensagem de erro no console se algo der errado.
    }
};

module.exports = adicionarProduto; // Exporta a função adicionarProduto para uso em outros módulos.
