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

    const addTask = (title, difficulty, initialStatus = 'todo') => {
        if (tasks.some(t => t.title === title)) return;

        const newTask = {
            id: Date.now().toString(),
            title,
            difficulty,
            status: initialStatus,
            xp: calculateXP(difficulty),
            createdAt: new Date().toISOString()
        };

        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    };

    const updateTaskStatus = (id, status) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, status } : task
        ));
    };

    const completeTask = (title) => {
        setTasks(prev => prev.map(task =>
            task.title === title ? { ...task, status: 'done', completedAt: new Date().toISOString() } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    return { tasks, addTask, updateTaskStatus, completeTask, deleteTask };
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
