// --- CONFIGURAÇÕES E DADOS DO QUIZ ---
const TIME_LIMIT = 20; 
const QUESTIONS_PER_ROUND = 10; 
const BASE_SCORE_CORRECT = 10; 

// URL DO GOOGLE APPS SCRIPT
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7iwxyjTkMuatVYBi3xK0YNpBjmSRrqf623_u3YGW0t_UGtbKiuu7tJImU_A2ECVHQ/exec"; 

// Lista de Ícones/Emojis relacionados a UX para o fundo
const UX_ICONS = [
    '🖱️', '💡', '🧭', '📊', '✍️', '🔎', '🔗', '📋',
    '👤', '🧠', '✅', '🚀', '🛠️'
];

let timerInterval;
let userData = {
    name: '',
    email: '',
    startTime: null,
    endTime: null
};
// Variáveis de estado globais
let currentQuizQuestions = []; 
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let timeLeft = TIME_LIMIT;
let resultsHistory = []; 
const quizContent = document.getElementById('quiz-content');
const emojiBackgroundContainer = document.getElementById('emoji-background');


/**
 * Gera e insere ícones UX aleatórios no fundo do body.
 */
function generateDynamicEmojiBackground() {
    const numIcons = 8;
    emojiBackgroundContainer.innerHTML = ''; // Limpa antes de gerar

    // Sorteia 8 ícones da lista
    const shuffledIcons = [...UX_ICONS].sort(() => 0.5 - Math.random()).slice(0, numIcons);

    shuffledIcons.forEach(emoji => {
        // Posições aleatórias (em %)
        const top = Math.random() * 90; 
        const left = Math.random() * 90;
        // Rotação e escala aleatórias
        const rotation = Math.random() * 90 - 45; 
        const scale = 0.8 + Math.random() * 0.5; 

        const span = document.createElement('span');
        span.textContent = emoji;
        span.style.top = `${top}%`;
        span.style.left = `${left}%`;
        span.style.setProperty('--rotation', `${rotation}deg`);
        span.style.setProperty('--scale', scale);

        emojiBackgroundContainer.appendChild(span);
    });
}


// --- FUNÇÕES DE LÓGICA DO QUIZ ---

/**
 * Seleciona e embaralha 10 perguntas aleatórias para a rodada.
 * @returns {Array} As 10 questões selecionadas.
 */
function getShuffledQuestions() {
    // Cria uma cópia do array de dados e embaralha
    let array = [...quizData];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    // Retorna apenas as primeiras 10
    return array.slice(0, QUESTIONS_PER_ROUND);
}

/**
 * Inicia o quiz após a coleta de dados do usuário.
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultsHistory = []; // Limpa o histórico a cada novo quiz
    currentQuizQuestions = getShuffledQuestions(); // Sorteia 10 perguntas
    userData.startTime = new Date();
    renderQuestion();
}


/**
 * Inicia ou reseta o timer para a questão atual.
 */
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIME_LIMIT;
    const progressElement = document.getElementById('time-progress');
    const timerDisplay = document.getElementById('timer-display');

    if (progressElement) {
        // Reinicia a barra de progresso visualmente
        progressElement.style.width = '100%';
        progressElement.style.transitionDuration = '0s';
        
        // Força o reflow para garantir que a barra está em 100% antes de iniciar a transição
        void progressElement.offsetWidth; 
        
        // Inicia a animação de regressão em 20 segundos
        progressElement.style.transitionDuration = `${TIME_LIMIT}s`;
        progressElement.style.width = '0%';
    }
    
    if(timerDisplay) timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        if(timerDisplay) timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

/**
 * Lida com o esgotamento do tempo (Time Out).
 */
