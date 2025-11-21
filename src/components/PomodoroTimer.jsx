import { useState, useEffect } from 'react';
import { useGamification } from '../hooks/useGamification';
import { useSettings } from '../contexts/SettingsContext';

export function PomodoroTimer() {
    const { addXP } = useGamification();
    const { t } = useSettings();
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, break

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (mode === 'focus') {
                // Session completed!
                const sessions = JSON.parse(localStorage.getItem('devjourney_sessions') || '[]');
                sessions.push({
                    date: new Date().toISOString(),
                    duration: 25 // Assuming standard 25m for now
                });
                localStorage.setItem('devjourney_sessions', JSON.stringify(sessions));

                addXP(50); // Bonus XP for finishing a pomodoro
                new Notification(t('pomodoro'), { body: "Focus session complete! Take a break." });

                setMode('break');
                setTimeLeft(5 * 60);
            } else {
                new Notification(t('pomodoro'), { body: "Break over! Back to work." });
                setMode('focus');
                setTimeLeft(25 * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode, addXP, t]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setMode('focus');
        setTimeLeft(25 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{
                fontSize: '3rem',
                fontWeight: '800',
                fontVariantNumeric: 'tabular-nums',
                color: mode === 'focus' ? 'var(--accent-primary)' : 'var(--success)'
            }}>
                {formatTime(timeLeft)}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    onClick={toggleTimer}
                    style={{
                        padding: '0.5rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        background: isActive ? 'var(--danger)' : 'var(--accent-primary)',
                        color: 'white',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {isActive ? t('pause') || 'Pause' : t('start') || 'Start'}
                </button>
                <button
                    onClick={resetTimer}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {t('reset') || 'Reset'}
                </button>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {mode === 'focus' ? t('focusTime') || 'Focus Time' : t('breakTime') || 'Break Time'}
            </div>
        </div>
    );
}
