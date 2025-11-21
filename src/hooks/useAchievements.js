import { useState, useEffect } from 'react';

const ACHIEVEMENTS = [
    {
        id: 'first_task',
        title: 'Hello World',
        description: 'Complete your first task',
        emoji: '👋',
        condition: (stats) => stats.tasksCompleted >= 1
    },
    {
        id: 'task_10',
        title: 'Getting Started',
        description: 'Complete 10 tasks',
        emoji: '🎯',
        condition: (stats) => stats.tasksCompleted >= 10
    },
    {
        id: 'task_50',
        title: 'Productive',
        description: 'Complete 50 tasks',
        emoji: '🔥',
        condition: (stats) => stats.tasksCompleted >= 50
    },
    {
        id: 'task_100',
        title: 'Century Club',
        description: 'Complete 100 tasks',
        emoji: '💯',
        condition: (stats) => stats.tasksCompleted >= 100
    },
    {
        id: 'xp_100',
        title: 'Junior Dev',
        description: 'Reach 100 XP',
        emoji: '👶',
        condition: (stats) => stats.totalXP >= 100
    },
    {
        id: 'xp_500',
        title: 'Mid-Level Master',
        description: 'Reach 500 XP',
        emoji: '⚡',
        condition: (stats) => stats.totalXP >= 500
    },
    {
        id: 'xp_1000',
        title: 'Senior Developer',
        description: 'Reach 1000 XP',
        emoji: '🚀',
        condition: (stats) => stats.totalXP >= 1000
    },
    {
        id: 'streak_3',
        title: 'Consistency',
        description: '3-day streak',
        emoji: '📅',
        condition: (stats) => stats.streak >= 3
    },
    {
        id: 'streak_7',
        title: 'Week Warrior',
        description: '7-day streak',
        emoji: '🗓️',
        condition: (stats) => stats.streak >= 7
    },
    {
        id: 'focus_10',
        title: 'Focused Mind',
        description: 'Complete 10 Pomodoro sessions',
        emoji: '🎯',
        condition: (stats) => stats.pomodoroSessions >= 10
    }
];

export function useAchievements() {
    const [unlocked, setUnlocked] = useState(() => {
        return JSON.parse(localStorage.getItem('devjourney_achievements') || '[]');
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('devjourney_achievements', JSON.stringify(unlocked));
    }, [unlocked]);

    const checkAchievements = (stats) => {
        const newlyUnlocked = [];

        ACHIEVEMENTS.forEach(achievement => {
            const isUnlocked = unlocked.some(u => u.id === achievement.id);
            const meetsCondition = achievement.condition(stats);

            if (!isUnlocked && meetsCondition) {
                newlyUnlocked.push({
                    ...achievement,
                    unlockedAt: new Date().toISOString()
                });
            }
        });

        if (newlyUnlocked.length > 0) {
            setUnlocked(prev => [...prev, ...newlyUnlocked]);

            // Show notification for new achievements
            newlyUnlocked.forEach(ach => {
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('🎉 Achievement Unlocked!', {
                        body: `${ach.emoji} ${ach.title}: ${ach.description}`
                    });
                }
            });
        }

        return newlyUnlocked;
    };

    const getAchievementsList = () => {
        return ACHIEVEMENTS.map(achievement => ({
            ...achievement,
            unlocked: unlocked.some(u => u.id === achievement.id),
            unlockedAt: unlocked.find(u => u.id === achievement.id)?.unlockedAt
        }));
    };

    const getProgress = () => {
        const total = ACHIEVEMENTS.length;
        const completed = unlocked.length;
        return { completed, total, percentage: Math.round((completed / total) * 100) };
    };

    return {
        achievements: getAchievementsList(),
        unlocked,
        checkAchievements,
        getProgress
    };
}