function handleTimeOut() {
    if (answered) return; // Não faz nada se já tiver respondido
    
    answered = true;
    
    // 1. REGISTRA A RESPOSTA (TEMPO ESGOTADO)
    const currentQ = currentQuizQuestions[currentQuestionIndex];
    resultsHistory.push({
        question: currentQ.question,
        userAnswer: 'Tempo Esgotado',
        isCorrect: false
    });

    const feedbackDiv = document.getElementById('feedback');
    const buttons = document.querySelectorAll('.option-button');

    // Desativa botões e mostra feedback de tempo esgotado
    buttons.forEach(btn => {
        btn.classList.add('disabled');
        btn.onclick = null;
        btn.classList.remove('hover:bg-indigo-600');
        if (btn.dataset.correct === 'true') {
            btn.classList.add('correct'); // Mostra a resposta correta
            btn.classList.remove('bg-trivia-blue');
        }
    });

    // Feedback: 0 Pontos
    feedbackDiv.textContent = 'TEMPO ESGOTADO! ⏱️ (0 Pontos)';
    feedbackDiv.classList.remove('hidden', 'bg-ux-success', 'bg-ux-error');
    feedbackDiv.classList.add('bg-gray-600'); 

    // Avança automaticamente após um pequeno delay para o usuário ver o feedback (2 segundos)
    setTimeout(nextQuestion, 2000); 
}

/**
 * Renderiza a pergunta atual na tela.
 */
function renderQuestion() {
    clearInterval(timerInterval); 

    if (currentQuestionIndex >= currentQuizQuestions.length) {
        showScore();
        return;
    }

    answered = false;
    const currentQ = currentQuizQuestions[currentQuestionIndex];
    const qNum = currentQuestionIndex + 1;
    const totalQ = currentQuizQuestions.length;

    quizContent.innerHTML = `
        <div class="mb-6">
            <!-- Progresso do Quiz -->
            <p class="text-sm font-semibold text-ux-accent mb-1">Progresso: Questão ${qNum} de ${totalQ}</p>
            <div class="w-full bg-gray-600 rounded-full h-2.5 mb-4">
                <div class="bg-ux-accent h-2.5 rounded-full transition-all duration-500" style="width: ${qNum / totalQ * 100}%"></div>
            </div>
            <!-- Contagem Regressiva do Tempo -->
            <div class="flex justify-between items-center mb-1">
                 <p class="text-xs font-semibold text-ux-timer">Tempo Restante:</p>
                 <span id="timer-display" class="text-sm font-bold text-ux-timer">${TIME_LIMIT}</span>
            </div>
            
            <div class="w-full bg-gray-600 rounded-full overflow-hidden h-2">
                <div id="time-progress" class="h-2" style="width: 100%;"></div>
            </div>
        </div>

        <h2 class="text-xl md:text-2xl font-bold mb-8 p-4 bg-gray-700 rounded-xl shadow-inner border border-ux-primary">
            ${currentQ.question}
        </h2>

        <div id="options-container" class="space-y-4">
            ${currentQ.answerOptions.map((option, index) => `
                <button
                    data-correct="${option.isCorrect}"
                    data-index="${index}"
                    class="option-button w-full p-4 rounded-xl text-lg text-left font-medium shadow-md transition-all duration-200 text-white"
                    onclick="selectAnswer(this)"
                >
                    ${String.fromCharCode(97 + index)}) ${option.text}
                </button>
            `).join('')}
        </div>

        <div id="feedback" class="mt-6 p-3 rounded-xl text-center hidden"></div>
    `;
    startTimer();
}

/**
 * Lida com a seleção de uma resposta.
 * @param {HTMLElement} selectedButton O botão que foi clicado.
 */
