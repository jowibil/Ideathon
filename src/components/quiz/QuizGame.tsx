'use client';

import { useState, useEffect} from 'react';
import { JSX } from 'react/jsx-runtime';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, BarChart3 } from 'lucide-react';
import { CategorySelector } from '../quiz/CategorySelector';
import { DifficultySelector } from '../quiz/DifficultySelector';
import { QuestionCard } from '../quiz/QuestionCard';
import { AnswerModal } from '../quiz/AnswerModal';
import { StatsDisplay } from '../quiz/StatsDisplay';
import { getRandomQuestion } from '@/lib/quizData';
import type { Category, Difficulty, Question } from '@/lib/quizData';
import { getUserStats, saveUserStats, updateStats, resetStats } from '@/lib/localStorage';
import { calculateUserTitle } from '@/lib/titleSystem';
import type { UserStats } from '@/lib/localStorage';
import { Easing } from "framer-motion";

type GameState = 'setup' | 'category' | 'difficulty' | 'playing' | 'stats';

interface QuizGameProps {
    initialStats?: UserStats;
}

export function QuizGame({ initialStats }: QuizGameProps): JSX.Element {

    const myEase: Easing = "easeInOut";
    const [gameState, setGameState] = useState<GameState>('setup');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [questionNumber, setQuestionNumber] = useState<number>(1);
    const [stats, setStats] = useState<UserStats>(() => initialStats || getUserStats());
    const [showModal, setShowModal] = useState<boolean>(false);
    const [lastAnswer, setLastAnswer] = useState<{
        userAnswer: 'reyal' | 'faki';
        correctAnswer: 'reyal' | 'faki';
        isCorrect: boolean;
        explanation?: string;
    } | null>(null);
    const [isAnswering, setIsAnswering] = useState<boolean>(false);

    useEffect(() => {
        if (gameState === 'playing' && !currentQuestion) {
            generateQuestion();
        }
    }, [gameState, selectedCategory, selectedDifficulty]);

    const generateQuestion = (): void => {
        const question = getRandomQuestion(selectedCategory || undefined, selectedDifficulty || undefined);
        setCurrentQuestion(question);
    };

    const handleAnswer = (userAnswer: 'reyal' | 'faki'): void => {
        if (!currentQuestion || isAnswering) return;

        setIsAnswering(true);
        const isCorrect = userAnswer === currentQuestion.answer;

        // Update stats
        const newStats = updateStats(
            stats,
            currentQuestion.id,
            currentQuestion.category,
            currentQuestion.difficulty,
            isCorrect
        );
        setStats(newStats);
        saveUserStats(newStats);

        // Prepare modal data
        setLastAnswer({
            userAnswer,
            correctAnswer: currentQuestion.answer,
            isCorrect,
            explanation: currentQuestion.explanation
        });

        // Show modal with a slight delay for animation
        setTimeout(() => {
            setShowModal(true);
        }, 300);
    };

    const handleNextQuestion = (): void => {
        setShowModal(false);
        setIsAnswering(false);
        setQuestionNumber(prev => prev + 1);
        generateQuestion();
        setLastAnswer(null);
    };

    const startQuiz = (): void => {
        setQuestionNumber(1);
        setGameState('category');
    };

    const handleCategorySelect = (category: Category | null): void => {
        setSelectedCategory(category);
        setGameState('difficulty');
    };

    const handleDifficultySelect = (difficulty: Difficulty | null): void => {
        setSelectedDifficulty(difficulty);
        setGameState('playing');
    };

    const goToStats = (): void => {
        setGameState('stats');
    };

    const goHome = (): void => {
        setGameState('setup');
        setCurrentQuestion(null);
        setQuestionNumber(1);
        setSelectedCategory(null);
        setSelectedDifficulty(null);
    };

    const handleResetStats = (): void => {
        resetStats();
        const newStats = getUserStats();
        setStats(newStats);
        setGameState('setup');
    };

    const currentTitle = calculateUserTitle(stats);

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: myEase },
            ease: "easeInOut"
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
            <div className="container mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <motion.h1
                        animate={{
                            background: ['linear-gradient(45deg, #3b82f6, #8b5cf6)',
                                'linear-gradient(45deg, #8b5cf6, #ec4899)',
                                'linear-gradient(45deg, #ec4899, #3b82f6)']
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-4xl md:text-6xl font-black bg-gradient-to-r bg-clip-text text-transparent mb-4"
                    >
                        REYAL OR FAKI
                    </motion.h1>
                    <p className="text-gray-600 text-lg mb-4">
                        Test your truth-detecting skills in the ultimate quiz challenge!
                    </p>

                    {stats.totalQuestions > 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                        >
                            <Badge className={`text-lg px-4 py-2 ${currentTitle.color} bg-white border-2`}>
                                {currentTitle.emoji} {currentTitle.name}
                            </Badge>
                        </motion.div>
                    )}
                </motion.div>

                {/* Navigation */}
                {gameState !== 'setup' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center gap-4 mb-8"
                    >
                        <Button onClick={goHome} variant="outline">
                            <Home className="w-4 h-4 mr-2" />
                            Home
                        </Button>
                        <Button onClick={goToStats} variant="outline">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Stats
                        </Button>
                    </motion.div>
                )}

                {/* Game Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={gameState}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {gameState === 'setup' && (
                            <div className="text-center space-y-8">
                                <Card className="max-w-2xl mx-auto">
                                    <CardContent className="p-8">
                                        <motion.div
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            className="text-6xl mb-6"
                                        >
                                            🤔💭
                                        </motion.div>
                                        <h2 className="text-2xl font-bold mb-4">
                                            Ready to Test Your Truth Detection?
                                        </h2>
                                        <p className="text-gray-600 mb-6">
                                            Welcome to the ultimate truth vs fiction challenge! Answer questions,
                                            earn amazing titles, and become a master of separating REYAL from FAKI.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-sm mb-6">
                                            <div className="bg-green-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-green-800 mb-2">✅ How to Play</h4>
                                                <ul className="text-green-700 space-y-1">
                                                    <li>• Read each statement carefully</li>
                                                    <li>• Choose REYAL or FAKI</li>
                                                    <li>• Build your streak and accuracy</li>
                                                </ul>
                                            </div>
                                            <div className="bg-purple-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-purple-800 mb-2">🏆 Earn Titles</h4>
                                                <ul className="text-purple-700 space-y-1">
                                                    <li>• Reyal Master, Reyal God</li>
                                                    <li>• Faki Noob, Faki Demon</li>
                                                    <li>• Category specialists</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Button onClick={startQuiz} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-8 py-4">
                                                Start Quiz 🚀
                                            </Button>
                                            {stats.totalQuestions > 0 && (
                                                <Button onClick={goToStats} variant="outline" size="lg">
                                                    View Stats 📊
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {gameState === 'category' && (
                            <CategorySelector
                                selectedCategory={selectedCategory}
                                onCategorySelect={handleCategorySelect}
                                categoryStats={stats.categoryStats}
                            />
                        )}

                        {gameState === 'difficulty' && (
                            <DifficultySelector
                                selectedDifficulty={selectedDifficulty}
                                onDifficultySelect={handleDifficultySelect}
                                difficultyStats={stats.difficultyStats}
                            />
                        )}

                        {gameState === 'playing' && currentQuestion && (
                            <QuestionCard
                                question={currentQuestion}
                                onAnswer={handleAnswer}
                                questionNumber={questionNumber}
                                totalQuestions={questionNumber + 9}
                                disabled={isAnswering}
                            />
                        )}

                        {gameState === 'stats' && (
                            <StatsDisplay
                                stats={stats}
                                onResetStats={handleResetStats}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Answer Modal */}
            {lastAnswer && (
                <AnswerModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    isCorrect={lastAnswer.isCorrect}
                    userAnswer={lastAnswer.userAnswer}
                    correctAnswer={lastAnswer.correctAnswer}
                    explanation={lastAnswer.explanation}
                    onNextQuestion={handleNextQuestion}
                />
            )}
        </div>
    );
}