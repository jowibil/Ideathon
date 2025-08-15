export interface Question {
  id: string;
  statement: string;
  answer: "reyal" | "faki";
  category: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  explanation?: string;
}

export type Category =
  | "science"
  | "history"
  | "entertainment"
  | "sports"
  | "technology"
  | "animals";
export type Difficulty = "easy" | "medium" | "hard" | "expert";

export const CATEGORIES: Record<Category, string> = {
  science: "🧪 Science",
  history: "🏛️ History",
  entertainment: "🎬 Entertainment",
  sports: "⚽ Sports",
  technology: "💻 Technology",
  animals: "🦁 Animals",
};

export const DIFFICULTIES: Record<
  Difficulty,
  { label: string; color: string }
> = {
  easy: { label: "🟢 Easy", color: "bg-green-500" },
  medium: { label: "🟡 Medium", color: "bg-yellow-500" },
  hard: { label: "🔴 Hard", color: "bg-red-500" },
  expert: { label: "🟣 Expert", color: "bg-purple-600" },
};

export const QUIZ_DATA: Question[] = [
  // Science - Easy
  {
    id: "sci_easy_1",
    statement: "The Sun is a star",
    answer: "reyal",
    category: "science",
    difficulty: "easy",
    explanation:
      "Yes! The Sun is indeed a star - specifically a yellow dwarf star.",
  },
  {
    id: "sci_easy_2",
    statement: "Water freezes at 100°C",
    answer: "faki",
    category: "science",
    difficulty: "easy",
    explanation: "Water freezes at 0°C, not 100°C. It boils at 100°C!",
  },
  {
    id: "sci_easy_3",
    statement: "Humans have 5 senses",
    answer: "faki",
    category: "science",
    difficulty: "easy",
    explanation:
      "Humans actually have more than 5 senses, including balance, temperature, and pain!",
  },

  // Science - Medium
  {
    id: "sci_med_1",
    statement: "DNA stands for Deoxyribonucleic Acid",
    answer: "reyal",
    category: "science",
    difficulty: "medium",
  },
  {
    id: "sci_med_2",
    statement: "Lightning never strikes the same place twice",
    answer: "faki",
    category: "science",
    difficulty: "medium",
    explanation:
      "Lightning can and often does strike the same place multiple times!",
  },

  // History - Easy
  {
    id: "hist_easy_1",
    statement: "World War II ended in 1945",
    answer: "reyal",
    category: "history",
    difficulty: "easy",
  },
  {
    id: "hist_easy_2",
    statement: "The Great Wall of China was built in one year",
    answer: "faki",
    category: "history",
    difficulty: "easy",
    explanation:
      "The Great Wall was built over many centuries, not in just one year!",
  },

  // Entertainment - Easy
  {
    id: "ent_easy_1",
    statement: "Mickey Mouse was created by Walt Disney",
    answer: "reyal",
    category: "entertainment",
    difficulty: "easy",
  },
  {
    id: "ent_easy_2",
    statement: "The movie Titanic was released in 1990",
    answer: "faki",
    category: "entertainment",
    difficulty: "easy",
    explanation: "Titanic was released in 1997, not 1990!",
  },

  // Sports - Easy
  {
    id: "spo_easy_1",
    statement: "A soccer ball is round",
    answer: "reyal",
    category: "sports",
    difficulty: "easy",
  },
  {
    id: "spo_easy_2",
    statement: "Basketball was invented in China",
    answer: "faki",
    category: "sports",
    difficulty: "easy",
    explanation:
      "Basketball was invented in the United States by James Naismith in 1891!",
  },

  // Technology - Medium
  {
    id: "tech_med_1",
    statement: "The first iPhone was released in 2007",
    answer: "reyal",
    category: "technology",
    difficulty: "medium",
  },
  {
    id: "tech_med_2",
    statement: "Google was founded after Facebook",
    answer: "faki",
    category: "technology",
    difficulty: "medium",
    explanation:
      "Google was founded in 1998, while Facebook was founded in 2004!",
  },

  // Animals - Easy
  {
    id: "ani_easy_1",
    statement: "Elephants are afraid of mice",
    answer: "faki",
    category: "animals",
    difficulty: "easy",
    explanation: "This is a myth! Elephants are not actually afraid of mice.",
  },
  {
    id: "ani_easy_2",
    statement: "Cats can see in complete darkness",
    answer: "faki",
    category: "animals",
    difficulty: "easy",
    explanation:
      "Cats need some light to see, they cannot see in complete darkness!",
  },

  // Hard level questions
  {
    id: "sci_hard_1",
    statement: "Quantum entanglement allows faster-than-light communication",
    answer: "faki",
    category: "science",
    difficulty: "hard",
    explanation:
      "Quantum entanglement does not allow faster-than-light communication due to the no-communication theorem!",
  },
  {
    id: "hist_hard_1",
    statement: "Napoleon was actually of average height for his time",
    answer: "reyal",
    category: "history",
    difficulty: "hard",
    explanation:
      "Napoleon was about 5'7\", which was average or even slightly above average for men of his era!",
  },

  // Expert level questions
  {
    id: "sci_expert_1",
    statement: "Bananas are berries but strawberries are not",
    answer: "reyal",
    category: "science",
    difficulty: "expert",
    explanation:
      "Botanically speaking, bananas are berries while strawberries are aggregate accessory fruits!",
  },
  {
    id: "tech_expert_1",
    statement: "The first computer bug was literally a bug",
    answer: "reyal",
    category: "technology",
    difficulty: "expert",
    explanation:
      'Grace Hopper found an actual moth stuck in a computer relay in 1947, coining the term "computer bug"!',
  },
];

export function getQuestionsByCategory(category: Category): Question[] {
  return QUIZ_DATA.filter((q) => q.category === category);
}

export function getQuestionsByDifficulty(difficulty: Difficulty): Question[] {
  return QUIZ_DATA.filter((q) => q.difficulty === difficulty);
}

export function getQuestionsByCategoryAndDifficulty(
  category: Category,
  difficulty: Difficulty
): Question[] {
  return QUIZ_DATA.filter(
    (q) => q.category === category && q.difficulty === difficulty
  );
}

export function getRandomQuestion(
  category?: Category,
  difficulty?: Difficulty
): Question {
  let pool = QUIZ_DATA;

  if (category && difficulty) {
    pool = getQuestionsByCategoryAndDifficulty(category, difficulty);
  } else if (category) {
    pool = getQuestionsByCategory(category);
  } else if (difficulty) {
    pool = getQuestionsByDifficulty(difficulty);
  }

  if (pool.length === 0) {
    pool = QUIZ_DATA;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}
