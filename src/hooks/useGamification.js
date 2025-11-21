import { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';

const STORAGE_KEY = 'devjourney_stats';

// Levels based on Full-Stack Developer Roadmap
// Titles are now objects { en: '...', ru: '...' }
const LEVELS = [
    { level: 1, xp: 0, title: { en: 'Web Basics Learner', ru: 'Новичок в Вебе' } },
    { level: 2, xp: 100, title: { en: 'HTML/CSS Explorer', ru: 'Исследователь HTML/CSS' } },
    { level: 3, xp: 300, title: { en: 'JavaScript Beginner', ru: 'Начинающий JS' } },
    { level: 4, xp: 600, title: { en: 'DOM Manipulator', ru: 'Мастер DOM' } },
    { level: 5, xp: 1000, title: { en: 'Frontend Developer', ru: 'Frontend Разработчик' } },
    { level: 6, xp: 1500, title: { en: 'React Developer', ru: 'React Разработчик' } },
    { level: 7, xp: 2200, title: { en: 'Backend Explorer', ru: 'Исследователь Бэкенда' } },
    { level: 8, xp: 3000, title: { en: 'API Builder', ru: 'Создатель API' } },
    { level: 9, xp: 4000, title: { en: 'Database Manager', ru: 'Администратор БД' } },
    { level: 10, xp: 5500, title: { en: 'Full-Stack Developer', ru: 'Full-Stack Разработчик' } },
    { level: 11, xp: 7500, title: { en: 'Security Expert', ru: 'Эксперт по безопасности' } },
    { level: 12, xp: 10000, title: { en: 'Testing Specialist', ru: 'Специалист по тестированию' } },
    { level: 13, xp: 13000, title: { en: 'DevOps Engineer', ru: 'DevOps Инженер' } },
    { level: 14, xp: 17000, title: 'Cloud Architect', ru: 'Облачный Архитектор' },
    { level: 15, xp: 22000, title: 'Senior Full-Stack Dev', ru: 'Senior Full-Stack' },
    { level: 20, xp: 50000, title: 'Tech Lead', ru: 'Техлид' },
    { level: 25, xp: 100000, title: 'Software Architect', ru: 'Архитектор ПО' }
];

export const useGamification = () => {
    const { language } = useSettings(); // Get current language
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
        // Return localized title
        return levelObj.title[language] || levelObj.title['en'];
    };

    const getNextLevelXP = (currentXP) => {
        const nextLevel = LEVELS.find(l => l.xp > currentXP);
        return nextLevel ? nextLevel.xp : 999999;
    };

    return { stats, addXP, getLevelTitle, getNextLevelXP };
};
