// Dados do questionário
const questions = [
    // [Pergunta, Resposta 1 Texto, Resposta 1 Atributo, Resposta 2 Texto, Resposta 2 Atributo]
    ["O que é mais divertido para você?", "Matar um monstro gigante", "a", "Contar vantagem para seus amigos", "s"],
    ["O que você aproveita mais em missões?", "Envolver-se na história", "s", "Receber as recompensas no final", "a"],
    ['Em um jogo online, pelo que você preferiria ser notado?', "Pelo seu equipamento", "a", "Pela sua personalidade", "s"],
    ["O que você aproveita mais em um jogo online?", "Ficar por dentro das fofocas", "s", "Conseguir um novo item", "a"],
    ['O que você preferiria ter, como jogador em um jogo online?', "Um canal privado para conversar com seus amigos", "s", "Sua própria casa, valendo milhões de moedas de ouro", "a"],
    ["O que você aproveitaria mais como jogador online?", "Administrar sua própria taverna", "s", "Criar seus próprios mapas do mundo e vendê-los", "e"],
    ["O que é mais importante em um jogo online para você?", "A quantidade de pessoas", "s", "A quantidade de áreas para explorar", "e"],
    ["O que é mais importante para você?", "A qualidade da interpretação de papéis (roleplay) em um jogo online", "s", "A singularidade das funções e mecânicas do jogo", "e"],
    ["Você está sendo perseguido por um monstro em um jogo online. Você:", "Pede ajuda a um amigo para derrotá-lo", "s", "Se esconde em algum lugar que sabe que o monstro não seguirá", "e"],
    ["Você está prestes a entrar em uma masmorra desconhecida e pode escolher mais uma pessoa para seu grupo. Você leva:", "Um bardo, que é seu amigo e entretém o grupo", "s", "Um mago, que conhece os segredos que seus amigos", "e"],
    ["O que você preferiria?", "Saber onde encontrar as coisas", "e", "Saber como conseguir as coisas", "a"],
    ["O que você preferiria fazer?", "Resolver um enigma que ninguém mais resolveu", "e", "Alcançar certo nível de experiência mais rápido que qualquer um", "a"],
    ['Em um jogo online, você preferiria entrar para um clã de:', "Acadêmicos", "e", "Assassinos", "k"],
    ["O que você preferiria vencer?", "Um concurso de perguntas e respostas (trivia)", "e", "Uma batalha em arena", "k"],
    ['Se você está sozinho em uma área, você pensa:', "Que é seguro explorar", "e", "Que terá de procurar presas em outro lugar", "k"],
    ["Você descobre que outro jogador planeja sua morte. Você:", "Vai para uma área que ele não conhece e se prepara lá", "e", "O ataca antes que ele ataque você", "k"],
    ["Você encontra um novo jogador. Você o vê como:", "Alguém que pode apreciar seu conhecimento do jogo", "e", "Uma presa em potencial", "k"],
    ['Em um jogo online, você preferiria:', "Ter uma espada duas vezes mais poderosa que qualquer outra", "a", "Ser a pessoa mais temida do jogo", "k"],
    ['Em um jogo online, você teria mais tendência a se gabar de:', "Quantos jogadores você matou", "k", "Seu equipamento", "a"],
    ["O que você preferiria ter?", "Um feitiço que causa dano a outros jogadores", "k", "Um feitiço que aumenta sua taxa de ganho de experiência", "a"],
    ["O que você preferiria ter?", "Dois níveis de experiência", "a", "Um amuleto que aumenta em 10% o dano contra outros jogadores", "k"],
    ['Ao jogar um videogame, o que é mais divertido?', "Ter a maior pontuação da lista", "a", "Vencer seu melhor amigo em um duelo", "k"]
];

// Mapeamento dos perfis e pontuação inicial
let profiles = {
    'a': { name: "Conquistador (Achiever)", color: "bg-green-500", rawScore: 0 },
    'k': { name: "Competidor (Killer)", color: "bg-red-500", rawScore: 0 },
    's': { name: "Socializador (Socializer)", color: "bg-blue-500", rawScore: 0 },
    'e': { name: "Explorador (Explorer)", color: "bg-yellow-500", rawScore: 0 }
};

// Variáveis de estado
let currentAnswers = {};
let shuffledQuestions = [];
let currentPairIndex = 0;
let userData = { name: '', email: '' };
const totalQuestions = questions.length;
const QUESTIONS_PER_PAGE = 2; // Exibe 2 perguntas por vez
let finalResults = []; // Variável para armazenar os resultados finais prontos para envio

// URL para o seu Google Apps Script (ATUALIZADO COM SEU LINK)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx3waY6HhYcrGaJz5WtL9gdjZ60fP2cmdh_TzOneFVrdXOInNIv8Ij1ey6sO8GiJrq1/exec";

// Referências DOM
const homeContainer = document.getElementById('home-container');
const quizScreen = document.getElementById('quiz-screen');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const profileResults = document.getElementById('profile-results');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const errorMessage = document.getElementById('error-message'); // Adicionado

