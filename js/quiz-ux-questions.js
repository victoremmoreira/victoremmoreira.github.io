// Dados do Quiz: UX AVANÇADO (24 questões)
const quizData = [
    {
        question: "Qual Heurística de Nielsen preconiza a customização de atalhos e ações frequentes para usuários experientes?",
        answerOptions: [
            { text: "Correspondência Sistema-Mundo Real", isCorrect: false },
            { text: "Flexibilidade e Eficiência de Uso", isCorrect: true },
            { text: "Reconhecimento em vez de Memorização", isCorrect: false },
            { text: "Estética e Design Minimalista", isCorrect: false }
        ]
    },
    {
        question: "Qual artefato de UX é essencialmente uma representação de dados quantitativos e qualitativos sobre o comportamento e as necessidades dos usuários?",
        answerOptions: [
            { text: "Mapa de Jornada (Customer Journey Map)", isCorrect: false },
            { text: "Proto-Persona", isCorrect: false },
            { text: "Design System", isCorrect: false },
            { text: "Persona", isCorrect: true }
        ]
    },
    {
        question: "Qual fase da metodologia Design Thinking foca na criação e desenvolvimento de soluções de baixo custo e fidelidade?",
        answerOptions: [
            { text: "Imersão (Empatizar e Definir)", isCorrect: false },
            { text: "Prototipação", isCorrect: true },
            { text: "Ideação", isCorrect: false },
            { text: "Teste", isCorrect: false }
        ]
    },
    {
        question: "Segundo a Heurística \"Prevenção de Erros\", qual é a distinção primária entre *slips* e *mistakes*?",
        answerOptions: [
            { text: "*Mistakes* são intencionais; *Slips* são não intencionais", isCorrect: false },
            { text: "*Slips* são falhas na execução; *Mistakes* são falhas no planejamento", isCorrect: true },
            { text: "*Mistakes* são fáceis de corrigir; *Slips* são complexos", isCorrect: false },
            { text: "*Slips* ocorrem apenas em sistemas digitais", isCorrect: false }
        ]
    },
    {
        question: "Qual métrica de usabilidade avalia a proporção de usuários que consegue realizar uma tarefa com sucesso?",
        answerOptions: [
            { text: "Net Promoter Score (NPS)", isCorrect: false },
            { text: "System Usability Scale (SUS)", isCorrect: false },
            { text: "Taxa de Conclusão da Tarefa (Task Completion Rate)", isCorrect: true },
            { text: "Taxa de Erro por Usuário", isCorrect: false }
        ]
    },
    {
        question: "Qual termo descreve a tendência do usuário de focar em uma informação inicial (âncora) ao tomar decisões ou fazer avaliações?",
        answerOptions: [
            { text: "Efeito de Primazia", isCorrect: false },
            { text: "Viés de Confirmação (Confirmation Bias)", isCorrect: false },
            { text: "Efeito de Ancoragem (Anchoring Effect)", isCorrect: true },
            { text: "Efeito Zeigarnik", isCorrect: false }
        ]
    },
    {
        question: "Qual das Heurísticas de Nielsen está mais intimamente ligada ao conceito de \"afordância\" (*affordance*) percebida?",
        answerOptions: [
            { text: "Consistência e Padrões", isCorrect: false },
            { text: "Ajuda e Documentação", isCorrect: false },
            { text: "Correspondência Sistema-Mundo Real", isCorrect: true },
            { text: "Visibilidade do Status do Sistema", isCorrect: false }
        ]
    },
    {
        question: "No contexto de design de interação, o que é um *Mental Model* (Modelo Mental)?",
        answerOptions: [
            { text: "A representação visual da interface", isCorrect: false },
            { text: "O entendimento que o usuário tem do sistema", isCorrect: true },
            { text: "O conjunto de regras de negócio do produto", isCorrect: false },
            { text: "O modelo técnico de arquitetura do sistema", isCorrect: false }
        ]
    },
    {
        question: "Qual tipo de teste de usabilidade exige que os participantes interajam com a interface em seu ambiente natural, sem supervisão direta?",
        answerOptions: [
            { text: "Teste Moderado Presencial", isCorrect: false },
            { text: "Teste Não Moderado Remoto", isCorrect: true },
            { text: "Teste A/B", isCorrect: false },
            { text: "Eye-tracking", isCorrect: false }
        ]
    },
    {
        question: "A arquitetura da informação utiliza três principais modelos de organização. Qual deles se baseia em critérios como data, local ou ordem alfabética?",
        answerOptions: [
            { text: "Organizacional (Hierárquico)", isCorrect: false },
            { text: "Sequencial (Fluxo de Tarefas)", isCorrect: false },
            { text: "Exato", isCorrect: true },
            { text: "Ambíguo", isCorrect: false }
        ]
    },
    {
        question: "Qual método de pesquisa UX é mais adequado para entender as motivações e o contexto de uso de um produto de forma aprofundada?",
        answerOptions: [
            { text: "Teste A/B", isCorrect: false },
            { text: "Entrevista em Profundidade", isCorrect: true },
            { text: "Questionário de Satisfação (NPS)", isCorrect: false },
            { text: "Análise de Métricas Web", isCorrect: false }
        ]
    },
    {
        question: "A diferença entre *UX Design* e *Service Design* é que o *Service Design* engloba primariamente a experiência em qual escopo?",
        answerOptions: [
            { text: "Apenas a interface digital", isCorrect: false },
            { text: "O sistema de retaguarda (backend)", isCorrect: false },
            { text: "A jornada de ponta a ponta, incluindo interações fora do digital", isCorrect: true },
            { text: "Apenas o mapeamento de tarefas", isCorrect: false }
        ]
    },
    {
        question: "Qual dos itens abaixo NÃO é um componente primário da pontuação do *System Usability Scale* (SUS)?",
        answerOptions: [
            { text: "Eficácia", isCorrect: true },
            { text: "Usabilidade", isCorrect: false },
            { text: "Complexidade", isCorrect: false },
            { text: "Facilidade de aprendizado", isCorrect: false }
        ]
    },
    {
        question: "O que o princípio da Gestalt de \"Continuidade\" implica no design de interfaces?",
        answerOptions: [
            { text: "Elementos próximos são vistos como um grupo", isCorrect: false },
            { text: "O cérebro completa formas incompletas", isCorrect: false },
            { text: "Elementos alinhados são percebidos como uma trajetória ou padrão", isCorrect: true },
            { text: "Elementos semelhantes são vistos como relacionados", isCorrect: false }
        ]
    },
    {
        question: "A Lei da Proximidade da Gestalt em UX indica que o usuário tende a agrupar elementos baseando-se em qual característica?",
        answerOptions: [
            { text: "Cores similares", isCorrect: false },
            { text: "Posição ou distância relativa", isCorrect: true },
            { text: "Formas idênticas", isCorrect: false },
            { text: "Função compartilhada", isCorrect: false }
        ]
    },
    {
        question: "Qual princípio da Gestalt sugere que elementos dentro de uma fronteira fechada são percebidos como agrupados, mesmo que não estejam próximos?",
        answerOptions: [
            { text: "Semelhança", isCorrect: false },
            { text: "Continuidade", isCorrect: false },
            { text: "Região Comum", isCorrect: true },
            { text: "Simetria", isCorrect: false }
        ]
    },
    {
        question: "O que uma Análise Heurística avalia primariamente em uma interface?",
        answerOptions: [
            { text: "A satisfação do usuário (subjetiva)", isCorrect: false },
            { text: "A conformidade com diretrizes de usabilidade", isCorrect: true },
            { text: "A velocidade de carregamento (desempenho)", isCorrect: false },
            { text: "A taxa de conversão (negócio)", isCorrect: false }
        ]
    },
    {
        question: "Qual é o tipo de Triagem de Cartões (*Card Sorting*) onde o usuário define livremente as categorias e seus nomes?",
        answerOptions: [
            { text: "Fechado (Closed)", isCorrect: false },
            { text: "Modular", isCorrect: false },
            { text: "Invertido (Reverse)", isCorrect: false },
            { text: "Aberto (Open)", isCorrect: true }
        ]
    },
    {
        question: "No Design Emocional de Don Norman, qual dos níveis é associado à reflexão sobre a imagem, a cultura e o valor do produto a longo prazo?",
        answerOptions: [
            { text: "Visceral", isCorrect: false },
            { text: "Comportamental", isCorrect: false },
            { text: "Reflexivo", isCorrect: true },
            { text: "Pragmático", isCorrect: false }
        ]
    },
    {
        question: "Qual heurística de Nielsen é mais diretamente violada por interfaces que usam códigos técnicos ou jargões internos da empresa?",
        answerOptions: [
            { text: "Controle e Liberdade do Usuário", isCorrect: false },
            { text: "Correspondência Sistema-Mundo Real", isCorrect: true },
            { text: "Flexibilidade e Eficiência de Uso", isCorrect: false },
            { text: "Reconhecimento em vez de Memória", isCorrect: false }
        ]
    },
    {
        question: "Na Lei de Jakob, qual a principal implicação sobre a experiência do usuário em novos produtos ou sites?",
        answerOptions: [
            { text: "Os usuários preferem interfaces totalmente novas e exclusivas", isCorrect: false },
            { text: "Os usuários passam a maior parte do tempo em outros sites", isCorrect: true },
            { text: "A consistência interna é mais importante que a externa", isCorrect: false },
            { text: "A complexidade deve ser conservada", isCorrect: false }
        ]
    },
    {
        question: "Qual escala de usabilidade de 7 pontos com 10 itens foca especificamente na facilidade de uso do software?",
        answerOptions: [
            { text: "SUS (System Usability Scale)", isCorrect: false },
            { text: "PSS (Post-Study System Usability Questionnaire)", isCorrect: false },
            { text: "SEQ (Single Ease Question)", isCorrect: false },
            { text: "CSUQ (Computer System Usability Questionnaire)", isCorrect: true }
        ]
    },
    {
        question: "Qual é o objetivo primário de um Teste de Hipótese na Pesquisa de UX?",
        answerOptions: [
            { text: "Entender as motivações do usuário", isCorrect: false },
            { text: "Validar ou refutar uma suposição específica sobre o produto", isCorrect: true },
            { text: "Descobrir novos problemas de usabilidade", isCorrect: false },
            { text: "Mapear a jornada do usuário", isCorrect: false }
        ]
    },
    {
        question: "Qual das heurísticas de Nielsen é mais diretamente relacionada à remoção de informações irrelevantes ou raramente necessárias de uma tela?",
        answerOptions: [
            { text: "Flexibilidade e Eficiência de Uso", isCorrect: false },
            { text: "Estética e Design Minimalista", isCorrect: true },
            { text: "Prevenção de Erros", isCorrect: false },
            { text: "Ajuda e Documentação", isCorrect: false }
        ]
    }
];