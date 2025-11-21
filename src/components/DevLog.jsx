import { useState } from 'react';
import { useDevLog } from '../hooks/useDevLog';
import { useSettings } from '../contexts/SettingsContext';

export function DevLog() {
    const { logs, addLog, deleteLog } = useDevLog();
    const { t } = useSettings();
    const [newEntry, setNewEntry] = useState('');
    const [mood, setMood] = useState('neutral');

    const handlePost = () => {
        if (!newEntry.trim()) return;
        addLog(newEntry, mood);
        setNewEntry('');
        setMood('neutral');
    };

    const moods = [
        { emoji: '😊', value: 'happy' },
        { emoji: '😐', value: 'neutral' },
        { emoji: '😤', value: 'frustrated' },
        { emoji: '🤔', value: 'thinking' }
    ];

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '1rem' }}>📝 {t('devLog') || 'Daily DevLog'}</h2>

            <div style={{ marginBottom: '1rem' }}>
                <textarea
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="What did you learn today?..."
                    style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '0.8rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(0,0,0,0.2)',
                        color: 'var(--text-primary)',
                        resize: 'vertical',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit'
                    }}
                />
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {moods.map(m => (
                            <button
                                key={m.value}
                                onClick={() => setMood(m.value)}
                                className="btn-secondary btn-sm"
                                style={{
                                    fontSize: '1.2rem',
                                    opacity: mood === m.value ? 1 : 0.5
                                }}
                            >
                                {m.emoji}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handlePost}
                        className="btn-primary"
                        style={{ marginLeft: 'auto' }}
                    >
                        {t('post') || 'Post'}
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {logs.map(log => {
                    const logMood = moods.find(m => m.value === log.mood);
                    return (
                        <div key={log.id} style={{
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: 'var(--radius-md)',
                            borderLeft: '3px solid var(--accent-primary)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.2rem' }}>{logMood?.emoji || '📝'}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        {new Date(log.date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <button onClick={() => deleteLog(log.id)} className="btn-icon">×</button>
                            </div>
                            <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>{log.content}</div>
                        </div>
                    );
                })}
                {logs.length === 0 && (
                    <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '2rem' }}>
                        No logs yet. Start writing!
                    </div>
                )}
            </div>
        </div>
    );
}
