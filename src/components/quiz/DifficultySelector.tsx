'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DIFFICULTIES } from '@/lib/quizData';
import type { Difficulty } from '@/lib/quizData';
import { JSX } from 'react/jsx-runtime';

interface DifficultySelectorProps {
    selectedDifficulty: Difficulty | null;
    onDifficultySelect: (difficulty: Difficulty | null) => void;
    difficultyStats?: Record<string, { correct: number; total: number }>;
}

export function DifficultySelector({
    selectedDifficulty,
    onDifficultySelect,
    difficultyStats = {}
}: DifficultySelectorProps): JSX.Element {
    const difficulties = Object.entries(DIFFICULTIES) as [Difficulty, { label: string; color: string }][];

    const getDifficultyAccuracy = (difficulty: Difficulty): number => {
        const stats = difficultyStats[difficulty];
        if (!stats || stats.total === 0) return 0;
        return Math.round((stats.correct / stats.total) * 100);
    };

    const getDifficultyDescription = (difficulty: Difficulty): string => {
        switch (difficulty) {
            case 'easy':
                return 'Perfect for beginners';
            case 'medium':
                return 'A balanced challenge';
            case 'hard':
                return 'For the brave ones';
            case 'expert':
                return 'Only for the elite';
            default:
                return '';
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Select Difficulty Level
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {difficulties.map(([difficulty, data], index) => {
                        const accuracy = getDifficultyAccuracy(difficulty);
                        const questionsAnswered = difficultyStats[difficulty]?.total || 0;
                        const isSelected = selectedDifficulty === difficulty;

                        return (
                            <motion.div
                                key={difficulty}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.4 }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Card
                                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden ${isSelected
                                            ? 'ring-2 ring-offset-2 ring-orange-500 bg-orange-50 border-orange-200'
                                            : 'hover:bg-gray-50'
                                        }`}
                                    onClick={() => onDifficultySelect(difficulty)}
                                >
                                    <motion.div
                                        className={`absolute top-0 left-0 h-1 ${data.color} transition-all duration-300 ${isSelected ? 'w-full' : 'w-0'
                                            }`}
                                    />

                                    <CardContent className="p-6">
                                        <div className="text-center">
                                            <motion.div
                                                animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                                                transition={{ duration: 0.5 }}
                                                className="text-4xl mb-3"
                                            >
                                                {data.label.split(' ')[0]}
                                            </motion.div>

                                            <h4 className="font-bold text-xl mb-2">
                                                {data.label.split(' ').slice(1).join(' ')}
                                            </h4>

                                            <p className="text-gray-600 text-sm mb-3">
                                                {getDifficultyDescription(difficulty)}
                                            </p>

                                            {questionsAnswered > 0 ? (
                                                <div className="space-y-2">
                                                    <Badge
                                                        variant="outline"
                                                        className={`
                              ${accuracy >= 80 ? 'bg-green-100 text-green-800' :
                                                                accuracy >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'}
                            `}
                                                    >
                                                        {accuracy}% accuracy
                                                    </Badge>
                                                    <p className="text-xs text-gray-500">
                                                        {questionsAnswered} questions completed
                                                    </p>
                                                </div>
                                            ) : (
                                                <Badge variant="outline" className="bg-blue-100 text-blue-600">
                                                    Untested
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* All Difficulties option */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <Button
                        onClick={() => onDifficultySelect(null)}
                        variant={selectedDifficulty === null ? "default" : "outline"}
                        size="lg"
                        className={`px-8 py-4 ${selectedDifficulty === null
                                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg transform hover:scale-105'
                                : 'hover:bg-gray-100'
                            } transition-all duration-200`}
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-2"
                        >
                            <span className="text-xl">🎲</span>
                            Random Difficulty
                        </motion.div>
                    </Button>

                    {selectedDifficulty === null && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-3 text-sm text-gray-600 max-w-md mx-auto"
                        >
                            Keep things exciting! Questions will come from all difficulty levels to test your knowledge comprehensively.
                        </motion.p>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}