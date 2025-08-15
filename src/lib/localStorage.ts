export interface UserStats {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  currentStreak: number;
  bestStreak: number;
  categoryStats: Record<string, { correct: number; total: number }>;
  difficultyStats: Record<string, { correct: number; total: number }>;
  totalPlayTime: number;
  questionsAnswered: Set<string>;
  lastPlayed: string;
}

const DEFAULT_STATS: UserStats = {
  totalQuestions: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  currentStreak: 0,
  bestStreak: 0,
  categoryStats: {},
  difficultyStats: {},
  totalPlayTime: 0,
  questionsAnswered: new Set(),
  lastPlayed: new Date().toISOString(),
};

const STATS_KEY = "reyal-faki-stats";

export function getUserStats(): UserStats {
  if (typeof window === "undefined") return DEFAULT_STATS;

  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (!stored) return DEFAULT_STATS;

    const parsed = JSON.parse(stored);
    // Convert questionsAnswered back to Set
    parsed.questionsAnswered = new Set(parsed.questionsAnswered || []);
    return { ...DEFAULT_STATS, ...parsed };
  } catch (error) {
    console.error("Error loading user stats:", error);
    return DEFAULT_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === "undefined") return;

  try {
    // Convert Set to Array for storage
    const toStore = {
      ...stats,
      questionsAnswered: Array.from(stats.questionsAnswered),
      lastPlayed: new Date().toISOString(),
    };
    localStorage.setItem(STATS_KEY, JSON.stringify(toStore));
  } catch (error) {
    console.error("Error saving user stats:", error);
  }
}

export function updateStats(
  currentStats: UserStats,
  questionId: string,
  category: string,
  difficulty: string,
  isCorrect: boolean
): UserStats {
  const newStats = { ...currentStats };

  newStats.totalQuestions++;
  newStats.questionsAnswered.add(questionId);

  if (isCorrect) {
    newStats.correctAnswers++;
    newStats.currentStreak++;
    if (newStats.currentStreak > newStats.bestStreak) {
      newStats.bestStreak = newStats.currentStreak;
    }
  } else {
    newStats.wrongAnswers++;
    newStats.currentStreak = 0;
  }

  // Update category stats
  if (!newStats.categoryStats[category]) {
    newStats.categoryStats[category] = { correct: 0, total: 0 };
  }
  newStats.categoryStats[category].total++;
  if (isCorrect) {
    newStats.categoryStats[category].correct++;
  }

  // Update difficulty stats
  if (!newStats.difficultyStats[difficulty]) {
    newStats.difficultyStats[difficulty] = { correct: 0, total: 0 };
  }
  newStats.difficultyStats[difficulty].total++;
  if (isCorrect) {
    newStats.difficultyStats[difficulty].correct++;
  }

  return newStats;
}

export function resetStats(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STATS_KEY);
}

export function getAccuracyPercentage(stats: UserStats): number {
  if (stats.totalQuestions === 0) return 0;
  return Math.round((stats.correctAnswers / stats.totalQuestions) * 100);
}
