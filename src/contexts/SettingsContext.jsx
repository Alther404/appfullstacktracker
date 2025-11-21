import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    // Language State
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('devjourney_lang') || 'ru'; // Default to RU as requested
    });

    // Theme State
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('devjourney_theme') || 'dark';
    });

    // GitHub Username State
    const [githubUsername, setGithubUsername] = useState(() => {
        return localStorage.getItem('devjourney_github') || '';
    });

    // Persist Theme & Apply Class
    useEffect(() => {
        localStorage.setItem('devjourney_theme', theme);
        document.body.className = theme === 'light' ? 'light-theme' : '';
    }, [theme]);

    // Persist GitHub Username
    useEffect(() => {
        localStorage.setItem('devjourney_github', githubUsername);
    }, [githubUsername]);

    const t = (key) => {
        return translations[language]?.[key] || translations['en'][key] || key;
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ru' : 'en');
    };

    const resetProgress = () => {
        if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <SettingsContext.Provider value={{
            language,
            setLanguage,
            theme,
            toggleTheme,
            toggleLanguage,
            t,
            githubUsername,
            setGithubUsername,
            resetProgress
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
