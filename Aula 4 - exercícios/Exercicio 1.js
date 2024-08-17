const readline = require ("readline-sync");

/*
porque usar a const readline e ela receber o require?
*/

// Aqui, o programa solicita ao usuário o nome da disciplina. O método `question` exibe uma pergunta ao usuário e captura a resposta, armazenando-a na constante `disciplina`.
const disciplina = readline.question("Digite o nome da disciplina: \n");

// O programa pergunta ao usuário quantas notas ele deseja digitar. O método `questionInt` é semelhante ao `question`, mas converte a entrada do usuário em um número inteiro, que é armazenado na constante `numNota`.
const numNota = readline.questionInt("quantas notas ira digitar?\n");

 // Inicializa um array vazio para armazenar as notas.
const notas = []
/*Este trecho de código usa um loop `for` para iterar o número de vezes que o usuário indicou com `numNota`.
Em cada iteração, o programa pede uma nota ao usuário usando `questionFloat`, que converte a entrada para um
número de ponto flutuante (decimal). Cada nota é então adicionada ao array `notas` usando o método `push`.
*/
for (let i = 0; i < numNota; i++) {
    const nota = readline.questionFloat(`Digite a nota ${i + 1}ª: `);
    notas.push(nota);
}

// Aqui, você está utilizando o método `reduce` para somar todas as notas no array `notas`. A função `reduce` itera sobre cada elemento do array, acumulando o valor total em `acc`, que começa em 0.
const soma = notas.reduce((acc, nota) => acc + nota, 0);

// Após calcular a soma das notas, você divide esse valor pelo número de notas (`notas.length`) para obter a média.
const media = soma / notas.length;


// Finalmente, o programa exibe o nome da disciplina e a média das notas calculada.
console.log(`Disciplina: ${disciplina}`);
console.log(`Sua media de nota: ${media.toFixed(2)}`)