// Função utilitária para embaralhar um array (Algoritmo Fisher-Yates)
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Função para iniciar o questionário
function startQuiz() {
    // 1. Captura dados do usuário e valida
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');

    userData.name = nameInput.value.trim();
    userData.email = emailInput.value.trim();

    // Validação obrigatória
    if (!userData.name || !userData.email || !emailInput.checkValidity()) {
        errorMessage.classList.remove('hidden');
        nameInput.classList.toggle('border-red-500', !userData.name);
        emailInput.classList.toggle('border-red-500', !userData.email || !emailInput.checkValidity());
        return; // Impede o início do quiz
    }
    
    // Se a validação passar
    errorMessage.classList.add('hidden');
    nameInput.classList.remove('border-red-500');
    emailInput.classList.remove('border-red-500');


    // 2. Embaralha as perguntas originais
    shuffledQuestions = shuffle([...questions]);

    // 3. Reseta o estado
    currentAnswers = {};
    currentPairIndex = 0;
    Object.keys(profiles).forEach(key => profiles[key].rawScore = 0);

    // 4. Altera a tela
    homeContainer.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    restartButton.classList.add('hidden');
    quizScreen.classList.remove('hidden');

    // 5. Renderiza o primeiro par de perguntas
    renderQuiz();
}

// Função para renderizar o par de perguntas atual
function renderQuiz() {
    const startIndex = currentPairIndex * QUESTIONS_PER_PAGE;
    const currentPair = shuffledQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

    // Atualiza o texto do botão
    const isLastPair = startIndex + QUESTIONS_PER_PAGE >= totalQuestions;
    nextButton.textContent = isLastPair ? 'Finalizar Questionário' : 'Próximo Par de Perguntas';

    quizContainer.innerHTML = currentPair.map((q, localIndex) => {
        // O índice global é necessário para salvar a resposta em currentAnswers
        const globalIndex = startIndex + localIndex; 
        
        const questionText = q[0];
        const option1Text = q[1];
        const option1Attr = q[2];
        const option2Text = q[3];
        const option2Attr = q[4];

        const isChecked1 = currentAnswers[globalIndex] === option1Attr;
        const isChecked2 = currentAnswers[globalIndex] === option2Attr;

        return `
            <div class="question-block p-4 border border-gray-200 rounded-lg shadow-md bg-white">
                <h3 class="text-lg font-semibold mb-4 text-gray-800">
                    ${globalIndex + 1}. ${questionText}
                </h3>
                <div class="flex flex-col md:flex-row gap-4">
                    <!-- Opção 1 -->
                    <label class="flex-1">
                        <input type="radio" name="q${globalIndex}" value="${option1Attr}" data-question-index="${globalIndex}" class="hidden" ${isChecked1 ? 'checked' : ''} onchange="handleAnswerChange(this)">
                        <div class="profile-option p-4 border-2 rounded-lg text-gray-700 font-medium border-gray-300 hover:border-indigo-400">
                            ${option1Text}                            
                            <div class="check-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" style="width: 0.875rem; height: 0.875rem;" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                            </div>
                        </div>
                    </label>

                    <!-- Opção 2 -->
                    <label class="flex-1">
                        <input type="radio" name="q${globalIndex}" value="${option2Attr}" data-question-index="${globalIndex}" class="hidden" ${isChecked2 ? 'checked' : ''} onchange="handleAnswerChange(this)">
                        <div class="profile-option p-4 border-2 rounded-lg text-gray-700 font-medium border-gray-300 hover:border-indigo-400">
                            ${option2Text}                           
                            <div class="check-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" style="width: 0.875rem; height: 0.875rem;" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        `;
    }).join('');
    
    updateUI(); // Atualiza o progresso e o estado do botão "Próximo"
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Volta ao topo
}

// Função chamada ao mudar uma resposta
function handleAnswerChange(input) {
    // Corrigido para acessar o dataset em camelCase
    const index = parseInt(input.dataset.questionIndex); 
    currentAnswers[index] = input.value;
    
    // Re-executa updateUI para verificar se o par atual está completo
    updateUI();
}

// Função para calcular a pontuação total e o progresso
function calculateScore() {
    // Zera a pontuação
    Object.keys(profiles).forEach(key => profiles[key].rawScore = 0);
    
    let answeredCount = 0;

    // Soma os pontos com base nas respostas
    shuffledQuestions.forEach((q, index) => {
        const attribute = currentAnswers[index];
        if (attribute && profiles[attribute]) {
            profiles[attribute].rawScore += 1;
            answeredCount++;
        }
    });

    return answeredCount;
}

