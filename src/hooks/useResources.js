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

    const addResource = (url, title, type = 'article', tags = []) => {
        const newResource = {
            id: Date.now().toString(),
            url,
            title: title || url,
            type, // 'article', 'video', 'tool', 'other'
            tags,
            createdAt: new Date().toISOString()
        };
        setResources(prev => [newResource, ...prev]);
    };

    const deleteResource = (id) => {
        setResources(prev => prev.filter(res => res.id !== id));
    };

    return { resources, addResource, deleteResource };
};
