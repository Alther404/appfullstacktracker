import { useState, useEffect } from 'react';

const STORAGE_KEY = 'devjourney_stats';

const LEVELS = [
    { level: 1, xp: 0, title: 'Novice Scripter' },
    { level: 2, xp: 100, title: 'Console Logger' },
    { level: 3, xp: 300, title: 'Bug Hunter' },
    { level: 4, xp: 600, title: 'Git Committer' },
    { level: 5, xp: 1000, title: 'Junior Dev' },
    { level: 10, xp: 5000, title: 'Mid-Level Dev' },
    { level: 20, xp: 20000, title: 'Senior Architect' },
    { level: 50, xp: 100000, title: 'Fullstack Boss' }
];

export const useGamification = () => {
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : { xp: 0, level: 1, streak: 0, lastActive: null };
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    }, [stats]);

    const addXP = (amount) => {
        setStats(prev => {
            const newXP = prev.xp + amount;
            const newLevel = calculateLevel(newXP);
            return { ...prev, xp: newXP, level: newLevel };
        });
    };

    const calculateLevel = (xp) => {
        // Find the highest level where required XP <= current XP
        const levelObj = [...LEVELS].reverse().find(l => l.xp <= xp);
        return levelObj ? levelObj.level : 1;
    };

    const getLevelTitle = (level) => {
        const levelObj = LEVELS.find(l => l.level === level) || LEVELS[LEVELS.length - 1];
        return levelObj.title;
    };

    const getNextLevelXP = (currentXP) => {
        const nextLevel = LEVELS.find(l => l.xp > currentXP);
        return nextLevel ? nextLevel.xp : 999999;
    };

    return { stats, addXP, getLevelTitle, getNextLevelXP };
};
