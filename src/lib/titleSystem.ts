import type { UserStats } from "./localStorage";

export interface Title {
  name: string;
  emoji: string;
  description: string;
  color: string;
  requirements: string;
}

export const TITLES: Title[] = [
  // Beginner titles
  {
    name: "Newbie Questioner",
    emoji: "🤔",
    description: "Just starting your journey!",
    color: "text-gray-600",
    requirements: "0 questions answered",
  },
  {
    name: "Curious Mind",
    emoji: "🧠",
    description: "Getting the hang of it!",
    color: "text-blue-600",
    requirements: "10+ questions answered",
  },

  // Accuracy-based titles
  {
    name: "Truth Seeker",
    emoji: "🔍",
    description: "You have a good eye for truth!",
    color: "text-green-600",
    requirements: "60%+ accuracy, 25+ questions",
  },
  {
    name: "Fact Checker",
    emoji: "✅",
    description: "Reliable and accurate!",
    color: "text-emerald-600",
    requirements: "70%+ accuracy, 50+ questions",
  },
  {
    name: "Reyal Master",
    emoji: "👑",
    description: "Master of truth detection!",
    color: "text-yellow-600",
    requirements: "80%+ accuracy, 100+ questions",
  },
  {
    name: "Reyal God",
    emoji: "⚡",
    description: "Legendary truth detector!",
    color: "text-purple-600",
    requirements: "90%+ accuracy, 200+ questions",
  },

  // Streak-based titles
  {
    name: "Lucky Guesser",
    emoji: "🍀",
    description: "Sometimes luck is all you need!",
    color: "text-green-500",
    requirements: "5+ streak",
  },
  {
    name: "Hot Streak",
    emoji: "🔥",
    description: "You are on fire!",
    color: "text-orange-500",
    requirements: "10+ streak",
  },
  {
    name: "Unstoppable",
    emoji: "💫",
    description: "Nothing can stop you!",
    color: "text-cyan-500",
    requirements: "20+ best streak",
  },

  // Volume-based titles
  {
    name: "Quiz Enthusiast",
    emoji: "📚",
    description: "You love a good challenge!",
    color: "text-indigo-600",
    requirements: "100+ questions answered",
  },
  {
    name: "Knowledge Seeker",
    emoji: "🎓",
    description: "Always learning!",
    color: "text-blue-700",
    requirements: "250+ questions answered",
  },
  {
    name: "Quiz Legend",
    emoji: "🏆",
    description: "A true quiz master!",
    color: "text-amber-600",
    requirements: "500+ questions answered",
  },

  // Special titles for poor performance (humorous)
  {
    name: "Faki Noob",
    emoji: "😅",
    description: "Still figuring things out!",
    color: "text-red-500",
    requirements: "Less than 40% accuracy, 20+ questions",
  },
  {
    name: "Confusion Master",
    emoji: "😵",
    description: "Truth is... complicated?",
    color: "text-orange-600",
    requirements: "Less than 30% accuracy, 50+ questions",
  },
  {
    name: "Faki Demon",
    emoji: "👹",
    description: "You have mastered being wrong!",
    color: "text-red-700",
    requirements: "Less than 25% accuracy, 100+ questions",
  },

  // Category specialist titles
  {
    name: "Science Sage",
    emoji: "🔬",
    description: "Science is your specialty!",
    color: "text-blue-800",
    requirements: "80%+ accuracy in science, 30+ science questions",
  },
  {
    name: "History Buff",
    emoji: "📜",
    description: "The past holds no secrets from you!",
    color: "text-amber-700",
    requirements: "80%+ accuracy in history, 30+ history questions",
  },
  {
    name: "Entertainment Expert",
    emoji: "🎭",
    description: "Pop culture is your domain!",
    color: "text-pink-600",
    requirements: "80%+ accuracy in entertainment, 30+ entertainment questions",
  },
  {
    name: "Sports Fanatic",
    emoji: "🏅",
    description: "Sports knowledge champion!",
    color: "text-green-700",
    requirements: "80%+ accuracy in sports, 30+ sports questions",
  },
  {
    name: "Tech Wizard",
    emoji: "🧙‍♂️",
    description: "Technology bends to your will!",
    color: "text-purple-700",
    requirements: "80%+ accuracy in technology, 30+ technology questions",
  },
  {
    name: "Animal Whisperer",
    emoji: "🐾",
    description: "You speak the language of nature!",
    color: "text-green-800",
    requirements: "80%+ accuracy in animals, 30+ animal questions",
  },
];

export function calculateUserTitle(stats: UserStats): Title {
  const accuracy =
    stats.totalQuestions > 0
      ? (stats.correctAnswers / stats.totalQuestions) * 100
      : 0;

  // Find the best matching title based on requirements
  let bestTitle = TITLES[0]; // Default to first title

  for (const title of TITLES.slice().reverse()) {
    // Check in reverse order for highest titles first
    if (meetsRequirements(title, stats, accuracy)) {
      bestTitle = title;
      break;
    }
  }

  return bestTitle;
}

