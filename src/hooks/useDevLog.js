import { useState, useEffect } from 'react';

const STORAGE_KEY = 'devjourney_logs';

export const useDevLog = () => {
    const [logs, setLogs] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }, [logs]);

    const addLog = (content, mood = 'neutral') => {
        const newLog = {
            id: Date.now().toString(),
            content,
            mood, // 'happy', 'neutral', 'frustrated', 'excited'
            date: new Date().toISOString()
        };
        setLogs(prev => [newLog, ...prev]);
    };

    const deleteLog = (id) => {
        setLogs(prev => prev.filter(log => log.id !== id));
    };

    return { logs, addLog, deleteLog };
};
