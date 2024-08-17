const readline = require ("readline-sync");
// Declaração de variáveis que serão usadas no cálculo dos descontos e do salário final
let aliquotaINSS, aliquotaIRF, salarioFinal, parcelaDeduzir , parcelaDeduzirIRF, descontoFaixaQuatro,  totalDescontos, totalINSS, totalIRF = 0

// Declaração de variáveis que serão usadas para armazenar descontos adicionais, caso o salário caia em outras faixas.
const descontoFaixaUm = 105.90
let descontoFaixaDois =  112.92
let descontoFaixaTres = 160.00

//Solicita o nome do colaborador e armazena na variavel "nomeColaborador"
let nomeColaborador = readline.question("Digite o nome do colaborador: \n")

//solicita o salario do colaborador e armazena na variavel "salario"
let salario = readline.questionFloat("Digite o salario do " + nomeColaborador + ":\n")

// Verifica em qual faixa salarial o salário do colaborador se enquadra para determinar a alíquota do INSS.

if (salario < 1412){
    // Para salários abaixo de R$ 1412, a alíquota do INSS é de 7,5%.
        aliquota = 7.5/100; // Alíquota de 7,5% convertida para decimal.
        // 
}else if (salario>=1412 && salario <= 2666.68){
    // Para salários entre R$ 1412 e R$ 2666,68, a alíquota do INSS é de 9%.
            aliquotaINSS = 9/100;  // Alíquota de 9% convertida para decimal.
            parcelaDeduzir = 21.18;// Valor a ser deduzido para essa faixa salarial.
            descontoFaixaDois = (salario* aliquotaINSS);// Calcula o desconto específico para essa faixa.
            totalINSS = descontoFaixaDois - parcelaDeduzir;
           
            
} else if (salario >= 2666.69 && salario <= 4000.03){
     // Para salários entre R$ 2666,69 e R$ 4000,03, a alíquota do INSS é de 12%.
            aliquotaINSS = 12/100;// Alíquota de 12% convertida para decimal.
            parcelaDeduzir = 101.18;// Valor a ser deduzido para essa faixa salarial.
            descontoFaixaTres =(salario*aliquotaINSS)
            totalINSS = descontoFaixaTres - parcelaDeduzir;
        

} else if (salario >= 4000.04 && salario < 7786.02){
            aliquotaINSS = 14/100;// Aliquota de 14% convertida para decimal.
            parcelaDeduzir = 181.18;// Valor a ser deduzido para essa faixa salarial.
            descontoFaixaQuatro = (salario*aliquotaINSS);// Calcula o desconto específico para essa faixa.
            totalINSS =descontoFaixaUm + descontoFaixaDois + descontoFaixaTres + descontoFaixaQuatro - parcelaDeduzir;
                    
}
/* Calcule o salário base subtraindo o total do INSS do salário bruto,
para que seja possível calcular o IRF
*/
salarioFinal = (salario - totalINSS)
// Inicia o cálculo do IRF (Imposto de Renda) com base no salário após os descontos do INSS
// Se o salário final for menor ou igual a R$ 2112, não há desconto de IRF.    
if (salarioFinal <= 2112){
            totalIRF = 0;
    } else if (salarioFinal >= 2112.01 && salarioFinal <=2826.65){
            aliquotaIRF = 7.5/100;// Para salários entre R$ 2112,01 e R$ 2826,65, a alíquota do IRF é de 7,5%.
            parcelaDeduzirIRF = 158.40 // Valor a ser deduzido para essa faixa salarial do IRF.         
            totalIRF = (salarioFinal*aliquotaIRF-parcelaDeduzirIRF) // Calcula o total de IRF a ser descontado.

    } else if(salarioFinal >= 2826.66 && salarioFinal <=3751.05){
            aliquotaIRF = 15/100// Para salários entre R$ 2826,66 e R$ 3751,05, a alíquota do IRF é de 15%.
            parcelaDeduzirIRF = 370.40 // Valor a ser deduzido para essa faixa salarial do IRF.   
            totalIRF = (salarioFinal*aliquotaIRF-parcelaDeduzirIRF) // Calcula o total de IRF a ser descontado.


    } else if(salarioFinal >= 3751.06 && salarioFinal <=4664.68){
        aliquotaIRF = 22.5/100// Para salários entre R$ 3751,06 e R$ 4664,68, a alíquota do IRF é de 22,5%.
        parcelaDeduzirIRF = 651.73 // Valor a ser deduzido para essa faixa salarial do IRF.   
        totalIRF = (salarioFinal*aliquotaIRF-parcelaDeduzirIRF) // Calcula o total de IRF a ser descontado.
    } else {
            aliquotaIRF = 27.5/100 // Para salários acima de R$ 4664,68, a alíquota do IRF é de 27,5%.
            parcelaDeduzirIRF = 884.96 // Valor a ser deduzido para essa faixa salarial do IRF.   
            totalIRF = (salarioFinal*aliquotaIRF-parcelaDeduzirIRF) // Calcula o total de IRF a ser descontado.
    }

// Calcula o desconto do vale transporte (VT), que é 6% do salário bruto.
let totalVT =  6 / 100 * salario;

// Calcula o total de descontos, somando INSS, VT e IRF.
totalDescontos = (totalINSS + totalVT + totalIRF);

// Calcula o salário final subtraindo o total de descontos do salário bruto.
salarioFinal = (salario - totalDescontos);



if (totalIRF > 0){// Se houver desconto de IRF, exibe os valores de INSS, IRF, VT e o salário final.
    console.log (`Valor de desconto do inss: R$ ${totalINSS.toFixed(2)}`)
console.log (`Valor do IRF (Imposto de renda): R$${totalIRF.toFixed(2)}`)
console.log (`Valor do VT (Vale transporte): R$${totalVT.toFixed(2)}`)
console.log (`O valor total dos descontos e: R$${totalDescontos.toFixed(2)}`)
console.log (`O salario final do colaborador ${nomeColaborador} e de: R$${salarioFinal.toFixed(2)}`)

} else { // Se não houver desconto de IRF, exibe apenas os valores de INSS, VT e o salário final.
    console.log (`Valor de desconto do inss: R$ ${totalINSS.toFixed(2)}`)
console.log (`O colaborador nao possui desconto do IRF (imposto de renda)`)
console.log (`Valor do VT (Vale transporte): R$ ${totalVT.toFixed(2)}`)
console.log (`O valor total dos descontos e: R$ ${totalDescontos.toFixed(2)}`)
console.log (`O salario final do colaborador ${nomeColaborador} e de: R$ ${salarioFinal.toFixed(2)}`)
}
