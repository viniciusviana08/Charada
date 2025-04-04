const baseUrl = "https://gerador-charadas-api-auh8.vercel.app/";
const aleatorio = "/charadas";

let charadaAtual = null; // Variável global para armazenar a charada atual

async function getCharada() {
    try {
        const charada = await fetch(baseUrl + aleatorio);
        const charadaJson = await charada.json();
        
        // Atualiza a charada no elemento HTML
        document.getElementById("charada-pergunta").textContent = charadaJson.charada;
        charadaAtual = charadaJson; // Armazena a charada atual
        document.getElementById("resposta-container").textContent = "..."; // Limpa a resposta anterior
        resetCard(); // Garante que o card volte para a frente
    } catch (error) {
        console.log("Erro ao chamar api: " + error);
        alert("Erro ao carregar a charada. Tente novamente mais tarde.");
    }
}

function mostrarResposta() {
    if (charadaAtual) {
        // Atualiza o elemento para mostrar a resposta
        document.getElementById("resposta-container").textContent = charadaAtual.resposta;
        flipCard(); // Gira o card para mostrar a resposta
    } else {
        alert("Nenhuma charada carregada. Clique em 'Nova charada' para começar.");
    }
}

function flipCard() {
    const card = document.getElementById("flashcard");
    card.classList.add("flip");
}

function resetCard() {
    const card = document.getElementById("flashcard");
    card.classList.remove("flip");
}

// Adiciona eventos aos botões
document.getElementById("ver-resposta").addEventListener("click", mostrarResposta);
document.getElementById("voltar-charada").addEventListener("click", getCharada);

// Carrega a primeira charada ao abrir a página
getCharada();