function selectAnswer(selectedButton) {
    if (answered) return;
    clearInterval(timerInterval); // Para o timer imediatamente
    answered = true;

    const isCorrect = selectedButton.dataset.correct === 'true';
    const buttons = document.querySelectorAll('.option-button');
    const feedbackDiv = document.getElementById('feedback');
    const progressElement = document.getElementById('time-progress');
    
    // Pausa a animação da barra
    if(progressElement) progressElement.style.transitionDuration = '0s';

    // 1. REGISTRA A RESPOSTA
    const currentQ = currentQuizQuestions[currentQuestionIndex];
    resultsHistory.push({
        question: currentQ.question,
        userAnswer: selectedButton.textContent.trim(),
        isCorrect: isCorrect
    });


    // Desativa todos os botões após a resposta
    buttons.forEach(btn => {
        btn.classList.add('disabled');
        btn.onclick = null; // Remove o evento de clique
        btn.classList.remove('hover:bg-indigo-600');
        
        // Realça a resposta correta e a resposta do usuário
        if (btn.dataset.correct === 'true') {
            btn.classList.add('correct');
            btn.style.backgroundImage = 'none'; // Remove o gradiente padrão
        } else if (btn === selectedButton && !isCorrect) {
            btn.classList.add('incorrect');
            btn.style.backgroundImage = 'none'; // Remove o gradiente padrão
        }
    });

    let feedbackText = '';
    
    // LÓGICA DE PONTUAÇÃO AJUSTADA
    if (isCorrect) {
        const pointsGained = BASE_SCORE_CORRECT + timeLeft;
        score += pointsGained;
        feedbackText = `RESPOSTA CORRETA! 🎉 (+${pointsGained} Pontos)`;
        feedbackDiv.classList.remove('hidden', 'bg-ux-error', 'bg-gray-600');
        feedbackDiv.classList.add('bg-ux-success', 'text-gray-900', 'font-bold');
    } else {
        // Resposta Incorreta = 0 pontos.
        feedbackText = 'Resposta Incorreta. 😥 (0 Pontos)';
        feedbackDiv.classList.remove('hidden', 'bg-ux-success', 'bg-gray-600');
        feedbackDiv.classList.add('bg-ux-error');
    }

    feedbackDiv.textContent = feedbackText;
    
    // Avança automaticamente após um pequeno delay para o usuário ver o feedback (1.5 segundos)
    setTimeout(nextQuestion, 1500); 
}

/**
 * Avança para a próxima questão.
 */
function nextQuestion() {
    currentQuestionIndex++;
    renderQuestion();
}

/**
 * Renderiza a tela inicial para coleta de dados.
 */
function renderWelcomeScreen() {
    quizContent.innerHTML = `
        <div class="text-center py-6">
            <h2 class="text-2xl font-bold text-gray-100 mb-2">Bem-vindo(a)!</h2>
            <p class="text-md text-gray-300 mb-4">
                Teste seus conhecimentos em **Experiência do Usuário (UX) Avançada**.
            </p>
            <p class="text-sm text-gray-400 mb-8 font-semibold italic">
                Serão ${QUESTIONS_PER_ROUND} questões sorteadas. Cada acerto vale ${BASE_SCORE_CORRECT} pontos mais o tempo restante. Seja rápido!
            </p>

            <form id="start-form" class="space-y-4 text-left">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Nome Completo:</label>
                    <input type="text" id="name" name="name" required class="w-full">
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-300 mb-1">E-mail:</label>
                    <input type="email" id="email" name="email" required class="w-full">
                </div>
                <button
                    type="submit"
                    class="w-full p-4 bg-ux-accent hover:bg-cyan-600 rounded-xl text-xl font-bold shadow-xl transition-colors duration-300 mt-6 text-white"
                >
                    Começar o QUIZ
                </button>
            </form>
            <div id="error-message" class="text-ux-error mt-4 hidden">Por favor, preencha todos os campos.</div>
        </div>
    `;
    
    document.getElementById('start-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const errorMessage = document.getElementById('error-message');

        if (nameInput.value.trim() && emailInput.value.trim()) {
            userData.name = nameInput.value.trim();
            userData.email = emailInput.value.trim();
            
            startQuiz(); // Chama a nova função de inicialização
        } else {
            errorMessage.classList.remove('hidden');
        }
    });
}

/**
 * Envia os resultados do quiz para o Google Apps Script (que por sua vez insere na Planilha).
 */
