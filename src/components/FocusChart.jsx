import { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export function FocusChart() {
    const { t } = useSettings();
    const [weeklyData, setWeeklyData] = useState([]);

    useEffect(() => {
        const sessions = JSON.parse(localStorage.getItem('devjourney_sessions') || '[]');
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const data = last7Days.map(dateStr => {
            const daySessions = sessions.filter(s => s.date.startsWith(dateStr));
            const totalMinutes = daySessions.reduce((acc, curr) => acc + curr.duration, 0);
            return {
                date: dateStr,
                day: new Date(dateStr).toLocaleDateString(undefined, { weekday: 'short' }),
                minutes: totalMinutes
            };
        });

        setWeeklyData(data);
    }, []);

    const maxMinutes = Math.max(...weeklyData.map(d => d.minutes), 60); // Min 60 for scale

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '1rem' }}>📊 {t('focusAnalytics') || 'Focus Analytics'}</h2>

            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '0.5rem', paddingBottom: '1rem' }}>
                {weeklyData.map(day => (
                    <div key={day.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div
                            style={{
                                width: '100%',
                                background: 'var(--accent-primary)',
                                borderRadius: 'var(--radius-sm)',
                                height: `${(day.minutes / maxMinutes) * 100}%`,
                                minHeight: day.minutes > 0 ? '4px' : '0',
                                transition: 'height 0.5s ease',
                                opacity: 0.8
                            }}
                            title={`${day.minutes} mins`}
                        />
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{day.day}</span>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.9rem', opacity: 0.6 }}>
                Last 7 Days
            </div>
        </div>
    );
}
