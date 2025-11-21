import { useState, useEffect } from 'react';

const STORAGE_KEY = 'devjourney_resources';

export const useResources = () => {
    const [resources, setResources] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
    }, [resources]);

    const addResource = (url, title, type, category = 'General') => {
        if (resources.some(r => r.url === url)) return;

        const newResource = {
            id: Date.now().toString(),
            url,
            title,
            type, // 'video', 'article', 'tool'
            category, // New field for categorization
            addedAt: new Date().toISOString(),
            completed: false
        };

        setResources(prev => [newResource, ...prev]);
    };

    const removeResource = (id) => {
        setResources(prev => prev.filter(r => r.id !== id));
    };

    const toggleResourceComplete = (id) => {
        setResources(prev => prev.map(r =>
            r.id === id ? { ...r, completed: !r.completed } : r
        ));
    };

    return { resources, addResource, removeResource, toggleResourceComplete };
};