function meetsRequirements(
  title: Title,
  stats: UserStats,
  accuracy: number
): boolean {
  const { requirements } = title;

  // Parse requirements string and check if user meets them
  if (requirements.includes("0 questions answered")) {
    return stats.totalQuestions === 0;
  }

  if (requirements.includes("10+ questions answered")) {
    return stats.totalQuestions >= 10;
  }

  if (requirements.includes("60%+ accuracy, 25+ questions")) {
    return accuracy >= 60 && stats.totalQuestions >= 25;
  }

  if (requirements.includes("70%+ accuracy, 50+ questions")) {
    return accuracy >= 70 && stats.totalQuestions >= 50;
  }

  if (requirements.includes("80%+ accuracy, 100+ questions")) {
    return accuracy >= 80 && stats.totalQuestions >= 100;
  }

  if (requirements.includes("90%+ accuracy, 200+ questions")) {
    return accuracy >= 90 && stats.totalQuestions >= 200;
  }

  if (requirements.includes("5+ streak")) {
    return stats.bestStreak >= 5;
  }

  if (requirements.includes("10+ streak")) {
    return stats.bestStreak >= 10;
  }

  if (requirements.includes("20+ best streak")) {
    return stats.bestStreak >= 20;
  }

  if (requirements.includes("100+ questions answered")) {
    return stats.totalQuestions >= 100;
  }

  if (requirements.includes("250+ questions answered")) {
    return stats.totalQuestions >= 250;
  }

  if (requirements.includes("500+ questions answered")) {
    return stats.totalQuestions >= 500;
  }

  // Special titles for poor performance
  if (requirements.includes("Less than 40% accuracy, 20+ questions")) {
    return accuracy < 40 && stats.totalQuestions >= 20;
  }

  if (requirements.includes("Less than 30% accuracy, 50+ questions")) {
    return accuracy < 30 && stats.totalQuestions >= 50;
  }

  if (requirements.includes("Less than 25% accuracy, 100+ questions")) {
    return accuracy < 25 && stats.totalQuestions >= 100;
  }

  // Category specialist titles
  const categoryMatches = requirements.match(
    /80\%\+ accuracy in (\w+), 30\+ \w+ questions/
  );
  if (categoryMatches) {
    const category = categoryMatches[1];
    const categoryStats = stats.categoryStats[category];
    if (categoryStats && categoryStats.total >= 30) {
      const categoryAccuracy =
        (categoryStats.correct / categoryStats.total) * 100;
      return categoryAccuracy >= 80;
    }
  }

  return false;
}

export function getNextTitle(stats: UserStats): Title | null {
  const currentTitle = calculateUserTitle(stats);
  const currentIndex = TITLES.findIndex((t) => t.name === currentTitle.name);

  // Find the next achievable title
  for (let i = currentIndex + 1; i < TITLES.length; i++) {
    const title = TITLES[i];
    if (
      !meetsRequirements(
        title,
        stats,
        stats.totalQuestions > 0
          ? (stats.correctAnswers / stats.totalQuestions) * 100
          : 0
      )
    ) {
      return title;
    }
  }

  return null; // User has the highest title
}

export function getTitleProgress(stats: UserStats): {
  current: Title;
  next: Title | null;
  progress: string;
} {
  const current = calculateUserTitle(stats);
  const next = getNextTitle(stats);

  let progress = "";
  if (next) {
    // Calculate progress towards next title
    const accuracy =
      stats.totalQuestions > 0
        ? (stats.correctAnswers / stats.totalQuestions) * 100
        : 0;

    if (next.requirements.includes("accuracy")) {
      const targetAccuracy = parseInt(
        next.requirements.match(/(\d+)%/)?.[1] || "0"
      );
      const targetQuestions = parseInt(
        next.requirements.match(/(\d+)\+ questions/)?.[1] || "0"
      );

      if (stats.totalQuestions >= targetQuestions) {
        progress = `Need ${Math.max(0, targetAccuracy - accuracy).toFixed(
          1
        )}% more accuracy`;
      } else {
        progress = `Need ${
          targetQuestions - stats.totalQuestions
        } more questions`;
      }
    } else if (next.requirements.includes("questions answered")) {
      const targetQuestions = parseInt(
        next.requirements.match(/(\d+)\+ questions/)?.[1] || "0"
      );
      progress = `${stats.totalQuestions}/${targetQuestions} questions`;
    } else if (next.requirements.includes("streak")) {
      const targetStreak = parseInt(
        next.requirements.match(/(\d+)\+/)?.[1] || "0"
      );
      progress = `${stats.bestStreak}/${targetStreak} best streak`;
    }
  }

  return { current, next, progress };
}
