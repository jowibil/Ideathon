'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trophy, Target, Zap, RotateCcw } from 'lucide-react';
import type { UserStats } from '@/lib/localStorage';
import { getTitleProgress } from '@/lib/titleSystem';
import { getAccuracyPercentage } from '@/lib/localStorage';
import { CATEGORIES, DIFFICULTIES } from '@/lib/quizData';
import { JSX } from 'react/jsx-runtime';

interface StatsDisplayProps {
    stats: UserStats;
    onResetStats: () => void;
}

export function StatsDisplay({ stats, onResetStats }: StatsDisplayProps): JSX.Element {
    const accuracy = getAccuracyPercentage(stats);
    const titleData = getTitleProgress(stats);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-6xl mx-auto space-y-6"
        >
            {/* Title and Current Stats */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Badge
                        className={`text-2xl px-6 py-2 ${titleData.current.color} bg-gradient-to-r from-purple-100 to-blue-100`}
                    >
                        {titleData.current.emoji} {titleData.current.name}
                    </Badge>
                </motion.div>
                <p className="text-gray-600 max-w-md mx-auto">
                    {titleData.current.description}
                </p>
                {titleData.next && (
                    <div className="bg-blue-50 rounded-lg p-3 max-w-md mx-auto">
                        <p className="text-sm text-blue-700">
                            <span className="font-semibold">Next: {titleData.next.name}</span>
                        </p>
                        <p className="text-xs text-blue-600 mt-1">{titleData.progress}</p>
                    </div>
                )}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Stats */}
                <motion.div variants={itemVariants}>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-yellow-600" />
                                Overall Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        {stats.correctAnswers}
                                    </div>
                                    <div className="text-sm text-green-700">Correct</div>
                                </div>
                                <div className="text-center p-3 bg-red-50 rounded-lg">
                                    <div className="text-2xl font-bold text-red-600">
                                        {stats.wrongAnswers}
                                    </div>
                                    <div className="text-sm text-red-700">Wrong</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Accuracy</span>
                                    <span className="text-sm font-bold">{accuracy}%</span>
                                </div>
                                <Progress value={accuracy} className="h-2" />
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Total Questions</span>
                                    <span className="font-semibold">{stats.totalQuestions}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Best Streak</span>
                                    <Badge variant="outline" className="text-orange-600">
                                        {stats.bestStreak} 🔥
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Current Streak</span>
                                    <Badge
                                        variant="outline"
                                        className={stats.currentStreak > 5 ? "text-green-600" : "text-gray-600"}
                                    >
                                        {stats.currentStreak} ⚡
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Category Performance */}
                <motion.div variants={itemVariants}>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5 text-blue-600" />
                                Category Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {Object.keys(stats.categoryStats).length > 0 ? (
                                <div className="space-y-3">
                                    {Object.entries(stats.categoryStats)
                                        .sort(([, a], [, b]) => b.total - a.total)
                                        .map(([category, categoryStats]) => {
                                            const categoryAccuracy = categoryStats.total > 0
                                                ? Math.round((categoryStats.correct / categoryStats.total) * 100)
                                                : 0;
                                            const categoryLabel = CATEGORIES[category as keyof typeof CATEGORIES] || category;

                                            return (
                                                <motion.div
                                                    key={category}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="p-3 bg-gray-50 rounded-lg"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium">{categoryLabel}</span>
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                categoryAccuracy >= 80 ? "text-green-600" :
                                                                    categoryAccuracy >= 60 ? "text-yellow-600" :
                                                                        "text-red-600"
                                                            }
                                                        >
                                                            {categoryAccuracy}%
                                                        </Badge>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {categoryStats.correct}/{categoryStats.total} correct
                                                    </div>
                                                    <Progress value={categoryAccuracy} className="h-1 mt-1" />
                                                </motion.div>
                                            );
                                        })}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No category data yet</p>
                                    <p className="text-xs">Start answering questions!</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Difficulty Performance */}
                <motion.div variants={itemVariants}>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-purple-600" />
                                Difficulty Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {Object.keys(stats.difficultyStats).length > 0 ? (
                                <div className="space-y-3">
                                    {Object.entries(stats.difficultyStats)
                                        .sort(([a], [b]) => {
                                            const order = ['easy', 'medium', 'hard', 'expert'];
                                            return order.indexOf(a) - order.indexOf(b);
                                        })
                                        .map(([difficulty, difficultyStats]) => {
                                            const difficultyAccuracy = difficultyStats.total > 0
                                                ? Math.round((difficultyStats.correct / difficultyStats.total) * 100)
                                                : 0;
                                            const difficultyData = DIFFICULTIES[difficulty as keyof typeof DIFFICULTIES];

                                            return (
                                                <motion.div
                                                    key={difficulty}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="p-3 bg-gray-50 rounded-lg"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium">
                                                            {difficultyData?.label || difficulty}
                                                        </span>
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                difficultyAccuracy >= 80 ? "text-green-600" :
                                                                    difficultyAccuracy >= 60 ? "text-yellow-600" :
                                                                        "text-red-600"
                                                            }
                                                        >
                                                            {difficultyAccuracy}%
                                                        </Badge>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {difficultyStats.correct}/{difficultyStats.total} correct
                                                    </div>
                                                    <Progress value={difficultyAccuracy} className="h-1 mt-1" />
                                                </motion.div>
                                            );
                                        })}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No difficulty data yet</p>
                                    <p className="text-xs">Challenge yourself!</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Reset Stats Button */}
            <motion.div variants={itemVariants} className="text-center">
                <Button
                    onClick={onResetStats}
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset All Stats
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                    Warning: This will permanently delete all your progress
                </p>
            </motion.div>
        </motion.div>
    );
}