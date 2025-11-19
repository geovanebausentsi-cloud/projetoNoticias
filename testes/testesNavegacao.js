import { NavegacaoPilha } from "../model/Navegacao.js";


console.log("=== Teste da Navegação com Pilha ===");

// Criando uma lista simples para testar
const lista = ["A", "B", "C", "D"];

// Criando o navegador
const nav = new NavegacaoPilha(lista);

// -----------------------------------------------------------
// 1. Testar avanço simples
// -----------------------------------------------------------
console.log("\n--- Teste: proximo() ---");
console.log("Atual:", nav.obterAtual());        // A
console.log("Próximo:", nav.proximo());         // B
console.log("Próximo:", nav.proximo());         // C
console.log("Próximo:", nav.proximo());         // D
console.log("Tentando avançar além do último:", nav.proximo()); // D (não avança)


// -----------------------------------------------------------
// 2. Testar voltar um com anterior()
// -----------------------------------------------------------
console.log("\n--- Teste: anterior() ---");
console.log("Atual:", nav.obterAtual());        // deve estar em D
console.log("Anterior:", nav.anterior());       // C
console.log("Anterior:", nav.anterior());       // B
console.log("Anterior:", nav.anterior());       // A
console.log("Tentando voltar além do primeiro:", nav.anterior()); // A


// -----------------------------------------------------------
// 3. Testar voltar usando a pilha (voltarPilha())
// -----------------------------------------------------------
console.log("\n--- Teste: voltarPilha() ---");

// vamos navegar de A → B → C → D
nav.proximo();   // B
nav.proximo();   // C
nav.proximo();   // D

console.log("Atual antes de voltar:", nav.obterAtual());
console.log("Voltando no histórico:", nav.voltarPilha()); // C
console.log("Voltando no histórico:", nav.voltarPilha()); // B
console.log("Voltando no histórico:", nav.voltarPilha()); // A
console.log("Tentando voltar sem histórico:", nav.voltarPilha()); // A


// -----------------------------------------------------------
// 4. Mostrar estado final
// -----------------------------------------------------------
console.log("\n--- Estado Final ---");
console.log("Índice atual:", nav.indice);
console.log("Item atual:", nav.obterAtual());
console.log("Histórico restante:", nav.historico);
