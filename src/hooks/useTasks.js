import { useState, useEffect } from 'react';

const STORAGE_KEY = 'devjourney_tasks';

export const useTasks = () => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title, difficulty = 'medium') => {
        const newTask = {
            id: Date.now().toString(),
            title,
            status: 'todo', // todo, in-progress, done
            difficulty, // easy, medium, hard
            xp: calculateXP(difficulty),
            createdAt: new Date().toISOString()
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const updateTaskStatus = (id, status) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, status } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    return { tasks, addTask, updateTaskStatus, deleteTask };
};

const calculateXP = (difficulty) => {
    switch (difficulty) {
        case 'easy': return 10;
        case 'medium': return 25;
        case 'hard': return 50;
        case 'epic': return 100;
        default: return 10;
    }
};
