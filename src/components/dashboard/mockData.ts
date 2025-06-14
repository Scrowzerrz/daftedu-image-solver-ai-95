
export const mockQuestions = [
  {
    id: 1,
    title: "Como resolver equações do segundo grau usando fórmula de Bhaskara?",
    content: "Estou com dificuldade para entender como aplicar a fórmula de Bhaskara em equações mais complexas. Alguém pode explicar o passo a passo com exemplos práticos?",
    subject: "Matemática",
    timeAgo: "há 2 minutos",
    points: 15,
    hasAnswer: false,
    answers: 3,
    likes: 12,
    author: "Maria Silva",
    isUrgent: true,
    difficulty: "Médio"
  },
  {
    id: 2,
    title: "Principais causas da Segunda Guerra Mundial - contexto histórico",
    content: "Preciso entender melhor os fatores políticos, econômicos e sociais que levaram ao início da Segunda Guerra Mundial. Qual foi o papel do Tratado de Versalhes?",
    subject: "História",
    timeAgo: "há 8 minutos",
    points: 10,
    hasAnswer: true,
    answers: 5,
    likes: 18,
    author: "João Santos",
    isUrgent: false,
    difficulty: "Fácil"
  },
  {
    id: 3,
    title: "Diferença entre mitose e meiose - divisão celular",
    content: "Qual a principal diferença entre esses dois processos de divisão celular? Quando cada um ocorre e qual a importância de cada processo para os organismos?",
    subject: "Biologia",
    timeAgo: "há 15 minutos",
    points: 12,
    hasAnswer: false,
    answers: 2,
    likes: 9,
    author: "Ana Costa",
    isUrgent: false,
    difficulty: "Médio"
  },
  {
    id: 4,
    title: "Processo completo da fotossíntese em plantas",
    content: "Como funciona exatamente o processo da fotossíntese? Preciso entender desde a captação da luz solar até a produção de glucose e oxigênio.",
    subject: "Biologia",
    timeAgo: "há 25 minutos",
    points: 8,
    hasAnswer: true,
    answers: 7,
    likes: 24,
    author: "Pedro Lima",
    isUrgent: false,
    difficulty: "Difícil"
  },
  {
    id: 5,
    title: "Análise sintática - classificação de orações subordinadas",
    content: "Estou com dúvidas sobre como identificar e classificar orações subordinadas substantivas, adjetivas e adverbiais. Podem dar exemplos práticos?",
    subject: "Português",
    timeAgo: "há 1 hora",
    points: 6,
    hasAnswer: false,
    answers: 1,
    likes: 5,
    author: "Carla Oliveira",
    isUrgent: false,
    difficulty: "Difícil"
  }
];

export const subjectColors: Record<string, string> = {
  "Matemática": "bg-blue-100 text-blue-800 border-blue-200",
  "História": "bg-orange-100 text-orange-800 border-orange-200",
  "Biologia": "bg-green-100 text-green-800 border-green-200",
  "Física": "bg-purple-100 text-purple-800 border-purple-200",
  "Química": "bg-red-100 text-red-800 border-red-200",
  "Português": "bg-pink-100 text-pink-800 border-pink-200"
};

export const difficultyColors: Record<string, string> = {
  "Fácil": "bg-green-100 text-green-700",
  "Médio": "bg-yellow-100 text-yellow-700",
  "Difícil": "bg-red-100 text-red-700"
};
