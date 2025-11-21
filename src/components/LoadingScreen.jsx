import { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../translations';

export function LoadingScreen({ onComplete }) {
    const { language } = useSettings();
    const [joke, setJoke] = useState('');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const currentJokes = translations[language]?.jokes || translations['en'].jokes;
        setJoke(currentJokes[Math.floor(Math.random() * currentJokes.length)]);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Small delay after 100%
                    return 100;
                }
                return prev + 2; // 50 steps * 60ms = 3000ms approx
            });
        }, 60);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--bg-primary)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem', animation: 'pulse 2s infinite' }}>🚀</div>
            <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>FSdev Learn</h1>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>v0.3.0 by kalt7x</div>

            <div style={{
                width: '300px',
                height: '4px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
                marginBottom: '2rem',
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'var(--accent-gradient)',
                    transition: 'width 0.1s linear'
                }} />
            </div>

            <div style={{
                maxWidth: '600px',
                textAlign: 'center',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                minHeight: '3rem'
            }}>
                "{joke}"
            </div>
        </div>
    );
}