// Função principal para atualizar a UI (progresso e navegação)
function updateUI() {
    const answeredCount = calculateScore();

    // 1. Atualiza barra de progresso
    const progressPercentage = (answeredCount / totalQuestions) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${answeredCount} / ${totalQuestions}`;
    
    // 2. Verifica se o par de perguntas atual está completo
    const startIndex = currentPairIndex * QUESTIONS_PER_PAGE;
    const currentPairSize = Math.min(QUESTIONS_PER_PAGE, totalQuestions - startIndex);
    let currentPairAnswered = true;

    for (let i = 0; i < currentPairSize; i++) {
        if (typeof currentAnswers[startIndex + i] === 'undefined') {
            currentPairAnswered = false;
            break;
        }
    }

    // 3. Habilita/Desabilita botão "Próximo"
    if (currentPairAnswered) {
        nextButton.disabled = false;
        nextButton.classList.remove('disabled-button');
        nextButton.classList.add('hover:bg-indigo-700');
    } else {
        nextButton.disabled = true;
        nextButton.classList.add('disabled-button');
        nextButton.classList.remove('hover:bg-indigo-700');
    }
}

// Função para ir para o próximo par de perguntas ou finalizar
function goToNextPair() {
    const startIndex = currentPairIndex * QUESTIONS_PER_PAGE;
    const isLastPair = startIndex + QUESTIONS_PER_PAGE >= totalQuestions;

    if (isLastPair) {
        displayResults();
    } else {
        currentPairIndex++;
        renderQuiz();
    }
}


// Mapeamento de cores Tailwind para as barras de progresso
const colorMap = {
    'a': 'bg-green-600', // Conquistador
    'k': 'bg-red-600',   // Competidor
    's': 'bg-blue-600',  // Socializador
    'e': 'bg-yellow-500' // Explorador
};

// Função para exibir os resultados
function displayResults() {
    calculateScore(); // Garante o cálculo final

    quizScreen.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    
    // Cria um array de perfis para ordenar e exibir
    const profileArray = Object.keys(profiles).map(key => ({
        id: key,
        name: profiles[key].name,
        score: profiles[key].rawScore,
        color: colorMap[key]
    }));

    // Ordena e armazena os resultados finais globalmente
    finalResults = profileArray.sort((a, b) => b.score - a.score);

    profileResults.innerHTML = finalResults.map(profile => {
        const percentage = ((profile.score / totalQuestions) * 100).toFixed(1);
        
        return `
            <div class="p-3 border rounded-lg bg-white shadow">
                <div class="flex justify-between items-center mb-1">
                    <span class="font-semibold text-lg text-gray-900">${profile.name}</span>
                    <span class="text-xl font-extrabold ${profile.color.replace('bg-', 'text-')}">${profile.score}</span>
                </div>
                <div class="progress-bar-container">
                    <div class="${profile.color} h-full transition-all duration-700 ease-out" style="width: ${percentage}%;"></div>
                </div>
                <p class="text-sm text-gray-500 mt-1">Pontos: ${profile.score} de ${totalQuestions} (${percentage}%)</p>
            </div>
        `;
    }).join('');
    
    // Garante que o usuário veja os resultados
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // NOVO: Chama o envio automático para o Google Sheets
    sendResultsToSheet();
}

// Função para enviar os dados para o Google Apps Script
async function sendResultsToSheet() {
    console.log('--- Tentativa de Envio de Dados para Google Sheets ---');
    
    if (GOOGLE_SCRIPT_URL === "") {
        console.error('ERRO: O URL do Google Apps Script não foi configurado. O envio foi ignorado.');
        return;
    }

    // 1. Coleta os dados a serem enviados
    const primaryProfile = finalResults.length > 0 ? finalResults[0] : { name: "N/A" };
    
    // 2. Cria um objeto FormData tradicional para envio de formulário
    const formData = new URLSearchParams();
    formData.append('timestamp', new Date().toLocaleString('pt-BR'));
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('primaryProfile', primaryProfile.name);
    formData.append('scoreAchiever', profiles['a'].rawScore);
    formData.append('scoreKiller', profiles['k'].rawScore);
    formData.append('scoreSocializer', profiles['s'].rawScore);
    formData.append('scoreExplorer', profiles['e'].rawScore);


    try {
        // 3. Requisição POST para o Apps Script usando o corpo do formulário
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Necessário para evitar erros de CORS
            body: formData, // Envia como dados de formulário
            // OBS: Não definir Content-Type ao usar URLSearchParams, o navegador faz isso automaticamente
        });
        
        // Em modo 'no-cors', a resposta sempre parece bem-sucedida.
        console.log('SUCESSO: Dados enviados para o Google Sheets. Verifique sua planilha.');
        console.log('Dados enviados (Form Data):', Object.fromEntries(formData.entries()));
        
    } catch (error) {
        console.error('ERRO CRÍTICO no Envio de Dados para Google Sheet:', error);
    }
}

// Função para reiniciar o quiz
function resetQuiz() {
    // Zera o estado e volta para a tela inicial
    currentAnswers = {};
    shuffledQuestions = [];
    currentPairIndex = 0;
    userData = { name: '', email: '' };
    finalResults = []; // Limpa resultados

    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';

    quizScreen.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    restartButton.classList.add('hidden');
    homeContainer.classList.remove('hidden');
    
    // Volta para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Chamada de inicialização para garantir que a tela inicial esteja visível
// Chamada sem usar window.onload para evitar problemas de carregamento no ambiente
document.addEventListener('DOMContentLoaded', resetQuiz);