'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuizGame } from '@/components/quiz/QuizGame';
import { getUserStats } from '../lib/localStorage';
import type { UserStats } from '../lib/localStorage';
import { JSX } from 'react/jsx-runtime';

export default function HomePage(): JSX.Element {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load user stats from localStorage after component mounts
    const loadStats = (): void => {
      try {
        const userStats = getUserStats();
        setStats(userStats);
      } catch (error) {
        console.error('Error loading user stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to prevent hydration mismatch
    const timeout = setTimeout(loadStats, 100);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
            className="text-6xl mb-4"
          >
            🤔
          </motion.div>
          <motion.h1
            animate={{
              background: ['linear-gradient(45deg, #3b82f6, #8b5cf6)',
                'linear-gradient(45deg, #8b5cf6, #ec4899)',
                'linear-gradient(45deg, #ec4899, #3b82f6)']
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl md:text-5xl font-black bg-gradient-to-r bg-clip-text text-transparent mb-4"
          >
            REYAL OR FAKI
          </motion.h1>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-gray-600"
          >
            Loading your quiz adventure...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <QuizGame initialStats={stats || undefined} />
    </motion.main>
  );
}