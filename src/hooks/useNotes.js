import { useState, useEffect } from 'react';

const STORAGE_KEY = 'devjourney_notes';

export const useNotes = () => {
    const [notes, setNotes] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) || '';
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, notes);
    }, [notes]);

    return { notes, setNotes };
};