async function sendDriveResults() {
    const correctCount = resultsHistory.filter(res => res.isCorrect).length;
    const totalQ = currentQuizQuestions.length;
    const timeTaken = ((userData.endTime.getTime() - userData.startTime.getTime()) / 1000).toFixed(0); 
    const quizDate = new Date().toLocaleString('pt-BR');

    // Formata o histórico de perguntas/respostas em uma string única para facilitar o log na planilha
    const formattedResults = resultsHistory.map((res, index) => {
        const status = res.isCorrect ? 'CORRETA' : 'INCORRETA';
        const correctOption = quizData.find(q => q.question === res.question).answerOptions.find(opt => opt.isCorrect).text;

        return `Q${index + 1}: ${status} (R: ${res.userAnswer.split(')')[0].trim()} | Certa: ${correctOption})`;
    }).join('; ');


    const payload = {
        date: quizDate,
        name: userData.name,
        email: userData.email,
        score: score,
        correctCount: correctCount,
        totalQuestions: totalQ,
        timeTaken: timeTaken,
        detailedResults: formattedResults
    };

    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Necessário para a comunicação com o Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        // Como usamos 'no-cors', não podemos ler a resposta, mas o fetch deve ser bem-sucedido.
        console.log('Dados enviados para o Google Apps Script.');
    } catch (error) {
        console.error('Falha ao enviar dados para a Planilha:', error);
        // O usuário verá o feedback na tela mesmo que o envio falhe.
    }
}


/**
 * Mostra a tela de pontuação final.
 */
function showScore() {
    clearInterval(timerInterval);
    userData.endTime = new Date();
    
    // 1. Envia os resultados para o Google Drive
    sendDriveResults();

    const totalQ = currentQuizQuestions.length;
    const timeTaken = ((userData.endTime.getTime() - userData.startTime.getTime()) / 1000).toFixed(0); // Tempo total em segundos
    const maxScorePossible = (BASE_SCORE_CORRECT + TIME_LIMIT) * totalQ; 

    let message = '';
    let emoji = '';

    // Lógica de feedback baseada na pontuação total e quão próximo do máximo
    if (score === maxScorePossible) {
        message = 'UX MASTER! Máxima Pontuação e Eficiência!';
        emoji = '🚀🧠🏆';
    } else if (score >= maxScorePossible * 0.8) {
        message = 'EXCELENTE! Você demonstrou grande entendimento e velocidade em UX.';
        emoji = '🌟';
    } else if (score >= maxScorePossible * 0.5) {
        message = 'MUITO BOM! Reveja alguns conceitos para atingir o nível Master.';
        emoji = '👍';
    } else {
        message = 'Continue aprimorando seus conhecimentos em UX. O aprendizado é contínuo!';
        emoji = '🧐';
    }

    quizContent.innerHTML = `
        <div class="text-center py-10">
            <h2 class="text-4xl font-extrabold text-ux-accent mb-4">${emoji} FIM DO QUIZ ${emoji}</h2>
            
            <div class="text-left bg-gray-600 p-6 rounded-xl inline-block mb-6 shadow-lg">
                <p class="text-sm font-semibold text-gray-300">Aluno(a): <span class="text-white font-bold">${userData.name}</span></p>
                <p class="text-sm font-semibold text-gray-300">E-mail: <span class="text-white font-bold">${userData.email}</span></p>
            </div>

            <p class="text-lg font-semibold text-gray-300">Pontuação Total:</p>
            <p class="text-6xl font-black mb-4 text-ux-success">${score}</p>
            <p class="text-md text-gray-400 mb-2">Máximo Possível: ${maxScorePossible} pontos</p>
            
            <p class="text-md text-gray-300 mb-2">Tempo Gasto: <span class="font-bold text-white">${timeTaken} segundos</span></p>

            <p class="text-2xl font-semibold mb-8">${message}</p>
            
            <button
                class="p-4 bg-ux-accent hover:bg-cyan-600 rounded-xl text-xl font-bold shadow-xl transition-colors duration-300"
                onclick="restartQuiz()"
            >
                Tentar Novamente
            </button>
        </div>
    `;
}

/**
 * Reinicia o quiz (volta para a tela inicial).
 */
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultsHistory = []; 
    // Mantém nome/email preenchidos para a próxima tentativa
    userData = { name: userData.name, email: userData.email, startTime: null, endTime: null }; 
    generateDynamicEmojiBackground(); // Gera um novo fundo de ícones UX
    renderWelcomeScreen();
}

// Inicia o Quiz na tela de boas-vindas e gera o fundo de ícones UX
window.onload = function() {
    generateDynamicEmojiBackground();
    renderWelcomeScreen();
};