import { useState, useEffect } from "react";
import { QuizWelcome } from "@/components/QuizWelcome";
import { QuizQuestion } from "@/components/QuizQuestion";
import { QuizComplete } from "@/components/QuizComplete";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { validateAnswer } from "@/lib/answerKey";

interface Question {
  id: number;
  tag: string;
  question: string;
  options: { id: string; tag: string; text: string }[];
}

const allQuestions: Question[] = [
  {
    id: 1,
    tag: "q1",
    question: "Em UX para Games, o que o termo Game Feel representa primariamente?",
    options: [
      { id: "a", tag: "q1r1", text: "A complexidade da narrativa principal." },
      { id: "b", tag: "q1r2", text: "A qualidade dos gráficos e da trilha sonora." },
      { id: "c", tag: "q1r3", text: "A percepção tátil e sensorial das interações." },
      { id: "d", tag: "q1r4", text: "O tempo total de jogo para a conclusão." },
    ],
  },
  {
    id: 2,
    tag: "q2",
    question: "Qual característica define um elemento de HUD Metadiegético?",
    options: [
      { id: "a", tag: "q2r1", text: "Existe na tela e é ignorado pelos personagens." },
      { id: "b", tag: "q2r2", text: "Não existe na tela, apenas no som ambiente." },
      { id: "c", tag: "q2r3", text: "Existe no mundo do jogo, mas só o jogador o vê." },
      { id: "d", tag: "q2r4", text: "É um menu projetado no cenário do jogo." },
    ],
  },
  {
    id: 3,
    tag: "q3",
    question: "O que são \"Sistemas de Controles Transparentes\" no contexto de UX?",
    options: [
      { id: "a", tag: "q3r1", text: "Controles físicos com feedback de vibração." },
      { id: "b", tag: "q3r2", text: "Interfaces que se adaptam à iluminação do ambiente." },
      { id: "c", tag: "q3r3", text: "Controles tão intuitivos que o jogador foca apenas na ação." },
      { id: "d", tag: "q3r4", text: "Uso de gestos em vez de botões tradicionais." },
    ],
  },
  {
    id: 4,
    tag: "q4",
    question: "Na Teoria do Fluxo (Flow), o estado de imersão ideal resulta do equilíbrio entre qual binômio?",
    options: [
      { id: "a", tag: "q4r1", text: "Recompensas e Punidades." },
      { id: "b", tag: "q4r2", text: "Estética e Funcionalidade." },
      { id: "c", tag: "q4r3", text: "Nível de Desafio e Habilidade do Jogador." },
      { id: "d", tag: "q4r4", text: "Tempo de Sessão e Progresso na História." },
    ],
  },
  {
    id: 5,
    tag: "q5",
    question: "Qual a função da \"Mística do Controle\" em Game UX?",
    options: [
      { id: "a", tag: "q5r1", text: "Assegurar que os comandos funcionem rapidamente." },
      { id: "b", tag: "q5r2", text: "Minimizar a percepção de que o acaso influencia o resultado." },
      { id: "c", tag: "q5r3", text: "Aumentar a dificuldade do jogo gradualmente." },
      { id: "d", tag: "q5r4", text: "Ocultar a complexidade do motor gráfico." },
    ],
  },
  {
    id: 6,
    tag: "q6",
    question: "Em loot boxes, qual princípio psicológico gera o comportamento viciante de compra?",
    options: [
      { id: "a", tag: "q6r1", text: "Viés de confirmação." },
      { id: "b", tag: "q6r2", text: "Reforço de razão variável." },
      { id: "c", tag: "q6r3", text: "Efeito de dotação." },
      { id: "d", tag: "q6r4", text: "Aversão à perda." },
    ],
  },
  {
    id: 7,
    tag: "q7",
    question: "O que a heurística \"Ausência de Fricção\" busca eliminar no jogo?",
    options: [
      { id: "a", tag: "q7r1", text: "O esforço mental em tarefas secundárias, fora do desafio central." },
      { id: "b", tag: "q7r2", text: "A necessidade de qualquer tipo de tutorial." },
      { id: "c", tag: "q7r3", text: "A dificuldade nas puzzles mais complexas." },
      { id: "d", tag: "q7r4", text: "Os delays de animação nas transições de cena." },
    ],
  },
  {
    id: 8,
    tag: "q8",
    question: "Por que a gestão do Cognitive Load (Carga Cognitiva) é crucial?",
    options: [
      { id: "a", tag: "q8r1", text: "Para garantir a compatibilidade com hardware mais antigo." },
      { id: "b", tag: "q8r2", text: "Para que o jogo não pareça muito fácil." },
      { id: "c", tag: "q8r3", text: "Para que o jogador não se frustre ao tentar entender e interagir." },
      { id: "d", tag: "q8r4", text: "Para limitar a quantidade de elementos na tela do HUD." },
    ],
  },
  {
    id: 9,
    tag: "q9",
    question: "Em testes de usabilidade, o que é um \"Problema de Usabilidade Catastrófico\" (PUC)?",
    options: [
      { id: "a", tag: "q9r1", text: "Uma falha na economia de itens." },
      { id: "b", tag: "q9r2", text: "Um erro de interface no menu de opções." },
      { id: "c", tag: "q9r3", text: "A impossibilidade de entender uma mecânica essencial." },
      { id: "d", tag: "q9r4", text: "Um erro de collision detection." },
    ],
  },
  {
    id: 10,
    tag: "q10",
    question: "Qual a diferença primária entre uma Persona e um Player Archetype?",
    options: [
      { id: "a", tag: "q10r1", text: "Persona foca em tarefas do mundo real; Archetype em motivações de jogo." },
      { id: "b", tag: "q10r2", text: "Persona é qualitativa; Archetype é quantitativo." },
      { id: "c", tag: "q10r3", text: "Persona é usada em mobile; Archetype em jogos de console." },
      { id: "d", tag: "q10r4", text: "Persona descreve habilidades; Archetype descreve status social." },
    ],
  },
  {
    id: 11,
    tag: "q11",
    question: "Em ambiente de jogo, o que é um \"Affordance Falso\"?",
    options: [
      { id: "a", tag: "q11r1", text: "Um NPC que dá informações incorretas." },
      { id: "b", tag: "q11r2", text: "Um item que parece usável, mas não é interativo." },
      { id: "c", tag: "q11r3", text: "Uma interface que exige confirmação dupla." },
      { id: "d", tag: "q11r4", text: "Uma mecânica de jogo que tem um efeito inesperado." },
    ],
  },
  {
    id: 12,
    tag: "q12",
    question: "Qual método de pesquisa de UX mede a excitação emocional em tempo real?",
    options: [
      { id: "a", tag: "q12r1", text: "Entrevistas estruturadas com os jogadores." },
      { id: "b", tag: "q12r2", text: "Medição da Condutância da Pele (GSR)." },
      { id: "c", tag: "q12r3", text: "Análise de mapa de calor (heatmap)." },
      { id: "d", tag: "q12r4", text: "Questionários de satisfação (SUS)." },
    ],
  },
  {
    id: 13,
    tag: "q13",
    question: "Além dos controles, o que o Onboarding busca otimizar?",
    options: [
      { id: "a", tag: "q13r1", text: "Apenas a latência de rede e a frame rate." },
      { id: "b", tag: "q13r2", text: "A curva de aprendizado, progressão inicial e integração social." },
      { id: "c", tag: "q13r3", text: "O sistema de monetização e a compra de DLCs." },
      { id: "d", tag: "q13r4", text: "A customização estética do personagem." },
    ],
  },
  {
    id: 14,
    tag: "q14",
    question: "Uma má \"Visibilidade do Status do Sistema\" (ex: barra de vida) leva a qual estado no jogador?",
    options: [
      { id: "a", tag: "q14r1", text: "Tédio (Boredom)." },
      { id: "b", tag: "q14r2", text: "Apatia." },
      { id: "c", tag: "q14r3", text: "Frustração/Ansiedade, quebrando o Flow." },
      { id: "d", tag: "q14r4", text: "Hiper-Foco (Hyper-Focus)." },
    ],
  },
  {
    id: 15,
    tag: "q15",
    question: "Qual a função de um \"Loop de Gameplay\" bem desenhado, focando na retenção?",
    options: [
      { id: "a", tag: "q15r1", text: "Garantir que o jogo seja extremamente longo." },
      { id: "b", tag: "q15r2", text: "Estabelecer um ciclo motivacional de Ação, Recompensa e Objetivo." },
      { id: "c", tag: "q15r3", text: "Eliminar a repetição de tarefas." },
      { id: "d", tag: "q15r4", text: "Limitar o acesso a conteúdo avançado." },
    ],
  },
  {
    id: 16,
    tag: "q16",
    question: "O que o conceito de \"Intencionalidade do Design\" exige de cada elemento do jogo?",
    options: [
      { id: "a", tag: "q16r1", text: "Que sejam perfeitamente realistas e baseados na física." },
      { id: "b", tag: "q16r2", text: "Que tenham um propósito claro para evocar uma reação específica no jogador." },
      { id: "c", tag: "q16r3", text: "Que sejam escondidos do jogador para promover a descoberta." },
      { id: "d", tag: "q16r4", text: "Que sejam desenhados em estilo minimalista." },
    ],
  },
  {
    id: 17,
    tag: "q17",
    question: "O \"Princípio do Mínimo Esforço\" aplicado a Inventários significa que:",
    options: [
      { id: "a", tag: "q17r1", text: "O inventário deve ser acessado automaticamente." },
      { id: "b", tag: "q17r2", text: "As tarefas frequentes (ex: equipar) devem ter o mínimo de passos." },
      { id: "c", tag: "q17r3", text: "O jogo deve gerenciar todos os itens por si só." },
      { id: "d", tag: "q17r4", text: "O número de slots deve ser muito limitado." },
    ],
  },
  {
    id: 18,
    tag: "q18",
    question: "O \"Efeito Zeigarnik\" é usado em jogos para incentivar o retorno através de quê?",
    options: [
      { id: "a", tag: "q18r1", text: "Recompensas aleatórias e frequentes." },
      { id: "b", tag: "q18r2", text: "Criação de tarefas e arcos narrativos propositalmente inacabados." },
      { id: "c", tag: "q18r3", text: "Eliminação de todos os bugs na primeira semana de lançamento." },
      { id: "d", tag: "q18r4", text: "Simplificação de todas as puzzles complexas." },
    ],
  },
  {
    id: 19,
    tag: "q19",
    question: "Qual o risco que o \"Jogo do Macaco\" (Monkey Test) busca mitigar em uma interface de jogo?",
    options: [
      { id: "a", tag: "q19r1", text: "O tempo de carregamento lento dos menus." },
      { id: "b", tag: "q19r2", text: "A quebra do jogo por sequências aleatórias de comandos não intencionais." },
      { id: "c", tag: "q19r3", text: "A inconsistência visual entre diferentes plataformas." },
      { id: "d", tag: "q19r4", text: "A sobrecarga cognitiva por muitas informações." },
    ],
  },
  {
    id: 20,
    tag: "q20",
    question: "A \"Curva de Habilidade em U\" (dificuldade alta no início/fim) visa qual objetivo principal de UX?",
    options: [
      { id: "a", tag: "q20r1", text: "Reduzir o custo de produção do jogo." },
      { id: "b", tag: "q20r2", text: "Equilibrar o desafio com a habilidade, sustentando o estado de Flow." },
      { id: "c", tag: "q20r3", text: "Aumentar artificialmente o tempo de jogo." },
      { id: "d", tag: "q20r4", text: "Eliminar a necessidade de playtesting no meio do desenvolvimento." },
    ],
  },
];

