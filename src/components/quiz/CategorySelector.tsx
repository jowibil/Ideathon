'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES } from '@/lib/quizData';
import type { Category } from '@/lib/types';
import { JSX } from 'react/jsx-runtime';

interface CategorySelectorProps {
    selectedCategory: Category | null;
    onCategorySelect: (category: Category | null) => void;
    categoryStats?: Record<string, { correct: number; total: number }>;
}

export function CategorySelector({
    selectedCategory,
    onCategorySelect,
    categoryStats = {}
}: CategorySelectorProps): JSX.Element {
    const categories = Object.entries(CATEGORIES) as [Category, string][];

    const getCategoryAccuracy = (category: Category): number => {
        const stats = categoryStats[category];
        if (!stats || stats.total === 0) return 0;
        return Math.round((stats.correct / stats.total) * 100);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Choose Your Category
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {categories.map(([category, label], index) => {
                        const accuracy = getCategoryAccuracy(category);
                        const questionsAnswered = categoryStats[category]?.total || 0;
                        const isSelected = selectedCategory === category;
                        return (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Card
                                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${isSelected
                                        ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200'
                                        : 'hover:bg-gray-50'
                                        }`}
                                    onClick={() => onCategorySelect(category)}
                                >
                                    <CardContent className="p-4">
                                        <div className="text-center">
                                            <div className="text-3xl mb-2">
                                                {label.split(' ')[0]}
                                            </div>
                                            <h4 className="font-semibold text-lg mb-2">
                                                {label.split(' ').slice(1).join(' ')}
                                            </h4>

                                            {questionsAnswered > 0 && (
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
                                                        {questionsAnswered} questions answered
                                                    </p>
                                                </div>
                                            )}

                                            {questionsAnswered === 0 && (
                                                <Badge variant="outline" className="bg-gray-100 text-gray-600">
                                                    New Category
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* All Categories option */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <Button
                        onClick={() => onCategorySelect(null)}
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="lg"
                        className={`px-8 py-3 ${selectedCategory === null
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                            : 'hover:bg-gray-100'
                            }`}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2"
                        >
                            <span className="text-xl">🎯</span>
                            All Categories (Mixed)
                        </motion.div>
                    </Button>

                    {selectedCategory === null && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-2 text-sm text-gray-600"
                        >
                            Questions from all categories for maximum challenge!
                        </motion.p>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}