'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { JSX } from 'react/jsx-runtime';

interface AnswerModalProps {
    isOpen: boolean;
    onClose: () => void;
    isCorrect: boolean;
    userAnswer: 'reyal' | 'faki';
    correctAnswer: 'reyal' | 'faki';
    explanation?: string;
    onNextQuestion: () => void;
}

export function AnswerModal({
    isOpen,
    onClose,
    isCorrect,
    userAnswer,
    correctAnswer,
    explanation,
    onNextQuestion
}: AnswerModalProps): JSX.Element {
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen && isCorrect) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isCorrect]);

    const getModalContent = () => {
        if (isCorrect) {
            return {
                title: correctAnswer === 'reyal' ? '🎉 Oh, Yeah! Reyal' : '🎉 Oh, Yeah! Faki',
                message: 'Awesome! You got it right!',
                bgColor: 'bg-gradient-to-br from-green-400 via-green-500 to-emerald-600',
                textColor: 'text-white',
                emoji: '✅'
            };
        } else {
            return {
                title: userAnswer === 'reyal' ? '😱 Oh no! Faki' : '😱 Oh no! Reyal',
                message: `The correct answer was ${correctAnswer.charAt(0).toUpperCase() + correctAnswer.slice(1)}`,
                bgColor: 'bg-gradient-to-br from-red-400 via-red-500 to-rose-600',
                textColor: 'text-white',
                emoji: '❌'
            };
        }
    };

    const content = getModalContent();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md mx-auto p-0 overflow-hidden border-0">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className={`${content.bgColor} ${content.textColor} p-8 text-center relative overflow-hidden`}
                >
                    {/* Animated background effects */}
                    <div className="absolute inset-0 opacity-20">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-10 -left-10 w-20 h-20 bg-white rounded-full"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [360, 180, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -bottom-5 -right-5 w-16 h-16 bg-white rounded-full"
                        />
                    </div>

                    {/* Confetti animation for correct answers */}
                    <AnimatePresence>
                        {showConfetti && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{
                                            x: '50%',
                                            y: '50%',
                                            scale: 0,
                                            rotate: 0
                                        }}
                                        animate={{
                                            x: `${Math.random() * 100}%`,
                                            y: `${Math.random() * 100}%`,
                                            scale: [0, 1, 0],
                                            rotate: 360
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: i * 0.1,
                                            ease: "easeOut"
                                        }}
                                        className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative z-10"
                    >
                        <motion.div
                            animate={isCorrect ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            } : {
                                scale: [1, 0.9, 1],
                                rotate: [0, -5, 5, 0]
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut"
                            }}
                            className="text-6xl mb-4"
                        >
                            {content.emoji}
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold mb-2"
                        >
                            {content.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg mb-4 opacity-90"
                        >
                            {content.message}
                        </motion.p>

                        {explanation && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white bg-opacity-20 rounded-lg p-3 mb-6 text-sm text-black"
                            >
                                <p className="opacity-90">{explanation}</p>
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-3 justify-center"
                        >
                            <Button
                                onClick={onNextQuestion}
                                className="bg-white text-gray-800 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                                size="lg"
                            >
                                Next Question 🚀
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}