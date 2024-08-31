const readline = require('readline-sync')

class Pessoa {
    nome;
    idade;
    peso;
    altura;

    constructor(pNome, pIdade, pPeso, pAltura) {
        this.nome = pNome
        this.idade = pIdade
        this.peso = pPeso
        this.altura = pAltura

    }

    calcularIMC() {
        const imc = this.peso / (this.altura * this.altura)
        return imc.toFixed(2)
    }

    exibirInformacoes() {
        const imc = this.calcularIMC()
        console.log(`IMC: ${this.calcularIMC()}`);
        if (imc !== 'Altura inválida') {
            if (imc < 18.5) {
                console.log("Magreza");
            } else if (imc < 24.9) {
                console.log("Normal");
            } else if (imc < 29.9) {
                console.log("Sobrepeso");
            } else if (imc < 34.9) {
                console.log("Obesidade grau I");
            } else if (imc < 39.9) {
                console.log("Obesidade grau II");
            } else {
                console.log("Obesidade grau III");
            }
        }
    }
}



const nome = readline.question("Digite o nome: ");
const idade = readline.questionInt("Digite a idade: ");
const peso = readline.questionFloat("Digite o peso (kg): ");
let altura;
do {
    altura = readline.questionFloat("Digite a altura (m): ");
    if (altura <= 0) {
        console.log("Altura inválida. A altura deve ser maior que 0.");
    }
} while (altura <= 0);

const pessoa = new Pessoa(nome, idade, peso, altura)



pessoa.exibirInformacoes()