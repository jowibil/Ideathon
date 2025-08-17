import { Entertainment_Questions } from "./Questions/entertainmentQuestions";
import { History_Questions } from "./Questions/historyQuestions";
import { Science_Questions } from "./Questions/scienceQuestions";
import { Sports_Questions } from "./Questions/sportsQuestions";
import { Technology_Questions } from "./Questions/technologyQuestions";
import type { Question, Category, Difficulty } from "./types";


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
  //Science Questions
  ...Science_Questions,
  // History Questions
  ...History_Questions,
  // Entertainment Questions
  ...Entertainment_Questions,
  // Sports Questions
  ...Sports_Questions,
  // Tech Questions
  ...Technology_Questions,
  // Animals Questions

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
  difficulty?: Difficulty,
  usedQuestions: string[] = []
): Question | null {
  
  let pool = QUIZ_DATA;
  

  if (category && difficulty) {
    pool = getQuestionsByCategoryAndDifficulty(category, difficulty);
  } else if (category) {
    pool = getQuestionsByCategory(category);
  } else if (difficulty) {
    pool = getQuestionsByDifficulty(difficulty);
  }
  pool = pool.filter((q) => !usedQuestions.includes(q.id));

  if (pool.length === 0) {
    return null;
  }
  
  return pool[Math.floor(Math.random() * pool.length)];
}
