'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Question } from '@/lib/quizData';
import { CATEGORIES, DIFFICULTIES } from '@/lib/quizData';
import { JSX } from 'react/jsx-runtime';

interface QuestionCardProps {
    question: Question;
    onAnswer: (answer: 'reyal' | 'faki') => void;
    questionNumber: number;
    totalQuestions: number;
    disabled?: boolean;
}

export function QuestionCard({
    question,
    onAnswer,
    questionNumber,
    totalQuestions,
    disabled = false
}: QuestionCardProps): JSX.Element {
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const handleAnswer = (answer: 'reyal' | 'faki') => {
        if (disabled || isAnimating) return;

        setIsAnimating(true);
        onAnswer(answer);

        // Reset animation state after a delay
        setTimeout(() => setIsAnimating(false), 500);
    };

    const categoryLabel = CATEGORIES[question.category as keyof typeof CATEGORIES];
    const difficultyData = DIFFICULTIES[question.difficulty as keyof typeof DIFFICULTIES];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto"
        >
            <Card className="overflow-hidden border-2 shadow-xl bg-gradient-to-br from-white to-gray-50">
                <motion.div
                    className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />

                <CardContent className="p-8">
                    {/* Header with badges */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-between items-center mb-6"
                    >
                        <div className="flex gap-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                {categoryLabel}
                            </Badge>
                            <Badge
                                variant="outline"
                                className={`text-white ${difficultyData.color}`}
                            >
                                {difficultyData.label}
                            </Badge>
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                            {questionNumber} / {totalQuestions}
                        </div>
                    </motion.div>

                    {/* Question statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8 text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-4">
                            {question.statement}
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
                    </motion.div>

                    {/* Answer buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.div
                            whileHover={{ scale: disabled ? 1 : 1.05 }}
                            whileTap={{ scale: disabled ? 1 : 0.95 }}
                        >
                            <Button
                                onClick={() => handleAnswer('reyal')}
                                disabled={disabled || isAnimating}
                                size="lg"
                                className="w-48 h-16 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg transition-all duration-200 transform hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <motion.div
                                    animate={isAnimating ? { rotate: [0, 5, -5, 0] } : {}}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-2xl">✅</span>
                                    REYAL
                                </motion.div>
                            </Button>
                        </motion.div>

                        <div className="hidden sm:block text-2xl text-gray-400 font-bold">VS</div>

                        <motion.div
                            whileHover={{ scale: disabled ? 1 : 1.05 }}
                            whileTap={{ scale: disabled ? 1 : 0.95 }}
                        >
                            <Button
                                onClick={() => handleAnswer('faki')}
                                disabled={disabled || isAnimating}
                                size="lg"
                                className="w-48 h-16 text-xl font-bold bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg transition-all duration-200 transform hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <motion.div
                                    animate={isAnimating ? { rotate: [0, -5, 5, 0] } : {}}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-2xl">❌</span>
                                    FAKI
                                </motion.div>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Animated thinking indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 text-center"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-4xl mb-2"
                        >
                            🤔
                        </motion.div>
                        <p className="text-gray-500 text-sm font-medium">
                            Think carefully... What's your gut feeling?
                        </p>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
}