// Função para sortear 10 questões aleatórias
const getRandomQuestions = (): Question[] => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

const Index = () => {
  const [stage, setStage] = useState<"welcome" | "quiz" | "complete">("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [answers, setAnswers] = useState<{ question: string; questionTag: string; answer: string; answerTag: string; timeRemaining: number; points: number }[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalScore, setTotalScore] = useState(0);

  const handleStart = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    setQuestions(getRandomQuestions());
    setStage("quiz");
    setTimeLeft(15);
  };

  // Timer effect
  useEffect(() => {
    if (stage === "quiz" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (stage === "quiz" && timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, stage]);

  const handleTimeUp = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = [
      ...answers,
      {
        question: currentQuestion.question,
        questionTag: currentQuestion.tag,
        answer: "Tempo esgotado - Não respondida",
        answerTag: "",
        timeRemaining: 0,
        points: 0,
      },
    ];
    
    setAnswers(newAnswers);
    moveToNextQuestion(newAnswers);
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find((opt) => opt.id === answer);
    
    const answerTag = selectedOption?.tag || "";
    const isCorrect = validateAnswer(currentQuestion.tag, answerTag);
    
    // Calculate points: 10 for correct answer + time remaining as bonus
    const basePoints = isCorrect ? 10 : 0;
    const timeBonus = isCorrect ? timeLeft : 0;
    const points = basePoints + timeBonus;
    
    const newAnswers = [
      ...answers,
      {
        question: currentQuestion.question,
        questionTag: currentQuestion.tag,
        answer: `${answer}) ${selectedOption?.text}`,
        answerTag: answerTag,
        timeRemaining: timeLeft,
        points: points,
      },
    ];
    
    setAnswers(newAnswers);
    moveToNextQuestion(newAnswers);
  };

  const moveToNextQuestion = (newAnswers: { question: string; questionTag: string; answer: string; answerTag: string; timeRemaining: number; points: number }[]) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15);
    } else {
      sendEmail(newAnswers);
    }
  };

  const sendEmail = async (finalAnswers: { question: string; questionTag: string; answer: string; answerTag: string; timeRemaining: number; points: number }[]) => {
    try {
      // Calculate total score
      const total = finalAnswers.reduce((sum, item) => sum + item.points, 0);
      setTotalScore(total);

      // Format answers with scoring details
      const answersText = finalAnswers
        .map((item, index) => {
          const correctAnswer = item.points > 0 ? "✓ Correta" : "✗ Incorreta";
          return `Pergunta ${index + 1}: ${item.question}\nResposta: ${item.answer}\nStatus: ${correctAnswer}\nTempo Restante: ${item.timeRemaining}s\nPontuação: ${item.points} pontos (10 base + ${item.timeRemaining} bônus de tempo)`;
        })
        .join("\n\n");

      const scoreDetails = `\n\n========== PONTUAÇÃO FINAL ==========\nTotal: ${total} pontos\nPontuação Máxima Possível: ${finalAnswers.length * 25} pontos\nPercentual: ${((total / (finalAnswers.length * 25)) * 100).toFixed(1)}%`;

      const templateParams = {
        to_email: "victoremmoreira@gmail.com",
        user_name: userName,
        user_email: userEmail,
        answers: answersText + scoreDetails,
      };

      await emailjs.send(
        "service_victor65412",
        "template_olpn54g",
        templateParams,
        "8sA0zXeNpiAtugCr9"
      );

      toast.success("Quiz enviado com sucesso!");
      setStage("complete");
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      toast.error("Erro ao enviar o quiz. Tente novamente.");
    }
  };

  const handleRestart = () => {
    setStage("welcome");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setUserName("");
    setUserEmail("");
    setQuestions([]);
    setTimeLeft(15);
    setTotalScore(0);
  };

  if (stage === "welcome") {
    return <QuizWelcome onStart={handleStart} />;
  }

  if (stage === "quiz" && questions.length > 0) {
    return (
      <QuizQuestion
        question={questions[currentQuestionIndex]}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        timeLeft={timeLeft}
        onAnswer={handleAnswer}
        onSkip={handleTimeUp}
      />
    );
  }

  return <QuizComplete onRestart={handleRestart} totalScore={totalScore} maxScore={questions.length * 25} />;
};

export default Index;
